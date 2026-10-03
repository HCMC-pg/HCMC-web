import React from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Map, 
  Gamepad2,
  Bookmark
} from 'lucide-react';
import { SlideData, ProjectInfo } from '../types';
import { getMediaUrl } from '../utils/mediaFallback';

interface SlideHeroProps {
  slide: SlideData;
  projectInfo: ProjectInfo;
  onNavigateSlide: (slideIndex: number) => void;
}

export const SlideHero: React.FC<SlideHeroProps> = React.memo(({
  slide,
  projectInfo,
  onNavigateSlide
}) => {
  return (
    <section 
      id={`slide-${slide.id}`} 
      className="relative min-h-[92vh] flex flex-col justify-center py-12 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-visible select-none"
    >
      {/* Background Watermark Typography for Spatial Grandeur */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 left-0 right-0 overflow-hidden select-none opacity-[0.045] font-serif-display font-extrabold text-[12vw] sm:text-[10vw] leading-none text-[#24180f] tracking-tighter whitespace-nowrap"
      >
        CULTUREHUB
      </div>

      {/* Editorial Eyebrow Header - Traditional Seal & Catalog Marking */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-[#ded2bd] pb-4.5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-0.5 rounded bg-[#faece9] border border-[#edcac4] flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a33827] animate-pulse" />
            <span className="text-[10px] font-serif-display tracking-widest text-[#a33827] uppercase font-bold">
              ẤN TRUYỀN DI SẢN SỐ
            </span>
          </div>
          <span className="text-[#cbbeaa] hidden sm:inline">•</span>
          <span className="text-xs font-serif-display italic text-[#6e5b4b] hidden sm:inline tracking-wide">
            Không gian văn hóa & ký ức đô thị Thành phố Hồ Chí Minh
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[#8a7664] tracking-wider">
          <Bookmark className="w-3.5 h-3.5 text-[#b8863b]" />
          <span>HỒ SƠ KHẢO CỨU • NĂM 2026</span>
        </div>
      </div>

      {/* Main Composition: Spatial Layering & Depth */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
        
        {/* Left Column: Typographic Architecture & Content */}
        <div className="lg:col-span-7 space-y-7 animate-fade-rise">
          
          {/* Badge: Slogan in Paper Capsule */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#f4ece0] border border-[#ded1bd] text-[#78431e] text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#b8863b]" />
            <span className="tracking-wide">{projectInfo.slogan}</span>
          </div>

          {/* Primary & Secondary Titles with Cinematic Contrast */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-serif-display font-extrabold text-[#24180f] tracking-tight leading-[1.12]">
              {slide.primaryTitle}
            </h1>
            {slide.secondaryTitle && (
              <h2 className="text-lg sm:text-xl lg:text-2xl text-[#944924] font-serif-display italic font-medium leading-snug">
                {slide.secondaryTitle}
              </h2>
            )}
          </div>

          {/* Body Content - 100% PRESERVED in Handmade Dó Paper Inscription Folio */}
          <div className="relative bg-[#ffffff] p-6 sm:p-8 rounded-3xl border border-[#e5dac6] text-[#3d2e21] text-sm sm:text-base leading-relaxed shadow-[0_4px_24px_rgba(67,52,35,0.06)] overflow-hidden">
            {/* Lacquer Accent Vertical Border */}
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#a33827] via-[#c4933f] to-[#a33827]" />
            
            <p className="whitespace-pre-line italic pl-3 font-serif-display text-[15px] sm:text-[16.5px] text-[#4a392b] leading-relaxed">
              "{slide.bodyContent}"
            </p>
          </div>

          {/* Direct CTA Buttons with Tactile Material Feel */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              id="hero-explore-btn"
              onClick={() => onNavigateSlide(1)}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#a33827] via-[#bd4b37] to-[#8d2a1b] text-white text-sm font-bold shadow-lg shadow-[#a33827]/25 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-[#8d2a1b]"
            >
              <span>Khám phá 5 nhóm học liệu</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-map-btn"
              onClick={() => onNavigateSlide(6)}
              className="px-5 py-3.5 rounded-full bg-[#ffffff] hover:bg-[#faf4ea] text-[#3a2c1f] hover:text-[#a33827] text-sm font-semibold border border-[#ded1bd] hover:border-[#b8863b] shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Map className="w-4 h-4 text-[#b8863b]" />
              <span>Bản đồ số di sản</span>
            </button>

            <button
              id="hero-game-btn"
              onClick={() => onNavigateSlide(7)}
              className="px-5 py-3.5 rounded-full bg-[#e8f4eb] hover:bg-[#d8eedd] text-[#1b4e2a] hover:text-[#12381e] text-sm font-semibold border border-[#badbc2] shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4 text-[#255e37]" />
              <span>Trải nghiệm Web Game</span>
            </button>

            <button
              id="hero-about-btn"
              onClick={() => onNavigateSlide(8)}
              className="px-5 py-3.5 rounded-full bg-[#f4ece0] hover:bg-[#ebe1d2] text-[#4d3d2e] hover:text-[#24180f] text-sm font-semibold border border-[#ded1bd] transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#b8863b]" />
              <span>Giới thiệu & Hành trình</span>
            </button>
          </div>
        </div>

        {/* Right Column: Masterpiece Exhibition Mount with Offset Layering */}
        <div className="lg:col-span-5 relative animate-fade-rise-delay">
          
          {/* Layer 1: Hand-torn Parchment Deckle Offset Underlay */}
          <div 
            aria-hidden="true" 
            className="absolute -inset-2 sm:-inset-3 bg-[#ede2cf] rounded-[2rem] rotate-2 pointer-events-none border border-[#ded1bd] opacity-80 shadow-xs" 
          />

          {/* Layer 2: Inner Muted Terracotta Frame Accent */}
          <div 
            aria-hidden="true" 
            className="absolute -inset-1 sm:-inset-1.5 bg-[#fbf6ec] rounded-[1.85rem] -rotate-1 pointer-events-none border border-[#e5d7c3] shadow-xs" 
          />

          {/* Layer 3: Main Artwork Frame with Museum Matting */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#ffffff] shadow-[0_16px_40px_rgba(67,52,35,0.14)] bg-[#ffffff] p-3 sm:p-3.5 group">
            
            {/* The Image Container with Passe-Partout Double Matting */}
            <div className="relative rounded-2xl overflow-hidden border border-[#ded1bd] bg-[#f4eee2]">
              <img 
                src={getMediaUrl(slide.image || "./assets/hero_hcmc_hub.webp")} 
                alt="HCMC CultureHub Panorama"
                className="w-full h-[390px] sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-800 brightness-[0.98] contrast-[1.03]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#24180f]/80 via-transparent to-transparent pointer-events-none" />

              {/* Vintage Postage Stamp / Cultural Seal Badge */}
              <div className="absolute top-3.5 right-3.5 bg-[#ffffff]/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#ded1bd] shadow-md flex items-center gap-2 text-[10px] font-mono text-[#a33827] font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a33827]" />
                HCMC DI SẢN • 2026
              </div>

              {/* Inscription Quote on Photo Bottom (Artist's Caption) */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 p-4 rounded-2xl bg-[#ffffff]/94 backdrop-blur-md border border-[#dfd3be] shadow-lg">
                <p className="text-xs font-serif-display italic text-[#874522] leading-snug text-center">
                  "{projectInfo.quote}"
                </p>
                <p className="text-[10px] text-center text-[#735f4e] mt-1.5 uppercase tracking-widest font-semibold font-mono">
                  — HCMC CultureHub Team —
                </p>
              </div>
            </div>
          </div>

          {/* Three Exhibition Docket Tickets (Vé Lưu Trữ Di Sản) */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#ffffff] border border-[#e5dac6] text-center shadow-xs hover:border-[#a33827] transition-colors">
              <div className="text-xl sm:text-2xl font-serif-display font-bold text-[#a33827]">05</div>
              <div className="text-[11px] text-[#5c4939] font-medium mt-0.5">Nhóm không gian</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#ffffff] border border-[#e5dac6] text-center shadow-xs hover:border-[#b8863b] transition-colors">
              <div className="text-xl sm:text-2xl font-serif-display font-bold text-[#b8863b]">21 Điểm</div>
              <div className="text-[11px] text-[#5c4939] font-medium mt-0.5">Di tích & Địa danh</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#ffffff] border border-[#e5dac6] text-center shadow-xs hover:border-[#255e37] transition-colors">
              <div className="text-xl sm:text-2xl font-serif-display font-bold text-[#255e37]">Đa dạng</div>
              <div className="text-[11px] text-[#5c4939] font-medium mt-0.5">Tài liệu khảo cứu</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
});
