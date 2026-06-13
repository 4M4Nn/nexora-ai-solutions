"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";

const AgentBrain = dynamic(() => import("@/components/3d/AgentBrain"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center"><div className="w-10 h-10 rounded-full border border-[#00D4FF]/30 border-t-[#00D4FF] spin-ring" /></div>,
});

const STEPS = [
  { num: "01", title: "Receives your business request", desc: "Any channel — WhatsApp, email, website, or CRM." },
  { num: "02", title: "Analyzes context and requirements", desc: "NOVA reads intent, extracts data, and maps the task." },
  { num: "03", title: "Executes the task autonomously", desc: "No human needed. Actions happen in real time." },
  { num: "04", title: "Reports results and learns", desc: "Every output improves the next. Continuous intelligence." },
];

export default function AgentWorksSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="bg-black py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs text-[#00D4FF] tracking-[0.28em] uppercase mb-4"
          >
            Under The Hood
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1 }}
          >
            Watch your AI agent think.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[420px] border border-white/6"
          >
            <AgentBrain />
          </motion.div>

          {/* Steps */}
          <div className="space-y-0">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="flex gap-6 py-7 border-b border-white/8"
              >
                <span className="text-xs text-[#00D4FF] tracking-widest shrink-0 pt-0.5">{step.num}</span>
                <div>
                  <p className="font-semibold text-white text-sm md:text-base mb-1.5"
                     style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                    {step.title}
                  </p>
                  <p className="text-white/35 text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Node labels legend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-wrap gap-6 pt-8 border-t border-white/8"
        >
          {[
            { color: "#00FFB2", label: "Client Request" },
            { color: "#00D4FF", label: "NOVA AI Core" },
            { color: "#6E44FF", label: "Decision Layer" },
            { color: "#4488FF", label: "Action Output" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-xs text-white/35 tracking-wide">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
