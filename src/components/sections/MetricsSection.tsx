"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { metrics } from "@/lib/data";

export default function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      metrics.forEach((metric, i) => {
        const el = valueRefs.current[i];
        if (!el || metric.value === null) return;

        const num = metric.value;
        const suffix = metric.suffix;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: num,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            if (el) el.textContent = Math.round(obj.val) + suffix;
          },
          onComplete: () => {
            if (el) el.textContent = metric.display;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black">
      <div className="border-t border-white/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className="py-16 px-6 md:px-10 text-center"
              style={{
                borderRight:
                  i < metrics.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <p
                className="font-bold text-white leading-none mb-3"
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontSize: "clamp(36px, 5vw, 64px)",
                }}
              >
                <span
                  ref={(el) => { valueRefs.current[i] = el; }}
                >
                  {metric.display}
                </span>
              </p>
              <p className="text-white/35 text-xs tracking-wider uppercase">
                {metric.label}
              </p>
              <p className="text-white/25 text-xs tracking-wider uppercase">
                {metric.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-white/10" />
    </section>
  );
}
