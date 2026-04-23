import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const services = [
  {
    title: "Premium Website + Automation",
    description:
      "A high-end site that actually works: lead capture forms, automated intake emails, calendar booking, and SMS confirmations — all connected to your business.",
    link: "Get started →",
    href: "/contact?intent=lane-1",
  },
  {
    title: "Custom AI Workflows",
    description:
      "Tell us what your team repeats every day. We automate it — from follow-ups and scheduling to lead qualification and dispatch.",
    link: "Tell us what you repeat →",
    href: "/contact?intent=workflow",
  },
  {
    title: "Private AI Systems",
    description:
      "Local AI deployments for teams that need data privacy, compliance, and internal knowledge agents that stay on your infrastructure.",
    link: "Tell us your constraints →",
    href: "/contact?intent=architecture",
  },
];

export function ServicesOverview() {
  return (
    <Section id="services">
      <Container>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-static text-center mb-12">What we build for you</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <AnimatedSection key={s.title}>
              <Card className="flex flex-col h-full p-6">
                <h3 className="text-xl font-semibold text-static mb-3">{s.title}</h3>
                <p className="text-muted flex-1 mb-6">{s.description}</p>
                <Button variant="ghost" href={s.href}>
                  {s.link}
                </Button>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
