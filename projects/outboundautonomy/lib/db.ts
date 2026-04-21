import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

let db: Database.Database

export function getDb(): Database.Database {
  if (!db) {
    const dbPath = process.env.DB_PATH || path.join(process.cwd(), 'data', 'outboundautonomy.db')
    const dataDir = path.dirname(dbPath)
    
    // Create data directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    db = new Database(dbPath)
    
    // Initialize schema on first run
    const schemaPath = path.join(process.cwd(), 'db', 'schema.sql')
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, 'utf8')
      db.exec(schema)
    }
  }
  
  return db
}

// Lead functions
export function createLead(lead: {
  name: string
  email: string
  phone?: string
  company?: string
  service_interest: string
  budget_range?: string
  message: string
}) {
  const db = getDb()
  
  const stmt = db.prepare(`
    INSERT INTO leads (name, email, phone, company, service_interest, budget_range, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
  
  const result = stmt.run(
    lead.name,
    lead.email,
    lead.phone || null,
    lead.company || null,
    lead.service_interest,
    lead.budget_range || null,
    lead.message
  )
  
  return result.lastInsertRowid
}

// Waitlist functions
export function createWaitlistEntry(entry: {
  email: string
  name?: string
  service_interest?: string
  referral_source?: string
}) {
  const db = getDb()
  
  const stmt = db.prepare(`
    INSERT INTO waitlist (email, name, service_interest, referral_source)
    VALUES (?, ?, ?, ?)
  `)
  
  try {
    const result = stmt.run(
      entry.email,
      entry.name || null,
      entry.service_interest || null,
      entry.referral_source || null
    )
    
    return result.lastInsertRowid
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return null // Email already exists
    }
    throw error
  }
}

// Customer functions
export function createCustomer(customer: {
  stripe_customer_id?: string
  email: string
  name?: string
  phone?: string
  company?: string
}) {
  const db = getDb()
  
  const stmt = db.prepare(`
    INSERT INTO customers (stripe_customer_id, email, name, phone, company)
    VALUES (?, ?, ?, ?, ?)
  `)
  
  try {
    const result = stmt.run(
      customer.stripe_customer_id || null,
      customer.email,
      customer.name || null,
      customer.phone || null,
      customer.company || null
    )
    
    return result.lastInsertRowid
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return null // Email already exists
    }
    throw error
  }
}

export function getCustomerByEmail(email: string) {
  const db = getDb()
  
  const stmt = db.prepare(`
    SELECT * FROM customers WHERE email = ?
  `)
  
  return stmt.get(email)
}

export function getCustomerByStripeId(stripeCustomerId: string): { id: number; stripe_customer_id: string; email: string; name: string | null; phone: string | null; company: string | null } | undefined {
  const db = getDb()
  
  const stmt = db.prepare(`
    SELECT * FROM customers WHERE stripe_customer_id = ?
  `)
  
  return stmt.get(stripeCustomerId) as { id: number; stripe_customer_id: string; email: string; name: string | null; phone: string | null; company: string | null } | undefined
}

// Subscription functions
export function createSubscription(subscription: {
  stripe_subscription_id: string
  customer_id: number
  plan_type: string
  status?: string
  current_period_start?: Date
  current_period_end?: Date
  cancel_at_period_end?: boolean
}) {
  const db = getDb()
  
  const stmt = db.prepare(`
    INSERT INTO subscriptions (
      stripe_subscription_id, 
      customer_id, 
      plan_type, 
      status, 
      current_period_start, 
      current_period_end, 
      cancel_at_period_end
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
  
  try {
    const result = stmt.run(
      subscription.stripe_subscription_id,
      subscription.customer_id,
      subscription.plan_type,
      subscription.status || 'active',
      subscription.current_period_start || null,
      subscription.current_period_end || null,
      subscription.cancel_at_period_end || false
    )
    
    return result.lastInsertRowid
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return null // Subscription ID already exists
    }
    throw error
  }
}

export function updateSubscription(stripeSubscriptionId: string, updates: {
  status?: string
  current_period_start?: Date
  current_period_end?: Date
  cancel_at_period_end?: boolean
}) {
  const db = getDb()
  
  const fields = []
  const values = []
  
  if (updates.status !== undefined) {
    fields.push('status = ?')
    values.push(updates.status)
  }
  if (updates.current_period_start !== undefined) {
    fields.push('current_period_start = ?')
    values.push(updates.current_period_start)
  }
  if (updates.current_period_end !== undefined) {
    fields.push('current_period_end = ?')
    values.push(updates.current_period_end)
  }
  if (updates.cancel_at_period_end !== undefined) {
    fields.push('cancel_at_period_end = ?')
    values.push(updates.cancel_at_period_end)
  }
  
  if (fields.length === 0) {
    return true
  }
  
  fields.push('updated_at = CURRENT_TIMESTAMP')
  values.push(stripeSubscriptionId)
  
  const stmt = db.prepare(`
    UPDATE subscriptions 
    SET ${fields.join(', ')}
    WHERE stripe_subscription_id = ?
  `)
  
  const result = stmt.run(...values)
  return result.changes > 0
}

// Payment functions
export function createPayment(payment: {
  stripe_payment_intent_id?: string
  stripe_charge_id?: string
  customer_id: number
  amount: number
  currency?: string
  status: string
  description?: string
}) {
  const db = getDb()
  
  const stmt = db.prepare(`
    INSERT INTO payments (
      stripe_payment_intent_id, 
      stripe_charge_id, 
      customer_id, 
      amount, 
      currency, 
      status, 
      description
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
  
  const result = stmt.run(
    payment.stripe_payment_intent_id || null,
    payment.stripe_charge_id || null,
    payment.customer_id,
    payment.amount,
    payment.currency || 'usd',
    payment.status,
    payment.description || null
  )
  
  return result.lastInsertRowid
}