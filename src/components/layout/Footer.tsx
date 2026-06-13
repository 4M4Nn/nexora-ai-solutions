import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle, Globe, Share2, Camera } from "lucide-react";
import { navLinks, contactInfo, siteConfig, services, industries } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050816] overflow-hidden">
      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#00D4FF]/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6E44FF]/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="font-heading font-bold text-2xl">
                <span className="text-white">NEXORA</span>
                <span
                  className="inline-block w-2 h-2 rounded-full bg-[#00D4FF] ml-0.5 mb-1"
                  style={{ boxShadow: "0 0 8px #00D4FF" }}
                />
              </span>
            </Link>
            <p className="text-[#B7C0D1] text-sm leading-relaxed mb-5 max-w-[240px]">
              {siteConfig.tagline}. Building AI-powered futures for businesses across India.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mb-5">
              {[
                { icon: Globe,   href: "#", label: "Website" },
                { icon: Share2,  href: "#", label: "Social" },
                { icon: Camera,  href: "#", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center text-[#B7C0D1] hover:text-[#00D4FF] hover:border-[#00D4FF]/30 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <a
              href={`https://wa.me/91${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-sm font-medium px-4 py-2.5 rounded-lg transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h3 className="font-heading font-semibold text-white text-xs uppercase tracking-[0.15em] mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href="/services"
                    className="text-[#B7C0D1] hover:text-[#00D4FF] text-sm transition-colors duration-200"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Industries */}
          <div>
            <h3 className="font-heading font-semibold text-white text-xs uppercase tracking-[0.15em] mb-5">
              Industries
            </h3>
            <ul className="space-y-3">
              {industries.slice(0, 8).map((ind) => (
                <li key={ind.id}>
                  <Link
                    href="/industries"
                    className="text-[#B7C0D1] hover:text-[#00D4FF] text-sm transition-colors duration-200"
                  >
                    {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="font-heading font-semibold text-white text-xs uppercase tracking-[0.15em] mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:+91${contactInfo.phone}`}
                  className="flex items-start gap-3 text-[#B7C0D1] hover:text-white text-sm transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[#00D4FF]" />
                  +91 {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-start gap-3 text-[#B7C0D1] hover:text-white text-sm transition-colors duration-200 break-all"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[#00D4FF]" />
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-[#B7C0D1] text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#00D4FF]" />
                <span>
                  {contactInfo.address},<br />
                  {contactInfo.city}, {contactInfo.state} {contactInfo.pincode}
                </span>
              </li>
            </ul>

            {/* Quick nav */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {navLinks.slice(4).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[#B7C0D1] hover:text-[#00D4FF] text-xs transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#B7C0D1] text-xs">
            &copy; {year} Nexora AI Solutions. All rights reserved.
          </p>
          <p className="text-[#B7C0D1] text-xs">
            Built by{" "}
            <span className="text-[#00D4FF] font-medium">Loopgen Technologies</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
