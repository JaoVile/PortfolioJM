"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BranchVisualMobileProps {
  theme: "light" | "dark";
}

export const BranchVisualMobile: React.FC<BranchVisualMobileProps> = ({ theme }) => {
  const isDark = theme === "dark";
  const lineColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
  const glowColor = isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)";

  const [showCelestialElements, setShowCelestialElements] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLineClick = () => {
    const newState = !showCelestialElements;
    setShowCelestialElements(newState);
  };

  // Inline Cloud Icons
  const Cloud1 = (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M18.5,12c0-1.7-1.1-3.2-2.6-3.8C15.4,5.5,12.9,4,10,4c-3.9,0-7,3.1-7,7c0,0.2,0,0.4,0,0.6C1.3,12.3,0,14,0,16c0,2.2,1.8,4,4,4h14.5c3,0,5.5-2.5,5.5-5.5S21.5,12,18.5,12z"/>
    </svg>
  );

  const Cloud2 = (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
       <path d="M19.35,10.04C18.67,6.59,15.64,4,12,4C9.11,4,6.6,5.64,5.35,8.04C2.34,8.36,0,10.91,0,14c0,3.31,2.69,6,6,6h13 c2.76,0,5-2.24,5-5C24,12.36,21.95,10.22,19.35,10.04z"/>
    </svg>
  );

  const Cloud3 = (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M17,19c-0.83,0-1.5-0.67-1.5-1.5c0-0.83,0.67-1.5,1.5-1.5c0.83,0,1.5,0.67,1.5,1.5C19,18.33,18.33,19,17,19z" opacity="0.5"/>
      <path d="M6,19C3.51,19,1.5,16.99,1.5,14.5S3.51,10,6,10c0.36,0,0.71,0.04,1.05,0.12C7.86,6.67,10.95,4,14.5,4c4.42,0,8,3.58,8,8 c0,1.06-0.21,2.07-0.58,3C22.19,15.35,22.4,15.66,22.5,16c0,1.66-1.34,3-3,3H6z"/>
    </svg>
  );

  // The persistent clickable line
  const ClickableLine = (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{
        scaleX: 1,
        backgroundColor: isHovered ? glowColor : lineColor,
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`absolute w-full h-[1px] top-[52%] left-0 -translate-y-1/2 origin-left transition-colors duration-700`}
      style={{
        filter: isHovered ? `drop-shadow(0 0 4px ${glowColor})` : "none",
      }}
    />
  );

  // Moon SVG (simplified)
  const MoonSVG = (
    <motion.div
      key="moon"
      initial={{ scale: 0, opacity: 0 }}
      animate={showCelestialElements ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: showCelestialElements ? 0.4 : 0 }}
      className="absolute z-20"
      style={{
        width: '60px',
        height: '60px',
        top: '10%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Light Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400%] h-[400%] rounded-full blur-2xl -z-10 bg-blue-400/10 animate-pulse" />

      <div className="relative w-full h-full rounded-full bg-[#EAEAEA] flex items-center justify-center overflow-hidden">
        <div className="absolute w-[150%] h-[150%] rounded-full blur-md -z-10 bg-blue-400/10 animate-pulse" />
      </div>
    </motion.div>
  );

  // Sun SVG (simplified)
  const SunSVG = (
    <motion.div
      key="sun"
      initial={{ scale: 0, opacity: 0 }}
      animate={showCelestialElements ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: showCelestialElements ? 0.4 : 0 }}
      className="absolute z-20"
      style={{
        width: '60px',
        height: '60px',
        top: '10%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Sun's own intense yellow glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] rounded-full blur-3xl -z-10 bg-yellow-400/50"
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Wider, subtler amber glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500%] h-[500%] rounded-full blur-[100px] -z-20 bg-amber-500/20"
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Light Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-yellow-200/80"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -20, 0], x: [0, 10, -10, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
        />
      ))}

      {/* Outer Rays (New) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] -z-10 opacity-60">
        <motion.div 
           className="w-full h-full"
           animate={{ rotate: 360 }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
           <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              {[...Array(8)].map((_, i) => (
                 <line
                   key={i}
                   x1="50" y1="10" x2="50" y2="0"
                   transform={`rotate(${i * 45} 50 50)`}
                   stroke="currentColor"
                   strokeWidth="4"
                   strokeLinecap="round"
                   className="text-yellow-500"
                 />
              ))}
           </svg>
        </motion.div>
      </div>

      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-yellow-100 to-yellow-400 flex items-center justify-center overflow-hidden">
        {/* Mini rays for sun */}
        <div className="absolute w-[170%] h-[170%] pointer-events-none opacity-50">
            <motion.div 
              className="absolute inset-0"
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
            >
               <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  {[...Array(12)].map((_, i) => (
                     <line
                       key={i}
                       x1="50" y1="0" x2="50" y2={i % 2 === 0 ? "12" : "7"}
                       transform={`rotate(${i * 30} 50 50)`}
                       stroke="currentColor"
                       strokeWidth={i % 2 === 0 ? "0.5" : "0.25"}
                       strokeLinecap="round"
                       className="text-yellow-500"
                     />
                  ))}
               </svg>
            </motion.div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="block w-full h-20 my-8 relative cursor-pointer"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ originX: 0 }}
      onClick={handleLineClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The persistent clickable line */}
      {ClickableLine}

      {/* Celestial body and clouds (appear/disappear on click) */}
      <AnimatePresence>
        {isDark ? MoonSVG : SunSVG}
        {showCelestialElements && (
          <>
            {/* Background Sky Glow for Light Mode */}
            {!isDark && (
              <motion.div
                key="sky-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-1/2 left-[10%] -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] bg-sky-300/20 rounded-full blur-3xl -z-30"
              />
            )}

            {/* Extra Stars and Constellation for Dark Mode */}
            {isDark && (
              <motion.div
                key="stars-constellation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 pointer-events-none"
              >
                {/* Stars near left cloud */}
                <motion.div 
                  animate={{ opacity: [0, 1, 0] }} 
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-[-15%] left-[15%] w-0.5 h-0.5 bg-white rounded-full" 
                />
                <motion.div 
                  animate={{ opacity: [0, 0.8, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, delay: 1.2 }}
                  className="absolute top-[15%] left-[25%] w-1 h-1 bg-white rounded-full shadow-[0_0_2px_#fff]" 
                />

                {/* Stars near right cloud */}
                <motion.div 
                  animate={{ opacity: [0, 1, 0] }} 
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                  className="absolute top-[-10%] left-[65%] w-0.5 h-0.5 bg-white rounded-full" 
                />

                {/* Constellation right side above cloud */}
                <div className="absolute top-[-40%] left-[75%] w-16 h-12 opacity-90">
                   <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-0 left-[10%] w-1 h-1 bg-white rounded-full shadow-[0_0_3px_#fff]" />
                   <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} className="absolute top-[40%] left-[90%] w-1 h-1 bg-white rounded-full shadow-[0_0_3px_#fff]" />
                   <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 0.7 }} className="absolute top-[100%] left-[40%] w-1 h-1 bg-white rounded-full shadow-[0_0_3px_#fff]" />
                   <svg className="absolute inset-0 w-full h-full overflow-visible">
                      <line x1="10%" y1="0" x2="90%" y2="40%" stroke="white" strokeWidth="0.5" opacity="0.3" />
                      <line x1="90%" y1="40%" x2="40%" y2="100%" stroke="white" strokeWidth="0.5" opacity="0.3" />
                   </svg>
                </div>
              </motion.div>
            )}

            {/* New Clouds near Sun (Top) */}
            <motion.div
              key="cloud-top-left"
              initial={{ opacity: 0, x: -10, scale: 0.5 }}
              animate={{ opacity: 0.9, x: 0, scale: 0.7 }}
              exit={{ opacity: 0, x: -10, scale: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`absolute top-[20%] left-[35%] w-12 h-8 -translate-y-1/2 z-10 ${isDark ? "text-white/10" : "text-white/90 drop-shadow-lg"}`}
            >
               <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>{Cloud3}</motion.div>
            </motion.div>

            <motion.div
              key="cloud-top-right"
              initial={{ opacity: 0, x: 10, scale: 0.5 }}
              animate={{ opacity: 0.9, x: 0, scale: 0.7 }}
              exit={{ opacity: 0, x: 10, scale: 0.5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`absolute top-[25%] left-[60%] w-14 h-9 -translate-y-1/2 z-10 ${isDark ? "text-white/10" : "text-white/90 drop-shadow-lg"}`}
            >
               <motion.div animate={{ x: [0, -8, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}>{Cloud1}</motion.div>
            </motion.div>

            <motion.div
              key="cloud-left"
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              transition={{ duration: 0.8 }}
              className={`absolute top-[67%] left-[20%] w-16 h-10 -translate-y-1/2 z-10 ${isDark ? "text-white/10" : "text-white/90 drop-shadow-lg"}`}
            >
              <motion.div animate={{ x: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>{Cloud1}</motion.div>
            </motion.div>

            <motion.div
              key="cloud-right"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.8 }}
              className={`absolute top-[66%] left-[70%] w-20 h-12 -translate-y-1/2 z-10 ${isDark ? "text-white/10" : "text-white/90 drop-shadow-lg"}`}
            >
              <motion.div animate={{ x: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>{Cloud2}</motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
