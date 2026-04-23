"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 75% 25%, rgba(0,229,255,0.05) 0%, transparent 70%)",
        }}
      />

      <Container>
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <Badge>Now Accepting Clients</Badge>
          </motion.div>

          <motion.h1
            className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-static"
            variants={fadeUp}
          >
            We build AI systems that do the work your team repeats every day. Then we prove they work in your environment — not a sandbox.
          </motion.h1>

          <motion.p className="mt-6 text-xl text-muted max-w-2xl" variants={fadeUp}>
            We scope, build, and validate workflow automation that runs inside your stack with clear escalation when human judgment is needed.
          </motion.p>

          <motion.div
            className="mt-8 w-full rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-left text-sm text-static"
            variants={fadeUp}
          >
            <ul className="space-y-2">
              <li>✅ Built in your environment — your data never leaves your stack</li>
              <li>✅ Escalation logic on every workflow — humans flagged for edge cases, not silent failures</li>
              <li>✅ Scoping call before any build — if it&apos;s not clean, we tell you before you pay anything.</li>
            </ul>
          </motion.div>

          <motion.div className="mt-10 flex flex-col sm:flex-row gap-4" variants={fadeUp}>
            <Button variant="primary" href="/contact?intent=pilot">
              Apply for a pilot slot →
            </Button>
            <Button variant="secondary" href="/services">
              See what we build
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
