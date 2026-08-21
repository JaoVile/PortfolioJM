"use client";

import React from "react";
import { monitors, safetyRules, systems } from "@/lib/content/operations";
import type { Language } from "@/lib/translations";
import { Readout, SectionShell, type Theme } from "./Shell";

const COPY = {
  eyebrow: { en: "WHAT I DO ALL DAY", pt: "O QUE EU FAÇO O DIA INTEIRO" },
  title: {
    en: "The monitoring is mine. I engineered it, I did not buy it.",
    pt: "O monitoramento é meu. Eu construí, não comprei.",
  },
  systems: { en: "Systems in production", pt: "Sistemas em produção" },
  rules: { en: "Rules I do not break", pt: "Regras que eu não quebro" },
} as const;

export function OperationsSection({ theme, lang }: { theme: Theme; lang: Language }) {
  const isDark = theme === "dark";
  const linha = isDark ? "border-white/10" : "border-black/10";
  const suave = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <SectionShell
      id="operations"
      theme={theme}
      tone="b"
      index="02"
      ghost="OPERATIONS"
      eyebrow={COPY.eyebrow[lang]}
      title={COPY.title[lang]}
    >
      {/* Quadro de sistemas: a mesma leitura de um painel de operação. */}
      <div className={`border-t ${linha} mb-16`}>
        <div className={`py-3 border-b ${linha}`}>
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-gray-500">
            {COPY.systems[lang]}
          </span>
        </div>
        {systems.map((s) => (
          <div
            key={s.role.en}
            className={`grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1.1fr] gap-1 md:gap-6 py-4 border-b ${linha} items-baseline`}
          >
            <span className="text-[15px] flex items-start gap-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 translate-y-2"
                aria-hidden
              />
              <span>
                {s.role[lang]}
                <span className={`block text-[13px] md:text-xs mt-1 font-light ${suave}`}>{s.detail[lang]}</span>
              </span>
            </span>
            <span className="font-mono text-[13px] md:text-xs text-gray-500 md:pl-0 pl-4">{s.runtime}</span>
            <span className="font-mono text-[13px] md:text-xs text-accent md:pl-0 pl-4">{s.platform}</span>
          </div>
        ))}
      </div>

      {/* Monitores, com os limiares que eu escolhi e sei defender. */}
      <div className="space-y-12 md:space-y-14">
        {monitors.map((m) => (
          <div key={m.id} className="grid gap-6 md:grid-cols-[1.15fr_1fr] md:gap-14">
            <div>
              <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                <h4 className="text-xl md:text-2xl font-serif">{m.name[lang]}</h4>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">
                  {m.cadence[lang]}
                </span>
              </div>
              <p className={`text-sm leading-relaxed font-light ${suave}`}>{m.detail[lang]}</p>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {m.thresholds.map((t) => (
                <Readout
                  key={t.label.en}
                  label={t.label[lang]}
                  value={t.value}
                  unit={t.unit}
                  level={t.level as "ok" | "warn" | "crit"}
                  theme={theme}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Regras. É o que separa "sei mexer" de "posso mexer na sua produção". */}
      <div className={`mt-20 pt-10 border-t ${linha}`}>
        <span className="block text-accent text-sm tracking-widest mb-8 font-bold">
          {COPY.rules[lang]}
        </span>
        <div className="grid gap-8 md:grid-cols-3">
          {safetyRules.map((r) => (
            <div key={r.rule.en}>
              <span className="block h-px w-8 bg-accent mb-4" aria-hidden />
              <p className="text-base md:text-lg font-serif leading-snug mb-3">{r.rule[lang]}</p>
              <p className={`text-sm leading-relaxed font-light ${suave}`}>{r.example[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
