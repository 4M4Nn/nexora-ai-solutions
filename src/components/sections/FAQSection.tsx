"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { faqs } from "@/lib/data";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="orb w-72 h-72 bg-[#00FFB2]/6 bottom-0 right-1/4" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge className="mb-4 bg-[#00FFB2]/10 text-[#00FFB2] border-[#00FFB2]/20">
            FAQ
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Questions{" "}
            <span className="gradient-text-animated">Answered</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg">
            Everything you need to know before we start.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: "#0D1224",
                  border: `1px solid ${isOpen ? "rgba(0,212,255,0.35)" : "rgba(26,35,64,0.9)"}`,
                  boxShadow: isOpen ? "0 0 20px rgba(0,212,255,0.08)" : "none",
                }}
              >
                {/* Cyan left accent when open */}
                {isOpen && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
                    style={{ background: "linear-gradient(180deg, #00D4FF, #6E44FF)" }}
                  />
                )}

                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-heading font-semibold text-white text-sm sm:text-base pr-4 leading-snug">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: isOpen ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${isOpen ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    <Plus className="w-4 h-4" style={{ color: isOpen ? "#00D4FF" : "#B7C0D1" }} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-[#B7C0D1] text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
