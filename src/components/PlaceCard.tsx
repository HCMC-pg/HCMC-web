import React, { memo, useState } from 'react';
import { MapPin, Video, Sparkles, FileText, Camera, FileImage, ArrowUpRight } from 'lucide-react';
import { PlaceItem } from '../types';
import { getMediaUrl } from '../utils/mediaFallback';

interface PlaceCardProps {
  place: PlaceItem;
  categoryName: string;
  onSelect: (place: PlaceItem) => void;
  variant?: 'featured' | 'standard' | 'landscape';
  className?: string;
}

export const PlaceCard: React.FC<PlaceCardProps> = memo(({
  place,
  categoryName,
  onSelect,
  variant = 'standard',
  className = ''
}) => {
  const [imgError, setImgError] = useState(false);
  const primaryUrl = getMediaUrl(place.image);

  // FEATURED VARIANT (Masterpiece Landmark Presentation)
  if (variant === 'featured') {
    return (
      <div 
        onClick={() => onSelect(place)}
        className={`group relative bg-[#ffffff] hover:bg-[#fffdfa] rounded-3xl border border-[#ded1bd] hover:border-[#a33827] transition-all duration-400 ease-out flex flex-col justify-between overflow-hidden shadow-[0_6px_28px_rgba(67,52,35,0.07)] hover:shadow-[0_16px_40px_rgba(67,52,35,0.14)] cursor-pointer transform hover:-translate-y-1.5 gpu-accelerated p-3 sm:p-4 ${className}`}
        id={`card-${place.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
      >
        {/* Top Image Showcase with Double Passe-Partout Matting */}
        <div className="relative h-64 sm:h-72 lg:h-80 w-full overflow-hidden rounded-2xl bg-[#f4eee2] border border-[#dfd2bd] p-1.5">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <img 
              src={imgError ? getMediaUrl('./assets/hero_hcmc_hub.webp') : primaryUrl} 
              alt={place.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-800 ease-out brightness-[0.98] contrast-[1.03]"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#24180f]/60 via-transparent to-transparent pointer-events-none" />
            
            {/* Spotlight Heritage Badge */}
            <div className="absolute top-3 left-3 bg-[#ffffff]/95 backdrop-blur-md px-3 py-1 rounded-md border border-[#dfd3be] shadow-sm flex items-center gap-1.5 text-[10px] font-mono text-[#a33827] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a33827]" />
              Tiêu Điểm Di Sản
            </div>

            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#ffffff]/90 backdrop-blur-md border border-[#dfd3be] flex items-center justify-center text-[#24180f] group-hover:bg-[#a33827] group-hover:text-white transition-colors shadow-sm">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#24180f] group-hover:text-[#a33827] transition-colors duration-200">
                {place.name}
              </h3>
            </div>

            {place.location && (
              <p className="text-xs text-[#786452] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#a33827] shrink-0" />
                <span>{place.location}</span>
              </p>
            )}

            <p className="text-xs sm:text-sm text-[#4b3c2f] line-clamp-4 leading-relaxed pt-1">
              {place.shortIntro}
            </p>
          </div>

          {/* Badges Footer */}
          <div className="pt-4 mt-5 border-t border-[#eee5d5] flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#6d5b4a]">
              {place.gallery && place.gallery.length > 0 && (
                <span className="flex items-center gap-1 text-[#8f5223] bg-[#f8efe2] px-2 py-0.5 rounded-md border border-[#e8d6be] font-medium" title="Hình ảnh di sản">
                  <Camera className="w-3.5 h-3.5 text-[#8f5223]" />
                  <span>Ảnh tư liệu</span>
                </span>
              )}
              {(place.heritageInfographicImage || place.infographicImage) && (
                <span className="flex items-center gap-1 text-[#a33827] bg-[#faebe8] px-2 py-0.5 rounded-md border border-[#f0c8c0] font-medium" title="Có Infographic di sản chuẩn hóa">
                  <FileImage className="w-3.5 h-3.5 text-[#a33827]" />
                  <span>Infographic</span>
                </span>
              )}
              {place.videos && place.videos.length > 0 && (
                <span className="flex items-center gap-1 text-[#b33a27] bg-[#fcedea] px-2 py-0.5 rounded-md border border-[#f5cbc3]" title={`${place.videos.length} video tư liệu`}>
                  <Video className="w-3.5 h-3.5 text-[#b33a27]" />
                  <span>{place.videos.length} video</span>
                </span>
              )}
              {place.aiPrompts && place.aiPrompts.length > 0 && (
                <span className="flex items-center gap-1 text-[#b8863b] bg-[#f8f2e2] px-2 py-0.5 rounded-md border border-[#ebdcb8]" title={`${place.aiPrompts.length} câu hỏi AI gợi ý`}>
                  <Sparkles className="w-3.5 h-3.5 text-[#b8863b]" />
                  <span>Khảo sát AI</span>
                </span>
              )}
            </div>

            <span className="text-xs font-semibold text-[#a33827] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Hồ sơ chi tiết</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // LANDSCAPE VARIANT (Artistic Horizontal Split)
  if (variant === 'landscape') {
    return (
      <div 
        onClick={() => onSelect(place)}
        className={`group relative bg-[#ffffff] hover:bg-[#fffdfa] rounded-3xl border border-[#e5dac6] hover:border-[#b8863b] transition-all duration-300 ease-out flex flex-col sm:flex-row overflow-hidden shadow-[0_4px_16px_rgba(67,52,35,0.05)] hover:shadow-[0_12px_28px_rgba(67,52,35,0.10)] cursor-pointer transform hover:-translate-y-1 gpu-accelerated p-2.5 sm:p-3 ${className}`}
        id={`card-${place.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
      >
        {/* Left Photo Mount */}
        <div className="relative h-44 sm:h-auto sm:w-2/5 shrink-0 rounded-2xl overflow-hidden bg-[#f4eee2] border border-[#dfd2bd]">
          <img 
            src={imgError ? getMediaUrl('./assets/hero_hcmc_hub.webp') : primaryUrl} 
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.98] contrast-[1.02]"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24180f]/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Right Info */}
        <div className="p-3.5 sm:p-4 sm:pl-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-serif-display font-bold text-[#24180f] group-hover:text-[#a33827] transition-colors duration-200 line-clamp-1 mb-1">
              {place.name}
            </h3>

            {place.location && (
              <p className="text-xs text-[#786452] flex items-center gap-1.5 line-clamp-1 mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#a33827] shrink-0" />
                <span>{place.location}</span>
              </p>
            )}

            <p className="text-xs text-[#4b3c2f] line-clamp-2 leading-relaxed">
              {place.shortIntro}
            </p>
          </div>

          {/* Badges */}
          <div className="pt-3 mt-3 border-t border-[#eee5d5] flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#6d5b4a]">
              {place.gallery && place.gallery.length > 0 && (
                <span className="flex items-center gap-1 text-[#8f5223] bg-[#f8efe2] px-1.5 py-0.5 rounded border border-[#e8d6be] font-medium" title="Hình ảnh di sản">
                  <Camera className="w-3 h-3 text-[#8f5223]" />
                </span>
              )}
              {(place.heritageInfographicImage || place.infographicImage) && (
                <span className="flex items-center gap-1 text-[#a33827] bg-[#faebe8] px-1.5 py-0.5 rounded border border-[#f0c8c0] font-medium text-[11px]" title="Có Infographic di sản chuẩn hóa">
                  <FileImage className="w-3 h-3 text-[#a33827]" />
                  <span>Infographic</span>
                </span>
              )}
              {place.videos && place.videos.length > 0 && (
                <span className="flex items-center gap-1 text-[#b33a27] bg-[#fcedea] px-1.5 py-0.5 rounded border border-[#f5cbc3]" title={`${place.videos.length} video tư liệu`}>
                  <Video className="w-3 h-3 text-[#b33a27]" />
                  <span>{place.videos.length}</span>
                </span>
              )}
            </div>

            <span className="text-[11px] text-[#a33827] font-semibold flex items-center gap-0.5">
              <span>Khám phá</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD POSTCARD VARIANT
  return (
    <div 
      onClick={() => onSelect(place)}
      className={`group relative bg-[#ffffff] hover:bg-[#fffdf9] rounded-2xl border border-[#e5dac6] hover:border-[#b8863b]/70 transition-all duration-300 ease-out flex flex-col overflow-hidden shadow-[0_3px_12px_rgba(67,52,35,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(67,52,35,0.12)] cursor-pointer transform hover:-translate-y-1.5 gpu-accelerated ${className}`}
      id={`card-${place.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
    >
      {/* Top Image Box with Postcard Matting */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#f4eee2] p-2">
        <div className="relative w-full h-full rounded-xl overflow-hidden border border-[#dfd2bd]">
          <img 
            src={imgError ? getMediaUrl('./assets/hero_hcmc_hub.webp') : primaryUrl} 
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.98] contrast-[1.02]"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24180f]/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Place Title */}
          <h3 className="text-lg font-serif-display font-bold text-[#24180f] group-hover:text-[#a33827] transition-colors duration-200 line-clamp-1 mb-1.5">
            {place.name}
          </h3>

          {/* Location line */}
          {place.location && (
            <p className="text-xs text-[#786452] flex items-center gap-1.5 line-clamp-1 mb-2.5">
              <MapPin className="w-3.5 h-3.5 text-[#a33827] shrink-0" />
              <span>{place.location}</span>
            </p>
          )}

          {/* Short Intro snippet */}
          <p className="text-xs text-[#4b3c2f] line-clamp-3 leading-relaxed">
            {place.shortIntro}
          </p>
        </div>

        {/* Card Footer badges */}
        <div className="pt-3.5 mt-3.5 border-t border-[#eee5d5] flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#6d5b4a]">
            {place.gallery && place.gallery.length > 0 && (
              <span className="flex items-center gap-1 text-[#8f5223] bg-[#f8efe2] px-1.5 py-0.5 rounded border border-[#e8d6be] font-medium" title="Hình ảnh di sản">
                <Camera className="w-3 h-3 text-[#8f5223]" />
              </span>
            )}
            {(place.heritageInfographicImage || place.infographicImage) && (
              <span className="flex items-center gap-1 text-[#a33827] bg-[#faebe8] px-1.5 py-0.5 rounded border border-[#f0c8c0] font-medium text-[11px]" title="Có Infographic di sản chuẩn hóa">
                <FileImage className="w-3 h-3 text-[#a33827]" />
                <span className="hidden sm:inline">Infographic</span>
              </span>
            )}
            {place.videos && place.videos.length > 0 && (
              <span className="flex items-center gap-1 text-[#b33a27] bg-[#fcedea] px-1.5 py-0.5 rounded border border-[#f5cbc3] transition-colors" title={`${place.videos.length} video tư liệu`}>
                <Video className="w-3 h-3 text-[#b33a27]" />
                {place.videos.length}
              </span>
            )}
            {place.aiPrompts && place.aiPrompts.length > 0 && (
              <span className="flex items-center gap-1 text-[#b8863b] bg-[#f8f2e2] px-1.5 py-0.5 rounded border border-[#ebdcb8] transition-colors" title={`${place.aiPrompts.length} câu hỏi AI gợi ý`}>
                <Sparkles className="w-3 h-3 text-[#b8863b]" />
                {place.aiPrompts.length}
              </span>
            )}
            <span className="flex items-center gap-1 text-[#255e37] bg-[#eaf4ec] px-1.5 py-0.5 rounded border border-[#c4e3cb] transition-colors" title="Đồ họa Phân Tích Di Sản">
              <FileText className="w-3 h-3" />
              <span className="hidden sm:inline">Phân tích</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
