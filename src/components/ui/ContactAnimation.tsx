"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==================================================================================
// CLOUD SVGS (Mantidos)
// ==================================================================================
export const Cloud1Svg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5,19c-0.83,0-1.5-0.67-1.5-1.5c0-0.83,0.67-1.5,1.5-1.5c0.83,0,1.5,0.67,1.5,1.5C19,18.33,18.33,19,17.5,19z" opacity="0.5"/>
    <path d="M6.5,19C4.01,19,2,16.99,2,14.5S4.01,10,6.5,10c0.36,0,0.71,0.04,1.05,0.12C8.36,6.67,11.45,4,15,4c4.42,0,8,3.58,8,8
    c0,1.06-0.21,2.07-0.58,3C22.69,15.35,22.9,15.66,23,16c0,1.66-1.34,3-3,3H6.5z"/>
  </svg>
);

export const Cloud2Svg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19,18H6c-2.21,0-4-1.79-4-4s1.79-4,4-4h1v-1c0-2.76,2.24-5,5-5s5,2.24,5,5v1h2c1.66,0,3,1.34,3,3S20.66,18,19,18z"/>
  </svg>
);

export const Cloud3Svg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.35,10.04C18.67,6.59,15.64,4,12,4C9.11,4,6.6,5.64,5.35,8.04C2.34,8.36,0,10.91,0,14c0,3.31,2.69,6,6,6h13
    c2.76,0,5-2.24,5-5C24,12.36,21.93,10.12,19.35,10.04z"/>
  </svg>
);

// ==================================================================================
// MAIN COMPONENT
// ==================================================================================

interface ContactAnimationProps {
  theme: "light" | "dark";
}

export const ContactAnimation: React.FC<ContactAnimationProps> = ({ theme }) => {
  const isDark = theme === "dark";
  const [clickedStars, setClickedStars] = useState<number[]>([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false); // Novo estado para o Buraco Negro

  // Activation Logic
  useEffect(() => {
    if (clickedStars.length === 3) {
      setShowAnimation(true);
      const timer = setTimeout(() => {
        setShowAnimation(false);
        setClickedStars([]);
      }, 20000); 
      return () => clearTimeout(timer);
    }
  }, [clickedStars]);

  const handleClick = useCallback((id: number) => {
    if (showAnimation) return;

    setClickedStars((prev) => {
        if (prev.includes(id)) return prev;
        return [...prev, id];
      });
  }, [showAnimation]);

  const handleResetPoints = useCallback(() => {
    setClickedStars([]);
    setShowAnimation(false);
  }, []);

  // Novo Handler: Clique no Buraco Negro
  const handleBlackHoleClick = useCallback(() => {
    setClickedStars([]);
    setShowAnimation(false); // Para a animação
    setIsLowPowerMode(prev => !prev); // Alterna (ou ativa) o modo de baixo consumo/luz
  }, []);

  // Reset on theme change
  useEffect(() => {
    handleResetPoints();
    setIsLowPowerMode(false); // Reseta o buraco negro ao trocar tema
  }, [isDark, handleResetPoints]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="dark-layer"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#0f0c29] via-[#050510] to-[#000000]"
          >
            <MemoizedDarkGalaxy 
                showGalaxy={showAnimation} 
                isLowPower={isLowPowerMode} 
                onBlackHoleClick={handleBlackHoleClick} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="light-layer"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
             <MemoizedLightSky showScene={showAnimation} onTreeClick={handleResetPoints} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Layer */}
      <InteractiveLayer 
        isDark={isDark} 
        clickedStars={clickedStars} 
        onClick={handleClick}
        showAnimation={showAnimation} 
      />

    </div>
  );
};

/* ==================================================================================
   LAYER 2: LIGHT SKY (INTOCADO - VISUAL LIGHT MODE)
   ================================================================================== */
