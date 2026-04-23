'use client'

import { useState } from 'react'
import { Container, Section } from '@/components/ui'

const faqs = [
  {
    question: 'Do you publish fixed pricing?',
    answer: 'Not during pilot. We run discovery first, scope the workflow, and then provide pricing based on implementation complexity.'
  },
  {
    question: 'Do you guarantee outcomes in advance?',
    answer: 'No. We do not publish performance guarantees in advance. Fit, timeline, and expected outcomes are scoped per workflow.'
  },
  {
    question: 'Where are systems deployed?',
    answer: 'In your environment. We design for human oversight and escalation, especially for edge cases and approvals.'
  },
  {
    question: 'Are you live in production with clients?',
    answer: 'As of 2026-04-22, we are in closed pilot with sandbox-validated systems and no public client deployment claims.'
  },
  {
    question: 'How do we start?',
    answer: 'Book a discovery call. We map your repeatable process first and tell you directly whether there is a clean build path.'
  }
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
            <h2 className="text-4xl font-bold text-static mb-4">Pricing & pilot FAQ</h2>
            <p className="text-lg text-muted">What to expect before we quote or build</p>
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
              <a href="/contact" className="text-signal hover:text-signal/80 underline">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
