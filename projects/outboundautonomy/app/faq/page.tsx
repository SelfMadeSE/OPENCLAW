'use client'

import { useState } from 'react'
import { Container, Section, Button } from '@/components/ui'

interface FaqItem {
  question: string
  answer: string
}

interface FaqCategory {
  title: string
  items: FaqItem[]
}

const faqData: FaqCategory[] = [
  {
    title: 'The Audit',
    items: [
      {
        question: 'What exactly do you check during a website audit?',
        answer:
          'We review five areas: (1) Design & usability — layout, mobile responsiveness, load speed, navigation clarity. (2) Conversion flow — where leads enter, how forms behave, CTA placement, friction points. (3) Technical health — SEO tags, structure, crawlability, security, hosting setup. (4) Content & messaging — whether your copy speaks to your ideal client, how you differentiate, trust signals. (5) Competitive position — how your site compares to 3–5 direct competitors in your market on all the above.',
      },
      {
        question: 'How long does the audit take?',
        answer:
          'The automated scan runs in seconds. Our team reviews results the same business day. A full written report with screenshots, scores, and prioritized fixes lands in your inbox within 24 hours.',
      },
      {
        question: 'Do I need to create an account or log in?',
        answer:
          'No. Enter your URL, get your preview score instantly. If you want the full report, you provide an email — that\u2019s it.',
      },
      {
        question: 'What if my website is already well-designed? Is there still value?',
        answer:
          'Yes. Many well-designed sites still leak leads through slow load times, missing conversion paths, unclear CTAs, or technical SEO gaps. The audit surfaces the invisible stuff your designer didn\u2019t check.',
      },
      {
        question: 'Can you audit a site that isn\u2019t launched yet?',
        answer:
          'Yes — staging sites, password-protected dev URLs, and recently launched sites all work. If behind a login wall, we\u2019ll coordinate access.',
      },
      {
        question: 'What site builders / platforms do you support?',
        answer:
          'Any public website — WordPress, Squarespace, Wix, Webflow, Shopify, custom builds, GoDaddy, even one-page sites on Carrd. The audit is URL-based, not platform-dependent.',
      },
      {
        question: 'Do you store or share my website data?',
        answer:
          'Audit results are kept confidential. We use them only to prepare your report and proposals. We never share individual audit data publicly.',
      },
    ],
  },
  {
    title: 'Results & Pricing',
    items: [
      {
        question: 'What does the free audit include vs. the paid report?',
        answer:
          'The free preview shows your overall score (0–100) and flags the top 3 issues. The full report ($97 one-time) delivers: detailed scorecard by category, 15+ specific issues with screenshots, competitor comparison matrix (your site vs. 3–5 competitors), prioritized fix list ranked by impact, and estimated effort for each fix.',
      },
      {
        question: 'If I buy the full report, do I have to use Outbound Autonomy for the fixes?',
        answer:
          'Not at all. The report is yours. You can hand it to your current designer, agency, or in-house team. Many clients do exactly that. We obviously hope you hire us for the work, but the report stands alone.',
      },
      {
        question: 'How much do fixes typically cost?',
        answer:
          'It depends on your score and scope. We price in three bands tied to audit scores: 0–40 (Critical) — $12,000+ for full redesign, conversion overhaul, tech foundation. 41–70 (Needs Work) — ~$5,000 for targeted conversions, content refresh, technical fixes. 71–100 (Solid) — ~$1,500 for optimization, automation, competitive edge. We can also break larger projects into monthly retainers or phase-based milestones.',
      },
      {
        question: 'What if I don\u2019t want the full implementation?',
        answer:
          'No problem. The full report is still useful. You can also buy report credits for future re-audits at a discount.',
      },
      {
        question: 'Do you offer ongoing maintenance or just one-time projects?',
        answer:
          'Both. Many clients start with a one-time redesign and conversion fix, then move to monthly retainers for ongoing optimization, content updates, and workflow automation.',
      },
    ],
  },
  {
    title: 'Who This Is For',
    items: [
      {
        question: 'Is this for e-commerce sites or local service businesses?',
        answer:
          'Both, but Outbound Autonomy is built for local service businesses — plumbing, HVAC, roofing, dental, med spa, landscaping, cleaning, chiropractic, legal. If your business lives or dies by local leads, the audit is designed for you. E-commerce audits work too, but the recommendations skew toward conversion and technical rather than local SEO.',
      },
      {
        question: 'I own an agency. Can I use this for my clients?',
        answer:
          'Yes — we have partner and white-label options. You submit the URL, we produce the report, you present it as your own. Pricing scales with volume. Contact us for details.',
      },
      {
        question: 'I\u2019m a solo operator / very small business. Is this worth it?',
        answer:
          'If most of your leads come from referrals (not your website), the upfront ROI might not be there. If you\u2019re spending money on Google Ads, SEO, or paid directories and sending traffic to your site, the audit almost always pays for itself by fixing the leaks.',
      },
      {
        question: 'What if I\u2019m not sure my website is the problem?',
        answer:
          'That\u2019s exactly what the audit tells you. The preview is free — enter your URL and see your score. If it\u2019s 75+, your site might not be the bottleneck. If it\u2019s lower, there\u2019s almost certainly money being left on the table.',
      },
    ],
  },
  {
    title: 'About Outbound Autonomy',
    items: [
      {
        question: 'Who runs Outbound Autonomy?',
        answer:
          'A small team of designers, developers, and automation specialists based in the US. We\u2019ve worked with agency partners and direct clients across home services, healthcare, legal, and professional services.',
      },
      {
        question: 'Are you a marketing agency or a software company?',
        answer:
          'Both, practically. We use software (automated audits, workflow tools) to provide agency-quality analysis faster and cheaper than a manual agency audit. Think of it as software-powered consulting.',
      },
      {
        question: 'Do you do phone systems or AI receptionists?',
        answer:
          'No. We don\u2019t build, sell, or support any phone system, AI receptionist, or telephony service. Our focus is your website and digital lead pipeline — from form to follow-up. If you need phone answering, we\u2019ll recommend a partner.',
      },
      {
        question: 'Have you done work for my industry?',
        answer:
          'We\u2019ve worked with home service contractors, dental and med spa practices, legal firms, and professional service providers. If you\u2019re in a related vertical, the audit framework applies the same way.',
      },
    ],
  },
  {
    title: 'Getting Started',
    items: [
      {
        question: 'How do I get started?',
        answer:
          'Enter your URL on the homepage. See your score instantly. From there you can buy the full report or schedule a call to discuss next steps. No account, no login, no commitment.',
      },
      {
        question: 'What if I have questions before entering my URL?',
        answer:
          'Schedule a 15-minute intro call. We\u2019ll answer your questions and — if you want — run a live audit while we talk.',
      },
      {
        question: 'How do I pay for the full report or services?',
        answer:
          'We accept all major credit cards and bank transfers. Invoices and receipts provided for every transaction. Larger projects can be split into milestones with milestone-based invoicing.',
      },
      {
        question: 'What\u2019s the turnaround time for implementation?',
        answer:
          'Small optimization projects (score 71–100) start in 1 week, deliver in 2–3 weeks. Redesigns (score 0–40) are scoped in the proposal with a clear timeline, typically 4–8 weeks depending on complexity.',
      },
    ],
  },
  {
    title: 'Support & Guarantees',
    items: [
      {
        question: 'What if I\u2019m not satisfied with the report?',
        answer:
          'The full report comes with a 14-day satisfaction guarantee. If you don\u2019t find it useful, we refund the $97. No questions asked.',
      },
      {
        question: 'What if I hire you for implementation and the changes don\u2019t improve my numbers?',
        answer:
          'Every proposal includes specific, measurable targets based on your audit findings. We\u2019re accountable to those targets. If we miss agreed milestones, we discuss remediation before proceeding to the next phase.',
      },
      {
        question: 'Can I get a sample before I buy?',
        answer:
          'Yes — view the sample report to see exactly what a full audit looks like, including score panels, issue cards, competitor comparison, and implementation plan.',
      },
      {
        question: 'How do I contact support?',
        answer:
          'Email hello@outboundautonomy.com. We respond within one business day. For existing clients, priority support details are in your welcome packet.',
      },
    ],
  },
]

