import React from 'react';
import { Sparkles, Compass, BookOpen, ArrowRight, Layers } from 'lucide-react';
import { SlideData, PlaceItem } from '../types';
import { PlaceCard } from './PlaceCard';

interface SlideLearningGroupProps {
  slide: SlideData;
  onSelectPlace: (place: PlaceItem, categoryTitle: string) => void;
  onNextSlide?: () => void;
}

export const SlideLearningGroup: React.FC<SlideLearningGroupProps> = ({
  slide,
  onSelectPlace,
  onNextSlide
}) => {
  return (
    <section 
      id={`slide-${slide.id}`} 
      className="relative min-h-[90vh] py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Slide Header & Metadata Eyebrow */}
      <div className="border-b border-slate-800/80 pb-5 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c29b38]/15 border border-[#c29b38]/30 text-[#f5e3a9] text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-[#c29b38]" />
            <span>{slide.category}</span>
          </div>

          <div className="text-xs font-mono text-slate-400">
            {slide.places?.length || 0} ĐỊA DANH TIÊU BIỂU
          </div>
        </div>

        {/* Primary and Secondary Titles */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-white tracking-tight mt-1">
          {slide.primaryTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#e6ca65] mt-1.5 font-medium">
          {slide.secondaryTitle}
        </p>

        {/* Key Highlights Bullet Points */}
        <div className="mt-4 pt-4 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {slide.keyHighlights.map((highlight, idx) => (
            <div 
              key={idx}
              className="p-2.5 rounded-lg bg-[#111724] border border-slate-800 text-xs text-slate-300 font-medium flex items-start gap-2"
            >
              <span className="w-4 h-4 rounded bg-[#c29b38]/20 text-[#f5e3a9] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="line-clamp-2 leading-relaxed">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Places Cards Grid */}
      <div className={`grid ${
        (slide.places?.length || 0) === 5
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4.5'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
      }`}>
        {slide.places?.map((place) => (
          <PlaceCard
            key={place.name}
            place={place}
            categoryName={slide.primaryTitle}
            onSelect={(selectedPlace) => onSelectPlace(selectedPlace, slide.primaryTitle)}
          />
        ))}
      </div>

      {/* Bottom hint */}
      <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <p>Nhấp vào từng địa danh để mở toàn bộ hồ sơ di sản, infographic và video tư liệu sinh động.</p>
        {onNextSlide && (
          <button
            onClick={onNextSlide}
            className="flex items-center gap-1.5 text-[#c29b38] hover:text-[#f5e3a9] font-semibold transition-colors"
          >
            <span>Khám phá nhóm tiếp theo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </section>
  );
};
