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
      {/* Radial gradient bg */}
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
            <Badge>AI-Powered Operations</Badge>
          </motion.div>

          <motion.h1
            className="mt-6 text-5xl md:text-7xl font-bold tracking-tight text-static"
            variants={fadeUp}
          >
            Your business answers itself.
          </motion.h1>

          <motion.p
            className="mt-6 text-xl text-muted max-w-2xl"
            variants={fadeUp}
          >
            AI-powered reception, automation, and design — so you never miss a
            call, a lead, or an opportunity.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            variants={fadeUp}
          >
            <Button variant="primary" href="/contact">
              Get Started
            </Button>
            <Button variant="secondary" href="#how-it-works">
              See How It Works
            </Button>
            <Button variant="ghost" href="/demo/hero">
              View Hero Demo
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
