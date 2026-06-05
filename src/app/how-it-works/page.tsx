import type { Metadata } from "next";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "How It Works — Our 5-Step AI Deployment Process",
  description:
    "Learn how Nexora AI builds and deploys your custom AI system in 5 steps: Discovery, AI Architecture, Development, Deployment, and Optimization.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <div className="pt-24 pb-2 bg-[#050816]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#00FFB2] text-sm font-semibold uppercase tracking-widest mb-3">
            Our Process
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            From Idea to Live AI{" "}
            <span className="gradient-text-primary">in 5 Steps</span>
          </h1>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            A proven process that takes your business requirement and transforms it into a production-ready AI system — fast, transparent, and results-driven.
          </p>
        </div>
      </div>
      <HowItWorksSection />
      <CTASection />
    </>
  );
}
