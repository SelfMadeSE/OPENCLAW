import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const steps = [
  {
    num: 1,
    title: "Discovery",
    description: "We map repeatable work and confirm build scope before implementation.",
  },
  {
    num: 2,
    title: "Build",
    description: "We deploy a custom workflow in your environment, around your tools and data.",
  },
  {
    num: 3,
    title: "Run",
    description: "The system handles repeatable tasks with escalation paths for human judgment.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Container>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-static text-center mb-16">How it works</h2>
        </AnimatedSection>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-8 md:gap-0">
          {steps.map((step, i) => (
            <AnimatedSection key={step.num}>
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex flex-col items-center text-center md:w-56">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-signal text-signal font-bold text-sm">
                    {step.num}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-static">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted">{step.description}</p>
                </div>

                {i < steps.length - 1 && (
                  <div className="hidden md:block w-20 border-t border-steel mx-4 mt-[-2rem]" />
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
