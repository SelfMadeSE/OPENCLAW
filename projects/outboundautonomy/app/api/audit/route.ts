import { lookup } from 'dns/promises'
import { NextRequest, NextResponse } from 'next/server'
import {
  isPrivateIp,
  normalizeUrl,
  textFromHtml,
  extract,
  count,
  includesAny,
  clamp,
  grade,
  priceRange,
} from '@/lib/audit-utils'

export const runtime = 'nodejs'

interface ScoreItem {
  label: string
  score: number
  evidence: string
}

interface Issue {
  severity: 'high' | 'medium' | 'low'
  title: string
  evidence: string
  recommendation: string
}

interface Recommendation {
  id: number
  title: string
  description: string
  pricing: string
  priority: 'first' | 'second' | 'third'
}

interface ReferenceExample {
  name: string
  pattern: string
  whyItWorks: string
}

interface CrawledPage {
  url: string
  status: number
  responseMs: number
  title: string | null
  h1Count: number
  formCount: number
  linkCount: number
  imageCount: number
}

interface LighthouseSummary {
  available: boolean
  source: string
  strategy: 'mobile'
  performance: number | null
  accessibility: number | null
  bestPractices: number | null
  seo: number | null
  screenshotDataUrl: string | null
  audits: string[]
  error?: string
}

interface AuditAccessContext {
  hasAccountArea?: boolean
  hasCaptcha?: boolean
  hasTwoFactor?: boolean
  hasPasswordProtection?: boolean
  loginUrl?: string
  accessInstructions?: string
  testCredentials?: string
}

interface AuditInputContext {
  siteType?: string
  businessDescription?: string
  access?: AuditAccessContext
}

interface AuditData {
  sourceUrl: string
  finalUrl: string
  fetchedAt: string
  responseMs: number
  overallScore: number
  grade: string
  designScore: number
  conversionScore: number
  technicalScore: number
  scorecard: ScoreItem[]
  observedSignals: string[]
  issues: Issue[]
  recommendations: Recommendation[]
  referenceExamples: ReferenceExample[]
  crawlSummary: {
    pagesScanned: number
    pages: CrawledPage[]
    notes: string[]
  }
  lighthouse: LighthouseSummary
  screenshot: {
    available: boolean
    source: string
    imageDataUrl: string | null
    note: string
  }
  accessReview: {
    gatedAccessLikely: boolean
    flags: string[]
    note: string
  }
  inputContext: {
    siteType?: string
    businessDescription?: string
  }
  implementationEstimate: {
    range: string
    basis: string
  }
  competitiveGap: {
    oaCovers: string[]
    typicalToolsCover: string[]
    typicalAgenciesCover: string[]
    positioningAngle: string
  }
  disclaimer: string
}

const USER_AGENT = 'OutboundAutonomyAuditBot/1.0 (+https://outboundautonomy.com)'

async function assertPublicHost(url: URL) {
  try {
    const records = await lookup(url.hostname, { all: true })
    if (!records.length || records.some((record) => isPrivateIp(record.address))) {
      throw new Error('Private or unreachable host cannot be audited')
    }
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    if (code === 'ENOTFOUND' || code === 'EBUSY' || code === 'EAI_AGAIN') {
      throw new Error(`Could not reach "${url.hostname}" — please check the URL and try again.`)
    }
    throw new Error(`Unable to verify host "${url.hostname}" — ${(error as Error).message}`)
  }
}

async function fetchSite(url: URL): Promise<{ html: string; finalUrl: string; responseMs: number; status: number }> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)
  const started = Date.now()

  try {
    const response = await fetch(url, {
      headers: { 'user-agent': USER_AGENT, accept: 'text/html,*/*;q=0.8' },
      redirect: 'follow',
      signal: controller.signal,
    })
    const contentType = response.headers.get('content-type') || ''
    const html = contentType.includes('text/html') ? await response.text() : ''
    return {
      html,
      finalUrl: response.url || url.toString(),
      responseMs: Date.now() - started,
      status: response.status,
    }
  } finally {
    clearTimeout(timeout)
  }
}

