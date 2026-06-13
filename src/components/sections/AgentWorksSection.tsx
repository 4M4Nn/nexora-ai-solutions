"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";

const AgentBrain = dynamic(() => import("@/components/3d/AgentBrain"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center"><div className="w-10 h-10 rounded-full border border-[#00D4FF]/30 border-t-[#00D4FF] spin-ring" /></div>,
});

const STEPS = [
  { label: "Input", desc: "Your business data, rules, and workflows enter the system." },
  { label: "Processing", desc: "NOVA analyzes, classifies, and makes intelligent decisions in real time." },
  { label: "Decisions", desc: "The agent selects the optimal action based on your defined goals." },
  { label: "Output", desc: "Instant automated response — call booked, lead qualified, ticket resolved." },
];

export default function AgentWorksSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="py-28 px-6 md:px-10"
      style={{ background: "radial-gradient(ellipse at top right, #1a2744 0%, #0A0F1E 60%)" }}
    >
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="section-label mb-5"
            >
              / 02 &nbsp;·&nbsp; How NOVA Thinks
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-black text-white leading-none mb-8"
              style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "clamp(36px, 5vw, 68px)" }}
            >
              AI that thinks,
              <br />
              decides, and acts.
            </motion.h2>

            <div className="space-y-6">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="flex gap-4"
                >
                  <div
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center border"
                    style={{ borderColor: "rgba(0,212,255,0.3)", backgroundColor: "rgba(0,212,255,0.06)" }}
                  >
                    <span className="section-label" style={{ fontSize: 9 }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>{step.label}</p>
                    <p className="text-[#94A3B8] text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[380px] md:h-[440px] w-full"
          >
            <AgentBrain />
          </motion.div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
