import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  ExternalLink, 
  Layers, 
  Compass, 
  Navigation, 
  Maximize2,
  CheckCircle2,
  Sparkles,
  Search,
  Camera,
  Calendar,
  Award
} from 'lucide-react';
import { SlideData, PlaceItem } from '../types';
import { getMediaUrl } from '../utils/mediaFallback';

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
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePin, setActivePin] = useState<PlaceItem | null>(allPlaces[0]?.place || null);

  // Determine region of each place
  const getPlaceRegion = (place: PlaceItem): 'hcmc' | 'binhduong' | 'vungtau' => {
    const loc = (place.location || '').toLowerCase() + ' ' + (place.name || '').toLowerCase();
    if (loc.includes('bình dương') || loc.includes('thủ dầu một') || loc.includes('dầu tiếng') || loc.includes('tương bình hiệp')) {
      return 'binhduong';
    }
    if (loc.includes('vũng tàu') || loc.includes('bà rịa') || loc.includes('côn đảo') || loc.includes('phước hải') || loc.includes('thắng tam') || loc.includes('đất đỏ') || loc.includes('long đất')) {
      return 'vungtau';
    }
    return 'hcmc';
  };

  const filteredPlaces = useMemo(() => {
    return allPlaces.filter(({ place, groupId }) => {
      const matchGroup = selectedGroupFilter === 'all' || groupId === selectedGroupFilter;
      const placeRegion = getPlaceRegion(place);
      const matchRegion = selectedRegionFilter === 'all' || placeRegion === selectedRegionFilter;
      const matchSearch = searchQuery.trim() === '' || 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (place.location || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchGroup && matchRegion && matchSearch;
    });
  }, [allPlaces, selectedGroupFilter, selectedRegionFilter, searchQuery]);

  // Group filter tabs
  const groups = [
    { id: 'all', label: 'Tất cả nhóm' },
    { id: 'group1', label: 'Nhóm 1: Lịch sử' },
    { id: 'group2', label: 'Nhóm 2: Kiến trúc' },
    { id: 'group3', label: 'Nhóm 3: Thương mại' },
    { id: 'group4', label: 'Nhóm 4: Sáng tạo' },
    { id: 'group5', label: 'Nhóm 5: Đô thị - Biển' },
  ];

  // Region filter tabs
  const regions = [
    { id: 'all', label: 'Toàn vùng Đông Nam Bộ' },
    { id: 'hcmc', label: 'TP. Hồ Chí Minh' },
    { id: 'binhduong', label: 'Bình Dương' },
    { id: 'vungtau', label: 'Bà Rịa – Vũng Tàu' },
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

      {/* Control Bar: Region tabs, Group filter, and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        {/* Region Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setSelectedRegionFilter(reg.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedRegionFilter === reg.id
                  ? 'bg-[#c29b38] text-slate-950 font-bold shadow-md shadow-[#c29b38]/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm 21 địa danh..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#c29b38] transition-colors"
          />
        </div>
      </div>

      {/* Group Pills */}
      <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1 text-xs">
        {groups.map((grp) => (
          <button
            key={grp.id}
            onClick={() => setSelectedGroupFilter(grp.id)}
            className={`px-2.5 py-1 rounded-full transition-all whitespace-nowrap ${
              selectedGroupFilter === grp.id
                ? 'bg-[#c29b38]/25 text-[#f5e3a9] border border-[#c29b38]/60 font-semibold'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80'
            }`}
          >
            {grp.label}
          </button>
        ))}
      </div>

      {/* Interactive Map & Split View Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0f1624] border border-[#c29b38]/30 rounded-2xl p-4 sm:p-6 shadow-2xl">
        
        {/* Visual Map Representation (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-[#0a0e17] rounded-xl border border-slate-800 p-4 relative overflow-hidden min-h-[420px] flex flex-col justify-between">
          
          {/* Subtle Cartographic Grid Pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#c29b38_1px,transparent_1px)] [background-size:24px_24px]" />
          
          {/* Top Map Bar */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 bg-slate-900/90 backdrop-blur-sm p-2 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#c29b38] animate-spin-slow" />
              <span>Vùng văn hóa đô thị: TP.HCM • Bình Dương • Bà Rịa – Vũng Tàu</span>
            </div>
            <span className="font-mono text-[#f5e3a9] font-bold">{filteredPlaces.length} địa danh hiển thị</span>
          </div>

          {/* Interactive Landmark Grid with Thumbnails */}
          <div className="relative z-10 my-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[350px] overflow-y-auto pr-1">
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map(({ place, groupName }) => {
                const isSelected = activePin?.name === place.name;
                const region = getPlaceRegion(place);
                const regionBadge = region === 'hcmc' ? 'TP.HCM' : region === 'binhduong' ? 'Bình Dương' : 'Bà Rịa – Vũng Tàu';
                return (
                  <div
                    key={place.name}
                    onClick={() => setActivePin(place)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-[#1e293b] border-[#c29b38] shadow-lg shadow-[#c29b38]/20 scale-[1.01]'
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    {/* Landmark Thumbnail */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-950 border border-slate-700/80 relative">
                      <img
                        src={getMediaUrl(place.image)}
                        alt={place.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-semibold text-white truncate">
                          {place.name}
                        </span>
                        <MapPin className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#e6ca65]' : 'text-slate-500'}`} />
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {regionBadge}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate">
                          {groupName.split(':')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-2 py-12 text-center text-xs text-slate-500">
                Không tìm thấy địa danh phù hợp với bộ lọc hiện tại.
              </div>
            )}
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
              {/* Photo Banner with Badges */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-700 group bg-slate-900 shadow-md">
                <img
                  src={getMediaUrl(activePin.image)}
                  alt={activePin.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                
                {/* Classification badge */}
                <span className="absolute bottom-2.5 left-3 text-[11px] font-semibold text-[#f5e3a9] bg-slate-950/80 px-2.5 py-1 rounded-md backdrop-blur-md border border-[#c29b38]/30 max-w-[80%] truncate">
                  {activePin.classification || "Di sản văn hóa"}
                </span>

                {/* Photo counter badge */}
                {activePin.gallery && activePin.gallery.length > 0 && (
                  <span className="absolute top-2.5 right-2.5 text-[10px] font-bold text-white bg-slate-950/80 px-2 py-0.5 rounded-full border border-slate-700 flex items-center gap-1 backdrop-blur-sm">
                    <Camera className="w-3 h-3 text-[#c29b38]" />
                    {activePin.gallery.length} ảnh
                  </span>
                )}
              </div>

              {/* Title & Navigation */}
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

              {/* Metadata tags */}
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                {activePin.establishedYear && (
                  <span className="px-2 py-0.5 rounded bg-[#0e1420] text-slate-300 border border-slate-800 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#c29b38]" />
                    {activePin.establishedYear}
                  </span>
                )}
                {activePin.architectOrOrigin && (
                  <span className="px-2 py-0.5 rounded bg-[#0e1420] text-slate-300 border border-slate-800 flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#c29b38]" />
                    <span className="truncate max-w-[200px]">{activePin.architectOrOrigin}</span>
                  </span>
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
                <p className="line-clamp-3">{activePin.shortIntro}</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => onSelectPlace(activePin, "Bản đồ di sản văn hóa")}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-[#c29b38] hover:bg-[#d4af37] text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#c29b38]/20 active:scale-95"
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

