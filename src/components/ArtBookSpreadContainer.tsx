import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SlideData } from '../types';

interface ArtBookSpreadContainerProps {
  currentSpread: number;
  totalSpreads: number;
  currentSlide: SlideData;
  children: React.ReactNode;
  onNextSpread: () => void;
  onPrevSpread: () => void;
  isTurning: boolean;
  turnDirection: 'next' | 'prev';
}

export const ArtBookSpreadContainer: React.FC<ArtBookSpreadContainerProps> = ({
  currentSpread,
  totalSpreads,
  currentSlide,
  children,
  onNextSpread,
  onPrevSpread,
  isTurning,
  turnDirection
}) => {
  const leftPageNum = String(currentSpread * 2 + 1).padStart(2, '0');
  const rightPageNum = String(currentSpread * 2 + 2).padStart(2, '0');

  return (
    <div className="relative w-full max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8 my-auto select-text">
      
      {/* 3D Physical Open Book Body */}
      <div className="relative artbook-open-book border border-[#ded1bd] overflow-visible bg-[#fbf7ef]">
        
        {/* Left and Right Physical Page Edge Stacks (Thickness) */}
        <div className="hidden lg:block artbook-page-stack-left" />
        <div className="hidden lg:block artbook-page-stack-right" />

        {/* Center Spine Groove & Bookbinder Stitching */}
        <div className="hidden lg:block artbook-spine-gutter" />
        <div className="hidden lg:block artbook-spine-stitch" />

        {/* Center Page Curvature Shading (Natural Light Falloff into Bound Spine) */}
        <div className="hidden lg:block page-spread-gutter-shade page-gutter-left" style={{ right: '50%' }} />
        <div className="hidden lg:block page-spread-gutter-shade page-gutter-right" style={{ left: '50%' }} />

        {/* Hanging Silk Bookmark Ribbon Peeking from Top Binding Spine */}
        <div className="hidden lg:block absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-10 silk-bookmark-ribbon rounded-b-md shadow-md z-30 pointer-events-none border-b-2 border-[#d4a34b]">
          <div className="w-full h-full flex items-end justify-center pb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f5e3a9]/70" />
          </div>
        </div>

        {/* Dynamic 3D Page Turn Animation Leaf */}
        {isTurning && (
          <div 
            className={`hidden lg:block absolute inset-y-0 w-1/2 z-40 bg-[#fbf7ef] border border-[#dfd2be] ${
              turnDirection === 'next' 
                ? 'right-0 animate-page-flip-next shadow-2xl' 
                : 'left-0 animate-page-flip-prev shadow-2xl'
            }`}
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(36,24,15,0.18), rgba(255,255,255,0.3) 25%, rgba(245,237,222,0.95) 100%)'
            }}
          />
        )}

        {/* Top Book Margin Running Headers */}
        <div className="hidden lg:flex items-center justify-between px-10 py-3.5 border-b border-[#ebdcc6] text-[10px] font-mono text-[#8f7d6d] uppercase tracking-widest bg-[#faf6ee] rounded-t-xl select-none">
          <div className="w-1/2 pr-12 flex items-center justify-between">
            <span>HCMC CULTUREHUB • SÁCH NGHỆ THUẬT DI SẢN</span>
            <span className="font-bold text-[#a33827]">CHƯƠNG {currentSpread + 1} / {totalSpreads}</span>
          </div>
          <div className="w-1/2 pl-12 flex items-center justify-between border-l border-[#ebdcc6]">
            <span className="italic font-serif-display text-[#7d6b5b]">{currentSlide.category || 'Di sản văn hóa'}</span>
            <span>TẬP SAN ĐÔNG NAM BỘ 2026</span>
          </div>
        </div>

        {/* Main Spread Inner Content */}
        <div className="relative p-2 sm:p-6 lg:p-10 min-h-[76vh] flex flex-col justify-center">
          {children}
        </div>

        {/* Bottom Book Margin & Pagination */}
        <div className="hidden lg:flex items-center justify-between px-10 py-3.5 border-t border-[#ebdcc6] text-xs font-mono text-[#786452] bg-[#faf6ee] rounded-b-xl select-none">
          <div className="w-1/2 pr-12 flex items-center justify-between">
            <span className="font-bold text-[#a33827]">TRANG {leftPageNum}</span>
            <span className="text-[10px] text-[#a89886] italic font-serif-display">Di sản phương Nam • Ký ức đô thị</span>
          </div>
          <div className="w-1/2 pl-12 flex items-center justify-between border-l border-[#ebdcc6]">
            <span className="text-[10px] text-[#a89886] italic font-serif-display">Nền tảng học liệu tương tác trực quan</span>
            <span className="font-bold text-[#a33827]">TRANG {rightPageNum}</span>
          </div>
        </div>

        {/* Corner Dog-Ear Turners */}
        {currentSpread > 0 && (
          <div 
            onClick={onPrevSpread}
            className="hidden lg:block page-dogear-corner page-dogear-corner-bl"
            title="Lật về trang trước (Phím ←)"
          />
        )}

        {currentSpread < totalSpreads - 1 && (
          <div 
            onClick={onNextSpread}
            className="hidden lg:block page-dogear-corner page-dogear-corner-br"
            title="Lật sang trang tiếp theo (Phím →)"
          />
        )}

        {/* Floating Physical Book Turn Buttons */}
        {currentSpread > 0 && (
          <button
            onClick={onPrevSpread}
            className="absolute -left-4 sm:-left-7 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-[#fbf7ef] hover:bg-[#a33827] text-[#24180f] hover:text-white border border-[#dfd2be] shadow-2xl flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 group"
            title="Lật về trang trước (Phím ←)"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {currentSpread < totalSpreads - 1 && (
          <button
            onClick={onNextSpread}
            className="absolute -right-4 sm:-right-7 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-[#fbf7ef] hover:bg-[#a33827] text-[#24180f] hover:text-white border border-[#dfd2be] shadow-2xl flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 group"
            title="Lật sang trang tiếp theo (Phím →)"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}

      </div>

      {/* Mobile Page Indicator & Bottom Control Bar */}
      <div className="lg:hidden flex items-center justify-between py-4 px-2 text-xs text-[#a88d74] font-mono">
        <button
          onClick={onPrevSpread}
          disabled={currentSpread === 0}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border ${
            currentSpread === 0 
              ? 'opacity-40 border-[#5a422f]' 
              : 'bg-[#342417] text-white border-[#5a422f] hover:bg-[#a33827]'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Trước</span>
        </button>

        <span className="font-bold text-[#d4a34b]">
          Trang {leftPageNum} • {rightPageNum} ({currentSpread + 1}/{totalSpreads})
        </span>

        <button
          onClick={onNextSpread}
          disabled={currentSpread === totalSpreads - 1}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border ${
            currentSpread === totalSpreads - 1 
              ? 'opacity-40 border-[#5a422f]' 
              : 'bg-[#342417] text-white border-[#5a422f] hover:bg-[#a33827]'
          }`}
        >
          <span>Sau</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
