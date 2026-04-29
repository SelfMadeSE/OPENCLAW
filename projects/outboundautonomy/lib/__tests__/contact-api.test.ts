import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockStoreLead } = vi.hoisted(() => ({
  mockStoreLead: vi.fn(),
}))

vi.mock('@/lib/lead-storage', () => ({
  storeLead: mockStoreLead,
}))

// eslint-disable-next-line import/first
import { POST } from '@/app/api/contact/route'

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Jane Doe',
    email: 'jane@example.com',
    service_interest: 'web_design',
    message: 'I need a new website for my dental practice.',
    ...overrides,
  }
}

function buildRequest(body: unknown): Request {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': 'vitest/1.0',
      'referer': 'https://outboundautonomy.com/contact',
      'x-forwarded-for': '203.0.113.1',
    },
    body: body !== undefined ? JSON.stringify(body) : null,
  })
}

describe('/api/contact POST', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ── Validation / Error Paths ──

  it('returns 500 when body is not valid JSON (JSON parse throws before validation)', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: 'not json',
    })
    const res = await POST(req)
    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json.error).toBe('Internal server error')
  })

  it('returns 500 when body is empty (JSON parse throws before validation)', async () => {
    const res = await POST(buildRequest(undefined))
    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json.error).toBe('Internal server error')
  })

  it('returns 400 when name is missing', async () => {
    const res = await POST(buildRequest(validBody({ name: undefined })))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Validation failed')
    expect(json.details).toBeDefined()
    expect(json.details.length).toBeGreaterThan(0)
  })

  it('returns 400 when email is missing', async () => {
    const res = await POST(buildRequest(validBody({ email: undefined })))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Validation failed')
  })

  it('returns 400 when email is invalid', async () => {
    const res = await POST(buildRequest(validBody({ email: 'not-an-email' })))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Validation failed')
  })

  it('returns 400 when email is an empty string', async () => {
    const res = await POST(buildRequest(validBody({ email: '' })))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Validation failed')
  })

  it('returns 400 when service_interest is missing', async () => {
    const res = await POST(buildRequest(validBody({ service_interest: undefined })))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Validation failed')
  })

  it('returns 400 when service_interest is an invalid enum value', async () => {
    const res = await POST(buildRequest(validBody({ service_interest: 'invalid_service' })))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Validation failed')
  })

  it('returns 400 when message is missing', async () => {
    const res = await POST(buildRequest(validBody({ message: undefined })))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Validation failed')
  })

  it('returns 400 when message is an empty string', async () => {
    const res = await POST(buildRequest(validBody({ message: '' })))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Validation failed')
  })

  it('returns 400 when name is an empty string', async () => {
    const res = await POST(buildRequest(validBody({ name: '' })))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Validation failed')
  })

  // ── Optional Fields Accepted ──

  it('accepts valid submission without optional phone, company, budget_range', async () => {
    mockStoreLead.mockResolvedValueOnce({ id: 1, destination: 'sqlite', durable: false })

    const body = validBody({ phone: undefined, company: undefined, budget_range: undefined })
    const res = await POST(buildRequest(body))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.message).toBe('Lead created successfully')
    expect(json.leadId).toBe(1)
  })

  it('accepts valid submission with all optional fields', async () => {
    mockStoreLead.mockResolvedValueOnce({ id: 2, destination: 'google_sheets', durable: true })

    const body = validBody({
      phone: '+1-555-0100',
      company: 'Smile Dental LLC',
      budget_range: '2000_10000',
    })
    const res = await POST(buildRequest(body))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.leadId).toBe(2)
    expect(json.destination).toBe('google_sheets')
    expect(json.durable).toBe(true)
  })

  it('strips extra unexpected fields and succeeds when storage works', async () => {
    mockStoreLead.mockResolvedValueOnce({ id: 99, destination: 'sqlite', durable: false })

    const body = validBody({ evil: true, injected: '<script>' })
    const res = await POST(buildRequest(body))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.leadId).toBe(99)

    // Extra fields must not be passed through to storeLead
    expect(mockStoreLead).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        name: 'Jane Doe',
        email: 'jane@example.com',
        service_interest: 'web_design',
        message: 'I need a new website for my dental practice.',
      }),
      expect.any(Object)
    )
    const callArgs = mockStoreLead.mock.calls[0][0] as Record<string, unknown>
    expect(callArgs).not.toHaveProperty('evil')
    expect(callArgs).not.toHaveProperty('injected')
  })

  // ── Success Paths ──

  it('returns 200 with leadId and destination when storage succeeds (SQLite)', async () => {
    mockStoreLead.mockResolvedValueOnce({ id: 42, destination: 'sqlite', durable: false })

    const res = await POST(buildRequest(validBody()))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.message).toBe('Lead created successfully')
    expect(json.leadId).toBe(42)
    expect(json.destination).toBe('sqlite')
  })

  it('returns 200 with leadId and destination when storage succeeds (Google Sheets)', async () => {
    mockStoreLead.mockResolvedValueOnce({
      id: 'Sheet1!A42',
      destination: 'google_sheets',
      durable: true,
    })

    const res = await POST(buildRequest(validBody()))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.leadId).toBe('Sheet1!A42')
    expect(json.destination).toBe('google_sheets')
    expect(json.durable).toBe(true)
  })

  it('returns 200 with leadId and destination when storage succeeds (Google Apps Script)', async () => {
    mockStoreLead.mockResolvedValueOnce({
      id: 'gas-webhook-ok',
      destination: 'google_apps_script',
      durable: true,
    })

    const res = await POST(buildRequest(validBody({ service_interest: 'automation' })))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.destination).toBe('google_apps_script')
    expect(json.durable).toBe(true)
  })

  it('calls storeLead with correct lead data shape', async () => {
    mockStoreLead.mockResolvedValueOnce({ id: 1, destination: 'sqlite', durable: false })

    await POST(buildRequest(validBody()))

    expect(mockStoreLead).toHaveBeenCalledExactlyOnceWith(
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
        service_interest: 'web_design',
        message: 'I need a new website for my dental practice.',
      },
      expect.objectContaining({
        userAgent: 'vitest/1.0',
        referer: 'https://outboundautonomy.com/contact',
        ip: '203.0.113.1',
      })
    )
  })

  it('includes phone, company, and budget_range when provided', async () => {
    mockStoreLead.mockResolvedValueOnce({ id: 3, destination: 'sqlite', durable: false })

    const body = validBody({
      phone: '+1-555-0199',
      company: 'Acme Roofing',
      budget_range: '10000_plus',
    })
    await POST(buildRequest(body))

    expect(mockStoreLead).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        phone: '+1-555-0199',
        company: 'Acme Roofing',
        budget_range: '10000_plus',
      }),
      expect.any(Object)
    )
  })

  it('handles all valid service_interest enum values', async () => {
    mockStoreLead.mockResolvedValue({ id: 1, destination: 'sqlite', durable: false })

    for (const si of ['web_design', 'app_development', 'automation', 'marketing', 'other']) {
      const res = await POST(buildRequest(validBody({ service_interest: si })))
      expect(res.status).toBe(200)
    }

    expect(mockStoreLead).toHaveBeenCalledTimes(5)
  })

  // ── Storage Error Paths ──

  it('returns 500 when storeLead throws', async () => {
    mockStoreLead.mockRejectedValueOnce(new Error('DB connection failed'))

    const res = await POST(buildRequest(validBody()))
    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json.error).toBe('Internal server error')
  })

  it('returns 200 on consecutive successful submissions', async () => {
    mockStoreLead
      .mockResolvedValueOnce({ id: 1, destination: 'sqlite', durable: false })
      .mockResolvedValueOnce({ id: 2, destination: 'google_sheets', durable: true })

    const res1 = await POST(buildRequest(validBody({ name: 'Alice' })))
    expect(res1.status).toBe(200)
    const json1 = await res1.json()
    expect(json1.leadId).toBe(1)

    const res2 = await POST(buildRequest(validBody({ name: 'Bob', email: 'bob@example.com' })))
    expect(res2.status).toBe(200)
    const json2 = await res2.json()
    expect(json2.leadId).toBe(2)
  })

  // ── Budget Range Optional Accepts All Valid Values ──

  it('accepts all valid budget_range enum values when optional', async () => {
    mockStoreLead.mockResolvedValue({ id: 1, destination: 'sqlite', durable: false })

    for (const br of ['under_500', '500_2000', '2000_10000', '10000_plus', 'not_sure']) {
      const res = await POST(buildRequest(validBody({ budget_range: br })))
      expect(res.status).toBe(200)
    }

    expect(mockStoreLead).toHaveBeenCalledTimes(5)
  })
})
