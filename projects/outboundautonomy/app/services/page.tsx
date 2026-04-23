import { Container, Section } from '@/components/ui'

const lanes = [
  {
    title: 'Lane 1 — Premium Website + Automation',
    body: 'A website with operational backend logic for lead capture, intake, booking, and routing in your environment.'
  },
  {
    title: 'Lane 2 — Custom AI Workflow Builds',
    body: 'We map repeatable manual work and build custom workflow automation with escalation paths for human review.'
  },
  {
    title: 'Lane 3 — Private AI Operating Systems',
    body: 'Private AI architecture for sensitive operations, including local models and internal agents under your controls.'
  }
]

export default function Services() {
  return (
    <>
      <main>
        <div className="bg-gradient-to-b from-void to-depth min-h-screen">
          <Container>
            <Section className="py-24">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-static mb-4">Three ways we work with you.</h1>
                <p className="text-xl text-muted max-w-2xl mx-auto">Closed pilot for custom AI deployments in service-business workflows.</p>
              </div>
            </Section>

            <Section className="pb-24">
              <div className="grid md:grid-cols-3 gap-6">
                {lanes.map((lane) => (
                  <div key={lane.title} className="bg-depth rounded-lg border border-steel p-8">
                    <h2 className="text-2xl font-bold text-static mb-4">{lane.title}</h2>
                    <p className="text-muted">{lane.body}</p>
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
  title: 'Services — Outbound Autonomy',
  description: 'Pilot-safe service lanes: website + automation, custom workflow builds, and private AI operating systems.',
  openGraph: {
    title: 'Services — Outbound Autonomy',
    description: 'Pilot-safe service lanes: website + automation, custom workflow builds, and private AI operating systems.',
    type: 'website',
    url: 'https://outboundautonomy.com/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services — Outbound Autonomy',
    description: 'Pilot-safe service lanes: website + automation, custom workflow builds, and private AI operating systems.',
  },
}
