"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/effects/MagneticButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AIBrainScene = dynamic(
  () => import("@/components/3d/AIBrainScene"),
  { ssr: false, loading: () => null }
);

const statItems = [
  { value: "80%", label: "Cost Saved" },
  { value: "24/7", label: "AI Uptime" },
  { value: "3x", label: "Productivity" },
];

const words = ["AI Employees", "AI Agents", "Automation", "Intelligence"];

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [wordIdx, setWordIdx] = useState(0);
  const headlineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIdx((i) => (i + 1) % words.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      if (badgeRef.current)
        tl.fromTo(badgeRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
      if (headlineRef.current)
        tl.fromTo(headlineRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
      if (subRef.current)
        tl.fromTo(subRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");
      if (ctaRef.current)
        tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
      if (statsRef.current)
        tl.fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050816]">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <AIBrainScene mousePos={mouse} />
      </div>

      {/* Gradient orbs behind content */}
      <div className="orb w-[500px] h-[500px] bg-[#00D4FF]/8 top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" />
      <div className="orb w-[400px] h-[400px] bg-[#6E44FF]/10 bottom-1/3 right-1/4 translate-x-1/2" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div ref={badgeRef} style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-[#00D4FF]/25">
            <div className="w-2 h-2 bg-[#00FFB2] rounded-full animate-pulse" />
            <span className="text-[#B7C0D1] text-sm font-medium">
              AI-Powered Business Automation &bull; Kochi, Kerala
            </span>
          </div>
        </div>

        {/* Headline */}
        <div ref={headlineRef} style={{ opacity: 0 }}>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight tracking-tight">
            Deploy{" "}
            <span className="relative inline-block">
              <span className="gradient-text-animated">
                {words[wordIdx]}
              </span>
            </span>
            <br className="hidden sm:block" />
            {" "}for Your Business
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subRef}
          style={{ opacity: 0 }}
          className="text-[#B7C0D1] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Nexora AI Solutions builds custom AI agents, websites, and automation systems that work 24/7 — converting leads, supporting customers, and scaling your business on autopilot.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          style={{ opacity: 0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <MagneticButton>
            <Link href="/contact">
              <Button className="group relative overflow-hidden bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white font-semibold px-8 py-4 rounded-xl text-base shadow-[0_0_40px_rgba(0,212,255,0.45)] hover:shadow-[0_0_60px_rgba(0,212,255,0.65)] transition-all duration-300 h-auto">
                <span className="flex items-center gap-2">
                  Get Free Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <a
              href={`https://wa.me/918891129111`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="flex items-center gap-2 border-[#25D366]/40 bg-[#25D366]/5 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/60 font-semibold px-8 py-4 rounded-xl text-base h-auto transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </Button>
            </a>
          </MagneticButton>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          style={{ opacity: 0 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto"
        >
          {statItems.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading font-bold text-2xl sm:text-3xl gradient-text-primary">
                {stat.value}
              </div>
              <div className="text-[#B7C0D1] text-xs sm:text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none z-10" />
    </section>
  );
}
