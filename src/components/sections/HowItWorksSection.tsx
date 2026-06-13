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

  const xPct = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(workSteps.length - 1) * 100}%`]
  );
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" style={{ background: "#0F1628" }}>
      <div className="section-divider" />

      {/* Sticky scroll container — full section height drives the horizontal scroll */}
      <div
        ref={containerRef}
        style={{ height: `${workSteps.length * 100}vh` }}
        className="relative"
      >
        <div
          className="sticky top-0 h-screen overflow-hidden flex flex-col"
          style={{ background: "linear-gradient(180deg, #0F1628 0%, #0A0F1E 100%)" }}
        >
          {/* Header inside sticky */}
          <div ref={headerRef} className="px-8 md:px-14 pt-16 pb-10 shrink-0">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="section-label mb-4"
            >
              / Process
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-black text-white"
              style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1 }}
            >
              How it works.
            </motion.h2>
          </div>

          {/* Cards track */}
          <div className="flex-1 overflow-hidden">
            <motion.div className="flex h-full" style={{ x: xPct }}>
              {workSteps.map((step, i) => (
                <div
                  key={step.id}
                  className="w-screen shrink-0 px-8 md:px-14 pb-12 flex items-end"
                >
                  <div className="max-w-2xl">
                    <span
                      className="block font-black leading-none mb-4"
                      style={{
                        fontFamily: "var(--font-syne), sans-serif",
                        fontSize: "clamp(60px, 10vw, 120px)",
                        color: "#00D4FF",
                        opacity: 0.1,
                        lineHeight: 0.9,
                      }}
                    >
                      {step.id}
                    </span>
                    <h3
                      className="font-bold text-white mb-4"
                      style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.05 }}
                    >
                      {step.title}
                    </h3>
                    <div className="w-14 h-px mb-5" style={{ background: "linear-gradient(90deg, #00D4FF, transparent)" }} />
                    <p className="text-[#CBD5E1] text-base md:text-lg leading-relaxed max-w-md">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-2 mt-8">
                      {workSteps.map((_, j) => (
                        <div
                          key={j}
                          className="h-px transition-all duration-300"
                          style={{
                            width: j === i ? 32 : 10,
                            backgroundColor: j === i ? "#00D4FF" : j < i ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
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
          <div className="h-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            <motion.div className="h-full" style={{ width: progressWidth, backgroundColor: "#00D4FF" }} />
          </div>

          {/* Footer label */}
          <div className="flex justify-between items-center px-8 md:px-14 py-4">
            <span className="section-label">How It Works</span>
            <span className="section-label">{workSteps.map((s) => s.id).join(" · ")}</span>
          </div>
        </div>
      </div>

      <div className="section-divider" />
    </section>
  );
}
