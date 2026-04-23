import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function PricingPreview() {
  return (
    <Section>
      <Container>
        <AnimatedSection className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-static mb-4">Scoping before pricing</h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            Every engagement is scoped to your workflow and environment first.
            We&apos;ll define fit, buildability, and implementation approach before quoting.
          </p>
          <Button variant="secondary" href="/contact?intent=discovery">
            Book a discovery call →
          </Button>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
