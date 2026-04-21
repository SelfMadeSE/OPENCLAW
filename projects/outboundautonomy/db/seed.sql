-- Seed data for Outbound Autonomy database

-- Insert test waitlist entries
INSERT OR IGNORE INTO waitlist (email, name, service_interest, referral_source) VALUES 
('john.doe@example.com', 'John Doe', 'ai_receptionist', 'Google'),
('jane.smith@example.com', 'Jane Smith', 'web_design', 'Friend'),
('bob.wilson@example.com', NULL, 'automation', 'LinkedIn');

-- Insert test lead
INSERT OR IGNORE INTO leads (name, email, phone, company, service_interest, budget_range, message) VALUES 
('Alice Johnson', 'alice.johnson@techstartup.com', '(555) 123-4567', 'Tech Startup Inc', 'ai_receptionist', '500_2000', 'We are looking for an AI receptionist solution to handle our growing call volume. Currently missing about 20% of calls and losing potential customers. Need basic call routing and appointment booking.');