function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-steel/50 last:border-0">
      <button
        onClick={onToggle}
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
      >
        <span className="text-static font-medium group-hover:text-signal transition-colors pr-4">
          {item.question}
        </span>
        <span
          className={`flex-shrink-0 mt-1 text-muted transition-transform duration-200 ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3v10M3 8h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="pb-5 text-muted text-sm leading-relaxed pr-8">
          {item.answer}
        </div>
      )}
    </div>
  )
}

export default function FaqPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (categoryIdx: number, itemIdx: number) => {
    const key = `${categoryIdx}-${itemIdx}`
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <main>
      {/* Hero */}
      <div className="bg-gradient-to-b from-void to-depth">
        <Container>
          <Section className="py-20">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-5xl font-bold text-static mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-muted leading-relaxed">
                Everything you want to know about how a website audit works,
                what it costs, who it&apos;s for, and what happens after.
              </p>
            </div>
          </Section>
        </Container>
      </div>

      {/* FAQ Categories */}
      <div className="bg-depth">
        <Container>
          <Section className="py-16">
            <div className="max-w-3xl mx-auto space-y-16">
              {faqData.map((category, catIdx) => (
                <div key={category.title}>
                  <h2 className="text-2xl font-bold text-static mb-6">
                    {category.title}
                  </h2>
                  <div className="bg-void border border-steel rounded-xl overflow-hidden">
                    {category.items.map((item, itemIdx) => (
                      <AccordionItem
                        key={item.question}
                        item={item}
                        isOpen={!!openItems[`${catIdx}-${itemIdx}`]}
                        onToggle={() => toggleItem(catIdx, itemIdx)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </Container>
      </div>

      {/* Footer CTA */}
      <div className="bg-void">
        <Container>
          <Section className="py-20">
            <div className="text-center max-w-2xl mx-auto space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-static mb-3">
                  Not sure yet?
                </h2>
                <p className="text-muted mb-4">
                  See a real audit report before you enter your URL.
                </p>
                <Button href="/sample-report" variant="secondary" size="lg">
                  View the Sample Report →
                </Button>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-static mb-3">
                  Already know your site needs work?
                </h2>
                <p className="text-muted mb-4">
                  Enter your URL and get your score in seconds.
                </p>
                <Button href="/" variant="primary" size="lg">
                  Start Your Free Audit →
                </Button>
              </div>
            </div>
          </Section>
        </Container>
      </div>
    </main>
  )
}
