import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Compass, ArrowRight, CornerDownLeft } from 'lucide-react';
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
  const [isOpening, setIsOpening] = useState(false);

  // If already open, unmount
  if (isOpen && !isOpening) return null;

  const triggerOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpenBook();
      setIsOpening(false);
    }, 950);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 select-none transition-all duration-1000 ${
        isOpening ? 'bg-[#18100a]/40 backdrop-blur-xs pointer-events-none' : 'bg-[#18100a]/92 backdrop-blur-md'
      }`}
    >
      {/* Ambient Atelier Illumination Beam */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(240,215,175,0.18)_0%,transparent_65%)] pointer-events-none" />

      {/* Atmospheric Floating Dust / Gold Leaf Motes in Light Beam */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-[#f3d179]/25 blur-[1px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-[#f3d179]/20 blur-[1px] animate-pulse delay-500" />
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-[#a33827]/30 blur-[1px] animate-pulse delay-700" />
      </div>

      {/* 3D Perspective Stage for the Book Cover */}
      <div 
        className="w-full max-w-xl sm:max-w-2xl aspect-[3/4] sm:aspect-[4/5] relative perspective-[2500px]"
        onClick={triggerOpen}
      >
        {/* Under-Cover Base (Trang Lót Lụa Marbled Endpaper revealed as the cover opens) */}
        <div 
          className="absolute inset-0 rounded-r-3xl rounded-l-md bg-[#faf4e6] border-2 border-[#dfd2be] p-8 sm:p-12 flex flex-col justify-between shadow-[0_30px_90px_rgba(0,0,0,0.85)] pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 50% 50%, rgba(212,163,75,0.08) 0%, transparent 70%),
              url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' opacity='0.04'/%3E%3C/svg%3E")
            `
          }}
        >
          <div className="flex items-center justify-between border-b border-[#ded0b8] pb-4">
            <span className="text-[11px] font-mono text-[#8f7d6d] uppercase tracking-widest">
              TRANG LÓT DI SẢN • ARCHIVAL ENDPAPER
            </span>
            <span className="text-[11px] font-serif-display italic text-[#a33827]">Thành phố Hồ Chí Minh</span>
          </div>

          <div className="text-center space-y-3 my-auto">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#a33827]/10 border border-[#a33827]/30 flex items-center justify-center text-[#a33827]">
              <Compass className="w-7 h-7 text-[#a33827] animate-spin-slow" />
            </div>
            <h2 className="text-2xl font-serif-display font-bold text-[#24180f]">
              Đang lật mở trang sách di sản...
            </h2>
            <p className="text-xs text-[#786452] font-serif-display italic max-w-sm mx-auto">
              Bước vào bức tranh văn hóa đa tầng của đô thị phương Nam
            </p>
          </div>

          <div className="border-t border-[#ded0b8] pt-3 text-center text-[10px] font-mono text-[#a89886]">
            CHƯƠNG I: KHỞI HÀNH & TOÀN CẢNH DI SẢN
          </div>
        </div>

        {/* 3D Physical Swinging Front Cover */}
        <div 
          className={`group relative w-full h-full bg-[#342417] rounded-r-3xl rounded-l-md p-6 sm:p-10 flex flex-col justify-between shadow-[0_25px_70px_rgba(0,0,0,0.85),0_10px_25px_rgba(0,0,0,0.6)] cursor-pointer border border-[#4d3826] transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isOpening 
              ? '-rotate-y-130 -translate-x-6 shadow-[-30px_30px_60px_rgba(0,0,0,0.9)] opacity-95' 
              : 'hover:scale-[1.012] hover:shadow-[0_30px_90px_rgba(0,0,0,0.95)]'
          }`}
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            backgroundImage: `
              linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%),
              linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 12%),
              url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cloth'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cloth)' opacity='0.09'/%3E%3C/svg%3E")
            `
          }}
        >
          {/* Left Book Spine & Stitched Hinge Depth */}
          <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-10 bg-gradient-to-r from-[#1b120b] via-[#2a1c12] to-transparent rounded-l-md pointer-events-none border-r border-[#523d2b]/40">
            {/* Subtle gold stitches */}
            <div className="h-full w-full flex flex-col justify-around py-8 items-center opacity-75">
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
              <div className="w-12 h-12 rounded-xl border-2 border-[#a33827] bg-[#a33827]/20 flex items-center justify-center text-[#d4a34b] font-bold text-xs shadow-md">
                <div className="text-center leading-tight font-serif-display text-[10px] text-[#e85a44]">
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
              <span>Chạm vào bìa sách hoặc nhấn nút để mở</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerOpen();
              }}
              disabled={isOpening}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#a33827] via-[#bd4b37] to-[#8f2c1d] text-white text-xs sm:text-sm font-bold shadow-xl shadow-black/50 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-[#d4a34b]/40 group-hover:scale-105"
            >
              <BookOpen className="w-4 h-4" />
              <span>{isOpening ? 'Đang mở sách...' : 'Mở sách khám phá'}</span>
              <ArrowRight className={`w-4 h-4 transition-transform ${isOpening ? 'translate-x-2' : 'group-hover:translate-x-1'}`} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
