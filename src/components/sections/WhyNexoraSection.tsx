"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  TrendingDown, Clock, Zap, Timer, Infinity,
  MapPin, Shield, Target, Cpu, Rocket, Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { metrics, whyNexoraPoints } from "@/lib/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const METRIC_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  TrendingDown, Clock, Zap, Timer, Infinity,
};
const POINT_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  MapPin, Shield, Target, Cpu, Rocket, Users,
};

function parse(value: string): { num: number | null; suffix: string } {
  if (value === "∞" || value === "24/7") return { num: null, suffix: value };
  const m = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { num: null, suffix: value };
  return { num: parseFloat(m[1]), suffix: m[2] };
}

const COLORS = ["#00D4FF", "#6E44FF", "#00FFB2", "#00D4FF", "#6E44FF"];
const POINT_COLORS = ["#00D4FF", "#6E44FF", "#00FFB2"];

export default function WhyNexoraSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      metrics.forEach((metric, i) => {
        const el = counterRefs.current[i];
        if (!el) return;
        const { num, suffix } = parse(metric.value);
        if (num === null) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: num,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
          onUpdate() {
            if (!el) return;
            const v = num < 10 ? obj.val.toFixed(1) : Math.round(obj.val).toString();
            el.textContent = v + suffix;
          },
          onComplete() {
            if (el) el.textContent = metric.value;
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="orb w-96 h-96 bg-[#6E44FF]/10 top-0 right-0 translate-x-1/3 -translate-y-1/3" />
      <div className="orb w-64 h-64 bg-[#00D4FF]/7 bottom-0 left-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[#00FFB2]/10 text-[#00FFB2] border-[#00FFB2]/20">
            Why Nexora
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            The Numbers{" "}
            <span className="gradient-text-animated">Speak for Themselves</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            Measurable impact across every business we touch.
          </p>
        </motion.div>

        {/* Giant metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 mb-20">
          {metrics.map((metric, i) => {
            const Icon = METRIC_ICONS[metric.icon] ?? Zap;
            const color = COLORS[i];
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative group text-center px-4 py-8"
              >
                {/* Separator */}
                {i > 0 && (
                  <div className="absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />
                )}

                <div
                  className="w-11 h-11 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>

                {/* Big number */}
                <div
                  className="font-heading font-bold text-4xl sm:text-5xl mb-1 tabular-nums"
                  style={{ color }}
                >
                  <span ref={(el) => { counterRefs.current[i] = el; }}>
                    {metric.value}
                  </span>
                </div>

                <div className="font-semibold text-white text-sm mb-2">{metric.label}</div>
                <p className="text-[#B7C0D1] text-xs leading-relaxed max-w-[160px] mx-auto hidden sm:block">
                  {metric.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Why points grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyNexoraPoints.map((point, i) => {
            const Icon = POINT_ICONS[point.icon] ?? Zap;
            const color = POINT_COLORS[i % POINT_COLORS.length];
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group bg-[#0D1224] rounded-2xl p-6 flex gap-4"
                style={{ border: "1px solid rgba(26,35,64,0.9)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundColor: `${color}15`,
                    border: `1px solid ${color}30`,
                    boxShadow: `0 0 14px ${color}14`,
                  }}
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
