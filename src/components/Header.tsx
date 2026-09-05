import React, { useState } from 'react';
import { 
  BookOpen, 
  MapPin, 
  Sparkles, 
  Info, 
  Search, 
  ChevronRight,
  Compass,
  X,
  ClipboardList,
  ExternalLink,
  Gamepad2
} from 'lucide-react';
import { SlideData } from '../types';

interface HeaderProps {
  currentSlide: number;
  slides: SlideData[];
  onSelectSlide: (slideIndex: number) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSlide,
  slides,
  onSelectSlide,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getNavLabel = (slide: SlideData, idx: number) => {
    if (slide.id === 'game' || slide.category?.includes('GAME') || slide.primaryTitle?.includes('Game')) {
      return 'Web Game';
    }
    if (idx === 0) return 'Trang chủ';
    if (idx >= 1 && idx <= 5) return `Nhóm ${idx}`;
    if (idx === 6) return 'Bản đồ';
    return 'Giới thiệu';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/10 transition-all duration-300 liquid-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onSelectSlide(0)}
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo-btn"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c29b38] via-[#e6ca65] to-[#997523] p-[1px] flex items-center justify-center shadow-lg shadow-[#c29b38]/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#000000] rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#e6ca65]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-display font-bold tracking-wider text-xl text-white group-hover:text-[#e6ca65] transition-colors">
                HCMC<span className="text-[#c29b38]">-CULTUREHUB</span>
              </span>
            </div>
            <p className="text-[11px] text-white/60 font-medium hidden sm:block">
              Không gian văn hóa & di sản Nam Bộ
            </p>
          </div>
        </div>

        {/* Desktop Slide Quick Jump - Clean labels, no S1, S2 */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {slides.map((slide, idx) => {
            const isActive = currentSlide === idx;
            const label = getNavLabel(slide, idx);
            const isGame = label === 'Web Game';
            return (
              <button
                key={slide.id || idx}
                id={`nav-slide-${slide.id || idx}`}
                onClick={() => onSelectSlide(idx)}
                title={slide.primaryTitle}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#c29b38] to-[#d4af37] text-slate-950 font-bold shadow-md shadow-[#c29b38]/30 scale-105'
                    : isGame
                    ? 'text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/15'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {isGame && <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Direct Web Game Link */}
          <a
            href="https://maries2345678-spec.github.io/HCMC-CulturzlHub/"
            target="_blank"
            rel="noopener noreferrer"
            id="header-webgame-btn"
            className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/35 hover:border-emerald-400 transition-all flex items-center gap-1.5 text-xs font-semibold shadow-sm group"
            title="Web game trải nghiệm di sản văn hóa Sài Gòn Kỳ Bí"
          >
            <Gamepad2 className="w-4 h-4 text-emerald-400 group-hover:text-slate-950 transition-colors" />
            <span className="hidden sm:inline">Web Game</span>
          </a>

          {/* Quick Search */}
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            className="p-2 sm:px-3 sm:py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center gap-2 text-xs"
            title="Tìm kiếm di tích, nhóm học liệu"
          >
            <Search className="w-4 h-4 text-[#e6ca65]" />
            <span className="hidden md:inline">Tra cứu</span>
          </button>

          {/* Survey Feedback Link Button */}
          <a
            href="https://forms.gle/baf2AwYp29T3joxd7"
            target="_blank"
            rel="noopener noreferrer"
            id="header-survey-btn"
            className="px-3.5 py-2 rounded-full bg-[#c29b38]/20 hover:bg-[#c29b38] text-[#f5e3a9] hover:text-slate-950 border border-[#c29b38]/40 transition-all flex items-center gap-1.5 text-xs font-semibold shadow-sm group"
            title="Khảo sát ý kiến trải nghiệm website HCMC CultureHub"
          >
            <ClipboardList className="w-4 h-4 text-[#e6ca65] group-hover:text-slate-950 transition-colors" />
            <span className="hidden sm:inline">Khảo sát</span>
          </a>

          {/* Mobile menu trigger */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Compass className="w-5 h-5 text-[#c29b38]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-2xl border-b border-white/15 px-4 py-4 space-y-3 shadow-2xl animate-in fade-in duration-200">
          {/* Direct Web Game Link banner on mobile */}
          <a
            href="https://maries2345678-spec.github.io/HCMC-CulturzlHub/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center justify-between shadow-sm hover:bg-emerald-500 hover:text-slate-950 transition-all"
          >
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-emerald-400" />
              <span>Trải nghiệm Web Game Sài Gòn Kỳ Bí</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://forms.gle/baf2AwYp29T3joxd7"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-3 rounded-xl bg-[#c29b38]/20 border border-[#c29b38]/50 text-[#f5e3a9] font-bold text-xs flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-[#e6ca65]" />
              <span>Khảo sát ý kiến trải nghiệm website</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <p className="text-xs uppercase tracking-wider text-[#c29b38] font-bold px-2 pt-1">
            Danh mục Học liệu & Không gian Trải nghiệm
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {slides.map((slide, idx) => {
              const label = getNavLabel(slide, idx);
              const isGame = label === 'Web Game';
              return (
                <button
                  key={slide.id || idx}
                  onClick={() => {
                    onSelectSlide(idx);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                    currentSlide === idx 
                      ? 'bg-[#c29b38] text-slate-950 font-bold' 
                      : isGame
                      ? 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/25'
                      : 'bg-white/5 text-white/80 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center font-mono text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="truncate">{slide.primaryTitle}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0 opacity-60" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
