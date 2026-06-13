"use client";

import { useState, useEffect, ReactNode } from "react";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });
const CinematicIntro = dynamic(() => import("../cinematic/CinematicIntro"), { ssr: false });

export default function SiteShell({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      {mounted && <CustomCursor />}
      {mounted && !done && (
        <CinematicIntro onComplete={() => setDone(true)} />
      )}
      <div
        style={{
          opacity: done ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: done ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
