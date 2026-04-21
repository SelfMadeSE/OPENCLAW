'use client'

import { useState } from 'react'
import { Container, Section } from '@/components/ui'

const faqs = [
  {
    question: "Can I cancel anytime?",
    answer: "Yes. All our plans are month-to-month with no long-term contracts. You can cancel anytime without penalties."
  },
  {
    question: "Do you offer refunds?",
    answer: "For AI Receptionist subscriptions: Cancel anytime and you won't be billed for the next month. For project work (web design, automation setup): Refunds are available within 14 days if work hasn't started."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! We offer a 14-day free trial for our AI Receptionist service. No credit card required to start."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards through our secure Stripe payment system. Enterprise clients can also pay via invoice."
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes, we serve clients worldwide. All pricing is in USD and our services work globally."
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
            <h2 className="text-4xl font-bold text-static mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted">Everything you need to know about our pricing</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-depth rounded-lg border border-steel overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-depth/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-static">{faq.question}</h3>
                  <svg 
                    className={`w-5 h-5 text-signal transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
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