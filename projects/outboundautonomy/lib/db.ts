import initSqlJs, { Database as SqlJsDatabase } from 'sql.js'
import path from 'path'
import fs from 'fs'

// ---------------------------------------------------------------------------
// sql.js is a pure-JavaScript SQLite implementation compiled from C via
// Emscripten. It works in Vercel serverless functions (unlike better-sqlite3
// which is a native C++ addon and cannot be deployed to Vercel).
//
// On Vercel the database lives in /tmp and is ephemeral per-cold-start.
// For durable storage pair this with a Google Sheets or Turso backend.
// ---------------------------------------------------------------------------

let db: SqlJsDatabase
let initPromise: Promise<void> | null = null

async function ensureDb(): Promise<SqlJsDatabase> {
  if (db) return db

  if (!initPromise) {
    initPromise = (async () => {
      // Pre-load the WASM binary so sql.js can find it inside Vercel's
      // serverless bundle (Next.js tracing won't include .wasm files from
      // node_modules automatically).
      // Pre-load the WASM binary so sql.js can initialise inside Vercel
      // serverless functions (Next.js tracing includes files in the project
      // tree, but not .wasm files from node_modules).
      const wasmPath = path.join(process.cwd(), 'lib', 'vendor', 'sql-wasm.wasm')
      const wasmBinary: ArrayBuffer | undefined = fs.existsSync(wasmPath)
        ? (fs.readFileSync(wasmPath).buffer as ArrayBuffer)
        : undefined

      const SQL = await initSqlJs({ wasmBinary })

      const dbPath = process.env.VERCEL
        ? path.join('/tmp', 'outboundautonomy.db')
        : (process.env.DB_PATH || path.join(process.cwd(), 'data', 'outboundautonomy.db'))
      const dataDir = path.dirname(dbPath)

      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }

      if (fs.existsSync(dbPath)) {
        const fileBuffer = fs.readFileSync(dbPath)
        db = new SQL.Database(fileBuffer)
      } else {
        db = new SQL.Database()
      }

      const schemaPath = path.join(process.cwd(), 'db', 'schema.sql')
      if (fs.existsSync(schemaPath)) {
        const schema = fs.readFileSync(schemaPath, 'utf8')
        db.exec(schema)
      }

      // Persist to disk so subsequent cold starts can reload it.
      const data = db.export()
      fs.writeFileSync(dbPath, Buffer.from(data))
    })()
  }

  await initPromise
  return db!
}

function saveDb() {
  if (!db) return
  const dbPath = process.env.VERCEL
    ? path.join('/tmp', 'outboundautonomy.db')
    : (process.env.DB_PATH || path.join(process.cwd(), 'data', 'outboundautonomy.db'))
  const data = db.export()
  fs.writeFileSync(dbPath, Buffer.from(data))
}

// ---------------------------------------------------------------------------
// Public API — all functions are async because sql.js initialisation is async.
// ---------------------------------------------------------------------------

