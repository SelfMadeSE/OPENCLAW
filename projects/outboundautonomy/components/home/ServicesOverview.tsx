import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const services = [
  {
    title: "Website Audit + Fix Plan",
    description:
      "A URL-based review of your homepage, conversion path, technical basics, trust signals, and first fixes.",
    link: "Generate audit →",
    href: "/#audit",
  },
  {
    title: "Conversion Implementation",
    description:
      "We turn the audit into clearer offers, better CTAs, lead capture, quote flows, proof sections, and follow-up routing.",
    link: "Request proposal →",
    href: "/contact?intent=audit",
  },
  {
    title: "Automation Behind the Site",
    description:
      "When the audit shows operational leakage, we add CRM handoff, intake, follow-up, reminders, and AI-assisted workflow systems.",
    link: "Plan implementation →",
    href: "/contact?intent=automation",
  },
];

export function ServicesOverview() {
  return (
    <Section id="services">
      <Container>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-static text-center mb-12">From audit to implementation</h2>
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
