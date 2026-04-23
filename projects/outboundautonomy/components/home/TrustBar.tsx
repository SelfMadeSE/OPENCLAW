import { Container } from "@/components/ui/Container";

const signals = [
  "Three offer lanes: website + automation, workflow builds, private AI systems",
  "Built in your environment with human oversight",
  "Closed pilot — participation based on workflow fit",
];

export function TrustBar() {
  return (
    <div className="border-y border-steel/30 py-6">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-muted text-sm">
          {signals.map((signal) => (
            <span key={signal} className="flex items-center gap-2 text-center">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shrink-0" />
              {signal}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}
