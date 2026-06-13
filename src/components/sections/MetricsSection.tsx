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
    return () => { ctx.revert(); };
  }, []);

  return (
    <section ref={ref} style={{ background: "#0F1628" }}>
      <div className="section-divider" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4">
        <p className="section-label py-10">/ 07 &nbsp;·&nbsp; Impact</p>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="py-14 text-center"
              style={{ borderRight: i < metrics.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}
            >
              <p
                className="font-black text-white leading-none mb-2"
                style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "clamp(44px, 6vw, 84px)" }}
              >
                <span ref={(el) => { valRefs.current[i] = el; }}>{m.display}</span>
              </p>
              <p className="section-label">{m.label}</p>
              <p className="section-label" style={{ opacity: 0.5 }}>{m.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}