const MemoizedLightSky = React.memo(({ showScene, onTreeClick }: { showScene: boolean, onTreeClick: () => void }) => {
  return (
    <AnimatePresence>
      {showScene && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#E0F2FE] via-sky-100 to-white"
        >
          {/* 1. Clouds */}
          <CloudLayer />

          {/* 2. Rainbow */}
          <RainbowArc />

          {/* 3. Wind System */}
          <WindSystem />

          {/* 4. Birds */}
          <BirdFlock />

          {/* 5. Landscape */}
          <Landscape onTreeClick={onTreeClick} />

          {/* 6. River */}
          <motion.div 
            initial={{ scaleY: 0, opacity: 0 }} 
            animate={{ scaleY: 1, opacity: 0.7 }} 
            transition={{ duration: 2, delay: 0.8 }}
            className="absolute bottom-0 left-0 w-full h-[15%] md:h-[25%] bg-gradient-to-t from-blue-500 via-blue-300 to-transparent z-0 origin-bottom" 
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
});
MemoizedLightSky.displayName = "LightSky";


/* ==================================================================================
   VISUAL COMPONENTS
   ================================================================================== */

const WindStream = React.memo(({ top, width, duration, delay }: any) => (
    <motion.div
        className="absolute h-[1px] md:h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full opacity-0 z-10"
        style={{ top, width }} 
        initial={{ x: '-100%' }}
        animate={{ x: '150vw', opacity: [0, 0.8, 0] }}
        transition={{ duration: duration, delay: delay, repeat: Infinity, ease: "easeInOut" }}
    />
));
WindStream.displayName = "WindStream";

const WindSystem = React.memo(() => (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <WindStream top="15%" width="40vw" duration={7} delay={0} />
        <WindStream top="25%" width="60vw" duration={5} delay={2} />
        <WindStream top="40%" width="30vw" duration={6} delay={4} />
        <WindStream top="60%" width="80vw" duration={8} delay={1} />
        <WindStream top="10%" width="50vw" duration={9} delay={5} />
    </div>
));
WindSystem.displayName = "WindSystem";

const SimpleTree = React.memo(({ style, delay = 0, className, onClick }: { style: React.CSSProperties, delay?: number, className?: string, onClick?: () => void }) => (
    <motion.div 
        onClick={onClick}
        className={`absolute bottom-0 z-20 flex flex-col items-center origin-bottom ${onClick ? 'pointer-events-auto cursor-pointer hover:scale-105 active:scale-95 transition-transform' : 'pointer-events-none'} ${className}`} 
        style={style}
        initial={{ scaleY: 0, opacity: 0 }} 
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 + delay, type: "spring", bounce: 0.3 }}
    >
        <div className="w-[12vw] h-[12vw] min-w-[50px] min-h-[50px] max-w-[120px] max-h-[120px] bg-green-500 rounded-full relative z-10 shadow-sm" />
        <div className="w-[2vw] h-[8vw] min-w-[10px] min-h-[30px] max-w-[20px] max-h-[80px] bg-[#7c4a3a] -mt-[3vw] relative z-0" />
    </motion.div>
));
SimpleTree.displayName = "SimpleTree";

const SimpleBush = React.memo(({ style, delay = 0, className }: { style: React.CSSProperties, delay?: number, className?: string }) => (
    <motion.div
        className={`absolute bottom-0 z-20 pointer-events-none origin-bottom ${className}`}
        style={style}
        initial={{ scale: 0, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 + delay, type: "spring" }}
    >
        <div className="w-[8vw] h-[5vw] min-w-[40px] min-h-[25px] max-w-[80px] max-h-[50px] bg-green-600 rounded-t-full rounded-b-lg shadow-sm" />
    </motion.div>
));
SimpleBush.displayName = "SimpleBush";

const Landscape = React.memo(({ onTreeClick }: { onTreeClick: () => void }) => (
    <div className="absolute bottom-0 left-0 w-full h-[30%] md:h-[40%] pointer-events-none z-20">
        <motion.div 
            initial={{ y: 200 }} animate={{ y: 0 }} transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="absolute bottom-[-10%] left-[-20%] w-[90%] md:w-[80%] h-[120%] bg-[#4ade80] rounded-tr-[100%] shadow-lg opacity-90" 
        />
        <motion.div 
            initial={{ y: 200 }} animate={{ y: 0 }} transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            className="absolute bottom-[-20%] right-[-10%] w-[100%] md:w-[90%] h-[100%] bg-[#86efac] rounded-tl-[100%] shadow-lg" 
        />
        
        <SimpleTree style={{ left: '10%', bottom: '25%' }} delay={0.1} onClick={onTreeClick} />
        <SimpleTree style={{ right: '10%', bottom: '20%', transform: 'scale(1.1)' }} delay={0.2} onClick={onTreeClick} />
        <SimpleTree className="hidden md:flex" style={{ left: '48%', bottom: '35%', transform: 'scale(0.8)' }} delay={0.3} onClick={onTreeClick} />

        <SimpleBush style={{ left: '5%', bottom: '20%' }} delay={0.1} />
        <SimpleBush style={{ right: '35%', bottom: '18%' }} delay={0.2} />
        <SimpleBush style={{ right: '2%', bottom: '15%' }} delay={0.4} />
    </div>
));
Landscape.displayName = "Landscape";

