"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between"
        style={{ backdropFilter: "blur(12px)", background: "rgba(10,15,30,0.75)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <Link href="/" className="font-black text-lg tracking-[0.18em] text-white hover:text-[#00D4FF] transition-colors" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
          NEXORA
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm transition-colors tracking-wide" style={{ fontFamily: "var(--font-space-grotesk), sans-serif", color: "#94A3B8" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden md:inline-flex text-xs px-5 py-2.5 transition-all duration-200 tracking-widest"
            style={{ fontFamily: "var(--font-jetbrains-mono), monospace", border: "1px solid rgba(0,212,255,0.35)", color: "#00D4FF" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,212,255,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            BOOK CALL
          </Link>
          <button className="md:hidden p-1 flex flex-col gap-1.5" onClick={() => setOpen(true)} aria-label="Open menu">
            <span className="block w-6 h-px bg-white" />
            <span className="block w-4 h-px bg-white" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col px-8 py-8"
            style={{ background: "#0A0F1E" }}
          >
            <div className="flex items-center justify-between mb-16">
              <span className="font-black text-lg tracking-[0.18em] text-white" style={{ fontFamily: "var(--font-syne), sans-serif" }}>NEXORA</span>
              <button onClick={() => setOpen(false)} className="text-[#94A3B8] hover:text-white text-2xl leading-none">✕</button>
            </div>
            <nav className="flex flex-col gap-6">
              {[...navLinks, { label: "Contact", href: "#contact" }].map((l, i) => (
                <motion.div key={l.href} initial={{ x: -24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05, duration: 0.4 }}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-3xl font-bold text-white/70 hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <p className="text-[#94A3B8] text-sm">{siteConfig.email}</p>
              <p className="text-[#94A3B8] text-sm mt-1">+91 {siteConfig.phone}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
