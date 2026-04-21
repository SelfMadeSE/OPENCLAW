import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function FinalCTA() {
  return (
    <Section className="relative overflow-hidden">
      {/* Signal glow top edge */}
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
            Stop losing customers to missed calls and slow responses.
          </h2>
          <Button variant="primary" href="/contact" size="lg">
            Get Started
          </Button>
          <p className="mt-4 text-sm text-muted">Setup takes 90 seconds.</p>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
