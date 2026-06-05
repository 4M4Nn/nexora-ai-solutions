import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyNexoraSection from "@/components/sections/WhyNexoraSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Nexora AI Solutions — AI Employees for Modern Businesses | Kochi, Kerala",
  description:
    "Nexora AI Solutions deploys custom AI agents, AI websites, WhatsApp automation, SEO AI, and enterprise-grade AI systems for businesses in Kerala and India. Get your AI employee in 24 hours.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection limit={6} showCTA />
      <WhyNexoraSection />
      <HowItWorksSection />
      <IndustriesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
