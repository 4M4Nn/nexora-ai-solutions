"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = "NEXORA".split("");

  useEffect(() => {
    const prog = { value: 0 };
    const tl = gsap.timeline();

    tl.fromTo(
      ".nexora-letter",
      { opacity: 0, y: 30, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.09,
        duration: 0.5,
        ease: "back.out(1.7)",
      }
    )
      .fromTo(
        ".loading-tagline",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.2"
      )
      .to(
        prog,
        {
          value: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => setProgress(Math.round(prog.value)),
        },
        "-=0.4"
      )
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.45,
        ease: "power2.inOut",
        delay: 0.1,
        onComplete: onComplete,
      });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#050816] flex flex-col items-center justify-center"
      style={{ perspective: "800px" }}
    >
      {/* Top radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00D4FF]/6 rounded-full blur-[100px] pointer-events-none" />

      {/* Letters */}
      <div className="flex gap-1 sm:gap-2 mb-3">
        {letters.map((l, i) => (
          <span
            key={i}
            className="nexora-letter inline-block font-heading font-bold text-5xl sm:text-7xl tracking-widest gradient-text-primary opacity-0"
            style={{ transformOrigin: "50% 50%" }}
          >
            {l}
          </span>
        ))}
      </div>

      <p className="loading-tagline text-[#B7C0D1] text-sm tracking-[0.25em] uppercase mb-10 opacity-0">
        AI Solutions
      </p>

      {/* Progress bar */}
      <div className="w-48 h-px bg-white/10 relative overflow-hidden rounded-full">
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-none"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #00D4FF, #6E44FF)",
            boxShadow: "0 0 8px rgba(0,212,255,0.6)",
          }}
        />
      </div>
    </div>
  );
}
