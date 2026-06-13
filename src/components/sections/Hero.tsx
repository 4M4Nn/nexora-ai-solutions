"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import MagneticButton from "@/components/effects/MagneticButton";

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene"),
  { ssr: false, loading: () => null }
);

const LINES = [
  { words: ["AI", "Employees", "That"] },
  { words: ["Work", "24/7"] },
  { words: ["For", "Your", "Business"] },
];

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x:  (e.clientX / window.innerWidth  - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(".hero-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      tl.fromTo(".hero-word",
        { opacity: 0, y: 48, skewY: 4 },
        {
          opacity: 1, y: 0, skewY: 0,
          stagger: 0.06,
          duration: 0.65,
          ease: "power3.out",
        },
        "-=0.3"
      );

      tl.fromTo(".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.3"
      );

      tl.fromTo(".hero-ctas",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );

      tl.fromTo(".hero-stats",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      );

      tl.fromTo(".scroll-hint",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.1"
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050816]">
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-40 z-0" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <HeroScene mousePos={mouse} />
      </div>

      {/* Radial glow behind orb */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00D4FF]/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6E44FF]/8 rounded-full blur-[80px]" />
      </div>

      {/* Badge top-left */}
      <div className="hero-badge absolute top-28 left-6 sm:left-10 lg:left-16 z-10 opacity-0">
        <div className="flex items-center gap-2 glass rounded-full px-3.5 py-1.5 border border-[#00D4FF]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#00D4FF]" />
          <span className="text-xs font-medium text-[#B7C0D1]">Kerala&apos;s #1 AI Agency</span>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">

        {/* Headline */}
        <div className="mb-7 overflow-hidden">
          {LINES.map((line, li) => (
            <div key={li} className="flex items-baseline justify-center flex-wrap gap-x-4 leading-none">
              {line.words.map((word, wi) => (
                <span
                  key={wi}
                  className="hero-word inline-block opacity-0 font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
                  style={{
                    color: li === 1 ? undefined : "white",
                    WebkitTextFillColor: li === 1 ? "transparent" : "white",
                    background: li === 1
                      ? "linear-gradient(135deg, #00d4ff, #6e44ff)"
                      : undefined,
                    WebkitBackgroundClip: li === 1 ? "text" : undefined,
                    backgroundClip: li === 1 ? "text" : undefined,
                    backgroundSize: "200% 200%",
                    lineHeight: "1.05",
                    paddingBottom: "0.05em",
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Sub */}
        <p className="hero-sub opacity-0 text-[#B7C0D1] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Nexora AI Solutions builds custom AI agents, websites, and automation systems that work 24/7 — converting leads, supporting customers, and scaling your business on autopilot.
        </p>

        {/* CTAs */}
        <div className="hero-ctas opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <MagneticButton>
            <Link href="/contact">
              <button
                className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white font-semibold text-base transition-all duration-300"
                style={{
                  boxShadow: "0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(110,68,255,0.2)",
                }}
              >
                Get Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </MagneticButton>

          <MagneticButton>
            <a
              href="https://wa.me/918891129111"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="flex items-center gap-2.5 px-8 py-4 rounded-xl border border-[#25D366]/40 bg-[#25D366]/5 text-[#25D366] font-semibold text-base hover:bg-[#25D366]/10 hover:border-[#25D366]/70 transition-all duration-300">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </button>
            </a>
          </MagneticButton>
        </div>

        {/* Stats */}
        <motion.div
          className="hero-stats opacity-0 inline-flex items-center gap-8 sm:gap-12 glass rounded-2xl px-8 py-5 border border-white/[0.06]"
        >
          {[
            { val: "80%", label: "Cost Saved" },
            { val: "24/7", label: "AI Uptime" },
            { val: "3x",  label: "Productivity" },
          ].map((s, i) => (
            <div key={s.label} className="text-center">
              {i > 0 && (
                <div className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10" />
              )}
              <div className="relative font-heading font-bold text-2xl sm:text-3xl gradient-text-primary">
                {s.val}
              </div>
              <div className="text-[#B7C0D1] text-xs sm:text-sm mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[#B7C0D1] text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#00D4FF]/60 to-transparent"
        />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none z-10" />
    </section>
  );
}
