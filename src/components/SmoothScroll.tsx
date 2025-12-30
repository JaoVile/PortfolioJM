"use client";
import { ReactNode, useEffect, useState } from "react";
import Lenis from "lenis";
import { LenisContext } from "@/context/LenisContext"; // Corrigido o caminho do import

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Basic check to disable on touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      // On touch devices, we might want native scrolling.
      // So, we don't initialize Lenis.
      return;
    }

    const newLenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    setLenis(newLenis);

    function raf(time: number) {
      newLenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      newLenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
