'use client'

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'

const issues = [
  {
    severity: 'high' as const,
    label: 'No clear service CTA above the fold',
    fix: 'Add a persistent "Schedule Service" button visible without scrolling',
  },
  {
    severity: 'high' as const,
    label: 'No lead-capture form on the page',
    fix: 'Add name, phone, service type form with auto-confirmation',
  },
  {
    severity: 'medium' as const,
    label: 'No service area or location on homepage',
    fix: 'Add city/service-area metadata and schema markup',
  },
]

const severityColor = {
  high: 'bg-red-400',
  medium: 'bg-warm',
  low: 'bg-signal',
}

function ScoreBar({ score, color, delay = 0 }: { score: number; color: string; delay?: number }) {
  return (
    <div className="w-full bg-steel/30 rounded-full h-1.5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${score}%` }}
        transition={{ duration: 0.8, ease: 'easeOut', delay }}
        viewport={{ once: true }}
        className={`rounded-full h-1.5 ${color}`}
      />
    </div>
  )
}

export function AuditReportPreview() {
  return (
    <section className="py-16">
      <Container>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-static text-center mb-4">
            What you get
          </h2>
          <p className="text-muted text-center max-w-xl mx-auto mb-12">
            A read-only audit report with scores, priority issues, and targeted fixes — no email required.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="max-w-4xl mx-auto bg-depth border border-steel/30 rounded-xl shadow-card overflow-hidden">
            {/* Header bar */}
            <div className="px-6 py-4 border-b border-steel/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/40" />
                  <div className="h-3 w-3 rounded-full bg-warm/40" />
                  <div className="h-3 w-3 rounded-full bg-signal/40" />
                </div>
                <span className="text-xs text-muted font-mono">audit-report.html</span>
              </div>
              <Badge className="text-[10px]">Sample — example-hvac-service.com</Badge>
            </div>

            {/* Score row */}
            <div className="px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-steel/30">
              {/* Overall score */}
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-static">58</div>
                <div className="text-xs text-muted">/100 overall</div>
                <div className="mt-2 w-full bg-steel/30 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '58%' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="bg-red-400 rounded-full h-2"
                  />
                </div>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-red-400">
                  Grade F
                </span>
              </div>

              {/* Design/UI */}
              <div className="text-center">
                <div className="text-2xl font-bold text-warm">61</div>
                <div className="text-xs text-muted">Design/UI</div>
                <div className="mt-1 w-full bg-steel/30 rounded-full h-1.5 overflow-hidden">
                  <ScoreBar score={61} color="bg-warm" delay={0.15} />
                </div>
              </div>

              {/* Conversion */}
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">38</div>
                <div className="text-xs text-muted">Conversion</div>
                <div className="mt-1 w-full bg-steel/30 rounded-full h-1.5 overflow-hidden">
                  <ScoreBar score={38} color="bg-red-400" delay={0.3} />
                </div>
              </div>

              {/* Technical */}
              <div className="text-center">
                <div className="text-2xl font-bold text-signal">74</div>
                <div className="text-xs text-muted">Technical</div>
                <div className="mt-1 w-full bg-steel/30 rounded-full h-1.5 overflow-hidden">
                  <ScoreBar score={74} color="bg-signal" delay={0.45} />
                </div>
              </div>
            </div>

            {/* Issues preview */}
            <div className="px-6 py-5">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-4 w-4 text-warm" />
                <span className="text-sm font-semibold text-static">Top issues (3 of 4)</span>
              </div>

              <div className="space-y-3">
                {issues.map((issue, i) => (
                  <motion.div
                    key={issue.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className={`h-2 w-2 rounded-full ${severityColor[issue.severity]} mt-1.5 shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-static font-medium truncate">{issue.label}</p>
                      <p className="text-xs text-muted mt-0.5">{issue.fix}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <a
                  href="/sample-report"
                  className="text-sm text-signal hover:text-signal/80 transition-colors font-medium"
                >
                  See full report with recommendations →
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  )
}
