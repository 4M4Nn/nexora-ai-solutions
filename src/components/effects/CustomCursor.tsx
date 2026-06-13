"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX = useSpring(cursorX, { stiffness: 700, damping: 40 });
  const dotY = useSpring(cursorY, { stiffness: 700, damping: 40 });
  const ringX = useSpring(cursorX, { stiffness: 130, damping: 22 });
  const ringY = useSpring(cursorY, { stiffness: 130, damping: 22 });

  const isHovering = useRef(false);

  useEffect(() => {
    setMounted(true);

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hoverable = t.closest("a, button, [data-cursor]");
      if (hoverable && !isHovering.current) {
        isHovering.current = true;
        setHovering(true);
      } else if (!hoverable && isHovering.current) {
        isHovering.current = false;
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] rounded-full bg-white pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] rounded-full pointer-events-none border border-white/60"
        animate={{
          width: hovering ? 60 : 40,
          height: hovering ? 60 : 40,
          backgroundColor: hovering
            ? "rgba(255,255,255,0.08)"
            : "transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