function extractLinks(html: string, baseUrl: URL): URL[] {
  const urls = new Map<string, URL>()
  const hrefPattern = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi
  let match: RegExpExecArray | null

  while ((match = hrefPattern.exec(html))) {
    try {
      const href = match[1]
      if (!href || href.startsWith('#') || /^(mailto|tel|sms|javascript):/i.test(href)) continue

      const nextUrl = new URL(href, baseUrl)
      nextUrl.hash = ''
      if (!['http:', 'https:'].includes(nextUrl.protocol)) continue
      if (nextUrl.origin !== baseUrl.origin) continue

      urls.set(nextUrl.toString(), nextUrl)
    } catch {
      // Ignore malformed hrefs; broken links are handled in deeper crawl iterations.
    }
  }

  return Array.from(urls.values())
}

function summarizePage(url: string, result: { html: string; responseMs: number; status: number }): CrawledPage {
  return {
    url,
    status: result.status,
    responseMs: result.responseMs,
    title: extract(result.html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    h1Count: count(result.html, /<h1[\s>]/gi),
    formCount: count(result.html, /<form[\s>]/gi),
    linkCount: count(result.html, /<a[\s>]/gi),
    imageCount: count(result.html, /<img[\s>]/gi),
  }
}

async function crawlSite(startUrl: URL, firstPage: { html: string; finalUrl: string; responseMs: number; status: number }, limit: number): Promise<CrawledPage[]> {
  const pages: CrawledPage[] = [summarizePage(firstPage.finalUrl, firstPage)]
  const seen = new Set<string>([startUrl.toString(), firstPage.finalUrl])
  const queue = extractLinks(firstPage.html, new URL(firstPage.finalUrl)).filter((nextUrl) => {
    if (seen.has(nextUrl.toString())) return false
    seen.add(nextUrl.toString())
    return true
  })

  while (queue.length && pages.length < limit) {
    const nextUrl = queue.shift()
    if (!nextUrl) break

    try {
      const result = await fetchSite(nextUrl)
      if (!result.html || result.status >= 400) {
        pages.push(summarizePage(nextUrl.toString(), result))
        continue
      }

      pages.push(summarizePage(result.finalUrl, result))

      for (const discovered of extractLinks(result.html, new URL(result.finalUrl))) {
        if (pages.length + queue.length >= limit) break
        if (seen.has(discovered.toString())) continue
        seen.add(discovered.toString())
        queue.push(discovered)
      }
    } catch {
      pages.push({
        url: nextUrl.toString(),
        status: 0,
        responseMs: 0,
        title: null,
        h1Count: 0,
        formCount: 0,
        linkCount: 0,
        imageCount: 0,
      })
    }
  }

  return pages
}

function getLighthouseScore(result: unknown, auditKey: string): number | null {
  const categories = result as { lighthouseResult?: { categories?: Record<string, { score?: number | null }> } }
  const score = categories.lighthouseResult?.categories?.[auditKey]?.score
  return typeof score === 'number' ? clamp(score * 100) : null
}

function getLighthouseScreenshot(result: unknown): string | null {
  const data = result as {
    lighthouseResult?: {
      audits?: Record<string, { details?: { data?: string } }>
    }
  }
  return data.lighthouseResult?.audits?.['final-screenshot']?.details?.data || null
}

function getLighthouseAuditNotes(result: unknown): string[] {
  const data = result as {
    lighthouseResult?: {
      audits?: Record<string, { title?: string; score?: number | null; displayValue?: string }>
    }
  }
  const audits = data.lighthouseResult?.audits || {}
  const keys = ['largest-contentful-paint', 'speed-index', 'cumulative-layout-shift', 'interactive', 'total-blocking-time']

  return keys.flatMap((key) => {
    const audit = audits[key]
    if (!audit?.title) return []
    const suffix = audit.displayValue ? `: ${audit.displayValue}` : ''
    return [`${audit.title}${suffix}`]
  })
}

async function runPageSpeed(url: URL): Promise<LighthouseSummary> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 18000)
  const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed')
  apiUrl.searchParams.set('url', url.toString())
  apiUrl.searchParams.set('strategy', 'mobile')
  for (const category of ['performance', 'accessibility', 'best-practices', 'seo']) {
    apiUrl.searchParams.append('category', category)
  }
  if (process.env.PAGESPEED_API_KEY) {
    apiUrl.searchParams.set('key', process.env.PAGESPEED_API_KEY)
  }

  try {
    const response = await fetch(apiUrl, { signal: controller.signal })
    const data = await response.json()

    if (!response.ok) {
      return runLighthouseFallback(url.toString())
    }

    return {
      available: true,
      source: 'Google PageSpeed Insights',
      strategy: 'mobile',
      performance: getLighthouseScore(data, 'performance'),
      accessibility: getLighthouseScore(data, 'accessibility'),
      bestPractices: getLighthouseScore(data, 'best-practices'),
      seo: getLighthouseScore(data, 'seo'),
      screenshotDataUrl: getLighthouseScreenshot(data),
      audits: getLighthouseAuditNotes(data),
    }
  } catch (error) {
    // Fall back to local Lighthouse CLI if PageSpeed API fails
    return runLighthouseFallback(url.toString())
  } finally {
    clearTimeout(timeout)
  }
}

