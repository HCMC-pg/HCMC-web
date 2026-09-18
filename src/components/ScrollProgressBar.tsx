import React, { useEffect, useRef } from 'react';

interface ScrollProgressBarProps {
  totalSlides?: number;
  currentSlide?: number;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  totalSlides = 9,
  currentSlide = 0
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      let progress = 0;
      if (scrollHeight > 0) {
        progress = window.scrollY / scrollHeight;
      }
      // Floor progress with slide fraction
      const slideProgress = (currentSlide + 1) / totalSlides;
      const effectiveProgress = Math.min(1, Math.max(0.02, Math.max(progress, slideProgress)));

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${effectiveProgress})`;
      }
    };

    const onScroll = () => {
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          updateProgress();
          rafIdRef.current = null;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [currentSlide, totalSlides]);

  return (
    <div className="fixed top-18 left-0 right-0 h-[3px] bg-slate-900/80 z-30 overflow-hidden backdrop-blur-sm pointer-events-none">
      <div 
        ref={barRef}
        className="h-full w-full origin-left silk-shimmer-bar transition-transform duration-75 ease-out shadow-md shadow-[#c29b38]/40"
        style={{ transform: 'scaleX(0.05)', willChange: 'transform' }}
      />
    </div>
  );
};
