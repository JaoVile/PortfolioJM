"use client";

import React from "react";
import { motion } from "framer-motion";

interface TechBranchProps {
  theme: "light" | "dark";
}

export const TechBranch: React.FC<TechBranchProps> = ({ theme }) => {
  const isDark = theme === "dark";
  const strokeColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
  const hoverColor = isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"; // Brilho mais visível

  return (
    <motion.div
      className="hidden md:block w-1/3 h-1 mb-4 relative overflow-hidden" // Increased height to 1 for visibility, can be adjusted
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 100 1" // Adjusted viewBox to fit a line
        preserveAspectRatio="none" // To allow stretching
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
        initial={{ stroke: strokeColor }}
        whileHover={{ stroke: hoverColor, filter: "drop-shadow(0 0 4px " + hoverColor + ")" }} // Glow effect
        transition={{ duration: 0.3 }}
      >
        {/* Simple representation of a tech branch/wires */}
        <line x1="0" y1="0.5" x2="100" y2="0.5" strokeWidth="0.1" /> {/* Main line */}
        <line x1="20" y1="0.5" x2="25" y2="0.2" strokeWidth="0.1" /> {/* Small branching wires */}
        <line x1="20" y1="0.5" x2="25" y2="0.8" strokeWidth="0.1" />
        <line x1="40" y1="0.5" x2="45" y2="0.3" strokeWidth="0.1" />
        <line x1="60" y1="0.5" x2="65" y2="0.7" strokeWidth="0.1" />
        <line x1="80" y1="0.5" x2="85" y2="0.4" strokeWidth="0.1" />
      </motion.svg>
    </motion.div>
  );
};
