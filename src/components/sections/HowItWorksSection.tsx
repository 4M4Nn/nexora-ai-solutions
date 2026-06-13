"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { workSteps } from "@/lib/data";

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const xPct = useTransform(scrollYProgress, [0, 1], ["0%", `-${(workSteps.length - 1) * 100}%`]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const activeStep = useTransform(scrollYProgress, [0, 1], [0, workSteps.length - 1]);

  return (
    <section id="how-it-works">
      {/* Header */}
      <div ref={headerRef} className="bg-black px-6 md:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-xs text-white/30 tracking-[0.28em] uppercase mb-4"
          >
            Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1 }}
          >
            How it works.
          </motion.h2>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        style={{ height: `${workSteps.length * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col bg-black">
          {/* Cards track */}
          <div className="flex-1 flex items-center overflow-hidden">
            <motion.div
              className="flex"
              style={{ x: xPct }}
            >
              {workSteps.map((step, i) => (
                <div
                  key={step.id}
                  className="w-screen shrink-0 px-10 md:px-20 flex items-center"
                >
                  <div className="max-w-2xl">
                    <span className="text-[100px] font-bold text-white/4 leading-none block mb-2"
                      style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                      {step.id}
                    </span>
                    <h3
                      className="font-bold text-white mb-5"
                      style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(28px, 4vw, 56px)", lineHeight: 1.05 }}
                    >
                      {step.title}
                    </h3>
                    <div className="w-16 h-px bg-[#00D4FF]/40 mb-6" />
                    <p className="text-white/45 text-base md:text-lg leading-relaxed max-w-md">
                      {step.description}
                    </p>
                    <div className="mt-10 flex items-center gap-2">
                      {workSteps.map((_, j) => (
                        <div
                          key={j}
                          className="h-px transition-all duration-300"
                          style={{
                            width: j === i ? 32 : 12,
                            backgroundColor: j === i ? "#00D4FF" : j < i ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="h-px bg-white/8">
            <motion.div className="h-full bg-[#00D4FF]" style={{ width: progressWidth }} />
          </div>

          {/* Step counter */}
          <div className="flex justify-between items-center px-10 md:px-20 py-5">
            <span className="text-white/20 text-xs tracking-widest uppercase">How It Works</span>
            <span className="text-white/30 text-xs font-mono">
              {workSteps.map((s) => s.id).join(" · ")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
