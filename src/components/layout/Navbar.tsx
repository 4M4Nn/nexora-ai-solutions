"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg tracking-widest text-white" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
          NEXORA
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden md:inline-flex text-xs text-white border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-all duration-200 tracking-wider"
          >
            Book Consultation
          </Link>

          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-px bg-white" />
            <span className="block w-4 h-px bg-white" />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col px-8 py-8"
          >
            {/* Close */}
            <div className="flex items-center justify-between mb-16">
              <span className="font-bold text-lg tracking-widest" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                NEXORA
              </span>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white text-2xl leading-none">
                ✕
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-4xl font-bold text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.4 }}
              >
                <Link
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="text-4xl font-bold text-white/80 hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  Contact
                </Link>
              </motion.div>
            </nav>

            <div className="mt-auto pt-12 border-t border-white/10">
              <p className="text-white/30 text-sm">{siteConfig.email}</p>
              <p className="text-white/30 text-sm mt-1">+91 {siteConfig.phone}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
