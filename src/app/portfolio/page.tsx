import type { Metadata } from "next";
import PortfolioSection from "@/components/sections/PortfolioSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Portfolio — AI Case Studies & Real Business Results",
  description:
    "See real case studies from Nexora AI: real estate lead automation, healthcare patient support, restaurant reservation AI, and e-commerce cart recovery — with measurable results.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <div className="pt-24 pb-2 bg-[#050816]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#00D4FF] text-sm font-semibold uppercase tracking-widest mb-3">
            Case Studies
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Proof in the{" "}
            <span className="gradient-text-primary">Numbers</span>
          </h1>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            Real businesses, real AI transformations, real measurable results. Explore how we&apos;ve helped companies across Kerala and India achieve extraordinary outcomes.
          </p>
        </div>
      </div>
      <PortfolioSection />
      <CTASection />
    </>
  );
}
