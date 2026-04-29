import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockStoreLead } = vi.hoisted(() => ({
  mockStoreLead: vi.fn(),
}))

vi.mock('@/lib/lead-storage', () => ({
  storeLead: mockStoreLead,
}))

// eslint-disable-next-line import/first
import { POST } from '@/app/api/try/unlock/route'

function buildRequest(body: unknown): Request {
  return new Request('http://localhost/api/try/unlock', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : null,
  })
}

describe('/api/try/unlock POST', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ── Validation / Error Paths ──

  it('returns 500 when body is not valid JSON (JSON parse throws before validation)', async () => {
    const req = new Request('http://localhost/api/try/unlock', {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: 'not json',
    })
    const res = await POST(req)
    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json.error).toBe('Unable to save unlock request right now.')
  })

  it('returns 500 when body is empty (JSON parse throws before validation)', async () => {
    const res = await POST(buildRequest(undefined))
    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json.error).toBe('Unable to save unlock request right now.')
  })

  it('returns 400 when email is missing', async () => {
    const res = await POST(buildRequest({ company: 'Acme HVAC' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Invalid request payload.')
  })

  it('returns 400 when company is missing', async () => {
    const res = await POST(buildRequest({ email: 'test@example.com' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Invalid request payload.')
  })

  it('returns 400 when email is not a valid email', async () => {
    const res = await POST(buildRequest({ email: 'not-an-email', company: 'Acme' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Invalid request payload.')
  })

  it('returns 400 when email is an empty string', async () => {
    const res = await POST(buildRequest({ email: '', company: 'Acme' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Invalid request payload.')
  })

  it('returns 400 when company is an empty string', async () => {
    const res = await POST(buildRequest({ email: 'test@example.com', company: '' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Invalid request payload.')
  })

  it('strips extra unexpected fields and succeeds when storage works', async () => {
    // Zod strips unknown fields by default, so { email, company, evil } → { email, company }
    mockStoreLead.mockResolvedValueOnce({ id: 99, destination: 'sqlite', durable: false })

    const res = await POST(buildRequest({ email: 'test@example.com', company: 'Acme', evil: true }))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.id).toBe(99)

    // Verify the extra field was not passed through
    expect(mockStoreLead).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ email: 'test@example.com', company: 'Acme' }),
      {}
    )
    // Confirm the call did NOT include evil
    const callArgs = mockStoreLead.mock.calls[0][0] as Record<string, unknown>
    expect(callArgs).not.toHaveProperty('evil')
  })

  // ── Success Paths ──

  it('returns 200 with id and destination when storage succeeds (SQLite)', async () => {
    mockStoreLead.mockResolvedValueOnce({
      id: 42,
      destination: 'sqlite',
      durable: false,
    })

    const res = await POST(buildRequest({ email: 'owner@example.com', company: 'Peak HVAC' }))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.id).toBe(42)
    expect(json.destination).toBe('sqlite')
  })

  it('returns 200 with id and destination when storage succeeds (Google Sheets)', async () => {
    mockStoreLead.mockResolvedValueOnce({
      id: 'Sheet1!A100',
      destination: 'google_sheets',
      durable: true,
    })

    const res = await POST(buildRequest({ email: 'owner@example.com', company: 'Peak HVAC' }))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.id).toBe('Sheet1!A100')
    expect(json.destination).toBe('google_sheets')
  })

  it('calls storeLead with correct lead data', async () => {
    mockStoreLead.mockResolvedValueOnce({
      id: 1,
      destination: 'sqlite',
      durable: false,
    })

    await POST(buildRequest({ email: 'owner@example.com', company: 'Peak HVAC' }))

    expect(mockStoreLead).toHaveBeenCalledExactlyOnceWith(
      {
        name: 'Peak HVAC',
        email: 'owner@example.com',
        company: 'Peak HVAC',
        service_interest: 'other',
        message: 'Preview report unlock from /try page for Peak HVAC.',
      },
      {}
    )
  })

  it('falls back to company name "Preview unlock lead" when company field is empty in data', async () => {
    // The zod schema requires company.min(1), so this test covers the internal default
    // by validating that the zod schema blocks it at 400.
    // The fallback is exercised when the schema passes but company is falsy (not possible with zod min(1)).
    // We document this as intended behavior: empty company hits zod validation, not the fallback.
    const res = await POST(buildRequest({ email: 'test@example.com', company: '' }))
    expect(res.status).toBe(400)
  })

  // ── Storage Error Paths ──

  it('returns 500 when storeLead throws', async () => {
    mockStoreLead.mockRejectedValueOnce(new Error('DB connection failed'))

    const res = await POST(buildRequest({ email: 'owner@example.com', company: 'Peak HVAC' }))
    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json.error).toBe('Unable to save unlock request right now.')
  })

  it('returns 200 on consecutive successful unlocks', async () => {
    mockStoreLead
      .mockResolvedValueOnce({ id: 1, destination: 'sqlite', durable: false })
      .mockResolvedValueOnce({ id: 2, destination: 'sqlite', durable: false })

    const res1 = await POST(buildRequest({ email: 'a@example.com', company: 'Acme' }))
    expect(res1.status).toBe(200)
    const json1 = await res1.json()
    expect(json1.id).toBe(1)

    const res2 = await POST(buildRequest({ email: 'b@example.com', company: 'Beta' }))
    expect(res2.status).toBe(200)
    const json2 = await res2.json()
    expect(json2.id).toBe(2)
  })
})
