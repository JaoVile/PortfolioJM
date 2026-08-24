/**
 * A vitrine da home — o que alguém vê antes de clicar em qualquer coisa.
 *
 * É um recorte curto de propósito: o catálogo inteiro vive dentro da janela,
 * na aba Projetos (`src/lib/content/systems.ts`). Aqui entra só o que vale a
 * primeira impressão, e o ano fica ao lado de cada item porque a lista mistura
 * trabalho de épocas diferentes.
 */
export type ShowcaseItem = {
  title: string;
  image: string;
  tech: string;
  url: string;
  year: string;
};

export const PROJECTS: ShowcaseItem[] = [
  {
    title: "Touvie",
    image: "/projects/touvie.png",
    tech: "Next.js 15 · Supabase · Telegram",
    url: "https://touvie.vercel.app",
    year: "2026",
  },
  {
    title: "SolarTech",
    image: "/projects/solar.png",
    tech: "React + Vite",
    url: "https://joaovilela-solar.vercel.app",
    year: "2025",
  },
  {
    title: "Renova Aesthetic",
    image: "/projects/renova.png",
    tech: "Next.js + Stripe",
    url: "https://joaovilela-web.vercel.app",
    year: "2025",
  },
];
