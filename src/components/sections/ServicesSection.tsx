"use client";

import { useRef, useState, useEffect } from "react";
import { services } from "@/lib/data";

export default function ServicesSection() {
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
    <section id="services" className="bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left sticky */}
          <div className="lg:sticky lg:top-0 h-auto lg:h-screen flex flex-col justify-center py-24 lg:py-0 pr-0 lg:pr-20 border-b lg:border-b-0 border-white/10 mb-0">
            <p className="text-xs text-white/30 tracking-[0.25em] uppercase mb-6">
              What We Build
            </p>
            <h2
              className="font-bold text-white leading-none"
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: "clamp(44px, 6vw, 80px)",
              }}
            >
              What we
              <br />
              build
            </h2>

            {/* Active indicator */}
            <div className="mt-12 hidden lg:block">
              <p className="text-[#00D4FF] text-xs tracking-widest uppercase mb-2">
                {services[active]?.id}
              </p>
              <p className="text-white/50 text-sm">{services[active]?.title}</p>
            </div>
          </div>

          {/* Right scrollable */}
          <div className="border-l border-white/10">
            {services.map((service, i) => (
              <div
                key={service.id}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="group relative px-8 md:px-12 py-12 border-b border-white/10 transition-all duration-300"
                style={{
                  borderLeftColor:
                    active === i ? "#00D4FF" : "transparent",
                  borderLeftWidth: "2px",
                }}
              >
                <div className="flex items-start gap-6">
                  <span
                    className="text-xs tracking-widest shrink-0 mt-1 transition-colors duration-300"
                    style={{ color: active === i ? "#00D4FF" : "rgba(255,255,255,0.2)" }}
                  >
                    {service.id}
                  </span>

                  <div>
                    <h3
                      className="font-bold leading-none transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                        fontSize: "clamp(24px, 3.5vw, 42px)",
                        color: active === i ? "#ffffff" : "rgba(255,255,255,0.35)",
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="mt-3 text-sm leading-relaxed transition-colors duration-300"
                      style={{
                        color: active === i
                          ? "rgba(255,255,255,0.55)"
                          : "rgba(255,255,255,0.2)",
                      }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
