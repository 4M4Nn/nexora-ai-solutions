"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const isHoveringRef = useRef(false);

  const dotX = useSpring(cursorX, { stiffness: 800, damping: 40 });
  const dotY = useSpring(cursorY, { stiffness: 800, damping: 40 });
  const ringX = useSpring(cursorX, { stiffness: 120, damping: 20 });
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const h = !!t.closest("a, button, [data-cursor]");
      if (h !== isHoveringRef.current) {
        isHoveringRef.current = h;
        setHovering(h);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] rounded-full bg-white pointer-events-none"
        style={{ x: dotX, y: dotY, width: 6, height: 6, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[9998] rounded-full pointer-events-none border border-white/50"
        animate={{
          width: hovering ? 60 : 44,
          height: hovering ? 60 : 44,
          backgroundColor: hovering ? "rgba(255,255,255,0.07)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
