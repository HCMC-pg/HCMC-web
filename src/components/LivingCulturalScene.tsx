import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
import { getMediaUrl } from '../utils/mediaFallback';

export type CulturalMotionType = 
  | 'river_water'       // Bến Nhà Rồng, Bạch Đằng, Cầu Ba Son, Kênh Nhiêu Lộc
  | 'garden_breeze'     // Dinh Độc Lập, Địa Đạo Củ Chi, Lăng Ông Bà Chiểu
  | 'sacred_temple'     // Chùa Vĩnh Nghiêm, Chùa Bà Thiên Hậu
  | 'heritage_monument' // Nhà Thờ Đức Bà, Bưu Điện Trung Tâm, Nhà Hát Thành Phố
  | 'market_boulevard'  // Chợ Bến Thành, Phố Đi Bộ Nguyễn Huệ, Chợ Bình Tây
  | 'artisan_craft'     // Gốm Sứ Lái Thiêu, Sơn Mài Tương Bình Hiệp, Đờn Ca Tài Tử
  | 'coastal_sea'       // Côn Đảo, Rừng Sác Cần Giờ, Vũng Tàu
  | 'panoramic_hero';   // Bức họa toàn cảnh trang chủ

interface LivingCulturalSceneProps {
  imageSrc: string;
  alt: string;
  placeName?: string;
  className?: string;
  aspectClassName?: string;
  isHero?: boolean;
  priority?: boolean;
}

// Map each place name to its authentic environmental motion profile
export function getMotionProfile(placeName: string = ''): CulturalMotionType {
  const norm = placeName.toLowerCase();
  
  if (norm.includes('nhà rồng') || norm.includes('bạch đằng') || norm.includes('ba son') || norm.includes('nhiêu lộc') || norm.includes('sông sài gòn')) {
    return 'river_water';
  }
  if (norm.includes('độc lập') || norm.includes('củ chi') || norm.includes('bà chiểu') || norm.includes('công viên')) {
    return 'garden_breeze';
  }
  if (norm.includes('chùa') || norm.includes('đền') || norm.includes('miếu') || norm.includes('thiên hậu') || norm.includes('vĩnh nghiêm')) {
    return 'sacred_temple';
  }
  if (norm.includes('đức bà') || norm.includes('bưu điện') || norm.includes('nhà hát')) {
    return 'heritage_monument';
  }
  if (norm.includes('chợ') || norm.includes('nguyễn huệ') || norm.includes('bình tây')) {
    return 'market_boulevard';
  }
  if (norm.includes('gốm') || norm.includes('sơn mài') || norm.includes('tài tử') || norm.includes('làng nghề')) {
    return 'artisan_craft';
  }
  if (norm.includes('côn đảo') || norm.includes('rừng sác') || norm.includes('cần giờ') || norm.includes('biển') || norm.includes('vũng tàu')) {
    return 'coastal_sea';
  }
  return 'panoramic_hero';
}

