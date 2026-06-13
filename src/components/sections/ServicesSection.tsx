"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe, MessageSquare, TrendingUp, Bot, Zap, Users, Headphones,
  ArrowRight, CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { services } from "@/lib/data";
import type { Service } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Globe, MessageSquare, TrendingUp, Bot, Zap, Users,
  HeadphonesIcon: Headphones,
};

/* ── Animated laptop mockup for feature card ── */
function LaptopMockup() {
  return (
    <div className="relative flex items-center justify-center py-6">
      <div className="relative w-56 h-36 rounded-lg border border-[#00D4FF]/30 bg-[#050816]/80 shadow-[0_0_30px_rgba(0,212,255,0.15)] overflow-hidden">
        {/* Browser bar */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
          <div className="flex-1 mx-2 h-2 bg-white/10 rounded-full" />
        </div>
        {/* Content skeleton */}
        <div className="p-3 space-y-1.5">
          <motion.div
            className="h-2 rounded-full bg-[#00D4FF]/50"
            animate={{ width: ["40%", "80%", "60%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="h-1.5 rounded-full bg-white/10 w-full" />
          <div className="h-1.5 rounded-full bg-white/10 w-5/6" />
          <div className="mt-2 h-10 rounded-md border border-[#00D4FF]/20 bg-[#00D4FF]/5 flex items-center justify-center">
            <span className="text-[8px] text-[#00D4FF]/70 font-medium">AI-Generated Site</span>
          </div>
          <div className="flex gap-1.5">
            <div className="h-1 flex-1 rounded-full bg-[#6E44FF]/30" />
            <div className="h-1 flex-1 rounded-full bg-white/10" />
            <div className="h-1 flex-1 rounded-full bg-[#00FFB2]/20" />
          </div>
        </div>
        {/* Scanning line */}
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/60 to-transparent"
          animate={{ top: ["8px", "128px", "8px"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      {/* Stand */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-white/10 rounded-full blur-[1px]" />
    </div>
  );
}

/* ── Chat bubble animation for lead nurturing ── */
function ChatBubbles() {
  const bubbles = [
    { text: "Is this available? 🤔", side: "left",  delay: 0 },
    { text: "Yes! Checking your profile...", side: "right", delay: 0.4 },
    { text: "You qualify for our premium plan!", side: "right", delay: 0.8 },
    { text: "Book a demo → ", side: "right", delay: 1.2 },
  ];
  return (
    <div className="space-y-2 px-4 py-4">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: b.side === "left" ? -12 : 12, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: b.delay + 0.2, duration: 0.35, ease: "backOut" }}
          className={`flex ${b.side === "right" ? "justify-end" : ""}`}
        >
          <div
            className="text-[10px] px-3 py-1.5 rounded-xl max-w-[80%] text-white/80"
            style={{
              background: b.side === "left"
                ? "rgba(37,211,102,0.15)"
                : "rgba(0,212,255,0.12)",
              border: `1px solid ${b.side === "left" ? "rgba(37,211,102,0.3)" : "rgba(0,212,255,0.2)"}`,
            }}
          >
            {b.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Bar chart for SEO ── */
function BarChart() {
  const bars = [35, 48, 42, 62, 55, 74, 68, 88, 80, 95];
  return (
    <div className="flex items-end gap-1.5 px-5 pt-4 pb-1 h-24">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-sm"
          style={{
            background: `linear-gradient(180deg, ${i >= 7 ? "#00FFB2" : "#00D4FF"}, ${i >= 7 ? "#00D4FF" : "#6E44FF"})`,
            opacity: 0.8,
          }}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 + 0.2, duration: 0.6, ease: "backOut" }}
        />
      ))}
    </div>
  );
}

/* ── Single bento card ── */
function BentoCard({
  service,
  featured = false,
  visual,
  index,
}: {
  service: Service;
  featured?: boolean;
  visual?: React.ReactNode;
  index: number;
}) {
  const Icon = iconMap[service.icon] ?? Bot;
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={`relative bento-glow group bg-[#0D1224] rounded-2xl overflow-hidden flex flex-col ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      style={{
        border: "1px solid rgba(26,35,64,0.9)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${service.color}12 0%, transparent 60%)`,
        }}
      />

      <div className={`p-6 flex flex-col h-full ${featured ? "min-h-[300px]" : "min-h-[180px]"}`}>
        {/* Icon row */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
            style={{
              backgroundColor: `${service.color}18`,
              border: `1px solid ${service.color}35`,
              boxShadow: `0 0 16px ${service.color}18`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: service.color }} />
          </div>
          {featured && (
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: `${service.color}15`,
                color: service.color,
                border: `1px solid ${service.color}30`,
              }}
            >
              Most Popular
            </span>
          )}
        </div>

        <h3 className={`font-heading font-semibold text-white mb-2 ${featured ? "text-xl" : "text-base"}`}>
          {service.title}
        </h3>

        {featured && (
          <>
            <p className="text-[#B7C0D1] text-sm leading-relaxed mb-4 flex-none">
              {service.description}
            </p>
            <ul className="space-y-1.5 mb-4">
              {service.features.slice(0, 3).map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-[#B7C0D1]">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: service.color }} />
                  {f}
                </li>
              ))}
            </ul>
            {visual && <div className="flex-1 min-h-0">{visual}</div>}
            <div className="mt-4">
              <div
                className="text-xs font-bold px-3 py-1.5 rounded-full inline-block"
                style={{ backgroundColor: `${service.color}20`, color: service.color }}
              >
                Sites deployed in 24 hours
              </div>
            </div>
          </>
        )}

        {!featured && (
          <>
            <p className="text-[#B7C0D1] text-xs leading-relaxed flex-1">
              {service.description.slice(0, 80)}...
            </p>
            {visual && <div className="mt-2">{visual}</div>}
          </>
        )}

        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all duration-200"
          style={{ color: service.color }}
        >
          Get Started
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}

interface ServicesSectionProps {
  limit?: number;
  showCTA?: boolean;
}

export default function ServicesSection({ limit, showCTA = true }: ServicesSectionProps) {
  const displayed = limit ? services.slice(0, limit) : services;

  return (
    <section className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="orb w-96 h-96 bg-[#6E44FF]/10 top-1/3 right-0 translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Badge className="mb-4 bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/20">
            Our Services
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            AI Solutions That{" "}
            <span className="gradient-text-animated">Drive Results</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            From AI websites to autonomous agents — intelligent systems built for your business, live in days.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[260px_240px] gap-4">
          {/* Featured: AI Website Dev */}
          <BentoCard
            service={displayed[0]}
            featured
            visual={<LaptopMockup />}
            index={0}
          />

          {/* Medium: Lead Nurturing */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.07 }}
              whileHover={{ scale: 1.02 }}
              className="relative bento-glow group bg-[#0D1224] rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(26,35,64,0.9)" }}
            >
              <div className="p-4 h-full flex flex-col">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: "#6E44FF18", border: "1px solid #6E44FF35" }}
                >
                  <MessageSquare className="w-4 h-4 text-[#6E44FF]" />
                </div>
                <p className="font-heading font-semibold text-white text-sm mb-1">{displayed[1]?.title}</p>
                <div className="flex-1 mt-2">
                  <ChatBubbles />
                </div>
              </div>
            </motion.div>

            {/* SEO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.14 }}
              whileHover={{ scale: 1.02 }}
              className="relative bento-glow group bg-[#0D1224] rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(26,35,64,0.9)" }}
            >
              <div className="p-4 h-full flex flex-col">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: "#00FFB218", border: "1px solid #00FFB235" }}
                >
                  <TrendingUp className="w-4 h-4 text-[#00FFB2]" />
                </div>
                <p className="font-heading font-semibold text-white text-sm mb-1">{displayed[2]?.title}</p>
                <div className="flex-1 flex items-end">
                  <BarChart />
                </div>
              </div>
            </motion.div>

            {/* Row 2: 2 small cards */}
            {displayed.slice(3, 5).map((service, i) => {
              const Icon = iconMap[service.icon] ?? Bot;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i + 3) * 0.07 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative bento-glow group bg-[#0D1224] rounded-2xl p-4"
                  style={{ border: "1px solid rgba(26,35,64,0.9)" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${service.color}18`, border: `1px solid ${service.color}35` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: service.color }} />
                  </div>
                  <p className="font-heading font-semibold text-white text-sm mb-1">{service.title}</p>
                  <p className="text-[#B7C0D1] text-xs leading-relaxed line-clamp-2">{service.description.slice(0, 70)}...</p>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom row: remaining services */}
          {displayed.slice(5).map((service, i) => (
            <BentoCard key={service.id} service={service} index={i + 5} />
          ))}
        </div>

        {/* CTA */}
        {showCTA && limit && services.length > limit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity"
              style={{ boxShadow: "0 0 30px rgba(0,212,255,0.3)" }}
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
