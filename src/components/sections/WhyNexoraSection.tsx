"use client";

import { motion } from "framer-motion";
import {
  TrendingDown, Clock, Zap, Timer, Infinity, MapPin, Shield, Target, Cpu, Rocket, Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { metrics, whyNexoraPoints } from "@/lib/data";

const metricIconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  TrendingDown, Clock, Zap, Timer, Infinity,
};

const pointIconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  MapPin, Shield, Target, Cpu, Rocket, Users,
};

export default function WhyNexoraSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="orb w-96 h-96 bg-[#6E44FF]/12 top-0 right-0 translate-x-1/3 -translate-y-1/3" />
      <div className="orb w-64 h-64 bg-[#00D4FF]/8 bottom-0 left-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[#00FFB2]/10 text-[#00FFB2] border-[#00FFB2]/20">
            Why Nexora
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            The Numbers{" "}
            <span className="gradient-text-accent">Speak for Themselves</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            Measurable impact across every business we touch.
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
          {metrics.map((metric, index) => {
            const Icon = metricIconMap[metric.icon] ?? Zap;
            const colors = ["#00D4FF", "#6E44FF", "#00FFB2", "#00D4FF", "#6E44FF"];
            const color = colors[index % colors.length];
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group glass rounded-2xl p-5 text-center hover:shadow-glow-primary transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div
                  className="font-heading font-bold text-3xl sm:text-4xl mb-1"
                  style={{ color }}
                >
                  {metric.value}
                </div>
                <div className="font-semibold text-white text-sm mb-2">{metric.label}</div>
                <p className="text-[#B7C0D1] text-xs leading-relaxed hidden sm:block">
                  {metric.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Why points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyNexoraPoints.map((point, index) => {
            const Icon = pointIconMap[point.icon] ?? Zap;
            const colors = ["#00D4FF", "#6E44FF", "#00FFB2"];
            const color = colors[index % colors.length];
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="card-hover bg-[#0D1224] rounded-2xl p-6 flex gap-4"
              >
                <div
                  className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-white mb-1.5">{point.title}</h3>
                  <p className="text-[#B7C0D1] text-sm leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
