"use client";

import React from "react";
import {
  agentSample,
  agentThesis,
  agents,
  aiPosition,
  notableTests,
  pipeline,
  testMatrix,
} from "@/lib/content/process";
import type { Language } from "@/lib/translations";
import { SectionShell, type Theme } from "./Shell";

const COPY = {
  eyebrow: { en: "HOW THE WORK MOVES", pt: "COMO O TRABALHO ANDA" },
  title: {
    en: "Nothing gets built until it has been written down.",
    pt: "Nada é construído antes de estar escrito.",
  },
  fleet: { en: "The agent fleet", pt: "A frota de agentes" },
  evidence: { en: "Test evidence", pt: "Evidência de teste" },
  evidenceLede: {
    en: "Test cases come out of the spec, not out of the code. Below is what is actually in the repositories — including the gaps.",
    pt: "Os casos de teste saem da spec, não do código. Abaixo está o que existe de fato nos repositórios — inclusive as lacunas.",
  },
  gaps: {
    en: "Touvie has end-to-end coverage but no unit tests, and not every repository has CI yet. Those are real gaps and they are on the list — I would rather you read them here than find them yourself.",
    pt: "O Touvie tem cobertura de ponta a ponta mas nenhum teste unitário, e nem todo repositório tem CI ainda. São lacunas reais e estão na lista — prefiro que você leia aqui a descobrir sozinho.",
  },
  noCi: { en: "local only", pt: "só local" },
  ai: { en: "On the AI in my commits", pt: "Sobre a IA nos meus commits" },
  sample: { en: "One of them, in full", pt: "Um deles, por inteiro" },
  sampleLede: {
    en: "Listing ten agents is a claim. Here is one of the files, so the design decisions can be read \u2014 and argued with.",
    pt: "Listar dez agentes \u00e9 alega\u00e7\u00e3o. Aqui est\u00e1 um dos arquivos, pra que as decis\u00f5es de projeto possam ser lidas \u2014 e contestadas.",
  },
} as const;

