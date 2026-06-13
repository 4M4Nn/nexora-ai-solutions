"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { contactInfo, services } from "@/lib/data";

const SERVICE_OPTIONS = services.map((s) => s.title);

type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", service: "", message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  const inputClass =
    "w-full bg-[#0D1224] border border-[#1A2340] rounded-xl px-4 py-3 text-white placeholder-[#B7C0D1]/50 text-sm focus:outline-none focus:border-[#00D4FF]/50 focus:ring-1 focus:ring-[#00D4FF]/20 transition-all duration-200";

  return (
    <section className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="orb w-96 h-96 bg-[#00D4FF]/6 top-0 left-0 -translate-x-1/3 -translate-y-1/3" />
      <div className="orb w-72 h-72 bg-[#6E44FF]/8 bottom-0 right-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge className="mb-4 bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/20">
            Contact Us
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Let&apos;s Build Your{" "}
            <span className="gradient-text-animated">AI Future</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-xl mx-auto">
            Free 30-minute discovery call. No commitment. Just real answers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact details card */}
            <div className="glass rounded-2xl p-7" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="font-heading font-semibold text-white text-lg mb-6">Get in Touch</h3>
              <div className="space-y-5">
                {[
                  { icon: Phone, label: "Phone", value: `+91 ${contactInfo.phone}`, href: `tel:+91${contactInfo.phone}` },
                  { icon: Mail,  label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
                  { icon: MapPin, label: "Office", value: `${contactInfo.address}, ${contactInfo.city}, ${contactInfo.state} ${contactInfo.pincode}`, href: undefined },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#00D4FF]" />
                    </div>
                    <div>
                      <p className="text-[#B7C0D1] text-xs uppercase tracking-wider mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-white text-sm hover:text-[#00D4FF] transition-colors break-all">
                          {value}
                        </a>
                      ) : (
                        <p className="text-white text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/91${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/40 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 border border-[#25D366]/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <div>
                <p className="font-semibold text-[#25D366] text-sm">Chat on WhatsApp</p>
                <p className="text-[#B7C0D1] text-xs">Quick reply within minutes</p>
              </div>
            </a>

            {/* Google Maps */}
            <div className="rounded-2xl overflow-hidden border border-white/5">
              <iframe
                src="https://maps.google.com/maps?q=Chembumukki+Kochi+Kerala+682030&output=embed"
                width="100%"
                height="220"
                style={{ border: 0, filter: "invert(85%) hue-rotate(180deg)" }}
                loading="lazy"
                title="Nexora AI Office Location"
              />
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div
              className="glass rounded-2xl p-8"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {status === "success" ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#00FFB2]/15 border border-[#00FFB2]/30 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-8 h-8 text-[#00FFB2]" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white mb-2">Message Sent!</h3>
                  <p className="text-[#B7C0D1]">
                    We&apos;ll get back to you within 24 hours. Check WhatsApp for faster responses.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#B7C0D1] mb-1.5">Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Rajesh Kumar"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#B7C0D1] mb-1.5">Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={set("email")}
                        placeholder="rajesh@company.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#B7C0D1] mb-1.5">Phone</label>
                      <input
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="+91 98765 43210"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#B7C0D1] mb-1.5">Company</label>
                      <input
                        value={form.company}
                        onChange={set("company")}
                        placeholder="Acme Pvt Ltd"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#B7C0D1] mb-1.5">Service Interest</label>
                    <select
                      value={form.service}
                      onChange={set("service")}
                      className={inputClass}
                      style={{ WebkitAppearance: "none" }}
                    >
                      <option value="">Select a service...</option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-[#B7C0D1] mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us about your business and what you'd like to automate..."
                      className={inputClass}
                      style={{ resize: "none" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white font-semibold transition-all duration-300 disabled:opacity-60"
                    style={{ boxShadow: "0 0 30px rgba(0,212,255,0.3)" }}
                  >
                    {status === "loading" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
