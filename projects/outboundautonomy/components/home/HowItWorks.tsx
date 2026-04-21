import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const steps = [
  {
    num: 1,
    title: "Tell us what you need",
    description: "90-second form or a quick call",
  },
  {
    num: 2,
    title: "We build it",
    description:
      "AI systems, websites, automations — configured to your business",
  },
  {
    num: 3,
    title: "It runs itself",
    description: "Your AI handles the work. You focus on growth.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Container>
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-static text-center mb-16">
            How it works
          </h2>
        </AnimatedSection>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-8 md:gap-0">
          {steps.map((step, i) => (
            <AnimatedSection key={step.num}>
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex flex-col items-center text-center md:w-56">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-signal text-signal font-bold text-sm">
                    {step.num}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-static">
                    {step.title}
                  </h3>
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
