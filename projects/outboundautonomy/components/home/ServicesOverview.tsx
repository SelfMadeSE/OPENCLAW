import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const services = [
  {
    title: "Audit That Finds What's Broken",
    description:
      'Most website "issues" are opinions. We only flag things that cost you money: titles that point Google to the wrong city, CTAs that don\'t convert, trust signals buried where nobody sees them. You get a scored report with the exact line items a fix would address and what the fix would cost.',
    outcome: "A prioritized list of revenue-leaking issues, not opinions.",
    link: "Generate audit →",
    href: "/#audit",
  },
  {
    title: "Build That Turns Visitors Into Calls",
    description:
      "We rebuild your site so the path from 'searching Google' to 'booking a call' is short and frictionless. Clear hero offer, dominant booking CTA, proof where it counts, and a lead capture flow that doesn't let inquiries go cold. Your site becomes your best closer.",
    outcome: "More booked calls from the same traffic you're already getting.",
    link: "Request proposal →",
    href: "/contact?intent=audit",
  },
  {
    title: "Automation That Follows Up While You Work",
    description:
      "When a lead fills your form, they should get a quote, a confirmation, and a reminder — automatically. When they don't book, they should get a follow-up. When they do book, your calendar should block and notify you. We wire this so you don't think about it.",
    outcome: "Leads don't fall through gaps because you're on a job site.",
    link: "Plan implementation →",
    href: "/contact?intent=automation",
  },
];

export function ServicesOverview() {
  return (
    <Section id="services">
      <Container>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-static text-center mb-4">
            From audit to revenue — in three phases
          </h2>
          <p className="text-muted text-center max-w-xl mx-auto mb-12">
            Each phase is scoped, priced, and delivered with a clear outcome in mind.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <AnimatedSection key={s.title}>
              <Card className="flex flex-col h-full p-6">
                <h3 className="text-xl font-semibold text-static mb-3">{s.title}</h3>
                <p className="text-muted flex-1 mb-3">{s.description}</p>
                <p className="text-xs text-signal/80 font-medium mb-4 italic">
                  {s.outcome}
                </p>
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
