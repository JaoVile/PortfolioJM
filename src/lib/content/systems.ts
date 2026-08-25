export type Bi = { en: string; pt: string };

export type SystemItem = {
  name: string;
  desc: Bi;
  tech: string;
  repo: string | null;
  live?: string;
  /** Screenshot real do produto rodando. Sem imagem o item vira linha de lista
   *  em vez de card — placeholder cinza não prova nada e só ocupa espaço. */
  image?: string;
};

/**
 * Sistemas pessoais que eu construí e opero de verdade — não projeto de
 * portfólio, coisa que roda em produção com CI, teste e cron. Repo privado
 * vira `repo: null` porque link pra repositório privado devolve 404, que é
 * pior do que não mostrar link nenhum.
 */
export const systemsGroupTitle: Bi = {
  en: "Systems I built and operate",
  pt: "Sistemas que eu construí e opero",
};

export const clientWorkGroupTitle: Bi = {
  en: "Client work",
  pt: "Trabalho de cliente",
};

export const systems: SystemItem[] = [
  {
    name: "Touvie",
    desc: {
      en: "Personal life OS: routine, goals, journal, finance, workout and diet in one installable PWA, with a Telegram bot and an assistant that writes to real data.",
      pt: "Life OS pessoal: rotina, metas, diário, finanças, treino e dieta num PWA instalável, com bot de Telegram e um assistente que escreve em dado real.",
    },
    tech: "Next.js 15 · Supabase · Telegram",
    repo: "https://github.com/JaoVile/Touvie",
    live: "https://touvie.vercel.app",
    image: "/projects/touvie.png",
  },
  {
    name: "allchats",
    desc: {
      en: "Multi-tenant WhatsApp automation: a support bot answering from a knowledge base with guardrails, escalating to a human via tool use. Runs with no API key — CI exercises that deterministic fallback on purpose.",
      pt: "Automação multi-tenant de WhatsApp: um bot de atendimento que responde a partir de uma base de conhecimento com limites de segurança e escala pra humano via tool use. Roda sem chave de API — o CI exercita esse fallback determinístico de propósito.",
    },
    tech: "Next.js 16 · React 19 · Claude SDK",
    repo: "https://github.com/JaoVile/allchats",
    live: "https://allchats.vercel.app",
    image: "/projects/allchats.png",
  },
  {
    name: "ezguide",
    desc: {
      en: "Turns product screenshots into a clickable, shareable tour — tooltips or click-only areas, branding, lead capture and a real funnel (started, per-step views, completed, CTA clicks).",
      pt: "Transforma screenshots de produto num tour clicável e compartilhável — tooltip ou área só de clique, marca própria, captura de lead e funil de verdade (início, visualização por etapa, conclusão, cliques de CTA).",
    },
    tech: "React 19 · Vite · Express · SQLite",
    repo: "https://github.com/JaoVile/ezguide",
    live: "https://ezguide.vercel.app",
    image: "/projects/ezguide.png",
  },
  {
    name: "Caçador de Ofertas",
    desc: {
      en: "Scrapes Brazilian Telegram deal channels, archives to Postgres and alerts only when a tracked product enters its price range. Cron run log behind a password.",
      pt: "Coleta canais de promoção do Telegram, arquiva em Postgres e alerta só quando o produto entra na faixa de preço. Log de rodadas do cron atrás de senha.",
    },
    tech: "Next.js · Supabase · Telegram Bot",
    repo: "https://github.com/JaoVile/VaiGerar",
    live: "https://vai-gerar.vercel.app/sobre",
    image: "/projects/cacador.png",
  },
  {
    name: "agendapp",
    desc: {
      en: "Appointment scheduling PWA: instant Google Meet booking with two-way Google Calendar sync, and a test that proves two people cannot win the same slot.",
      pt: "PWA de agendamento: reserva com Google Meet na hora e sincronização bidirecional com o Google Calendar, mais um teste que prova que duas pessoas não ganham o mesmo horário.",
    },
    tech: "Next.js 16 · Supabase · Google APIs",
    repo: "https://github.com/JaoVile/agendapp",
    image: "/projects/agendapp.png",
  },
  {
    name: "Zaptutor",
    desc: {
      en: "Chrome extension that prefixes the attendant's name onto every message sent from a WhatsApp Web number shared by several people.",
      pt: "Extensão do Chrome que prefixa o nome do atendente em toda mensagem enviada de um número de WhatsApp Web compartilhado por várias pessoas.",
    },
    tech: "Chrome MV3 · JavaScript",
    repo: "https://github.com/JaoVile/zaptutor",
    image: "/projects/zaptutor.png",
  },
  {
    name: "cobraflow",
    desc: {
      en: "Collections dispatch dashboard over WhatsApp: batch cascade, cron scheduling, two-layer blocklist and an audit log. Clean-room build on synthetic data.",
      pt: "Painel de disparo de cobrança por WhatsApp: cascata em lote, agendamento por cron, blocklist em duas camadas e log de auditoria. Clean-room com dados sintéticos.",
    },
    tech: "Next.js 16 · SSE · WhatsApp Cloud API",
    repo: null,
    image: "/projects/cobraflow.png",
  },
];

/** Sites entregues a cliente pagante. Provam outra coisa: prazo e escopo de terceiro. */
export const clientWork: SystemItem[] = [
  {
    name: "SolarTech",
    desc: {
      en: "Energy savings platform with simulation and dashboards.",
      pt: "Plataforma de economia de energia com simulação e dashboards.",
    },
    tech: "React + Vite",
    repo: null,
    live: "https://joaovilela-solar.vercel.app",
    image: "/projects/solar.png",
  },
  {
    name: "Renova Aesthetic",
    desc: {
      en: "Full e-commerce for an aesthetics clinic.",
      pt: "E-commerce completo para clínica de estética.",
    },
    tech: "Next.js + Stripe",
    repo: null,
    live: "https://joaovilela-web.vercel.app",
    image: "/projects/renova.png",
  },
  {
    name: "Gnomon",
    desc: {
      en: "Indoor wayfinding PWA for complex venues — campuses, hospitals, event centres — with interactive maps and point-of-interest search.",
      pt: "PWA de wayfinding indoor para espaços complexos — campi, hospitais, centros de eventos — com mapas interativos e busca por pontos de interesse.",
    },
    tech: "TypeScript · React · PWA",
    repo: "https://github.com/JaoVile/Gnomon",
    live: "https://white-gate-478903-h3.web.app/mapa",
    image: "/projects/gnomon.png",
  },
];
