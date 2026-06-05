"use client";

import { motion } from "framer-motion";
import { Search, Brain, Code2, Rocket, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { workSteps } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Search, Brain, Code2, Rocket, BarChart3,
};

const stepColors = ["#00D4FF", "#6E44FF", "#00FFB2", "#00D4FF", "#6E44FF"];

export default function HowItWorksSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="orb w-96 h-96 bg-[#6E44FF]/12 bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[#00FFB2]/10 text-[#00FFB2] border-[#00FFB2]/20">
            Our Process
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            How We{" "}
            <span className="gradient-text-primary">Build Your AI</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            A proven 5-step framework to go from business requirement to live AI system — fast, reliable, and results-focused.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#00D4FF]/20 via-[#6E44FF]/40 to-[#00FFB2]/20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {workSteps.map((step, index) => {
              const Icon = iconMap[step.icon] ?? Rocket;
              const color = stepColors[index];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number + icon */}
                  <div className="relative mb-5">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10 transition-transform duration-300 hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                        border: `1px solid ${color}40`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color }} />
                    </div>
                    {/* Step number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white z-20"
                      style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
                    >
                      {step.step}
                    </div>
                    {/* Glow */}
                    <div
                      className="absolute inset-0 rounded-2xl blur-xl opacity-30"
                      style={{ backgroundColor: color }}
                    />
                  </div>

                  <h3 className="font-heading font-semibold text-lg text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#B7C0D1] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline mobile view */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 glass rounded-2xl p-6 sm:p-8 text-center"
        >
          <p className="text-[#B7C0D1] text-base mb-2">
            <span className="text-white font-semibold">Average time to deployment:</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-4">
            {[
              { type: "AI Website", time: "24 Hours" },
              { type: "AI Agent", time: "5–7 Days" },
              { type: "Custom System", time: "2–4 Weeks" },
            ].map((item) => (
              <div key={item.type} className="text-center">
                <div className="font-heading font-bold text-2xl gradient-text-primary">{item.time}</div>
                <div className="text-[#B7C0D1] text-sm">{item.type}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
