"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LINE1 = "Your competitors are already using AI.";
const LINE2 = "Are you still doing it manually?";

function splitWords(text: string) {
  return text.split(" ");
}

export default function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLSpanElement>(".stmt-word");

      gsap.fromTo(
        words,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: { each: 0.1, ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "center 40%",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center bg-black px-6 py-32"
    >
      <div className="max-w-5xl w-full text-center">
        <p
          className="font-bold leading-tight mb-6"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "clamp(32px, 5.5vw, 80px)",
          }}
        >
          {splitWords(LINE1).map((word, i) => (
            <span key={i} className="stmt-word inline-block mr-[0.22em] opacity-10">
              {word}
            </span>
          ))}
        </p>

        <p
          className="font-bold leading-tight"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "clamp(32px, 5.5vw, 80px)",
          }}
        >
          {splitWords(LINE2).map((word, i) => (
            <span key={i} className="stmt-word inline-block mr-[0.22em] opacity-10">
              {word}
            </span>
          ))}
        </p>

        <p className="mt-14 text-xs text-[#00D4FF] tracking-[0.25em] uppercase">
          The Cost of Waiting Is Real
        </p>
      </div>
    </section>
  );
}
