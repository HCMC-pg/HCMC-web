import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ArtBookSpreadProps {
  spreadIndex: number;
  totalSpreads: number;
  leftPageContent: React.ReactNode;
  rightPageContent: React.ReactNode;
  onNextPage: () => void;
  onPrevPage: () => void;
  isTurning: boolean;
  turnDirection: 'next' | 'prev';
}

export const ArtBookSpread: React.FC<ArtBookSpreadProps> = ({
  spreadIndex,
  totalSpreads,
  leftPageContent,
  rightPageContent,
  onNextPage,
  onPrevPage,
  isTurning,
  turnDirection
}) => {
  const leftPageNumber = String(spreadIndex * 2 + 1).padStart(2, '0');
  const rightPageNumber = String(spreadIndex * 2 + 2).padStart(2, '0');

  return (
    <div className="relative w-full max-w-[1400px] mx-auto my-4 sm:my-8 px-2 sm:px-6 lg:px-8">
      
      {/* 3D Physical Open Book Shell */}
      <div className="relative artbook-open-book border border-[#ded1bd] overflow-visible">
        
        {/* Physical Paper Stack Thickness (Left and Right book edges) */}
        <div className="hidden lg:block artbook-page-stack-left" />
        <div className="hidden lg:block artbook-page-stack-right" />

        {/* Center Spine Groove & Bookbinder Stitching */}
        <div className="hidden lg:block artbook-spine-gutter" />
        <div className="hidden lg:block artbook-spine-stitch" />

        {/* 3D Page Turn Animation Overlay Leaf */}
        {isTurning && (
          <div 
            className={`hidden lg:block absolute inset-y-0 w-1/2 z-40 bg-[#fbf7ef] border border-[#dfd2be] ${
              turnDirection === 'next' 
                ? 'right-0 animate-page-flip-next shadow-2xl' 
                : 'left-0 animate-page-flip-prev shadow-2xl'
            }`}
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(36,24,15,0.1), rgba(255,255,255,0.3))'
            }}
          />
        )}

        {/* Two-Page Spread Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[82vh] lg:min-h-[86vh] relative">
          
          {/* ========================================================
              LEFT PAGE (Trang Trái)
             ======================================================== */}
          <div className="lg:col-span-6 bg-[#fdfbf6] artbook-page-left-shade p-5 sm:p-8 lg:p-12 lg:pr-14 flex flex-col justify-between relative rounded-l-xl">
            {/* Top Page Micro-Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#ebdcc6] text-[10px] font-mono text-[#8f7d6d] uppercase tracking-widest select-none">
              <span>HCMC CULTUREHUB • SÁCH NGHỆ THUẬT</span>
              <span>CHƯƠNG {spreadIndex + 1} / {totalSpreads}</span>
            </div>

            {/* Left Page Body Content */}
            <div className="flex-1">
              {leftPageContent}
            </div>

            {/* Left Page Footer & Pagination */}
            <div className="pt-4 mt-6 border-t border-[#ebdcc6] flex items-center justify-between text-xs text-[#786452] font-mono select-none">
              <span className="font-bold text-[#a33827]">TRANG {leftPageNumber}</span>
              <span className="text-[10px] text-[#a89886] hidden sm:inline italic font-serif-display">Di sản phương Nam</span>
            </div>

            {/* Bottom-Left Corner Turn Dog-Ear (Lật trang trước) */}
            {spreadIndex > 0 && (
              <div 
                onClick={onPrevPage}
                className="hidden lg:block page-dogear-corner page-dogear-corner-bl"
                title="Lật về trang trước"
              />
            )}
          </div>

          {/* ========================================================
              RIGHT PAGE (Trang Phải)
             ======================================================== */}
          <div className="lg:col-span-6 bg-[#fbf8f0] artbook-page-right-shade p-5 sm:p-8 lg:p-12 lg:pl-14 flex flex-col justify-between relative rounded-r-xl border-t lg:border-t-0 lg:border-l border-[#ebdcc6]">
            {/* Top Page Micro-Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#ebdcc6] text-[10px] font-mono text-[#8f7d6d] uppercase tracking-widest select-none">
              <span className="italic font-serif-display hidden sm:inline">Không gian văn hóa Thành phố Hồ Chí Minh</span>
              <span>TẬP SAN DI SẢN 2026</span>
            </div>

            {/* Right Page Body Content */}
            <div className="flex-1">
              {rightPageContent}
            </div>

            {/* Right Page Footer & Pagination */}
            <div className="pt-4 mt-6 border-t border-[#ebdcc6] flex items-center justify-between text-xs text-[#786452] font-mono select-none">
              <span className="text-[10px] text-[#a89886] hidden sm:inline italic font-serif-display">Ký ức & Tri thức</span>
              <span className="font-bold text-[#a33827]">TRANG {rightPageNumber}</span>
            </div>

            {/* Bottom-Right Corner Turn Dog-Ear (Lật trang sau) */}
            {spreadIndex < totalSpreads - 1 && (
              <div 
                onClick={onNextPage}
                className="hidden lg:block page-dogear-corner page-dogear-corner-br"
                title="Lật sang trang tiếp theo"
              />
            )}
          </div>

        </div>

        {/* Floating Physical Book Turn Buttons on Outer Edges */}
        {spreadIndex > 0 && (
          <button
            onClick={onPrevPage}
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#fbf7ef] hover:bg-[#a33827] text-[#24180f] hover:text-white border border-[#dfd2be] shadow-xl flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
            title="Lật về trang trước (Phím mũi tên trái)"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {spreadIndex < totalSpreads - 1 && (
          <button
            onClick={onNextPage}
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#fbf7ef] hover:bg-[#a33827] text-[#24180f] hover:text-white border border-[#dfd2be] shadow-xl flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
            title="Lật sang trang tiếp theo (Phím mũi tên phải)"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

      </div>
    </div>
  );
};
