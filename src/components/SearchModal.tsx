import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  X, 
  Search, 
  MapPin, 
  ArrowRight, 
  CornerDownLeft, 
  Layers, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { PlaceItem } from '../types';
import { searchPlaces, removeVietnameseTones, SearchablePlace } from '../utils/searchHelper';
import { getMediaUrl } from '../utils/mediaFallback';

interface SearchModalProps {
  allPlaces: { place: PlaceItem; groupName: string; groupId?: string; slideIndex: number }[];
  onSelectPlace: (place: PlaceItem, categoryTitle: string) => void;
  onNavigateSlide: (slideIndex: number) => void;
  onClose: () => void;
}

interface GroupMeta {
  id: string;
  number: string;
  label: string;
  fullTitle: string;
  badge: string;
  badgeClass: string;
  borderClass: string;
  slideIndex: number;
}

const GROUPS_META: GroupMeta[] = [
  {
    id: 'group1',
    number: 'Nhóm 1',
    label: 'Lịch sử & Ký ức',
    fullTitle: 'Không gian lịch sử và ký ức đô thị',
    badge: 'Nhóm 1 • Lịch sử',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    borderClass: 'border-amber-500/30',
    slideIndex: 1
  },
  {
    id: 'group2',
    number: 'Nhóm 2',
    label: 'Kiến trúc & Tín ngưỡng',
    fullTitle: 'Kiến trúc biểu tượng và không gian tín ngưỡng',
    badge: 'Nhóm 2 • Kiến trúc',
    badgeClass: 'bg-blue-500/15 text-blue-300 border-blue-500/40',
    borderClass: 'border-blue-500/30',
    slideIndex: 2
  },
  {
    id: 'group3',
    number: 'Nhóm 3',
    label: 'Thương mại & Thị dân',
    fullTitle: 'Không gian giao thương và đời sống thị dân',
    badge: 'Nhóm 3 • Thương mại',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    borderClass: 'border-emerald-500/30',
    slideIndex: 3
  },
  {
    id: 'group4',
    number: 'Nhóm 4',
    label: 'Diễn xướng & Làng nghề',
    fullTitle: 'Nghệ thuật diễn xướng và làng nghề truyền thống',
    badge: 'Nhóm 4 • Diễn xướng & Nghề',
    badgeClass: 'bg-purple-500/15 text-purple-300 border-purple-500/40',
    borderClass: 'border-purple-500/30',
    slideIndex: 4
  },
  {
    id: 'group5',
    number: 'Nhóm 5',
    label: 'Đô thị & Sinh thái biển',
    fullTitle: 'Đô thị hiện đại và di sản sinh thái - biển',
    badge: 'Nhóm 5 • Đô thị & Biển',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40',
    borderClass: 'border-cyan-500/30',
    slideIndex: 5
  }
];

// Helper to determine groupId from slideIndex or place
function resolveGroupId(item: SearchablePlace): string {
  if (item.groupId) return item.groupId;
  if (item.slideIndex === 1) return 'group1';
  if (item.slideIndex === 2) return 'group2';
  if (item.slideIndex === 3) return 'group3';
  if (item.slideIndex === 4) return 'group4';
  if (item.slideIndex === 5) return 'group5';
  return 'group1';
}

