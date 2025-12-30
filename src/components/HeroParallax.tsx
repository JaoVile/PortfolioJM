"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
// Importe as nuvens que acabamos de criar
import { Cloud1, Cloud2, Cloud3 } from "./CloudIcons"; 

export default function HeroParallax() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallaxStyle = (depth: number) => ({
    transform: `translate(${offset.x * depth * 50}px, ${offset.y * depth * 50}px)`,
    transition: "transform 0.1s ease-out",
  });

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0f0f0f] flex items-center justify-center">
      
      {/* --- CAMADA 1: NUVENS DO FUNDO (Lentas e Escuras) --- */}
      <div 
        className="absolute top-10 left-10 opacity-10" // Opacidade baixa para parecer longe
        style={parallaxStyle(0.3)} 
      >
        {/* Usando a Nuvem Grande */}
        <Cloud1 className="w-96 h-96 text-gray-400" />
      </div>
      
      <div 
        className="absolute bottom-20 right-20 opacity-10"
        style={parallaxStyle(0.6)}
      >
         <Cloud3 className="w-80 h-80 text-gray-500" />
      </div>

      {/* --- CAMADA 2: SUA FOTO (Lua) --- */}
      <div className="relative z-10 group" style={parallaxStyle(1.5)}>
        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-500"></div>
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl bg-black">
          {/* FOTO COMENTADA PARA TESTE - Substitua pelo Image quando tiver a foto */}
           <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-gray-500">Sua Foto</div>
           {/* <Image src="/sua-foto.jpg" alt="Perfil" fill className="object-cover" /> 
           */}
        </div>
         <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
           <h1 className="text-4xl md:text-6xl font-serif tracking-widest text-white/90 drop-shadow-lg">
             PORTFÓLIO
           </h1>
        </div>
      </div>

      {/* --- CAMADA 3: NUVENS DA FRENTE (Rápidas e Claras) --- */}
      {/* Essas passam NA FRENTE da foto com desfoque (blur) para dar ideia de foco na câmera */}
      <div 
        className="absolute top-1/2 left-1/4 z-20 pointer-events-none opacity-40 blur-[2px]"
        style={parallaxStyle(2.5)} 
      >
        <Cloud2 className="w-64 h-64 text-white" />
      </div>

      <div 
        className="absolute bottom-10 right-1/3 z-20 pointer-events-none opacity-30 blur-[4px]"
        style={parallaxStyle(3.5)}
      >
        <Cloud1 className="w-72 h-72 text-gray-300" />
      </div>

    </section>
  );
}