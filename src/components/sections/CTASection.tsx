"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import MagneticButton from "@/components/effects/MagneticButton";

export default function CTASection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Animated gradient mesh background */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    let animId: number;
    const animate = () => {
      t += 0.005;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Shifting gradient orbs
      const orbs = [
        { x: w * 0.3 + Math.sin(t * 0.7) * w * 0.2, y: h * 0.5 + Math.cos(t * 0.5) * h * 0.3, r: 300, c: "rgba(0,212,255,0.07)" },
        { x: w * 0.7 + Math.cos(t * 0.6) * w * 0.15, y: h * 0.5 + Math.sin(t * 0.4) * h * 0.25, r: 280, c: "rgba(110,68,255,0.08)" },
        { x: w * 0.5 + Math.sin(t * 0.9) * w * 0.1,  y: h * 0.3 + Math.cos(t * 0.8) * h * 0.2,  r: 200, c: "rgba(0,255,178,0.04)" },
      ];

      orbs.forEach(({ x, y, r, c }) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, c);
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative py-24 lg:py-36 bg-[#050816] overflow-hidden">
      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Floating dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            backgroundColor: ["#00D4FF", "#6E44FF", "#00FFB2"][i % 3],
            opacity: 0.4,
            boxShadow: `0 0 6px ${["#00D4FF", "#6E44FF", "#00FFB2"][i % 3]}`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="inline-block rounded-3xl px-10 py-14 sm:px-16 sm:py-20 glassmorphism"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 0 80px rgba(0,212,255,0.07), 0 0 160px rgba(110,68,255,0.05)",
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-2 h-2 bg-[#00FFB2] rounded-full animate-pulse" />
              <span className="text-[#00FFB2] text-sm font-medium tracking-widest uppercase">
                Start Today
              </span>
            </div>

            <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Ready to Build Your{" "}
              <span className="gradient-text-animated">AI Workforce?</span>
            </h2>

            <p className="text-[#B7C0D1] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Join businesses across India using Nexora AI to automate, scale, and dominate their market.
              Your first consultation is completely free.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link href="/contact">
                  <button
                    className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white font-semibold text-base transition-all duration-300"
                    style={{ boxShadow: "0 0 40px rgba(0,212,255,0.4)" }}
                  >
                    Book Free Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <a href="https://wa.me/918891129111" target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center gap-2.5 px-8 py-4 rounded-xl border border-[#25D366]/40 bg-[#25D366]/5 text-[#25D366] font-semibold text-base hover:bg-[#25D366]/10 transition-all duration-300">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us Now
                  </button>
                </a>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
