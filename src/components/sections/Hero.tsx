"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import gsap from "gsap";
import { tickerItems, siteConfig } from "@/lib/data";

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
      tl.from(".h-word", { y: 100, opacity: 0, skewY: 4, stagger: 0.1, duration: 0.9, ease: "power3.out" }, "-=0.3");
      tl.from(".divider-line", { scaleX: 0, duration: 0.6, ease: "power2.out" }, "-=0.2");
      tl.from(subRef.current, { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");
      tl.from(ctaRef.current, { y: 16, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
    }, containerRef);
    return () => { ctx.revert(); };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "radial-gradient(ellipse 120% 80% at 60% 0%, #1a2744 0%, #0A0F1E 65%)" }}
    >
      {/* Holographic grid */}
      <div className="absolute inset-0 holo-grid opacity-50 pointer-events-none" />

      {/* Radial glows */}
      <div className="absolute pointer-events-none" style={{ width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)", top: "20%", left: "10%", transform: "translate(-50%,-50%)" }} />
      <div className="absolute pointer-events-none" style={{ width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(110,68,255,0.05) 0%, transparent 70%)", top: "60%", right: "5%", transform: "translate(50%,-50%)" }} />

      {/* Main grid */}
      <div
        ref={containerRef}
        className="flex-1 max-w-[1440px] mx-auto w-full px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_44%] items-center pt-32 pb-8 gap-6"
      >
        {/* LEFT */}
        <div>
          <p ref={labelRef} className="section-label mb-8">
            {siteConfig.tagline}
          </p>

          <h1
            className="font-black tracking-tight mb-8"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "clamp(48px, 8vw, 108px)",
              lineHeight: 0.95,
              color: "#ffffff",
            }}
          >
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span className="h-word inline-block">{line}</span>
              </span>
            ))}
          </h1>

          <div className="divider-line w-56 h-px mb-8" style={{ background: "linear-gradient(90deg, #00D4FF 0%, transparent 100%)", transformOrigin: "left" }} />

          <p ref={subRef} className="text-[#CBD5E1] text-base md:text-lg leading-relaxed max-w-md mb-10">
            From AI websites and lead nurturing to sales,
            recruitment and support — Nexora builds
            intelligent systems that scale your business.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <Link
              href="#services"
              className="px-8 py-4 text-black text-sm font-bold tracking-wide transition-all duration-200 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #00D4FF, #00FFB2)", fontFamily: "var(--font-syne), sans-serif" }}
            >
              See Our Solutions
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 border text-white text-sm font-bold tracking-wide hover:bg-white/5 transition-colors"
              style={{ borderColor: "rgba(0,212,255,0.3)", fontFamily: "var(--font-syne), sans-serif" }}
            >
              Book Free Call
            </Link>
          </div>
        </div>

        {/* RIGHT — 3D */}
        <div className="hidden lg:block h-[580px]">
          <HeroOrbit />
        </div>
      </div>

      {/* Ticker */}
      <div className="border-t py-4 overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="ticker-track">
          <span className="section-label pr-10 whitespace-nowrap" style={{ opacity: 0.35 }}>{TICKER}&nbsp;&nbsp;&nbsp;</span>
          <span className="section-label pr-10 whitespace-nowrap" style={{ opacity: 0.35 }}>{TICKER}&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>
    </section>
  );
}
