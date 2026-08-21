"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/content/work";
import type { Language } from "@/lib/translations";
import type { Theme } from "./Shell";

const COPY = {
  problem: { en: "The problem", pt: "O problema" },
  built: { en: "What I built", pt: "O que eu construí" },
  hard: { en: "Problems worth writing down", pt: "Problemas que valem ser escritos" },
  repo: { en: "Repository", pt: "Repositório" },
  live: { en: "Live", pt: "No ar" },
  open: { en: "Read the case", pt: "Ler o caso" },
  close: { en: "Close", pt: "Fechar" },
} as const;

/**
 * Sistemas que eu construí e opero de ponta a ponta.
 *
 * Abre fechado e expande no clique: os números cabem na primeira olhada e a
 * história fica um toque abaixo. Despejar três estudos de caso inteiros de uma
 * vez empurraria o trabalho de cliente pra baixo de uma parede de texto.
 */
export function CaseStudies({ theme, lang }: { theme: Theme; lang: Language }) {
  const [aberto, setAberto] = useState<string | null>(null);
  const isDark = theme === "dark";
  const linha = isDark ? "border-white/10" : "border-black/10";
  const suave = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`border-t ${linha}`}>
      {caseStudies.map((p) => {
        const expandido = aberto === p.slug;
        return (
          <article key={p.slug} className={`border-b ${linha}`}>
            <button
              type="button"
              onClick={() => setAberto(expandido ? null : p.slug)}
              aria-expanded={expandido}
              className="w-full text-left py-8 md:py-10 group cursor-pointer"
            >
              <div className="flex items-baseline justify-between gap-6 flex-wrap mb-4">
                <h4 className="text-2xl md:text-4xl font-serif group-hover:text-accent transition-colors">
                  {p.name}
                </h4>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[13px] md:text-xs text-gray-500">{p.tech}</span>
                  <span className="font-mono text-xs text-gray-500">{p.year}</span>
                </div>
              </div>

              <p className={`text-base md:text-lg font-light leading-relaxed max-w-3xl mb-7 ${suave}`}>
                {p.tagline[lang]}
              </p>

              {/* Fatos contados, sem barra: nada aqui tem limiar. */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-3xl">
                {p.metrics.map((m) => (
                  <div key={m.label.en}>
                    <div className="font-mono text-xl md:text-2xl text-accent tabular-nums leading-none">
                      {m.value}
                    </div>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-500">
                      {m.label[lang]}
                    </div>
                  </div>
                ))}
              </div>

              <span className="inline-flex items-center gap-2 mt-7 text-xs tracking-[0.2em] font-mono uppercase text-accent">
                {expandido ? COPY.close[lang] : COPY.open[lang]}
                <span
                  className={`block h-px bg-accent transition-all ${expandido ? "w-4" : "w-8 group-hover:w-12"}`}
                />
              </span>
            </button>

            {expandido && (
              <div className="pb-10 md:pb-14">
                <div className="grid md:grid-cols-2 gap-8 md:gap-14 mb-10">
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500 mb-3">
                      {COPY.problem[lang]}
                    </span>
                    <p className={`text-sm leading-relaxed font-light ${suave}`}>{p.problem[lang]}</p>
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500 mb-3">
                      {COPY.built[lang]}
                    </span>
                    <p className={`text-sm leading-relaxed font-light ${suave}`}>{p.approach[lang]}</p>
                  </div>
                </div>

                <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500 mb-5">
                  {COPY.hard[lang]}
                </span>
                <div className="grid md:grid-cols-3 gap-8">
                  {p.hard.map((h) => (
                    <div key={h.title.en}>
                      <span className="block h-px w-6 bg-accent mb-3" aria-hidden />
                      <p className="text-[15px] font-serif leading-snug mb-2">{h.title[lang]}</p>
                      <p className={`text-sm leading-relaxed font-light ${suave}`}>{h.detail[lang]}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mt-10">
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-xs tracking-[0.15em] font-mono uppercase border px-5 py-3 rounded-full transition-all hover:scale-105 ${
                        isDark
                          ? "border-white/20 hover:bg-white hover:text-black"
                          : "border-black/20 hover:bg-black hover:text-white"
                      }`}
                    >
                      {COPY.repo[lang]} <ArrowUpRight size={14} />
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs tracking-[0.15em] font-mono uppercase border border-accent text-accent px-5 py-3 rounded-full transition-all hover:scale-105"
                    >
                      {COPY.live[lang]} <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
