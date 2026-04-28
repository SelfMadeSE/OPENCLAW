import { Container, Section, Button } from '@/components/ui'

export default function About() {
  const principles = [
    {
      title: 'Audit before build',
      description:
        "We don't propose work until we've seen the site, the current lead path, and the competitive landscape. If a proposal sounds generic, it means the audit was shallow.",
    },
    {
      title: 'Lead path over tech stack',
      description:
        "Most problems aren't \"buy different software.\" They're \"connect the software you already have in a way that actually works.\" We build workflows that sit on top of your existing tools.",
    },
    {
      title: 'Human oversight is non-negotiable',
      description:
        'Automation handles routing, follow-ups, notifications, and reporting. Humans handle judgment calls, exception handling, and customer relationships. We define the boundary explicitly in every project.',
    },
    {
      title: 'Honest scope, no inflated timelines',
      description:
        "Service businesses run on real schedules. We don't promise two-day turnarounds or miracle conversion rates. We promise to ship working implementations that we can demonstrate, test, and hand off.",
    },
  ]

  const process = [
    {
      step: '1',
      title: 'Scan your site',
      description:
        'We look at design quality, conversion mechanics, technical performance, and competitor positioning.',
    },
    {
      step: '2',
      title: 'Surface the gaps',
      description:
        "The audit report shows what's losing you leads. Scores are specific. Issues are actionable.",
    },
    {
      step: '3',
      title: 'Map the build',
      description:
        'Every fix in the proposal corresponds to a finding in the audit. Nothing generic. Nothing made up.',
    },
    {
      step: '4',
      title: 'Implement in order of impact',
      description:
        'The biggest lead leak gets fixed first. You see progress in days, not quarters.',
    },
  ]

  return (
    <main>
      {/* Hero */}
      <div className="bg-gradient-to-b from-void to-depth">
        <Container>
          <Section className="py-24">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl font-bold text-static mb-6">
                We find what&apos;s leaking. Then we build what fixes it.
              </h1>
              <p className="text-xl text-muted leading-relaxed">
                Every engagement starts with an audit because you can&apos;t fix what
                you haven&apos;t measured. We&apos;re Outbound Autonomy — built
                specifically for service businesses that leave leads on the
                table.
              </p>
            </div>
          </Section>
        </Container>

        {/* Intro */}
        <Container>
          <Section className="pb-16">
            <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
              <p className="text-lg text-muted leading-relaxed">
                Most website audits show you problems and stop there. You get a
                score, a list of issues, and a sales call. We do the audit, show
                you everything it found, then turn every finding into a
                buildable fix — prioritized by revenue impact, not convenience.
              </p>
              <p className="text-lg text-muted leading-relaxed mt-6">
                Our process is the same whether you run a plumbing company, a
                dental practice, a landscaping crew, or a med spa.
              </p>
            </div>
          </Section>
        </Container>

        {/* Process */}
        <Container>
          <Section className="pb-24">
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {process.map((item) => (
                <div
                  key={item.step}
                  className="bg-depth rounded-lg border border-steel p-6 text-center"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-signal/10 border border-signal/30 text-signal font-bold text-sm mb-4">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold text-static mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </Section>
        </Container>
      </div>

      {/* Who We Work With */}
      <div className="bg-depth">
        <Container>
          <Section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-static mb-4">
                Who we work with
              </h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                Service businesses whose websites should be generating leads —
                but aren&apos;t.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl font-bold text-signal mb-4">
                  We work best when:
                </h3>
                <ul className="space-y-3 text-muted">
                  <li className="flex gap-3">
                    <span className="text-signal flex-shrink-0">✓</span>
                    <span>
                      You have an existing website that&apos;s underperforming
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-signal flex-shrink-0">✓</span>
                    <span>
                      You&apos;re getting <em>some</em> leads but losing most of
                      them in follow-up
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-signal flex-shrink-0">✓</span>
                    <span>
                      Your team spends too much time on manual admin that
                      software should handle
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-signal flex-shrink-0">✓</span>
                    <span>
                      You want one partner who sees the whole picture, not five
                      point solutions
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-warm mb-4">
                  We&apos;re not a good fit if:
                </h3>
                <ul className="space-y-3 text-muted">
                  <li className="flex gap-3">
                    <span className="text-warm flex-shrink-0">✗</span>
                    <span>
                      You just launched a brand-new site and it needs time to
                      settle
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-warm flex-shrink-0">✗</span>
                    <span>
                      You&apos;re looking for a pure marketing agency (content,
                      ads, SEO-only)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-warm flex-shrink-0">✗</span>
                    <span>
                      You want a phone-answering AI service (that&apos;s not
                      what we do)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-warm flex-shrink-0">✗</span>
                    <span>
                      You need a minimum-viable prototype with no operations
                      context
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Section>
        </Container>
      </div>

      {/* Principles */}
      <div className="bg-void">
        <Container>
          <Section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-static mb-4">
                Our operating principles
              </h2>
              <p className="text-lg text-muted max-w-xl mx-auto">
                These aren&apos;t slogans. They&apos;re rules that shape every
                audit, every proposal, and every implementation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {principles.map((principle) => (
                <div
                  key={principle.title}
                  className="bg-depth rounded-lg border border-steel p-8"
                >
                  <h3 className="text-xl font-bold text-signal mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-muted">{principle.description}</p>
                </div>
              ))}
            </div>
          </Section>
        </Container>
      </div>

      {/* Where We Are */}
      <div className="bg-depth">
        <Container>
          <Section className="py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-static mb-4">
                Where we are now
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">
                We&apos;re building systems for service businesses — not at
                scale, but one workflow at a time. Every current project started
                with a website audit. Every future project will too.
              </p>
              <p className="text-muted">
                If your website is losing leads, we&apos;d like to look at it.
                The audit is free. The proposal only happens if the findings
                justify the build.
              </p>
            </div>
          </Section>
        </Container>
      </div>

      {/* CTA */}
      <div className="bg-void">
        <Container>
          <Section className="py-20">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-static mb-4">
                See what your site is doing wrong — for free.
              </h2>
              <p className="text-lg text-muted mb-8">
                No account. No sales call. Just a URL.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button href="/" variant="primary" size="lg">
                  Start Your Free Audit →
                </Button>
                <Button href="/sample-report" variant="secondary" size="lg">
                  Preview an Example Audit
                </Button>
              </div>
              <p className="text-sm text-muted mt-6">
                If the score doesn&apos;t tell you something useful, the
                conversation stops there.
              </p>
            </div>
          </Section>
        </Container>
      </div>
    </main>
  )
}

export const metadata = {
  title: 'About — Outbound Autonomy',
  description:
    "We find what's leaking on your website. Then we build what fixes it. Audit-first methodology for service businesses. Free website audit — no account, no sales call.",
  openGraph: {
    title: 'About — Outbound Autonomy',
    description:
      "We find what's leaking on your website. Then we build what fixes it. Audit-first methodology for service businesses.",
    type: 'website',
    url: 'https://outboundautonomy.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Outbound Autonomy',
    description:
      "We find what's leaking on your website. Then we build what fixes it.",
  },
}
