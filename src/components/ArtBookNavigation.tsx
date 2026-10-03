import React, { useState } from 'react';
import { 
  BookMarked, 
  Search, 
  Compass, 
  Gamepad2, 
  ClipboardList, 
  ChevronRight, 
  BookOpen, 
  X,
  ExternalLink
} from 'lucide-react';
import { SlideData } from '../types';

interface ArtBookNavigationProps {
  currentSpread: number;
  slides: SlideData[];
  onSelectSpread: (spreadIndex: number) => void;
  onOpenSearch: () => void;
  onCloseBook: () => void;
}

export const ArtBookNavigation: React.FC<ArtBookNavigationProps> = ({
  currentSpread,
  slides,
  onSelectSpread,
  onOpenSearch,
  onCloseBook
}) => {
  const [isIndexOpen, setIsIndexOpen] = useState(false);

  const getChapterName = (slide: SlideData, idx: number) => {
    if (idx === 0) return 'Khởi Hành';
    if (idx === 1) return 'Ký Ức Đô Thị';
    if (idx === 2) return 'Kiến Trúc & Tín Ngưỡng';
    if (idx === 3) return 'Đời Sống Thị Dân';
    if (idx === 4) return 'Diễn Xướng & Nghề';
    if (idx === 5) return 'Sông Nước & Biển';
    if (idx === 6) return 'Bản Đồ Địa Chí';
    if (idx === 7) return 'Web Game 3D';
    return 'Lời Bạt & Khảo Sát';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-8 py-3 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Emblem on Wooden Desk */}
        <div 
          onClick={onCloseBook}
          className="pointer-events-auto flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#342417]/90 hover:bg-[#453020] text-[#fdfaf3] border border-[#5a422f] shadow-lg backdrop-blur-md transition-all cursor-pointer group"
          title="Đóng sách về trang bìa"
        >
          <div className="w-7 h-7 rounded-full bg-[#a33827] flex items-center justify-center text-white shadow-xs">
            <Compass className="w-4 h-4 text-[#f5e3a9]" />
          </div>
          <span className="font-serif-display font-bold text-sm tracking-wide">
            HCMC<span className="text-[#d4a34b]">-CULTUREHUB</span>
          </span>
          <span className="text-[10px] text-[#a88d74] font-mono border-l border-[#5a422f] pl-2 hidden sm:inline">
            SÁCH NGHỆ THUẬT
          </span>
        </div>

        {/* Center: Hanging Silk Bookmark Ribbon & Chapter Selector */}
        <div className="pointer-events-auto relative">
          <button
            onClick={() => setIsIndexOpen(!isIndexOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#a33827] hover:bg-[#bd4b37] text-white text-xs font-semibold shadow-xl border border-[#c45a47] transition-all cursor-pointer group hover:scale-105 active:scale-95"
            title="Mục lục các chương sách nghệ thuật"
          >
            <BookMarked className="w-4 h-4 text-[#f5e3a9]" />
            <span className="hidden sm:inline">Mục Lục Chương</span>
            <span className="font-mono text-[#f5e3a9] bg-black/25 px-1.5 py-0.5 rounded-md text-[10px]">
              0{currentSpread + 1}
            </span>
          </button>

          {/* Dropdown Chapter Index Drawer (Bản Mục Lục Sách Nghệ Thuật) */}
          {isIndexOpen && (
            <div 
              className="absolute top-12 left-1/2 -translate-x-1/2 w-80 sm:w-96 bg-[#fbf7ef] border-2 border-[#dfd2be] rounded-3xl p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-[#24180f] animate-in fade-in zoom-in-95 duration-200 z-50"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'0/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.03\'/%3E%3C/svg%3E")'
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#ebdcc6]">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#a33827]" />
                  <h4 className="font-serif-display font-bold text-sm text-[#24180f]">
                    Mục Lục Trang Sách Di Sản
                  </h4>
                </div>
                <button
                  onClick={() => setIsIndexOpen(false)}
                  className="p-1 rounded-full hover:bg-[#ebdcc6] text-[#786452] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-3 space-y-1.5 max-h-[60vh] overflow-y-auto">
                {slides.map((s, idx) => {
                  const isActive = currentSpread === idx;
                  const chapterLabel = getChapterName(s, idx);
                  const isGame = idx === 7;

                  return (
                    <button
                      key={s.id || idx}
                      onClick={() => {
                        onSelectSpread(idx);
                        setIsIndexOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#a33827] text-white font-bold shadow-md'
                          : isGame
                          ? 'bg-[#e8f4eb] text-[#1b4e2a] hover:bg-[#d8eedd]'
                          : 'hover:bg-[#f3ebd9] text-[#3d2e21]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-[#e8decb] text-[#5c4a39]'
                        }`}>
                          0{idx + 1}
                        </span>
                        <span className="truncate">{chapterLabel}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-white' : ''}`} />
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-[#ebdcc6] flex items-center justify-between text-[11px] text-[#786452]">
                <span>Phím ← → lật trang nhanh</span>
                <button
                  onClick={() => {
                    setIsIndexOpen(false);
                    onCloseBook();
                  }}
                  className="text-[#a33827] hover:underline font-semibold"
                >
                  Đóng bìa sách
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Quick Search, Web Game & Survey Actions */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Quick Search - Tra cứu di sản */}
          <button
            onClick={onOpenSearch}
            className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#fbf7ef]/90 hover:bg-[#ffffff] text-[#24180f] hover:text-[#a33827] border border-[#dfd2be] shadow-md backdrop-blur-md transition-all flex items-center gap-2 text-xs font-semibold cursor-pointer group"
            title="Tra cứu di tích, địa danh (⌘K / Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#b8863b] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Tra cứu</span>
            <kbd className="hidden lg:inline-flex text-[9px] font-mono px-1 py-0.2 bg-[#ebdcc6] rounded text-[#5c4a39]">
              ⌘K
            </kbd>
          </button>

          {/* Web Game button */}
          <a
            href="https://hcmc-pg.github.io/exploreculture/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#e8f4eb]/90 hover:bg-[#255e37] text-[#1b4e2a] hover:text-white border border-[#badbc2] shadow-md backdrop-blur-md transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer group"
            title="Web game 3D Sài Gòn Kỳ Bí"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-[#255e37] group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">Web Game</span>
          </a>

          {/* Survey link */}
          <a
            href="https://forms.gle/baf2AwYp29T3joxd7"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#faece9]/90 hover:bg-[#a33827] text-[#a33827] hover:text-white border border-[#edcac4] shadow-md backdrop-blur-md transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer group"
            title="Khảo sát ý kiến đóng góp website"
          >
            <ClipboardList className="w-3.5 h-3.5 text-[#a33827] group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">Khảo sát</span>
          </a>
        </div>

      </div>
    </header>
  );
};
