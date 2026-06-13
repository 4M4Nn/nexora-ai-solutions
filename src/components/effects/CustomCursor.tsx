"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const dotX = useSpring(cursorX, { stiffness: 600, damping: 40 });
  const dotY = useSpring(cursorY, { stiffness: 600, damping: 40 });
  const ringX = useSpring(cursorX, { stiffness: 120, damping: 22 });
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 22 });

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const enter = () => {
      if (ringRef.current) {
        ringRef.current.style.transform += " scale(1.8)";
        ringRef.current.style.borderColor = "rgba(0,212,255,0.8)";
      }
    };
    const leave = () => {
      if (ringRef.current) {
        ringRef.current.style.borderColor = "rgba(255,255,255,0.25)";
      }
    };

    window.addEventListener("mousemove", move);

    const hoverEls = document.querySelectorAll("a, button, [data-hover]");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Small dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{ x: dotX, y: dotY }}
      >
        <div
          className="w-2 h-2 rounded-full bg-[#00D4FF]"
          style={{
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 6px #00D4FF",
          }}
        />
      </motion.div>

      {/* Large ring */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99997] transition-all duration-150"
        style={{ x: ringX, y: ringY }}
      >
        <div
          className="w-9 h-9 rounded-full border border-white/25"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </motion.div>
    </>
  );
}
