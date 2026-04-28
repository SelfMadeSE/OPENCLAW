'use client'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { DiscoveryCallCard } from './DiscoveryCallCard'

export function FinalCTA() {
  return (
    <Section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,229,255,0.03), transparent)',
        }}
      />

      <Container>
        <AnimatedSection>
          <DiscoveryCallCard />
        </AnimatedSection>
      </Container>
    </Section>
  )
}
