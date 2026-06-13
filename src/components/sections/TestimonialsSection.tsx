"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    const id = setInterval(() => {
      setActive((p) => (p + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[active];

  return (
    <section ref={ref} className="bg-black py-28 px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-xs text-white/30 tracking-[0.28em] uppercase mb-5"
            >
              Testimonials
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold text-white leading-none mb-6"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(36px, 4.5vw, 64px)" }}
            >
              What our
              <br />
              clients say.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="flex gap-2"
            >
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="h-px transition-all duration-300 focus:outline-none"
                  style={{
                    width: active === i ? 32 : 12,
                    backgroundColor: active === i ? "#00D4FF" : "rgba(255,255,255,0.2)",
                  }}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </motion.div>
          </div>

          {/* Right */}
          <div className="min-h-[280px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <svg className="mb-6" width="32" height="22" viewBox="0 0 32 22" fill="none">
                  <path d="M0 22V13.75C0 9.875 0.833333 6.70833 2.5 4.25C4.20833 1.75 6.83333 0 10.375 0L12.25 3.25C10.0833 3.58333 8.41667 4.58333 7.25 6.25C6.08333 7.875 5.5 9.875 5.5 12.25H10.375V22H0ZM19.75 22V13.75C19.75 9.875 20.5833 6.70833 22.25 4.25C23.9583 1.75 26.5833 0 30.125 0L32 3.25C29.8333 3.58333 28.1667 4.58333 27 6.25C25.8333 7.875 25.25 9.875 25.25 12.25H30.125V22H19.75Z" fill="rgba(0,212,255,0.3)" />
                </svg>

                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8">
                  {t.quote}
                </p>

                <div>
                  <p className="text-white font-semibold mb-1" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                    {t.name}
                  </p>
                  <p className="text-white/30 text-sm">{t.company}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