const Bird = React.memo(({ duration, delay, top, scale, rangeY }: { duration: number, delay: number, top: string, scale: number, rangeY: number[] }) => (
    <motion.div
        className="absolute text-gray-700/80 z-20"
        style={{ top: top, scale: scale }}
        initial={{ x: '-10vw' }}
        animate={{ 
            x: '110vw',
            y: rangeY, 
            rotate: [0, 5, -5, 0] 
        }}
        transition={{ 
            x: { duration, delay, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
    >
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <motion.path 
                d="M2 7 C 8 2, 16 2, 22 7" 
                animate={{ d: ["M2 7 C 8 2, 16 2, 22 7", "M2 5 C 8 9, 16 9, 22 5", "M2 7 C 8 2, 16 2, 22 7"] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            />
        </svg>
    </motion.div>
));
Bird.displayName = "Bird";

const BirdFlock = React.memo(() => (
    <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        <Bird top="15%" duration={18} delay={0} scale={0.6} rangeY={[0, -20, 0]} />
        <Bird top="35%" duration={25} delay={5} scale={0.5} rangeY={[0, 30, 0]} />
        <Bird top="25%" duration={35} delay={12} scale={0.4} rangeY={[0, -10, 0]} />
    </div>
));
BirdFlock.displayName = "BirdFlock";

const SvgCloud = React.memo(({ component: CloudComponent, duration, delay, top, scale, opacity = 0.9, initialX = '-20vw' }: any) => (
    <motion.div
        className="absolute text-white pointer-events-none transform-gpu z-10"
        style={{ top, opacity }}
        initial={{ x: initialX, scale }} 
        animate={{ x: '120vw' }}       
        transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
        <CloudComponent className="w-24 md:w-48 h-auto drop-shadow-sm" />
    </motion.div>
));

const CloudLayer = React.memo(() => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <SvgCloud component={Cloud1Svg} duration={60} delay={0} top="10%" scale={1.2} opacity={0.7} initialX="10vw" />
      <SvgCloud component={Cloud2Svg} duration={50} delay={0} top="30%" scale={0.8} opacity={0.8} initialX="50vw" />
      <SvgCloud component={Cloud1Svg} duration={110} delay={5} top="5%" scale={1.3} opacity={0.8} />
      <SvgCloud component={Cloud3Svg} duration={130} delay={25} top="18%" scale={1.0} opacity={0.7} />
      <SvgCloud component={Cloud2Svg} duration={70} delay={15} top="28%" scale={0.9} />
      <SvgCloud component={Cloud3Svg} duration={50} delay={8} top="38%" scale={0.6} opacity={0.95} />
  </div>
));
CloudLayer.displayName = "CloudLayer";

// RAINBOW
const RainbowArc = React.memo(() => {
  const colors = ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF", "#A0C4FF", "#BDB2FF"];
  const mobilePath = "M -50 120 Q 50 -40 150 120";
  const desktopPath = "M 110 90 Q 50 -50 -10 90"; 

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Mobile */}
      <div className="block md:hidden w-full h-full opacity-100 mix-blend-screen transform scale-[1.8] origin-bottom translate-y-[20%]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {colors.map((color, i) => (
              <motion.path
                key={`mob-${i}`}
                d={mobilePath}
                fill="none" stroke={color} strokeWidth={2} strokeLinecap="round"
                transform={`translate(0, ${i * 1.5})`} 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }} 
                transition={{ duration: 2.5, delay: i * 0.1, ease: "easeInOut" }}
              />
          ))}
        </svg>
      </div>
      {/* Desktop */}
      <div className="hidden md:block absolute inset-0 opacity-100 bottom-[30%]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {colors.map((color, i) => (
              <motion.path
                key={`desk-${i}`}
                d={desktopPath}
                fill="none" stroke={color} strokeWidth={4} strokeLinecap="round"
                transform={`translate(0, ${i * 1.5})`} 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }} 
                transition={{ duration: 2.5, delay: i * 0.1, ease: "easeInOut" }}
              />
          ))}
        </svg>
      </div>
    </div>
  );
});
RainbowArc.displayName = "RainbowArc";

