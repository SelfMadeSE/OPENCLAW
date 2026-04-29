import { createLead } from '@/lib/db'
import { ContactFormData } from '@/lib/validations'

interface StoredLeadResult {
  id: string | number
  destination: 'google_sheets' | 'google_apps_script' | 'sqlite'
  durable: boolean
}

interface LeadContext {
  userAgent?: string | null
  referer?: string | null
  ip?: string | null
}

const GOOGLE_SHEETS_HEADERS = [
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
]

function hasDirectGoogleSheetsConfig() {
  return Boolean(
    process.env.GOOGLE_OAUTH_CLIENT_ID &&
      process.env.GOOGLE_OAUTH_CLIENT_SECRET &&
      process.env.GOOGLE_OAUTH_REFRESH_TOKEN &&
      process.env.GOOGLE_LEADS_SPREADSHEET_ID
  )
}

function getSheetName() {
  return process.env.GOOGLE_LEADS_SHEET_NAME || 'Leads'
}

async function getGoogleAccessToken() {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
      refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN || '',
      grant_type: 'refresh_token',
    }),
  })

  const data = (await response.json()) as { access_token?: string; error?: string; error_description?: string }

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || 'Failed to refresh Google access token')
  }

  return data.access_token
}

async function appendGoogleSheetRow(lead: ContactFormData, context: LeadContext): Promise<StoredLeadResult> {
  const accessToken = await getGoogleAccessToken()
  const spreadsheetId = process.env.GOOGLE_LEADS_SPREADSHEET_ID
  const now = new Date().toISOString()
  const payload = {
    source: 'outboundautonomy.com',
    submittedAt: now,
    lead,
    context,
  }

  const row = [
    now,
    payload.source,
    lead.name,
    lead.email,
    lead.phone || '',
    lead.company || '',
    lead.service_interest,
    lead.budget_range || '',
    lead.message,
    context.userAgent || '',
    context.referer || '',
    context.ip || '',
    JSON.stringify(payload),
  ]

  const range = encodeURIComponent(`${getSheetName()}!A:M`)
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        majorDimension: 'ROWS',
        values: [row],
      }),
    }
  )

  const data = (await response.json()) as {
    updates?: { updatedRange?: string }
    error?: { message?: string }
  }

  if (!response.ok) {
    throw new Error(data.error?.message || `Google Sheets append failed with status ${response.status}`)
  }

  return {
    id: data.updates?.updatedRange || now,
    destination: 'google_sheets',
    durable: true,
  }
}

async function createGoogleAppsScriptLead(lead: ContactFormData, context: LeadContext): Promise<StoredLeadResult> {
  const webhookUrl = process.env.GOOGLE_LEADS_WEBHOOK_URL
  const secret = process.env.GOOGLE_LEADS_WEBHOOK_SECRET

  if (!webhookUrl || !secret) {
    throw new Error('Google lead webhook is not configured')
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret,
      source: 'outboundautonomy.com',
      submittedAt: new Date().toISOString(),
      lead,
      context,
    }),
  })

  const text = await response.text()
  let data: { ok?: boolean; id?: string; error?: string } = {}

  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    data = { error: text }
  }

  if (!response.ok || data.ok === false) {
    throw new Error(data.error || `Google lead webhook failed with status ${response.status}`)
  }

  return {
    id: data.id || new Date().toISOString(),
    destination: 'google_apps_script',
    durable: true,
  }
}

async function createSqliteLead(lead: ContactFormData): Promise<StoredLeadResult> {
  const id = await createLead(lead)
  if (id === undefined || id === null) {
    throw new Error('Failed to create lead')
  }

  return {
    id: id,
    destination: 'sqlite',
    durable: !process.env.VERCEL,
  }
}

export async function storeLead(lead: ContactFormData, context: LeadContext): Promise<StoredLeadResult> {
  if (hasDirectGoogleSheetsConfig()) {
    return appendGoogleSheetRow(lead, context)
  }

  if (process.env.GOOGLE_LEADS_WEBHOOK_URL && process.env.GOOGLE_LEADS_WEBHOOK_SECRET) {
    return createGoogleAppsScriptLead(lead, context)
  }

  return createSqliteLead(lead)
}

export { GOOGLE_SHEETS_HEADERS }
