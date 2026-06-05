"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/5 via-transparent to-[#6E44FF]/10" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>
      <div className="orb w-96 h-96 bg-[#00D4FF]/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-[#00D4FF]/20">
            <div className="w-2 h-2 bg-[#00FFB2] rounded-full animate-pulse" />
            <span className="text-[#B7C0D1] text-sm">Limited Slots Available — Book Now</span>
          </div>

          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white mb-6 leading-tight">
            Ready to Deploy Your{" "}
            <span className="gradient-text-primary">First AI Employee?</span>
          </h2>

          <p className="text-[#B7C0D1] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Join the businesses across Kerala and India that are saving costs, scaling faster, and serving customers better with Nexora AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <button className="group flex items-center gap-2 bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white font-semibold px-8 py-4 rounded-xl text-base shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_50px_rgba(0,212,255,0.6)] hover:opacity-90 transition-all duration-300">
                Get Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <a
              href="https://wa.me/918891129111?text=Hi%20Nexora%20AI%2C%20I%27d%20like%20to%20discuss%20an%20AI%20solution%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-[#25D366]/40 bg-[#25D366]/5 text-[#25D366] hover:bg-[#25D366]/10 font-semibold px-8 py-4 rounded-xl text-base transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us Now
            </a>
          </div>

          <p className="text-[#B7C0D1] text-sm mt-6">
            No credit card required &bull; Free 30-min discovery call &bull; Results guaranteed
          </p>
        </motion.div>
      </div>
    </section>
  );
}
