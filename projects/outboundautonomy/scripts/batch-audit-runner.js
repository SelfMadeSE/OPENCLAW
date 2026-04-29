#!/usr/bin/env node

/**
 * Batch Audit Runner
 * Runs outboundautonomy.com audit on multiple business websites
 * 
 * Usage:
 *   node scripts/batch-audit-runner.js \
 *     --input data/discovered-businesses.json \
 *     --output data/audit-results.json \
 *     --concurrent 3
 */

const fs = require('fs');
const path = require('path');
const { setTimeout: delay } = require('timers/promises');

class BatchAuditRunner {
    constructor(options = {}) {
        this.auditApiUrl = options.auditApiUrl || 'https://outboundautonomy.com/api/audit';
        this.concurrent = options.concurrent || 3;
        this.delayBetweenRequests = options.delayBetweenRequests || 2000;
        this.timeout = options.timeout || 30000;
        this.userAgent = 'OutboundAutonomyBatchAudit/1.0 (+https://outboundautonomy.com)';
    }

    async runBatchAudits(inputFile, outputFile) {
        console.log('🚀 Starting batch audit runner...');
        console.log(`📥 Input: ${inputFile}`);
        console.log(`📤 Output: ${outputFile}`);
        console.log(`⚡ Concurrent: ${this.concurrent}`);
        console.log(`⏱️  Delay: ${this.delayBetweenRequests}ms`);
        console.log('-'.repeat(50));

        // Load businesses from input file
        const businesses = this.loadBusinesses(inputFile);
        console.log(`📋 Loaded ${businesses.length} businesses to audit`);

        // Run audits
        const results = await this.processBatch(businesses);

        // Save results
        this.saveResults(results, outputFile);
        
        // Print summary
        this.printSummary(results);

        return results;
    }

    loadBusinesses(inputFile) {
        try {
            const rawData = fs.readFileSync(inputFile, 'utf8');
            const data = JSON.parse(rawData);
            
            if (!data.businesses || !Array.isArray(data.businesses)) {
                throw new Error('Invalid input file format: missing businesses array');
            }

            console.log(`📂 Discovery info: ${data.discovery_info?.location || 'Unknown'}, ${data.discovery_info?.discovered_at || 'Unknown'}`);
            return data.businesses;
        } catch (error) {
            console.error(`❌ Failed to load businesses from ${inputFile}:`, error.message);
            process.exit(1);
        }
    }

