import type { Metadata } from "next";
import WhyNexoraSection from "@/components/sections/WhyNexoraSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Why Nexora — 80% Cost Reduction, 24/7 AI Operations & 3x Productivity",
  description:
    "Discover why businesses choose Nexora AI: 80% cost reduction, 24/7 operations, 3x productivity boost, 5x faster responses, and unlimited scalability — backed by real data.",
  alternates: { canonical: "/why-nexora" },
};

export default function WhyNexoraPage() {
  return (
    <>
      <div className="pt-24 pb-2 bg-[#050816]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#00FFB2] text-sm font-semibold uppercase tracking-widest mb-3">
            Why Choose Us
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            The Nexora{" "}
            <span className="gradient-text-accent">Advantage</span>
          </h1>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            We don&apos;t just promise results — we deliver measurable outcomes. Here&apos;s why leading businesses across India choose Nexora AI as their technology partner.
          </p>
        </div>
      </div>
      <WhyNexoraSection />
      <CTASection />
    </>
  );
}
