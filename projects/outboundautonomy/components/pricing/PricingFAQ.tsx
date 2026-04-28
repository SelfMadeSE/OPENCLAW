'use client'

import { useState } from 'react'
import { Container, Section } from '@/components/ui'

const faqs = [
  {
    question: 'Why don\'t you publish fixed prices?',
    answer: 'Because every website is different. A slow homepage needs different work than a missing lead capture system. Your free audit tells us exactly what\'s broken — then we quote based on the actual fixes needed, not a one-size-fits-all package.'
  },
  {
    question: 'Is the audit really free?',
    answer: 'Yes. Drop your URL, get your scores and findings immediately. No credit card, no sales call required. You only pay if you decide to fix what the audit finds.'
  },
  {
    question: 'What if I only want part of a tier?',
    answer: 'No problem. The audit lists every issue individually. You can pick specific fixes rather than a whole tier. We\'ll price each item separately — no minimum commitment.'
  },
  {
    question: 'How accurate are the price ranges?',
    answer: 'The ranges are based on real projects for similar businesses. Your exact quote comes after the audit — usually within one business day. If the scope changes mid-project, we tell you before we spend time on it.'
  },
  {
    question: 'Do you offer ongoing support after the build?',
    answer: 'Yes. Every tier includes a handoff walkthrough and documentation. Ongoing maintenance, content updates, and performance monitoring are available as a separate retainer — scoped to what you actually need.'
  },
  {
    question: 'How do we start?',
    answer: 'Enter your URL on the audit page. Get your report. If you want to move forward, reply with which fixes you want. We\'ll send back a price and timeline within 24 hours.'
  },
]

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-static mb-4">Pricing FAQ</h2>
            <p className="text-lg text-muted">How audit-led pricing works</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-depth rounded-lg border border-steel overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-depth/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-static">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-signal transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-muted">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted">
              Still have questions?{' '}
              <a href="/services" className="text-signal hover:text-signal/80 underline">
                Run a free audit first
              </a>
              {' '}or{' '}
              <a href="mailto:owner@outboundautonomy.com" className="text-signal hover:text-signal/80 underline">
                email us
              </a>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
