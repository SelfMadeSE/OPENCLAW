import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockCreateWaitlistEntry } = vi.hoisted(() => ({
  mockCreateWaitlistEntry: vi.fn(),
}))

vi.mock('@/lib/db', () => ({
  createWaitlistEntry: mockCreateWaitlistEntry,
}))

// eslint-disable-next-line import/first
import { POST } from '@/app/api/waitlist/route'

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    email: 'test@example.com',
    ...overrides,
  }
}

function buildRequest(body: unknown): Request {
  return new Request('http://localhost/api/waitlist', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : null,
  })
}

describe('/api/waitlist POST', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ── Validation / Error Paths ──

  it('returns 500 when body is not valid JSON (JSON parse throws before validation)', async () => {
    const req = new Request('http://localhost/api/waitlist', {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: 'not json',
    })
    const res = await POST(req)
    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json.error).toContain('Internal server error')
  })

  it('returns 500 when body is empty (JSON parse throws before validation)', async () => {
    const req = new Request('http://localhost/api/waitlist', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '',
    })
    const res = await POST(req)
    expect(res.status).toBe(500)
  })

  it('returns 400 when email is missing', async () => {
    const res = await POST(buildRequest(validBody({ email: undefined })))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Validation failed')
    expect(json.details).toBeDefined()
  })

  it('returns 400 when email is an empty string', async () => {
    const res = await POST(buildRequest(validBody({ email: '' })))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Validation failed')
    expect(json.details).toHaveLength(1)
    expect(json.details[0].message).toBe('Please enter a valid email address')
  })

  it('returns 400 when email is invalid (no @)', async () => {
    const res = await POST(buildRequest(validBody({ email: 'notanemail' })))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Validation failed')
  })

  it('returns 400 when email is invalid (no domain)', async () => {
    const res = await POST(buildRequest(validBody({ email: 'user@' })))
    expect(res.status).toBe(400)
  })

  it('strips unknown extra fields silently (zod passthrough is not used)', async () => {
    mockCreateWaitlistEntry.mockReturnValue(42)
    // zod strips unknown fields by default — the extra key is dropped
    const res = await POST(buildRequest(validBody({ injected: 'malicious', extra: true })))
    expect(res.status).toBe(200)
    // The call should only contain known fields
    const callData = mockCreateWaitlistEntry.mock.calls[0][0]
    expect(callData).not.toHaveProperty('injected')
    expect(callData).not.toHaveProperty('extra')
    expect(callData.email).toBe('test@example.com')
  })

  // ── Success Paths ──

  it('returns 200 with entryId when waitlist entry is created with just email', async () => {
    mockCreateWaitlistEntry.mockReturnValue(1)
    const res = await POST(buildRequest(validBody()))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.message).toBe('Waitlist entry created successfully')
    expect(json.entryId).toBe(1)
  })

  it('returns 200 with entryId when all optional fields are provided', async () => {
    mockCreateWaitlistEntry.mockReturnValue(7)
    const res = await POST(
      buildRequest(
        validBody({
          name: 'Alice',
          service_interest: 'web_design',
          referral_source: 'google',
        })
      )
    )
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.message).toBe('Waitlist entry created successfully')
    expect(json.entryId).toBe(7)
  })

  it('calls createWaitlistEntry with correct data shape', async () => {
    mockCreateWaitlistEntry.mockReturnValue(3)
    const body = validBody({ name: 'Bob', referral_source: 'friend' })
    await POST(buildRequest(body))

    expect(mockCreateWaitlistEntry).toHaveBeenCalledTimes(1)
    const callData = mockCreateWaitlistEntry.mock.calls[0][0]
    expect(callData.email).toBe('test@example.com')
    expect(callData.name).toBe('Bob')
    expect(callData.referral_source).toBe('friend')
    expect(callData.service_interest).toBeUndefined()
  })

  it('handles optional fields as undefined when not provided', async () => {
    mockCreateWaitlistEntry.mockReturnValue(1)
    await POST(buildRequest(validBody()))

    const callData = mockCreateWaitlistEntry.mock.calls[0][0]
    expect(callData.name).toBeUndefined()
    expect(callData.service_interest).toBeUndefined()
    expect(callData.referral_source).toBeUndefined()
  })

  // ── Duplicate Email ──

  it('returns 409 when email already exists on waitlist', async () => {
    mockCreateWaitlistEntry.mockReturnValue(null)
    const res = await POST(buildRequest(validBody()))
    expect(res.status).toBe(409)
    const json = await res.json()
    expect(json.error).toBe('Email already exists on waitlist')
  })

  it('returns 409 for duplicate email with any optional fields', async () => {
    mockCreateWaitlistEntry.mockReturnValue(null)
    const res = await POST(
      buildRequest(validBody({ name: 'Dup', service_interest: 'automation' }))
    )
    expect(res.status).toBe(409)
  })

  // ── DB Errors ──

  it('returns 500 when createWaitlistEntry returns falsy (not null)', async () => {
    mockCreateWaitlistEntry.mockReturnValue(0) // falsy but not null
    const res = await POST(buildRequest(validBody()))
    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json.error).toBe('Failed to create waitlist entry')
  })

  it('returns 500 when createWaitlistEntry throws', async () => {
    mockCreateWaitlistEntry.mockImplementation(() => {
      throw new Error('Database connection failed')
    })
    const res = await POST(buildRequest(validBody()))
    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json.error).toBe('Internal server error')
  })

  // ── Edge Cases ──

  it('accepts valid email with plus addressing', async () => {
    mockCreateWaitlistEntry.mockReturnValue(5)
    const res = await POST(buildRequest(validBody({ email: 'user+tag@example.com' })))
    expect(res.status).toBe(200)
  })

  it('accepts valid email with subdomain', async () => {
    mockCreateWaitlistEntry.mockReturnValue(6)
    const res = await POST(buildRequest(validBody({ email: 'user@sub.example.co.uk' })))
    expect(res.status).toBe(200)
  })

  it('handles long referral_source values', async () => {
    mockCreateWaitlistEntry.mockReturnValue(8)
    const res = await POST(
      buildRequest(
        validBody({ referral_source: 'A very long referral source string from a campaign' })
      )
    )
    expect(res.status).toBe(200)
  })

  it('handles consecutive successful submissions', async () => {
    mockCreateWaitlistEntry.mockReturnValueOnce(1).mockReturnValueOnce(2)

    const res1 = await POST(buildRequest(validBody({ email: 'a@test.com' })))
    expect(res1.status).toBe(200)
    expect((await res1.json()).entryId).toBe(1)

    const res2 = await POST(buildRequest(validBody({ email: 'b@test.com' })))
    expect(res2.status).toBe(200)
    expect((await res2.json()).entryId).toBe(2)
  })
})
