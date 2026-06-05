import Link from "next/link";
import { Zap, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { navLinks, contactInfo, siteConfig } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  const serviceLinks = [
    { label: "AI Website Development", href: "/services" },
    { label: "AI Lead Nurturing", href: "/services" },
    { label: "SEO Automation", href: "/services" },
    { label: "Custom AI Agents", href: "/services" },
    { label: "AI Sales Agent", href: "/services" },
    { label: "AI Customer Support", href: "/services" },
  ];

  return (
    <footer className="relative bg-[#050816] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#6E44FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-[#00D4FF] to-[#6E44FF] rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">
                <span className="text-white">Nexora</span>
                <span className="text-[#00D4FF]"> AI</span>
              </span>
            </Link>
            <p className="text-[#B7C0D1] text-sm leading-relaxed mb-6">
              {siteConfig.tagline}. Building the AI-powered future for businesses across Kerala and India.
            </p>
            <a
              href={`https://wa.me/91${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#B7C0D1] hover:text-[#00D4FF] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {navLinks.slice(3).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#B7C0D1] hover:text-[#00D4FF] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:+91${contactInfo.phone}`}
                  className="flex items-start gap-3 text-[#B7C0D1] hover:text-[#00D4FF] text-sm transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[#00D4FF]" />
                  +91 {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-start gap-3 text-[#B7C0D1] hover:text-[#00D4FF] text-sm transition-colors duration-200 break-all"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[#00D4FF]" />
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-[#B7C0D1] text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#00D4FF]" />
                  <span>
                    {contactInfo.address},<br />
                    {contactInfo.city}, {contactInfo.state} {contactInfo.pincode}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#B7C0D1] text-sm">
            &copy; {year} Nexora AI Solutions. All rights reserved.
          </p>
          <p className="text-[#B7C0D1] text-sm">
            Kochi, Kerala, India &mdash; Building AI for Every Business
          </p>
        </div>
      </div>
    </footer>
  );
}
