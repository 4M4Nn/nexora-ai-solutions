import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import AgentWorksSection from "@/components/sections/AgentWorksSection";
import ServicesSection from "@/components/sections/ServicesSection";
import NeuralNetworkSection from "@/components/sections/NeuralNetworkSection";
import StatementSection from "@/components/sections/StatementSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import MetricsSection from "@/components/sections/MetricsSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Nexora AI Solutions — AI Employees for Modern Businesses | Kochi, Kerala",
  description:
    "Nexora AI Solutions deploys custom AI agents, AI websites, WhatsApp automation, SEO AI, and enterprise-grade AI systems. Kerala's #1 AI automation company.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AgentWorksSection />
      <ServicesSection />
      <NeuralNetworkSection />
      <StatementSection />
      <HowItWorksSection />
      <IndustriesSection />
      <MetricsSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
