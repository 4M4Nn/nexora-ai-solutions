"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Globe, MessageSquare, TrendingUp, Bot, Zap, Users, Headphones,
  ArrowRight, CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { services } from "@/lib/data";
import type { Service } from "@/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Globe,
  MessageSquare,
  TrendingUp,
  Bot,
  Zap,
  Users,
  HeadphonesIcon: Headphones,
};

function TiltCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon] ?? Bot;
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const springRotX = useSpring(rotX, { stiffness: 280, damping: 28 });
  const springRotY = useSpring(rotY, { stiffness: 280, damping: 28 });
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotX,
        rotateY: springRotY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="group relative bg-[#0D1224] rounded-2xl p-6 flex flex-col cursor-default"
      animate={{
        y: [0, -6, 0],
        transition: {
          y: { duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 },
        },
      }}
    >
      {/* Animated glow border */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, ${service.color}20 0%, transparent 60%)`,
          boxShadow: `0 0 0 1px ${service.color}40`,
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: "1px solid rgba(26,35,64,0.8)",
          opacity: 1,
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none"
        style={{
          boxShadow: `0 0 25px ${service.color}22, 0 20px 60px rgba(0,0,0,0.4)`,
          border: `1px solid ${service.color}35`,
          borderRadius: "1rem",
        }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-115"
        style={{
          backgroundColor: `${service.color}15`,
          border: `1px solid ${service.color}35`,
          boxShadow: `0 0 20px ${service.color}20`,
        }}
      >
        <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" style={{ color: service.color }} />
      </div>

      <h3 className="font-heading font-semibold text-xl text-white mb-3">
        {service.title}
      </h3>

      <p className="text-[#B7C0D1] text-sm leading-relaxed mb-5 flex-1">
        {service.description}
      </p>

      <ul className="space-y-2 mb-5">
        {service.features.slice(0, 3).map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-[#B7C0D1]">
            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: service.color }} />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
        style={{ color: service.color }}
      >
        Get Started
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}

interface ServicesSectionProps {
  limit?: number;
  showCTA?: boolean;
}

export default function ServicesSection({ limit, showCTA = true }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const displayed = limit ? services.slice(0, limit) : services;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="orb w-96 h-96 bg-[#6E44FF]/10 top-1/2 right-0 translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <Badge className="mb-4 bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/20 hover:bg-[#00D4FF]/15">
            Our Services
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            AI Solutions That{" "}
            <span className="gradient-text-animated">Drive Results</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            From AI websites to autonomous agents — we build intelligent systems that work for your business around the clock.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
          {displayed.map((service, index) => (
            <TiltCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {showCTA && limit && services.length > limit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(0,212,255,0.3)]"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
