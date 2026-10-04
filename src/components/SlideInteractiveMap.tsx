import React, { useState, useMemo, useEffect } from 'react';
import { 
  MapPin, 
  ExternalLink, 
  Compass, 
  Navigation, 
  Maximize2,
  CheckCircle2,
  Search,
  Camera,
  Calendar,
  Award,
  X
} from 'lucide-react';
import { SlideData, PlaceItem } from '../types';
import { getMediaUrl } from '../utils/mediaFallback';
import { removeVietnameseTones } from '../utils/searchHelper';

interface SlideInteractiveMapProps {
  slide: SlideData;
  allPlaces: { place: PlaceItem; groupName: string; groupId: string }[];
  onSelectPlace: (place: PlaceItem, categoryTitle: string) => void;
}

export const SlideInteractiveMap: React.FC<SlideInteractiveMapProps> = React.memo(({
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
    const cleanQuery = searchQuery.trim();
    const normQuery = removeVietnameseTones(cleanQuery);
    const tokens = normQuery.split(/\s+/).filter(Boolean);

    return allPlaces.filter(({ place, groupId }) => {
      const matchGroup = selectedGroupFilter === 'all' || groupId === selectedGroupFilter;
      const placeRegion = getPlaceRegion(place);
      const matchRegion = selectedRegionFilter === 'all' || placeRegion === selectedRegionFilter;
      
      let matchSearch = true;
      if (tokens.length > 0) {
        const placeSearchable = removeVietnameseTones(
          `${place.name} ${place.location || ''} ${place.shortIntro || ''} ${place.establishedYear || ''}`
        );
        matchSearch = tokens.every(token => placeSearchable.includes(token));
      }

      return matchGroup && matchRegion && matchSearch;
    });
  }, [allPlaces, selectedGroupFilter, selectedRegionFilter, searchQuery]);

  // Keep active pin in sync if search filters out previous pin
  useEffect(() => {
    if (filteredPlaces.length > 0) {
      const isCurrentActiveVisible = filteredPlaces.some(p => p.place.name === activePin?.name);
      if (!isCurrentActiveVisible) {
        setActivePin(filteredPlaces[0].place);
      }
    }
  }, [filteredPlaces, activePin]);

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
      className="relative min-h-[90vh] py-8 lg:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center select-none"
    >
      {/* Eyebrow and Titles */}
      <div className="border-b border-[#dfd3be] pb-5 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-[#faece9] border border-[#edcac4] text-[#a33827] text-xs font-semibold shadow-xs">
            {slide.category}
          </span>
          <span className="text-xs text-[#786452] font-mono tracking-wider">
            ĐỊNH VỊ 21 ĐIỂM ĐẾN
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-[#24180f]">
          {slide.primaryTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#944924] mt-1 font-serif-display italic font-medium">
          {slide.secondaryTitle}
        </p>

        {/* 100% Body Content text */}
        <p className="mt-2.5 text-xs sm:text-sm text-[#45362a] leading-relaxed max-w-4xl">
          {slide.bodyContent}
        </p>

        {/* Highlights */}
        <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {slide.keyHighlights.map((h, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-[#ffffff] border border-[#e5dac6] text-xs text-[#3f3124] flex items-center gap-2 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#b8863b] shrink-0" />
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
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedRegionFilter === reg.id
                  ? 'bg-[#a33827] text-white shadow-xs'
                  : 'bg-[#ffffff] text-[#5c4a3a] hover:bg-[#faf4ea] border border-[#ded1be]'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#8a7664] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tra cứu địa danh, khu vực..."
            className="w-full pl-9 pr-8 py-1.5 text-xs rounded-full bg-[#ffffff] border border-[#ded1bd] text-[#24180f] placeholder-[#8a7664] focus:outline-none focus:border-[#a33827] shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a7664] hover:text-[#24180f]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Group Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 border-b border-[#ebdcc6]">
        {groups.map((grp) => (
          <button
            key={grp.id}
            onClick={() => setSelectedGroupFilter(grp.id)}
            className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer ${
              selectedGroupFilter === grp.id
                ? 'bg-[#f4ece0] text-[#78431e] font-semibold border border-[#ded1bd]'
                : 'text-[#6e5c4c] hover:bg-[#ffffff] hover:text-[#24180f]'
            }`}
          >
            {grp.label}
          </button>
        ))}
      </div>

      {/* Main Cartographic Atlas Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left 7 Cols: The Antique Atlas Folio Map View & Grid */}
        <div className="lg:col-span-7 bg-[#faf4e6] rounded-2xl border-2 border-[#dfd2be] p-4 relative overflow-hidden flex flex-col justify-between shadow-sm">
          {/* Subtle Cartographic Grid Pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#b8863b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          
          {/* Top Map Bar */}
          <div className="relative z-10 flex items-center justify-between text-xs text-[#5c4a3a] bg-[#ffffff]/90 backdrop-blur-sm p-2.5 rounded-xl border border-[#ded1be] shadow-xs">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#a33827]" />
              <span className="font-serif-display font-medium">Bản đồ địa chí khảo cứu: TP.HCM • Bình Dương • Bà Rịa – Vũng Tàu</span>
            </div>
            <span className="font-mono text-[#a33827] font-bold">{filteredPlaces.length} địa danh</span>
          </div>

          {/* Interactive Landmark Grid with Thumbnails */}
          <div className="relative z-10 my-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map(({ place, groupName }) => {
                const isSelected = activePin?.name === place.name;
                const region = getPlaceRegion(place);
                const regionBadge = region === 'hcmc' ? 'TP.HCM' : region === 'binhduong' ? 'Bình Dương' : 'Bà Rịa – Vũng Tàu';
                return (
                  <div
                    key={place.name}
                    onClick={() => setActivePin(place)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 gpu-accelerated ${
                      isSelected
                        ? 'bg-[#ffffff] border-[#a33827] shadow-md shadow-[#a33827]/10 scale-[1.01]'
                        : 'bg-[#ffffff]/85 border-[#ded1be] hover:border-[#b8863b] hover:bg-[#ffffff]'
                    }`}
                  >
                    {/* Landmark Thumbnail as Living Stamp */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#f4eee2] border border-[#dfd2bd] relative living-painting-frame">
                      <img
                        src={getMediaUrl(place.image)}
                        alt={place.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-semibold text-[#24180f] truncate font-serif-display">
                          {place.name}
                        </span>
                        <MapPin className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#a33827]' : 'text-[#a89886]'}`} />
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f4ece0] text-[#6d5a49] border border-[#ded1be] font-mono">
                          {regionBadge}
                        </span>
                        <span className="text-[10px] text-[#7d6b5b] truncate">
                          {groupName.split(':')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-2 py-12 text-center text-xs text-[#8f7d6d]">
                Không tìm thấy địa danh phù hợp với bộ lọc hiện tại.
              </div>
            )}
          </div>

          {/* Bottom Satellite link */}
          <div className="relative z-10 pt-2 border-t border-[#ded1be] flex items-center justify-between text-xs">
            <span className="text-[#7d6b5b] text-[11px] font-mono">Tọa độ không gian • Tích hợp bản đồ số vệ tinh</span>
            {activePin?.mapUrl && (
              <a 
                href={activePin.mapUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-[#a33827] hover:text-[#832617] flex items-center gap-1 font-semibold"
              >
                <span>Xem trên vệ tinh Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Selected Place Preview Card (Right 5 Cols - Living Artifact Register Card) */}
        <div className="lg:col-span-5 bg-[#ffffff] rounded-2xl border border-[#ded1be] p-5 flex flex-col justify-between shadow-xs">
          {activePin ? (
            <div className="space-y-3.5">
              {/* Photo Banner with Living Painting Sheen */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-[#dfd2bd] group bg-[#f4eee2] shadow-xs living-painting-frame">
                <div className="relative w-full h-full living-painting-sheen">
                  <img
                    src={getMediaUrl(activePin.image)}
                    alt={activePin.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.98] contrast-[1.02] gpu-accelerated"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#24180f]/70 via-transparent to-transparent pointer-events-none" />
                </div>
                
                {/* Classification badge */}
                <span className="absolute bottom-2.5 left-3 text-[11px] font-semibold text-white bg-[#24180f]/85 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/20 max-w-[80%] truncate">
                  {activePin.classification || "Di sản văn hóa"}
                </span>

                {/* Photo counter badge */}
                {activePin.gallery && activePin.gallery.length > 0 && (
                  <span className="absolute top-2.5 right-2.5 text-[10px] font-bold text-white bg-[#24180f]/85 px-2 py-0.5 rounded-full border border-white/20 flex items-center gap-1 backdrop-blur-sm">
                    <Camera className="w-3 h-3 text-[#f5e3a9]" />
                    {activePin.gallery.length} ảnh
                  </span>
                )}
              </div>

              {/* Title & Navigation */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#a33827] font-mono">
                    HỒ SƠ ĐANG KHẢO CỨU
                  </span>
                  <h3 className="text-xl font-serif-display font-bold text-[#24180f] mt-0.5">
                    {activePin.name}
                  </h3>
                </div>
                {activePin.mapUrl && (
                  <a
                    href={activePin.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-[#faece9] hover:bg-[#a33827] text-[#a33827] hover:text-white transition-colors shrink-0 shadow-xs"
                    title="Mở Google Maps"
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Metadata tags */}
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                {activePin.establishedYear && (
                  <span className="px-2 py-0.5 rounded bg-[#f4ece0] text-[#5c4a3a] border border-[#ded1be] flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-[#b8863b]" />
                    {activePin.establishedYear}
                  </span>
                )}
                {activePin.architectOrOrigin && (
                  <span className="px-2 py-0.5 rounded bg-[#f4ece0] text-[#5c4a3a] border border-[#ded1be] flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#b8863b]" />
                    <span className="truncate max-w-[200px]">{activePin.architectOrOrigin}</span>
                  </span>
                )}
              </div>

              {/* Location */}
              {activePin.location && (
                <div className="flex items-start gap-1.5 text-xs text-[#786452]">
                  <MapPin className="w-3.5 h-3.5 text-[#a33827] shrink-0 mt-0.5" />
                  <span>{activePin.location}</span>
                </div>
              )}

              {/* Short intro */}
              <p className="text-xs text-[#4b3c2f] line-clamp-3 leading-relaxed">
                {activePin.shortIntro}
              </p>

              {/* Action: Open dossier modal */}
              <button
                onClick={() => onSelectPlace(activePin, slide.primaryTitle)}
                className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-[#a33827] via-[#bd4b37] to-[#8d2a1b] text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#8d2a1b]"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Mở toàn bộ hồ sơ di sản chi tiết</span>
              </button>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-[#8f7d6d]">
              Chọn một địa danh trên danh sách để xem hồ sơ.
            </div>
          )}
        </div>

      </div>
    </section>
  );
});
