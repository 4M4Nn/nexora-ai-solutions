"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import gsap from "gsap";
import { tickerItems } from "@/lib/data";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const HEADLINE = [
  ["They", "work."],
  ["You", "scale."],
  ["We", "build", "the", "AI."],
];

const TICKER_CONTENT = tickerItems.map((t) => `${t} ·`).join("  ");

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(labelRef.current, {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      tl.from(
        ".hero-word",
        {
          y: 60,
          opacity: 0,
          skewY: 5,
          stagger: 0.06,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.3"
      );

      tl.from(
        subRef.current,
        { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );

      tl.from(
        ctaRef.current,
        { y: 16, opacity: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    }, headlineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col bg-black overflow-hidden">
      {/* Radial glow behind headline */}
      <div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Main content */}
      <div className="flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_40%] items-center pt-28 pb-24 gap-8">
        {/* Left: Text */}
        <div ref={headlineRef}>
          <p
            ref={labelRef}
            className="text-xs text-white/40 tracking-[0.25em] uppercase mb-10"
          >
            {`Kerala's Leading AI Automation Company`}
          </p>

          {/* Headline */}
          <h1
            className="font-bold leading-none tracking-tight mb-8"
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontSize: "clamp(52px, 8vw, 110px)",
            }}
          >
            {HEADLINE.map((line, li) => (
              <span key={li} className="block overflow-hidden">
                {line.map((word, wi) => (
                  <span
                    key={wi}
                    className="hero-word inline-block mr-[0.2em]"
                  >
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* Divider */}
          <div className="w-12 h-px bg-white/20 mb-8" />

          {/* Subtext */}
          <div ref={subRef}>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-md">
              From lead nurturing to sales automation —{" "}
              <br className="hidden md:block" />
              Nexora builds AI employees that work 24/7.
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 mt-10">
            <Link
              href="#services"
              className="px-7 py-3.5 bg-white text-black text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors"
            >
              See Our Solutions
            </Link>
            <Link
              href="#contact"
              className="px-7 py-3.5 border border-white/30 text-white text-sm font-semibold tracking-wide hover:bg-white/5 transition-colors"
            >
              Book Free Call
            </Link>
          </div>
        </div>

        {/* Right: 3D scene */}
        <div className="hidden lg:block h-[560px] w-full">
          <HeroScene />
        </div>
      </div>

      {/* Ticker */}
      <div className="border-t border-white/10 py-5 overflow-hidden">
        <div className="ticker-track">
          <span className="text-sm text-white/25 tracking-[0.15em] pr-8 whitespace-nowrap">
            {TICKER_CONTENT}&nbsp;&nbsp;&nbsp;
          </span>
          <span className="text-sm text-white/25 tracking-[0.15em] pr-8 whitespace-nowrap">
            {TICKER_CONTENT}&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>
    </section>
  );
}
