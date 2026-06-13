"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Search, Brain, Code2, Rocket, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { workSteps } from "@/lib/data";

const ICONS: Record<number, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  1: Search, 2: Brain, 3: Code2, 4: Rocket, 5: BarChart3,
};
const COLORS = ["#00D4FF", "#6E44FF", "#00FFB2", "#00D4FF", "#6E44FF"];

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const trackCount = workSteps.length - 1;
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${trackCount * 100}vw`]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveStep(Math.min(workSteps.length - 1, Math.round(v * trackCount)));
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-[#050816]"
      style={{ height: `${workSteps.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="shrink-0 pt-16 pb-4 text-center px-4">
          <Badge className="mb-3 bg-[#00FFB2]/10 text-[#00FFB2] border-[#00FFB2]/20">
            How It Works
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
            From Idea to{" "}
            <span className="gradient-text-animated">AI in 5 Steps</span>
          </h2>

          {/* Step dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {workSteps.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeStep ? "24px" : "6px",
                  height: "6px",
                  backgroundColor: i === activeStep ? COLORS[i] : "rgba(255,255,255,0.2)",
                  boxShadow: i === activeStep ? `0 0 8px ${COLORS[i]}` : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* Cards track */}
        <motion.div style={{ x }} className="flex flex-1 will-change-transform">
          {workSteps.map((step, i) => {
            const Icon = ICONS[step.step] ?? Search;
            const color = COLORS[i];
            const isActive = activeStep === i;

            return (
              <div
                key={step.step}
                className="w-screen shrink-0 flex items-center justify-center px-4 sm:px-12 lg:px-24"
              >
                <motion.div
                  animate={{
                    opacity: isActive ? 1 : 0.4,
                    scale: isActive ? 1 : 0.93,
                  }}
                  transition={{ duration: 0.45 }}
                  className="max-w-2xl w-full glass rounded-3xl p-8 sm:p-12"
                  style={{
                    border: `1px solid ${isActive ? color + "40" : "rgba(255,255,255,0.04)"}`,
                    boxShadow: isActive
                      ? `0 0 60px ${color}12, 0 30px 80px rgba(0,0,0,0.4)`
                      : "0 4px 24px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="flex items-center gap-5 mb-8">
                    <div
                      className="font-heading font-bold text-7xl sm:text-8xl leading-none tabular-nums"
                      style={{ color: isActive ? color : "rgba(255,255,255,0.08)" }}
                    >
                      {String(step.step).padStart(2, "0")}
                    </div>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${color}18`,
                        border: `1px solid ${color}35`,
                        boxShadow: isActive ? `0 0 20px ${color}25` : "none",
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color }} />
                    </div>
                  </div>

                  <h3
                    className="font-heading font-bold text-3xl sm:text-4xl mb-4"
                    style={{ color: isActive ? "white" : "#B7C0D1" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#B7C0D1] text-lg leading-relaxed">{step.description}</p>

                  {isActive && (
                    <div className="mt-8 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                      <span className="text-sm font-medium" style={{ color }}>
                        Step {step.step} of {workSteps.length}
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* Progress bar */}
        <div className="shrink-0 px-8 pb-8">
          <div className="max-w-2xl mx-auto">
            <div className="h-px bg-white/8 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: progressWidth,
                  background: "linear-gradient(90deg, #00D4FF, #6E44FF)",
                  boxShadow: "0 0 10px rgba(0,212,255,0.6)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
