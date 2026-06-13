"use client";

import { industries } from "@/lib/data";

const ROW1 = [...industries.slice(0, 5), ...industries.slice(0, 5)];
const ROW2 = [...industries.slice(5), ...industries.slice(5)];

export default function IndustriesSection() {
  return (
    <section id="industries" className="bg-black py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-16">
        <p className="text-xs text-white/30 tracking-[0.25em] uppercase mb-6">
          We Work Across
        </p>
        <h2
          className="font-bold text-white leading-none"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "clamp(44px, 7vw, 96px)",
          }}
        >
          Every industry.
          <br />
          One AI partner.
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="overflow-hidden mb-4">
        <div className="marquee-left">
          {ROW1.map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center border border-white/15 text-white text-sm md:text-base font-medium px-5 py-2.5 mr-3 shrink-0 hover:border-white/40 hover:text-white transition-colors duration-200"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden">
        <div className="marquee-right">
          {ROW2.map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center border border-white/15 text-white text-sm md:text-base font-medium px-5 py-2.5 mr-3 shrink-0 hover:border-white/40 hover:text-white transition-colors duration-200"
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
