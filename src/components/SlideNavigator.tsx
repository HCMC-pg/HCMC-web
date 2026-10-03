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
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-2.5 p-2.5 rounded-full bg-[#fbf7ef]/90 backdrop-blur-md border border-[#dfd3be] shadow-lg shadow-[rgba(67,52,35,0.08)]"
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
                    ? 'w-3 h-3 bg-[#a33827] ring-4 ring-[#a33827]/25 shadow-md shadow-[#a33827]/30 scale-125' 
                    : 'w-2 h-2 bg-[#d1c2ab] hover:bg-[#a6927a]'
                }`}
              />

              {/* Tooltip on hover */}
              <span className="pointer-events-none absolute right-8 px-2.5 py-1 rounded-md bg-[#ffffff] border border-[#dfd3be] text-[11px] font-medium text-[#2d2015] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md shadow-[rgba(67,52,35,0.08)]">
                <span className="text-[#a33827] font-bold mr-1">{slide.category}:</span>
                {slide.primaryTitle}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
