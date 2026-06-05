"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { faqs } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FAQSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="orb w-80 h-80 bg-[#00D4FF]/8 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Badge className="mb-4 bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/20">
            FAQ
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Questions?{" "}
            <span className="gradient-text-primary">We Have Answers</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-xl mx-auto">
            Everything you need to know about AI automation and working with Nexora.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-[#0D1224] border border-[#1A2340] rounded-xl px-5 overflow-hidden data-[state=open]:border-[#00D4FF]/30 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-white font-medium hover:text-[#00D4FF] hover:no-underline py-5 text-sm sm:text-base [&[data-state=open]]:text-[#00D4FF]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#B7C0D1] text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center glass rounded-2xl p-8"
        >
          <p className="text-white font-semibold text-lg mb-2">
            Still have questions?
          </p>
          <p className="text-[#B7C0D1] text-sm mb-6">
            Talk to our AI team directly — we&apos;re happy to answer any questions specific to your business.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity">
              Ask Us Anything
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
