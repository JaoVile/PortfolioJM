"use client";

import { motion, AnimatePresence, Variants, useDragControls } from "framer-motion";
import {
  X,
  Square,
  Copy,
  Code2,
  FolderGit2,
  FileText,
  Cpu,
  Terminal,
  User,
  Download,
  MapPin,
  Briefcase,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  Sun,
  Moon,
  Cloud,
  Globe,
  CakeSlice,
  Database,
  Wrench,
  Bot
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useResizeDetector } from 'react-resize-detector';

const Document = dynamic(() => import('react-pdf').then((mod) => mod.Document), {
  ssr: false,
});
const Page = dynamic(() => import('react-pdf').then((mod) => mod.Page), {
  ssr: false,
});

import { Language } from "@/lib/translations";
import { systems, systemsGroupTitle, clientWork, clientWorkGroupTitle, type SystemItem } from "@/lib/content/systems";

const DESKTOP_COPY = {
  en: {
    nav: { bio: "Profile / Bio", projects: "Projects", stack: "Tech Stack", certs: "Certificates" },
    projects: { openApp: "Open App", code: "code", live: "live", private: "private repo" },
    bio: {
      eyebrow: "// Profile",
      intro: (
        <>
          Full-Stack <strong>Developer</strong> and Technical Operations Analyst. I build the integrations that connect business systems to{" "}
          <span className="underline decoration-1 underline-offset-4 decoration-green-500/50">WhatsApp</span>, and the{" "}
          <span className="underline decoration-1 underline-offset-4 decoration-purple-500/50">multi-agent AI</span> that answers through them — on a stack of{" "}
          <span className="underline decoration-1 underline-offset-4 decoration-blue-500/50">Python</span> and React.
        </>
      ),
      location: "Location",
      age: "Age",
      ageSuffix: "years old",
      email: "Email",
      available: "Available",
      viewCv: "View Resume",
      downloadCv: "Download Resume",
      experience: "Experience",
      education: "Education",
      certs: {
        title: "Certifications",
        validated: "Verified",
        ongoing: "In progress",
      },
      exp: [
        {
          title: "Technical Operations Analyst — Átomo Soluções e Gestão",
          year: "2026 — Present",
          desc: "I build and maintain in production the integrations connecting vehicle-protection ERPs (Hinova SGA, South, DevSul) and Conta Azul to WhatsApp — automated billing, invoices, PIX and tax notices. I built a multi-tenant SaaS platform that pulls fleet management data and sends daily reports. I also designed the 24/7 WhatsApp support architecture with 8+ specialized AI agents and a routing supervisor (LLMs, RAG).",
          tags: ["Node.js", "TypeScript", "WhatsApp API", "Multi-Agent AI", "ERP Integrations"],
        },
        {
          title: "Gnomon - Engineer & Architect (Co-Founder)",
          year: "2025 — 2026",
          desc: "As co-founder, I was responsible for the startup's architecture and full-stack development. I was the sole developer of the system's core, building the routing algorithms, the API and the React UI, plus E2E tests with Cypress.",
          tags: ["React", "TypeScript", "PWA", "Architecture", "Cypress"],
        },
        {
          title: "Sede Digital - Interactive Portfolio",
          year: "2025",
          desc: "Built a high-performance application (95/100 on Lighthouse) that simulates an OS. Used Next.js, Framer Motion for smooth 60fps animations and a modular Design System for an immersive, fully responsive UX.",
          tags: ["Next.js", "Framer Motion", "Web Performance", "SEO", "Design System"],
        },
      ],
      edu: [
        {
          year: "2024-2025",
          title: "Systems Analysis & Development",
          school: "UNINASSAU",
          desc: "Solid foundation in software engineering, logic, OOP and databases (SQL/NoSQL). Practical application of agile methodologies (Scrum), QA, Docker and Git.",
        },
        {
          year: "2025",
          title: "Python Back-end Bootcamp",
          school: "DIO & Santander",
          desc: "Intensive training (58h) focused on APIs with Python, FastAPI, Docker and databases.",
        },
      ],
    },
  },
  pt: {
    nav: { bio: "Perfil / Bio", projects: "Projetos", stack: "Tech Stack", certs: "Certificados" },
    projects: { openApp: "Abrir App", code: "código", live: "no ar", private: "repositório privado" },
    bio: {
      eyebrow: "// Perfil",
      intro: (
        <>
          Desenvolvedor <strong>Full-Stack</strong> e Analista de Operações Técnicas. Construo as integrações que ligam sistemas de negócio ao{" "}
          <span className="underline decoration-1 underline-offset-4 decoration-green-500/50">WhatsApp</span>, e a{" "}
          <span className="underline decoration-1 underline-offset-4 decoration-purple-500/50">IA multi-agente</span> que atende por eles — numa stack de{" "}
          <span className="underline decoration-1 underline-offset-4 decoration-blue-500/50">Python</span> e React.
        </>
      ),
      location: "Localização",
      age: "Idade",
      ageSuffix: "anos",
      email: "Email",
      available: "Disponível",
      viewCv: "Ver CV",
      downloadCv: "Baixar CV",
      experience: "Experiência",
      education: "Educação",
      certs: {
        title: "Certificações",
        validated: "Validado",
        ongoing: "Em andamento",
      },
      exp: [
        {
          title: "Analista de Operações Técnicas — Átomo Soluções e Gestão",
          year: "2026 — Atual",
          desc: "Desenvolvo e mantenho em produção as integrações que ligam ERPs de proteção veicular (Hinova SGA, South, DevSul) e Conta Azul ao WhatsApp — cobrança, boletos, PIX e notas fiscais automatizados. Construí uma plataforma SaaS multi-tenant que extrai dados de gestão de frotas e dispara relatórios diários. Também projetei a arquitetura de atendimento 24/7 no WhatsApp com 8+ agentes de IA especializados e supervisor roteador (LLMs, RAG).",
          tags: ["Node.js", "TypeScript", "WhatsApp API", "IA Multi-Agente", "Integrações ERP"],
        },
        {
          title: "Gnomon - Engenheiro & Arquiteto (Co-Founder)",
          year: "2025 — 2026",
          desc: "Como co-fundador, fui responsável pela arquitetura e desenvolvimento integral da startup. Atuei como o único desenvolvedor do núcleo do sistema, criando algoritmos de rotas, a API e a UI em React, além de implementar testes E2E com Cypress.",
          tags: ["React", "TypeScript", "PWA", "Arquitetura", "Cypress"],
        },
        {
          title: "Sede Digital - Portfólio Interativo",
          year: "2025",
          desc: "Desenvolvi uma aplicação de alta performance (95/100 no Lighthouse) que simula um SO. Usei Next.js, Framer Motion para animações fluidas (60fps) e um Design System modular para uma UX imersiva e totalmente responsiva.",
          tags: ["Next.js", "Framer Motion", "Web Performance", "SEO", "Design System"],
        },
      ],
      edu: [
        {
          year: "2024-2025",
          title: "Análise e Des. de Sistemas",
          school: "UNINASSAU",
          desc: "Base sólida em engenharia de software, lógica, POO e bancos de dados (SQL/NoSQL). Aplicação prática de metodologias ágeis (Scrum), QA, Docker e Git.",
        },
        {
          year: "2025",
          title: "Bootcamp Python Back-end",
          school: "DIO & Santander",
          desc: "Formação intensiva (58h) focada em APIs com Python, FastAPI, Docker e bancos de dados.",
        },
      ],
    },
  },
} as const;

