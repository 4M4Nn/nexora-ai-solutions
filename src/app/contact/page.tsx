import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Nexora AI — Book Your Free AI Consultation | Kochi, Kerala",
  description:
    "Contact Nexora AI Solutions to schedule a free 30-minute discovery call. Phone: 8891129111. Email: nexoraaisolution@gmail.com. Jogeo Building, Kochi, Kerala.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-24 pb-2 bg-[#050816]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#00D4FF] text-sm font-semibold uppercase tracking-widest mb-3">
            Get In Touch
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Start Your AI{" "}
            <span className="gradient-text-primary">Transformation</span>
          </h1>
          <p className="text-[#B7C0D1] text-lg max-w-2xl mx-auto">
            Book a free 30-minute discovery call. We&apos;ll understand your business, identify automation opportunities, and propose the right AI solution — no commitment required.
          </p>
        </div>
      </div>
      <ContactSection />
    </>
  );
}
