/**
 * Pure utility functions used in website audit scoring.
 * Extracted from app/api/audit/route.ts for testability.
 */

export function isPrivateIp(address: string): boolean {
  return (
    address === '127.0.0.1' ||
    address === '0.0.0.0' ||
    address === '::1' ||
    address.startsWith('10.') ||
    address.startsWith('192.168.') ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(address) ||
    address.startsWith('169.254.') ||
    address.startsWith('fc') ||
    address.startsWith('fd') ||
    address.startsWith('fe80:')
  )
}

export function normalizeUrl(input: string): URL {
  const trimmed = input.trim()
  if (!trimmed) {
    throw new Error('URL is required')
  }

  let url: URL
  try {
    url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`)
  } catch {
    throw new Error('Invalid URL — please enter a complete website address (e.g. https://example.com)')
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Only http and https URLs are supported')
  }
  if (url.hostname === 'localhost' || url.hostname.endsWith('.local')) {
    throw new Error('Local/private URLs cannot be audited')
  }
  if (!url.hostname.includes('.') && url.hostname !== 'localhost') {
    throw new Error('Invalid URL — the domain does not appear to be a valid website address. Please include the full domain (e.g. https://example.com)')
  }
  return url
}

export function textFromHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function extract(html: string, pattern: RegExp): string | null {
  const match = html.match(pattern)
  return match?.[1]?.replace(/\s+/g, ' ').trim() || null
}

export function count(html: string, pattern: RegExp): number {
  return html.match(pattern)?.length || 0
}

export function includesAny(text: string, words: string[]): boolean {
  const lowered = text.toLowerCase()
  return words.some((word) => lowered.includes(word))
}

export function clamp(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)))
}

export function grade(score: number): string {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

export function priceRange(issueCount: number, score: number): string {
  if (score < 55 || issueCount >= 5) return '$7,500-$15,000+'
  if (score < 70 || issueCount >= 3) return '$4,500-$9,500'
  return '$1,500-$4,500'
}