export async function createLead(lead: {
  name: string
  email: string
  phone?: string
  company?: string
  service_interest: string
  budget_range?: string
  message: string
}) {
  const d = await ensureDb()
  d.run(
    `INSERT INTO leads (name, email, phone, company, service_interest, budget_range, message)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      lead.name,
      lead.email,
      lead.phone || null,
      lead.company || null,
      lead.service_interest,
      lead.budget_range || null,
      lead.message,
    ]
  )
  saveDb()
  const row = d.exec('SELECT last_insert_rowid()')
  return row[0]?.values[0]?.[0] as number ?? 0
}

export async function createWaitlistEntry(entry: {
  email: string
  name?: string
  service_interest?: string
  referral_source?: string
}) {
  const d = await ensureDb()
  try {
    d.run(
      `INSERT INTO waitlist (email, name, service_interest, referral_source)
       VALUES (?, ?, ?, ?)`,
      [
        entry.email,
        entry.name || null,
        entry.service_interest || null,
        entry.referral_source || null,
      ]
    )
    saveDb()
    const row = d.exec('SELECT last_insert_rowid()')
    return row[0]?.values[0]?.[0] as number ?? 0
  } catch (error: any) {
    if (error?.message && /UNIQUE constraint/i.test(error.message)) {
      return null
    }
    throw error
  }
}

export async function createCustomer(customer: {
  stripe_customer_id?: string
  email: string
  name?: string
  phone?: string
  company?: string
}) {
  const d = await ensureDb()
  try {
    d.run(
      `INSERT INTO customers (stripe_customer_id, email, name, phone, company)
       VALUES (?, ?, ?, ?, ?)`,
      [
        customer.stripe_customer_id || null,
        customer.email,
        customer.name || null,
        customer.phone || null,
        customer.company || null,
      ]
    )
    saveDb()
    const row = d.exec('SELECT last_insert_rowid()')
    return row[0]?.values[0]?.[0] as number ?? 0
  } catch (error: any) {
    if (error?.message && /UNIQUE constraint/i.test(error.message)) {
      return null
    }
    throw error
  }
}

export async function getCustomerByEmail(email: string) {
  const d = await ensureDb()
  const stmt = d.prepare('SELECT * FROM customers WHERE email = ?')
  stmt.bind([email])
  if (stmt.step()) {
    const row = stmt.getAsObject()
    stmt.free()
    return row as any
  }
  stmt.free()
  return undefined
}

export async function getCustomerByStripeId(stripeCustomerId: string) {
  const d = await ensureDb()
  const stmt = d.prepare('SELECT * FROM customers WHERE stripe_customer_id = ?')
  stmt.bind([stripeCustomerId])
  if (stmt.step()) {
    const row = stmt.getAsObject()
    stmt.free()
    return row as { id: number; stripe_customer_id: string; email: string; name: string | null; phone: string | null; company: string | null }
  }
  stmt.free()
  return undefined
}

export async function createSubscription(subscription: {
  stripe_subscription_id: string
  customer_id: number
  plan_type: string
  status?: string
  current_period_start?: Date
  current_period_end?: Date
  cancel_at_period_end?: boolean
}) {
  const d = await ensureDb()
  try {
    d.run(
      `INSERT INTO subscriptions (
         stripe_subscription_id, customer_id, plan_type, status,
         current_period_start, current_period_end, cancel_at_period_end
       ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        subscription.stripe_subscription_id,
        subscription.customer_id,
        subscription.plan_type,
        subscription.status || 'active',
        subscription.current_period_start
          ? subscription.current_period_start.toISOString()
          : null,
        subscription.current_period_end
          ? subscription.current_period_end.toISOString()
          : null,
        subscription.cancel_at_period_end ? 1 : 0,
      ]
    )
    saveDb()
    const row = d.exec('SELECT last_insert_rowid()')
    return row[0]?.values[0]?.[0] as number ?? 0
  } catch (error: any) {
    if (error?.message && /UNIQUE constraint/i.test(error.message)) {
      return null
    }
    throw error
  }
}

export async function updateSubscription(
  stripeSubscriptionId: string,
  updates: {
    status?: string
    current_period_start?: Date
    current_period_end?: Date
    cancel_at_period_end?: boolean
  }
) {
  const d = await ensureDb()

  const fields: string[] = []
  const values: any[] = []

  if (updates.status !== undefined) {
    fields.push('status = ?')
    values.push(updates.status)
  }
  if (updates.current_period_start !== undefined) {
    fields.push('current_period_start = ?')
    values.push(updates.current_period_start.toISOString())
  }
  if (updates.current_period_end !== undefined) {
    fields.push('current_period_end = ?')
    values.push(updates.current_period_end.toISOString())
  }
  if (updates.cancel_at_period_end !== undefined) {
    fields.push('cancel_at_period_end = ?')
    values.push(updates.cancel_at_period_end ? 1 : 0)
  }

  if (fields.length === 0) return true

  fields.push('updated_at = CURRENT_TIMESTAMP')
  values.push(stripeSubscriptionId)

  d.run(
    `UPDATE subscriptions SET ${fields.join(', ')} WHERE stripe_subscription_id = ?`,
    values
  )
  saveDb()
  const row = d.exec('SELECT changes()')
  return (row[0]?.values[0]?.[0] as number ?? 0) > 0
}

export async function createPayment(payment: {
  stripe_payment_intent_id?: string
  stripe_charge_id?: string
  customer_id: number
  amount: number
  currency?: string
  status: string
  description?: string
}) {
  const d = await ensureDb()
  d.run(
    `INSERT INTO payments (
       stripe_payment_intent_id, stripe_charge_id, customer_id,
       amount, currency, status, description
     ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      payment.stripe_payment_intent_id || null,
      payment.stripe_charge_id || null,
      payment.customer_id,
      payment.amount,
      payment.currency || 'usd',
      payment.status,
      payment.description || null,
    ]
  )
  saveDb()
  const row = d.exec('SELECT last_insert_rowid()')
  return row[0]?.values[0]?.[0] as number ?? 0
}
