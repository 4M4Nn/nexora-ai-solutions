"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function BoldStatement() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section
      ref={ref}
      id="advantage"
      className="relative min-h-screen flex flex-col items-center justify-center bg-black px-6 py-24 overflow-hidden"
    >
      {/* Subtle bg gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,8,32,0.8) 0%, #000 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs text-[#00D4FF] tracking-[0.25em] uppercase mb-10"
        >
          The Nexora Advantage
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold text-white leading-none mb-10"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "clamp(52px, 9vw, 120px)",
          }}
        >
          One decision.
          <br />
          Infinite AI workers.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/40 text-base md:text-lg leading-relaxed max-w-lg mx-auto"
        >
          Nexora deploys AI agents that run your
          <br />
          business operations around the clock.
        </motion.p>
      </div>
    </section>
  );
}
