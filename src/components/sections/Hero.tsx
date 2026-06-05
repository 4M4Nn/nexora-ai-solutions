"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Zap, Bot, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ["#00D4FF", "#6E44FF", "#00FFB2"];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      // Draw connections
      ctx.globalAlpha = 0.05;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "#00D4FF";
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

const floatingItems = [
  { icon: Bot, label: "AI Agent", x: "8%", y: "25%", color: "#00D4FF", delay: 0 },
  { icon: Globe, label: "AI Website", x: "85%", y: "20%", color: "#6E44FF", delay: 1 },
  { icon: TrendingUp, label: "SEO AI", x: "88%", y: "65%", color: "#00FFB2", delay: 2 },
  { icon: Zap, label: "Automation", x: "5%", y: "70%", color: "#6E44FF", delay: 1.5 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050816]">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Gradient orbs */}
      <div className="orb w-96 h-96 bg-[#00D4FF]/15 top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" />
      <div className="orb w-80 h-80 bg-[#6E44FF]/20 bottom-1/3 right-1/4 translate-x-1/2" />
      <div className="orb w-64 h-64 bg-[#00FFB2]/10 top-2/3 left-1/2" />

      {/* Floating cards - hidden on mobile */}
      {floatingItems.map((item) => (
        <motion.div
          key={item.label}
          className="absolute hidden xl:flex items-center gap-2 glass rounded-xl px-3 py-2 text-xs font-medium text-white/80"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [0, -12, 0],
          }}
          transition={{
            opacity: { delay: item.delay + 1, duration: 0.5 },
            y: {
              delay: item.delay,
              duration: 4 + item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <item.icon className="w-4 h-4" style={{ color: item.color }} />
          {item.label}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-[#00D4FF]/20"
        >
          <div className="w-2 h-2 bg-[#00FFB2] rounded-full animate-pulse" />
          <span className="text-[#B7C0D1] text-sm font-medium">
            AI-Powered Business Automation &bull; Kochi, Kerala
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight tracking-tight"
        >
          Deploy{" "}
          <span className="gradient-text-primary">AI Employees</span>
          <br className="hidden sm:block" />
          {" "}for Your Business
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#B7C0D1] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Nexora AI Solutions builds custom AI agents, websites, and automation systems that work 24/7 — converting leads, supporting customers, and scaling your business on autopilot.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/contact">
            <Button className="group relative overflow-hidden bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white font-semibold px-8 py-4 rounded-xl text-base shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_50px_rgba(0,212,255,0.6)] transition-all duration-300 h-auto">
              <span className="flex items-center gap-2">
                Get Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
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
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "80%", label: "Cost Saved" },
            { value: "24/7", label: "AI Uptime" },
            { value: "3x", label: "Productivity" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading font-bold text-2xl sm:text-3xl gradient-text-primary">
                {stat.value}
              </div>
              <div className="text-[#B7C0D1] text-xs sm:text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
    </section>
  );
}
