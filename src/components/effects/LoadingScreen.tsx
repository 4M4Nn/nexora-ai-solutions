"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  onComplete: () => void;
}

const LETTERS = "NEXORA".split("");

export default function LoadingScreen({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const obj = { val: 0 };

      tl.to(
        obj,
        {
          val: 100,
          duration: 2.2,
          ease: "power1.inOut",
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = `${Math.round(obj.val)}%`;
            }
          },
        },
        0
      );

      tl.to(
        progressRef.current,
        { scaleX: 1, duration: 2.2, ease: "power1.inOut" },
        0
      );

      tl.from(
        ".loader-letter",
        { y: 32, opacity: 0, stagger: 0.07, duration: 0.5, ease: "power3.out" },
        0.5
      );

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.15,
        onComplete,
      });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
    >
      <div className="overflow-hidden mb-6">
        <div className="flex items-center gap-1">
          {LETTERS.map((l, i) => (
            <span
              key={i}
              className="loader-letter inline-block text-5xl font-bold tracking-[0.3em] text-white"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      <span
        ref={countRef}
        className="text-sm text-white/30 font-mono tracking-widest"
      >
        0%
      </span>

      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10">
        <div
          ref={progressRef}
          className="h-full bg-white"
          style={{ transformOrigin: "left", transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