export function MethodSection({ theme, lang }: { theme: Theme; lang: Language }) {
  const isDark = theme === "dark";
  const linha = isDark ? "border-white/10" : "border-black/10";
  const suave = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <SectionShell
      id="method"
      theme={theme}
      tone="a"
      index="04"
      ghost="METHOD"
      eyebrow={COPY.eyebrow[lang]}
      title={COPY.title[lang]}
    >
      {/* A sequência. É numerada porque é sequência de verdade. */}
      <ol className={`border-t ${linha}`}>
        {pipeline.map((p) => (
          <li
            key={p.n}
            className={`grid gap-3 md:grid-cols-[auto_1fr_1.4fr] md:gap-10 py-6 border-b ${linha}`}
          >
            <div className="flex items-baseline gap-4 md:block">
              <span className="font-serif text-3xl md:text-4xl text-accent leading-none">
                {p.n}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.16em] md:mt-3 md:block">
                {p.phase[lang]}
              </span>
            </div>
            <div className="font-mono text-[11px] text-gray-500 break-all md:pt-2">{p.output}</div>
            <p className={`text-sm leading-relaxed font-light ${suave}`}>{p.detail[lang]}</p>
          </li>
        ))}
      </ol>

      {/* Frota de agentes. */}
      <div className="mt-20">
        <span className="block text-accent text-sm tracking-widest mb-4 font-bold">
          {COPY.fleet[lang]}
        </span>
        <p className={`text-lg md:text-xl font-serif leading-snug max-w-3xl mb-10`}>
          {agentThesis[lang]}
        </p>
        <div className={`grid md:grid-cols-2 gap-x-12 border-t ${linha}`}>
          {agents.map((a) => {
            const soLeitura = a.scope.includes("read-only");
            return (
              <div
                key={a.name}
                className={`flex items-baseline gap-3 py-3 border-b ${linha}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 translate-y-[-2px] ${
                    soLeitura ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                  aria-hidden
                />
                <span className="font-mono text-[13px] shrink-0">{a.name}</span>
                <span className={`text-[13px] font-light ml-auto text-right ${suave}`}>
                  {a.role[lang]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Um agente de verdade, mostrado o bastante pra ser julgado. */}
      <div className="mt-16">
        <span className="block text-accent text-sm tracking-widest mb-3 font-bold">
          {COPY.sample[lang]}
        </span>
        <p className={`text-sm leading-relaxed font-light max-w-2xl mb-6 ${suave}`}>
          {COPY.sampleLede[lang]}
        </p>

        <figure className={`border ${linha}`}>
          <figcaption
            className={`flex items-baseline justify-between gap-4 px-4 py-2.5 border-b ${linha} font-mono text-[11px]`}
          >
            <span className="text-accent break-all">{agentSample.file}</span>
            <span className="text-gray-500 shrink-0">{agentSample.lines} L</span>
          </figcaption>
          <pre
            className={`overflow-x-auto px-4 py-4 text-[11.5px] leading-relaxed font-mono ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <code>{agentSample.excerpt}</code>
          </pre>
        </figure>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mt-8">
          {agentSample.notes.map((n) => (
            <div key={n.title.en}>
              <span className="block h-px w-6 bg-accent mb-3" aria-hidden />
              <p className="text-[15px] font-serif leading-snug mb-2">{n.title[lang]}</p>
              <p className={`text-sm leading-relaxed font-light ${suave}`}>{n.detail[lang]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Evidência de teste, com as lacunas ditas em voz alta. */}
      <div className="mt-20">
        <span className="block text-accent text-sm tracking-widest mb-4 font-bold">
          {COPY.evidence[lang]}
        </span>
        <p className={`text-sm leading-relaxed font-light max-w-2xl mb-10 ${suave}`}>
          {COPY.evidenceLede[lang]}
        </p>

        <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr className={`border-b ${linha}`}>
                {["Repo", "E2E", "Unit", "CI", "Focus"].map((h) => (
                  <th
                    key={h}
                    className="text-left font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500 font-medium pb-3 pr-6"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {testMatrix.map((r) => (
                <tr key={r.repo} className={`border-b ${linha}`}>
                  <td className="py-3 pr-6 text-sm">{r.repo}</td>
                  <td className={`py-3 pr-6 font-mono text-xs ${suave}`}>{r.e2e}</td>
                  <td className="py-3 pr-6 font-mono text-xs text-accent">{r.unit}</td>
                  <td className="py-3 pr-6 font-mono text-xs">
                    {r.ci ? (
                      <span className="text-emerald-500">CI</span>
                    ) : (
                      <span className="text-gray-500">{COPY.noCi[lang]}</span>
                    )}
                  </td>
                  <td className={`py-3 text-xs font-light ${suave}`}>{r.focus[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={`text-sm leading-relaxed font-light max-w-2xl mt-6 ${suave}`}>
          {COPY.gaps[lang]}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {notableTests.map((t) => (
            <div key={t.file}>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                {t.kind[lang]}
              </span>
              <p className="font-mono text-[11px] text-gray-500 break-all mt-1.5 mb-3">{t.file}</p>
              <p className="text-[15px] font-serif leading-snug mb-2">{t.asserts[lang]}</p>
              <p className={`text-sm leading-relaxed font-light ${suave}`}>{t.why[lang]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Posição sobre IA, dita de frente. */}
      <div className={`mt-20 pt-10 border-t ${linha}`}>
        <span className="block text-accent text-sm tracking-widest mb-6 font-bold">
          {COPY.ai[lang]}
        </span>
        <p className="text-2xl md:text-3xl font-serif leading-tight max-w-2xl mb-6">
          {aiPosition.headline[lang]}
        </p>
        <p className={`text-sm md:text-base leading-relaxed font-light max-w-2xl mb-8 ${suave}`}>
          {aiPosition.body[lang]}
        </p>
        <ul className="grid md:grid-cols-2 gap-x-12 gap-y-2 max-w-3xl mb-8">
          {aiPosition.evidence.map((e) => (
            <li key={e.en} className="flex gap-3">
              <span className="block h-px w-4 bg-accent mt-2.5 shrink-0" aria-hidden />
              <span className={`text-sm font-light ${suave}`}>{e[lang]}</span>
            </li>
          ))}
        </ul>
        <p className="text-base md:text-lg font-serif leading-snug max-w-2xl">
          {aiPosition.close[lang]}
        </p>
      </div>
    </SectionShell>
  );
}
