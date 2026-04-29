"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Mic } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroBrowserMockup } from "./HeroBrowserMockup";

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

const features = [
  "Live URL scan with design, conversion, technical, and estimated Lighthouse signals",
  "Fixes ranked by impact with implementation examples and cost estimates",
  "Proposal path for redesign, lead capture, automation, and follow-up systems",
];

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <motion.div
            className="max-w-xl"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <Badge>See your audit in 30 seconds — no email required</Badge>
            </motion.div>

            <motion.h1
              className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-static"
              variants={fadeUp}
            >
              Your website is losing you leads right now. We&apos;ll show you exactly where.
            </motion.h1>

            <motion.p className="mt-6 text-lg md:text-xl text-muted" variants={fadeUp}>
              Enter your URL. In 90 seconds, you&apos;ll see the specific conversion gaps,
              technical errors, and missed opportunities costing you service calls. Then
              we&apos;ll tell you what it takes to fix them — and what it costs.
            </motion.p>

            <motion.div
              className="mt-8"
              variants={fadeUp}
            >
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted">
                    <CheckCircle2 className="h-4 w-4 text-signal mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
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

            <motion.div className="mt-3 flex items-center gap-2" variants={fadeUp}>
              <Mic className="w-3.5 h-3.5 text-orange-400" />
              <Button
                variant="ghost"
                href="/audio-audit"
                className="text-orange-400 hover:text-orange-300 text-xs"
              >
                🆕 Now in audio — hear your audit narrated
              </Button>
            </motion.div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="hidden lg:block"
          >
            <HeroBrowserMockup />
          </motion.div>
        </div>

        {/* Mobile mockup */}
        <div className="mt-12 lg:hidden">
          <HeroBrowserMockup />
        </div>
      </Container>
    </section>
  );
}
