"use client";

import { useState } from "react";
import { siteConfig, services } from "@/lib/data";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full bg-transparent border-b border-white/15 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-white/50 transition-colors duration-200";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
  };

  return (
    <section id="contact" className="bg-black py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <p className="text-xs text-white/30 tracking-[0.25em] uppercase mb-6">
              Get In Touch
            </p>
            <h2
              className="font-bold text-white leading-none mb-14"
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: "clamp(44px, 6vw, 80px)",
              }}
            >
              {`Let's talk.`}
            </h2>

            <div className="space-y-6 mb-12">
              <div>
                <p className="text-white/25 text-xs tracking-widest uppercase mb-1">
                  Phone
                </p>
                <a
                  href={`tel:+91${siteConfig.phoneRaw}`}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  +91 {siteConfig.phone}
                </a>
              </div>
              <div>
                <p className="text-white/25 text-xs tracking-widest uppercase mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-white/70 hover:text-white text-sm transition-colors break-all"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <p className="text-white/25 text-xs tracking-widest uppercase mb-1">
                  Address
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  {siteConfig.address.building},
                  <br />
                  {siteConfig.address.area}, {siteConfig.address.city}{" "}
                  {siteConfig.address.pincode}
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-xs tracking-widest uppercase px-5 py-3 transition-all duration-200"
            >
              Open WhatsApp
            </a>

            {/* Map */}
            <div className="mt-12 overflow-hidden border border-white/10">
              <iframe
                src="https://maps.google.com/maps?q=Chembumukki+Kochi+Kerala+682030&output=embed"
                width="100%"
                height="240"
                style={{
                  border: 0,
                  filter: "invert(88%) hue-rotate(180deg) saturate(0.7)",
                }}
                loading="lazy"
                title="Nexora AI Office Location"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {status === "success" ? (
              <div className="h-full flex flex-col justify-center py-12">
                <p className="text-xs text-[#00D4FF] tracking-widest uppercase mb-4">
                  Message Sent
                </p>
                <p
                  className="font-bold text-white mb-4"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontSize: "clamp(28px, 3vw, 42px)",
                  }}
                >
                  {`We'll be in touch.`}
                </p>
                <p className="text-white/45 text-sm">
                  {`We'll respond within 24 hours. Check WhatsApp for faster replies.`}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs text-white/30 tracking-widest uppercase mb-3">
                      Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Rajesh Kumar"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/30 tracking-widest uppercase mb-3">
                      Email *
                    </label>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs text-white/30 tracking-widest uppercase mb-3">
                      Phone
                    </label>
                    <input
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/30 tracking-widest uppercase mb-3">
                      Company
                    </label>
                    <input
                      value={form.company}
                      onChange={set("company")}
                      placeholder="Acme Pvt Ltd"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/30 tracking-widest uppercase mb-3">
                    Service Interest
                  </label>
                  <select
                    value={form.service}
                    onChange={set("service")}
                    className={inputClass}
                    style={{ WebkitAppearance: "none", background: "transparent" }}
                  >
                    <option value="" style={{ background: "#000" }}>
                      Select a service
                    </option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title} style={{ background: "#000" }}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-white/30 tracking-widest uppercase mb-3">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell us about your business and what you want to automate..."
                    className={inputClass}
                    style={{ resize: "none" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-white text-black text-sm font-semibold tracking-wider hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
