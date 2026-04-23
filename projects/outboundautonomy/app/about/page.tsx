import { Container, Section } from '@/components/ui'

export default function About() {
  const values = [
    {
      title: 'Reliability over novelty',
      description: "If it doesn&apos;t work consistently in your environment, it doesn&apos;t ship."
    },
    {
      title: 'Scope before build',
      description: 'We map the real workflow first and say no when the fit is wrong.'
    },
    {
      title: 'Human oversight by design',
      description: 'Escalation paths are required whenever judgment matters.'
    },
    {
      title: 'Honest claims only',
      description: 'No inflated metrics, no fabricated proof, no timeline guarantees.'
    }
  ]

  return (
    <>
      <main>
        <div className="bg-gradient-to-b from-void to-depth min-h-screen">
          <Container>
            <Section className="py-24">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-static mb-4">Built around real operations, not AI theater.</h1>
              </div>
            </Section>
          </Container>

          <Container>
            <Section className="py-16">
              <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
                <p className="text-lg text-muted leading-relaxed">
                  Outbound Autonomy builds custom AI systems for service businesses with repeatable operational work.
                  We focus on workflows that can be scoped clearly, deployed safely, and monitored with human oversight.
                </p>

                <p className="text-lg text-muted leading-relaxed mt-6">
                  We&apos;re currently in closed pilot. The backend has been validated in sandbox conditions,
                  and live deployments are being scoped case by case.
                </p>
              </div>
            </Section>
          </Container>

          <Container>
            <Section className="py-16">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-static mb-4">How we work</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {values.map((value, index) => (
                  <div key={index} className="bg-depth rounded-lg border border-steel p-8">
                    <h3 className="text-xl font-bold text-signal mb-3">{value.title}</h3>
                    <p className="text-muted">{value.description}</p>
                  </div>
                ))}
              </div>
            </Section>
          </Container>
        </div>
      </main>
    </>
  )
}

export const metadata = {
  title: 'About — Outbound Autonomy',
  description: 'Outbound Autonomy builds pilot-safe custom AI systems for service-business operations.',
  openGraph: {
    title: 'About — Outbound Autonomy',
    description: 'Outbound Autonomy builds pilot-safe custom AI systems for service-business operations.',
    type: 'website',
    url: 'https://outboundautonomy.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Outbound Autonomy',
    description: 'Outbound Autonomy builds pilot-safe custom AI systems for service-business operations.',
  },
}
