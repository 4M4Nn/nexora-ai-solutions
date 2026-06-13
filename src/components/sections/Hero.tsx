"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import gsap from "gsap";
import { tickerItems } from "@/lib/data";

const HeroOrbit = dynamic(() => import("@/components/3d/HeroOrbit"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center"><div className="w-10 h-10 rounded-full border border-[#00D4FF]/30 border-t-[#00D4FF] spin-ring" /></div>,
});

const HEADLINE = ["AI Employees", "That Work", "24/7 For", "Your Business"];
const TICKER = tickerItems.map((t) => `${t} ·`).join("   ");

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(labelRef.current, { y: 14, opacity: 0, duration: 0.6, ease: "power2.out" });
      tl.from(".h-word", { y: 80, opacity: 0, skewY: 4, stagger: 0.12, duration: 0.8, ease: "power3.out" }, "-=0.3");
      tl.from(".divider-line", { scaleX: 0, duration: 0.6, ease: "power2.out" }, "-=0.2");
      tl.from(subRef.current, { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");
      tl.from(ctaRef.current, { y: 16, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col bg-black overflow-hidden">
      {/* Holographic grid */}
      <div className="absolute inset-0 holo-grid opacity-60 pointer-events-none" />

      {/* Cyan radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          top: "30%", left: "20%", transform: "translate(-50%,-50%)",
        }}
      />

      {/* Main grid */}
      <div
        ref={containerRef}
        className="flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_42%] items-center pt-32 pb-8 gap-6"
      >
        {/* LEFT */}
        <div>
          <p
            ref={labelRef}
            className="text-xs text-[#00D4FF] tracking-[0.28em] uppercase mb-10"
          >
            {`Kerala's #1 AI Automation Company`}
          </p>

          <h1
            className="font-bold leading-none tracking-tight mb-8"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(44px, 7.5vw, 96px)" }}
          >
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span className="h-word inline-block">{line}</span>
              </span>
            ))}
          </h1>

          <div
            className="divider-line w-52 h-px bg-[#00D4FF]/40 mb-8"
            style={{ transformOrigin: "left" }}
          />

          <p ref={subRef} className="text-white/45 text-base md:text-lg leading-relaxed max-w-md mb-10">
            From AI websites and lead nurturing to sales,
            recruitment and support — Nexora builds
            intelligent systems that scale your business.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <Link
              href="#services"
              className="px-8 py-4 bg-white text-black text-sm font-bold tracking-wide hover:bg-white/90 transition-colors"
            >
              See Our Solutions
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 border border-white/25 text-white text-sm font-bold tracking-wide hover:bg-white/5 transition-colors"
            >
              Book Free Call
            </Link>
          </div>
        </div>

        {/* RIGHT — 3D */}
        <div className="hidden lg:block h-[560px]">
          <HeroOrbit />
        </div>
      </div>

      {/* Ticker */}
      <div className="border-t border-white/8 py-4 overflow-hidden">
        <div className="ticker-track">
          <span className="text-xs text-white/20 tracking-[0.22em] pr-10 whitespace-nowrap">{TICKER}&nbsp;&nbsp;&nbsp;</span>
          <span className="text-xs text-white/20 tracking-[0.22em] pr-10 whitespace-nowrap">{TICKER}&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>
    </section>
  );
}
