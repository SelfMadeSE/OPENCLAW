export type SupabaseInsertPayload = Record<string, unknown>

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function insertIntoSupabase(table: string, payload: SupabaseInsertPayload) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return {
      ok: false,
      status: 500,
      error: 'Supabase environment variables are missing.',
    }
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorText = await response.text()
    return {
      ok: false,
      status: response.status,
      error: errorText || 'Supabase insert failed.',
    }
  }

  const data = await response.json()

  return {
    ok: true,
    status: response.status,
    data,
  }
}
