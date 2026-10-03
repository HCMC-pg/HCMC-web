import React, { useEffect, useRef } from 'react';

export const AmbientSilkLight: React.FC = () => {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let animationFrameId: number | null = null;
    let isRunning = false;

    const animate = () => {
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      currentX += dx * 0.06;
      currentY += dy * 0.06;

      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(${currentX - 320}px, ${currentY - 320}px, 0)`;
      }

      if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) {
        currentX = mouseX;
        currentY = mouseY;
        if (lightRef.current) {
          lightRef.current.style.transform = `translate3d(${currentX - 320}px, ${currentY - 320}px, 0)`;
        }
        isRunning = false;
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const wakeUp = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      wakeUp();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    wakeUp();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none">
      {/* 1. Interactive Sunbeam / Morning Light Spill following cursor */}
      <div 
        ref={lightRef}
        className="absolute top-0 left-0 w-[640px] h-[640px] rounded-full pointer-events-none opacity-45 transition-opacity duration-1000 hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(235, 200, 130, 0.18) 0%, rgba(212, 175, 55, 0.06) 40%, rgba(250, 246, 238, 0) 70%)',
          filter: 'blur(60px)',
          willChange: 'transform'
        }}
      />

      {/* 2. Panoramic Distant Architectural & River Horizon Silhouette (Echoes of Saigon Heritage) */}
      <div className="absolute top-0 left-0 right-0 h-96 overflow-hidden pointer-events-none opacity-[0.035]">
        <svg 
          className="w-full h-full text-[#382618]" 
          viewBox="0 0 1440 320" 
          fill="currentColor"
          preserveAspectRatio="none"
        >
          {/* Subtle architectural skyline silhouettes: Domes, cathedral spires, river wharf silhouette */}
          <path d="M0,280 L90,280 L110,260 L130,260 L140,240 L160,240 L170,220 L175,180 L180,220 L190,240 L210,240 L220,260 L240,260 L260,280 L380,280 L400,250 L415,210 L420,160 L425,210 L440,250 L460,280 L580,280 L600,265 L615,230 L620,190 L625,230 L640,265 L660,280 L800,280 L820,245 L830,245 L840,215 L850,215 L855,170 L860,215 L870,215 L880,245 L890,245 L910,280 L1080,280 L1100,260 L1120,260 L1140,280 L1440,280 L1440,320 L0,320 Z" />
        </svg>
      </div>

      {/* 3. Layered Poetic Mist & Soft Drifting Clouds across Sky */}
      <div className="absolute top-0 left-0 right-0 h-72 overflow-hidden pointer-events-none opacity-20">
        <svg 
          className="w-[150%] h-full animate-clouds-slow text-[#c2a278]" 
          viewBox="0 0 1440 280" 
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,130 Q180,90 360,140 Q540,190 720,130 Q900,70 1080,120 Q1260,170 1440,110 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="absolute top-16 left-0 right-0 h-64 overflow-hidden pointer-events-none opacity-15">
        <svg 
          className="w-[140%] h-full animate-clouds-reverse text-[#b8863b]" 
          viewBox="0 0 1440 240" 
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,90 Q220,150 440,110 Q660,70 880,120 Q1100,170 1320,100 L1440,120 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* 4. Poetic Flocks of Distant Birds Gliding in Horizon Stream */}
      <div className="absolute top-8 left-0 right-0 h-28 overflow-hidden pointer-events-none opacity-35">
        <div className="animate-birds-flight flex items-center gap-10 text-[#4a3627]">
          {/* Bird 1 */}
          <svg className="w-5 h-3" viewBox="0 0 24 14" fill="currentColor">
            <path d="M0,9 Q6,0 12,6 Q18,0 24,9 Q18,4 12,8 Q6,4 0,9 Z" />
          </svg>
          {/* Bird 2 */}
          <svg className="w-4 h-2.5 translate-y-3 opacity-85" viewBox="0 0 24 14" fill="currentColor">
            <path d="M0,9 Q6,0 12,6 Q18,0 24,9 Q18,4 12,8 Q6,4 0,9 Z" />
          </svg>
          {/* Bird 3 */}
          <svg className="w-3.5 h-2 -translate-y-2 opacity-75" viewBox="0 0 24 14" fill="currentColor">
            <path d="M0,9 Q6,0 12,6 Q18,0 24,9 Q18,4 12,8 Q6,4 0,9 Z" />
          </svg>
          {/* Bird 4 */}
          <svg className="w-2.5 h-1.5 translate-y-1 opacity-60" viewBox="0 0 24 14" fill="currentColor">
            <path d="M0,9 Q6,0 12,6 Q18,0 24,9 Q18,4 12,8 Q6,4 0,9 Z" />
          </svg>
        </div>
      </div>

      {/* 5. Delicate Handcrafted Paper Margin Vignettes */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#e7d8c4]/30 to-transparent pointer-events-none hidden md:block" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#e7d8c4]/30 to-transparent pointer-events-none hidden md:block" />
      
      {/* 6. Subtle Gold Leaf Particle Shimmer (Morning Dew / Dust Motes) */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-[#d4a34b]/20 blur-[1px] animate-pulse" />
      <div className="absolute top-1/2 left-1/5 w-1.5 h-1.5 rounded-full bg-[#a33827]/15 blur-[1px] animate-pulse delay-700" />
      <div className="absolute top-2/3 right-1/6 w-2 h-2 rounded-full bg-[#255e37]/15 blur-[1px] animate-pulse delay-1000" />
    </div>
  );
};
