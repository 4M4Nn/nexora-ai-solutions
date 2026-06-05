import type { Metadata } from "next";
import IndustriesSection from "@/components/sections/IndustriesSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Industries We Serve — AI Solutions for Healthcare, Real Estate, Restaurants & More",
  description:
    "Nexora AI builds industry-specific AI agents for Healthcare, Education, Real Estate, Salons, Restaurants, Construction, Finance, Automotive, E-commerce, and Tourism businesses.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <div className="pt-24 pb-2 bg-[#050816]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#6E44FF] text-sm font-semibold uppercase tracking-widest mb-3">
            Industries
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            AI Built for Your{" "}
            <span className="gradient-text-accent">Industry</span>
          </h1>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            No generic solutions. We build AI systems that understand the unique workflows, customer journeys, and compliance requirements of your industry.
          </p>
        </div>
      </div>
      <IndustriesSection />
      <CTASection />
    </>
  );
}
