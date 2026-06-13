"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[active];

  return (
    <section className="bg-black py-28 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
          <div>
            <p className="text-xs text-white/30 tracking-[0.25em] uppercase mb-4">
              What Clients Say
            </p>
            <h2
              className="font-bold text-white leading-none"
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: "clamp(44px, 6vw, 80px)",
              }}
            >
              Results speak.
            </h2>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
                className="h-px transition-all duration-400"
                style={{
                  width: active === i ? 32 : 16,
                  backgroundColor:
                    active === i ? "#ffffff" : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Quote */}
        <AnimatePresence mode="wait">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <blockquote className="mb-10">
              <p
                className="italic text-white/75 leading-relaxed"
                style={{ fontSize: "clamp(18px, 2.5vw, 28px)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
            </blockquote>

            <div>
              <p className="text-white text-sm font-semibold">{t.name}</p>
              <p className="text-white/35 text-sm mt-0.5">{t.company}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
