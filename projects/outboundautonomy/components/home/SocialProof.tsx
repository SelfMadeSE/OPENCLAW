import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const testimonials = [
  {
    quote:
      "We were missing 40% of our calls after hours. Outbound Autonomy fixed that in a day. Now every call gets answered.",
    attribution: "Business Owner, Home Services",
  },
  {
    quote:
      "They built our site in 4 days. It looks better than agencies that quoted us $15K and 3 months.",
    attribution: "Founder, SaaS Startup",
  },
];

export function SocialProof() {
  return (
    <Section>
      <Container>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-static text-center mb-12">
            What they&apos;re saying
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <AnimatedSection key={t.attribution}>
              <Card className="p-6">
                <p className="text-static text-lg leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-muted text-sm">— {t.attribution}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
