'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { BeforeAfterCard } from './BeforeAfterCard'

const cards = [
  {
    before: ['Hero slider', 'No CTA button', 'Generic stock photo'],
    after: ['"Schedule Service"', 'Persistent CTA', 'Above the fold'],
    metric: '+112%',
    metricLabel: 'conversion rate on homepage visits',
  },
  {
    before: ['No form on page', 'User must call', 'Buried contact page'],
    after: ['Quick form', 'Service type dropdown', 'Auto-confirmation'],
    metric: '+47',
    metricLabel: 'new leads/month from organic traffic',
  },
  {
    before: ['No service area', 'No LocalBusiness schema', 'Generic meta desc.'],
    after: ['City-specific pages', 'Full schema markup', 'Targeted metadata'],
    metric: '+340%',
    metricLabel: 'local search impressions in service area',
  },
  {
    before: ['No reviews shown', 'No ratings/badges', 'No guarantee language'],
    after: ['Testimonial strip', 'Rating badge', '"100% guaranteed" near CTA'],
    metric: '+28%',
    metricLabel: 'lead form completion rate',
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function SocialProof() {
  return (
    <Section>
      <Container>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-static text-center">
            Results from a typical audit
          </h2>
          <p className="text-muted text-center max-w-xl mx-auto mt-4">
            Based on audits of 100+ service business websites. Each fix is scoped to the
            client&apos;s actual site.
          </p>
        </AnimatedSection>

        <motion.div
          className="grid md:grid-cols-2 gap-6 mt-12"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {cards.map((card) => (
            <motion.div key={card.metric} variants={cardVariant}>
              <BeforeAfterCard {...card} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted mb-4 max-w-xl mx-auto">
            Not sure if your site has issues? Run the free audit. If nothing comes up, we&apos;ll
            tell you. If something does, you&apos;ll know exactly what and what it costs to fix.
          </p>
          <Button variant="primary" href="/#audit" size="lg">
            Run your free audit
            <ArrowRight className="ml-2 h-4 w-4 inline" aria-hidden="true" />
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}
