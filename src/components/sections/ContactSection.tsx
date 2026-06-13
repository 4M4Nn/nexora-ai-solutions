"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/lib/data";

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const INITIAL: FormState = { name: "", email: "", phone: "", service: "", message: "" };
const SERVICES = [
  "AI Website Development",
  "AI Lead Nurturing",
  "SEO Automation",
  "Custom AI Agents",
  "AI Sales Agent",
  "AI Recruitment Agent",
  "Customer Support AI",
  "Not sure yet",
];

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  function validate() {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    setForm(INITIAL);
  }

  const inputClass = "w-full bg-white/[0.04] border border-white/10 text-white text-sm px-4 py-3.5 placeholder-white/20 focus:outline-none focus:border-[#00D4FF]/40 transition-colors duration-200";

  return (
    <section ref={ref} id="contact" className="bg-black py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-xs text-white/30 tracking-[0.28em] uppercase mb-5"
            >
              Contact Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold text-white leading-none mb-8"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(36px, 4.5vw, 64px)" }}
            >
              Let&apos;s build
              <br />
              something great.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="space-y-5 mb-12"
            >
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-4 text-white/40 hover:text-white/70 transition-colors duration-200 group"
              >
                <div className="w-10 h-10 border border-white/10 group-hover:border-white/25 flex items-center justify-center transition-colors duration-200">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 3h14M1 3v10h14V3M1 3l7 6 7-6" stroke="#00D4FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm">{siteConfig.email}</span>
              </a>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center gap-4 text-white/40 hover:text-white/70 transition-colors duration-200 group"
              >
                <div className="w-10 h-10 border border-white/10 group-hover:border-white/25 flex items-center justify-center transition-colors duration-200">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M2 1h4l1.5 4-2 1.5a9 9 0 004 4L11 9l4 1.5V14a1 1 0 01-1 1C5 15 0 10 0 3a1 1 0 011-1h1z" fill="#00D4FF" opacity="0.8" />
                  </svg>
                </div>
                <span className="text-sm">{siteConfig.phone}</span>
              </a>
              <div className="flex items-start gap-4 text-white/40">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0">
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                    <path d="M7 0C4.2 0 2 2.2 2 5c0 4.5 5 11 5 11s5-6.5 5-11c0-2.8-2.2-5-5-5zm0 7.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#00D4FF" opacity="0.8" />
                  </svg>
                </div>
                <span className="text-sm leading-relaxed">
                  {siteConfig.address.building}<br />
                  {siteConfig.address.area}, {siteConfig.address.city}<br />
                  {siteConfig.address.state} — {siteConfig.address.pincode}
                </span>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-full h-[220px] border border-white/8 overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.3!2d76.27!3d9.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zChembumukki%2C+Kochi!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="220"
                style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(80%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nexora AI Solutions Location"
              />
            </motion.div>
          </div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <div className="w-14 h-14 rounded-full border border-[#00D4FF]/40 flex items-center justify-center mb-6">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 11l5 5 9-9" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-bold text-white text-2xl mb-3" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                  Message received.
                </h3>
                <p className="text-white/35 text-sm">We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-xs text-white/25 hover:text-white/50 transition-colors duration-200 tracking-widest uppercase"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={inputClass}
                    />
                    {errors.name && <p className="text-red-400/70 text-xs mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={inputClass}
                    />
                    {errors.email && <p className="text-red-400/70 text-xs mt-1.5">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={inputClass}
                  />
                  <div className="relative">
                    <select
                      value={form.service}
                      onChange={(e) => handleChange("service", e.target.value)}
                      className={inputClass + " appearance-none cursor-pointer"}
                      style={{ background: "rgba(255,255,255,0.04)", color: form.service ? "white" : "rgba(255,255,255,0.2)" }}
                    >
                      <option value="" disabled>Service interested in</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s} style={{ backgroundColor: "#0a0a0a", color: "white" }}>{s}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <textarea
                    placeholder="Tell us about your business and what you need..."
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    rows={5}
                    className={inputClass + " resize-none"}
                  />
                  {errors.message && <p className="text-red-400/70 text-xs mt-1.5">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 text-sm font-semibold text-black bg-[#00D4FF] hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-4 h-4 border border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>Send Message</>
                  )}
                </button>

                <p className="text-center text-white/15 text-xs">
                  Or WhatsApp us at{" "}
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00D4FF]/50 hover:text-[#00D4FF] transition-colors"
                  >
                    +91 {siteConfig.phone}
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