// ==================================================================================
// BLUE POINT
// ==================================================================================

const BluePoint = React.memo(({ style, onClick, isClicked }: any) => (
    <motion.button
      onClick={onClick}
      className="absolute w-8 h-8 z-40 pointer-events-auto flex items-center justify-center focus:outline-none group cursor-pointer"
      style={style}
    >
        <div className={`transition-opacity duration-300 ${isClicked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 active:opacity-100'}`}>
            <motion.div
                animate={isClicked 
                    ? { scale: 1.5, opacity: 1, filter: "brightness(1.5) drop-shadow(0 0 5px rgba(59,130,246,0.8))" } 
                    : { scale: 1, opacity: 1, filter: "brightness(1)" }
                }
                className="w-3 h-3 bg-blue-500 border border-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.8)] rounded-full"
            />
            {!isClicked && (
                 <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-transparent border border-blue-400/50 rounded-full pointer-events-none"
                    animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}
        </div>
    </motion.button>
  ));
  BluePoint.displayName = "BluePoint";


const InteractiveLayer = React.memo(({ isDark, clickedStars, onClick, showAnimation }: any) => {
  const startPositions = [
      { bottom: "7%", left: "62%" }, 
      { top: "71%", right: "24%" }, 
      { top: "48%", left: "86%" } 
  ];

  return (
    <>
      <AnimatePresence>
      {!showAnimation && (
        <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            {isDark ? (
                <>
                <StarButton id={1} style={startPositions[0]} onClick={() => onClick(1)} isClicked={clickedStars.includes(1)} />
                <StarButton id={2} style={startPositions[1]} onClick={() => onClick(2)} isClicked={clickedStars.includes(2)} />
                <StarButton id={3} style={startPositions[2]} onClick={() => onClick(3)} isClicked={clickedStars.includes(3)} />
                </>
            ) : (
                <>
                    <BluePoint style={startPositions[0]} onClick={() => onClick(1)} isClicked={clickedStars.includes(1)} />
                    <BluePoint style={startPositions[1]} onClick={() => onClick(2)} isClicked={clickedStars.includes(2)} />
                    <BluePoint style={startPositions[2]} onClick={() => onClick(3)} isClicked={clickedStars.includes(3)} />
                </>
            )}
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
});
InteractiveLayer.displayName = "InteractiveLayer";


/* ==================================================================================
   DARK MODE COMPONENTS (COM BURACO NEGRO CLICÁVEL & LOW POWER)
   ================================================================================== */
const MemoizedDarkGalaxy = React.memo(({ showGalaxy, isLowPower, onBlackHoleClick }: { showGalaxy: boolean, isLowPower: boolean, onBlackHoleClick: () => void }) => {
  const stars = useMemo(() => [...Array(45)].map((_, i) => ({ id: i, top: Math.random() * 100, left: Math.random() * 100, size: Math.random() > 0.9 ? 2 : 1, delay: Math.random() * 2 })), []);
  const particles = useMemo(() => [...Array(5)].map((_, i) => ({ id: i, delay: i * 0.5 })), []);

  return (
    <>
      <AnimatePresence>
        {showGalaxy && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2.5 }} className="absolute inset-0 z-0 transform-gpu will-change-transform">
             <div className="absolute inset-0 transform-gpu"><NebulaLayer /><SpiralGalaxy /></div>
             
             {particles.map((p) => <DarkEnergyParticle key={p.id} delay={p.delay} />)}

             <div className="absolute inset-0">
                {stars.map((s) => <BackgroundStar key={s.id} {...s} />)}
             </div>

             <svg className="absolute inset-0 w-full h-full opacity-30 z-0"><ConstellationGroup /></svg>
             
             {/* BLACK HOLE COM PROPS DE CLIQUE E PODER */}
             <BlackHole isLowPower={isLowPower} onClick={onBlackHoleClick} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showGalaxy && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <motion.line x1="63%" y1="90%" x2="75%" y2="74%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} />
            <motion.line x1="75%" y1="74%" x2="87.2%" y2="51%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, delay: 0.5 }} />
          </svg>
        )}
      </AnimatePresence>
    </>
  );
});
MemoizedDarkGalaxy.displayName = "DarkGalaxy";

// ... (Auxiliary Dark Mode Components)
const NebulaLayer = React.memo(() => <motion.div className="absolute inset-0 transform-gpu" animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}><div className="absolute top-[20%] right-[30%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[60px] md:blur-[100px] animate-pulse-slow" /><div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[60px] md:blur-[80px]" /></motion.div>);
NebulaLayer.displayName = "NebulaLayer";
const SpiralGalaxy = React.memo(() => <motion.div className="absolute -bottom-[20%] -left-[10%] w-[800px] h-[800px] opacity-60 mix-blend-screen transform-gpu" animate={{ rotate: 360, scale: [1, 1.02, 1] }} transition={{ rotate: { duration: 150, repeat: Infinity, ease: "linear" }, scale: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}><div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(236,72,153,0.15)_180deg,rgba(34,211,238,0.15)_240deg,transparent_360deg)] rounded-full blur-[40px] md:blur-[60px]" /><div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-pink-900/20 rounded-full blur-[50px] md:blur-[80px]" /></motion.div>);
SpiralGalaxy.displayName = "SpiralGalaxy";
const BackgroundStar = React.memo(({ top, left, size, delay }: any) => <motion.div className="absolute bg-white rounded-full" style={{ top: `${top}%`, left: `${left}%`, width: size, height: size }} animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }} transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay }} />);
BackgroundStar.displayName = "BackgroundStar";
const DarkEnergyParticle = React.memo(({ delay }: { delay: number }) => <motion.div className="absolute bg-cyan-300 rounded-full blur-[1px]" style={{ width: Math.random() * 3 + 1, height: Math.random() * 3 + 1 }} initial={{ opacity: 0, top: "90%", left: `${Math.random() * 100}%` }} animate={{ opacity: [0, 0.8, 0], top: "10%", left: `${Math.random() * 100}%` }} transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, delay, ease: "linear" }} />);
DarkEnergyParticle.displayName = "DarkEnergyParticle";
const RandomShootingStar = React.memo(({ minDelay, maxDelay }: any) => { const [resetKey, setResetKey] = useState(0); const [coords, setCoords] = useState({ startX: "100%", startY: "0%", endX: "0%", endY: "100%", duration: 2, delay: 0 }); useEffect(() => { const startSide = Math.random() > 0.5 ? 'TOP' : 'RIGHT'; let startXVal = startSide === 'TOP' ? Math.random() * 100 : 110; let startYVal = startSide === 'TOP' ? -10 : Math.random() * 60; setCoords({ startX: `${startXVal}%`, startY: `${startYVal}%`, endX: `${startXVal - (Math.random() * 50 + 30)}%`, endY: `${startYVal + (Math.random() * 50 + 40)}%`, duration: Math.random() * 2 + 1.5, delay: Math.random() * (maxDelay - minDelay) + minDelay }); }, [resetKey, minDelay, maxDelay]); return <motion.div key={resetKey} className="absolute z-20 bg-white rounded-full shadow-[0_0_15px_3px_rgba(255,255,255,0.9)]" style={{ width: "3px", height: "3px" }} initial={{ left: coords.startX, top: coords.startY, opacity: 0, scale: 0 }} animate={{ left: coords.endX, top: coords.endY, opacity: [0, 1, 1, 0], scale: [0.5, 1.5, 0.5] }} transition={{ duration: coords.duration, delay: coords.delay, ease: "easeIn" }} onAnimationComplete={() => setResetKey(prev => prev + 1)} />; });
RandomShootingStar.displayName = "RandomShootingStar";
const CometSystem = React.memo(() => <><RandomShootingStar minDelay={1} maxDelay={5} /><RandomShootingStar minDelay={3} maxDelay={8} /><RandomShootingStar minDelay={6} maxDelay={12} /><RandomShootingStar minDelay={0} maxDelay={15} /></>);
CometSystem.displayName = "CometSystem";

