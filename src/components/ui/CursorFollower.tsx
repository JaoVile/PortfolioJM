"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export const CursorFollower = () => {
  const [isVisible, setIsVisible] = useState(false);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX);
    mouse.y.set(clientY);
  };

  useEffect(() => {
    // Verifica se o dispositivo é touch para não exibir o efeito no mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
      setIsVisible(true);
      window.addEventListener("mousemove", manageMouseMove);
      return () => {
        window.removeEventListener("mousemove", manageMouseMove);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
      }}
      className="fixed top-0 left-0 w-64 h-64 bg-cyan-300/50 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 blur-3xl z-0 opacity-50"
    />
  );
};