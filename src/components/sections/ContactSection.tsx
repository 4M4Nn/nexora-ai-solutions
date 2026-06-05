"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { contactInfo } from "@/lib/data";

interface FormState {
  name: string;
  email: string;
  phone: string;
  business: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    business: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!form.message.trim()) newErrors.message = "Please describe your requirement";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section className="relative py-20 lg:py-28 bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="orb w-96 h-96 bg-[#00D4FF]/10 top-0 left-0 -translate-x-1/2 -translate-y-1/3" />
      <div className="orb w-80 h-80 bg-[#6E44FF]/12 bottom-0 right-0 translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/20">
            Contact Us
          </Badge>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Let&apos;s Build Your{" "}
            <span className="gradient-text-primary">AI System</span>
          </h2>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            Schedule a free 30-minute discovery call. We&apos;ll analyze your business and show you exactly how AI can transform it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-5 mb-8">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: `+91 ${contactInfo.phone}`,
                  href: `tel:+91${contactInfo.phone}`,
                  color: "#00D4FF",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: contactInfo.email,
                  href: `mailto:${contactInfo.email}`,
                  color: "#6E44FF",
                },
                {
                  icon: MapPin,
                  label: "Office",
                  value: `${contactInfo.address}, ${contactInfo.city}, ${contactInfo.state} ${contactInfo.pincode}`,
                  href: "https://maps.google.com/?q=Chembumukki+Kochi+Kerala",
                  color: "#00FFB2",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "Office" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 glass rounded-xl p-4 hover:border-[#00D4FF]/20 transition-all duration-200 group"
                >
                  <div
                    className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}30` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-[#B7C0D1] uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-white text-sm font-medium">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/91${contactInfo.whatsapp}?text=Hi%20Nexora%20AI%2C%20I%27d%20like%20to%20discuss%20an%20AI%20solution%20for%20my%20business.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366]/10 hover:bg-[#25D366]/15 border border-[#25D366]/30 hover:border-[#25D366]/50 rounded-xl p-4 transition-all duration-200 group mb-8"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">Chat on WhatsApp</p>
                <p className="text-[#B7C0D1] text-sm">Get instant response — usually within minutes</p>
              </div>
            </a>

            {/* Google Map embed */}
            <div className="rounded-2xl overflow-hidden border border-white/5 h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.1234567890!2d76.2673!3d9.9312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b086d47b89e4689%3A0x2e94dc46be04a92e!2sChembumukku%2C%20Kochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) saturate(0.8)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nexora AI Solutions Office Location"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-[#00FFB2]/15 border border-[#00FFB2]/30 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 text-[#00FFB2]" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-white mb-3">
                  Message Received!
                </h3>
                <p className="text-[#B7C0D1] text-sm leading-relaxed max-w-sm">
                  Thank you for reaching out. Our team will review your requirements and get back to you within 2 business hours.
                </p>
                <p className="text-[#00D4FF] text-sm mt-4 font-medium">
                  Check your WhatsApp — we may reach out there too!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-7 sm:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#B7C0D1] uppercase tracking-wider mb-1.5 block">
                      Your Name *
                    </label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Rajesh Menon"
                      className="bg-[#050816] border-[#1A2340] text-white placeholder:text-[#B7C0D1]/40 focus:border-[#00D4FF]/50 rounded-lg h-11"
                    />
                    {errors.name && (
                      <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs text-[#B7C0D1] uppercase tracking-wider mb-1.5 block">
                      Business Name
                    </label>
                    <Input
                      name="business"
                      value={form.business}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="bg-[#050816] border-[#1A2340] text-white placeholder:text-[#B7C0D1]/40 focus:border-[#00D4FF]/50 rounded-lg h-11"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#B7C0D1] uppercase tracking-wider mb-1.5 block">
                    Email Address *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="bg-[#050816] border-[#1A2340] text-white placeholder:text-[#B7C0D1]/40 focus:border-[#00D4FF]/50 rounded-lg h-11"
                  />
                  {errors.email && (
                    <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-[#B7C0D1] uppercase tracking-wider mb-1.5 block">
                    Phone Number *
                  </label>
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="8891129111"
                    className="bg-[#050816] border-[#1A2340] text-white placeholder:text-[#B7C0D1]/40 focus:border-[#00D4FF]/50 rounded-lg h-11"
                  />
                  {errors.phone && (
                    <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-[#B7C0D1] uppercase tracking-wider mb-1.5 block">
                    Tell Us About Your Requirement *
                  </label>
                  <Textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your business and what you'd like to automate with AI..."
                    rows={4}
                    className="bg-[#050816] border-[#1A2340] text-white placeholder:text-[#B7C0D1]/40 focus:border-[#00D4FF]/50 rounded-lg resize-none"
                  />
                  {errors.message && (
                    <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white font-semibold py-3.5 rounded-xl h-auto text-base shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] hover:opacity-90 transition-all duration-300 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </Button>

                <p className="text-[#B7C0D1] text-xs text-center">
                  Free consultation &bull; No commitment required &bull; Response within 2 hours
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