function accessFlags(access?: AuditAccessContext): string[] {
  if (!access) return []

  const flags: string[] = []
  if (access.hasAccountArea) flags.push('Account/login area exists')
  if (access.hasCaptcha) flags.push('CAPTCHA or bot check may block automated testing')
  if (access.hasTwoFactor) flags.push('2FA may require manual test coordination')
  if (access.hasPasswordProtection) flags.push('Password-protected pages exist')
  if (access.loginUrl) flags.push(`Login/access URL provided: ${access.loginUrl}`)
  if (access.accessInstructions && access.accessInstructions.trim().length >= 10) flags.push('Access instructions provided')
  if (access.testCredentials && access.testCredentials.trim().length >= 6) flags.push('Temporary test credentials provided')
  return flags

/** Fall back to local Lighthouse CLI when PageSpeed API is unavailable */
async function runLighthouseFallback(url: string): Promise<LighthouseSummary> {
  const localUrl = process.env.LIGHTHOUSE_SERVER_URL || 'http://127.0.0.1:18900'
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 90000)
    const response = await fetch(`${localUrl}/audit?url=${encodeURIComponent(url)}`, { signal: controller.signal })
    clearTimeout(timeout)
    if (!response.ok) {
      return {
        available: false, source: 'Lighthouse CLI', strategy: 'mobile',
        performance: null, accessibility: null, bestPractices: null, seo: null,
        screenshotDataUrl: null, audits: [],
        error: `Local Lighthouse returned ${response.status}`
      }
    }
    const data = await response.json()
    return {
      available: data.available ?? true,
      source: 'Lighthouse CLI (local)',
      strategy: 'mobile',
      performance: data.performance ?? null,
      accessibility: data.accessibility ?? null,
      bestPractices: data.bestPractices ?? null,
      seo: data.seo ?? null,
      screenshotDataUrl: data.screenshotDataUrl ?? null,
      audits: (data.topIssues || []).map((i: any) => `${i.title}: ${i.score}/100`)
    }
  } catch (e) {
    return {
      available: false, source: 'Lighthouse CLI', strategy: 'mobile',
      performance: null, accessibility: null, bestPractices: null, seo: null,
      screenshotDataUrl: null, audits: [],
      error: `Local Lighthouse unavailable: ${e instanceof Error ? e.message : 'unknown'}`
    }
  }
}
}

