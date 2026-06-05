import type { Metadata } from "next";
import ServicesSection from "@/components/sections/ServicesSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "AI Services — Website Development, AI Agents, Lead Nurturing & More",
  description:
    "Explore all 7 AI services from Nexora: AI website development, WhatsApp lead nurturing, SEO automation, custom AI agents, AI sales agents, recruitment AI, and customer support AI.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <div className="pt-24 pb-2 bg-[#050816]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#00D4FF] text-sm font-semibold uppercase tracking-widest mb-3">
            Our Services
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Every AI Solution Your{" "}
            <span className="gradient-text-primary">Business Needs</span>
          </h1>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            From AI-generated websites deployed in 24 hours to enterprise-grade custom agents — we build the AI workforce your business deserves.
          </p>
        </div>
      </div>
      <ServicesSection showCTA={false} />
      <CTASection />
    </>
  );
}
