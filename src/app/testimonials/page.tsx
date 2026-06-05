import type { Metadata } from "next";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Client Testimonials — What Business Leaders Say About Nexora AI",
  description:
    "Read reviews from real Nexora AI clients: real estate firms, healthcare clinics, restaurants, and e-commerce businesses that transformed their operations with AI automation.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <div className="pt-24 pb-2 bg-[#050816]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#6E44FF] text-sm font-semibold uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Our Clients Love{" "}
            <span className="gradient-text-primary">Their AI</span>
          </h1>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            Don&apos;t take our word for it — hear directly from the business owners and executives who deployed AI with Nexora and never looked back.
          </p>
        </div>
      </div>
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
