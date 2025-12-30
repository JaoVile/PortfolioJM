import React from "react";

export type Language = "pt" | "en";

export const translations = {
  pt: {
    header: {
      available: "Disponível para",
      newProjects: "Novos Projetos",
    },
    hero: {
      creative: "Desenvolvedor",
      developer: "Criativo",
      description: "Especialista em transformar problemas complexos em interfaces digitais elegantes.",
      cta: "Ver Projetos",
      scroll: "Role para explorar",
    },
    about: {
      title: "/// Sobre Mim",
      text: (
        <>
          Não sou apenas um dev que move tickets. Eu crio <span className="italic text-zinc-400">sistemas vivos</span> que conectam marcas a pessoas através de experiências digitais memoráveis.
        </>
      ),
      stack: "Stack",
    },
    projects: {
      title: "Trabalhos",
      subtitle: "Selecionados",
      open: "Abrir Sistema",
      items: [
        {
          id: "solar",
          category: "01 / Web App",
          title: "SolarTech",
          description: "Dashboard para gerenciamento de instalações de painéis solares.",
        },
        {
          id: "renova",
          category: "02 / E-commerce",
          title: "Renova",
          description: "E-commerce de moda sustentável com foco em reuso.",
        }
      ]
    },
    footer: {
      title: "Vamos Conversar",
      system: "Todos os Sistemas Normais",
    },
    nav: {
      top: "Início",
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
    },
    desktop: {
      title: "Meus Repositórios",
      subtitle: "Projetos selecionados para demonstração.",
      click: "Clique para abrir o projeto em uma nova aba",
    }
  },
  en: {
    header: {
      available: "Available for",
      newProjects: "New Projects",
    },
    hero: {
      creative: "Creative",
      developer: "Developer",
      description: "Specialist in transforming complex problems into elegant digital interfaces.",
      cta: "See Projects",
      scroll: "Scroll to explore",
    },
    about: {
      title: "/// About Me",
      text: (
        <>
          I'm not just a dev who moves tickets. I create <span className="italic text-zinc-400">living systems</span> that connect brands to people through memorable digital experiences.
        </>
      ),
      stack: "Stack",
    },
    projects: {
      title: "Selected",
      subtitle: "Works",
      open: "Open System",
      items: [
        {
          id: "solar",
          category: "01 / Web App",
          title: "SolarTech",
          description: "Dashboard for solar panel installation management.",
        },
        {
          id: "renova",
          category: "02 / E-commerce",
          title: "Renova",
          description: "Sustainable fashion e-commerce focused on reuse.",
        }
      ]
    },
    footer: {
      title: "Get in Touch",
      system: "All Systems Normal",
    },
    nav: {
      top: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    desktop: {
      title: "My Repositories",
      subtitle: "Selected projects for demonstration.",
      click: "Click to open the project in a new tab",
    }
  }
};