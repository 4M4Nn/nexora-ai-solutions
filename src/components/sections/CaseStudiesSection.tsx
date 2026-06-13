"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { caseStudies } from "@/lib/data";

export default function CaseStudiesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} id="case-studies" className="bg-black py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-xs text-white/30 tracking-[0.28em] uppercase mb-4"
            >
              Our Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold text-white leading-none"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(36px, 5vw, 72px)" }}
            >
              Real results.
              <br />
              Real businesses.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-white/25 text-sm max-w-xs"
          >
            Every result below is a real business in Kerala we built for.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6">
          {caseStudies.map((cs, i) => (
            <motion.article
              key={cs.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black p-8 flex flex-col group hover:bg-white/[0.02] transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs tracking-widest uppercase" style={{ color: cs.color }}>
                  {cs.service}
                </span>
                <span className="text-white/20 text-xs">{cs.location}</span>
              </div>

              <div className="flex gap-5 mb-8">
                <div className="text-center">
                  <p
                    className="font-bold text-white leading-none mb-1"
                    style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(28px, 3vw, 40px)", color: cs.color }}
                  >
                    {cs.keyMetric.value}
                  </p>
                  <p className="text-white/30 text-xs uppercase tracking-wider">{cs.keyMetric.label}</p>
                </div>
                <div className="w-px bg-white/8 self-stretch" />
                <div className="text-center">
                  <p
                    className="font-bold text-white leading-none mb-1"
                    style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(28px, 3vw, 40px)" }}
                  >
                    {cs.secondMetric.value}
                  </p>
                  <p className="text-white/30 text-xs uppercase tracking-wider">{cs.secondMetric.label}</p>
                </div>
              </div>

              <h3
                className="font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(18px, 2vw, 24px)" }}
              >
                {cs.headline}
              </h3>

              <p className="text-white/35 text-sm leading-relaxed flex-1">{cs.story}</p>

              <div className="mt-8 pt-6 border-t border-white/6 flex items-center justify-between">
                <span className="text-white/60 text-sm font-medium" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                  {cs.company}
                </span>
                <div
                  className="w-6 h-6 rounded-full border border-white/20 group-hover:border-white/50 transition-colors duration-300 flex items-center justify-center"
                  style={{ borderColor: cs.color + "40" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H4M8 2V6" stroke={cs.color} strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