export const SearchModal: React.FC<SearchModalProps> = ({
  allPlaces,
  onSelectPlace,
  onNavigateSlide,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Group count calculation
  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allPlaces.length };
    GROUPS_META.forEach(g => {
      counts[g.id] = 0;
    });
    allPlaces.forEach(p => {
      const gId = resolveGroupId(p);
      if (counts[gId] !== undefined) {
        counts[gId]++;
      }
    });
    return counts;
  }, [allPlaces]);

  // Filtered & ranked places based on search term & active group tab
  const displayedPlaces = useMemo(() => {
    let filtered = allPlaces;

    // 1. Group filter (if not 'all')
    if (selectedGroupId !== 'all') {
      filtered = filtered.filter(p => resolveGroupId(p) === selectedGroupId);
    }

    // 2. Keyword search filter
    if (searchTerm.trim()) {
      return searchPlaces(filtered, searchTerm);
    }

    return filtered.map(p => ({ ...p, score: 0, matchedTokens: [] }));
  }, [allPlaces, searchTerm, selectedGroupId]);

  // Grouped structure when viewing all places without active search query
  const placesByGroup = useMemo(() => {
    if (searchTerm.trim() || selectedGroupId !== 'all') return null;

    return GROUPS_META.map(meta => {
      const places = allPlaces.filter(p => resolveGroupId(p) === meta.id);
      return {
        meta,
        places
      };
    });
  }, [allPlaces, searchTerm, selectedGroupId]);

  // Reset selectedIndex whenever list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [displayedPlaces.length, searchTerm, selectedGroupId]);

  // Keyboard navigation: ArrowUp, ArrowDown, Enter, Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < displayedPlaces.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : displayedPlaces.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const activeItem = displayedPlaces[selectedIndex];
        if (activeItem) {
          onSelectPlace(activeItem.place, activeItem.groupName);
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, displayedPlaces, selectedIndex, onSelectPlace]);

  // Scroll active item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector<HTMLElement>(`[data-search-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  // Auto-focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 40);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 p-3 sm:p-4 bg-black/85 backdrop-blur-md transition-all"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#0f1726] border border-[#c29b38]/40 rounded-2xl shadow-2xl overflow-hidden text-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[88vh]"
      >
        
        {/* Search Header Bar */}
        <div className="p-3.5 sm:p-4 border-b border-slate-800 flex items-center gap-3 bg-[#0a0f19]">
          <Search className="w-5 h-5 text-[#c29b38] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên địa danh, quận huyện, di tích, năm hình thành..."
            className="w-full bg-transparent border-none text-white text-sm sm:text-base focus:outline-none placeholder-slate-500 font-sans"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                inputRef.current?.focus();
              }}
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-md bg-slate-800/90 hover:bg-slate-700 transition-colors shrink-0"
            >
              Xóa
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
            title="Đóng (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Group Allocation Tabs - Phân bổ nhóm của từng địa danh */}
        <div className="px-3 sm:px-4 py-2 bg-slate-950/80 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
          <span className="text-slate-500 text-[11px] font-semibold shrink-0 uppercase tracking-wider mr-1 hidden sm:inline">
            Phân nhóm:
          </span>

          <button
            onClick={() => setSelectedGroupId('all')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 border text-xs flex items-center gap-1.5 shrink-0 ${
              selectedGroupId === 'all'
                ? 'bg-[#c29b38] text-slate-950 font-bold border-[#f5e3a9] shadow-sm shadow-[#c29b38]/30'
                : 'bg-slate-900/90 text-slate-300 hover:text-white border-slate-700 hover:border-slate-500'
            }`}
          >
            <span>Tất cả</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              selectedGroupId === 'all' ? 'bg-slate-950/25 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}>
              {groupCounts.all}
            </span>
          </button>

          {GROUPS_META.map((meta) => {
            const isSelected = selectedGroupId === meta.id;
            return (
              <button
                key={meta.id}
                onClick={() => setSelectedGroupId(meta.id)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 border text-xs flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-[#c29b38] text-slate-950 font-bold border-[#f5e3a9] shadow-sm shadow-[#c29b38]/30'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white border-slate-700 hover:border-slate-500'
                }`}
                title={meta.fullTitle}
              >
                <span>{meta.number}: {meta.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-slate-950/25 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {groupCounts[meta.id] || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results / Grouped Landmarks Container */}
        <div 
          ref={resultsContainerRef}
          className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4"
        >
          {/* Header Status */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase tracking-wider px-1">
            <span className="flex items-center gap-1.5 font-medium">
              <span>{searchTerm ? 'Kết quả tìm kiếm' : selectedGroupId === 'all' ? 'Toàn bộ 21 địa danh theo nhóm' : 'Địa danh trong nhóm'}</span>
              <span className="font-bold text-[#f5e3a9]">({displayedPlaces.length})</span>
            </span>
            <span className="text-slate-500 hidden sm:inline">Phím ↑ ↓ điều hướng • Enter xem chi tiết</span>
          </div>

          {/* VIEW 1: STRUCTURED GROUPED VIEW (When viewing All and no search keyword) */}
          {placesByGroup ? (
            <div className="space-y-6">
              {placesByGroup.map(({ meta, places }, groupIdx) => {
                const startIndex = placesByGroup
                  .slice(0, groupIdx)
                  .reduce((acc, g) => acc + g.places.length, 0);

                return (
                  <div key={meta.id} className="space-y-2.5">
                    {/* Group Header Badge */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2.5 py-0.5 rounded-md font-bold border ${meta.badgeClass}`}>
                          {meta.number}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-white font-serif-display">
                          {meta.fullTitle}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-mono">
                          ({places.length} địa danh)
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          onNavigateSlide(meta.slideIndex);
                          onClose();
                        }}
                        className="text-[11px] text-[#c29b38] hover:text-[#f5e3a9] hover:underline font-medium flex items-center gap-1"
                      >
                        <span>Xem Slide nhóm</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Places in this group */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {places.map((item, pIdx) => {
                        const globalIdx = startIndex + pIdx;
                        const isSelected = globalIdx === selectedIndex;
                        const { place } = item;

                        return (
                          <div
                            key={place.name}
                            data-search-index={globalIdx}
                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                            onClick={() => {
                              onSelectPlace(place, meta.fullTitle);
                              onClose();
                            }}
                            className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-150 cursor-pointer flex items-center gap-3 group ${
                              isSelected
                                ? 'bg-[#182438] border-[#c29b38] shadow-md shadow-[#c29b38]/10 -translate-y-0.5'
                                : 'bg-slate-900/80 hover:bg-[#151f30] border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700 relative">
                              <img 
                                src={getMediaUrl(place.image)} 
                                alt={place.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = getMediaUrl('./assets/hero_hcmc_hub.webp');
                                }}
                              />
                            </div>

                            <div className="min-w-0 flex-1 space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                <h5 className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                                  isSelected ? 'text-[#f5e3a9]' : 'text-white group-hover:text-[#f5e3a9]'
                                }`}>
                                  {place.name}
                                </h5>
                                {place.establishedYear && (
                                  <span className="text-[10px] text-slate-400 font-mono shrink-0 hidden md:inline">
                                    • {place.establishedYear}
                                  </span>
                                )}
                              </div>

                              <p className="text-[11px] text-slate-400 flex items-center gap-1 truncate">
                                <MapPin className="w-3 h-3 text-[#c29b38] shrink-0" />
                                <span className="truncate">{place.location.split(',')[place.location.split(',').length - 1]?.trim() || place.location}</span>
                              </p>
                              
                              <p className="text-[11px] text-slate-400 line-clamp-1">
                                {place.shortIntro}
                              </p>
                            </div>

                            <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                              isSelected ? 'text-[#e6ca65] translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                            }`} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* VIEW 2: FILTERED OR SEARCH RESULTS VIEW */
            <div className="space-y-2">
              {displayedPlaces.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const { place, groupName, slideIndex } = item;
                const gId = resolveGroupId(item);
                const meta = GROUPS_META.find(m => m.id === gId) || GROUPS_META[0];

                return (
                  <div
                    key={place.name}
                    data-search-index={idx}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => {
                      onSelectPlace(place, groupName);
                      onClose();
                    }}
                    className={`p-3 rounded-xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 group ${
                      isSelected 
                        ? 'bg-[#182438] border-[#c29b38] shadow-md shadow-[#c29b38]/10 translate-x-1' 
                        : 'bg-slate-900/80 hover:bg-[#151f30] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700 relative">
                        <img 
                          src={getMediaUrl(place.image)} 
                          alt={place.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = getMediaUrl('./assets/hero_hcmc_hub.webp');
                          }}
                        />
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                            isSelected ? 'text-[#f5e3a9]' : 'text-white group-hover:text-[#f5e3a9]'
                          }`}>
                            {place.name}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${meta.badgeClass}`}>
                            {meta.badge}
                          </span>
                          {place.establishedYear && (
                            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                              ({place.establishedYear})
                            </span>
                          )}
                        </div>

                        {place.location && (
                          <p className="text-[11px] text-slate-400 flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 text-[#c29b38] shrink-0" />
                            <span className="truncate">{place.location}</span>
                          </p>
                        )}

                        <p className="text-xs text-slate-300 line-clamp-1 leading-snug">
                          {place.shortIntro}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateSlide(slideIndex);
                          onClose();
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-[#c29b38] text-[11px] text-slate-300 hover:text-slate-950 font-medium border border-slate-700 hover:border-[#c29b38] transition-all hidden sm:flex items-center gap-1"
                        title="Đến Slide học tập này"
                      >
                        <span>Đến Slide</span>
                      </button>

                      <div className={`p-1.5 rounded-lg transition-colors ${
                        isSelected ? 'text-[#e6ca65] bg-[#c29b38]/20' : 'text-slate-500 group-hover:text-slate-300'
                      }`}>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {displayedPlaces.length === 0 && (
            <div className="py-12 px-4 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm text-slate-300 font-medium">
                Không tìm thấy địa danh nào khớp với từ khóa "{searchTerm}" {selectedGroupId !== 'all' ? 'trong nhóm này' : ''}.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedGroupId('all');
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-[#c29b38] text-xs text-[#f5e3a9] hover:text-slate-950 font-medium border border-slate-700 hover:border-[#c29b38] transition-all"
                >
                  Xem lại toàn bộ 21 địa danh
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info & shortcut guide */}
        <div className="p-3 bg-[#0a0f19] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300">↓</kbd>
              <span className="hidden sm:inline">Di chuyển</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 flex items-center gap-0.5">
                <CornerDownLeft className="w-2.5 h-2.5 inline" /> Enter
              </kbd>
              <span className="hidden sm:inline">Mở học liệu</span>
            </span>
          </div>

          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300">ESC</kbd>
            <span>Đóng</span>
          </span>
        </div>
      </div>
    </div>
  );
};
