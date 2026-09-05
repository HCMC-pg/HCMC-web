import React, { useState } from 'react';
import { 
  MapPin, 
  ExternalLink, 
  Layers, 
  Compass, 
  Navigation, 
  Maximize2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SlideData, PlaceItem } from '../types';

interface SlideInteractiveMapProps {
  slide: SlideData;
  allPlaces: { place: PlaceItem; groupName: string; groupId: string }[];
  onSelectPlace: (place: PlaceItem, categoryTitle: string) => void;
}

export const SlideInteractiveMap: React.FC<SlideInteractiveMapProps> = ({
  slide,
  allPlaces,
  onSelectPlace
}) => {
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<string>('all');
  const [activePin, setActivePin] = useState<PlaceItem | null>(allPlaces[0]?.place || null);

  const filteredPlaces = selectedGroupFilter === 'all'
    ? allPlaces
    : allPlaces.filter(p => p.groupId === selectedGroupFilter);

  // Group filter tabs
  const groups = [
    { id: 'all', label: 'Tất cả (21)' },
    { id: 'group1', label: 'Nhóm 1: Lịch sử' },
    { id: 'group2', label: 'Nhóm 2: Kiến trúc' },
    { id: 'group3', label: 'Nhóm 3: Thương mại' },
    { id: 'group4', label: 'Nhóm 4: Sáng tạo' },
    { id: 'group5', label: 'Nhóm 5: Đô thị - Biển' },
  ];

  return (
    <section 
      id={`slide-${slide.id}`} 
      className="relative min-h-[90vh] py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Eyebrow and Titles */}
      <div className="border-b border-slate-800 pb-5 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-[#c29b38]/15 border border-[#c29b38]/30 text-[#f5e3a9] text-xs font-semibold">
            {slide.category}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ĐỊNH VỊ 21 ĐIỂM ĐẾN
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-white">
          {slide.primaryTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#e6ca65] mt-1 font-medium">
          {slide.secondaryTitle}
        </p>

        {/* 100% Body Content text */}
        <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          {slide.bodyContent}
        </p>

        {/* Highlights */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {slide.keyHighlights.map((h, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-[#111724] border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#c29b38] shrink-0" />
              <span className="truncate">{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
        {groups.map((grp) => (
          <button
            key={grp.id}
            onClick={() => setSelectedGroupFilter(grp.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              selectedGroupFilter === grp.id
                ? 'bg-[#c29b38] text-slate-950 font-bold shadow-md shadow-[#c29b38]/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {grp.label}
          </button>
        ))}
      </div>

      {/* Interactive Map & Split View Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0f1624] border border-[#c29b38]/30 rounded-2xl p-4 sm:p-6 shadow-2xl">
        
        {/* Visual Map Representation (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-[#0a0e17] rounded-xl border border-slate-800 p-4 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
          
          {/* Subtle Cartographic Grid Pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#c29b38_1px,transparent_1px)] [background-size:24px_24px]" />
          
          {/* Top Map Bar */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 bg-slate-900/80 backdrop-blur-sm p-2 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#c29b38] animate-spin-slow" />
              <span>Vùng văn hóa đô thị: TP.HCM • Bình Dương • Bà Rịa – Vũng Tàu</span>
            </div>
            <span className="font-mono text-[#f5e3a9] font-bold">{filteredPlaces.length} địa danh</span>
          </div>

          {/* Interactive Map Region Canvas / Pin Field */}
          <div className="relative z-10 my-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
            {filteredPlaces.map(({ place, groupName }) => {
              const isSelected = activePin?.name === place.name;
              return (
                <div
                  key={place.name}
                  onClick={() => setActivePin(place)}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#1e293b] border-[#c29b38] shadow-lg shadow-[#c29b38]/20 scale-[1.02]'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-xs font-semibold text-white line-clamp-1">
                      {place.name}
                    </span>
                    <MapPin className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#e6ca65]' : 'text-slate-500'}`} />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 truncate">
                    {groupName.split(':')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom Satellite link */}
          <div className="relative z-10 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px]">Hệ tọa độ VN2000 • Tích hợp Google Maps API</span>
            {activePin?.mapUrl && (
              <a 
                href={activePin.mapUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-[#c29b38] hover:text-[#f5e3a9] flex items-center gap-1 font-semibold"
              >
                <span>Xem trên vệ tinh Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Selected Place Preview Card (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-[#131b2a] rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
          {activePin ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c29b38]">
                    Điểm đến đang chọn
                  </span>
                  <h3 className="text-xl font-serif-display font-bold text-white mt-0.5">
                    {activePin.name}
                  </h3>
                </div>
                {activePin.mapUrl && (
                  <a
                    href={activePin.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-[#c29b38]/20 hover:bg-[#c29b38] text-[#f5e3a9] hover:text-slate-950 transition-colors shrink-0"
                    title="Mở Google Maps"
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Location */}
              {activePin.location && (
                <div className="p-2.5 rounded-lg bg-[#0e1420] border border-slate-800/80 text-xs text-slate-300">
                  <div className="font-semibold text-[#f5e3a9] flex items-center gap-1 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#c29b38]" />
                    Vị trí
                  </div>
                  <p className="leading-relaxed">{activePin.location}</p>
                </div>
              )}

              {/* Short Intro */}
              <div className="text-xs text-slate-300 leading-relaxed">
                <p className="line-clamp-4">{activePin.shortIntro}</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => onSelectPlace(activePin, "Bản đồ di sản văn hóa")}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-[#c29b38] hover:bg-[#d4af37] text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Xem chi tiết hồ sơ di sản</span>
                </button>

                {activePin.mapUrl && (
                  <a
                    href={activePin.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Dẫn đường Google Maps</span>
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs">
              Chọn một địa danh từ bản đồ để xem chi tiết
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
