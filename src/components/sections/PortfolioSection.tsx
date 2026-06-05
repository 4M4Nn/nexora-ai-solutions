"use client";

import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { portfolioItems } from "@/lib/data";

const tagColors: Record<string, string> = {
  "WhatsApp AI": "#25D366",
  "Lead Nurturing": "#00D4FF",
  "Real Estate": "#6E44FF",
  "Healthcare AI": "#00FFB2",
  "Appointment Booking": "#00D4FF",
  "Patient Support": "#6E44FF",
  "Restaurant AI": "#00D4FF",
  "Reservation Bot": "#6E44FF",
  "Customer Engagement": "#00FFB2",
  "E-commerce AI": "#00D4FF",
  "Cart Recovery": "#6E44FF",
  "Product Recommendations": "#00FFB2",
};

export default function PortfolioSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="orb w-80 h-80 bg-[#00D4FF]/8 top-1/3 right-0 translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/20">
            Case Studies
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Real Results for{" "}
            <span className="gradient-text-primary">Real Businesses</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            See how we&apos;ve helped businesses across Kerala and India transform their operations with AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-hover bg-[#0D1224] rounded-2xl p-6 sm:p-7 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-heading font-semibold text-xl text-white mb-1">
                    {item.client}
                  </h3>
                  <span className="text-[#00D4FF] text-sm font-medium">{item.industry}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#00D4FF]" />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `${tagColors[tag] ?? "#6E44FF"}15`,
                      color: tagColors[tag] ?? "#6E44FF",
                      border: `1px solid ${tagColors[tag] ?? "#6E44FF"}30`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Challenge & Solution */}
              <div className="space-y-4 mb-5 flex-1">
                <div>
                  <p className="text-xs font-semibold text-[#B7C0D1] uppercase tracking-wider mb-1.5">
                    Challenge
                  </p>
                  <p className="text-[#B7C0D1] text-sm leading-relaxed">{item.challenge}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#00D4FF] uppercase tracking-wider mb-1.5">
                    Solution
                  </p>
                  <p className="text-[#B7C0D1] text-sm leading-relaxed">{item.solution}</p>
                </div>
              </div>

              {/* Results */}
              <div className="border-t border-white/5 pt-5">
                <p className="text-xs font-semibold text-[#00FFB2] uppercase tracking-wider mb-3">
                  Results
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.results.map((result) => (
                    <li key={result} className="flex items-start gap-2 text-xs text-[#B7C0D1]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00FFB2] shrink-0 mt-0.5" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
