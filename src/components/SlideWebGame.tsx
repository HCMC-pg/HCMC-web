import React, { useState, useRef, useEffect, memo } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  ExternalLink, 
  Maximize2, 
  Minimize2, 
  RotateCw, 
  Map, 
  ArrowRight,
  Play,
  Pause
} from 'lucide-react';

interface SlideWebGameProps {
  onNextSlide?: () => void;
}

export const SlideWebGame: React.FC<SlideWebGameProps> = memo(({ onNextSlide }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isActivated, setIsActivated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  const gameUrl = "https://hcmc-pg.github.io/exploreculture/";

  // Auto-activate when user scrolls near this section or navigates directly to it
  useEffect(() => {
    // 1. Proximity auto-loader (loads when user scrolls within 350px of game)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsActivated(true);
          observer.disconnect();
        }
      },
      { rootMargin: '350px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // 2. Custom event listener: when user clicks "Trải nghiệm Web Game" button
    const onActivate = () => {
      setIsActivated(true);
      setIsLoading(true);
    };
    window.addEventListener('activate-web-game', onActivate);

    return () => {
      observer.disconnect();
      window.removeEventListener('activate-web-game', onActivate);
    };
  }, []);

  // Ensure loading spinner never gets stuck on slow network or delayed iframe load event
  useEffect(() => {
    if (!isActivated) return;
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [iframeKey, isActivated]);

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <section 
      ref={sectionRef}
      id="slide-game"
      className="relative min-h-[90vh] py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Header Eyebrow & Titles */}
      <div className="border-b border-white/10 pb-5 mb-8 animate-fade-rise">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[#f5e3a9] text-xs font-semibold backdrop-blur-md flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5 text-[#e6ca65]" />
              <span>WEB GAME TRẢI NGHIỆM TƯƠNG TÁC</span>
            </span>
            <span className="text-xs text-white/50 font-mono hidden sm:inline">
              SÀI GÒN KỲ BÍ • HCMC CULTUREHUB
            </span>
          </div>

          <a
            href={gameUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="open-game-new-tab-btn"
            className="px-3.5 py-1.5 rounded-full bg-[#c29b38]/20 hover:bg-[#c29b38]/30 border border-[#c29b38]/40 text-[#f5e3a9] hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Mở game ở tab mới</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-white tracking-tight">
          Sài Gòn Kỳ Bí - Game Khám Phá Di Sản & Văn Hóa TP.HCM
        </h2>
        <p className="text-sm sm:text-base text-[#e6ca65] mt-1 font-serif-display italic font-medium">
          Hòa mình vào không gian 3D tương tác, giải mã mật thư lịch sử và thu thập huy hiệu di sản phương Nam
        </p>

        {/* Feature Pill Grid */}
        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl liquid-glass border border-white/10 text-xs text-white/85 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#c29b38]/20 flex items-center justify-center shrink-0 border border-[#c29b38]/30">
              <Map className="w-4 h-4 text-[#f5e3a9]" />
            </div>
            <div>
              <div className="font-semibold text-white">Bản đồ 3D tương tác</div>
              <div className="text-[11px] text-white/60">Dạo bước di sản đô thị</div>
            </div>
          </div>

          <div className="p-3 rounded-xl liquid-glass border border-white/10 text-xs text-white/85 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Sparkles className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <div className="font-semibold text-white">Nhiệm vụ giải mật thư</div>
              <div className="text-[11px] text-white/60">Thử thách câu đố lịch sử</div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Iframe Showcase Frame */}
      <div 
        ref={iframeContainerRef}
        className={`transition-all duration-300 ${
          isFullscreen 
            ? 'fixed inset-0 z-50 bg-black/95 p-2 sm:p-4 flex flex-col' 
            : 'relative rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl liquid-glass'
        }`}
      >
        {/* Game Top Control Bar */}
        <div className="px-4 py-3 bg-black/70 border-b border-white/10 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isActivated ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span className="font-semibold text-white">Sài Gòn Kỳ Bí</span>
            <span className="text-white/40 hidden sm:inline">
              {isActivated ? '• Trải nghiệm 3D trực tiếp' : '• Chế độ tiết kiệm tài nguyên'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isActivated && (
              <>
                <button
                  onClick={() => setIsActivated(false)}
                  className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors flex items-center gap-1.5"
                  title="Tạm dừng game để giải phóng bộ nhớ RAM & GPU thiết bị"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tạm dừng 3D</span>
                </button>

                <button
                  onClick={handleReload}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  title="Tải lại game"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors flex items-center gap-1.5"
                  title={isFullscreen ? "Thu nhỏ" : "Phóng to toàn màn hình"}
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Thu nhỏ</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Phóng to</span>
                    </>
                  )}
                </button>
              </>
            )}

            <a
              href={gameUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#c29b38] to-[#d4af37] text-slate-950 font-bold hover:brightness-110 transition-all flex items-center gap-1"
            >
              <span>Mở tab mới</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Live Iframe Element or Smart Activation Preview */}
        <div className={`relative w-full ${isFullscreen ? 'flex-1' : 'h-[520px] sm:h-[620px] lg:h-[680px]'}`}>
          {!isActivated ? (
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d1420] via-[#080d15] to-[#04060a] flex flex-col items-center justify-center p-6 text-center select-none">
              <div className="w-16 h-16 rounded-2xl bg-[#c29b38]/15 border border-[#c29b38]/40 flex items-center justify-center text-[#f5e3a9] mb-4 shadow-xl shadow-[#c29b38]/15">
                <Gamepad2 className="w-8 h-8 text-[#e6ca65]" />
              </div>

              <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-white mb-2">
                Sài Gòn Kỳ Bí: 3D Heritage Experience
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mb-6 leading-relaxed">
                Khám phá di sản Nam Bộ qua đồ họa 3D tương tác. Chế độ tải thông minh tự động kích hoạt khi đến gần để không làm chậm máy khi nhiều người cùng vào web.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setIsActivated(true);
                    setIsLoading(true);
                  }}
                  id="activate-game-btn"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#c29b38] via-[#d4af37] to-[#997523] text-slate-950 font-bold text-sm shadow-xl shadow-[#c29b38]/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Khởi chạy Web Game ngay</span>
                </button>

                <a
                  href={gameUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2"
                >
                  <span>Mở ở tab mới</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Tải thông minh (Zero-lag)
                </span>
                <span>•</span>
                <span>Tối ưu cho cả điện thoại & máy tính</span>
              </div>
            </div>
          ) : (
            <>
              {isLoading && (
                <div className="absolute inset-0 bg-black/60 pointer-events-none flex flex-col items-center justify-center gap-3 z-10 transition-opacity duration-300">
                  <div className="w-10 h-10 border-2 border-[#c29b38]/30 border-t-[#e6ca65] rounded-full animate-spin" />
                  <p className="text-xs text-[#f5e3a9] font-medium">Đang khởi chạy Web Game Sài Gòn Kỳ Bí...</p>
                </div>
              )}

              <iframe
                key={iframeKey}
                src={gameUrl}
                title="Sài Gòn Kỳ Bí - Game Khám Phá Di Sản & Văn Hóa TP.HCM"
                className="w-full h-full border-0 bg-black"
                loading="lazy"
                allow="fullscreen; autoplay; geolocation; microphone; camera; encrypted-media; xr-spatial-tracking; payment; midi; accelerometer; gyroscope"
                onLoad={() => setIsLoading(false)}
              />
            </>
          )}
        </div>
      </div>

      {/* Bottom Footer Tip & Navigation */}
      <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#e6ca65]" />
          <span>Mẹo: Bạn có thể click phóng to hoặc mở tab mới để tận hưởng đồ họa và âm thanh game tốt nhất.</span>
        </div>

        {onNextSlide && (
          <button
            onClick={onNextSlide}
            className="flex items-center gap-1.5 text-[#c29b38] hover:text-[#f5e3a9] font-semibold transition-colors ml-auto"
          >
            <span>Tìm hiểu hành trình sáng lập</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </section>
  );
});

