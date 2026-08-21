"use client";

import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { LenisContext } from "@/context/LenisContext";
import { Cloud1, Cloud2, Cloud3 } from "@/components/ui/CloudIcons";
import { ArrowUpRight, Download, Github, Linkedin, Instagram, Phone } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from "framer-motion";
import { GlobalNav } from "@/components/ui/global-nav";
import { translations, Language } from "@/lib/translations";
import { Preloader } from "@/components/ui/preloader";
import { NavigationDots } from "@/components/ui/navigation-dots";
import { BranchVisual } from "@/components/ui/BranchVisual";
import { BranchVisualMobile } from "@/components/ui/BranchVisualMobile";
import { ContactAnimation } from "@/components/ui/ContactAnimation";
import { Footer } from "@/components/ui/footer";
import { RotationLock } from "@/components/ui/RotationLock";
import { clientWork } from "@/lib/content/work";
import { disciplines } from "@/lib/content/process";
import { OperationsSection } from "@/components/sections/Operations";
import { MethodSection } from "@/components/sections/Method";
import { CaseStudies } from "@/components/sections/CaseStudies";

const OSDesktop = dynamic(() => import("@/components/ui/desktop").then(mod => mod.OSDesktop), { ssr: false });

// --- COMPONENTES VISUAIS EXTRAS ---

const NoiseOverlay = React.memo(() => (
  <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-overlay"
       style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
  </div>
));
NoiseOverlay.displayName = 'NoiseOverlay';

