"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const NeuralNetworkScene = dynamic(
  () => import("@/components/3d/NeuralNetworkScene"),
  { ssr: false, loading: () => <div className="w-full h-full bg-transparent" /> }
);

export default function NeuralNetworkSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="orb w-[600px] h-[400px] bg-[#6E44FF]/7 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-[#6E44FF]/10 text-[#6E44FF] border-[#6E44FF]/20">
            AI Architecture
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            One Brain.{" "}
            <span className="gradient-text-animated">Infinite Agents.</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            Every node is a live AI agent processing data in real-time. Watch as intelligent decisions cascade through your entire business — automatically.
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative w-full h-[440px] sm:h-[540px] rounded-3xl overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(110,68,255,0.07) 0%, rgba(5,8,22,0.95) 65%)",
            border: "1px solid rgba(255,255,255,0.04)",
            boxShadow: "0 0 80px rgba(110,68,255,0.06), inset 0 0 60px rgba(0,0,0,0.4)",
          }}
        >
          <NeuralNetworkScene />

          {/* Labels */}
          <div className="absolute top-5 left-5 flex flex-col gap-2">
            {[
              { color: "#00D4FF", label: "Input Layer" },
              { color: "#6E44FF", label: "Processing" },
              { color: "#00FFB2", label: "Action Layer" },
              { color: "#00D4FF", label: "Output" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 glass rounded-full px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] text-[#B7C0D1]">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Edge fades */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#050816] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
        </motion.div>

        {/* Stats below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6"
        >
          {[
            { val: "14+",   label: "Agent Types" },
            { val: "500+",  label: "Tool Integrations" },
            { val: "50+",   label: "Languages" },
            { val: "99.9%", label: "Uptime" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-xl p-4 text-center border border-white/[0.04]">
              <div className="font-heading font-bold text-2xl gradient-text-primary">{s.val}</div>
              <div className="text-[#B7C0D1] text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
