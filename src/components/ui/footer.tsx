"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Globe, Lightbulb, X } from "lucide-react";
import { Language } from "@/lib/translations";

interface FooterProps {
  theme: "light" | "dark";
  lang: Language;
}

const FOOTER_COPY = {
  en: { nav: "Navigation", home: "Home", about: "About", projects: "Projects", social: "Social", location: "Location" },
  pt: { nav: "Navegação", home: "Início", about: "Sobre", projects: "Projetos", social: "Social", location: "Localização" },
} as const;

export const Footer: React.FC<FooterProps> = ({ theme, lang }) => {
  const f = FOOTER_COPY[lang];
  const [showTips, setShowTips] = useState(false);
  const isDark = theme === "dark";
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString(lang === "pt" ? "pt-BR" : "en-GB", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={`pt-10 md:pt-20 pb-10 px-6 md:px-10 border-t transition-colors duration-700 ${isDark ? 'border-white/10 bg-[#0e0e0e]' : 'border-black/10 bg-white'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        
        {/* Navegação */}
        <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
          <h4 className="font-mono text-xs text-accent tracking-widest uppercase mb-2 font-bold">{f.nav}</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`text-sm hover:underline ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>{f.home}</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className={`text-sm hover:underline ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>{f.about}</a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }} className={`text-sm hover:underline ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>{f.projects}</a>
        </div>

        {/* Social */}
        <div className="flex flex-col gap-4 relative items-center md:items-start text-center md:text-left">
          <h4 className="font-mono text-xs text-accent tracking-widest uppercase mb-2 font-bold">{f.social}</h4>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/joao-marcos-ferreira-vilela/" target="_blank" rel="noreferrer" className={`text-sm hover:underline ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>LinkedIn</a>
            <a href="https://github.com/JaoVile" target="_blank" rel="noreferrer" className={`text-sm hover:underline ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>GitHub</a>
            <a href="https://www.instagram.com/jmarcos_vilela/" target="_blank" rel="noreferrer" className={`text-sm hover:underline ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Instagram</a>
          </div>
          <a href="mailto:jaomarfervil@gmail.com" className={`flex items-center gap-2 text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <Mail size={14} /> jaomarfervil@gmail.com
          </a>
        </div>

        {/* Localização & Lâmpada */}
        <div className="flex flex-col gap-4 items-center md:items-end text-center md:text-right relative">
          <h4 className="font-mono text-xs text-accent tracking-widest uppercase mb-2 font-bold">{f.location}</h4>
          <p className={`text-sm flex items-center justify-center md:justify-end gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Caruaru, PE — Brasil <Globe size={14} />
          </p>
          <div className={`text-sm font-mono mt-auto ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <span className="font-mono">{time}</span>
          </div>
          
          <p className={`text-xs mt-2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>© {new Date().getFullYear()} João Vilela.</p>
          
           {/* --- LÂMPADA FLUTUANTE --- */}
           {/* Mobile: Posição estática (relative ao fluxo), tamanho menor. Desktop: Absolute com translate. */}
           <div className="mt-6 md:mt-2 relative group">
               <button 
                 onClick={() => setShowTips(!showTips)} 
                 className={`
                    transition-colors duration-300 focus:outline-none p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10
                    text-blue-500 hover:text-yellow-400
                    /* Mobile styles (reset) */
                    translate-x-0 translate-y-0
                    /* Desktop styles (preservando sua config original) */
                    md:translate-x-[-325px] md:translate-y-[-150px]
                 `}
                 aria-label="Dica secreta"
                 title="Tem uma ideia?"
               >
                 {/* Ícone menor no mobile (size 48), grande no desktop (size 80) */}
                 <Lightbulb className="w-12 h-12 md:w-20 md:h-20" strokeWidth={2} />
               </button>

                {/* --- TIPS POPUP --- */}
                <AnimatePresence>
                    {showTips && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className={`
                                absolute z-50 p-4 rounded-lg shadow-2xl backdrop-blur-sm text-left border
                                ${isDark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-black/10'}
                                
                                /* Mobile Popup Position: Centralizado acima do botão */
                                bottom-full mb-2 left-1/2 -translate-x-1/2 w-64
                                
                                /* Desktop Popup Position: Mantendo sua lógica original */
                                md:bottom-32 md:right-0 md:translate-x-[-350px] md:translate-y-[-120px] md:mb-0 md:left-auto md:w-72
                            `}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h5 className="text-blue-500 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                    <Lightbulb size={14} className="fill-yellow-500/20" /> Dicas
                                </h5>
                                <button onClick={() => setShowTips(false)} className={`transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}>
                                    <X size={14} />
                                </button>
                            </div>
                            <ul className={`space-y-2 text-xs font-mono list-disc pl-4 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                <li>Existem segredos escondidos pelo site...</li>
                                <li>Tente interagir com os detalhes em cada sessão para ver coisas escondidas!</li>
                            </ul>
                            
                            {/* Seta do Balão */}
                            <div className={`
                                absolute w-3 h-3 border-b border-r rotate-45 
                                ${isDark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-black/10'}
                                /* Seta Mobile */
                                -bottom-1.5 left-1/2 -translate-x-1/2
                                /* Seta Desktop */
                                md:left-auto md:translate-x-0 md:right-4
                            `}></div>
                        </motion.div>
                    )}
                </AnimatePresence>
           </div>
        </div>
      </div>
    </footer>
  );
};