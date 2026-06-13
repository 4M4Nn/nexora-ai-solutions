"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const NeuralNetworkScene = dynamic(
  () => import("@/components/3d/NeuralNetworkScene"),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

const agentLabels = [
  { color: "#00D4FF", text: "Input Signals" },
  { color: "#6E44FF", text: "AI Processing" },
  { color: "#00FFB2", text: "Business Actions" },
  { color: "#00D4FF", text: "Measurable Output" },
];

export default function NeuralNetworkSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-[#00D4FF]/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <Badge className="mb-4 bg-[#6E44FF]/10 text-[#6E44FF] border-[#6E44FF]/20">
            Live AI Network
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Your Business Running on{" "}
            <span className="gradient-text-animated">Intelligent Agents</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            Every node is an AI agent working in real-time. Data flows between agents, decisions are made, and results cascade across your business — automatically.
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full h-[420px] sm:h-[520px] lg:h-[600px] rounded-3xl overflow-hidden border border-white/5"
          style={{
            background: "radial-gradient(ellipse at center, rgba(110,68,255,0.06) 0%, rgba(5,8,22,0.95) 70%)",
            boxShadow: "0 0 80px rgba(0,212,255,0.06), 0 0 160px rgba(110,68,255,0.04)",
          }}
        >
          <NeuralNetworkScene />

          {/* Legend overlay */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-4">
            {agentLabels.map((item) => (
              <div key={item.text} className="flex items-center gap-1.5 glass rounded-full px-3 py-1.5">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-[#B7C0D1]">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Edge fade */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050816] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
        </motion.div>

        {/* Stats below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {[
            { num: "14", suffix: "+", label: "AI Agent Types" },
            { num: "500", suffix: "+", label: "Tool Integrations" },
            { num: "50", suffix: "+", label: "Languages Supported" },
            { num: "99.9", suffix: "%", label: "Agent Uptime" },
          ].map((item) => (
            <div
              key={item.label}
              className="glass rounded-2xl p-5 text-center border border-white/5"
            >
              <div className="font-heading font-bold text-2xl sm:text-3xl gradient-text-primary">
                {item.num}
                <span className="text-xl">{item.suffix}</span>
              </div>
              <div className="text-[#B7C0D1] text-sm mt-1">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