// --- DADOS ---
const SKILLS_COPY = {
  en: {
    title: "Technical Skills",
    categories: [
      {
        key: "frontend", title: "Front-end", items: [
          { name: "React", description: "Built the customer-facing dashboards and e-commerce UI for client projects like Renova and SolarTech." },
          { name: "Next.js", description: "Main framework for everything I ship in production — Touvie, cobraflow, this site. App Router, SSR, performance as a build gate." },
          { name: "TypeScript", description: "End to end, front and back — catches integration bugs before they hit deploy." },
          { name: "Tailwind CSS", description: "Styling system for every interface I build, from client sites to internal dashboards." },
          { name: "Framer Motion", description: "60fps animations and page transitions — used it to hit a 95/100 Lighthouse score on Sede Digital." },
        ]
      },
      {
        key: "backend", title: "Back-end", items: [
          { name: "Python (FastAPI)", description: "REST APIs in production — from the Santander/DIO bootcamp to personal projects like Workout_API." },
          { name: "Node.js (Hono & Express)", description: "Engine behind the ERP-to-WhatsApp integrations at Átomo — Hono where performance matters, Express for legacy services." },
          { name: "C# / .NET", description: "Core of a financial ERP running in production, backed by time-series data." },
          { name: "REST APIs", description: "Design the contract between ERPs, WhatsApp and internal dashboards — auth, rate limits and retries included." },
        ]
      },
      {
        key: "ai", title: "AI Engineering", items: [
          { name: "Claude & GPT (applied)", description: "I use them like a linter or a debugger — architecture, trade-offs and validating the output stay mine." },
          { name: "Multi-agent systems", description: "Designed a 24/7 WhatsApp support architecture with 8+ specialized agents and a routing supervisor." },
          { name: "RAG", description: "Retrieval with guardrails, feeding both a customer-support agent and internal automations." },
          { name: "Prompt Engineering", description: "Scoped subagents with explicit tool grants — permissions as the real guardrail, not the prompt wording." },
        ]
      },
      {
        key: "databases", title: "Data & Databases", items: [
          { name: "PostgreSQL", description: "Primary database on almost every project — including a replication monitor I wrote myself (lag, WAL, offline slots)." },
          { name: "TimescaleDB", description: "Time-series layer under a financial ERP that runs daily operations." },
          { name: "Supabase (RLS)", description: "Row-level security that's actually enforced — Touvie has E2E tests proving one user can't read another's data." },
          { name: "Prisma & Alembic", description: "Versioned migrations across the TypeScript and Python halves of my stack." },
        ]
      },
      {
        key: "devops", title: "DevOps & Cloud", items: [
          { name: "Docker Swarm + Traefik", description: "Orchestrate containers in production without reaching for Kubernetes I don't actually need at this scale." },
          { name: "PM2 (cluster mode)", description: "Clusters the web app so one crashed worker doesn't take the whole product down." },
          { name: "AWS & OCI", description: "S3, EC2 and Oracle Cloud — Oracle 2025 Certified Generative AI Professional." },
          { name: "systemd", description: "Replaced a flaky polling script with an event-driven service to fix a recurring audio-device bug in production." },
        ]
      },
      {
        key: "integrations", title: "Integrations & Automation", items: [
          { name: "ERP Integrations", description: "Connect vehicle-protection and accounting ERPs (Hinova, South, DevSul, Conta Azul) to WhatsApp — billing, invoices, PIX, all automated." },
          { name: "WhatsApp Business API", description: "Approved Meta templates driving billing reminders, invoices and support at Átomo." },
          { name: "n8n & Typebot", description: "Internal automation and conversational flows that don't need a full custom backend." },
          { name: "Chatwoot & Helena CRM", description: "Bulk conversation management with a CSV audit trail and a safe preview mode before anything sends." },
        ]
      },
    ],
  },
  pt: {
    title: "Competências Técnicas",
    categories: [
      {
        key: "frontend", title: "Front-end", items: [
          { name: "React", description: "Construí os dashboards e a UI de e-commerce de projetos como Renova e SolarTech." },
          { name: "Next.js", description: "Framework principal de tudo que eu boto em produção — Touvie, cobraflow, este site. App Router, SSR, performance como critério de build." },
          { name: "TypeScript", description: "De ponta a ponta, front e back — pega erro de integração antes do deploy." },
          { name: "Tailwind CSS", description: "Sistema de estilo de toda interface que eu construo, de site de cliente a dashboard interno." },
          { name: "Framer Motion", description: "Animações a 60fps e transições de página — usei pra bater 95/100 no Lighthouse do Sede Digital." },
        ]
      },
      {
        key: "backend", title: "Back-end", items: [
          { name: "Python (FastAPI)", description: "APIs REST em produção — do bootcamp Santander/DIO a projetos pessoais como o Workout_API." },
          { name: "Node.js (Hono & Express)", description: "Motor das integrações ERP↔WhatsApp na Átomo — Hono onde performance importa, Express pros serviços legados." },
          { name: "C# / .NET", description: "Núcleo de um ERP financeiro em produção, com dados de série temporal." },
          { name: "APIs REST", description: "Desenho o contrato entre ERPs, WhatsApp e dashboards internos — auth, rate limit e retry inclusos." },
        ]
      },
      {
        key: "ai", title: "Engenharia de IA", items: [
          { name: "Claude & GPT (aplicado)", description: "Uso como uso um linter ou um debugger — arquitetura, trade-offs e validação do resultado continuam sendo minhas decisões." },
          { name: "Sistemas multi-agente", description: "Projetei uma arquitetura de atendimento 24/7 no WhatsApp com 8+ agentes especializados e supervisor roteador." },
          { name: "RAG", description: "Recuperação com limites de segurança, alimentando tanto um agente de atendimento quanto automações internas." },
          { name: "Engenharia de Prompt", description: "Subagentes com escopo e permissões explícitas de ferramenta — a permissão é a guarda real, não a redação do prompt." },
        ]
      },
      {
        key: "databases", title: "Dados & Bancos de Dados", items: [
          { name: "PostgreSQL", description: "Banco principal em quase todo projeto — incluindo um monitor de replicação que eu mesmo escrevi (lag, WAL, slots offline)." },
          { name: "TimescaleDB", description: "Camada de série temporal por baixo de um ERP financeiro que roda operação diária." },
          { name: "Supabase (RLS)", description: "Row-level security que funciona de verdade — o Touvie tem teste E2E provando que um usuário não lê dado de outro." },
          { name: "Prisma & Alembic", description: "Migração versionada nas duas metades do meu stack, TypeScript e Python." },
        ]
      },
      {
        key: "devops", title: "DevOps & Cloud", items: [
          { name: "Docker Swarm + Traefik", description: "Orquestro containers em produção sem recorrer a um Kubernetes que eu não preciso nessa escala." },
          { name: "PM2 (cluster mode)", description: "Clusteriza a aplicação web pra um worker que crasha não derrubar o produto inteiro." },
          { name: "AWS & OCI", description: "S3, EC2 e Oracle Cloud — Oracle 2025 Certified Generative AI Professional." },
          { name: "systemd", description: "Troquei um script de polling instável por um serviço event-driven pra resolver um bug recorrente de áudio em produção." },
        ]
      },
      {
        key: "integrations", title: "Integrações & Automação", items: [
          { name: "Integrações com ERPs", description: "Conecto ERPs de proteção veicular e contábil (Hinova, South, DevSul, Conta Azul) ao WhatsApp — cobrança, boletos, PIX, tudo automatizado." },
          { name: "WhatsApp Business API", description: "Templates aprovados pela Meta puxando lembrete de cobrança, nota fiscal e atendimento na Átomo." },
          { name: "n8n & Typebot", description: "Automação interna e fluxo conversacional que não precisa de um backend próprio." },
          { name: "Chatwoot & Helena CRM", description: "Gestão em massa de conversas com auditoria em CSV e modo seguro de pré-visualização antes de qualquer envio." },
        ]
      },
    ],
  },
} as const;

