import React from 'react';
import { MapPin, ExternalLink, Video, Sparkles, BookOpen, ArrowUpRight, FileText, Camera } from 'lucide-react';
import { PlaceItem } from '../types';
import { getMediaUrl } from '../utils/mediaFallback';

interface PlaceCardProps {
  place: PlaceItem;
  categoryName: string;
  onSelect: (place: PlaceItem) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  categoryName,
  onSelect
}) => {
  return (
    <div 
      onClick={() => onSelect(place)}
      className="group relative bg-[#131b2a]/90 hover:bg-[#18243a] rounded-2xl border border-slate-800/90 hover:border-[#c29b38]/70 transition-all duration-300 ease-out flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#c29b38]/15 cursor-pointer transform hover:-translate-y-1.5 gpu-accelerated"
      id={`card-${place.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
    >
      {/* Top Image Box */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
        <img 
          src={getMediaUrl(place.image)} 
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 contrast-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131b2a] via-[#131b2a]/30 to-transparent" />

        {/* Top-left image badges: photo count & year */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {place.gallery && place.gallery.length > 0 && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-slate-950/80 px-2 py-0.5 rounded-full border border-slate-700/80 backdrop-blur-md shadow">
              <Camera className="w-3 h-3 text-[#c29b38]" />
              {place.gallery.length} ảnh
            </span>
          )}
          {place.establishedYear && (
            <span className="inline-flex items-center text-[9px] font-medium text-[#f5e3a9] bg-slate-950/75 px-2 py-0.5 rounded-md backdrop-blur-sm border border-[#c29b38]/30 max-w-[140px] truncate shadow-sm">
              {place.establishedYear}
            </span>
          )}
        </div>

        {/* Quick External Map Link */}
        {place.mapUrl && (
          <a
            href={place.mapUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Mở Google Maps"
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 hover:bg-[#c29b38] text-white hover:text-slate-950 transition-colors duration-200 backdrop-blur-sm shadow z-10"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Place Title */}
          <h3 className="text-lg font-serif-display font-bold text-white group-hover:text-[#f5e3a9] transition-colors duration-200 line-clamp-1 mb-1.5">
            {place.name}
          </h3>

          {/* Location line */}
          {place.location && (
            <p className="text-xs text-slate-400 flex items-center gap-1.5 line-clamp-1 mb-3">
              <MapPin className="w-3.5 h-3.5 text-[#c29b38] shrink-0" />
              <span>{place.location}</span>
            </p>
          )}

          {/* Short Intro snippet */}
          <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
            {place.shortIntro}
          </p>
        </div>

        {/* Card Footer badges & CTA */}
        <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            {place.gallery && place.gallery.length > 0 && (
              <span className="flex items-center gap-1 text-[#f5e3a9] bg-[#c29b38]/20 px-1.5 py-0.5 rounded border border-[#c29b38]/30 font-medium" title="Hình ảnh di sản">
                <Camera className="w-3 h-3 text-[#f5e3a9]" />
              </span>
            )}
            {place.videos && place.videos.length > 0 && (
              <span className="flex items-center gap-1 hover:text-red-400 transition-colors" title={`${place.videos.length} video tư liệu`}>
                <Video className="w-3.5 h-3.5 text-red-400" />
                {place.videos.length}
              </span>
            )}
            {place.aiPrompts && place.aiPrompts.length > 0 && (
              <span className="flex items-center gap-1 hover:text-[#e6ca65] transition-colors" title={`${place.aiPrompts.length} câu hỏi AI gợi ý`}>
                <Sparkles className="w-3.5 h-3.5 text-[#e6ca65]" />
                {place.aiPrompts.length}
              </span>
            )}
            <span className="flex items-center gap-1 text-[#c29b38] hover:text-[#f5e3a9] transition-colors" title="Đồ họa Phân Tích Di Sản">
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Phân tích</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-[#c29b38] group-hover:text-[#f5e3a9] transition-colors">
            <span>Chi tiết</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
