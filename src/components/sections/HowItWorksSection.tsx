"use client";

import { useRef, useState, useEffect } from "react";
import { workSteps } from "@/lib/data";

export default function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { threshold: 0.5, rootMargin: "-30% 0px -30% 0px" }
      );
      obs.observe(ref);
      return obs;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <section id="how-it-works" className="bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left sticky */}
          <div className="lg:sticky lg:top-0 h-auto lg:h-screen flex flex-col justify-center py-24 lg:py-0 pr-0 lg:pr-20 border-b lg:border-b-0 border-white/10">
            <p className="text-xs text-white/30 tracking-[0.25em] uppercase mb-6">
              Process
            </p>
            <h2
              className="font-bold text-white leading-none"
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: "clamp(44px, 6vw, 80px)",
              }}
            >
              How it
              <br />
              works
            </h2>

            {/* Step tracker */}
            <div className="mt-12 hidden lg:flex items-center gap-3">
              {workSteps.map((_, i) => (
                <div
                  key={i}
                  className="h-px transition-all duration-500"
                  style={{
                    width: active === i ? 32 : 16,
                    backgroundColor:
                      active === i
                        ? "#00D4FF"
                        : i < active
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(255,255,255,0.1)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right scrollable */}
          <div className="border-l border-white/10">
            {workSteps.map((step, i) => (
              <div
                key={step.id}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="relative px-8 md:px-12 py-12 border-b border-white/10 transition-all duration-300"
                style={{
                  borderLeftColor:
                    active === i ? "#00D4FF" : "transparent",
                  borderLeftWidth: "2px",
                }}
              >
                <span
                  className="text-xs tracking-widest block mb-4 transition-colors duration-300"
                  style={{ color: active === i ? "#00D4FF" : "rgba(255,255,255,0.2)" }}
                >
                  {step.id}
                </span>

                <h3
                  className="font-bold leading-none mb-4 transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontSize: "clamp(24px, 3vw, 40px)",
                    color: active === i ? "#ffffff" : "rgba(255,255,255,0.3)",
                  }}
                >
                  {step.title}
                </h3>

                <p
                  className="text-sm leading-relaxed transition-colors duration-300"
                  style={{
                    color: active === i
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(255,255,255,0.18)",
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
