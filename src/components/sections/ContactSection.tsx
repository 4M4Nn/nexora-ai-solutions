"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/lib/data";

interface FormState { name: string; email: string; phone: string; service: string; message: string; }
const INITIAL: FormState = { name: "", email: "", phone: "", service: "", message: "" };
const SERVICES = ["AI Website Development","AI Lead Nurturing","SEO Automation","Custom AI Agents","AI Sales Agent","AI Recruitment Agent","Customer Support AI","Not sure yet"];

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

  const inputClass = "w-full border text-white text-sm px-4 py-3.5 placeholder-white/20 focus:outline-none transition-colors duration-200";
  const inputStyle = { backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.12)", fontFamily: "var(--font-dm-sans), sans-serif" };
  const inputFocusStyle = { borderColor: "rgba(0,212,255,0.4)" };

  return (
    <section
      ref={ref}
      id="contact"
      className="py-28 px-6 md:px-10"
      style={{ background: "#111827" }}
    >
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="section-label mb-5"
            >
              / 12 &nbsp;·&nbsp; Contact Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-black text-white leading-none mb-8"
              style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "clamp(36px, 4.5vw, 64px)" }}
            >
              Let&apos;s build
              <br />
              something great.
            </motion.h2>

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} className="space-y-5 mb-12">
              {[
                { icon: "M", href: `mailto:${siteConfig.email}`, label: siteConfig.email },
                { icon: "P", href: `tel:${siteConfig.phoneRaw}`, label: siteConfig.phone },
              ].map((item) => (
                <a key={item.href} href={item.href} className="flex items-center gap-4 transition-colors duration-200 group" style={{ color: "#94A3B8" }}>
                  <div className="w-10 h-10 border flex items-center justify-center transition-colors duration-200" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                    <span className="section-label">{item.icon}</span>
                  </div>
                  <span className="text-sm group-hover:text-[#CBD5E1] transition-colors">{item.label}</span>
                </a>
              ))}
              <div className="flex items-start gap-4" style={{ color: "#94A3B8" }}>
                <div className="w-10 h-10 border flex items-center justify-center shrink-0" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                  <span className="section-label">A</span>
                </div>
                <span className="text-sm leading-relaxed">
                  {siteConfig.address.building}<br />
                  {siteConfig.address.area}, {siteConfig.address.city}<br />
                  {siteConfig.address.state} — {siteConfig.address.pincode}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-full h-[200px] overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.3!2d76.27!3d9.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zChembumukki%2C+Kochi!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="200"
                style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(75%)" }}
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
                <h3 className="font-bold text-white text-2xl mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Message received.</h3>
                <p className="text-[#94A3B8] text-sm">We&apos;ll get back to you within 24 hours.</p>
                <button onClick={() => setStatus("idle")} className="mt-8 section-label hover:text-[#CBD5E1] transition-colors">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input type="text" placeholder="Your name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} className={inputClass} style={inputStyle} />
                    {errors.name && <p className="text-red-400/70 text-xs mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <input type="email" placeholder="Email address" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className={inputClass} style={inputStyle} />
                    {errors.email && <p className="text-red-400/70 text-xs mt-1.5">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className={inputClass} style={inputStyle} />
                  <div className="relative">
                    <select value={form.service} onChange={(e) => handleChange("service", e.target.value)} className={inputClass + " appearance-none cursor-pointer"} style={{ ...inputStyle, color: form.service ? "#CBD5E1" : "rgba(255,255,255,0.2)" }}>
                      <option value="" disabled>Service interested in</option>
                      {SERVICES.map((s) => <option key={s} value={s} style={{ backgroundColor: "#111827", color: "#CBD5E1" }}>{s}</option>)}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <textarea placeholder="Tell us about your business and what you need..." value={form.message} onChange={(e) => handleChange("message", e.target.value)} rows={5} className={inputClass + " resize-none"} style={inputStyle} />
                  {errors.message && <p className="text-red-400/70 text-xs mt-1.5">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 text-sm font-bold text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.01]"
                  style={{ background: "linear-gradient(135deg, #00D4FF, #00FFB2)", fontFamily: "var(--font-syne), sans-serif" }}
                >
                  {status === "sending" ? (<><div className="w-4 h-4 border border-black/30 border-t-black rounded-full animate-spin" />Sending...</>) : "Send Message"}
                </button>
                <p className="text-center text-[#94A3B8] text-xs">
                  Or WhatsApp us at{" "}
                  <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-[#00D4FF]/60 hover:text-[#00D4FF] transition-colors">
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
