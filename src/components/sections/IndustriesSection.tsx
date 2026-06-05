"use client";

import { motion } from "framer-motion";
import {
  Heart, BookOpen, Building2, Scissors, UtensilsCrossed,
  HardHat, TrendingUp, Car, ShoppingCart, Plane,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { industries } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Heart, BookOpen, Building2, Scissors, UtensilsCrossed,
  HardHat, TrendingUp, Car, ShoppingCart, Plane,
};

const colors = [
  "#00D4FF", "#6E44FF", "#00FFB2", "#00D4FF", "#6E44FF",
  "#00FFB2", "#00D4FF", "#6E44FF", "#00FFB2", "#00D4FF",
];

export default function IndustriesSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="orb w-80 h-80 bg-[#00D4FF]/8 top-0 left-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[#6E44FF]/10 text-[#6E44FF] border-[#6E44FF]/20">
            Industries We Serve
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            AI for Every{" "}
            <span className="gradient-text-accent">Industry</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            We deploy AI solutions tailored to the unique workflows and customer journeys of each sector.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((industry, index) => {
            const Icon = iconMap[industry.icon] ?? TrendingUp;
            const color = colors[index % colors.length];
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative bg-[#0D1224] border border-[#1A2340] hover:border-opacity-60 rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                style={{
                  borderColor: `rgba(26,35,64,0.8)`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${color}15`, border: `1px solid ${color}25` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3 className="font-heading font-semibold text-sm text-white mb-2">
                  {industry.name}
                </h3>
                <p className="text-[#B7C0D1] text-xs leading-relaxed line-clamp-2">
                  {industry.description}
                </p>

                {/* Hover solutions tooltip */}
                <div className="absolute inset-x-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 px-2">
                  <div className="glass rounded-lg p-3 text-left">
                    <p className="text-xs font-semibold text-white mb-1.5">Solutions:</p>
                    {industry.solutions.map((sol) => (
                      <p key={sol} className="text-xs text-[#B7C0D1] flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: color }} />
                        {sol}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${color}08, transparent 70%)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
