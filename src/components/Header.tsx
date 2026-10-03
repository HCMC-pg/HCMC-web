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
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#fbf7ef]/92 backdrop-blur-xl border-b border-[#dfd3be] transition-all duration-300 shadow-[0_2px_12px_rgba(67,52,35,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo - Traditional Cultural Seal Emblem */}
        <div 
          onClick={() => onSelectSlide(0)}
          className="flex items-center gap-3 cursor-pointer group select-none"
          id="brand-logo-btn"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b8863b] via-[#d4a34b] to-[#a33827] p-[1.5px] flex items-center justify-center shadow-md shadow-[#a33827]/15 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#fbf7ef] rounded-[9px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#a33827]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif-display font-bold tracking-wider text-xl text-[#2b2016] group-hover:text-[#a33827] transition-colors">
                HCMC<span className="text-[#a33827] font-extrabold">-CULTUREHUB</span>
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Slide Quick Jump - Vietnamese Editorial Ribbon */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#f4ece0] p-1.5 rounded-full border border-[#ded1be] shadow-inner">
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
                    ? 'bg-[#a33827] text-white font-bold shadow-md shadow-[#a33827]/25 scale-105'
                    : isGame
                    ? 'text-[#255e37] hover:text-[#1b4729] bg-[#e3f0e6] hover:bg-[#d5ebd9] border border-[#bdddc3]'
                    : 'text-[#4e3f31] hover:text-[#24180f] hover:bg-[#eae0cf]'
                }`}
              >
                {isGame && <Gamepad2 className="w-3.5 h-3.5 text-[#255e37]" />}
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search - Tra cứu */}
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#ffffff] hover:bg-[#fcf8f0] text-[#3c2f23] hover:text-[#a33827] border border-[#ded1be] hover:border-[#b8863b] transition-all flex items-center gap-2 text-xs font-semibold shadow-sm group"
            title="Tra cứu di tích, địa danh, học liệu (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-[#b8863b] group-hover:scale-110 transition-transform" />
            <span>Tra cứu</span>
            <kbd className="hidden lg:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 bg-[#f5ede0] text-[#6d5b4b] rounded border border-[#dfd3be] group-hover:border-[#b8863b]/50">
              ⌘K
            </kbd>
          </button>

          {/* Direct Web Game Link */}
          <a
            href="https://hcmc-pg.github.io/exploreculture/"
            target="_blank"
            rel="noopener noreferrer"
            id="header-webgame-btn"
            className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#e7f3ea] hover:bg-[#255e37] text-[#255e37] hover:text-white border border-[#bedfc6] hover:border-[#255e37] transition-all flex items-center gap-1.5 text-xs font-semibold shadow-sm group"
            title="Web game trải nghiệm di sản văn hóa Sài Gòn Kỳ Bí"
          >
            <Gamepad2 className="w-4 h-4 text-[#255e37] group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">Web Game</span>
          </a>

          {/* Survey Feedback Link Button */}
          <a
            href="https://forms.gle/baf2AwYp29T3joxd7"
            target="_blank"
            rel="noopener noreferrer"
            id="header-survey-btn"
            className="px-3.5 py-2 rounded-full bg-[#faece9] hover:bg-[#a33827] text-[#a33827] hover:text-white border border-[#edcac4] hover:border-[#a33827] transition-all flex items-center gap-1.5 text-xs font-semibold shadow-sm group"
            title="Khảo sát ý kiến trải nghiệm website HCMC CultureHub"
          >
            <ClipboardList className="w-4 h-4 text-[#a33827] group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">Khảo sát</span>
          </a>

          {/* Mobile menu trigger */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#f4ece0] border border-[#ded1be] text-[#3c2f23] hover:text-[#a33827]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Compass className="w-5 h-5 text-[#a33827]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fbf7ef]/98 backdrop-blur-2xl border-b border-[#dfd3be] px-4 py-4 space-y-3 shadow-xl animate-in fade-in duration-200">
          {/* Quick Search on Mobile - Tra cứu */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            id="mobile-search-btn"
            className="w-full p-3 rounded-xl bg-white border border-[#ded1be] text-[#2b2016] font-bold text-xs flex items-center justify-between shadow-sm hover:border-[#b8863b] transition-all"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#b8863b]" />
              <span>Tra cứu di tích & địa danh</span>
            </div>
            <span className="text-[10px] text-[#7d6b5b] font-mono">Tìm kiếm</span>
          </button>

          {/* Direct Web Game Link banner on mobile */}
          <a
            href="https://hcmc-pg.github.io/exploreculture/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-3 rounded-xl bg-[#e7f3ea] border border-[#bedfc6] text-[#255e37] font-bold text-xs flex items-center justify-between shadow-sm hover:bg-[#255e37] hover:text-white transition-all"
          >
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-[#255e37]" />
              <span>Trải nghiệm Web Game Sài Gòn Kỳ Bí</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://forms.gle/baf2AwYp29T3joxd7"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-3 rounded-xl bg-[#faece9] border border-[#edcac4] text-[#a33827] font-bold text-xs flex items-center justify-between shadow-sm hover:bg-[#a33827] hover:text-white transition-all"
          >
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-[#a33827]" />
              <span>Khảo sát ý kiến trải nghiệm website</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <p className="text-xs uppercase tracking-wider text-[#a33827] font-bold px-2 pt-1 font-serif-display">
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
                      ? 'bg-[#a33827] text-white font-bold shadow-sm' 
                      : isGame
                      ? 'bg-[#e7f3ea] text-[#255e37] hover:bg-[#d8eedd] border border-[#bedfc6]'
                      : 'bg-white/70 text-[#3d2e20] hover:bg-white border border-[#ebe2d3]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 h-5 rounded-full bg-[#f4ece0] text-[#5a4837] flex items-center justify-center font-mono text-[10px]">
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