// BLACK HOLE - AGORA INTERATIVO (CLICÁVEL + LOW POWER)
const BlackHole = React.memo(({ isLowPower, onClick }: { isLowPower: boolean, onClick: () => void }) => (
    <div 
        onClick={onClick}
        className="absolute left-[-100px] top-[60%] md:top-[99%] md:right-[70%] md:left-auto -translate-y-1/2 w-[900px] h-[900px] flex items-center justify-center scale-50 md:scale-75 lg:scale-100 z-50 cursor-pointer pointer-events-auto"
    >
        {/* Camada 1: Halo Principal - Reduz opacidade se isLowPower */}
        <motion.div 
            className="absolute w-[110%] h-[110%] transform-gpu" 
            animate={{ 
                rotate: 360, 
                scale: [1, 1.05, 1],
                opacity: isLowPower ? 0.25 : 0.5 // Reduz de 50% para 25% (metade)
            }} 
            transition={{ rotate: { duration: 90, repeat: Infinity, ease: "linear" }, scale: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
        >
            <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,rgba(124,58,237,0.15)_180deg,rgba(59,130,246,0.15)_270deg,transparent_360deg)] rounded-full blur-md md:blur-3xl" />
        </motion.div>
        
        {/* Camada 2: Anel Externo (Escondido no Mobile, reduzido no Low Power) */}
        <motion.div 
            className="absolute w-[500px] h-[140px] border-[1px] border-purple-500/30 rounded-[100%] blur-[2px] shadow-[0_0_30px_rgba(168,85,247,0.2)] transform-gpu hidden md:block" 
            style={{ rotate: -25 }} 
            animate={{ 
                rotate: [-25, 335],
                opacity: isLowPower ? 0.5 : 1 // Reduz visibilidade
            }} 
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }} 
        />
        
        <div className="relative z-10 scale-150">
            {/* Camada 3: Brilho Central - Reduz opacidade */}
            <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-orange-700/20 via-purple-700/20 to-blue-700/20 rounded-full blur-xl md:blur-3xl" 
                animate={{ 
                    scale: [1, 1.2, 1], 
                    opacity: isLowPower ? 0.25 : 0.5 
                }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
            />
            
            {/* Camada 4: Turbilhão - Reduz opacidade */}
            <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-tr from-orange-500/90 via-transparent to-cyan-500/90 blur-sm transform-gpu" 
                animate={{ 
                    rotate: -360,
                    opacity: isLowPower ? 0.5 : 1
                }} 
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} 
            />
            
            {/* Núcleo Negro (Mantido igual) */}
            <div className="relative w-24 h-24 bg-black rounded-full shadow-[0_0_80px_20px_rgba(0,0,0,1)] ring-1 ring-white/30 overflow-hidden z-20">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent rounded-full" />
            </div>
        </div>
    </div>
));
BlackHole.displayName = "BlackHole";

