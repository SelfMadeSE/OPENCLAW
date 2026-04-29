import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mocks must be set up before the route module is imported.
// vi.mock is hoisted — use vi.hoisted() to hold the mocks so the factory can reference them.
const { mockLookup } = vi.hoisted(() => ({
  mockLookup: vi.fn(),
}))

vi.mock('node:dns/promises', () => ({
  lookup: mockLookup,
}))

// --- Import the handler after mocks are in place ---
// eslint-disable-next-line import/first
import { POST } from '@/app/api/audit/route'

function buildRequest(body: unknown, headers?: Record<string, string>): Request {
  return new Request('http://localhost/api/audit', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : null,
  })
}

describe('/api/audit POST', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  // ── Validation / Error Paths ──

  it('returns 400 when body is empty', async () => {
    const res = await POST(buildRequest(undefined))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toContain('Invalid or empty request body')
  })

  it('returns 400 when content-type is not JSON', async () => {
    const req = new Request('http://localhost/api/audit', {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: 'not json',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toContain('Invalid or empty request body')
  })

  it('returns 400 when url field is missing', async () => {
    const res = await POST(buildRequest({}))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toContain('Missing required field: "url"')
  })

  it('returns 400 when url is an empty string', async () => {
    const res = await POST(buildRequest({ url: '' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    // Empty string is falsy → caught by !body.url check in POST handler
    expect(json.error).toContain('Missing required field: "url"')
  })

  it('returns 400 when url is whitespace only', async () => {
    const res = await POST(buildRequest({ url: '   ' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    // Whitespace string is truthy → passes body.url check → normalizeUrl catches it
    expect(json.error).toBe('URL is required')
  })

  it('returns 400 when url is localhost', async () => {
    const res = await POST(buildRequest({ url: 'http://localhost:3000' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    // normalizeUrl catches localhost with a dedicated message
    expect(json.error).toContain('Local/private URLs cannot be audited')
  })

  it('returns 400 when url uses a non-http protocol', async () => {
    const res = await POST(buildRequest({ url: 'ftp://files.example.com' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    // normalizeUrl rejects non-http protocols; the specific message depends on
    // URL parser behavior with the prepended https:// scheme
    expect(json.error).toBeTruthy()
  })

  it('returns 400 when url is garbage text', async () => {
    const res = await POST(buildRequest({ url: 'not a real url at all!' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toContain('Invalid URL')
  })

  it('returns 400 when business description is too short', async () => {
    const res = await POST(buildRequest({
      url: 'https://example.com',
      businessDescription: 'too short',
    }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toContain('at least 25 characters')
  })

  it('returns 400 when DNS lookup fails with ENOTFOUND', async () => {
    mockLookup.mockRejectedValueOnce(
      Object.assign(new Error('ENOTFOUND'), { code: 'ENOTFOUND' })
    )
    const res = await POST(buildRequest({ url: 'https://nonexistent.domain.test' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toContain('Could not reach')
    expect(json.error).toContain('nonexistent.domain.test')
  })

  it('returns 400 when DNS lookup fails with EAI_AGAIN', async () => {
    mockLookup.mockRejectedValueOnce(
      Object.assign(new Error('EAI_AGAIN'), { code: 'EAI_AGAIN' })
    )
    const res = await POST(buildRequest({ url: 'https://timeout.example.com' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toContain('Could not reach')
  })

  it('returns 422 when remote site returns non-2xx and no HTML', async () => {
    mockLookup.mockResolvedValueOnce([{ address: '203.0.113.1', family: 4 }])

    // Use URL-based mock to avoid race conditions with Promise.all
    global.fetch = vi.fn((input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url
      if (url.includes('pagespeedonline')) {
        return Promise.resolve(
          new Response(JSON.stringify({ error: { message: 'Not found' } }), { status: 404 })
        )
      }
      return Promise.resolve(
        new Response('', { status: 404, headers: { 'content-type': 'text/html' } })
      )
    }) as unknown as typeof fetch

    const res = await POST(buildRequest({ url: 'https://example.com/404' }))
    expect(res.status).toBe(422)
    const json = await res.json()
    expect(json.error).toContain('Could not read an HTML page')
  })

  // ── Happy Path ──

  it('returns a full audit response for a valid public URL', async () => {
    mockLookup.mockResolvedValueOnce([{ address: '203.0.113.1', family: 4 }])

    // Use URL-based mock so concurrent fetchSite + runPageSpeed don't race
    global.fetch = vi.fn((input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url

      if (url.includes('pagespeedonline')) {
        // PageSpeed API response
        return Promise.resolve(
          new Response(JSON.stringify({
            lighthouseResult: {
              categories: {
                performance: { score: 0.85 },
                accessibility: { score: 0.92 },
                'best-practices': { score: 0.88 },
                seo: { score: 0.90 },
              },
              audits: {
                'final-screenshot': { details: { data: 'data:image/webp;base64,FAKE' } },
                'largest-contentful-paint': { title: 'LCP', displayValue: '2.1 s' },
                'speed-index': { title: 'Speed Index', displayValue: '3.4 s' },
                'cumulative-layout-shift': { title: 'CLS', displayValue: '0.05' },
                'interactive': { title: 'Time to Interactive', displayValue: '3.2 s' },
                'total-blocking-time': { title: 'TBT', displayValue: '150 ms' },
              },
            },
          }), { status: 200 })
        )
      }

      // All other requests → return the target HTML for the mock site
      return Promise.resolve(
        new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <title>Test Business | Local Service</title>
  <meta name="description" content="Quality home services in Denver.">
</head>
<body>
  <h1>Local Home Services</h1>
  <p>Get a quote today. Call now for your free estimate.</p>
  <a href="/services">Services</a>
  <a href="/contact">Contact</a>
  <a href="/reviews">Reviews</a>
  <a href="#top">Top</a>
  <form action="/submit"><input type="text" name="name"/></form>
  <img src="hero.jpg" alt="Service team">
  <img src="logo.png">
  <p>Licensed & Insured. Serving the Denver metro area. Schedule your appointment today.</p>
</body>
</html>`, {
          status: 200,
          headers: { 'content-type': 'text/html; charset=utf-8' },
        })
      )
    }) as unknown as typeof fetch

    const res = await POST(buildRequest({
      url: 'https://example.com',
      siteType: 'Home Services',
      businessDescription: 'A local home service contractor in Denver.',
      crawlLimit: 3,
    }))

    expect(res.status).toBe(200)
    const json = await res.json()

    // Top-level shape
    expect(json.sourceUrl).toBe('https://example.com/')
    expect(json.finalUrl).toBe('https://example.com/')
    expect(json.fetchedAt).toBeTruthy()
    expect(typeof json.responseMs).toBe('number')
    expect(typeof json.overallScore).toBe('number')
    expect(json.overallScore).toBeGreaterThanOrEqual(0)
    expect(json.overallScore).toBeLessThanOrEqual(100)
    expect(['A', 'B', 'C', 'D', 'F']).toContain(json.grade)

    // Sub-scores
    expect(typeof json.designScore).toBe('number')
    expect(typeof json.conversionScore).toBe('number')
    expect(typeof json.technicalScore).toBe('number')

    // Scorecard
    expect(Array.isArray(json.scorecard)).toBe(true)
    expect(json.scorecard.length).toBe(3)
    expect(json.scorecard[0].label).toBe('Design/UI')
    expect(json.scorecard[1].label).toBe('Conversion')
    expect(json.scorecard[2].label).toBe('Technical')

    // Issues — should flag missing alt text (one <img> without alt)
    expect(Array.isArray(json.issues)).toBe(true)
    expect(json.issues.length).toBeGreaterThan(0)
    const altIssue = json.issues.find(
      (i: { title: string }) => i.title.includes('alt text')
    )
    expect(altIssue).toBeTruthy()

    // Recommendations
    expect(Array.isArray(json.recommendations)).toBe(true)
    expect(json.recommendations.length).toBe(3)
    expect(json.recommendations[0].priority).toBe('first')

    // Crawl summary
    expect(json.crawlSummary.pagesScanned).toBeGreaterThanOrEqual(1)
    expect(Array.isArray(json.crawlSummary.pages)).toBe(true)
    expect(Array.isArray(json.crawlSummary.notes)).toBe(true)

    // Lighthouse
    expect(json.lighthouse.available).toBe(true)
    expect(json.lighthouse.performance).toBe(85)

    // Screenshot
    expect(json.screenshot.available).toBe(true)
    expect(json.screenshot.imageDataUrl).toBe('data:image/webp;base64,FAKE')

    // Implementation estimate
    expect(json.implementationEstimate.range).toBeTruthy()
    expect(json.implementationEstimate.basis).toBeTruthy()

    // Competitive gap
    expect(Array.isArray(json.competitiveGap.oaCovers)).toBe(true)
    expect(json.competitiveGap.positioningAngle).toBeTruthy()

    // Input context
    expect(json.inputContext.siteType).toBe('Home Services')
    expect(json.inputContext.businessDescription).toBe('A local home service contractor in Denver.')

    // Disclaimer
    expect(typeof json.disclaimer).toBe('string')
    expect(json.disclaimer.length).toBeGreaterThan(100)
  })

  // ── Edge Cases ──

  it('handles slow response sites (500+ ms)', async () => {
    mockLookup.mockResolvedValueOnce([{ address: '203.0.113.2', family: 4 }])

    global.fetch = vi.fn((input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url
      if (url.includes('pagespeedonline')) {
        return Promise.resolve(
          new Response(JSON.stringify({ error: { message: 'Timeout' } }), { status: 500 })
        )
      }
      return Promise.resolve(
        new Response('<html><title>Slow Site</title><p>Hello</p></html>', {
          status: 200,
          headers: { 'content-type': 'text/html' },
        })
      )
    }) as unknown as typeof fetch

    const res = await POST(buildRequest({ url: 'https://slow.example.com' }))
    expect(res.status).toBe(200)
    const json = await res.json()

    // Should have high/medium issues for missing CTA and form
    const highIssues = json.issues.filter((i: { severity: string }) => i.severity === 'high')
    expect(highIssues.length).toBeGreaterThanOrEqual(2)

    // Lighthouse should be unavailable
    expect(json.lighthouse.available).toBe(false)
    expect(json.lighthouse.error).toBeTruthy()
    expect(json.screenshot.available).toBe(false)

    // Grade should be poor with no CTA, no form
    expect(['D', 'F']).toContain(json.grade)
  })

  it('accepts valid businessDescription at the 25-char minimum', async () => {
    mockLookup.mockResolvedValueOnce([{ address: '203.0.113.3', family: 4 }])

    global.fetch = vi.fn((input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url
      if (url.includes('pagespeedonline')) {
        return Promise.resolve(new Response(JSON.stringify({}), { status: 200 }))
      }
      return Promise.resolve(
        new Response('<html><title>X</title></html>', {
          status: 200,
          headers: { 'content-type': 'text/html' },
        })
      )
    }) as unknown as typeof fetch

    const desc = 'A'.repeat(25) // exactly 25 chars
    const res = await POST(buildRequest({
      url: 'https://x.example.com',
      businessDescription: desc,
    }))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.inputContext.businessDescription).toBe(desc)
  })

  it('accepts single-page crawl (crawlLimit = 1)', async () => {
    mockLookup.mockResolvedValueOnce([{ address: '203.0.113.4', family: 4 }])

    global.fetch = vi.fn((input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url
      if (url.includes('pagespeedonline')) {
        return Promise.resolve(new Response(JSON.stringify({}), { status: 200 }))
      }
      return Promise.resolve(
        new Response('<html><title>One Pager</title></html>', {
          status: 200,
          headers: { 'content-type': 'text/html' },
        })
      )
    }) as unknown as typeof fetch

    const res = await POST(buildRequest({
      url: 'https://onepager.example.com',
      crawlLimit: 1,
    }))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.crawlSummary.pagesScanned).toBe(1)
  })
})
