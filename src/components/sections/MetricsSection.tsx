"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { metrics } from "@/lib/data";

export default function MetricsSection() {
  const ref = useRef<HTMLElement>(null);
  const valRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      metrics.forEach((m, i) => {
        const el = valRefs.current[i];
        if (!el || m.value === null) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: m.value,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
          onUpdate: () => { if (el) el.textContent = Math.round(obj.val) + m.suffix; },
          onComplete: () => { if (el) el.textContent = m.display; },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-black">
      <div className="border-t border-white/8 max-w-7xl mx-auto" />
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="py-16 text-center"
              style={{ borderRight: i < metrics.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
            >
              <p
                className="font-bold text-white leading-none mb-3"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(44px, 6vw, 80px)" }}
              >
                <span ref={(el) => { valRefs.current[i] = el; }}>{m.display}</span>
              </p>
              <p className="text-white/30 text-xs tracking-widest uppercase">{m.label}</p>
              <p className="text-white/20 text-xs tracking-widest uppercase">{m.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="border-b border-white/8 max-w-7xl mx-auto" />
    </section>
  );
}
