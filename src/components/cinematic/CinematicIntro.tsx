"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { cinematicLines } from "@/lib/data";

const CinematicScene = dynamic(() => import("./CinematicScene"), { ssr: false });

const LINE_TIMINGS = [3000, 4300, 5200, 6000, 6800, 7600, 8300];

interface Props {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: Props) {
  const [visibleNodes, setVisibleNodes] = useState(0);
  const [activeLine, setActiveLine] = useState("");
  const [chars, setChars] = useState(0);
  const [exploding, setExploding] = useState(false);
  const [flashWhite, setFlashWhite] = useState(false);
  const cameraTargetZRef = useRef(18);
  const containerRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete,
    });
  }, [onComplete]);

  const skip = useCallback(() => {
    gsap.killTweensOf(cameraTargetZRef);
    finish();
  }, [finish]);

  /* Camera push-in */
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(cameraTargetZRef, { current: 5, duration: 2.8, ease: "power2.inOut" }, 0.5);
    tl.to(cameraTargetZRef, { current: 22, duration: 1.8, ease: "power3.in" }, 8.2);
    tl.call(() => { setExploding(true); setFlashWhite(true); }, [], 8.8);
    tl.call(finish, [], 9.6);
    return () => { tl.kill(); };
  }, [finish]);

  /* Nodes appear */
  useEffect(() => {
    const timers = [800, 1100, 1400, 1700, 2000, 2300].map((delay, i) =>
      setTimeout(() => setVisibleNodes(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  /* Text lines */
  useEffect(() => {
    const timers = LINE_TIMINGS.map((delay, i) =>
      setTimeout(() => setActiveLine(cinematicLines[i]), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  /* Typewriter */
  useEffect(() => {
    if (!activeLine) return;
    setChars(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setChars(i);
      if (i >= activeLine.length) clearInterval(iv);
    }, 38);
    return () => clearInterval(iv);
  }, [activeLine]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9990] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* 3D canvas */}
      <div className="absolute inset-0">
        <CinematicScene
          visibleNodes={visibleNodes}
          cameraTargetZRef={cameraTargetZRef}
          exploding={exploding}
        />
      </div>

      {/* White flash */}
      <AnimatePresence>
        {flashWhite && (
          <motion.div
            className="absolute inset-0 bg-white z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, times: [0, 0.3, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <AnimatePresence mode="wait">
          {activeLine && (
            <motion.p
              key={activeLine}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="text-center text-white"
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: "clamp(24px, 4vw, 52px)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                textShadow: "0 0 40px rgba(0,212,255,0.4)",
              }}
            >
              {activeLine.slice(0, chars)}
              <span className="opacity-50 animate-pulse">|</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Agent label — top center */}
      {visibleNodes > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
        >
          <p className="text-xs text-[#00D4FF] tracking-[0.3em] uppercase">
            NOVA — AI Agent Core
          </p>
        </motion.div>
      )}

      {/* Skip */}
      <button
        onClick={skip}
        className="absolute bottom-8 right-8 z-30 text-xs text-white/30 hover:text-white/70 tracking-[0.2em] uppercase transition-colors"
      >
        SKIP INTRO →
      </button>

      {/* Phase indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {[1, 2, 3].map((p, i) => (
          <div
            key={i}
            className="h-px transition-all duration-500"
            style={{
              width: visibleNodes === 0 ? (i === 0 ? 24 : 12) : visibleNodes < 6 ? (i <= 1 ? 24 : 12) : 24,
              backgroundColor:
                visibleNodes === 0 && i === 0
                  ? "rgba(0,212,255,0.8)"
                  : visibleNodes >= 6 && i <= 2
                  ? "rgba(0,212,255,0.8)"
                  : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
