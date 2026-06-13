import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import ServicesSection from "@/components/sections/ServicesSection";
import NeuralNetworkSection from "@/components/sections/NeuralNetworkSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import WhyNexoraSection from "@/components/sections/WhyNexoraSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";

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
      <Ticker />
      <ServicesSection limit={7} showCTA />
      <NeuralNetworkSection />
      <HowItWorksSection />
      <IndustriesSection />
      <WhyNexoraSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
