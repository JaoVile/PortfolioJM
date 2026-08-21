import type { Bi } from "./operations";

/**
 * O catálogo completo, que vive dentro do "ver tudo" e NÃO na página.
 *
 * A página é a defesa: quatro casos escolhidos e o trabalho de cliente. O
 * catálogo é o arquivo — quem quiser cavar, cava. Misturar os dois transforma
 * a defesa numa lista, e lista não convence ninguém.
 *
 * `repo: null` = repositório privado. Link pra repositório privado devolve 404
 * pra quem visita, que é pior que não ter link.
 */

export type CatalogItem = {
  name: string;
  desc: Bi;
  tech: string;
  repo: string | null;
  live?: string;
};

export const catalogGroups: { title: Bi; items: CatalogItem[] }[] = [
  {
    title: { en: "Systems I built and operate", pt: "Sistemas que eu construí e opero" },
    items: [
      {
        name: "Touvie",
        desc: {
          en: "Personal life OS: routine, goals, journal, finance, workout and diet in one installable PWA, with a Telegram bot and an assistant that writes to real data.",
          pt: "Life OS pessoal: rotina, metas, diário, finanças, treino e dieta num PWA instalável, com bot de Telegram e um assistente que escreve em dado real.",
        },
        tech: "Next.js 15 · Supabase · Telegram",
        repo: "https://github.com/JaoVile/Touvie",
        live: "https://touvie.vercel.app",
      },
      {
        name: "Caçador de Ofertas",
        desc: {
          en: "Scrapes Brazilian Telegram deal channels, archives to Postgres and alerts only when a tracked product enters its price range. Cron run log behind a password.",
          pt: "Coleta canais de promoção do Telegram, arquiva em Postgres e alerta só quando o produto entra na faixa de preço. Log de rodadas do cron atrás de senha.",
        },
        tech: "Next.js · Supabase · Telegram Bot",
        repo: "https://github.com/JaoVile/VaiGerar",
        live: "https://vai-gerar.vercel.app",
      },
      {
        name: "API_Busca",
        desc: {
          en: "Multi-tenant platform automating daily fleet management reports: pulls a third-party fleet API and sends formatted summaries over WhatsApp. Per-tenant credentials encrypted with AES-256-GCM.",
          pt: "Plataforma multi-tenant que automatiza relatórios diários de gestão veicular: puxa uma API de frota de terceiro e envia resumos formatados por WhatsApp. Credenciais por inquilino criptografadas com AES-256-GCM.",
        },
        tech: "TypeScript · Postgres · Prisma · Docker",
        repo: "https://github.com/JaoVile/API_Busca",
      },
      {
        name: "Zaptutor",
        desc: {
          en: "Chrome extension that prefixes the attendant's name onto every message sent from a WhatsApp Web number shared by several people.",
          pt: "Extensão do Chrome que prefixa o nome do atendente em toda mensagem enviada de um número de WhatsApp Web compartilhado por várias pessoas.",
        },
        tech: "Chrome MV3 · JavaScript",
        repo: "https://github.com/JaoVile/zaptutor",
      },
      {
        name: "cobraflow",
        desc: {
          en: "Collections dispatch dashboard over WhatsApp: batch cascade, cron scheduling, two-layer blocklist and an audit log. Clean-room build on synthetic data.",
          pt: "Painel de disparo de cobrança por WhatsApp: cascata em lote, agendamento por cron, blocklist em duas camadas e log de auditoria. Clean-room com dados sintéticos.",
        },
        tech: "Next.js 16 · SSE · WhatsApp Cloud API",
        repo: null,
      },
      {
        name: "checkout-diario",
        desc: {
          en: "Generates my daily work summary from what the machine recorded — git, terminal, journalctl, PM2, browser history. Local-first, runs on PM2 at 17:50.",
          pt: "Gera meu resumo diário de trabalho a partir do que a máquina registrou — git, terminal, journalctl, PM2, histórico do navegador. Local-first, roda no PM2 às 17:50.",
        },
        tech: "Shell · PM2 · Claude API",
        repo: "https://github.com/JaoVile/checkout-diario",
      },
    ],
  },
  {
    title: { en: "Products and client work", pt: "Produtos e trabalho de cliente" },
    items: [
      {
        name: "Gnomon",
        desc: {
          en: "Indoor wayfinding PWA for complex venues — campuses, hospitals, event centres — with interactive maps and point-of-interest search.",
          pt: "PWA de wayfinding indoor para espaços complexos — campi, hospitais, centros de eventos — com mapas interativos e busca por pontos de interesse.",
        },
        tech: "TypeScript · React · PWA",
        repo: "https://github.com/JaoVile/Gnomon",
        live: "https://white-gate-478903-h3.web.app/mapa",
      },
      {
        name: "nomonG",
        desc: {
          en: "Gnomon's back end — the indoor wayfinding API serving routes and points of interest.",
          pt: "Back-end do Gnomon — a API de wayfinding indoor que serve rotas e pontos de interesse.",
        },
        tech: "TypeScript · FastAPI",
        repo: "https://github.com/JaoVile/nomonG",
      },
      {
        name: "agendapp",
        desc: {
          en: "Appointment scheduling PWA: instant Google Meet booking with two-way Google Calendar sync, and a test that proves two people cannot win the same slot.",
          pt: "PWA de agendamento: reserva com Google Meet na hora e sincronização bidirecional com o Google Calendar, mais um teste que prova que duas pessoas não ganham o mesmo horário.",
        },
        tech: "Next.js 16 · Supabase · Google APIs",
        repo: "https://github.com/JaoVile/agendapp",
      },
      {
        name: "SolarTech",
        desc: {
          en: "Energy savings platform with simulation and dashboards.",
          pt: "Plataforma de economia de energia com simulação e dashboards.",
        },
        tech: "React + Vite",
        repo: null,
        live: "https://joaovilela-solar.vercel.app",
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
      },
    ],
  },
  {
    title: { en: "Study and coursework", pt: "Estudo e faculdade" },
    items: [
      {
        name: "Workout_API",
        desc: {
          en: "REST API in FastAPI managing gyms, athletes and training centres, extended with search filters, pagination and custom exception handling.",
          pt: "API REST em FastAPI gerenciando academias, atletas e centros de treinamento, estendida com filtros de busca, paginação e tratamento de exceção customizado.",
        },
        tech: "Python · FastAPI · Postgres · Alembic",
        repo: null,
      },
      {
        name: "Store_api",
        desc: {
          en: "TDD-driven store API built for a challenge, with pre-commit hooks and containerised Postgres.",
          pt: "API de loja guiada por TDD, feita para um desafio, com pre-commit e Postgres em contêiner.",
        },
        tech: "Python · pytest · Docker",
        repo: "https://github.com/JaoVile/Store_api",
      },
      {
        name: "mlproject",
        desc: {
          en: "Machine learning coursework: data analysis notebooks for a university module.",
          pt: "Trabalho de machine learning: notebooks de análise de dados para uma cadeira da faculdade.",
        },
        tech: "Jupyter · Python",
        repo: "https://github.com/JaoVile/mlproject",
      },
      {
        name: "MundoManso",
        desc: {
          en: "Third-semester university project in Java.",
          pt: "Projeto de faculdade do terceiro semestre, em Java.",
        },
        tech: "Java",
        repo: "https://github.com/JaoVile/MundoManso",
      },
    ],
  },
];