export const LivingCulturalScene: React.FC<LivingCulturalSceneProps> = memo(({
  imageSrc,
  alt,
  placeName = '',
  className = '',
  aspectClassName = 'h-full w-full',
  isHero = false,
  priority = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAwakened, setIsAwakened] = useState(false);
  const [imgError, setImgError] = useState(false);

  const motionType = useMemo(() => getMotionProfile(placeName), [placeName]);
  const primaryUrl = getMediaUrl(imageSrc);

  // IntersectionObserver: Only activate living motion when visible to guarantee 60fps
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
            setIsAwakened(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // DELAYED AWAKENING EFFECT (The 1-2 second intentional still-to-alive reveal)
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      setIsAwakened(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden group select-none ${className}`}
    >
      {/* 1. Base Original Image Asset (100% UNCHANGED, Crisp & Resilient) */}
      <div className={`relative overflow-hidden ${aspectClassName}`}>
        <img
          src={imgError ? getMediaUrl('./assets/hero_hcmc_hub.webp') : primaryUrl}
          alt={alt || placeName}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover transition-transform duration-1000 ease-out gpu-accelerated ${
            isHero ? 'scale-[1.01]' : 'group-hover:scale-105'
          } ${
            isAwakened ? 'brightness-[1.01] contrast-[1.02]' : 'brightness-[0.98]'
          }`}
        />

        {/* 2. Natural Atmospheric Shadow Scrim (Architecture remains stable) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#24180f]/75 via-[#24180f]/15 to-transparent pointer-events-none" />

        {/* 3. LIVING ENVIRONMENTAL MOTION LAYERS (Awakened after 1.2s of observation) */}
        {isVisible && (
          <div 
            className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out ${
              isAwakened ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* LAYER A: SKY & DRIFTING CLOUDS (for outdoor vista landscapes) */}
            {(motionType === 'panoramic_hero' || motionType === 'river_water' || motionType === 'coastal_sea' || motionType === 'heritage_monument') && (
              <div className="absolute top-0 left-0 right-0 h-1/3 overflow-hidden pointer-events-none opacity-25">
                {/* Slow drifting cloud layer 1 */}
                <div 
                  className="absolute inset-0 w-[200%] h-full animate-clouds-pan text-[#fffdf8]"
                  style={{
                    backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)',
                    animationDuration: '65s'
                  }}
                />
                {/* Slow drifting cloud layer 2 */}
                <div 
                  className="absolute inset-0 w-[200%] h-full animate-clouds-pan-reverse text-[#fffdf8]"
                  style={{
                    backgroundImage: 'radial-gradient(ellipse at 70% 40%, rgba(255,245,220,0.3) 0%, transparent 65%)',
                    animationDuration: '95s'
                  }}
                />
              </div>
            )}

            {/* LAYER B: WATER & RIVER LIGHT SHIMMER (Bến Nhà Rồng, Rừng Sác, Ba Son, Kênh Nhiêu Lộc) */}
            {(motionType === 'river_water' || motionType === 'coastal_sea') && (
              <div className="absolute bottom-0 left-0 right-0 h-1/3 overflow-hidden pointer-events-none">
                {/* Wave shimmer reflection 1 */}
                <div 
                  className="absolute inset-0 opacity-30 animate-water-shimmer"
                  style={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(255, 235, 175, 0.18) 45%, rgba(255, 255, 255, 0.25) 55%, transparent 100%)',
                    backgroundSize: '100% 18px',
                    filter: 'blur(1px)'
                  }}
                />
                {/* Secondary river current drift */}
                <div 
                  className="absolute inset-x-0 bottom-1 h-12 opacity-25 animate-river-flow"
                  style={{
                    backgroundImage: 'radial-gradient(ellipse at 50% 100%, rgba(255,225,145,0.35) 0%, transparent 75%)'
                  }}
                />
              </div>
            )}

            {/* LAYER C: FOLIAGE & TREE BREEZE (Dinh Độc Lập, Địa Đạo Củ Chi, Lăng Ông, Công Viên) */}
            {(motionType === 'garden_breeze' || motionType === 'panoramic_hero') && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Top-corner subtle leaf swaying silhouette */}
                <div className="absolute -top-3 -left-3 w-40 h-40 opacity-20 animate-leaves-sway-slow origin-top-left">
                  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-[#1b3320]">
                    <path d="M0,0 Q30,10 40,30 Q25,35 15,20 Q40,40 50,70 Q30,60 20,40 Z" />
                    <path d="M10,0 Q50,20 60,50 Q45,55 30,35 Q60,60 70,90 Z" />
                  </svg>
                </div>
                {/* Periodic passing breeze shadow */}
                <div className="absolute inset-0 opacity-15 animate-breeze-pass bg-gradient-to-r from-transparent via-[#fff5d6]/20 to-transparent" />
              </div>
            )}

            {/* LAYER D: SACRED TEMPLE ATMOSPHERE (Chùa Vĩnh Nghiêm, Chùa Bà Thiên Hậu) */}
            {motionType === 'sacred_temple' && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Subtle soft incense light curl */}
                <div className="absolute bottom-8 left-1/4 w-32 h-44 opacity-20 animate-incense-drift">
                  <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom,rgba(255,240,210,0.4)_0%,transparent_70%)] filter blur-md" />
                </div>
                {/* Lantern golden breath */}
                <div className="absolute top-6 right-8 w-20 h-20 rounded-full bg-[#f3d179]/15 filter blur-lg animate-pulse" />
              </div>
            )}

            {/* LAYER E: BIRDS CROSSING SKY (Occasional, natural, non-repeating) */}
            {(motionType === 'panoramic_hero' || motionType === 'heritage_monument' || motionType === 'coastal_sea') && (
              <div className="absolute top-4 left-0 right-0 h-16 overflow-hidden pointer-events-none opacity-40">
                <div className="animate-bird-flight-hero flex items-center gap-6 text-[#24180f]">
                  <svg className="w-3.5 h-2" viewBox="0 0 24 14" fill="currentColor">
                    <path d="M0,9 Q6,0 12,6 Q18,0 24,9 Q18,4 12,8 Q6,4 0,9 Z" />
                  </svg>
                  <svg className="w-2.5 h-1.5 translate-y-1 opacity-75" viewBox="0 0 24 14" fill="currentColor">
                    <path d="M0,9 Q6,0 12,6 Q18,0 24,9 Q18,4 12,8 Q6,4 0,9 Z" />
                  </svg>
                  <svg className="w-2 h-1 -translate-y-1 opacity-60" viewBox="0 0 24 14" fill="currentColor">
                    <path d="M0,9 Q6,0 12,6 Q18,0 24,9 Q18,4 12,8 Q6,4 0,9 Z" />
                  </svg>
                </div>
              </div>
            )}

            {/* LAYER F: REALISTIC SUNLIGHT DRIFT & DUST MOTES (All outdoor scenes) */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_top_right,rgba(255,235,175,0.22)_0%,transparent_65%)] pointer-events-none" />
            
            {/* Tiny golden environmental dust particle */}
            <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-[#f5e3a9]/30 blur-[0.5px] animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-1 h-1 rounded-full bg-[#f5e3a9]/25 blur-[0.5px] animate-pulse delay-700" />
          </div>
        )}

        {/* 4. Elegant Interactive Sunbeam Sheen Sweep on Hover */}
        <div className="absolute inset-0 living-painting-sheen pointer-events-none" />
      </div>
    </div>
  );
});
