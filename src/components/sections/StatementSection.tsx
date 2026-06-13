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
      gsap.fromTo(words,
        { opacity: 0.08 },
        {
          opacity: 1,
          stagger: { each: 0.08, ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "center 30%",
            scrub: 1.2,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center bg-black px-6 py-28">
      <div className="max-w-5xl w-full">
        {LINES.map((line, li) => (
          <p
            key={li}
            className="font-bold leading-tight mb-3 md:mb-4"
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontSize: "clamp(28px, 5vw, 72px)",
              ...(li >= 3 ? { color: "#00D4FF" } : {}),
            }}
          >
            {line.split(" ").map((word, wi) => (
              <span key={wi} className="stmt-w inline-block mr-[0.22em] opacity-[0.08]">
                {word}
              </span>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}
