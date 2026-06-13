"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setActive((i) => (i + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.96 }),
  };

  const t = testimonials[active];

  return (
    <section className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="orb w-[500px] h-[300px] bg-[#6E44FF]/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge className="mb-4 bg-[#6E44FF]/10 text-[#6E44FF] border-[#6E44FF]/20">
            Testimonials
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Clients Who{" "}
            <span className="gradient-text-animated">Transformed</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-xl mx-auto">
            Real results from real businesses across Kerala and India.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative min-h-[340px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute w-full max-w-2xl"
            >
              <div
                className="glassmorphism rounded-3xl p-8 sm:p-10"
                style={{
                  boxShadow: "0 0 60px rgba(110,68,255,0.08), 0 30px 80px rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#00FFB2] text-[#00FFB2]" />
                  ))}
                </div>

                {/* Quote */}
                <Quote className="w-8 h-8 text-[#6E44FF]/40 mb-4" />
                <p className="text-white/90 text-lg leading-relaxed mb-8 italic">
                  &ldquo;{t.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6E44FF] flex items-center justify-center font-heading font-bold text-white text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-white">{t.name}</p>
                    <p className="text-[#B7C0D1] text-sm">
                      {t.role} · {t.company}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20">
                      {t.industry}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 glass rounded-full flex items-center justify-center text-[#B7C0D1] hover:text-white hover:border-[#00D4FF]/40 transition-all duration-200"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "24px" : "8px",
                  height: "8px",
                  backgroundColor: i === active ? "#00D4FF" : "rgba(255,255,255,0.2)",
                  boxShadow: i === active ? "0 0 8px #00D4FF" : "none",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 glass rounded-full flex items-center justify-center text-[#B7C0D1] hover:text-white hover:border-[#00D4FF]/40 transition-all duration-200"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