    async processBatch(businesses) {
        const results = [];
        let completed = 0;
        let successful = 0;
        let failed = 0;

        console.log(`🔄 Processing ${businesses.length} businesses...`);

        // Process in batches
        for (let i = 0; i < businesses.length; i += this.concurrent) {
            const batch = businesses.slice(i, i + this.concurrent);
            console.log(`🚀 Processing batch ${Math.floor(i / this.concurrent) + 1} (${batch.length} businesses)`);

            const batchPromises = batch.map(async (business, index) => {
                const result = await this.runSingleAudit(business);
                
                completed++;
                if (result.success) {
                    successful++;
                    console.log(`✅ [${completed}/${businesses.length}] ${business.name}: ${result.audit?.overallScore}/100`);
                } else {
                    failed++;
                    console.log(`❌ [${completed}/${businesses.length}] ${business.name}: ${result.error}`);
                }

                return result;
            });

            const batchResults = await Promise.allSettled(batchPromises);
            
            // Add results to main array
            batchResults.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    results.push(result.value);
                } else {
                    results.push({
                        business: batch[index],
                        success: false,
                        error: result.reason.message,
                        timestamp: new Date().toISOString()
                    });
                }
            });

            // Rate limiting delay between batches
            if (i + this.concurrent < businesses.length) {
                console.log(`⏳ Waiting ${this.delayBetweenRequests}ms before next batch...`);
                await delay(this.delayBetweenRequests);
            }
        }

        console.log(`\n📊 Batch processing complete`);
        return results;
    }

    async runSingleAudit(business) {
        const startTime = Date.now();
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(this.auditApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent
                },
                body: JSON.stringify({
                    url: business.website,
                    businessDescription: business.description || `${business.name} - ${business.category} in ${business.address}`
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text().catch(() => 'No error details');
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const auditData = await response.json();
            const responseTime = Date.now() - startTime;

            return {
                business: business,
                audit: auditData,
                success: true,
                responseTime,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            return {
                business: business,
                success: false,
                error: error.message,
                responseTime: Date.now() - startTime,
                timestamp: new Date().toISOString()
            };
        }
    }

    saveResults(results, outputFile) {
        const outputData = {
            audit_info: {
                total_businesses: results.length,
                successful_audits: results.filter(r => r.success).length,
                failed_audits: results.filter(r => !r.success).length,
                generated_at: new Date().toISOString(),
                script_version: '1.0.0'
            },
            results: results
        };

        try {
            // Create output directory if it doesn't exist
            const outputDir = path.dirname(outputFile);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2));
            console.log(`💾 Results saved to ${outputFile}`);
        } catch (error) {
            console.error(`❌ Failed to save results to ${outputFile}:`, error.message);
            process.exit(1);
        }
    }

    printSummary(results) {
        const successful = results.filter(r => r.success);
        const failed = results.filter(r => !r.success);
        
        console.log('\n📊 AUDIT SUMMARY');
        console.log('-'.repeat(50));
        console.log(`Total Audits: ${results.length}`);
        console.log(`✅ Successful: ${successful.length}`);
        console.log(`❌ Failed: ${failed.length}`);
        
        if (successful.length > 0) {
            const avgScore = successful.reduce((sum, r) => sum + (r.audit?.overallScore || 0), 0) / successful.length;
            const avgResponseTime = successful.reduce((sum, r) => sum + (r.responseTime || 0), 0) / successful.length;
            
            console.log(`📈 Average Score: ${Math.round(avgScore)}/100`);
            console.log(`⚡ Avg Response Time: ${Math.round(avgResponseTime)}ms`);
            
            // Score distribution
            const scoreRanges = {
                'A (90-100)': successful.filter(r => r.audit?.overallScore >= 90).length,
                'B (80-89)': successful.filter(r => r.audit?.overallScore >= 80 && r.audit?.overallScore < 90).length,
                'C (70-79)': successful.filter(r => r.audit?.overallScore >= 70 && r.audit?.overallScore < 80).length,
                'D (60-69)': successful.filter(r => r.audit?.overallScore >= 60 && r.audit?.overallScore < 70).length,
                'F (0-59)': successful.filter(r => r.audit?.overallScore < 60).length
            };
            
            console.log('\n📊 Score Distribution:');
            for (const [range, count] of Object.entries(scoreRanges)) {
                if (count > 0) {
                    console.log(`   ${range}: ${count}`);
                }
            }
        }
        
        if (failed.length > 0) {
            console.log('\n❌ Failed Audits:');
            failed.slice(0, 5).forEach(r => {
                console.log(`   ${r.business.name}: ${r.error}`);
            });
            if (failed.length > 5) {
                console.log(`   ... and ${failed.length - 5} more`);
            }
        }
        
        console.log('-'.repeat(50));
    }
}

// Command line interface
function main() {
    const args = process.argv.slice(2);
    
    const options = {
        input: 'data/discovered-businesses.json',
        output: 'data/audit-results.json',
        concurrent: 3
    };
    
    // Parse command line arguments
    for (let i = 0; i < args.length; i += 2) {
        if (args[i] === '--input') options.input = args[i + 1];
        if (args[i] === '--output') options.output = args[i + 1];
        if (args[i] === '--concurrent') options.concurrent = parseInt(args[i + 1]);
        if (args[i] === '--help') {
            console.log(`
Batch Audit Runner - Run audits on multiple business websites

USAGE:
  node scripts/batch-audit-runner.js [OPTIONS]

OPTIONS:
  --input FILE      Input JSON file with business list (default: data/discovered-businesses.json)
  --output FILE    Output JSON file for audit results (default: data/audit-results.json)  
  --concurrent N   Number of concurrent audits (default: 3)
  --help           Show this help message

EXAMPLE:
  node scripts/batch-audit-runner.js \\
    --input data/discovered-businesses.json \\
    --output data/audit-results.json \\
    --concurrent 3
`);
            process.exit(0);
        }
    }
    
    const runner = new BatchAuditRunner({
        concurrent: options.concurrent
    });
    
    runner.runBatchAudits(options.input, options.output)
        .then(() => {
            console.log('\n✅ Batch audit complete!');
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

module.exports = BatchAuditRunner;