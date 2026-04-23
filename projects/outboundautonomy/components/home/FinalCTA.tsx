import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function FinalCTA() {
  return (
    <Section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)",
        }}
      />

      <Container>
        <AnimatedSection className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-static mb-8 max-w-2xl mx-auto">
            Book a free 30-minute discovery call.
          </h2>
          <Button variant="primary" href="/contact?intent=discovery" size="lg">
            Book your free discovery call
          </Button>
          <p className="mt-4 text-sm text-muted">We&#39;ll tell you honestly if we can help — and if not, what to do instead.</p>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
