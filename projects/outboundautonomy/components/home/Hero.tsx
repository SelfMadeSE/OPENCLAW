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
            <Badge>Free website audit for service businesses</Badge>
          </motion.div>

          <motion.h1
            className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-static"
            variants={fadeUp}
          >
            Enter your URL. Get a website audit with targeted fixes.
          </motion.h1>

          <motion.p className="mt-6 text-xl text-muted max-w-2xl" variants={fadeUp}>
            We review your site for design, conversion, technical, and lead-capture gaps, then map the first fixes to a proposal path.
          </motion.p>

          <motion.div
            className="mt-8 w-full rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-left text-sm text-static"
            variants={fadeUp}
          >
            <ul className="space-y-2">
              <li>Live URL scan with design, conversion, technical, and Lighthouse signals</li>
              <li>Targeted fixes, implementation examples, and an estimated build range</li>
              <li>Proposal path for redesign, lead capture, automation, and follow-up systems</li>
            </ul>
          </motion.div>

          <motion.div className="mt-10 flex flex-col sm:flex-row gap-4" variants={fadeUp}>
            <Button variant="primary" href="#audit">
              Generate free audit
            </Button>
            <Button variant="secondary" href="/services">
              See implementation options
            </Button>
          </motion.div>
          
          <motion.div className="mt-4" variants={fadeUp}>
            <Button
              variant="ghost"
              href="/sample-report"
              className="text-blue-400 hover:text-blue-300"
            >
              Preview sample audit report →
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
