"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function NavigationDots() {
  const [activeSection, setActiveSection] = useState("top");
  const [showLabel, setShowLabel] = useState<string | null>("top");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["top", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (activeSection) {
      setShowLabel(activeSection);
      const timer = setTimeout(() => {
        setShowLabel(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [activeSection]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const labels: Record<string, string> = {
    top: "Início",
    about: "Sobre mim",
    projects: "Projetos",
    contact: "Contato",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="fixed bottom-8 right-5 z-50 mix-blend-difference text-white"
    >
      <ul className="relative flex flex-col gap-6 pl-3 -ml-3">
        <div className="absolute left-[15px] top-0 h-full w-0.5 bg-zinc-700/50 -z-10" />
        {["top", "about", "projects", "contact"].map((item) => (
          <li key={item}>
            <button
              onClick={() => scrollTo(item)}
              className="group flex items-center gap-4 focus:outline-none relative py-3 pl-3 -my-3 -ml-3"
            >
              <span
                className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === item
                    ? "bg-white scale-125"
                    : "bg-zinc-500 group-hover:bg-zinc-300"
                }`}
              />
              <span
                className={`absolute top-1/2 -translate-y-1/2 text-[10px] font-mono uppercase tracking-widest transition-opacity duration-500 pointer-events-none whitespace-nowrap
                text-right right-full mr-4
                ${showLabel === item ? "opacity-100" : "opacity-0"}`}
              >
                {labels[item]}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}