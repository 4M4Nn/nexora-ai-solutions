"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#050816]/90 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF] to-[#6E44FF] rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
              <Zap className="relative w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-lg">
              <span className="text-white">Nexora</span>
              <span className="text-[#00D4FF]"> AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 7).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm rounded-lg transition-all duration-200 font-medium",
                  pathname === link.href
                    ? "text-[#00D4FF] bg-[#00D4FF]/10"
                    : "text-[#B7C0D1] hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact">
              <Button
                className="relative overflow-hidden bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] hover:opacity-90 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-all duration-200 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
              >
                Get Free Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button
                className="p-2 text-[#B7C0D1] hover:text-white transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#0D1224] border-l border-white/5 w-80 p-0"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#00D4FF] to-[#6E44FF] rounded-lg">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-heading font-bold text-lg">
                      <span className="text-white">Nexora</span>
                      <span className="text-[#00D4FF]"> AI</span>
                    </span>
                  </Link>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 text-[#B7C0D1] hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center px-6 py-3.5 text-sm font-medium transition-all duration-200 border-l-2",
                        pathname === link.href
                          ? "text-[#00D4FF] bg-[#00D4FF]/5 border-[#00D4FF]"
                          : "text-[#B7C0D1] hover:text-white hover:bg-white/3 border-transparent"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="p-6 border-t border-white/5">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white font-semibold py-3 rounded-lg">
                      Get Free Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
