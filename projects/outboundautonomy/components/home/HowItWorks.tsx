'use client'

import { motion } from 'framer-motion'
import { Search, ClipboardList, Zap, ArrowRight, ChevronDown } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'

const steps = [
  {
    num: '01',
    title: 'Audit',
    icon: Search,
    description:
      'Enter your URL. Our system crawls your pages, scores your design, conversion, technical signals, and Lighthouse data. You get a read-only report immediately — no email required.',
    outcome: 'A live audit report. Zero commitment. Takes 90 seconds.',
  },
  {
    num: '02',
    title: 'Plan',
    icon: ClipboardList,
    description:
      'If the audit shows the site needs work, we turn every finding into a scoped line item: what to change, why it matters, how much it costs. You get a flat-price proposal. No hourly billing. No scope creep.',
    outcome: 'A prioritized proposal with timelines and exact pricing.',
  },
  {
    num: '03',
    title: 'Build',
    icon: Zap,
    description:
      'We build the fixes — site changes, conversion flow, lead capture, follow-up automation. You get a working system, handoff documentation, and the confidence that your site is pulling its weight.',
    outcome: 'A site that converts. A follow-up system that runs itself.',
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Container>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-static text-center mb-4">
            Three steps. One week to a proposal. No surprises.
          </h2>
          <p className="text-muted text-center max-w-xl mx-auto mb-16">
            From audit to revenue — each phase has a concrete outcome and a fixed timeframe.
          </p>
        </AnimatedSection>

        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-0"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.num} className="flex flex-col md:flex-row items-center">
                <motion.div
                  variants={cardVariant}
                  className="flex flex-col items-center text-center bg-depth border border-steel/30 rounded-lg p-6 md:p-8 hover:border-signal/30 transition-all duration-300 max-w-[280px] md:max-w-[300px]"
                >
                  {/* Icon container */}
                  <div className="h-14 w-14 rounded-xl bg-signal/10 border border-signal/20 flex items-center justify-center mb-5 hover:scale-105 transition-transform duration-200">
                    <Icon className="h-7 w-7 text-signal" aria-hidden="true" />
                  </div>

                  {/* Step number */}
                  <span className="text-xs text-muted font-mono mb-2">{step.num}</span>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-static mb-3">{step.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-muted leading-relaxed mb-3">{step.description}</p>

                  {/* Outcome */}
                  <p className="text-xs text-signal/80 font-medium">{step.outcome}</p>
                </motion.div>

                {/* Connector arrow (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex items-center mx-2">
                    <motion.div
                      className="w-12 h-px bg-gradient-to-r from-signal/0 via-signal/40 to-signal/0"
                      initial={{ width: 0 }}
                      whileInView={{ width: '3rem' }}
                      transition={{ duration: 0.4, delay: i * 0.15 }}
                      viewport={{ once: true }}
                    />
                    <ArrowRight className="h-5 w-5 text-signal/60 -ml-2 shrink-0" aria-hidden="true" />
                  </div>
                )}

                {/* Connector chevron (mobile) */}
                {i < steps.length - 1 && (
                  <div className="md:hidden flex justify-center py-3">
                    <ChevronDown className="h-6 w-6 text-steel" aria-hidden="true" />
                  </div>
                )}
              </div>
            )
          })}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button variant="primary" href="/#audit" size="lg">
            Run your free audit
            <ArrowRight className="ml-2 h-4 w-4 inline" aria-hidden="true" />
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}
