export type Language = "pt" | "en";

/**
 * Só o menu vive aqui. O resto da cópia mora ao lado de quem a renderiza
 * (`HERO_COPY`/`ABOUT_COPY` em app/page.tsx, `DESKTOP_COPY` e `SKILLS_COPY` no
 * desktop, `content/systems.ts` para os projetos) — dicionário central que
 * ninguém lê vira texto desatualizado esperando pra reaparecer.
 */
export const translations = {
  pt: {
    nav: {
      top: "Início",
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
    },
  },
  en: {
    nav: {
      top: "Start",
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
  },
} as const;
