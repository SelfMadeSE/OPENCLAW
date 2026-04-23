-- Seed data for Outbound Autonomy database

-- Insert test waitlist entries
INSERT OR IGNORE INTO waitlist (email, name, service_interest, referral_source) VALUES 
('john.doe@example.com', 'John Doe', 'automation', 'Google'),
('jane.smith@example.com', 'Jane Smith', 'web_design', 'Friend'),
('bob.wilson@example.com', NULL, 'automation', 'LinkedIn');

-- Insert test lead
INSERT OR IGNORE INTO leads (name, email, phone, company, service_interest, budget_range, message) VALUES 
('Alice Johnson', 'alice.johnson@techstartup.com', '(555) 123-4567', 'Tech Startup Inc', 'automation', '500_2000', 'We are looking for automated lead handling and follow-up workflows to reduce missed opportunities and speed up response times.');