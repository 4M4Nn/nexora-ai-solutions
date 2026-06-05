import type { Metadata } from "next";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "FAQ — Common Questions About AI Automation & Nexora AI Services",
  description:
    "Answers to frequently asked questions about AI agents, deployment timelines, data security, integrations, pricing, and how Nexora AI builds custom solutions for businesses.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return (
    <>
      <div className="pt-24 pb-2 bg-[#050816]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#00D4FF] text-sm font-semibold uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Frequently Asked{" "}
            <span className="gradient-text-primary">Questions</span>
          </h1>
          <p className="text-[#B7C0D1] text-lg max-w-xl mx-auto">
            Everything you need to know about AI automation, our services, and how we work — answered clearly.
          </p>
        </div>
      </div>
      <FAQSection />
      <CTASection />
    </>
  );
}