/**
 * Os certificados. O titulo de prova internacional fica igual nos dois idiomas
 * — "AWS Educate Introduction to Cloud 101" e o nome do documento, nao uma
 * frase pra traduzir. So o que e descricao muda.
 */
const CERTIFICADOS: {
  title: { en: string; pt: string };
  org: string;
  color: "red" | "orange" | "blue" | "crimson";
  year: string;
  /** Ausente = concluido. Só o que ainda está rolando declara isso. */
  ongoing?: boolean;
  url: string;
}[] = [
  {
    title: {
      en: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
      pt: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    },
    org: "Oracle",
    color: "red",
    year: "2025",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=555B238D8DBE9D841D2528092600DAE321EF664454CC2F03264A9FC1FC8B033D",
  },
  {
    title: {
      en: "AWS Educate Introduction to Cloud 101",
      pt: "AWS Educate Introduction to Cloud 101",
    },
    org: "AWS",
    color: "orange",
    year: "2025",
    url: "https://www.credly.com/badges/fee549a9-9290-49a2-8c9f-ee4acbd0f3e3",
  },
  {
    title: {
      en: "Introduction to AZ-900 with Microsoft",
      pt: "Introdução ao AZ-900 com a Microsoft",
    },
    org: "Microsoft",
    color: "blue",
    year: "2025",
    url: "/AZURE900.pdf",
  },
  {
    title: {
      en: "Hands-on Introduction to Azure AI and Azure OpenAI Models",
      pt: "Introdução Prática ao Azure AI e Azure OpenAI Models",
    },
    org: "Microsoft",
    color: "blue",
    year: "2025",
    url: "/OPENAIAZURE.pdf",
  },
  {
    title: {
      en: "CS50: Introduction to Computer Science",
      pt: "CS50: Introduction to Computer Science",
    },
    org: "Harvard",
    color: "crimson",
    year: "2026",
    ongoing: true,
    url: "https://cs50.harvard.edu/x/",
  },
];

const SKILL_ICONS: Record<string, React.ReactNode> = {
  frontend: <Cpu/>,
  backend: <Terminal/>,
  ai: <Bot/>,
  databases: <Database/>,
  devops: <Cloud/>,
  integrations: <Wrench/>,
};

// --- HOOKS ---
const useIsMobile = () => {
  // Inicia como 'true' para assumir o comportamento mobile por padrão.
  // Isso evita o "flicker" do modo de arrastar sendo ativado brevemente no carregamento em dispositivos móveis,
  // o que poderia bloquear o scroll. O desktop se corrige após a montagem do componente.
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isMobile;
};

const useLockBodyScroll = (isMobile: boolean) => {
  useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;

    // Em dispositivos móveis, travar o `body` funciona bem.
    // Em desktops, travar o `html` é mais eficaz para impedir a rolagem da página de fundo
    // sem quebrar a rolagem de elementos internos, como o conteúdo do modal.
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [isMobile]);
};

