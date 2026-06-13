"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { industries } from "@/lib/data";

const ROW1 = [...industries.slice(0, 5), ...industries.slice(0, 5)];
const ROW2 = [...industries.slice(5), ...industries.slice(5)];

export default function IndustriesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} id="industries" className="bg-black py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-xs text-white/30 tracking-[0.28em] uppercase mb-5"
        >
          We Work Across
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold text-white leading-none"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(40px, 7vw, 96px)" }}
        >
          Every industry.
          <br />
          One AI partner.
        </motion.h2>
      </div>

      <div className="overflow-hidden mb-4">
        <div className="marquee-left">
          {ROW1.map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center border border-white/12 text-white/70 hover:text-white hover:border-white/30 text-sm md:text-base font-medium px-6 py-3 mr-3 shrink-0 transition-colors duration-200"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="marquee-right">
          {ROW2.map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center border border-white/12 text-white/70 hover:text-white hover:border-white/30 text-sm md:text-base font-medium px-6 py-3 mr-3 shrink-0 transition-colors duration-200"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
