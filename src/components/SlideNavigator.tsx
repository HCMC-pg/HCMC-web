import React from 'react';
import { SlideData } from '../types';

interface SlideNavigatorProps {
  currentSlide: number;
  slides: SlideData[];
  onNavigateSlide: (slideIndex: number) => void;
}

export const SlideNavigator: React.FC<SlideNavigatorProps> = ({
  currentSlide,
  slides,
  onNavigateSlide
}) => {
  return (
    <aside 
      aria-label="Slide Navigation"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-2.5 p-2.5 rounded-full bg-[#0b0f17]/80 backdrop-blur-md border border-[#c29b38]/25 shadow-2xl"
    >
      {/* Slide Indicator Dots */}
      <div className="flex flex-col items-center gap-2 py-1">
        {slides.map((slide, idx) => {
          const isActive = currentSlide === idx;
          return (
            <button
              key={slide.id}
              onClick={() => onNavigateSlide(idx)}
              className="group relative flex items-center justify-center p-1"
              title={`${slide.category}: ${slide.primaryTitle}`}
            >
              <div 
                className={`rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'w-3 h-3 bg-[#e6ca65] ring-4 ring-[#c29b38]/30 shadow-md shadow-[#c29b38]/50 scale-125' 
                    : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                }`}
              />

              {/* Tooltip on hover */}
              <span className="pointer-events-none absolute right-7 px-2 py-1 rounded bg-[#111724] border border-[#c29b38]/40 text-[10px] font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                {slide.category}: {slide.primaryTitle}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