// --- CÉU VETORIAL "DIVINO" (Modo Claro & Escuro) ---
const VectorSky = React.memo(({ isDark }: { isDark: boolean }) => {
  // Otimização: Memoizar as estrelas e partículas para evitar recálculos em cada render
  const stars = React.useMemo(() => [...Array(60)].map((_, i) => ({
      id: i,
      cx: `${Math.random() * 100}%`,
      cy: `${Math.random() * 100}%`,
      r: Math.random() * 1.2,
      duration: Math.random() * 3 + 2
  })), []);

  const particles = React.useMemo(() => [...Array(12)].map((_, i) => ({
      id: i,
      cx: `${Math.random() * 100}%`,
      cy: `${Math.random() * 100}%`,
      r: Math.random() * 1 + 0.5,
      duration: Math.random() * 5 + 5
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <AnimatePresence mode="wait">
        {isDark ? (
          // === MODO ESCURO (DIVINO NIGHT) ===
          <motion.div
            key="night-vector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#050505] pointer-events-none"
          >
            <svg className="absolute inset-0 w-full h-full opacity-80 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
               {/* Estrelas (Pontos precisos) */}
               {stars.map((star) => (
                  <motion.circle
                     key={star.id}
                     cx={star.cx}
                     cy={star.cy}
                     r={star.r}
                     fill="white"
                     initial={{ opacity: 0.1 }}
                     animate={{ opacity: [0.1, 0.7, 0.1] }}
                     transition={{ duration: star.duration, repeat: Infinity }}
                  />
               ))}

               {/* A Lua (Geometria Pura) */}
               <motion.g 
                  initial={{ x: 50, y: -20, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ translateX: "80%", translateY: "15%" }}
               >
                  <circle cx="0" cy="0" r="50" stroke="white" strokeWidth="0.5" fill="none" opacity="0.9" />
                  <circle cx="0" cy="0" r="44" stroke="white" strokeWidth="0.2" fill="none" strokeDasharray="4 4" opacity="0.5" />
                  {/* Crateras estilizadas */}
                  <path d="M -15 -5 Q -10 -15 -5 -5" stroke="white" strokeWidth="0.3" fill="none" opacity="0.6"/>
                  <path d="M 10 10 Q 20 0 30 10" stroke="white" strokeWidth="0.3" fill="none" opacity="0.6"/>
               </motion.g>

               {/* Constelação */}
               <motion.path
                  d="M 100 200 L 140 240 L 180 210 L 220 230"
                  stroke="white" strokeWidth="0.3" fill="none" opacity="0.3"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 0.5 }}
               />
            </svg>
          </motion.div>
        ) : (
          // === MODO CLARO (DIVINO DAY / GOLDEN HOUR) ===
          <motion.div
            key="day-vector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#FAFAFA] pointer-events-none"
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
               
               {/* O Sol (Mandala Dourada - Mais Visível) */}
               <motion.g 
                  style={{ translateX: "85%", translateY: "15%" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 120, ease: "linear", repeat: Infinity }}
               >
                  {/* Núcleo Solar Sólido */}
                  <circle cx="0" cy="0" r="20" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.8" />
                  
                  {/* Anel 1: Pontilhado Escuro */}
                  <circle cx="0" cy="0" r="35" stroke="#D97706" strokeWidth="0.8" fill="none" strokeDasharray="2 6" opacity="0.6" />
                  
                  {/* Anel 2: Traços Largos Dourados */}
                  <circle cx="0" cy="0" r="55" stroke="#F59E0B" strokeWidth="0.5" fill="none" strokeDasharray="15 15" opacity="0.4" />
                  
                  {/* Raios Externos (Linhas Longas) */}
                  {[...Array(12)].map((_, i) => (
                     <motion.line 
                        key={i}
                        x1="0" y1="-70" x2="0" y2="-120" 
                        stroke="#D97706" 
                        strokeWidth="1" 
                        opacity="0.4"
                        transform={`rotate(${i * 30})`}
                     />
                  ))}
               </motion.g>

               {/* Nuvens "Architectural" (Contornos Cinza Azulado - Mais Visível) */}
               <motion.g opacity="0.6" stroke="#64748B" strokeWidth="1.2" fill="none">
                  <motion.path 
                     d="M 100 100 Q 130 80 160 100 T 220 100"
                     animate={{ x: [0, 40, 0] }}
                     transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.path 
                     d="M 120 120 Q 150 100 180 120"
                     strokeWidth="0.8"
                     animate={{ x: [0, 50, 0] }}
                     transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                  
                  {/* Nuvem Baixa */}
                  <motion.path 
                     d="M 50 450 Q 90 420 130 450 T 200 450"
                     animate={{ x: [0, -30, 0] }}
                     transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
                  />
               </motion.g>

               {/* Pássaros (Pretos Nítidos) */}
               <motion.g opacity="0.5" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <motion.path 
                     d="M 0 0 L 6 4 L 12 0"
                     initial={{ x: -20, y: 200 }}
                     animate={{ x: "120%", y: 150 }}
                     transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
                  />
                  <motion.path 
                     d="M 0 0 L 5 3 L 10 0"
                     initial={{ x: -50, y: 220 }}
                     animate={{ x: "120%", y: 180 }}
                     transition={{ duration: 28, repeat: Infinity, ease: "linear", delay: 5 }}
                  />
               </motion.g>

               {/* Partículas de Luz (Pólen Dourado) */}
               {particles.map((p) => (
                  <motion.circle
                     key={p.id}
                     cx={p.cx}
                     cy={p.cy}
                     r={p.r}
                     fill="#F59E0B"
                     opacity="0.6"
                     animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
                     transition={{ duration: p.duration, repeat: Infinity }}
                  />
               ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
VectorSky.displayName = "VectorSky";

// --- COMPONENTE PRINCIPAL ---
export function OSDesktop({
  onClose,
  theme,
  lang,
  setCursorVisible,
  initialTab = "bio",
  initialProject = null,
}: {
  onClose: () => void;
  theme: "light" | "dark";
  lang: Language;
  setCursorVisible: (visible: boolean) => void;
  initialTab?: "bio" | "projetos" | "skills" | "certificados";
  initialProject?: string | null;
}) {
  const isDark = theme === "dark";
  const c = DESKTOP_COPY[lang];
  const dragControls = useDragControls();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isMaximized, setIsMaximized] = useState(false);
  const [openedProject, setOpenedProject] = useState<string | null>(
    initialProject
  );
  const isMobile = useIsMobile();
  const canDrag = !isMaximized && !isMobile;

  const age = React.useMemo(() => {
    const birthDate = new Date("2005-08-24T00:00:00");
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }, []);

  useLockBodyScroll(isMobile);

  const getPath = (tab: string) => {
    switch (tab) {
      case "bio":
        return "~/profile/readme.md";
      case "projetos":
        return "~/work/projects";
      case "skills":
        return "~/config/stack";
      case "certificados":
        return "~/docs/certs";
      default:
        return "~/";
    }
  };

  const contentVariant: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
  };

  const toggleMaximize = () => {
    if (isMobile) return;
    setIsMaximized((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className={`fixed inset-0 z-9999 flex items-center justify-center ${
        isDark ? "bg-black/90" : "bg-zinc-100/80"
      } backdrop-blur-sm md:p-8 p-0`}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        drag={canDrag}
        dragListener={false}
        dragControls={dragControls}
        dragMomentum={false}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-col relative transition-all duration-300 ${
          isMaximized || isMobile
            ? "w-full h-full rounded-none"
            : "overflow-hidden w-full max-w-6xl h-[85vh] rounded-2xl shadow-2xl border " +
              (isDark
                ? "border-white/10 bg-[#0a0a0a]"
                : "border-black/5 bg-white")
        }`}
      >
        {/* Camada de Clima (Vetorial) */}
        <VectorSky isDark={isDark} />

        {/* Camada de Vidro/Ruído (Reduzi a opacidade do branco no modo claro para mostrar o desenho) */}
        <div
          className={`absolute inset-0 z-0 pointer-events-none ${
            isDark ? "bg-black/20" : "bg-white/10"
          } backdrop-blur-[1px]`}
        />

        {/* 1. BARRA DE TÍTULO */}
        <div
          className={`h-14 md:h-12 border-b flex items-center justify-between px-4 md:px-6 select-none z-20 shrink-0 relative ${
            isDark ? "border-white/10 bg-black/40" : "border-black/5 bg-white/40"
          }`}
          style={{ touchAction: canDrag ? "none" : "auto" }}
          onDoubleClick={toggleMaximize}
          onPointerDown={(event) => {
            if (canDrag) {
              dragControls.start(event);
            }
          }}
        >
          {/* Esquerda: Terminal Path */}
          <div className="flex items-center gap-3">
            <div
              className={`p-1.5 rounded-md ${
                isDark ? "bg-white/10 text-white" : "bg-black/5 text-black"
              }`}
            >
              <Terminal size={14} />
            </div>
            <div className="flex flex-col md:flex-row md:items-center font-mono leading-tight md:leading-normal">
              <span
                className={`text-[10px] md:text-sm tracking-wide ${
                  isDark ? "text-zinc-500" : "text-zinc-500"
                }`}
              >
                joao@portfolio
              </span>
              <span
                className={`text-[10px] md:text-sm md:ml-1 font-medium ${
                  isDark ? "text-zinc-300" : "text-zinc-800"
                }`}
              >
                {isMobile ? `/${activeTab}` : `:${getPath(activeTab)}`}
              </span>
            </div>
          </div>

          {/* Direita: Controles */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMaximize}
              className={`hidden md:flex items-center justify-center p-2 rounded hover:bg-white/10 transition ${
                isDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              {isMaximized ? <Copy size={14} /> : <Square size={14} />}
            </button>
            <button
              onClick={onClose}
              className={`flex items-center justify-center p-2 rounded-full md:rounded hover:bg-red-500 hover:text-white transition ${
                isDark
                  ? "text-zinc-400 bg-white/5 md:bg-transparent"
                  : "text-zinc-600 bg-black/5 md:bg-transparent"
              }`}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 2. LAYOUT PRINCIPAL */}
        <div className="flex-1 flex flex-col md:flex-row relative z-10 min-h-0">
          {/* BROWSER OVERLAY (Janela do Projeto) */}
          <AnimatePresence>
            {openedProject && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={`absolute inset-0 z-50 flex flex-col pointer-events-auto ${
                  isDark ? "bg-zinc-900" : "bg-zinc-50"
                }`}
              >
                {/* Browser Toolbar */}
                <div
                  className={`h-10 border-b flex items-center px-4 gap-3 shrink-0 pointer-events-auto ${
                    isDark
                      ? "border-white/10 bg-zinc-900"
                      : "border-black/5 bg-white"
                  }`}
                >
                  <button
                    onClick={() => {
                      setOpenedProject(null);
                      setCursorVisible(true); // Garante que o cursor volte
                    }}
                    className={`p-1.5 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors ${
                      isDark ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    <X size={14} />
                  </button>

                  {/* Fake Address Bar */}
                  <div
                    className={`flex-1 h-7 rounded flex items-center px-3 text-xs font-mono opacity-80 ${
                      isDark
                        ? "bg-black/50 text-zinc-400"
                        : "bg-black/5 text-zinc-600"
                    }`}
                  >
                    <Globe size={12} className="mr-2 opacity-50" />
                    <span className="truncate">{openedProject}</span>
                  </div>
                </div>

                {/* --- LÓGICA DE RENDERIZAÇÃO DO CONTEÚDO (Credly / PDF / Iframe) --- */}
                {openedProject.includes("credly.com") ? (
                  // === CASO CREDLY (Bloqueado) ===
                  <div className="flex-1 w-full h-full flex flex-col items-center justify-center p-8 text-center select-none pointer-events-auto animate-in fade-in zoom-in duration-300">
                     <div className={`mb-6 p-4 rounded-full ${isDark ? "bg-white/5 text-zinc-400" : "bg-black/5 text-zinc-600"}`}>
                        <ExternalLink size={32} />
                     </div>
                     <h3 className={`text-xl font-bold mb-2 font-serif ${isDark ? "text-white" : "text-black"}`}>
                        Visualização Externa Necessária
                     </h3>
                     <p className={`text-sm max-w-xs mb-8 leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                        Por motivos de segurança, a Credly não permite que esta badge seja aberta diretamente aqui.
                     </p>
                     <button
                        onClick={() => {
                           window.open(openedProject, "_blank"); // Abre a Credly em nova aba
                           setOpenedProject("/Resume_Joao_Marcos_Vilela.pdf"); // Muda o iframe interno para o Currículo
                        }}
                        className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${
                           isDark ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"
                        }`}
                     >
                        Abrir Badge & Ver Currículo
                     </button>
                  </div>
                ) : openedProject.toLowerCase().endsWith('.pdf') ? (
                  // === CASO PDF ===
                  <PdfViewer file={openedProject} setCursorVisible={setCursorVisible} isDark={isDark} />
                ) : (
                  // === CASO NORMAL (Iframe) ===
                  <iframe
                    onMouseEnter={() => setCursorVisible(false)}
                    onMouseLeave={() => setCursorVisible(true)}
                    src={openedProject}
                    className="flex-1 w-full h-full border-0 bg-white pointer-events-auto"
                    title="Project Preview"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  />
                )}
                {/* --- FIM DA LÓGICA --- */}

              </motion.div>
            )}
          </AnimatePresence>

          {/* SIDEBAR DESKTOP (Escondida no Mobile) */}
          <div className={`hidden md:flex w-64 shrink-0 border-r p-4 flex-col gap-6 ${isDark ? "border-white/10 bg-black/20" : "border-black/5 bg-white/40"}`}>
             <div className="mt-2 px-2">
                <h2 className={`font-bold text-lg tracking-tight ${isDark ? "text-white" : "text-black"}`}>João Vilela</h2>
                <div className="flex items-center gap-2 mt-1.5">
                   <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                   </span>
                   <p className={`text-[10px] uppercase tracking-wider font-medium ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Online</p>
                </div>
             </div>

             <nav className="flex flex-col gap-1">
                <NavItem icon={<User size={18}/>} label={c.nav.bio} active={activeTab === "bio"} onClick={() => setActiveTab("bio")} isDark={isDark} />
                <NavItem icon={<FolderGit2 size={18}/>} label={c.nav.projects} active={activeTab === "projetos"} onClick={() => setActiveTab("projetos")} isDark={isDark} />
                <NavItem icon={<Code2 size={18}/>} label={c.nav.stack} active={activeTab === "skills"} onClick={() => setActiveTab("skills")} isDark={isDark} />
                <NavItem icon={<FileText size={18}/>} label={c.nav.certs} active={activeTab === "certificados"} onClick={() => setActiveTab("certificados")} isDark={isDark} />
             </nav>
          </div>

          {/* CONTEÚDO SCROLLÁVEL */}
          <div 
            className={`flex-1 min-h-0 overflow-y-auto p-4 md:p-12 scrollbar-hide pb-28 md:pb-12 z-30 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overscroll-contain`} 
            style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
            onWheel={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              
              {/* === ABA BIO === */}
              {activeTab === "bio" && (
                <motion.div key="bio" variants={contentVariant} initial="hidden" animate="visible" exit="exit" className="max-w-5xl mx-auto">
                   
                   {/* Grid Responsivo */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      
                      {/* CARD 1: Intro */}
                      <div className={`md:col-span-2 p-6 md:p-8 rounded-3xl border relative overflow-hidden flex flex-col justify-between min-h-[260px] md:min-h-[320px] ${isDark ? "border-white/10 bg-zinc-900/40" : "border-black/5 bg-white/60 shadow-sm"}`}>
                         <div className="relative z-10">
                            <p className={`text-[10px] font-mono uppercase tracking-widest mb-4 opacity-60 ${isDark ? "text-white" : "text-black"}`}>{c.bio.eyebrow}</p>
                            <h1 className={`text-5xl md:text-7xl font-serif font-medium tracking-tight mb-4 md:mb-6 ${isDark ? "text-white" : "text-black"}`}>
                               João Marcos Ferreira Vilela
                            </h1>
                            <p className={`text-base md:text-xl font-light leading-relaxed max-w-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
                               {c.bio.intro}
                            </p>
                         </div>
                      </div>

                      {/* CARD 2: Status */}
                      <div className={`md:col-span-1 p-5 md:p-6 rounded-3xl border flex flex-col gap-4 ${isDark ? "border-white/10 bg-zinc-900/40" : "border-black/5 bg-white/60 shadow-sm"}`}>
                         <div className="flex-1 space-y-5">
                            <InfoRow label={c.bio.location} value="Caruaru, PE" icon={<MapPin size={16}/>} isDark={isDark}/>
                            <InfoRow label={c.bio.age} value={`${age} ${c.bio.ageSuffix}`} icon={<CakeSlice size={16}/>} isDark={isDark}/>
                            <InfoRow label={c.bio.email} value="jaomarfervil@gmail.com" icon={<User size={16}/>} isDark={isDark} isLink/>
                            <div className="pt-2">
                               <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${isDark ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-green-600/20 bg-green-100 text-green-700"}`}>
                                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"/> {c.bio.available}
                               </span>
                            </div>
                         </div>
                         <div className="mt-auto pt-4 border-t border-dashed border-gray-500/20">
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => setOpenedProject("/Resume_Joao_Marcos_Vilela.pdf")}
                                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95 ${
                                        isDark 
                                        ? "bg-white/10 text-white hover:bg-white/20" 
                                        : "bg-black/5 text-black hover:bg-black/10"
                                    }`}
                                >
                                    {c.bio.viewCv}
                                </button>
                                <a href="/Resume_Joao_Marcos_Vilela.pdf" download className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95 ${isDark ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"}`}>
                                   <Download size={14}/> {c.bio.downloadCv}
                                </a>
                            </div>
                         </div>
                      </div>

                      {/* CARD 3: Experiência */}
                      <div className={`md:col-span-2 p-6 md:p-8 rounded-3xl border ${isDark ? "border-white/10 bg-zinc-900/40" : "border-black/5 bg-white/60 shadow-sm"}`}>
                         <div className="flex items-center gap-2 mb-8 opacity-60">
                            <Briefcase size={16}/>
                            <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-white" : "text-black"}`}>{c.bio.experience}</span>
                         </div>
                         <div className="space-y-8">
                            {c.bio.exp.map((item, i) => (
                               <React.Fragment key={item.title}>
                                  {i > 0 && <div className={`w-full h-px ${isDark ? "bg-white/10" : "bg-black/5"}`} />}
                                  <ExpItem
                                     title={item.title}
                                     year={item.year}
                                     desc={item.desc}
                                     tags={item.tags}
                                     isDark={isDark}
                                  />
                               </React.Fragment>
                            ))}
                         </div>
                      </div>

                      {/* CARD 4: Formação */}
                      <div className={`md:col-span-1 p-6 rounded-3xl border ${isDark ? "border-white/10 bg-zinc-900/40" : "border-black/5 bg-white/60 shadow-sm"}`}>
                         <div className="flex items-center gap-2 mb-8 opacity-60">
                            <GraduationCap size={16}/>
                            <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-white" : "text-black"}`}>{c.bio.education}</span>
                         </div>
                         <div className="space-y-8 relative">
                            <div className={`absolute left-[5px] top-2 bottom-2 w-px ${isDark ? "bg-white/10" : "bg-black/5"}`} />
                            {c.bio.edu.map((item, i) => (
                               <EduItem
                                  key={item.title}
                                  year={item.year}
                                  title={item.title}
                                  school={item.school}
                                  desc={item.desc}
                                  isDark={isDark}
                                  onClick={i === 1 ? () => setOpenedProject("/SANTANDERPYTHONFULL.pdf") : undefined}
                               />
                            ))}
                         </div>
                      </div>

                   </div>
                </motion.div>
              )}

              {/* --- OUTRAS ABAS --- */}
              {activeTab === "projetos" && (
                <motion.div key="projetos" variants={contentVariant} initial="hidden" animate="visible" exit="exit" className="max-w-5xl mx-auto">
                   <h2 className={`text-3xl md:text-5xl font-serif mb-8 ${isDark ? "text-white" : "text-black"}`}>{c.nav.projects}</h2>

                   {/* Sistemas que eu construi e opero. Os que tem screenshot
                       viram card; o resto fica na lista logo abaixo. */}
                   <ProjectGroup
                     title={systemsGroupTitle[lang]}
                     items={systems}
                     lang={lang}
                     isDark={isDark}
                     copy={c.projects}
                     onOpen={setOpenedProject}
                   />

                   <div className="mt-14">
                     <ProjectGroup
                       title={clientWorkGroupTitle[lang]}
                       items={clientWork}
                       lang={lang}
                       isDark={isDark}
                       copy={c.projects}
                       onOpen={setOpenedProject}
                     />
                   </div>
                </motion.div>
              )}

              {activeTab === "skills" && (
                <motion.div key="skills" variants={contentVariant} initial="hidden" animate="visible" exit="exit" className="max-w-5xl mx-auto">
                   <h2 className={`text-3xl md:text-5xl font-serif mb-8 ${isDark ? "text-white" : "text-black"}`}>{SKILLS_COPY[lang].title}</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {SKILLS_COPY[lang].categories.map((cat) => (
                         <SkillBox
                            key={cat.key}
                            icon={SKILL_ICONS[cat.key]}
                            title={cat.title}
                            items={cat.items}
                            isDark={isDark}
                         />
                      ))}
                   </div>
                </motion.div>
              )}

              {activeTab === "certificados" && (
                <motion.div key="certs" variants={contentVariant} initial="hidden" animate="visible" exit="exit" className="max-w-3xl mx-auto">
                   <h2 className={`text-3xl md:text-5xl font-serif mb-8 ${isDark ? "text-white" : "text-black"}`}>{c.bio.certs.title}</h2>
                   <div className="space-y-4">
                      {CERTIFICADOS.map((cert) => (
                        <CertItem
                          key={cert.title[lang]}
                          title={cert.title[lang]}
                          org={cert.org}
                          isDark={isDark}
                          color={cert.color}
                          year={cert.year}
                          status={cert.ongoing ? c.bio.certs.ongoing : c.bio.certs.validated}
                          onClick={() => setOpenedProject(cert.url)}
                        />
                      ))}
                   </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* DOCK MOBILE */}
          <AnimatePresence>
            {!openedProject && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-16 rounded-2xl flex items-center justify-evenly px-2 z-50 backdrop-blur-2xl border shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300"
                style={{ backgroundColor: isDark ? "rgba(20,20,20,0.85)" : "rgba(255,255,255,0.85)", borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}
              >
                <MobileNavItem icon={<User size={20}/>} label={c.nav.bio.split(" / ")[1] ?? c.nav.bio} active={activeTab === "bio"} onClick={() => setActiveTab("bio")} isDark={isDark} />
                <div className={`w-px h-6 ${isDark ? "bg-white/10" : "bg-black/5"}`} />
                <MobileNavItem icon={<FolderGit2 size={20}/>} label={c.nav.projects} active={activeTab === "projetos"} onClick={() => setActiveTab("projetos")} isDark={isDark} />
                <div className={`w-px h-6 ${isDark ? "bg-white/10" : "bg-black/5"}`} />
                <MobileNavItem icon={<Code2 size={20}/>} label="Skills" active={activeTab === "skills"} onClick={() => setActiveTab("skills")} isDark={isDark} />
                <div className={`w-px h-6 ${isDark ? "bg-white/10" : "bg-black/5"}`} />
                <MobileNavItem icon={<FileText size={20}/>} label={c.nav.certs} active={activeTab === "certificados"} onClick={() => setActiveTab("certificados")} isDark={isDark} />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </motion.div>
  );
}

// --- SUB-COMPONENTES ---

function PdfViewer({ file, setCursorVisible, isDark }: { file: string; setCursorVisible: (visible: boolean) => void; isDark: boolean }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isWorkerReady, setIsWorkerReady] = useState(false);
  const { width, ref } = useResizeDetector({
    handleHeight: false,
    refreshMode: 'debounce',
    refreshRate: 100,
  });

  useEffect(() => {
    import('react-pdf').then((module) => {
      const pdfjs = module.pdfjs;
      pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      setIsWorkerReady(true);
    });
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  if (!isWorkerReady) {
    return <div className={`${isDark ? 'text-white' : 'text-black'} text-center p-8 font-mono`}>Inicializando visualizador...</div>;
  }

  return (
    <div 
      ref={ref}
      className={`flex-1 w-full h-full min-h-0 overflow-y-auto overscroll-contain p-2 md:p-4 pointer-events-auto ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}
      onMouseEnter={() => setCursorVisible(false)}
      onMouseLeave={() => setCursorVisible(true)}
      onWheel={(e) => e.stopPropagation()}
    >
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div className={`${isDark ? 'text-white' : 'text-black'} text-center p-8 font-mono`}>Carregando PDF...</div>}
        error={<div className="text-red-500 text-center p-8 font-mono">Falha ao carregar o PDF. Por favor, tente baixar o CV.</div>}
        className="flex flex-col items-center"
      >
        {Array.from(new Array(numPages || 0), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={width ? Math.min(width, 800) : undefined}
            className="mb-4 shadow-lg"
          />
        ))}
      </Document>
    </div>
  );
}

/**
 * Um grupo de projetos. Quem tem screenshot vira card com a imagem; quem nao
 * tem cai numa lista de texto logo abaixo — placeholder cinza nao prova nada
 * e ainda ocupa o espaco que o card com prova real ocuparia.
 */
function ProjectGroup({ title, items, lang, isDark, copy, onOpen }: {
  title: string;
  items: SystemItem[];
  lang: Language;
  isDark: boolean;
  copy: { openApp: string; code: string; live: string; private: string };
  onOpen: (url: string) => void;
}) {
   const withImage = items.filter((i) => i.image);
   const listed = items.filter((i) => !i.image);

   return (
      <div>
         <h3 className={`font-mono text-[11px] uppercase tracking-[0.18em] mb-4 ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
            {title}
         </h3>

         {withImage.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               {withImage.map((item) => (
                  <div key={item.name} className={`group rounded-3xl overflow-hidden border flex flex-col ${isDark ? "border-white/10 bg-zinc-900/40" : "border-black/5 bg-white/60 shadow-sm"}`}>
                     <div className="relative h-56 bg-zinc-800">
                        <Image src={item.image!} alt={item.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                     </div>
                     <div className="p-6 md:p-8 flex flex-col flex-1">
                        <h4 className={`text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-black"}`}>{item.name}</h4>
                        <p className={`text-sm mb-6 leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{item.desc[lang]}</p>
                        <div className="mt-auto flex flex-wrap items-center gap-3 justify-between">
                           <span className={`text-[10px] px-3 py-1.5 rounded-full border uppercase tracking-wider font-medium ${isDark ? "border-white/20 text-zinc-300" : "border-black/10 text-zinc-600"}`}>
                              {item.tech}
                           </span>
                           <span className="flex items-center gap-3">
                              {item.repo && (
                                 <a href={item.repo} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] uppercase tracking-wider text-accent hover:underline">{copy.code}</a>
                              )}
                              {item.live && (
                                 <button
                                    onClick={() => onOpen(item.live!)}
                                    className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all border ${isDark ? "bg-zinc-800 text-white border-white/10 hover:bg-zinc-700" : "bg-black text-white border-transparent hover:bg-zinc-800"}`}
                                 >
                                    {copy.openApp} <ExternalLink size={12} />
                                 </button>
                              )}
                           </span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         )}

         {listed.length > 0 && (
            <ul className={`border-t ${isDark ? "border-white/10" : "border-black/10"}`}>
               {listed.map((item) => (
                  <li key={item.name} className={`py-4 border-b ${isDark ? "border-white/10" : "border-black/10"}`}>
                     <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                        <span className={`text-base font-medium ${isDark ? "text-white" : "text-black"}`}>{item.name}</span>
                        <span className="font-mono text-[11px] text-zinc-500">{item.tech}</span>
                        <span className="ml-auto flex items-center gap-3">
                           {item.repo ? (
                              <a href={item.repo} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] uppercase tracking-wider text-accent hover:underline">{copy.code}</a>
                           ) : (
                              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{copy.private}</span>
                           )}
                           {item.live && (
                              <a href={item.live} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] uppercase tracking-wider text-accent hover:underline">{copy.live}</a>
                           )}
                        </span>
                     </div>
                     <p className={`text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{item.desc[lang]}</p>
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}

function NavItem({ icon, label, active, onClick, isDark }: any) {
   return (
      <button onClick={onClick} className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium w-full text-left ${active ? isDark ? "bg-zinc-800 text-white shadow-lg border border-white/10" : "bg-black text-white shadow-lg" : isDark ? "text-zinc-400 hover:bg-white/10" : "text-zinc-600 hover:bg-black/5"}`}>
         {icon} {label}
         {active && <ChevronRight size={14} className="ml-auto opacity-50"/>}
      </button>
   )
}

function MobileNavItem({ icon, label, active, onClick, isDark }: any) {
   return (
      <button onClick={onClick} className={`relative flex flex-col items-center justify-center w-16 h-12 gap-1 rounded-xl transition-all ${active ? isDark ? "text-white" : "text-black scale-110" : isDark ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"}`}>
         {active && <motion.div layoutId="activeTab" className={`absolute inset-0 rounded-xl ${isDark ? "bg-white/10" : "bg-black/10"}`} />}
         {icon}
         <span className="text-[9px] font-medium tracking-wide">{label}</span>
      </button>
   )
}

function InfoRow({ label, value, icon, isDark, isLink }: any) {
   return (
      <div>
         <p className={`text-[10px] uppercase tracking-wider mb-1 opacity-50 ${isDark ? "text-white" : "text-black"}`}>{label}</p>
         <div className={`flex items-center gap-2 font-medium ${isDark ? "text-white" : "text-black"} ${isLink ? "text-sm truncate" : ""}`}>
            {icon} {value}
         </div>
      </div>
   )
}

function ExpItem({ title, year, desc, tags, isDark }: any) {
   return (
      <div className="group">
         <div className="flex justify-between items-baseline gap-3 mb-1">
            <h4 className={`text-base md:text-lg font-serif ${isDark ? "text-white" : "text-black"}`}>{title}</h4>
            <span className={`shrink-0 whitespace-nowrap text-[10px] font-mono px-2 py-0.5 rounded ${isDark ? "bg-white/10 text-zinc-300" : "bg-black/5 text-zinc-600"}`}>{year}</span>
         </div>
         <p className={`text-xs md:text-sm leading-relaxed mb-3 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{desc}</p>
         <div className="flex gap-2">
            {tags.map((t: string) => (
               <span key={t} className={`text-[9px] px-2 py-0.5 rounded border ${isDark ? "border-white/10 text-zinc-500" : "border-black/10 text-zinc-500"}`}>{t}</span>
            ))}
         </div>
      </div>
   )
}

function EduItem({ year, title, school, desc, isDark, onClick }: any) {
   const content = (
      <>
         <div className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 ${isDark ? "border-white bg-black" : "border-black bg-white"}`} />
         <span className={`text-[10px] font-mono opacity-50 block mb-0.5 ${isDark ? "text-white" : "text-black"}`}>{year}</span>
         <strong className={`block text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>{title}</strong>
         <span className={`text-xs opacity-70 block ${isDark ? "text-zinc-300" : "text-zinc-500"}`}>{school}</span>
         {desc && <p className={`text-xs mt-1 leading-snug ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{desc}</p>}
      </>
   );

   if (onClick) {
      return (
         <button onClick={onClick} className={`relative pl-6 text-left w-full rounded-lg p-2 -ml-2 transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
            {content}
            <ExternalLink size={12} className={`absolute top-2 right-2 opacity-30 ${isDark ? "text-white" : "text-black"}`} />
         </button>
      )
   }

   return (
      <div className="relative pl-6">
         {content}
      </div>
   )
}

function SkillBox({ icon, title, items, isDark }: any) {
   const [selectedSkill, setSelectedSkill] = useState<{ name: string; description: string; } | null>(null);

   return (
      <div className={`p-6 rounded-3xl border transition-all ${isDark ? "border-white/10 bg-zinc-900/40" : "border-black/5 bg-white/60"}`}>
         <div className={`mb-4 ${isDark ? "text-white" : "text-black"}`}>{icon}</div>
         <h3 className={`font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>{title}</h3>
         <div className="flex flex-wrap gap-2">
            {items.map((skill: { name: string; description: string; }) => (
              <button 
                key={skill.name} 
                onClick={() => setSelectedSkill(selectedSkill?.name === skill.name ? null : skill)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                  selectedSkill?.name === skill.name
                    ? 'bg-sky-500 text-white shadow-md'
                    : isDark 
                        ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" 
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {skill.name}
              </button>
            ))}
         </div>
         <AnimatePresence>
            {selectedSkill && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '16px' }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className={`p-4 rounded-lg text-xs leading-relaxed border ${isDark ? 'bg-black/20 border-white/10 text-zinc-300' : 'bg-black/5 border-black/5 text-zinc-700'}`}>
                  <p>{selectedSkill.description}</p>
                </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>
   )
}

// Sem default em `status` e `year` de proposito: um certificado sem rotulo de
// idioma cairia em portugues fixo, que e justamente o bug que a aba tinha.
function CertItem({ title, org, isDark, color, status, year, onClick }: any) {
   return (
      <button onClick={onClick} className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all hover:scale-[1.01] text-left ${isDark ? "border-white/10 bg-zinc-900/40 hover:bg-zinc-800/60" : "border-black/5 bg-white/60 hover:bg-zinc-100"}`}>
         <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-[10px] shadow-sm shrink-0 ${
            color === 'red' ? 'bg-red-500' :
            color === 'orange' ? 'bg-orange-500' :
            color === 'crimson' ? 'bg-[#A51C30]' :
            'bg-blue-500'
         }`}>{org.substring(0,2)}</div>
         <div className="flex-1 min-w-0">
            <h4 className={`font-bold text-sm truncate ${isDark ? "text-white" : "text-black"}`}>{title}</h4>
            <p className="text-xs opacity-60">{status} • {year}</p>
         </div>
         <ExternalLink size={14} className={`ml-auto opacity-30 shrink-0 ${isDark ? "text-white" : "text-black"}`} />
      </button>
   )
}