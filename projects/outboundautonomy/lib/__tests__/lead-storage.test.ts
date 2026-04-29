import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// ── Hoisted mocks ──────────────────────────────────────────────────

const { mockCreateLead } = vi.hoisted(() => ({
  mockCreateLead: vi.fn(),
}))

vi.mock('@/lib/db', () => ({
  createLead: mockCreateLead,
}))

// ── Module under test ──────────────────────────────────────────────

import {
  storeLead,
  GOOGLE_SHEETS_HEADERS,
} from '@/lib/lead-storage'

import type { ContactFormData } from '@/lib/validations'

// ── Helpers ────────────────────────────────────────────────────────

function validLead(overrides: Partial<ContactFormData> = {}): ContactFormData {
  return {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '555-0100',
    company: 'Acme Inc',
    service_interest: 'web_design',
    budget_range: '2000_10000',
    message: 'I need a new website for my dental practice.',
    ...overrides,
  }
}

const validContext = {
  userAgent: 'vitest/1.0',
  referer: 'https://outboundautonomy.com',
  ip: '203.0.113.1',
}

function fakeResponse(status: number, data: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
    text: async () => (typeof data === 'string' ? data : JSON.stringify(data)),
    headers: new Headers(),
  } as Response
}

const ORIGINAL_ENV = { ...process.env }

// ── Tests ──────────────────────────────────────────────────────────

