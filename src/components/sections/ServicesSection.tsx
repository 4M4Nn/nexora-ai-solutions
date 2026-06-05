"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe, MessageSquare, TrendingUp, Bot, Zap, Users, Headphones,
  ArrowRight, CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Globe,
  MessageSquare,
  TrendingUp,
  Bot,
  Zap,
  Users,
  HeadphonesIcon: Headphones,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface ServicesSectionProps {
  limit?: number;
  showCTA?: boolean;
}

export default function ServicesSection({ limit, showCTA = true }: ServicesSectionProps) {
  const displayed = limit ? services.slice(0, limit) : services;

  return (
    <section className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="orb w-96 h-96 bg-[#6E44FF]/10 top-1/2 right-0 translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/20 hover:bg-[#00D4FF]/15">
            Our Services
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            AI Solutions That{" "}
            <span className="gradient-text-primary">Drive Results</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            From AI websites to autonomous agents — we build intelligent systems that work for your business around the clock.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayed.map((service) => {
            const Icon = iconMap[service.icon] ?? Bot;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="card-hover group relative bg-[#0D1224] rounded-2xl p-6 flex flex-col"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}15`, border: `1px solid ${service.color}30` }}
                >
                  <Icon className="w-6 h-6" style={{ color: service.color }} />
                </div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-xl text-white mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[#B7C0D1] text-sm leading-relaxed mb-5 flex-1">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-5">
                  {service.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[#B7C0D1]">
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: service.color }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn more */}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
                  style={{ color: service.color }}
                >
                  Get Started
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top left, ${service.color}08 0%, transparent 60%)`,
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        {showCTA && limit && services.length > limit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity"
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
