import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const services = [
  {
    title: "Lane 1 — Premium Website + Automation",
    description:
      "A high-end site with backend logic: lead capture, intake routing, and automated booking scoped to your workflow.",
    link: "Apply for a pilot slot →",
    href: "/contact?intent=pilot-lane-1",
  },
  {
    title: "Lane 2 — Custom AI Workflow Builds",
    description:
      "Tell us what your team repeats. We map it, build it in your stack, and add escalation logic for edge cases.",
    link: "Tell us what you repeat →",
    href: "/contact?intent=workflow",
  },
  {
    title: "Lane 3 — Private AI Operating Systems",
    description:
      "Local-model deployments, internal knowledge agents, and architecture shaped for oversight and compliance requirements.",
    link: "Tell us your constraints →",
    href: "/contact?intent=architecture",
  },
];

export function ServicesOverview() {
  return (
    <Section id="services">
      <Container>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-static text-center mb-12">Three ways we work with you</h2>
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