describe('storeLead', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Remove Google env vars so SQLite is the default path
    delete process.env.GOOGLE_OAUTH_CLIENT_ID
    delete process.env.GOOGLE_OAUTH_CLIENT_SECRET
    delete process.env.GOOGLE_OAUTH_REFRESH_TOKEN
    delete process.env.GOOGLE_LEADS_SPREADSHEET_ID
    delete process.env.GOOGLE_LEADS_WEBHOOK_URL
    delete process.env.GOOGLE_LEADS_WEBHOOK_SECRET
    delete process.env.GOOGLE_LEADS_SHEET_NAME
    delete process.env.VERCEL
  })

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV }
  })

  // ── SQLite path ───────────────────────────────────────────────

  describe('SQLite fallback', () => {
    it('stores a lead via SQLite when no Google config is set', async () => {
      mockCreateLead.mockReturnValue(42)
      const result = await storeLead(validLead(), validContext)

      expect(result.destination).toBe('sqlite')
      expect(result.id).toBe(42)
      expect(result.durable).toBe(true) // not VERCEL
      expect(mockCreateLead).toHaveBeenCalledWith(validLead())
    })

    it('marks sqlite as non-durable when VERCEL is set', async () => {
      process.env.VERCEL = '1'
      mockCreateLead.mockReturnValue(99)
      const result = await storeLead(validLead(), validContext)

      expect(result.destination).toBe('sqlite')
      expect(result.durable).toBe(false)
    })

    it('passes lead data with optional fields omitted', async () => {
      mockCreateLead.mockReturnValue(1)
      const minimal = validLead({ phone: undefined, company: undefined, budget_range: undefined })

      await storeLead(minimal, validContext)

      expect(mockCreateLead).toHaveBeenCalledWith(minimal)
    })

    it('throws when createLead returns falsy', async () => {
      mockCreateLead.mockReturnValue(0)
      await expect(storeLead(validLead(), validContext)).rejects.toThrow('Failed to create lead')
    })

    it('throws when createLead returns null', async () => {
      mockCreateLead.mockReturnValue(null as unknown as number | bigint)
      await expect(storeLead(validLead(), validContext)).rejects.toThrow('Failed to create lead')
    })

    it('handles bigint return from createLead', async () => {
      mockCreateLead.mockReturnValue(BigInt(9007199254740991))
      const result = await storeLead(validLead(), validContext)

      expect(result.id).toBe('9007199254740991')
      expect(result.destination).toBe('sqlite')
    })

    it('returns no context in the result', async () => {
      mockCreateLead.mockReturnValue(7)
      const result = await storeLead(validLead(), validContext)

      // SQLite result should not expose raw context fields
      expect((result as Record<string, unknown>).userAgent).toBeUndefined()
      expect((result as Record<string, unknown>).ip).toBeUndefined()
    })
  })

  // ── Google Apps Script webhook path ───────────────────────────

  describe('Google Apps Script webhook', () => {
    beforeEach(() => {
      process.env.GOOGLE_LEADS_WEBHOOK_URL = 'https://script.google.com/macros/s/test/exec'
      process.env.GOOGLE_LEADS_WEBHOOK_SECRET = 'test-secret-123'
    })

    it('sends lead to webhook with correct payload', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        fakeResponse(200, { ok: true, id: 'webhook-abc' })
      )

      const result = await storeLead(validLead(), validContext)

      expect(result.destination).toBe('google_apps_script')
      expect(result.id).toBe('webhook-abc')
      expect(result.durable).toBe(true)

      expect(fetchSpy).toHaveBeenCalledTimes(1)
      const [url, init] = fetchSpy.mock.calls[0]
      expect(url).toBe('https://script.google.com/macros/s/test/exec')
      const body = JSON.parse((init as RequestInit).body as string)
      expect(body.secret).toBe('test-secret-123')
      expect(body.source).toBe('outboundautonomy.com')
      expect(body.lead).toEqual(validLead())
      expect(body.context).toEqual(validContext)
      expect(body.submittedAt).toBeDefined()
    })

    it('falls back to timestamp id when webhook does not return an id', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        fakeResponse(200, { ok: true })
      )

      const result = await storeLead(validLead(), validContext)

      expect(result.destination).toBe('google_apps_script')
      expect(result.id).toBeDefined()
      expect(result.id).not.toBe('')
    })

    it('throws when webhook returns non-200', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        fakeResponse(500, { error: 'Internal error' })
      )

      await expect(storeLead(validLead(), validContext)).rejects.toThrow(
        'Internal error'
      )
    })

    it('throws when webhook returns ok: false', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        fakeResponse(200, { ok: false, error: 'Bad secret' })
      )

      await expect(storeLead(validLead(), validContext)).rejects.toThrow('Bad secret')
    })

    it('falls back to SQLite when webhook secret is missing', async () => {
      delete process.env.GOOGLE_LEADS_WEBHOOK_SECRET
      mockCreateLead.mockReturnValue(1)

      const result = await storeLead(validLead(), validContext)

      expect(result.destination).toBe('sqlite')
    })

    it('falls back to SQLite when webhook URL is missing', async () => {
      delete process.env.GOOGLE_LEADS_WEBHOOK_URL
      mockCreateLead.mockReturnValue(1)

      const result = await storeLead(validLead(), validContext)

      expect(result.destination).toBe('sqlite')
    })
  })

  // ── Google Sheets direct path ─────────────────────────────────

  describe('Google Sheets direct', () => {
    beforeEach(() => {
      process.env.GOOGLE_OAUTH_CLIENT_ID = 'test-client-id'
      process.env.GOOGLE_OAUTH_CLIENT_SECRET = 'test-client-secret'
      process.env.GOOGLE_OAUTH_REFRESH_TOKEN = 'test-refresh-token'
      process.env.GOOGLE_LEADS_SPREADSHEET_ID = 'test-spreadsheet-id'
    })

    it('sends lead to Google Sheets with correct auth flow', async () => {
      // Step 1: OAuth token refresh
      // Step 2: Sheets append
      const fetchSpy = vi.spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce(
          fakeResponse(200, { access_token: 'ya29.test-token' })
        )
        .mockResolvedValueOnce(
          fakeResponse(200, { updates: { updatedRange: 'Leads!A14:M14' } })
        )

      const result = await storeLead(validLead(), validContext)

      expect(result.destination).toBe('google_sheets')
      expect(result.id).toBe('Leads!A14:M14')
      expect(result.durable).toBe(true)

      // Verify OAuth call
      expect(fetchSpy).toHaveBeenCalledTimes(2)
      const [oauthUrl, oauthInit] = fetchSpy.mock.calls[0]
      expect(oauthUrl).toBe('https://oauth2.googleapis.com/token')
      const oauthBody = new URLSearchParams((oauthInit as RequestInit).body as string)
      expect(oauthBody.get('client_id')).toBe('test-client-id')
      expect(oauthBody.get('refresh_token')).toBe('test-refresh-token')
      expect(oauthBody.get('grant_type')).toBe('refresh_token')

      // Verify Sheets append call
      const [sheetsUrl, sheetsInit] = fetchSpy.mock.calls[1]
      expect(sheetsUrl).toContain('sheets.googleapis.com/v4/spreadsheets/test-spreadsheet-id/values/')
      expect(sheetsUrl).toContain(':append')
      expect((sheetsInit as RequestInit).headers).toMatchObject({
        Authorization: 'Bearer ya29.test-token',
      })

      const sheetsBody = JSON.parse((sheetsInit as RequestInit).body as string)
      expect(sheetsBody.values[0].length).toBe(13) // A:M = 13 columns
      expect(sheetsBody.values[0][2]).toBe('Jane Doe')  // Name
      expect(sheetsBody.values[0][3]).toBe('jane@example.com')  // Email
    })

    it('uses custom sheet name from environment', async () => {
      process.env.GOOGLE_LEADS_SHEET_NAME = 'CustomLeads'

      vi.spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce(fakeResponse(200, { access_token: 'token' }))
        .mockResolvedValueOnce(fakeResponse(200, { updates: { updatedRange: 'CustomLeads!A1:M1' } }))

      const fetchSpy = vi.spyOn(globalThis, 'fetch')
      await storeLead(validLead(), validContext)

      const [, sheetsInit] = fetchSpy.mock.calls[1]
      const sheetsBody = JSON.parse((sheetsInit as RequestInit).body as string)
      expect(sheetsBody.values[0][11]).toBe('203.0.113.1') // IP column
    })

    it('prefers sheets over webhook when both are configured', async () => {
      // Also set webhook config
      process.env.GOOGLE_LEADS_WEBHOOK_URL = 'https://script.google.com/test'
      process.env.GOOGLE_LEADS_WEBHOOK_SECRET = 'secret'

      const fetchSpy = vi.spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce(fakeResponse(200, { access_token: 'token' }))
        .mockResolvedValueOnce(fakeResponse(200, { updates: { updatedRange: 'Leads!A1:M1' } }))

      const result = await storeLead(validLead(), validContext)

      expect(result.destination).toBe('google_sheets')
      // Only 2 calls: OAuth + Sheets; webhook was not called
      expect(fetchSpy).toHaveBeenCalledTimes(2)
    })

    it('falls back to timestamp id when Sheets response has no updatedRange', async () => {
      vi.spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce(fakeResponse(200, { access_token: 'token' }))
        .mockResolvedValueOnce(fakeResponse(200, { updates: {} }))

      const result = await storeLead(validLead(), validContext)

      expect(result.destination).toBe('google_sheets')
      expect(result.id).toBeDefined()
      expect(result.id).toBeTruthy()
    })

    it('throws when OAuth token refresh fails', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        fakeResponse(400, { error: 'invalid_grant', error_description: 'Bad refresh token' })
      )

      await expect(storeLead(validLead(), validContext)).rejects.toThrow('Bad refresh token')
    })

    it('throws when OAuth returns no access_token', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        fakeResponse(200, {})
      )

      await expect(storeLead(validLead(), validContext)).rejects.toThrow(
        'Failed to refresh Google access token'
      )
    })

    it('throws when Sheets append fails', async () => {
      vi.spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce(fakeResponse(200, { access_token: 'token' }))
        .mockResolvedValueOnce(
          fakeResponse(403, { error: { message: 'Insufficient permissions' } })
        )

      await expect(storeLead(validLead(), validContext)).rejects.toThrow(
        'Insufficient permissions'
      )
    })

    it('throws when Sheets append status is not ok without error message', async () => {
      vi.spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce(fakeResponse(200, { access_token: 'token' }))
        .mockResolvedValueOnce(fakeResponse(500, 'Internal Server Error'))

      await expect(storeLead(validLead(), validContext)).rejects.toThrow(
        /Google Sheets append failed with status 500/
      )
    })

    it('handles optional fields as empty strings in sheet row', async () => {
      vi.spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce(fakeResponse(200, { access_token: 'token' }))
        .mockResolvedValueOnce(fakeResponse(200, { updates: { updatedRange: 'Leads!A5:M5' } }))

      const minimal = validLead({ phone: undefined, company: undefined, budget_range: undefined })
      const fetchSpy = vi.spyOn(globalThis, 'fetch')

      await storeLead(minimal, { userAgent: null, referer: null, ip: null })

      const [, sheetsInit] = fetchSpy.mock.calls[1]
      const sheetsBody = JSON.parse((sheetsInit as RequestInit).body as string)
      const row = sheetsBody.values[0]

      expect(row[4]).toBe('') // phone
      expect(row[5]).toBe('') // company
      expect(row[6]).toBe('web_design') // service_interest (required, always present)
      expect(row[7]).toBe('') // budget_range
      expect(row[9]).toBe('') // userAgent
      expect(row[10]).toBe('') // referer
      expect(row[11]).toBe('') // ip
    })
  })

  // ── Routing priority ──────────────────────────────────────────

  describe('routing priority', () => {
    it('routes to Google Sheets when all 4 OAuth vars are set', async () => {
      process.env.GOOGLE_OAUTH_CLIENT_ID = 'id'
      process.env.GOOGLE_OAUTH_CLIENT_SECRET = 'sec'
      process.env.GOOGLE_OAUTH_REFRESH_TOKEN = 'ref'
      process.env.GOOGLE_LEADS_SPREADSHEET_ID = 'sheet'

      vi.spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce(fakeResponse(200, { access_token: 'token' }))
        .mockResolvedValueOnce(fakeResponse(200, { updates: { updatedRange: 'Leads!A1:M1' } }))

      const result = await storeLead(validLead(), validContext)
      expect(result.destination).toBe('google_sheets')
    })

    it('routes to Apps Script when only webhook vars are set', async () => {
      process.env.GOOGLE_LEADS_WEBHOOK_URL = 'https://example.com/hook'
      process.env.GOOGLE_LEADS_WEBHOOK_SECRET = 'secret'

      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        fakeResponse(200, { ok: true, id: 'hook-1' })
      )

      const result = await storeLead(validLead(), validContext)
      expect(result.destination).toBe('google_apps_script')
    })

    it('routes to SQLite when no Google config is set', async () => {
      mockCreateLead.mockReturnValue(1)

      const result = await storeLead(validLead(), validContext)
      expect(result.destination).toBe('sqlite')
      expect(mockCreateLead).toHaveBeenCalled()
    })

    it('prefers sheets over Apps Script when both are configured', async () => {
      process.env.GOOGLE_OAUTH_CLIENT_ID = 'id'
      process.env.GOOGLE_OAUTH_CLIENT_SECRET = 'sec'
      process.env.GOOGLE_OAUTH_REFRESH_TOKEN = 'ref'
      process.env.GOOGLE_LEADS_SPREADSHEET_ID = 'sheet'
      process.env.GOOGLE_LEADS_WEBHOOK_URL = 'https://example.com/hook'
      process.env.GOOGLE_LEADS_WEBHOOK_SECRET = 'secret'

      const fetchSpy = vi.spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce(fakeResponse(200, { access_token: 'token' }))
        .mockResolvedValueOnce(fakeResponse(200, { updates: { updatedRange: 'Leads!A1:M1' } }))

      const result = await storeLead(validLead(), validContext)

      expect(result.destination).toBe('google_sheets')
      expect(fetchSpy).toHaveBeenCalledTimes(2)
    })
  })

  // ── Constants ─────────────────────────────────────────────────

  describe('GOOGLE_SHEETS_HEADERS', () => {
    it('has 13 columns covering all payload fields', () => {
      expect(GOOGLE_SHEETS_HEADERS).toHaveLength(13)
      expect(GOOGLE_SHEETS_HEADERS).toEqual([
        'Received At',
        'Source',
        'Name',
        'Email',
        'Phone',
        'Company',
        'Service Interest',
        'Budget Range',
        'Message',
        'User Agent',
        'Referer',
        'IP',
        'Raw JSON',
      ])
    })
  })
})
