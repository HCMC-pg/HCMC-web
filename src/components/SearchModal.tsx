import React, { useState, useMemo, useEffect } from 'react';
import { X, Search, MapPin, Sparkles, Video, ArrowRight } from 'lucide-react';
import { PlaceItem } from '../types';

interface SearchModalProps {
  allPlaces: { place: PlaceItem; groupName: string; slideIndex: number }[];
  onSelectPlace: (place: PlaceItem, categoryTitle: string) => void;
  onNavigateSlide: (slideIndex: number) => void;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  allPlaces,
  onSelectPlace,
  onNavigateSlide,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return allPlaces.slice(0, 8);
    const lower = searchTerm.toLowerCase();
    return allPlaces.filter(({ place, groupName }) => 
      place.name.toLowerCase().includes(lower) ||
      place.shortIntro.toLowerCase().includes(lower) ||
      place.location.toLowerCase().includes(lower) ||
      groupName.toLowerCase().includes(lower)
    );
  }, [allPlaces, searchTerm]);

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/85 backdrop-blur-md"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#111724] border border-[#c29b38]/40 rounded-2xl shadow-2xl overflow-hidden text-slate-200 animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-[#0c121e]">
          <Search className="w-5 h-5 text-[#c29b38] shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm địa danh, di tích, chợ, làng nghề, lịch sử..."
            autoFocus
            className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder-slate-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
            >
              Xóa
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Chips */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
          <span className="text-slate-500 text-[10px] uppercase font-semibold shrink-0 mr-1">Gợi ý:</span>
          {['Tất cả', 'Lịch sử', 'Kiến trúc', 'Chợ', 'Bình Dương', 'Vũng Tàu', 'Côn Đảo'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag === 'Tất cả' ? '' : tag)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all duration-200 border ${
                (tag === 'Tất cả' && !searchTerm) || searchTerm.toLowerCase() === tag.toLowerCase()
                  ? 'bg-[#c29b38] text-slate-950 font-bold border-[#f5e3a9]'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-700 hover:border-slate-500'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase tracking-wider px-2 mb-2">
            <span>Kết quả học liệu ({searchResults.length})</span>
            <span>21 địa danh số hóa</span>
          </div>

          {searchResults.map(({ place, groupName, slideIndex }) => (
            <div
              key={place.name}
              onClick={() => {
                onSelectPlace(place, groupName);
                onClose();
              }}
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-[#182337] border border-slate-800 hover:border-[#c29b38]/50 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white group-hover:text-[#f5e3a9] transition-colors">
                    {place.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-[#c29b38] border border-slate-700">
                    {groupName.split(':')[0]}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {place.shortIntro}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateSlide(slideIndex);
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-[#c29b38] text-[11px] text-slate-300 hover:text-slate-950 transition-colors"
                  title="Đi đến slide này"
                >
                  Đến Slide
                </button>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#e6ca65] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}

          {searchResults.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs">
              Không tìm thấy địa danh nào khớp với từ khóa "{searchTerm}".
            </div>
          )}
        </div>

        <div className="p-3 bg-[#0a0e17] border-t border-slate-800 text-center text-[11px] text-slate-500">
          Nhấn ESC hoặc nhấp bên ngoài để đóng tìm kiếm.
        </div>
      </div>
    </div>
  );
};
