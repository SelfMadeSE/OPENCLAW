-- Outbound Autonomy Database Schema

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stripe_customer_id TEXT UNIQUE,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    phone TEXT,
    company TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stripe_subscription_id TEXT UNIQUE,
    customer_id INTEGER NOT NULL,
    plan_type TEXT NOT NULL CHECK (plan_type IN ('web_design_basic', 'web_design_standard', 'web_design_premium', 'automation_starter', 'automation_growth', 'automation_enterprise')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'paused', 'past_due')),
    current_period_start DATETIME,
    current_period_end DATETIME,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service_interest TEXT NOT NULL CHECK (service_interest IN ('web_design', 'app_development', 'automation', 'marketing', 'other')),
    budget_range TEXT CHECK (budget_range IN ('under_500', '500_2000', '2000_10000', '10000_plus', 'not_sure')),
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stripe_payment_intent_id TEXT UNIQUE,
    stripe_charge_id TEXT UNIQUE,
    customer_id INTEGER NOT NULL,
    amount INTEGER NOT NULL, -- in cents
    currency TEXT NOT NULL DEFAULT 'usd',
    status TEXT NOT NULL CHECK (status IN ('succeeded', 'failed', 'pending', 'refunded')),
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE
);

-- Waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    service_interest TEXT,
    referral_source TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_stripe_id ON customers(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_customer_id ON subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_service_interest ON leads(service_interest);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_payments_customer_id ON payments(customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_intent_id ON payments(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- Triggers for updated_at timestamps
CREATE TRIGGER IF NOT EXISTS update_customers_updated_at 
    AFTER UPDATE ON customers
BEGIN
    UPDATE customers SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_subscriptions_updated_at 
    AFTER UPDATE ON subscriptions
BEGIN
    UPDATE subscriptions SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_leads_updated_at 
    AFTER UPDATE ON leads
BEGIN
    UPDATE leads SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;