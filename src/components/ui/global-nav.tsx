"use client";

import { useState } from "react";
import { Menu, X, Github, Linkedin, Instagram, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { translations, Language } from "../../lib/translations";

// REMOVIDO 'vilela' do tipo
type Theme = "light" | "dark";

interface GlobalNavProps {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export function GlobalNav({ lang, setLang, theme, setTheme }: GlobalNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang];

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    // Se não estiver na página inicial, navega para a home com a hash
    if (window.location.pathname !== '/') {
      window.location.href = id === 'top' ? '/' : `/#${id}`;
    } else {
      // Se já estiver na home, apenas rola a tela
      const element = document.getElementById(id);
      if (id === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Botão Hamburger (Estilo Kuon Yagi: Fixo e Minimalista) */}
      <button
        onClick={toggleMenu}
        className="fixed top-8 right-8 z-[60] text-foreground focus:outline-none hover:opacity-70 transition-opacity mix-blend-difference text-white md:text-foreground"
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Overlay do Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.5, ease: [0.76, 0, 0.24, 1] }} // Curva Bezier mais elegante
            className="fixed inset-0 z-50 bg-secondary-bg text-foreground flex flex-col justify-between items-center p-12 md:p-16"
          >
            {/* Espaço vazio para centralizar a lista */}
            <div className="flex-1 flex items-center justify-center w-full">
                <ul className="flex flex-col gap-6 md:gap-8 text-center" role="menu">
                  {/* Início */}
                  <motion.li initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
                    <button role="menuitem" onClick={() => scrollTo('top')} className="text-5xl md:text-7xl font-serif uppercase tracking-tighter hover:italic hover:text-muted-foreground transition-all duration-300">
                      {t.nav.top}
                    </button>
                  </motion.li>
                  {/* Sobre */}
                  <motion.li initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
                    <button role="menuitem" onClick={() => scrollTo('about')} className="text-5xl md:text-7xl font-serif uppercase tracking-tighter hover:italic hover:text-muted-foreground transition-all duration-300">
                      {t.nav.about}
                    </button>
                  </motion.li>
                  {/* Projetos */}
                  <motion.li initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
                    <button role="menuitem" onClick={() => scrollTo('projects')} className="text-5xl md:text-7xl font-serif uppercase tracking-tighter hover:italic hover:text-muted-foreground transition-all duration-300">
                      {t.nav.projects}
                    </button>
                  </motion.li>
                  {/* Contato */}
                  <motion.li initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                    <button role="menuitem" onClick={() => scrollTo('contact')} className="text-5xl md:text-7xl font-serif uppercase tracking-tighter hover:italic hover:text-muted-foreground transition-all duration-300">
                      {t.nav.contact}
                    </button>
                  </motion.li>
                </ul>
            </div>

            {/* Footer do Menu: Tema e Sociais */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.6 }}
              className="w-full flex flex-col md:flex-row justify-between items-center gap-8 border-t border-border/30 pt-8"
            >
              {/* --- NOVO SELETOR DE TEMA (APENAS SOL E LUA) --- */}
              <div className="flex items-center gap-6">
                <span className="text-xs font-mono uppercase text-muted-foreground tracking-widest hidden md:block">Mode</span>
                <div className="flex items-center gap-2 p-1 border border-border rounded-full bg-background/50 backdrop-blur-sm">
                    {/* Botão Light */}
                    <button 
                        onClick={() => setTheme('light')} 
                        className={`p-3 rounded-full transition-all duration-300 ${theme === 'light' ? 'bg-foreground text-background shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                        title="Light Mode"
                    >
                        <Sun size={20} strokeWidth={theme === 'light' ? 2.5 : 2} />
                    </button>

                    {/* Botão Dark */}
                    <button 
                        onClick={() => setTheme('dark')} 
                        className={`p-3 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-foreground text-background shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                        title="Dark Mode"
                    >
                        <Moon size={20} strokeWidth={theme === 'dark' ? 2.5 : 2} />
                    </button>
                </div>
              </div>

              {/* --- SELETOR DE IDIOMA --- */}
              <div className="flex items-center gap-6">
                <span className="text-xs font-mono uppercase text-muted-foreground tracking-widest hidden md:block">Language</span>
                <div className="flex items-center gap-2 p-1 border border-border rounded-full bg-background/50 backdrop-blur-sm">
                    {(["en", "pt"] as const).map((code) => (
                      <button
                        key={code}
                        onClick={() => setLang(code)}
                        aria-pressed={lang === code}
                        className={`px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 ${lang === code ? 'bg-foreground text-background shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                        title={code === "en" ? "English" : "Português"}
                      >
                        {code}
                      </button>
                    ))}
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="flex gap-8 text-foreground">
                <a href="https://github.com/JaoVile" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity"><Github size={24} /></a>
                <a href="https://www.linkedin.com/in/joao-marcos-ferreira-vilela/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity"><Linkedin size={24} /></a>
                <a href="https://www.instagram.com/jmarcos_vilela/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity"><Instagram size={24} /></a>
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}