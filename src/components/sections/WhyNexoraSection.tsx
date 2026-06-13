"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  TrendingDown, Clock, Zap, Timer, Infinity, MapPin, Shield, Target, Cpu, Rocket, Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { metrics, whyNexoraPoints } from "@/lib/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metricIconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  TrendingDown, Clock, Zap, Timer, Infinity,
};

const pointIconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  MapPin, Shield, Target, Cpu, Rocket, Users,
};

function parseMetric(value: string): { num: number | null; prefix: string; suffix: string } {
  if (value === "∞" || value === "24/7") return { num: null, prefix: "", suffix: value };
  const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { num: null, prefix: "", suffix: value };
  return { num: parseFloat(match[2]), prefix: match[1], suffix: match[3] };
}

export default function WhyNexoraSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      metrics.forEach((metric, i) => {
        const el = counterRefs.current[i];
        if (!el) return;
        const { num, prefix, suffix } = parseMetric(metric.value);
        if (num === null) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: num,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          onUpdate() {
            if (!el) return;
            const v = num < 10 ? obj.val.toFixed(1) : Math.round(obj.val).toString();
            el.textContent = prefix + v + suffix;
          },
          onComplete() {
            if (el) el.textContent = metric.value;
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const colors = ["#00D4FF", "#6E44FF", "#00FFB2", "#00D4FF", "#6E44FF"];
  const pointColors = ["#00D4FF", "#6E44FF", "#00FFB2"];

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
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
            <span className="gradient-text-animated">Speak for Themselves</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            Measurable impact across every business we touch.
          </p>
        </motion.div>

        {/* Metrics with GSAP counter */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
          {metrics.map((metric, index) => {
            const Icon = metricIconMap[metric.icon] ?? Zap;
            const color = colors[index % colors.length];
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group glass rounded-2xl p-5 text-center transition-all duration-300 cursor-default"
                style={{
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: `0 0 30px ${color}25, 0 20px 40px rgba(0,0,0,0.3)`,
                  borderColor: `${color}40`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div
                  className="font-heading font-bold text-3xl sm:text-4xl mb-1 tabular-nums"
                  style={{ color }}
                >
                  <span
                    ref={(el) => { counterRefs.current[index] = el; }}
                  >
                    {metric.value}
                  </span>
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
            const color = pointColors[index % pointColors.length];
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-[#0D1224] rounded-2xl p-6 flex gap-4 transition-all duration-300"
                style={{ border: "1px solid rgba(26,35,64,0.8)" }}
                whileHover={{
                  y: -4,
                  borderColor: `${color}35`,
                  boxShadow: `0 0 25px ${color}15, 0 20px 50px rgba(0,0,0,0.3)`,
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${color}15`,
                    border: `1px solid ${color}30`,
                    boxShadow: `0 0 15px ${color}15`,
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
