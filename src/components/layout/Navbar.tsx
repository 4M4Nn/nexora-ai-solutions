"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

const NAV_ITEMS = navLinks.slice(0, 7);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
          scrolled
            ? "bg-[#050816]/85 backdrop-blur-2xl border-b border-white/[0.05] py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-0.5">
              <span className="font-heading font-bold text-xl tracking-tight">
                <span className="text-white group-hover:text-[#00D4FF] transition-colors duration-200">
                  NEXORA
                </span>
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[#00D4FF] ml-0.5 mb-2 group-hover:scale-150 transition-transform duration-200"
                  style={{ boxShadow: "0 0 6px #00D4FF" }}
                />
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors duration-200 group",
                      active ? "text-[#00D4FF]" : "text-[#B7C0D1] hover:text-white"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute bottom-1 left-4 right-4 h-px bg-[#00D4FF] transition-transform duration-200 origin-left",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#00D4FF] border border-[#00D4FF]/40 hover:bg-[#00D4FF]/10 hover:border-[#00D4FF]/80 transition-all duration-200"
                style={{ boxShadow: "0 0 15px rgba(0,212,255,0.1)" }}
              >
                Book Consultation
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-[#B7C0D1] hover:text-white transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-[#050816] flex flex-col"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-5">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <span className="font-heading font-bold text-xl">
                  <span className="text-white">NEXORA</span>
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full bg-[#00D4FF] ml-0.5 mb-2"
                    style={{ boxShadow: "0 0 6px #00D4FF" }}
                  />
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[#B7C0D1] hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ delay: i * 0.04 + 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block py-3 text-2xl font-heading font-semibold transition-colors duration-200 border-b border-white/5",
                      pathname === link.href
                        ? "text-[#00D4FF]"
                        : "text-[#B7C0D1] hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="px-8 pb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white font-semibold text-lg">
                    Book Free Consultation
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
