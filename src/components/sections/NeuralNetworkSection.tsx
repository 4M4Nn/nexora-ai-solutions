"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";

const NeuralNetworkScene = dynamic(
  () => import("@/components/3d/NeuralNetworkScene"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border border-[#00D4FF]/30 border-t-[#00D4FF] spin-ring" />
      </div>
    ),
  }
);

export default function NeuralNetworkSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="py-28 px-6 md:px-10"
      style={{ background: "radial-gradient(ellipse at bottom, #0F1628 0%, #0A0F1E 70%)" }}
    >
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-label mb-4"
          >
            / 04 &nbsp;·&nbsp; The Ecosystem
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-black text-white mb-4"
            style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "clamp(32px, 5vw, 68px)", lineHeight: 1.05 }}
          >
            One ecosystem. All connected.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#94A3B8] text-base max-w-lg mx-auto"
          >
            Every agent shares intelligence.
            The more they work, the smarter they get.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="section-label mt-4"
          >
            Click any node to identify it · Drag to explore
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-[480px] md:h-[580px] w-full"
        >
          <NeuralNetworkScene />
        </motion.div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
