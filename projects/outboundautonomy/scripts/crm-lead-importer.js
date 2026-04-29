#!/usr/bin/env node

/**
 * CRM Lead Importer
 * Imports audit-sourced leads into the CRM system
 * 
 * Usage:
 *   node scripts/crm-lead-importer.js \
 *     --input data/email-templates.json \
 *     --source "audit-outreach-pipeline" \
 *     --tag "grand-prairie-local-audit"
 */

const fs = require('fs');
const path = require('path');

// Import the lead storage functionality
const { storeLead } = require('../lib/lead-storage');

class CRMLeadImporter {
    constructor(options = {}) {
        this.source = options.source || 'audit-outreach-pipeline';
        this.tags = options.tags || ['grand-prairie-local-audit', 'cold-outreach'];
        this.userAgent = 'AuditPipelineBot/1.0 (+https://outboundautonomy.com)';
    }

    async importLeads(inputFile) {
        console.log('🚀 Starting CRM lead import...');
        console.log(`📥 Input: ${inputFile}`);
        console.log(`🏷️  Source: ${this.source}`);
        console.log(`🏷️  Tags: ${this.tags.join(', ')}`);
        console.log('-'.repeat(50));

        // Load email templates
        const emailData = this.loadEmailTemplates(inputFile);
        const emails = emailData.emails || [];

        console.log(`📧 Processing ${emails.length} email templates...`);

        const results = [];
        let successful = 0;
        let failed = 0;

        // Process each email template
        for (let i = 0; i < emails.length; i++) {
            const email = emails[i];
            
            console.log(`📥 [${i + 1}/${emails.length}] Importing: ${email.business.name}`);

            try {
                const leadData = this.convertToLead(email);
                const result = await this.importLead(leadData, email);

                results.push({
                    business: email.business.name,
                    email: email.email.to,
                    crm_id: result.id,
                    destination: result.destination,
                    success: true,
                    timestamp: new Date().toISOString()
                });

                successful++;
                console.log(`   ✅ Imported: CRM ID ${result.id} (${result.destination})`);

            } catch (error) {
                results.push({
                    business: email.business.name,
                    email: email.email.to,
                    error: error.message,
                    success: false,
                    timestamp: new Date().toISOString()
                });

                failed++;
                console.log(`   ❌ Failed: ${error.message}`);
            }

            // Small delay to avoid overwhelming the CRM
            if (i < emails.length - 1) {
                await this.delay(500);
            }
        }

        // Save import results
        const outputFile = inputFile.replace('.json', '-import-results.json');
        this.saveImportResults(results, outputFile);

        // Print summary
        this.printImportSummary(results, successful, failed);

        return { results, successful, failed };
    }

    loadEmailTemplates(inputFile) {
        try {
            const rawData = fs.readFileSync(inputFile, 'utf8');
            return JSON.parse(rawData);
        } catch (error) {
            console.error(`❌ Failed to load email templates from ${inputFile}:`, error.message);
            process.exit(1);
        }
    }

    convertToLead(email) {
        // Convert email template to CRM lead format
        const business = email.business;
        const metadata = email.metadata;

        return {
            // Contact information
            name: this.guessContactName(business),
            email: email.email.to,
            phone: business.phone || '',
            company: business.name,

            // Service information
            service_interest: 'Website Audit & Development',
            budget_range: metadata.pricing_estimate,

            // Message with audit context
            message: this.createLeadMessage(email),

            // Additional context
            source: this.source,
            tags: this.tags.join(', '),
            audit_metadata: {
                score: metadata.audit_score,
                issue_count: metadata.issue_count,
                high_priority_issues: metadata.high_priority_issues,
                conversion_potential: metadata.estimated_conversion_potential,
                business_category: metadata.category
            }
        };
    }

    guessContactName(business) {
        // Guess contact name from business information
        // Try to extract a name from the business name
        const name = business.name;
        
        // Remove common business suffixes
        const cleanName = name.replace(/\s+(Ltd\.|Inc\.|Corp\.|LLC|Co\.|&\s+Sons|&\s+Daughters)/gi, '').trim();
        
        // If it looks like a person's name, use it
        if (cleanName.split(' ').length <= 3 && !/restaurant|plumbing|hvac|electric|auto|tire|hardware|sports/i.test(cleanName)) {
            return cleanName;
        }
        
        // Otherwise, use a generic business contact name
        return `${cleanName} Contact`;
    }

    createLeadMessage(email) {
        // Create lead message with audit context
        const business = email.business;
        const metadata = email.metadata;
        
        let message = `Automated website audit outreach for ${business.name}.\n\n`;
        message += `Audit Results:\n`;
        message += `- Overall Score: ${metadata.audit_score}/100\n`;
        message += `- Issues Found: ${metadata.issue_count}\n`;
        message += `- High Priority: ${metadata.high_priority_issues}\n`;
        message += `- Pricing Estimate: ${metadata.pricing_estimate}\n`;
        message += `- Category: ${metadata.category}\n\n`;
        
        message += `This lead was generated from the automated audit pipeline targeting ${business.category} businesses in the Grand Prairie/Alberta area.`;
        
        return message;
    }

