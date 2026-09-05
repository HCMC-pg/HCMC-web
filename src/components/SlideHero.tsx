import React from 'react';
import { 
  Compass, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Map, 
  Users, 
  Scroll, 
  Building2, 
  Landmark, 
  Ship
} from 'lucide-react';
import { SlideData, ProjectInfo } from '../types';
import { getMediaUrl } from '../utils/mediaFallback';

interface SlideHeroProps {
  slide: SlideData;
  projectInfo: ProjectInfo;
  onNavigateSlide: (slideIndex: number) => void;
}

export const SlideHero: React.FC<SlideHeroProps> = ({
  slide,
  projectInfo,
  onNavigateSlide
}) => {
  return (
    <section 
      id={`slide-${slide.id}`} 
      className="relative min-h-[90vh] flex flex-col justify-center py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Editorial Watermark / Header Eyebrow */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-accent tracking-widest text-[#c29b38] uppercase font-bold">
            Nền Tảng Học Liệu Di Sản Số
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c29b38]" />
          <span className="text-xs text-slate-400 font-medium">
            Không Gian Văn Hóa Đô Thị TP.HCM
          </span>
        </div>
        <div className="text-xs font-mono text-slate-500">
          KHO HỌC LIỆU 2026 • 21 ĐỊA DANH DI SẢN
        </div>
      </div>

      {/* Main Magazine 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Typography & Content */}
        <div className="lg:col-span-7 space-y-6 animate-fade-rise">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#f5e3a9] text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#e6ca65]" />
            <span>{projectInfo.slogan}</span>
          </div>

          {/* Primary & Secondary Titles */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-extrabold text-white tracking-tight leading-[1.15]">
              {slide.primaryTitle}
            </h1>
            <h2 className="text-lg sm:text-xl lg:text-2xl text-[#f5e3a9] font-serif-display italic font-medium leading-snug">
              {slide.secondaryTitle}
            </h2>
          </div>

          {/* Body Content - 100% PRESERVED with liquid-glass */}
          <div className="liquid-glass p-6 rounded-2xl border border-white/15 text-white/90 text-sm sm:text-base leading-relaxed">
            <p className="whitespace-pre-line italic">
              "{slide.bodyContent}"
            </p>
          </div>

          {/* Key Highlights Bullet Points */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#e6ca65]">
              Điểm nhấn cốt lõi (Key Highlights):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {slide.keyHighlights.map((highlight, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2.5 p-3 rounded-xl liquid-glass border border-white/10 hover:border-[#c29b38]/50 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-[#c29b38]/30 flex items-center justify-center shrink-0 mt-0.5 border border-[#c29b38]/50">
                    <span className="text-[10px] font-bold text-[#f5e3a9]">{idx + 1}</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed font-medium">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Direct CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              id="hero-explore-btn"
              onClick={() => onNavigateSlide(1)}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#c29b38] via-[#d4af37] to-[#997523] text-slate-950 text-sm font-bold shadow-lg shadow-[#c29b38]/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Khám phá 5 nhóm học liệu</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-map-btn"
              onClick={() => onNavigateSlide(6)}
              className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/15 hover:border-[#c29b38]/50 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Map className="w-4 h-4 text-[#c29b38]" />
              <span>Bản đồ số di sản</span>
            </button>

            <button
              id="hero-about-btn"
              onClick={() => onNavigateSlide(7)}
              className="px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-sm font-semibold border border-white/10 hover:border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#e6ca65]" />
              <span>Giới thiệu & Hành trình</span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Visual & Magazine Showcase */}
        <div className="lg:col-span-5 relative animate-fade-rise-delay">
          <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/60 group">
            <img 
              src={getMediaUrl(slide.image || "./assets/hero_hcmc_hub.webp")} 
              alt="HCMC CultureHub Panorama"
              className="w-full h-[400px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-black/30" />

            {/* Quote Card on Image */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl liquid-glass border border-white/20 shadow-lg">
              <p className="text-xs font-serif-display italic text-[#f5e3a9] leading-snug text-center">
                "{projectInfo.quote}"
              </p>
              <p className="text-[10px] text-center text-white/60 mt-1 uppercase tracking-wider font-semibold">
                — HCMC CultureHub Team —
              </p>
            </div>
          </div>

          {/* Floating Pill Statistics */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="p-3 rounded-xl liquid-glass border border-white/10 text-center">
              <div className="text-xl font-serif-display font-bold text-[#c29b38]">05</div>
              <div className="text-[11px] text-white/60">Nhóm không gian</div>
            </div>
            <div className="p-3 rounded-xl liquid-glass border border-white/10 text-center">
              <div className="text-xl font-serif-display font-bold text-[#e6ca65]">21</div>
              <div className="text-[11px] text-white/60">Địa danh & Di sản</div>
            </div>
            <div className="p-3 rounded-xl liquid-glass border border-white/10 text-center">
              <div className="text-xl font-serif-display font-bold text-[#c29b38]">2026</div>
              <div className="text-[11px] text-white/60">Dữ liệu chuẩn hóa</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
