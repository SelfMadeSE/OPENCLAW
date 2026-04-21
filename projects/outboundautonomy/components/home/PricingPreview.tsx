import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function PricingPreview() {
  return (
    <Section>
      <Container>
        <AnimatedSection className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-static mb-4">
            Built for the bootstrapped
          </h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            Plans starting at $299/mo for AI Receptionist. Web design from $250.
            No hidden fees.
          </p>
          <Button variant="secondary" href="/pricing">
            See All Pricing →
          </Button>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
