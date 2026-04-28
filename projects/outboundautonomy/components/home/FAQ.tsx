import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const faqs = [
  {
    question: 'What do I get from the free website audit?',
    answer:
      'You get a read-only audit preview with design, conversion, technical, and Lighthouse signals, plus the biggest issues we can see from a live scan.',
  },
  {
    question: 'Do I need to enter my email to see the audit?',
    answer:
      'No. The preview is visible before email capture. If you want the saved version and implementation sequence, you can unlock that with your email after the report is generated.',
  },
  {
    question: 'Can you review login areas or protected pages?',
    answer:
      'Yes, for implementation reviews. The public audit supports optional gated-page context, and deeper authenticated testing should use temporary test access only.',
  },
  {
    question: 'What happens after the audit?',
    answer:
      'If the site needs help, we turn the findings into a scoped implementation plan covering page fixes, lead capture, follow-up, and workflow automation where it makes sense.',
  },
]

export function FAQ() {
  return (
    <Section id="faq" className="py-20">
      <Container>
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-steel bg-depth p-6 md:p-10">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-signal">FAQ</p>
            <h2 className="mt-4 text-3xl font-bold text-static md:text-4xl">Questions buyers ask before they submit a URL</h2>
            <p className="mt-4 text-muted">
              Clear expectations help the audit convert. This is a preview-first funnel, not a bait-and-switch form.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {faqs.map((item) => (
              <AnimatedSection key={item.question}>
              <div className="rounded-2xl border border-steel bg-void/60 p-5">
                <h3 className="text-lg font-semibold text-static">{item.question}</h3>
                <p className="mt-3 text-sm text-muted">{item.answer}</p>
              </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { faqs as homepageFaqs }
