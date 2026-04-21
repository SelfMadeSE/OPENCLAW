import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const services = [
  {
    badge: <Badge variant="warm">Flagship</Badge>,
    title: "AI Receptionist",
    description:
      "Your front door that never closes. Answers calls, books appointments, routes inquiries — 24/7, no breaks, no scripts. It learns your business.",
    link: "Start Free Trial →",
    href: "/pricing",
  },
  {
    title: "Web Design & Apps",
    description:
      "From $250 to enterprise. Clean, fast, built to convert. No templates — every pixel intentional. We ship in days, not months.",
    link: "Get a Quote →",
    href: "/contact",
  },
  {
    title: "Automation & Marketing",
    description:
      "Eliminate repetitive work. Custom AI workflows, outreach campaigns, SEO strategy. Your business runs itself.",
    link: "Book a Call →",
    href: "/contact",
  },
];

export function ServicesOverview() {
  return (
    <Section id="services">
      <Container>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-static text-center mb-12">
            What we build
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <AnimatedSection key={s.title}>
              <Card className="flex flex-col h-full p-6">
                {s.badge && <div className="mb-3">{s.badge}</div>}
                <h3 className="text-xl font-semibold text-static mb-3">
                  {s.title}
                </h3>
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
