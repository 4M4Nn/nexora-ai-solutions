"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LINES = [
  "Your competitors are already using AI.",
  "Every day you wait,",
  "they get further ahead.",
  "Nexora closes that gap.",
  "In days. Not months.",
];

export default function StatementSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLSpanElement>(".stmt-w");
      gsap.fromTo(
        words,
        { opacity: 0.07 },
        {
          opacity: 1,
          stagger: { each: 0.07, ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "bottom 40%",
            scrub: 1.5,
          },
        }
      );
    }, ref);
    return () => { ctx.revert(); };
  }, []);

  return (
    <section
      ref={ref}
      className="py-32 px-6 md:px-10"
      style={{ background: "radial-gradient(ellipse at center, #0F1628 0%, #0A0F1E 70%)" }}
    >
      <div className="section-divider mb-20" />
      <div className="max-w-5xl mx-auto">
        <p className="section-label mb-8">/ Statement</p>
        {LINES.map((line, li) => (
          <p
            key={li}
            className="font-black leading-tight mb-3 md:mb-4"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "clamp(30px, 5.5vw, 76px)",
              color: li >= 3 ? "#00D4FF" : "#ffffff",
              lineHeight: 1.0,
            }}
          >
            {line.split(" ").map((word, wi) => (
              <span key={wi} className="stmt-w inline-block mr-[0.22em] opacity-[0.07]">
                {word}
              </span>
            ))}
          </p>
        ))}
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
