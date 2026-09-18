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
      // Smooth lerp (0.07 factor for silk-like smooth trailing)
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      currentX += dx * 0.08;
      currentY += dy * 0.08;

      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
      }

      // If mouse stopped moving and light is close enough, sleep to save CPU/GPU cycles
      if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) {
        currentX = mouseX;
        currentY = mouseY;
        if (lightRef.current) {
          lightRef.current.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
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
    // Initial positioning
    wakeUp();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div 
      ref={lightRef}
      className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-10 opacity-35 transition-opacity duration-700 hidden lg:block"
      style={{
        background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(194,155,56,0.04) 45%, rgba(0,0,0,0) 70%)',
        filter: 'blur(45px)',
        willChange: 'transform'
      }}
    />
  );
};

