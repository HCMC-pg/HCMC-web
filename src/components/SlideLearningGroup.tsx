import React from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import { SlideData, PlaceItem } from '../types';
import { PlaceCard } from './PlaceCard';

interface SlideLearningGroupProps {
  slide: SlideData;
  onSelectPlace: (place: PlaceItem, categoryTitle: string) => void;
  onNextSlide?: () => void;
}

export const SlideLearningGroup: React.FC<SlideLearningGroupProps> = React.memo(({
  slide,
  onSelectPlace,
  onNextSlide
}) => {
  const places = slide.places || [];

  return (
    <section 
      id={`slide-${slide.id}`} 
      className="relative min-h-[90vh] py-12 lg:py-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Slide Header & Metadata Eyebrow */}
      <div className="border-b border-[#dfd3be] pb-6 mb-8 relative">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#faece9] border border-[#edcac4] text-[#a33827] text-xs font-semibold shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#a33827]" />
            <span>{slide.category}</span>
          </div>

          <div className="text-xs font-mono text-[#786452] tracking-wider">
            {places.length} ĐỊA DANH TIÊU BIỂU
          </div>
        </div>

        {/* Primary and Secondary Titles */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-[#24180f] tracking-tight mt-1">
          {slide.primaryTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#944924] mt-1.5 font-serif-display italic font-medium">
          {slide.secondaryTitle}
        </p>

        {/* Key Highlights Bullet Points - Manuscript Footnotes */}
        <div className="mt-5 pt-4 border-t border-[#dfd3be]/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {slide.keyHighlights.map((highlight, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-2xl bg-[#ffffff] border border-[#e5dac6] text-xs text-[#3f3124] font-medium flex items-start gap-2.5 shadow-xs hover:border-[#b8863b] transition-colors"
            >
              <span className="w-5 h-5 rounded-full bg-[#faece9] text-[#a33827] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-[#f0c8c0]">
                {idx + 1}
              </span>
              <span className="line-clamp-2 leading-relaxed">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CURATED ASYMMETRICAL EDITORIAL GALLERY LAYOUT (Breaking the Grid Intentionally) */}
      {places.length === 4 ? (
        /* 4 Places: Master Spotlight (5 cols) + Asymmetrical Trio (7 cols: 1 Landscape + 2 Standards) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Featured Spotlight Masterpiece */}
          <div className="lg:col-span-5 flex flex-col">
            <PlaceCard
              place={places[0]}
              categoryName={slide.primaryTitle}
              variant="featured"
              className="h-full"
              onSelect={(p) => onSelectPlace(p, slide.primaryTitle)}
            />
          </div>

          {/* Right Column: Asymmetric Companion Layout */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            {/* Top Wide Landscape Card */}
            <div>
              <PlaceCard
                place={places[1]}
                categoryName={slide.primaryTitle}
                variant="landscape"
                onSelect={(p) => onSelectPlace(p, slide.primaryTitle)}
              />
            </div>

            {/* Bottom 2 Offset Portrait Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
              <PlaceCard
                place={places[2]}
                categoryName={slide.primaryTitle}
                variant="standard"
                className="h-full"
                onSelect={(p) => onSelectPlace(p, slide.primaryTitle)}
              />
              <PlaceCard
                place={places[3]}
                categoryName={slide.primaryTitle}
                variant="standard"
                className="h-full"
                onSelect={(p) => onSelectPlace(p, slide.primaryTitle)}
              />
            </div>
          </div>
        </div>
      ) : places.length === 5 ? (
        /* 5 Places (Slide 6): Master Spotlight (5 cols) + 4 Asymmetrical Cards (7 cols: 1 Landscape + 3 Grid) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Featured Anchor */}
          <div className="lg:col-span-5 flex flex-col">
            <PlaceCard
              place={places[0]}
              categoryName={slide.primaryTitle}
              variant="featured"
              className="h-full"
              onSelect={(p) => onSelectPlace(p, slide.primaryTitle)}
            />
          </div>

          {/* Right Column: 4 Staggered Satellite Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            {/* Top Landscape Feature */}
            <div>
              <PlaceCard
                place={places[1]}
                categoryName={slide.primaryTitle}
                variant="landscape"
                onSelect={(p) => onSelectPlace(p, slide.primaryTitle)}
              />
            </div>

            {/* Bottom 3 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              {places.slice(2).map((place) => (
                <PlaceCard
                  key={place.name}
                  place={place}
                  categoryName={slide.primaryTitle}
                  variant="standard"
                  className="h-full"
                  onSelect={(p) => onSelectPlace(p, slide.primaryTitle)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Default Responsive Fallback */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <PlaceCard
              key={place.name}
              place={place}
              categoryName={slide.primaryTitle}
              onSelect={(p) => onSelectPlace(p, slide.primaryTitle)}
            />
          ))}
        </div>
      )}

      {/* Bottom hint & Next Chapter Prompt */}
      <div className="mt-9 pt-4 border-t border-[#dfd3be] flex flex-wrap items-center justify-between gap-3 text-xs text-[#6e5c4c]">
        <p>Nhấp vào từng địa danh để mở toàn bộ hồ sơ di sản, infographic và video tư liệu sinh động.</p>
        {onNextSlide && (
          <button
            onClick={onNextSlide}
            className="flex items-center gap-1.5 text-[#a33827] hover:text-[#832617] font-semibold transition-colors cursor-pointer group"
          >
            <span>Khám phá nhóm tiếp theo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </section>
  );
});
