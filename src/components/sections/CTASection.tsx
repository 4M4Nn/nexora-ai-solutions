"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/lib/data";

const CTATorus = dynamic(() => import("@/components/3d/CTATorus"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="relative bg-black overflow-hidden py-40 px-6 md:px-10">
      {/* 3D tori background */}
      <div className="absolute inset-0 pointer-events-none">
        <CTATorus />
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-xs text-white/30 tracking-[0.28em] uppercase mb-6"
        >
          Ready to start?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold text-white leading-none mb-6"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(40px, 7vw, 96px)" }}
        >
          Your AI workforce
          <br />
          is waiting.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/35 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Book a free 30-minute call. We&apos;ll identify the highest-impact automation in your business — no commitment required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href={`https://wa.me/${siteConfig.whatsapp}?text=Hi! I want to book a free discovery call with Nexora AI Solutions.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-black bg-[#00D4FF] hover:bg-white transition-colors duration-200"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Book Free Call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H6M12 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white/70 hover:text-white border border-white/15 hover:border-white/40 transition-colors duration-200"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Send a Message
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 text-white/15 text-xs tracking-widest uppercase"
        >
          Kerala&apos;s #1 AI Automation Company
        </motion.p>
      </div>
    </section>
  );
}
