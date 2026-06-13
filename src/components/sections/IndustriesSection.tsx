"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { industries } from "@/lib/data";

const EMOJIS: Record<string, string> = {
  healthcare:   "🏥",
  education:    "🎓",
  "real-estate":"🏗️",
  salons:       "💇",
  restaurants:  "🍽️",
  construction: "🏛️",
  finance:      "💰",
  automotive:   "🚗",
  ecommerce:    "🛒",
  tourism:      "✈️",
};

const COLORS = ["#00D4FF", "#6E44FF", "#00FFB2"];

function IndustryCard({ ind, i }: { ind: typeof industries[0]; i: number }) {
  const color = COLORS[i % COLORS.length];
  const emoji = EMOJIS[ind.id] ?? "🤖";

  return (
    <div
      className="shrink-0 group glass rounded-2xl px-5 py-4 flex items-center gap-4 mx-2 transition-all duration-300 hover:scale-105"
      style={{
        border: `1px solid rgba(255,255,255,0.05)`,
        minWidth: "220px",
      }}
    >
      <span className="text-3xl">{emoji}</span>
      <div>
        <p className="font-heading font-semibold text-white text-sm group-hover:text-[#00D4FF] transition-colors">
          {ind.name}
        </p>
        <p className="text-xs mt-0.5 font-medium px-2 py-0.5 rounded-full inline-block"
          style={{ backgroundColor: `${color}15`, color }}
        >
          AI Solutions
        </p>
      </div>
    </div>
  );
}

export default function IndustriesSection() {
  const row1 = [...industries, ...industries];
  const row2 = [...industries.slice(5), ...industries, ...industries.slice(0, 5)];

  return (
    <section className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="orb w-72 h-72 bg-[#00D4FF]/8 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge className="mb-4 bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/20">
            Industries
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            AI for Every{" "}
            <span className="gradient-text-animated">Industry</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            No matter your sector — we&apos;ve built AI solutions that deliver real results.
          </p>
        </motion.div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="overflow-hidden mb-4">
        <div className="marquee-left flex">
          {row1.map((ind, i) => <IndustryCard key={`r1-${ind.id}-${i}`} ind={ind} i={i} />)}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden">
        <div className="marquee-right flex">
          {row2.map((ind, i) => <IndustryCard key={`r2-${ind.id}-${i}`} ind={ind} i={i + 3} />)}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <a
          href="/industries"
          className="inline-flex items-center gap-2 text-[#00D4FF] border border-[#00D4FF]/30 hover:bg-[#00D4FF]/10 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
        >
          See All Industries
        </a>
      </motion.div>
    </section>
  );
}
