import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import StatementSection from "@/components/sections/StatementSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BoldStatement from "@/components/sections/BoldStatement";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import MetricsSection from "@/components/sections/MetricsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title:
    "Nexora AI Solutions — AI Employees for Modern Businesses | Kochi, Kerala",
  description:
    "Nexora AI Solutions deploys custom AI agents, AI websites, WhatsApp automation, SEO AI, and enterprise-grade AI systems for businesses in Kerala and India. Get your AI employee in 24 hours.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatementSection />
      <ServicesSection />
      <BoldStatement />
      <HowItWorksSection />
      <IndustriesSection />
      <MetricsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