function analyze(
  url: URL,
  result: { html: string; finalUrl: string; responseMs: number; status: number },
  crawledPages: CrawledPage[],
  lighthouse: LighthouseSummary,
  inputContext: AuditInputContext
): AuditData {
  const { html, finalUrl, responseMs, status } = result
  const text = textFromHtml(html)
  const title = extract(html, /<title[^>]*>([\s\S]*?)<\/title>/i)
  const description = extract(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i)
  const h1Count = count(html, /<h1[\s>]/gi)
  const formCount = count(html, /<form[\s>]/gi)
  const linkCount = count(html, /<a[\s>]/gi)
  const imageCount = count(html, /<img[\s>]/gi)
  const imagesWithoutAlt = count(html, /<img(?![^>]*\salt=)[^>]*>/gi)
  const hasPhone = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text)
  const hasEmail = /mailto:|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(html)
  const hasBooking = includesAny(text, ['book now', 'schedule', 'appointment', 'estimate', 'quote'])
  const hasUrgentCta = includesAny(text, ['call now', 'get a quote', 'free estimate', 'request service', 'contact us'])
  const hasProof = includesAny(text, ['reviews', 'testimonials', 'rated', 'stars', 'licensed', 'insured', 'guarantee'])
  const hasPricing = includesAny(text, ['pricing', 'starting at', 'financing', 'plans'])
  const hasLocalSignals = includesAny(text, ['serving', 'locally owned', 'service area', 'near me'])
  const isHttps = finalUrl.startsWith('https://')

  const observedSignals: string[] = []
  if (title) observedSignals.push(`Page title found: "${title.slice(0, 80)}"`)
  if (description) observedSignals.push('Meta description is present')
  if (h1Count) observedSignals.push(`${h1Count} H1 heading${h1Count === 1 ? '' : 's'} found`)
  if (hasPhone) observedSignals.push('Phone number detected')
  if (hasEmail) observedSignals.push('Email/contact link detected')
  if (hasBooking) observedSignals.push('Booking/estimate language detected')
  if (hasProof) observedSignals.push('Trust/proof language detected')
  if (hasLocalSignals) observedSignals.push('Local service-area language detected')

  let designScore = 58
  if (title && title.length <= 70) designScore += 8
  if (h1Count === 1) designScore += 8
  if (imageCount > 0) designScore += 8
  if (imagesWithoutAlt === 0 && imageCount > 0) designScore += 6
  if (text.length > 700) designScore += 8
  if (linkCount > 5) designScore += 5

  let conversionScore = 42
  if (hasUrgentCta) conversionScore += 18
  if (hasBooking) conversionScore += 14
  if (formCount > 0) conversionScore += 12
  if (hasPhone) conversionScore += 8
  if (hasProof) conversionScore += 8
  if (hasPricing) conversionScore += 4
  if (hasLocalSignals) conversionScore += 5

  let technicalScore = 55
  if (status >= 200 && status < 300) technicalScore += 15
  if (isHttps) technicalScore += 10
  if (responseMs < 1200) technicalScore += 12
  else if (responseMs < 2500) technicalScore += 6
  if (description) technicalScore += 7
  if (html.length > 5000) technicalScore += 6
  if (html.length > 250000) technicalScore -= 8
  if (lighthouse.available && lighthouse.performance !== null) {
    technicalScore = technicalScore * 0.65 + lighthouse.performance * 0.35
  }

  designScore = clamp(designScore)
  conversionScore = clamp(conversionScore)
  technicalScore = clamp(technicalScore)
  const overallScore = clamp((designScore + conversionScore + technicalScore) / 3)

  const issues: Issue[] = []
  if (!hasUrgentCta) {
    issues.push({
      severity: 'high',
      title: 'Primary conversion CTA is weak or not obvious',
      evidence: 'The scan did not find clear high-intent CTA language like "get a quote", "book now", or "request service".',
      recommendation: 'Add one dominant above-the-fold CTA and repeat it in sticky/mobile positions.',
    })
  }
  if (!formCount) {
    issues.push({
      severity: 'high',
      title: 'No lead-capture form detected',
      evidence: 'The page HTML did not include a form element.',
      recommendation: 'Add a short quote/request form with service type, contact info, and urgency.',
    })
  }
  if (!hasProof) {
    issues.push({
      severity: 'medium',
      title: 'Trust proof is not prominent',
      evidence: 'The scan did not detect common review, testimonial, rating, guarantee, licensed, or insured language.',
      recommendation: 'Add reviews, proof badges, before/after examples, and service guarantees near the CTA.',
    })
  }
  if (!description) {
    issues.push({
      severity: 'medium',
      title: 'Meta description is missing',
      evidence: 'No meta description tag was detected in the page HTML.',
      recommendation: 'Add a local-service-focused description that matches search intent and the page offer.',
    })
  }
  if (responseMs > 2500) {
    issues.push({
      severity: 'medium',
      title: 'Initial response appears slow',
      evidence: `Server response took ${responseMs}ms from the audit runner.`,
      recommendation: 'Compress assets, reduce render-blocking scripts, and audit hosting/cache configuration.',
    })
  }
  if (imageCount > 0 && imagesWithoutAlt > 0) {
    issues.push({
      severity: 'low',
      title: 'Some images may be missing alt text',
      evidence: `${imagesWithoutAlt} image tag${imagesWithoutAlt === 1 ? '' : 's'} appeared to lack alt attributes.`,
      recommendation: 'Add descriptive alt text for accessibility and local SEO context.',
    })
  }
  if (!lighthouse.available) {
    issues.push({
      severity: 'low',
      title: 'Full Lighthouse data was not available in this preview',
      evidence: lighthouse.error || 'The PageSpeed/Lighthouse request did not return complete data before the audit timeout.',
      recommendation: 'Run the full implementation review with a dedicated browser worker for repeatable Lighthouse, screenshot, and interaction testing.',
    })
  }
  const access = inputContext.access
  const gatedFlags = accessFlags(access)
  if (gatedFlags.length) {
    issues.push({
      severity: access?.hasCaptcha || access?.hasTwoFactor ? 'medium' : 'low',
      title: 'Gated or account-based pages need an authenticated pass',
      evidence: gatedFlags.join('; '),
      recommendation: 'Use a temporary test account and documented login instructions so the full audit can test dashboards, booking flows, forms, and protected pages safely.',
    })
  }

  const recommendations: Recommendation[] = [
    {
      id: 1,
      title: 'Conversion-first homepage pass',
      description: 'Clarify the hero, add a dominant service CTA, strengthen proof, and remove friction from the first action.',
      pricing: '$1,500-$3,500',
      priority: 'first',
    },
    {
      id: 2,
      title: 'Lead capture + follow-up system',
      description: 'Add a quote/request flow, route leads by urgency, and trigger owner/customer follow-up so inquiries do not go cold.',
      pricing: '$2,500-$6,500',
      priority: 'second',
    },
    {
      id: 3,
      title: 'Full implementation plan',
      description: 'Turn the audit into a prioritized build plan covering page structure, local SEO, automation, CRM handoff, and measurement.',
      pricing: priceRange(issues.length, overallScore),
      priority: 'third',
    },
  ]

  return {
    sourceUrl: url.toString(),
    finalUrl,
    fetchedAt: new Date().toISOString(),
    responseMs,
    designScore,
    conversionScore,
    technicalScore,
    overallScore,
    grade: grade(overallScore),
    scorecard: [
      { label: 'Design/UI', score: designScore, evidence: h1Count === 1 ? 'Single primary H1 detected' : `${h1Count} H1 headings detected` },
      { label: 'Conversion', score: conversionScore, evidence: formCount ? `${formCount} form element(s) detected` : 'No lead form detected' },
      { label: 'Technical', score: technicalScore, evidence: `${status} response in ${responseMs}ms over ${isHttps ? 'HTTPS' : 'HTTP'}` },
    ],
    observedSignals,
    issues,
    recommendations,
    referenceExamples: [
      {
        name: 'Fast quote flow',
        pattern: 'Above-the-fold service promise, phone number, short quote form, and sticky mobile CTA.',
        whyItWorks: 'It lets urgent visitors act immediately instead of hunting for contact options.',
      },
      {
        name: 'Proof-led local page',
        pattern: 'Review score, service-area proof, before/after examples, guarantee, and direct booking CTA.',
        whyItWorks: 'It reduces trust friction before the visitor compares competitors.',
      },
      {
        name: 'Automated follow-up funnel',
        pattern: 'Form submission creates a CRM lead, sends confirmation, alerts owner, and queues follow-up.',
        whyItWorks: 'It protects revenue when staff miss calls or respond late.',
      },
    ],
    crawlSummary: {
      pagesScanned: crawledPages.length,
      pages: crawledPages,
      notes: [
        `Crawler stayed on ${new URL(finalUrl).hostname} and capped the preview crawl at ${crawledPages.length} page${crawledPages.length === 1 ? '' : 's'}.`,
        'The paid implementation review can expand this into a deeper crawl with screenshots, form testing, and account-flow validation.',
      ],
    },
    lighthouse,
    screenshot: {
      available: Boolean(lighthouse.screenshotDataUrl),
      source: lighthouse.screenshotDataUrl ? 'Google PageSpeed Insights final screenshot' : 'Not captured in preview',
      imageDataUrl: lighthouse.screenshotDataUrl,
      note: lighthouse.screenshotDataUrl
        ? 'Screenshot is generated by the Lighthouse/PageSpeed mobile run.'
        : 'Screenshot capture needs a browser worker when PageSpeed is unavailable or blocked.',
    },
    accessReview: {
      gatedAccessLikely: gatedFlags.length > 0,
      flags: gatedFlags,
      note: gatedFlags.length
        ? 'Use temporary test credentials only. Do not submit real admin passwords through the public audit form.'
        : 'No gated-access details were provided for this preview audit.',
    },
    inputContext: {
      siteType: inputContext.siteType,
      businessDescription: inputContext.businessDescription,
    },
    implementationEstimate: {
      range: priceRange(issues.length, overallScore),
      basis: `Based on ${issues.length} detected issue${issues.length === 1 ? '' : 's'}, current score ${overallScore}/100, and whether conversion plus automation work is required.`,
    },
    competitiveGap: {
      oaCovers: [
        'Technical SEO',
        'Page Speed',
        'Mobile Friendliness',
        'Design Quality',
        'Conversion Funnel Analysis',
        'Lead Capture Assessment',
        'Trust Signal Review',
        'Competitor Comparison',
        'Prioritized Fix List (tailored)',
        'Implementation Path with Pricing',
        'Local Service Business Focus',
        'Human-Interpreted Recommendations',
        'Visual Evidence & Screenshots',
      ],
      typicalToolsCover: ['Technical SEO', 'Page Speed', 'Mobile Friendliness'],
      typicalAgenciesCover: ['Design', 'SEO'],
      positioningAngle: 'Tools give you data. We give you a plan.',
    },
    disclaimer: 'This preview combines live HTML scanning, same-origin crawl sampling, and best-effort PageSpeed/Lighthouse data. Authenticated pages, analytics, and true competitor research still require the full implementation review.',
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid or empty request body — please send a JSON object with a "url" field.' },
        { status: 400 }
      )
    }

    if (!body || typeof body !== 'object' || !body.url) {
      return NextResponse.json(
        { error: 'Missing required field: "url". Please include the website URL to audit.' },
        { status: 400 }
      )
    }

    const { url: rawUrl } = body
    const url = normalizeUrl(String(rawUrl || ''))
    const businessDescription = typeof body.businessDescription === 'string' ? body.businessDescription.trim() : ''
    if (businessDescription && businessDescription.length < 25) {
      return NextResponse.json(
        { error: 'Business description must be at least 25 characters when provided.' },
        { status: 400 }
      )
    }

    await assertPublicHost(url)
    const [site, lighthouse] = await Promise.all([fetchSite(url), runPageSpeed(url)])

    if (!site.html || site.status >= 400) {
      return NextResponse.json(
        { error: `Could not read an HTML page from this URL. Status: ${site.status}` },
        { status: 422 }
      )
    }

    const crawlLimit = Math.max(1, Math.min(6, Number(body.crawlLimit || 5)))
    const crawledPages = await crawlSite(url, site, crawlLimit)

    return NextResponse.json(
      analyze(url, site, crawledPages, lighthouse, {
        siteType: typeof body.siteType === 'string' ? body.siteType : undefined,
        businessDescription: businessDescription || undefined,
        access: typeof body.access === 'object' && body.access ? body.access : undefined,
      })
    )
  } catch (error) {
    // Validation errors (from normalizeUrl, assertPublicHost, etc.) are user-facing 400s.
    // Everything else is an internal 500.
    const VALIDATION_ERRORS = new Set([
      'URL is required',
      'Only http and https URLs are supported',
      'Local/private URLs cannot be audited',
      'Private or unreachable host cannot be audited',
    ])
    const message = error instanceof Error ? error.message : 'Internal server error'
    const isValidation =
      message.startsWith('Invalid URL') ||
      message.startsWith('Could not reach') ||
      message.startsWith('Unable to verify host') ||
      message.includes('at least 25 characters') ||
      VALIDATION_ERRORS.has(message)
    const status = isValidation ? 400 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
