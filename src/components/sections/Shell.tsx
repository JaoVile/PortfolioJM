"use client";

import React from "react";
import { motion } from "framer-motion";

export type Theme = "light" | "dark";

/**
 * A moldura de seção que o site já usava, extraída pra um lugar só.
 *
 * O padrão estava repetido à mão em cada seção: número gigante no fundo,
 * palavra em serifa translúcida, olho azul, título em serifa e o mesmo reveal
 * do framer. Repetir isso mais três vezes garantiria que as seções novas
 * fossem divergindo das antigas em detalhe — a curva do easing, a margem do
 * viewport, o tom do cinza. Uma moldura só mantém tudo idêntico.
 */

export const REVEAL = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  viewport: { once: true, margin: "-10%" },
};

/** Fundos alternados, na mesma escala que o site já usava. */
export const TONE = {
  a: { dark: "bg-[#111]", light: "bg-[#F5F5F5]" },
  b: { dark: "bg-[#0a0a0a]", light: "bg-[#E5E5E5]" },
  c: { dark: "bg-[#0e0e0e]", light: "bg-[#EDEDED]" },
} as const;

export function SectionShell({
  id,
  theme,
  tone = "a",
  index,
  ghost,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id: string;
  theme: Theme;
  tone?: keyof typeof TONE;
  /** O "02" gigante no canto. */
  index: string;
  /** A palavra em serifa atrás do título. */
  ghost: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const isDark = theme === "dark";
  return (
    <section
      id={id}
      className={`py-24 md:py-32 px-6 md:px-20 relative overflow-hidden transition-colors duration-700 ${
        isDark ? TONE[tone].dark : TONE[tone].light
      } ${className}`}
    >
      <span
        aria-hidden
        className={`absolute -left-4 md:-left-10 top-10 text-[20vw] font-bold leading-none select-none z-0 pointer-events-none transition-colors duration-700 ${
          isDark ? "text-[#1a1a1a]" : "text-black/5"
        }`}
      >
        {index}
      </span>

      <motion.div {...REVEAL} className="max-w-6xl mx-auto relative z-10">
        <h2
          aria-hidden
          className={`text-[12vw] md:text-[8vw] font-serif leading-none opacity-10 select-none absolute -top-24 md:-top-36 left-0 w-full text-center md:text-left pointer-events-none mix-blend-overlay transition-colors duration-700 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {ghost}
        </h2>

        <div className="relative pt-6 md:pt-10">
          <span className="block text-accent text-sm tracking-widest mb-4 font-bold">
            {eyebrow}
          </span>
          <h3 className="text-3xl md:text-5xl font-serif leading-tight mb-12 md:mb-16 max-w-3xl">
            {title}
          </h3>
          {children}
        </div>
      </motion.div>
    </section>
  );
}

/**
 * Um número com etiqueta. Ganha a barra de limiar só quando existe limiar de
 * verdade — contagem de commit não tem contra o que ser medida, e uma barra
 * ali seria instrumento decorativo numa página cujo argumento é que todo
 * número é real.
 */
export function Readout({
  label,
  value,
  unit,
  level,
  theme,
}: {
  label: string;
  value: string;
  unit?: string;
  level?: "ok" | "warn" | "crit";
  theme: Theme;
}) {
  const isDark = theme === "dark";
  const cor =
    level === "crit"
      ? "text-red-500"
      : level === "warn"
        ? "text-amber-500"
        : level === "ok"
          ? "text-emerald-500"
          : "text-accent";
  const largura = level === "crit" ? "92%" : level === "warn" ? "62%" : "34%";

  return (
    <div className="min-w-0">
      <div className={`border-t mb-3 ${isDark ? "border-white/10" : "border-black/10"}`} />
      <div className={`font-mono flex items-baseline gap-1.5 ${cor}`}>
        <span className="text-3xl md:text-4xl leading-none tabular-nums">{value}</span>
        {unit && <span className="text-xs opacity-60">{unit}</span>}
      </div>
      <div
        className={`mt-2.5 text-[10px] font-mono uppercase tracking-[0.16em] ${
          isDark ? "text-gray-500" : "text-gray-500"
        }`}
      >
        {label}
      </div>
      {level && (
        <div className={`mt-3 h-[3px] w-full ${isDark ? "bg-white/10" : "bg-black/10"}`}>
          <div className={`h-full ${cor.replace("text-", "bg-")}`} style={{ width: largura }} />
        </div>
      )}
    </div>
  );
}
