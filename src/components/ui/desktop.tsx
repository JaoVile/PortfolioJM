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
  Wrench
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

import { PROJECTS as BASE_PROJECTS } from "@/lib/projects";

const PROJECTS = [
  ...BASE_PROJECTS,
  {
    title: "Gnomon",
    desc: "PWA de navegação indoor para o campus universitário. Solução completa de mapas digitais interativos e autônomos.",
    tech: "React • Python • FastAPI",
    image: "/projects/gnomon.png",
    url: "https://white-gate-478903-h3.web.app"
  }
];

// --- DADOS ---
const SKILLS_DATA = {
  frontend: [
    { name: "React", description: "Biblioteca JavaScript para criar interfaces de usuário interativas e componentizadas, amplamente utilizada para Single-Page Applications (SPAs)." },
    { name: "Next.js", description: "Framework React para produção, que oferece renderização do lado do servidor (SSR), geração de sites estáticos (SSG) e otimizações de performance." },
    { name: "TypeScript", description: "Superset do JavaScript que adiciona tipagem estática opcional, melhorando a robustez e a manutenibilidade do código em grandes projetos." },
    { name: "JavaScript", description: "Linguagem de programação fundamental da web, essencial para criar interatividade e dinamismo em páginas e aplicações." },
    { name: "HTML5", description: "Linguagem de marcação padrão para a criação de páginas web, definindo a estrutura e o conteúdo semântico." },
    { name: "CSS3", description: "Linguagem de folha de estilos usada para descrever a apresentação de um documento escrito em HTML, controlando layout, cores e fontes." },
    { name: "Tailwind CSS", description: "Framework CSS utility-first que permite construir designs customizados rapidamente sem sair do HTML, aplicando classes utilitárias." },
  ],
  backend: [
    { name: "Python", description: "Linguagem de programação versátil e de alto nível, conhecida por sua sintaxe clara e legibilidade, amplamente usada em desenvolvimento web e ciência de dados." },
    { name: "FastAPI", description: "Framework web moderno e de alta performance para Python, ideal para construir APIs rápidas com tipagem de dados e documentação automática (Swagger)." },
    { name: "Node.js", description: "Ambiente de execução JavaScript no lado do servidor, permitindo a construção de aplicações de rede escaláveis e eficientes." },
    { name: "Java", description: "Linguagem de programação robusta, orientada a objetos e independente de plataforma, amplamente utilizada em sistemas corporativos e aplicações Android." },
    { name: "POO", description: "Programação Orientada a Objetos: um paradigma de programação baseado no conceito de 'objetos', que podem conter dados e código." },
    { name: "APIs REST", description: "Padrão de arquitetura para a criação de web services, focando na escalabilidade, simplicidade e na comunicação stateless entre cliente e servidor." },
  ],
  databases: [
    { name: "PostgreSQL", description: "Sistema de gerenciamento de banco de dados relacional de código aberto, conhecido por sua robustez, extensibilidade e conformidade com o padrão SQL." },
    { name: "MongoDB", description: "Banco de dados NoSQL orientado a documentos, que armazena dados em estruturas flexíveis do tipo JSON, ideal para aplicações escaláveis e ágeis." },
    { name: "SQL", description: "Linguagem de consulta estruturada, padrão para gerenciar e manipular dados em bancos de dados relacionais." },
    { name: "NoSQL", description: "Categoria de bancos de dados que não utilizam o modelo relacional tradicional, oferecendo maior flexibilidade e escalabilidade para grandes volumes de dados." },
  ],
  devops: [
    { name: "Docker", description: "Plataforma para desenvolver, implantar e executar aplicações em contêineres, garantindo consistência de ambiente e portabilidade." },
    { name: "AWS", description: "Amazon Web Services: plataforma de computação em nuvem que oferece uma vasta gama de serviços, como EC2 (computação) e S3 (armazenamento)." },
    { name: "Git", description: "Sistema de controle de versão distribuído, essencial para o rastreamento de alterações no código-fonte durante o desenvolvimento de software." },
    { name: "GitHub", description: "Plataforma de hospedagem de código-fonte com controle de versão usando Git, facilitando a colaboração e o gerenciamento de projetos." },
  ],
  tools: [
    { name: "VS Code", description: "Editor de código-fonte leve e poderoso da Microsoft, com suporte a depuração, controle Git integrado e um vasto ecossistema de extensões." },
    { name: "Postman", description: "Plataforma de colaboração para desenvolvimento de APIs, utilizada para projetar, testar, documentar e monitorar APIs RESTful." },
    { name: "Swagger", description: "Ferramenta para projetar, construir, documentar e consumir serviços web RESTful, gerando documentação interativa automaticamente." },
    { name: "Scrum", description: "Framework ágil para gerenciamento de projetos complexos, focado em entregas incrementais e colaboração em equipe." },
  ]
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
  setCursorVisible,
  initialTab = "bio",
  initialProject = null,
}: {
  onClose: () => void;
  theme: "light" | "dark";
  setCursorVisible: (visible: boolean) => void;
  initialTab?: "bio" | "projetos" | "skills" | "certificados";
  initialProject?: string | null;
}) {
  const isDark = theme === "dark";
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
                           setOpenedProject("/curriculo-joao-vilela.pdf"); // Muda o iframe interno para o Currículo
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
                <NavItem icon={<User size={18}/>} label="Perfil / Bio" active={activeTab === "bio"} onClick={() => setActiveTab("bio")} isDark={isDark} />
                <NavItem icon={<FolderGit2 size={18}/>} label="Projetos" active={activeTab === "projetos"} onClick={() => setActiveTab("projetos")} isDark={isDark} />
                <NavItem icon={<Code2 size={18}/>} label="Tech Stack" active={activeTab === "skills"} onClick={() => setActiveTab("skills")} isDark={isDark} />
                <NavItem icon={<FileText size={18}/>} label="Certificados" active={activeTab === "certificados"} onClick={() => setActiveTab("certificados")} isDark={isDark} />
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
                            <p className={`text-[10px] font-mono uppercase tracking-widest mb-4 opacity-60 ${isDark ? "text-white" : "text-black"}`}>// Perfil</p>
                            <h1 className={`text-5xl md:text-7xl font-serif font-medium tracking-tight mb-4 md:mb-6 ${isDark ? "text-white" : "text-black"}`}>
                               João Marcos Ferreira Vilela
                            </h1>
                            <p className={`text-base md:text-xl font-light leading-relaxed max-w-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
                               Desenvolvedor <strong>Full Stack</strong> especializado em ecossistemas back-end com <span className="underline decoration-1 underline-offset-4 decoration-blue-500/50">Python</span> (FastAPI) e na construção de interfaces reativas com <span className="underline decoration-1 underline-offset-4 decoration-purple-500/50">React</span> e TypeScript.
                            </p>
                         </div>
                      </div>

                      {/* CARD 2: Status */}
                      <div className={`md:col-span-1 p-5 md:p-6 rounded-3xl border flex flex-col gap-4 ${isDark ? "border-white/10 bg-zinc-900/40" : "border-black/5 bg-white/60 shadow-sm"}`}>
                         <div className="flex-1 space-y-5">
                            <InfoRow label="Localização" value="Caruaru, PE" icon={<MapPin size={16}/>} isDark={isDark}/>
                            <InfoRow label="Idade" value={`${age} anos`} icon={<CakeSlice size={16}/>} isDark={isDark}/>
                            <InfoRow label="Email" value="jaomarfervil@gmail.com" icon={<User size={16}/>} isDark={isDark} isLink/>
                            <div className="pt-2">
                               <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${isDark ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-green-600/20 bg-green-100 text-green-700"}`}>
                                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"/> Disponível
                               </span>
                            </div>
                         </div>
                         <div className="mt-auto pt-4 border-t border-dashed border-gray-500/20">
                            <a href="/curriculo-joao-vilela.pdf" download className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95 ${isDark ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"}`}>
                               <Download size={14}/> Baixar CV
                            </a>
                         </div>
                      </div>

                      {/* CARD 3: Projetos em Destaque */}
                      <div className={`md:col-span-2 p-6 md:p-8 rounded-3xl border ${isDark ? "border-white/10 bg-zinc-900/40" : "border-black/5 bg-white/60 shadow-sm"}`}>
                         <div className="flex items-center gap-2 mb-8 opacity-60">
                            <Briefcase size={16}/>
                            <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-white" : "text-black"}`}>Projetos em Destaque</span>
                         </div>
                         <div className="space-y-8">
                            <ExpItem 
                               title="Gnomon - PWA de Navegação Acadêmica" 
                               year="2025" 
                               desc="Liderei o desenvolvimento de um PWA (TCC) para navegação no campus, sendo responsável pela arquitetura, 50% do design, e o desenvolvimento full-stack. Criei a API REST e a interface em React para oferecer um mapa interativo e autônomo aos alunos."
                               tags={["React", "TypeScript", "PWA", "API REST", "Swagger"]}
                               isDark={isDark}
                            />
                            <div className={`w-full h-px ${isDark ? "bg-white/10" : "bg-black/5"}`} />
                            <ExpItem 
                               title="Mundo Manso - App de Bem-Estar Infantil" 
                               year="2025" 
                               desc="Como principal contribuidor (66% do projeto), desenvolvi o back-end em Java e estruturei o banco de dados (MySQL) para um aplicativo focado em conteúdo digital saudável para crianças, aplicando Padrões de Projeto para garantir uma base segura e robusta."
                               tags={["Java", "MySQL", "Design Patterns", "Trabalho em Equipe"]}
                               isDark={isDark}
                            />
                         </div>
                      </div>

                      {/* CARD 4: Formação */}
                      <div className={`md:col-span-1 p-6 rounded-3xl border ${isDark ? "border-white/10 bg-zinc-900/40" : "border-black/5 bg-white/60 shadow-sm"}`}>
                         <div className="flex items-center gap-2 mb-8 opacity-60">
                            <GraduationCap size={16}/>
                            <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-white" : "text-black"}`}>Educação</span>
                         </div>
                         <div className="space-y-8 relative">
                            <div className={`absolute left-[5px] top-2 bottom-2 w-px ${isDark ? "bg-white/10" : "bg-black/5"}`} />
                            <EduItem 
                               year="2024-2025" 
                               title="Análise e Des. de Sistemas" 
                               school="UNINASSAU" 
                               desc="Base sólida em engenharia de software, lógica, POO e bancos de dados (SQL/NoSQL). Aplicação prática de metodologias ágeis (Scrum), QA, Docker e Git."
                               isDark={isDark} 
                            />
                            <EduItem 
                               year="2025" 
                               title="Bootcamp Python Back-end" 
                               school="DIO & Santander" 
                               desc="Formação intensiva (58h) focada em APIs com Python, FastAPI, Docker e bancos de dados."
                               isDark={isDark} 
                               onClick={() => setOpenedProject("/SANTANDERPYTHONFULL.pdf")}
                            />
                         </div>
                      </div>

                   </div>
                </motion.div>
              )}

              {/* --- OUTRAS ABAS --- */}
              {activeTab === "projetos" && (
                <motion.div key="projetos" variants={contentVariant} initial="hidden" animate="visible" exit="exit" className="max-w-5xl mx-auto">
                   <h2 className={`text-3xl md:text-5xl font-serif mb-8 ${isDark ? "text-white" : "text-black"}`}>Projetos</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {PROJECTS.map((project, i) => (
                       <div key={i} className={`group rounded-3xl overflow-hidden border flex flex-col ${isDark ? "border-white/10 bg-zinc-900/40" : "border-black/5 bg-white/60 shadow-sm"}`}>
                         <div className="relative h-56 bg-zinc-800">
                           <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                         </div>
                         <div className="p-6 md:p-8 flex flex-col flex-1">
                           <div className="flex justify-between items-start mb-3">
                              <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}>{project.title}</h3>
                           </div>
                           <p className={`text-sm mb-6 leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{project.desc}</p>
                           <div className="mt-auto flex items-center justify-between">
                              <span className={`text-[10px] px-3 py-1.5 rounded-full border uppercase tracking-wider font-medium ${isDark ? "border-white/20 text-zinc-300" : "border-black/10 text-zinc-600"}`}>
                                 {project.tech}
                              </span>
                              <button 
                                 onClick={() => setOpenedProject(project.url)}
                                 className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all border ${isDark ? "bg-zinc-800 text-white border-white/10 hover:bg-zinc-700" : "bg-black text-white border-transparent hover:bg-zinc-800"}`}
                              >
                                 Abrir App <ExternalLink size={12} />
                              </button>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                </motion.div>
              )}

              {activeTab === "skills" && (
                <motion.div key="skills" variants={contentVariant} initial="hidden" animate="visible" exit="exit" className="max-w-5xl mx-auto">
                   <h2 className={`text-3xl md:text-5xl font-serif mb-8 ${isDark ? "text-white" : "text-black"}`}>Competências Técnicas</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                      <SkillBox icon={<Cpu/>} title="Front-end" items={SKILLS_DATA.frontend} isDark={isDark}/>
                      <SkillBox icon={<Terminal/>} title="Back-end" items={SKILLS_DATA.backend} isDark={isDark}/>
                      <SkillBox icon={<Database/>} title="Bancos de Dados" items={SKILLS_DATA.databases} isDark={isDark}/>
                      <SkillBox icon={<Cloud/>} title="DevOps & Cloud" items={SKILLS_DATA.devops} isDark={isDark}/>
                      <SkillBox icon={<Wrench/>} title="Ferramentas & Metodologias" items={SKILLS_DATA.tools} isDark={isDark}/>
                   </div>
                </motion.div>
              )}

              {activeTab === "certificados" && (
                <motion.div key="certs" variants={contentVariant} initial="hidden" animate="visible" exit="exit" className="max-w-3xl mx-auto">
                   <h2 className={`text-3xl md:text-5xl font-serif mb-8 ${isDark ? "text-white" : "text-black"}`}>Certificações</h2>
                   <div className="space-y-4">
                      <CertItem 
                        title="Oracle Cloud Infrastructure 2025 Certified Generative AI Professional" 
                        org="Oracle" 
                        isDark={isDark} 
                        color="red" 
                        onClick={() => setOpenedProject("https://catalog-education.oracle.com/ords/certview/sharebadge?id=555B238D8DBE9D841D2528092600DAE321EF664454CC2F03264A9FC1FC8B033D")}
                      />
                      <CertItem 
                        title="AWS Educate Introduction to Cloud 101" 
                        org="AWS" 
                        isDark={isDark} 
                        color="orange" 
                        onClick={() => setOpenedProject("https://www.credly.com/badges/fee549a9-9290-49a2-8c9f-ee4acbd0f3e3")}
                      />
                      <CertItem 
                        title="Introdução ao AZ-900 com a Microsoft" 
                        org="Microsoft" isDark={isDark} color="blue" 
                        onClick={() => setOpenedProject("/AZURE900.pdf")}
                      />
                      <CertItem 
                        title="Introdução Prática ao Azure AI e Azure OpenAI Models" 
                        org="Microsoft" isDark={isDark} color="blue" 
                        onClick={() => setOpenedProject("/OPENAIAZURE.pdf")}
                      />
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
                <MobileNavItem icon={<User size={20}/>} label="Bio" active={activeTab === "bio"} onClick={() => setActiveTab("bio")} isDark={isDark} />
                <div className={`w-px h-6 ${isDark ? "bg-white/10" : "bg-black/5"}`} />
                <MobileNavItem icon={<FolderGit2 size={20}/>} label="Projetos" active={activeTab === "projetos"} onClick={() => setActiveTab("projetos")} isDark={isDark} />
                <div className={`w-px h-6 ${isDark ? "bg-white/10" : "bg-black/5"}`} />
                <MobileNavItem icon={<Code2 size={20}/>} label="Skills" active={activeTab === "skills"} onClick={() => setActiveTab("skills")} isDark={isDark} />
                <div className={`w-px h-6 ${isDark ? "bg-white/10" : "bg-black/5"}`} />
                <MobileNavItem icon={<FileText size={20}/>} label="Certificados" active={activeTab === "certificados"} onClick={() => setActiveTab("certificados")} isDark={isDark} />
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
         <div className="flex justify-between items-baseline mb-1">
            <h4 className={`text-base md:text-lg font-serif ${isDark ? "text-white" : "text-black"}`}>{title}</h4>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isDark ? "bg-white/10 text-zinc-300" : "bg-black/5 text-zinc-600"}`}>{year}</span>
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
                className={`text-[10px] px-2.5 py-1 rounded-md border transition-all ${
                  selectedSkill?.name === skill.name
                    ? isDark ? 'bg-blue-500/20 border-blue-500 text-white' : 'bg-blue-500 text-white border-blue-500'
                    : isDark ? "border-white/10 bg-white/5 text-zinc-300 hover:border-white/20" : "border-black/10 bg-white/50 text-zinc-700 hover:bg-black/5"
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

function CertItem({ title, org, isDark, color, onClick }: any) {
   return (
      <button onClick={onClick} className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all hover:scale-[1.01] text-left ${isDark ? "border-white/10 bg-zinc-900/40 hover:bg-zinc-800/60" : "border-black/5 bg-white/60 hover:bg-zinc-100"}`}>
         <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-[10px] shadow-sm shrink-0 ${
            color === 'red' ? 'bg-red-500' :
            color === 'orange' ? 'bg-orange-500' :
            'bg-blue-500'
         }`}>{org.substring(0,2)}</div>
         <div className="flex-1 min-w-0">
            <h4 className={`font-bold text-sm truncate ${isDark ? "text-white" : "text-black"}`}>{title}</h4>
            <p className="text-xs opacity-60">Validado • 2025</p>
         </div>
         <ExternalLink size={14} className={`ml-auto opacity-30 shrink-0 ${isDark ? "text-white" : "text-black"}`} />
      </button>
   )
}