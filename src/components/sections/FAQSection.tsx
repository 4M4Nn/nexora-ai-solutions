"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { faqs } from "@/lib/data";

function AccordionItem({ faq, isOpen, onToggle }: {
  faq: typeof faqs[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/8">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
      >
        <span
          className="text-base md:text-lg font-medium transition-colors duration-200 pr-6"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            color: isOpen ? "#ffffff" : "rgba(255,255,255,0.55)",
          }}
        >
          {faq.question}
        </span>
        <div
          className="shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: isOpen ? "#00D4FF" : "rgba(255,255,255,0.15)",
            backgroundColor: isOpen ? "rgba(0,212,255,0.1)" : "transparent",
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            style={{ transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.3s" }}
          >
            <path d="M5 1V9M1 5H9" stroke={isOpen ? "#00D4FF" : "rgba(255,255,255,0.4)"} strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-6 text-white/40 text-sm md:text-base leading-relaxed max-w-xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="bg-black py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left sticky heading */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-xs text-white/30 tracking-[0.28em] uppercase mb-5"
            >
              FAQ
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold text-white leading-none mb-8"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(40px, 5.5vw, 80px)" }}
            >
              Questions.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-white/25 text-sm leading-relaxed max-w-xs"
            >
              Everything you need to know about deploying AI in your business. Can&apos;t find what you&apos;re looking for?{" "}
              <a href="#contact" className="text-[#00D4FF]/70 hover:text-[#00D4FF] transition-colors">Ask us directly.</a>
            </motion.p>
          </div>

          {/* Right accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                faq={faq}
                isOpen={open === faq.id}
                onToggle={() => setOpen(open === faq.id ? null : faq.id)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
