import { Container } from "@/components/ui/Container";

const stats = [
  "12 Industries",
  "94% First-Contact Accuracy",
  "Setup in 90 Seconds",
];

export function TrustBar() {
  return (
    <div className="border-y border-steel/30 py-6">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-muted text-sm">
          {stats.map((stat) => (
            <span key={stat} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shrink-0" />
              {stat}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}