    async importLead(leadData, context) {
        // Import a single lead into the CRM
        const leadContext = {
            userAgent: this.userAgent,
            referer: 'outboundautonomy.com',
            ip: '127.0.0.1' // Pipeline script
        };

        return await storeLead(leadData, leadContext);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    saveImportResults(results, outputFile) {
        const importData = {
            import_info: {
                total_leads: results.length,
                successful_imports: results.filter(r => r.success).length,
                failed_imports: results.filter(r => !r.success).length,
                source: this.source,
                tags: this.tags,
                imported_at: new Date().toISOString(),
                script_version: '1.0.0'
            },
            results: results,
            summary: this.generateImportSummary(results)
        };

        try {
            fs.writeFileSync(outputFile, JSON.stringify(importData, null, 2));
            console.log(`💾 Import results saved to ${outputFile}`);
        } catch (error) {
            console.error(`❌ Failed to save import results:`, error.message);
        }
    }

    generateImportSummary(results) {
        const successful = results.filter(r => r.success);
        const failed = results.filter(r => !r.success);

        return {
            by_destination: this.groupByDestination(successful),
            by_category: this.groupByCategory(results),
            by_score_range: this.groupByScoreRange(results),
            success_rate: results.length > 0 ? (successful.length / results.length * 100).toFixed(1) + '%' : '0%'
        };
    }

    groupByDestination(results) {
        const destinations = {};
        results.forEach(result => {
            const dest = result.destination || 'unknown';
            destinations[dest] = (destinations[dest] || 0) + 1;
        });
        return destinations;
    }

    groupByCategory(results) {
        const categories = {};
        results.forEach(result => {
            // This is simplified - in reality, you'd need to pass the category through
            const category = 'unknown'; // Would extract from email data
            categories[category] = (categories[category] || 0) + 1;
        });
        return categories;
    }

    groupByScoreRange(results) {
        const scoreRanges = {
            'A (90-100)': 0,
            'B (80-89)': 0,
            'C (70-79)': 0,
            'D (60-69)': 0,
            'F (0-59)': 0,
            'Unknown': 0
        };

        results.forEach(result => {
            // This is simplified - in reality, you'd need to pass the audit score through
            const scoreRange = 'Unknown'; // Would extract from email data
            scoreRanges[scoreRange] = (scoreRanges[scoreRange] || 0) + 1;
        });

        return scoreRanges;
    }

    printImportSummary(results, successful, failed) {
        console.log('\n📊 CRM IMPORT SUMMARY');
        console.log('-'.repeat(50));
        console.log(`Total Leads: ${results.length}`);
        console.log(`✅ Successful: ${successful}`);
        console.log(`❌ Failed: ${failed}`);
        
        if (results.length > 0) {
            const successRate = (successful / results.length * 100).toFixed(1);
            console.log(`📈 Success Rate: ${successRate}%`);
        }

        if (failed > 0) {
            console.log('\n❌ Failed Imports:');
            failed.slice(0, 5).forEach(result => {
                console.log(`   ${result.business}: ${result.error}`);
            });
            if (failed > 5) {
                console.log(`   ... and ${failed - 5} more`);
            }
        }

        console.log('\n🎯 Next Steps:');
        console.log('   1. Review imported leads in your CRM');
        console.log('   2. Verify email addresses and contact information');
        console.log('   3. Segment leads by priority (audit score, issue count)');
        console.log('   4. Begin email outreach campaign');
        console.log('   5. Track responses and conversions');
        
        console.log('-'.repeat(50));
    }
}

// Command line interface
function main() {
    const args = process.argv.slice(2);
    
    const options = {
        input: 'data/email-templates.json',
        source: 'audit-outreach-pipeline',
        tags: ['grand-prairie-local-audit', 'cold-outreach']
    };
    
    // Parse command line arguments
    for (let i = 0; i < args.length; i += 2) {
        if (args[i] === '--input') options.input = args[i + 1];
        if (args[i] === '--source') options.source = args[i + 1];
        if (args[i] === '--tags') options.tags = args[i + 1].split(',').map(tag => tag.trim());
        if (args[i] === '--help') {
            console.log(`
CRM Lead Importer - Import audit-sourced leads into CRM

USAGE:
  node scripts/crm-lead-importer.js [OPTIONS]

OPTIONS:
  --input FILE       Input JSON file with email templates (default: data/email-templates.json)
  --source NAME      Source name for CRM tracking (default: audit-outreach-pipeline)
  --tags TAGS        Comma-separated tags for CRM (default: grand-prairie-local-audit,cold-outreach)
  --help            Show this help message

EXAMPLE:
  node scripts/crm-lead-importer.js \\
    --input data/email-templates.json \\
    --source "audit-outreach-pipeline" \\
    --tags "grand-prairie-local-audit,cold-outreach,priority-lead"
`);
            process.exit(0);
        }
    }
    
    const importer = new CRMLeadImporter({
        source: options.source,
        tags: options.tags
    });
    
    importer.importLeads(options.input)
        .then(() => {
            console.log('\n✅ CRM import complete!');
            process.exit(0);
        })
        .catch(error => {
            console.error('\n❌ Fatal error:', error.message);
            process.exit(1);
        });
}

if (require.main === module) {
    main();
}

module.exports = CRMLeadImporter;