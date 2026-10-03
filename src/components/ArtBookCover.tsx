import React from 'react';
import { BookOpen, Sparkles, Compass, ArrowRight } from 'lucide-react';
import { ProjectInfo } from '../types';

interface ArtBookCoverProps {
  projectInfo: ProjectInfo;
  isOpen: boolean;
  onOpenBook: () => void;
}

export const ArtBookCover: React.FC<ArtBookCoverProps> = ({
  projectInfo,
  isOpen,
  onOpenBook
}) => {
  if (isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#18100a]/92 backdrop-blur-md artbook-perspective select-none">
      
      {/* Ambient Desk Illumination */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(240,215,175,0.12)_0%,transparent_60%)] pointer-events-none" />

      {/* 3D Physical Closed Book Object */}
      <div 
        onClick={onOpenBook}
        className="group relative w-full max-w-xl sm:max-w-2xl aspect-[3/4] sm:aspect-[4/5] bg-[#342417] rounded-r-3xl rounded-l-md p-6 sm:p-10 flex flex-col justify-between shadow-[0_25px_70px_rgba(0,0,0,0.85),0_10px_25px_rgba(0,0,0,0.6)] cursor-pointer border border-[#4d3826] transition-all duration-700 hover:scale-[1.015] hover:shadow-[0_30px_90px_rgba(0,0,0,0.95)]"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%),
            linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 12%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cloth'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cloth)' opacity='0.08'/%3E%3C/svg%3E")
          `
        }}
      >
        {/* Left Book Spine & Stitched Hinge Depth */}
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-10 bg-gradient-to-r from-[#1b120b] via-[#2a1c12] to-transparent rounded-l-md pointer-events-none border-r border-[#523d2b]/40">
          {/* Subtle gold stitches */}
          <div className="h-full w-full flex flex-col justify-around py-8 items-center opacity-70">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1 h-3.5 bg-[#c4933f] rounded-xs shadow-xs" />
            ))}
          </div>
        </div>

        {/* Right Page Block Thickness Indicator */}
        <div className="absolute top-2 bottom-2 -right-3.5 w-3.5 bg-repeating-linear-gradient(to-right,#e5d5be_0px,#d4c1a7_1px,#f0e3ce_2px) rounded-r-md shadow-lg pointer-events-none opacity-90" />

        {/* Top Cover Foil Header */}
        <div className="pl-6 sm:pl-8 space-y-2">
          <div className="flex items-center justify-between border-b border-[#5a422f] pb-4">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#d4a34b]" />
              <span className="text-[11px] font-mono tracking-widest text-[#d4a34b] uppercase font-bold">
                TẬP SAN DI SẢN • HỌC LIỆU SỐ
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#a88d74]">NĂM 2026</span>
          </div>
        </div>

        {/* Center: Grand Embossed Gold Foil Cover Title */}
        <div className="pl-6 sm:pl-8 text-center sm:text-left space-y-4 my-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-[#1b120b]/60 border border-[#d4a34b]/30 text-[#e6ca65] text-xs font-mono tracking-wider">
            QUYỂN SÁCH TRANH VĂN HÓA
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-display font-extrabold text-[#fdfaf3] tracking-tight leading-[1.12] drop-shadow-md">
            HCMC<span className="text-[#d4a34b]">-CULTUREHUB</span>
          </h1>

          <p className="text-base sm:text-lg text-[#d9c7b2] font-serif-display italic max-w-md">
            "{projectInfo.slogan}"
          </p>

          {/* Traditional Cultural Seal Emblem on Cover */}
          <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
            <div className="w-12 h-12 rounded-xl border-2 border-[#a33827] bg-[#a33827]/15 flex items-center justify-center text-[#a33827] font-bold text-xs shadow-md">
              <div className="text-center leading-tight font-serif-display text-[10px]">
                ẤN TRIỆN<br />DI SẢN
              </div>
            </div>
            <div className="text-left text-xs text-[#a88d74]">
              <span className="text-[#d4a34b] font-semibold block">21 Điểm Đến Di Sản & 5 Không Gian</span>
              <span>Thành phố Hồ Chí Minh & Đông Nam Bộ</span>
            </div>
          </div>
        </div>

        {/* Bottom Action Prompt: Click to Open Book */}
        <div className="pl-6 sm:pl-8 pt-6 border-t border-[#5a422f] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#a88d74] text-center sm:text-left flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d4a34b]" />
            <span>Chạm để lật mở trang sách nghệ thuật</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenBook();
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#a33827] via-[#bd4b37] to-[#8f2c1d] text-white text-xs sm:text-sm font-bold shadow-xl shadow-black/50 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-[#d4a34b]/40 group-hover:scale-105"
          >
            <BookOpen className="w-4 h-4" />
            <span>Mở sách khám phá</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
