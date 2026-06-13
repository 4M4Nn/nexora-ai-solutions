"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/lib/data";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-black px-6 md:px-10 py-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div className="lg:sticky lg:top-1/3 h-fit">
            <p className="text-xs text-white/30 tracking-[0.25em] uppercase mb-6">
              FAQ
            </p>
            <h2
              className="font-bold text-white leading-none"
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: "clamp(44px, 6vw, 80px)",
              }}
            >
              Questions.
            </h2>
          </div>

          {/* Right: Accordion */}
          <div>
            {faqs.map((faq) => {
              const isOpen = open === faq.id;
              return (
                <div key={faq.id} className="border-b border-white/10">
                  <button
                    onClick={() => setOpen(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between py-6 text-left group"
                  >
                    <span
                      className="text-sm md:text-base font-medium pr-8 transition-colors duration-200"
                      style={{
                        color: isOpen ? "#ffffff" : "rgba(255,255,255,0.6)",
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="shrink-0 text-xl leading-none"
                      style={{ color: isOpen ? "#00D4FF" : "rgba(255,255,255,0.3)" }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/45 text-sm leading-relaxed pb-6 pr-8">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
