"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "right";
}

export const Reveal = ({ children, width = "fit-content", delay = 0.25, direction = "up" }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-75px" }); // Dispara quando o elemento entra na tela
  const [allowOverflow, setAllowOverflow] = useState(false);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: allowOverflow ? "visible" : "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: direction === "up" ? 75 : 0, x: direction === "right" ? 100 : 0 },
          visible: { opacity: 1, y: 0, x: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }} // Curva "Editorial" mais suave
        onAnimationComplete={(definition) => {
          if (definition === "visible") setAllowOverflow(true);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};