"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ParticleBackground from "./ParticleBackground";

const LoadingScreen = dynamic(() => import("./LoadingScreen"), { ssr: false });
const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Custom cursor — desktop only */}
      {mounted && <CustomCursor />}

      {/* Global particle canvas */}
      <ParticleBackground />

      {/* Loading screen */}
      {mounted && !loaded && (
        <LoadingScreen onComplete={() => setLoaded(true)} />
      )}

      {/* Site content */}
      <div style={{ visibility: loaded ? "visible" : "hidden" }}>
        {children}
      </div>
    </>
  );
}