const StarButton = React.memo(({ id, style, onClick, isClicked }: any) => <motion.button onClick={onClick} className="absolute w-8 h-8 z-20 pointer-events-auto flex items-center justify-center focus:outline-none group cursor-pointer" style={style} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: id * 0.5 }}><motion.div className={`rounded-full transition-all duration-500 ${isClicked ? "w-1.5 h-1.5 bg-blue-200 shadow-[0_0_10px_2px_rgba(96,165,250,0.5)]" : "w-1 h-1 bg-white shadow-[0_0_3px_#fff] group-hover:scale-150"}`} animate={!isClicked ? { opacity: [0.4, 1, 0.4] } : { scale: 1.2, opacity: 1 }} transition={!isClicked ? { duration: 3, repeat: Infinity, delay: id * 1.2 } : {}} /></motion.button>);
StarButton.displayName = "StarButton";
const ConstellationGroup = React.memo(() => <><circle cx="15%" cy="15%" r="1" fill="white" /><circle cx="20%" cy="12%" r="1" fill="white" /><circle cx="22%" cy="18%" r="1" fill="white" /><path d="M 15 15 L 20 12 L 22 18" stroke="white" strokeWidth="0.5" vectorEffect="non-scaling-stroke" /><circle cx="45%" cy="80%" r="1" fill="white" /><circle cx="50%" cy="85%" r="1" fill="white" /><circle cx="52%" cy="75%" r="1" fill="white" /><line x1="45%" y1="80%" x2="50%" y2="85%" stroke="white" strokeWidth="0.5" /><line x1="50%" y1="85%" x2="52%" y2="75%" stroke="white" strokeWidth="0.5" /><circle cx="60%" cy="10%" r="1.5" fill="white" opacity="0.8"/><circle cx="65%" cy="15%" r="1" fill="white" /><line x1="60%" y1="10%" x2="65%" y2="15%" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" /></>);
ConstellationGroup.displayName = "ConstellationGroup";