const CustomCursor = React.memo(({ isVisible }: { isVisible: boolean }) => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX - 8);
      mouseY.set(e.clientY - 8);
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  const springConfig = { type: "spring", stiffness: 500, damping: 28 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  if (!isVisible) return null;

  return (
    <motion.div
      className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-9999 mix-blend-difference bg-white hidden md:block`}
      style={{ x: smoothX, y: smoothY }}
    />
  );
});
CustomCursor.displayName = 'CustomCursor';


const ThemeTransition = React.memo(({ isVisible, targetTheme }: { isVisible: boolean; targetTheme: "light" | "dark" | null }) => {
  return (
    <AnimatePresence>
      {isVisible && targetTheme && (
        <motion.div
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`fixed inset-0 z-9999 pointer-events-none ${
            targetTheme === "dark" ? "bg-[#0a0a0a]" : "bg-white"
          }`}
        />
      )}
    </AnimatePresence>
  );
});
ThemeTransition.displayName = 'ThemeTransition';



// --- COPY DAS SECOES HERDADAS ---
// O texto delas estava fixo em portugues no JSX, embora `translations.tsx` e o
// estado `lang` ja existissem. Fica aqui, ao lado de quem usa, ate valer a pena
// mover pro arquivo de traducao junto com o resto.

const HERO_COPY = {
  en: { role: "DEVOPS · FULL-STACK · AI ENGINEERING /", spec: "I BUILD IT, I SHIP IT, I KEEP IT RUNNING." },
  pt: { role: "DEVOPS · FULL-STACK · ENGENHARIA DE IA /", spec: "EU CONSTRUO, EU SUBO, EU MANTENHO NO AR." },
} as const;

const ABOUT_COPY = {
  en: {
    eyebrow: "ABOUT ME",
    title: "I keep production systems running, and I automate the work that used to be manual.",
    text: "I take care of production systems that integrate third-party APIs and automate business processes \u2014 daily reports, billing, customer support. My focus is reducing manual work and making sure that what's running in production stays running. Every system I run has a health check, a backup, or a dry run.",
    disciplines: "WHERE I WORK",
    more: "MORE ABOUT ME",
    cv: "DOWNLOAD CV",
  },
  pt: {
    eyebrow: "SOBRE MIM",
    title: "Eu mantenho sistemas em producao no ar, e automatizo o que antes era feito na mao.",
    text: "Cuido de sistemas em producao que integram APIs de terceiros e automatizam processos de negocio \u2014 relatorios diarios, cobranca, atendimento. Meu foco e reduzir trabalho manual e garantir que o que esta rodando em producao continue rodando. Todo sistema que eu opero tem health check, backup ou dry run.",
    disciplines: "ONDE EU ATUO",
    more: "SAIBA MAIS",
    cv: "BAIXAR CV",
  },
} as const;

const WORKS_COPY = {
  en: {
    eyebrow: "BUILT AND OPERATED",
    title: "Selected Work",
    client: "CLIENT WORK",
    all: "SEE EVERYTHING",
  },
  pt: {
    eyebrow: "CONSTRUIDO E OPERADO",
    title: "Trabalhos Selecionados",
    client: "TRABALHO PARA CLIENTE",
    all: "VER TUDO",
  },
} as const;

const CONTACT_COPY = {
  en: { eyebrow: "GET IN TOUCH" },
  pt: { eyebrow: "ENTRE EM CONTATO" },
} as const;

// --- SECTIONS ---

const HeroSection = ({ theme, lang, toggleTheme }: { theme: "light" | "dark", lang: Language, toggleTheme: () => void }) => {
  const ref = useRef(null);
  const isDark = theme === "dark";
  const [stars, setStars] = useState<Array<{ top: string; left: string; width: string; height: string; opacity: number; animationDuration: string }>>([]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    setStars([...Array(20)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      opacity: Math.random() * 0.5 + 0.2,
      animationDuration: `${Math.random() * 3 + 2}s`
    })));
  }, []);

  const useParallax = (depth: number) => {
    const x = useTransform(mouseX, (val) => val * depth * 100);
    const y = useTransform(mouseY, (val) => val * depth * 100);
    return { x, y };
  };

  const parallaxStars = useParallax(0.1);
  const parallax015 = useParallax(0.15);
  const parallax03 = useParallax(0.3);
  const parallax035 = useParallax(0.35);
  const parallax04 = useParallax(0.4);
  const parallax05 = useParallax(0.5);
  const parallax06 = useParallax(0.6);
  const parallax065 = useParallax(0.65);
  const parallax07 = useParallax(0.7);
  const parallax08 = useParallax(0.8);
  const parallax09 = useParallax(0.9);

  return (
    <motion.section 
      ref={ref}
      style={{ y, opacity }}
      className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center select-none px-6 md:px-12 transition-colors duration-700 ${isDark ? "bg-linear-to-b from-[#000124] via-[#0a0a0a] to-[#0a0a0a]" : "bg-linear-to-b from-sky-200 via-sky-50 to-white"}`}
    >
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="order-2 md:order-1 relative z-30 -mt-10 sm:-mt-28 md:mt-0">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
                    <h1 className={`text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tighter mb-6 transition-colors duration-700 ${isDark ? "text-white" : "text-[#1a1a1a]"}`}>
                    JOÃO<br />VILELA
                    </h1>
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8, ease: "circOut" }} className={`w-24 h-1 mb-6 origin-left transition-colors duration-700 ${isDark ? "bg-white" : "bg-[#1a1a1a]"}`} />
                    <p className={`text-sm md:text-base font-mono tracking-[0.2em] uppercase max-w-md transition-colors duration-700 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {HERO_COPY[lang].role}<br />{HERO_COPY[lang].spec}
                    </p>
                </motion.div>
            </div>
            <div className="order-1 md:order-2 relative flex items-center justify-center h-87.5 sm:h-125 md:h-175">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} className="relative w-[85vw] h-[85vw] sm:w-125 sm:h-125 md:w-175 md:h-175 flex items-center justify-center">
                    {isDark && <motion.div className="absolute inset-[-20%] z-0" style={parallaxStars}>
                        {stars.map((star, i) => (
                            <div key={i} className="absolute bg-white rounded-full animate-pulse" style={{ top: star.top, left: star.left, width: star.width, height: star.height, opacity: star.opacity, animationDuration: star.animationDuration }} />
                        ))}
                    </motion.div>}
                    <motion.div className="absolute inset-[-10%] z-0 opacity-20 pointer-events-none" style={parallax015}>
                        <svg className="w-full h-full" viewBox="0 0 100 100" overflow="visible">
                            <circle cx="10" cy="20" r="0.5" fill={isDark ? "white" : "#1a1a1a"} />
                            <circle cx="90" cy="80" r="0.5" fill={isDark ? "white" : "#1a1a1a"} />
                            <path d="M -10 50 Q 25 20 50 50 T 110 50" fill="none" stroke={isDark ? "white" : "#1a1a1a"} strokeWidth="0.1" strokeDasharray="1 1" />
                            <rect x="80" y="10" width="4" height="4" stroke={isDark ? "white" : "#1a1a1a"} strokeWidth="0.1" fill="none" transform="rotate(15)" />
                            <path d="M 20 80 L 30 90 M 30 80 L 20 90" stroke={isDark ? "white" : "#1a1a1a"} strokeWidth="0.1" />
                        </svg>
                    </motion.div>
                    <motion.div className="absolute -top-10 -left-20 z-10 opacity-30" style={parallax03}><Cloud3 className={`w-80 h-56 blur-0 md:blur-[2px] transition-colors duration-700 ${isDark ? "text-gray-600" : "text-white md:drop-shadow-md"}`} /></motion.div>
                    <motion.div className="absolute -top-32 right-0 z-10 opacity-20" style={parallax035}><Cloud2 className={`w-64 h-40 blur-0 md:blur-[2px] transition-colors duration-700 ${isDark ? "text-gray-700" : "text-sky-50"}`} /></motion.div>
                    <motion.div className="absolute -bottom-20 -right-20 z-10 opacity-30" style={parallax04}><Cloud1 className={`w-125 h-87.5 blur-0 md:blur-[1px] transition-colors duration-700 ${isDark ? "text-gray-500" : "text-white"}`} /></motion.div>
                    <motion.div className="absolute z-20 flex items-center justify-center pointer-events-none" style={parallax05}>
                        <div className={`relative flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-500 ease-in-out scale-100 opacity-100 rotate-0 md:hover:scale-105`} onClick={toggleTheme}>
                            <div className={`absolute w-[110%] h-[110%] rounded-full border opacity-60 animate-[spin_60s_linear_infinite] transition-colors duration-700 ${isDark ? "border-white/10" : "border-yellow-500/40"}`} />
                            <div className={`absolute w-[130%] h-[130%] rounded-full border opacity-40 animate-[spin_40s_linear_infinite_reverse] border-dashed transition-colors duration-700 ${isDark ? "border-white/5" : "border-yellow-400/40"}`} />
                            <div className={`absolute w-[160%] h-[160%] rounded-full blur-2xl md:blur-[80px] -z-10 animate-pulse transition-colors duration-700 ${isDark ? "bg-blue-400/15" : "bg-yellow-500/20"}`} />
                            <div className={`absolute w-[200%] h-[200%] rounded-full blur-[60px] md:blur-[120px] -z-20 transition-colors duration-700 ${isDark ? "bg-blue-400/5" : "bg-amber-400/10"}`} />
                            {!isDark && (<div className="absolute w-[170%] h-[170%] pointer-events-none opacity-50">
                                <div className="absolute inset-0 animate-[spin_120s_linear_infinite]">
                                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                                        {[...Array(12)].map((_, i) => ( <line key={i} x1="50" y1="0" x2="50" y2={i % 2 === 0 ? "12" : "7"} transform={`rotate(${i * 30} 50 50)`} stroke="currentColor" strokeWidth={i % 2 === 0 ? "0.5" : "0.25"} strokeLinecap="round" className="text-yellow-500" /> ))}
                                    </svg>
                                </div>
                            </div>)}
                            <div className="absolute w-[150%] h-[150%] animate-[spin_20s_linear_infinite] opacity-30 pointer-events-none">
                                <div className={`absolute top-0 left-1/2 w-2 h-2 rounded-full blur-[1px] ${isDark ? "bg-white" : "bg-sky-400"}`} />
                                <div className={`absolute bottom-1/4 right-0 w-1 h-1 rounded-full ${isDark ? "bg-white" : "bg-sky-300"}`} />
                            </div>
                            <div className={`w-[60vw] h-[60vw] sm:w-80 sm:h-80 md:w-125 md:h-125 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.15)] md:shadow-[0_0_80px_rgba(255,255,255,0.15)] overflow-hidden relative group transition-colors duration-700 ${isDark ? "bg-[#EAEAEA]" : "bg-linear-to-br from-yellow-100 to-yellow-400"}`}>
                                <div className={`absolute inset-0 opacity-20 ${isDark ? "bg-zinc-200" : "bg-white"}`}></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
                                    <span className={`text-sm tracking-[0.3em] font-bold uppercase ${isDark ? "text-black" : "text-white"}`}>{isDark ? "Light Mode" : "Dark Mode"}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className="absolute top-[10%] -left-[40%] z-30 opacity-80 pointer-events-none" style={parallax06}><Cloud2 className={`w-60 h-37.5 md:w-100 md:h-62.5 blur-0 md:blur-[1px] transition-colors duration-700 ${isDark ? "text-white/10" : "text-white md:drop-shadow-lg"}`} /></motion.div>
                    <motion.div className="absolute top-[30%] -right-[50%] z-30 opacity-70 pointer-events-none" style={parallax065}><Cloud1 className={`w-75 h-50 blur-0 md:blur-[1px] transition-colors duration-700 ${isDark ? "text-white/10" : "text-white md:drop-shadow-md"}`} /></motion.div>
                    <motion.div className="absolute -bottom-[10%] -right-[30%] z-30 opacity-60 pointer-events-none" style={parallax07}><Cloud3 className={`w-100 h-70 transition-colors duration-700 ${isDark ? "text-white/20" : "text-white/90 md:drop-shadow-lg"}`} /></motion.div>
                    <motion.div className="absolute top-[60%] -left-[20%] z-40 opacity-40 pointer-events-none" style={parallax08}><Cloud1 className={`w-150 h-100 blur-none md:blur-sm transition-colors duration-700 ${isDark ? "text-white/5" : "text-white/70"}`} /></motion.div>
                    <motion.div className="absolute -bottom-[30%] left-[10%] z-40 opacity-30 pointer-events-none" style={parallax09}><Cloud2 className={`w-137.5 h-87.5 blur-sm md:blur-md transition-colors duration-700 ${isDark ? "text-white/5" : "text-white/60"}`} /></motion.div>
                </motion.div>
            </div>
        </div>
    </motion.section>
  );
};
const MemoizedHeroSection = React.memo(HeroSection);

const AboutSection = ({ theme, lang, openDesktop }: { theme: "light" | "dark"; lang: Language; openDesktop: (tab: "bio" | "projetos" | "skills" | "certificados", projectUrl?: string | null) => void; }) => {
    const c = ABOUT_COPY[lang];
    const [isProfilePicHovered, setProfilePicHovered] = useState(false);
    const [showAlternatePic, setShowAlternatePic] = useState(false);
  
    return (
      <section id="about" className={`py-32 px-6 md:px-20 relative overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#F5F5F5]'}`}>
        <span className={`absolute -left-4 md:-left-10 top-0 text-[20vw] font-bold leading-none select-none z-0 pointer-events-none transition-colors duration-700 ${theme === 'dark' ? 'text-[#1a1a1a]' : 'text-black/5'}`}>01</span>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true, margin: "-10%" }} className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2">
                <div onMouseEnter={() => setProfilePicHovered(true)} onMouseLeave={() => setProfilePicHovered(false)} onClick={() => setShowAlternatePic(!showAlternatePic)} className={`relative w-full aspect-3/4 bg-zinc-800 rounded-sm transition-all duration-500 overflow-hidden cursor-pointer ${isProfilePicHovered ? '' : 'grayscale'}`}>
                    <Image src="/eu.jpg" alt="Foto de perfil de João Vilela, um homem branco de cabelo escuro sorrindo." fill className={`object-cover transition-opacity duration-300 ${showAlternatePic ? 'opacity-0' : 'opacity-100'}`} />
                    <Image src="/euolhando.jpg" alt="Foto de perfil de João Vilela, um homem branco de cabelo escuro olhando para a câmera." fill className={`object-cover transition-opacity duration-300 ${showAlternatePic ? 'opacity-100' : 'opacity-0'}`} />
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <span className="block md:hidden absolute -top-8 left-1/2 -translate-x-1/2 text-center text-accent text-sm tracking-widest mb-4 font-bold">{c.eyebrow}</span>
                <h2 className={`text-[12vw] md:text-[8vw] font-serif leading-none opacity-10 select-none absolute top-64 md:top-125 left-0 w-full text-center md:left-85 pointer-events-none mix-blend-overlay transition-colors duration-700 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>ABOUT ME</h2>
                <span className="hidden md:block absolute top-10 right-4 md:top-27 md:left-[45.99rem] md:right-auto text-accent text-sm tracking-widest mb-4 font-bold text-right">{c.eyebrow}</span>
                <h2 className="text-2xl md:text-3xl font-serif leading-tight mb-6 text-center">{c.title}</h2>
                <p className={`leading-relaxed mb-6 font-light transition-colors duration-700 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{c.text}</p>
                {/* As frentes. Cada uma so entra com a evidencia que a sustenta:
                    a pagina inteira depende de nenhuma alegacao ser chute. */}
                <div className="mt-10 text-left">
                    <span className="block text-accent text-xs tracking-widest mb-4 font-bold text-center md:text-left">{c.disciplines}</span>
                    <ul>
                        {disciplines.map((d) => (
                            <li key={d.name.en} className={`py-3 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                                <p className="text-[15px] font-serif leading-snug">{d.name[lang]}</p>
                                <p className={`text-[13px] leading-relaxed font-light mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{d.proof[lang]}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-wrap gap-8 mt-10 items-center justify-center">
                    <button onClick={() => openDesktop("bio")} className={`group flex items-center gap-3 text-sm tracking-widest py-3 transition-colors ${theme === 'dark' ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>
                        {c.more}
                        <span className={`block h-px w-12 group-hover:w-20 transition-all ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></span>
                    </button>
                    <a href="/Resume_Joao_Marcos_Vilela.pdf" download className={`flex items-center gap-2 text-sm tracking-widest border px-6 py-3 rounded-full transition-all hover:scale-105 ${theme === 'dark' ? 'border-white/20 hover:bg-white hover:text-black' : 'border-black/20 hover:bg-black hover:text-white'}`}>
                        <Download size={16} />
                        {c.cv}
                    </a>
                </div>
            </div>
        </motion.div>
      </section>
    );
};
const MemoizedAboutSection = React.memo(AboutSection);

const WorksSection = ({ theme, lang, openDesktop }: { theme: "light" | "dark"; lang: Language; openDesktop: (tab: "bio" | "projetos" | "skills" | "certificados", projectUrl?: string | null) => void; }) => {
    const c = WORKS_COPY[lang];
    const [isCelestialMode, setIsCelestialMode] = useState(false);
  
    return (
      <section id="projects" className={`py-32 px-6 md:px-20 relative z-10 overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#E5E5E5]'}`}>
        <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${isCelestialMode && theme !== 'dark' ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(to bottom, #E0F2FE 0%, #E5E5E5 100%)' }} />
        <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${isCelestialMode && theme === 'dark' ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(to bottom, #000112 0%, #0a0a0a 100%)' }} />
        <span className={`absolute -left-4 md:-left-10 top-20 text-[20vw] font-bold leading-none select-none z-0 pointer-events-none transition-colors duration-700 ${theme === 'dark' ? 'text-[#1a1a1a]' : 'text-black/5'}`}>03</span>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true, margin: "-10%" }} className="max-w-7xl mx-auto relative z-10">
            <h2 className={`text-[12vw] md:text-[8vw] font-serif leading-none opacity-10 select-none absolute -top-20 left-0 pointer-events-none mix-blend-overlay transition-colors duration-700 w-full text-center md:w-auto md:text-left translate-x-[24%] md:translate-x-0 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>WORKS</h2>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 relative">
                <div className="md:pl-32">
                    <span className="block text-accent text-sm tracking-widest mb-4 font-bold">{c.eyebrow}</span>
                    <h3 className="text-4xl md:text-6xl font-serif">{c.title}</h3>
                </div>
                <BranchVisual theme={theme} onToggle={setIsCelestialMode} />
            </div>
            <div className="max-w-5xl mx-auto">
                {/* Sistemas que eu construi e opero de ponta a ponta. */}
                <CaseStudies theme={theme} lang={lang} />

                <span className="block text-accent text-sm tracking-widest mt-20 mb-8 font-bold">{c.client}</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8">
                    {clientWork.map((project) => (
                        <div key={project.title} className="group cursor-pointer" onClick={() => openDesktop("projetos", project.url)}>
                            <div className="relative overflow-hidden mb-6 rounded-sm">
                                <Image src={project.image} alt={project.title} width={1920} height={1080} className="group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                                <div className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-2xl font-serif mb-1 group-hover:text-gray-300 transition-colors">{project.title}</h4>
                                    <p className="text-sm text-gray-500 font-mono">{project.tech}</p>
                                </div>
                                <span className="text-xs border border-white/20 px-2 py-1 rounded-full text-gray-400">{project.year}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-24 text-center">
                <button onClick={() => openDesktop("projetos")} className={`inline-flex items-center text-sm tracking-[0.2em] border-b py-3 pb-3 hover:text-gray-400 hover:border-gray-400 transition-all ${theme === 'dark' ? 'border-white/30' : 'border-black/30'}`}>{c.all}</button>
                <div className="md:hidden">
                    <BranchVisualMobile theme={theme} />
                </div>
            </div>
        </motion.div>
      </section>
    );
};
const MemoizedWorksSection = React.memo(WorksSection);

const ContactSection = ({ theme, lang }: { theme: "light" | "dark"; lang: Language }) => {
    return (
        <section id="contact" className={`py-40 px-6 md:px-20 relative flex flex-col items-center justify-center text-center transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0e0e0e]' : 'bg-[#EDEDED]'}`}>
            <ContactAnimation theme={theme} />
            <span className={`absolute -left-4 md:-left-10 top-24 text-[20vw] font-bold leading-none select-none z-0 pointer-events-none transition-colors duration-700 ${theme === 'dark' ? 'text-[#141414]' : 'text-black/5'}`}>05</span>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true, margin: "-10%" }} className="relative z-10">
                <h2 className={`text-[12vw] md:text-[8vw] font-serif leading-none opacity-10 select-none absolute -top-24 left-0 md:left-100 w-full text-center pointer-events-none mix-blend-overlay transition-colors duration-700 translate-x-[26%] md:translate-x-0 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>CONTACT</h2>
                <span className="text-accent text-sm tracking-widest block mb-8 font-bold">{CONTACT_COPY[lang].eyebrow}</span>
                <a href="mailto:jaomarfervil@gmail.com" className={`wrap-break-word text-2xl sm:text-4xl md:text-6xl font-serif hover:italic transition-all duration-300 ${theme === 'dark' ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>jaomarfervil@gmail.com</a>
                <div className="flex justify-center gap-6 md:gap-8 mt-12">
                    <a href="https://github.com/JaoVile" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors"><Github size={32} /></a>
                    <a href="https://www.linkedin.com/in/joao-marcos-ferreira-vilela/" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors"><Linkedin size={32} /></a>
                    <a href="https://www.instagram.com/jmarcos_vilela/" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors"><Instagram size={32} /></a>
                    <a href="https://wa.me/558796093326" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors"><Phone size={32} /></a>
                </div>
            </motion.div>
        </section>
    );
};
const MemoizedContactSection = React.memo(ContactSection);

const MemoizedFooter = React.memo(Footer);

// --- PÁGINA PRINCIPAL ---
export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetTheme, setTargetTheme] = useState<"light" | "dark" | null>(null);
  const [lang, setLang] = useState<Language>("en");
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktopOpen, setDesktopOpen] = useState(false);
  const [isCursorVisible, setCursorVisible] = useState(true);
  const lenis = useContext(LenisContext);

  const [initialTab, setInitialTab] = useState<"bio" | "projetos" | "skills" | "certificados">("bio");
  const [initialProject, setInitialProject] = useState<string | null>(null);

  const openDesktop = useCallback((tab: "bio" | "projetos" | "skills" | "certificados" = "bio", projectUrl: string | null = null) => {
    setInitialTab(tab);
    setInitialProject(projectUrl);
    setDesktopOpen(true);
  }, []);

  const handleThemeSwitch = useCallback(() => {
    if (isTransitioning) return;
    const next = theme === 'dark' ? 'light' : 'dark';
    setTargetTheme(next);
    setIsTransitioning(true);
    
    setTimeout(() => setTheme(next), 400);
    setTimeout(() => {
      setIsTransitioning(false);
      setTargetTheme(null);
    }, 1000);
  }, [isTransitioning, theme]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);

    // Ingles e o padrao, mas quem ja escolheu antes nao escolhe de novo.
    const salvo = localStorage.getItem("lang");
    if (salvo === "pt" || salvo === "en") setLang(salvo);
    
    const currentHour = new Date().getHours();
    setTheme(currentHour >= 6 && currentHour < 18 ? "light" : "dark");

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    if (isDesktopOpen) lenis?.stop();
    else lenis?.start();
  }, [isDesktopOpen, lenis]);

  return (
    <main className="w-full min-h-screen bg-background text-foreground selection:bg-selection-bg selection:text-selection-text transition-colors duration-700">
      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>
      <AnimatePresence>
        {isDesktopOpen && (
          <OSDesktop onClose={() => setDesktopOpen(false)} theme={theme} setCursorVisible={setCursorVisible} initialTab={initialTab} initialProject={initialProject} />
        )}
      </AnimatePresence>

      <RotationLock />
      <ThemeTransition isVisible={isTransitioning} targetTheme={targetTheme} />
      <NavigationDots lang={lang} />
      <NoiseOverlay />
      <CustomCursor isVisible={isCursorVisible} />
      <GlobalNav lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      
      <div id="top">
        <MemoizedHeroSection theme={theme} lang={lang} toggleTheme={handleThemeSwitch} />
      </div>

      <MemoizedAboutSection theme={theme} lang={lang} openDesktop={openDesktop} />
      <OperationsSection theme={theme} lang={lang} />
      <MemoizedWorksSection theme={theme} lang={lang} openDesktop={openDesktop} />
      <MethodSection theme={theme} lang={lang} />
      <MemoizedContactSection theme={theme} lang={lang} />
      <MemoizedFooter theme={theme} lang={lang} />
    </main>
  );
}