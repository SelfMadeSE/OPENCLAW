import { describe, it, expect } from 'vitest'
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

// ── isPrivateIp ──

describe('isPrivateIp', () => {
  it('detects loopback', () => {
    expect(isPrivateIp('127.0.0.1')).toBe(true)
    expect(isPrivateIp('::1')).toBe(true)
    expect(isPrivateIp('0.0.0.0')).toBe(true)
  })

  it('detects RFC 1918 private ranges', () => {
    expect(isPrivateIp('10.0.0.1')).toBe(true)
    expect(isPrivateIp('10.255.255.255')).toBe(true)
    expect(isPrivateIp('192.168.1.1')).toBe(true)
    expect(isPrivateIp('192.168.0.0')).toBe(true)
  })

  it('detects 172.16–172.31 range', () => {
    expect(isPrivateIp('172.16.0.1')).toBe(true)
    expect(isPrivateIp('172.31.255.255')).toBe(true)
    expect(isPrivateIp('172.32.0.1')).toBe(false)
    expect(isPrivateIp('172.15.255.255')).toBe(false)
  })

  it('detects link-local and ULA IPv6', () => {
    expect(isPrivateIp('169.254.1.1')).toBe(true)
    expect(isPrivateIp('fc00::1')).toBe(true)
    expect(isPrivateIp('fdff::1')).toBe(true)
    expect(isPrivateIp('fe80::1')).toBe(true)
  })

  it('passes public IPs', () => {
    expect(isPrivateIp('8.8.8.8')).toBe(false)
    expect(isPrivateIp('1.1.1.1')).toBe(false)
    expect(isPrivateIp('203.0.113.1')).toBe(false)
  })
})

// ── normalizeUrl ──

describe('normalizeUrl', () => {
  it('appends https:// when missing', () => {
    expect(normalizeUrl('example.com').href).toBe('https://example.com/')
    expect(normalizeUrl('example.com/path').href).toBe('https://example.com/path')
  })

  it('preserves existing scheme', () => {
    expect(normalizeUrl('http://example.com').href).toBe('http://example.com/')
    expect(normalizeUrl('https://example.com').href).toBe('https://example.com/')
  })

  it('rejects empty input', () => {
    expect(() => normalizeUrl('')).toThrow('URL is required')
    expect(() => normalizeUrl('   ')).toThrow('URL is required')
  })

  it('rejects localhost', () => {
    expect(() => normalizeUrl('http://localhost:3000')).toThrow()
    expect(() => normalizeUrl('https://app.local')).toThrow()
  })

  it('rejects non-http protocols', () => {
    expect(() => normalizeUrl('ftp://files.example.com')).toThrow()
    expect(() => normalizeUrl('file:///etc/passwd')).toThrow()
  })

  it('rejects invalid URLs', () => {
    expect(() => normalizeUrl('not a url at all')).toThrow('Invalid URL')
  })

  it('rejects domainless inputs', () => {
    expect(() => normalizeUrl('just-a-word')).toThrow()
  })
})

// ── textFromHtml ──

describe('textFromHtml', () => {
  it('strips tags', () => {
    expect(textFromHtml('<p>Hello <b>world</b></p>')).toBe('Hello world')
  })

  it('removes script and style content', () => {
    const html = '<div>visible</div><script>alert(1)</script>text<style>.x{}</style>'
    const result = textFromHtml(html)
    expect(result).toContain('visible')
    expect(result).toContain('text')
    expect(result).not.toContain('alert')
    expect(result).not.toContain('.x{}')
  })

  it('collapses whitespace', () => {
    expect(textFromHtml('<p>a   b</p><p>c    d</p>')).toBe('a b c d')
  })

  it('handles empty HTML', () => {
    expect(textFromHtml('')).toBe('')
  })
})

// ── extract ──

describe('extract', () => {
  it('returns the first capture group', () => {
    expect(extract('<title>My Site</title>', /<title>(.*?)<\/title>/i)).toBe('My Site')
  })

  it('returns null on no match', () => {
    expect(extract('no title here', /<title>(.*?)<\/title>/i)).toBeNull()
  })

  it('collapses whitespace in matches', () => {
    expect(extract('<title>Hello   World</title>', /<title>(.*?)<\/title>/i)).toBe('Hello World')
  })
})

// ── count ──

describe('count', () => {
  it('counts matches', () => {
    expect(count('<img><img>', /<img/g)).toBe(2)
  })

  it('returns 0 for no matches', () => {
    expect(count('no images', /<img/g)).toBe(0)
  })
})

// ── includesAny ──

describe('includesAny', () => {
  it('detects a match', () => {
    expect(includesAny('Buy now and save', ['buy', 'purchase'])).toBe(true)
  })

  it('is case-insensitive', () => {
    expect(includesAny('BUY NOW', ['buy'])).toBe(true)
  })

  it('returns false when none match', () => {
    expect(includesAny('nothing here', ['buy', 'purchase'])).toBe(false)
  })
})

// ── clamp ──

describe('clamp', () => {
  it('clamps below 0', () => { expect(clamp(-10)).toBe(0) })
  it('clamps above 100', () => { expect(clamp(150)).toBe(100) })
  it('rounds', () => { expect(clamp(73.6)).toBe(74) })
  it('passes in-range values', () => { expect(clamp(50)).toBe(50) })
})

// ── grade ──

describe('grade', () => {
  it('returns A–F', () => {
    expect(grade(95)).toBe('A')
    expect(grade(90)).toBe('A')
    expect(grade(85)).toBe('B')
    expect(grade(80)).toBe('B')
    expect(grade(75)).toBe('C')
    expect(grade(70)).toBe('C')
    expect(grade(65)).toBe('D')
    expect(grade(60)).toBe('D')
    expect(grade(59)).toBe('F')
    expect(grade(0)).toBe('F')
  })
})

// ── priceRange ──

describe('priceRange', () => {
  it('returns top tier for low scores or many issues', () => {
    expect(priceRange(3, 54)).toBe('$7,500-$15,000+')
    expect(priceRange(5, 80)).toBe('$7,500-$15,000+')
  })

  it('returns mid tier', () => {
    expect(priceRange(3, 65)).toBe('$4,500-$9,500')
    expect(priceRange(4, 69)).toBe('$4,500-$9,500')
  })

  it('returns entry tier', () => {
    expect(priceRange(0, 90)).toBe('$1,500-$4,500')
    expect(priceRange(2, 72)).toBe('$1,500-$4,500')
  })
})
