import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function SocialProof() {
  return (
    <Section>
      <Container>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-static text-center mb-12">
            Here&apos;s what the work will show
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <Card className="p-6 max-w-3xl mx-auto">
            <p className="text-static text-lg leading-relaxed mb-4">
              We&apos;re in closed pilot. As deployments complete, this section will document what was built,
              what manual process it replaced, and what the client no longer does manually.
            </p>
            <p className="text-muted text-sm">
              No mock-ups. No composite data. Real deployments only.
            </p>
          </Card>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
