import React, { useEffect, useRef } from 'react';

export const AmbientSilkLight: React.FC = () => {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const animate = () => {
      // Smooth lerp (0.08 factor for silk-like smooth trailing)
      currentX += (mouseX - currentX) * 0.07;
      currentY += (mouseY - currentY) * 0.07;

      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
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
