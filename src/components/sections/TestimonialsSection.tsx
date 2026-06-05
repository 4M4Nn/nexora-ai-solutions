"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="orb w-96 h-96 bg-[#6E44FF]/12 bottom-0 right-0 translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[#6E44FF]/10 text-[#6E44FF] border-[#6E44FF]/20">
            Testimonials
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Trusted by{" "}
            <span className="gradient-text-primary">Business Leaders</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            Hear from the entrepreneurs and executives who transformed their businesses with Nexora AI.
          </p>
        </motion.div>

        {/* Main carousel */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative glass rounded-3xl p-8 sm:p-10 min-h-[280px] flex flex-col justify-between">
            {/* Quote icon */}
            <Quote className="absolute top-6 right-8 w-10 h-10 text-[#6E44FF]/20" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-white text-base sm:text-lg leading-relaxed mb-8 italic">
                  &ldquo;{testimonials[current].content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6E44FF] flex items-center justify-center font-heading font-bold text-white text-lg">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-white">
                      {testimonials[current].name}
                    </p>
                    <p className="text-[#B7C0D1] text-sm">
                      {testimonials[current].role}, {testimonials[current].company}
                    </p>
                  </div>
                  <Badge className="ml-auto hidden sm:flex bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/20 text-xs">
                    {testimonials[current].industry}
                  </Badge>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-[#B7C0D1] hover:text-white hover:border-[#00D4FF]/40 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? "24px" : "8px",
                  height: "8px",
                  backgroundColor: i === current ? "#00D4FF" : "rgba(183,192,209,0.3)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-[#B7C0D1] hover:text-white hover:border-[#00D4FF]/40 transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mini cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => setCurrent(i)}
              whileHover={{ y: -2 }}
              className={`glass rounded-xl p-3 text-left transition-all duration-200 ${
                i === current ? "border-[#00D4FF]/40 shadow-[0_0_15px_rgba(0,212,255,0.15)]" : "border-transparent"
              }`}
              style={{ border: "1px solid" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6E44FF] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {t.name.charAt(0)}
                </div>
                <span className="text-white text-xs font-medium truncate">{t.name.split(" ")[0]}</span>
              </div>
              <p className="text-[#B7C0D1] text-xs truncate">{t.company}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
