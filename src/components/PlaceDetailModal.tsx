import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  MapPin, 
  ExternalLink, 
  Video, 
  Sparkles, 
  Clock, 
  Landmark,
  BookOpen,
  Camera,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Tag,
  Info,
  ShieldCheck,
  CheckCircle2,
  FileImage,
  Award
} from 'lucide-react';
import { PlaceItem, PlaceGalleryItem } from '../types';
import { getMediaUrl } from '../utils/mediaFallback';
import { AIPlaceInfographic } from './AIPlaceInfographic';

interface PlaceDetailModalProps {
  place: PlaceItem | null;
  categoryTitle: string;
  onClose: () => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  categoryTitle,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'heritage-infographic' | 'gallery' | 'infographic' | 'videos'>('info');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isInfographicFullscreen, setIsInfographicFullscreen] = useState<boolean>(false);

  const targetImagePath = place?.heritageInfographicImage || place?.infographicImage || '';
  const currentImageUrl = place ? getMediaUrl(targetImagePath) : '';

  // Reset tab when switching to another place
  useEffect(() => {
    setActiveTab('info');
    setLightboxIndex(null);
    setIsInfographicFullscreen(false);
  }, [place?.name]);

  // Normalize gallery items - ensure authentic gallery items, falling back to place.image
  const galleryItems: { url: string }[] = React.useMemo(() => {
    if (!place) return [];
    if (place.gallery && place.gallery.length > 0) {
      return place.gallery.map((item) => {
        if (typeof item === 'string') {
          return { url: item };
        }
        return { url: item.url };
      });
    }
    if (place.image) {
      return [{ url: place.image }];
    }
    return [];
  }, [place]);

  // Lightbox navigation handlers
  const handlePrevImage = useCallback(() => {
    if (lightboxIndex === null || galleryItems.length === 0) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1));
  }, [lightboxIndex, galleryItems.length]);

  const handleNextImage = useCallback(() => {
    if (lightboxIndex === null || galleryItems.length === 0) return;
    setLightboxIndex((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0));
  }, [lightboxIndex, galleryItems.length]);

  // Lock body scroll and handle keyboard shortcuts smoothly
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isInfographicFullscreen) {
          setIsInfographicFullscreen(false);
        } else if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          onClose();
        }
      } else if (lightboxIndex !== null) {
        if (e.key === 'ArrowLeft') handlePrevImage();
        if (e.key === 'ArrowRight') handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, isInfographicFullscreen, onClose, handlePrevImage, handleNextImage]);

  if (!place) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-4xl bg-black/90 border border-white/20 rounded-3xl shadow-2xl overflow-hidden my-4 text-white/90 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col liquid-glass-card"
        id="place-detail-modal"
      >
        {/* Modal Top Header Bar with Image banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0 bg-slate-900">
          <img 
            src={getMediaUrl(place.image)} 
            alt={place.name}
            className="w-full h-full object-cover brightness-[0.7] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111724] via-[#111724]/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            id="close-place-detail-modal-btn"
            aria-label="Đóng"
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-[#c29b38] text-white hover:text-slate-950 transition-all z-20 backdrop-blur-sm border border-white/20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on Banner */}
          <div className="absolute bottom-4 left-6 right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-white tracking-wide">
                {place.name}
              </h2>
              {place.location && (
                <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-1.5 opacity-90 line-clamp-1">
                  <MapPin className="w-4 h-4 text-[#e6ca65] shrink-0" />
                  {place.location}
                </p>
              )}
            </div>
            {galleryItems.length > 0 && (
              <button
                onClick={() => setActiveTab('gallery')}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-[#c29b38] text-white hover:text-slate-950 text-xs font-medium border border-white/20 backdrop-blur-md transition-all shrink-0 shadow"
                title="Xem bộ sưu tập Hình ảnh di sản"
              >
                <Camera className="w-3.5 h-3.5 text-[#f5e3a9]" />
                Hình ảnh di sản ({galleryItems.length})
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-black/50 px-6 gap-2 sm:gap-4 overflow-x-auto shrink-0 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'info'
                ? 'border-[#c29b38] text-[#f5e3a9]'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Landmark className="w-4 h-4" />
            Nội dung chi tiết di sản
          </button>

          {/* DEDICATED TAB: INFOGRAPHIC DI SẢN */}
          {(place.heritageInfographicImage || place.infographicImage) && (
            <button
              id="modal-tab-heritage-infographic"
              onClick={() => {
                setActiveTab('heritage-infographic');
              }}
              className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'heritage-infographic'
                  ? 'border-[#c29b38] text-[#f5e3a9]'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <FileImage className="w-4 h-4 text-[#e6ca65]" />
              Infographic di sản
            </button>
          )}

          {/* DEDICATED TAB: HÌNH ẢNH DI SẢN */}
          <button
            id="modal-tab-gallery"
            onClick={() => setActiveTab('gallery')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'gallery'
                ? 'border-[#c29b38] text-[#f5e3a9]'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4 text-[#e6ca65]" />
            Hình ảnh di sản ({galleryItems.length})
          </button>

          <button
            id="modal-tab-infographic"
            onClick={() => setActiveTab('infographic')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'infographic'
                ? 'border-[#c29b38] text-[#f5e3a9]'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#e6ca65]" />
            Phân Tích Di Sản
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'videos'
                ? 'border-[#c29b38] text-[#f5e3a9]'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            Video tư liệu ({place.videos?.length || 0})
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed text-slate-300">
          
          {/* TAB 1: FULL CONTENT PRESERVING 100% OF RAW TEXT */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              
              {/* Thẻ Căn cứ tư liệu / Hồ sơ học liệu */}
              {(place.officialSources || place.officialSource) && (
                <div className="bg-[#101926] p-4 sm:p-5 rounded-xl border border-slate-800 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#c29b38]/20 text-[#f5e3a9] border border-[#c29b38]/40 shrink-0">
                        <BookOpen className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-bold text-[#c29b38] uppercase tracking-wider">
                        Hồ Sơ Học Liệu & Căn Cứ Tư Liệu Chính Thống
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-800/50">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Nguồn uy tín
                    </span>
                  </div>

                  {/* Danh sách 2-3 nguồn uy tín chính thống */}
                  <div className="space-y-1.5">
                    {place.officialSources && place.officialSources.length > 0 ? (
                      place.officialSources.map((srcItem, sIndex) => (
                        <div key={sIndex} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/50 p-2 rounded-lg border border-slate-800/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#c29b38] shrink-0 mt-0.5" />
                          <span className="leading-snug">{srcItem}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/50 p-2 rounded-lg border border-slate-800/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c29b38] shrink-0 mt-0.5" />
                        <span className="leading-snug">{place.officialSource}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800 text-xs">
                    {place.establishedYear && (
                      <div className="bg-black/30 rounded-lg p-2.5 border border-slate-800">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Khởi lập / Khánh thành</span>
                        <span className="text-[#f5e3a9] font-medium">{place.establishedYear}</span>
                      </div>
                    )}
                    {place.classification && (
                      <div className="bg-black/30 rounded-lg p-2.5 border border-slate-800">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Xếp hạng Di sản / Phân loại</span>
                        <span className="text-slate-200 font-medium">{place.classification}</span>
                      </div>
                    )}
                    {place.architectOrOrigin && (
                      <div className="bg-black/30 rounded-lg p-2.5 border border-slate-800">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Kiến trúc sư / Nguồn gốc</span>
                        <span className="text-slate-200 font-medium">{place.architectOrOrigin}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Thẻ xem nhanh Infographic Di Sản (Nếu có) */}
              {(place.heritageInfographicImage || place.infographicImage) && (
                <div className="bg-[#101926] p-4 sm:p-5 rounded-xl border border-[#c29b38]/40 shadow-lg space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#c29b38]/20 text-[#f5e3a9] border border-[#c29b38]/40 shrink-0">
                        <FileImage className="w-3.5 h-3.5 text-[#e6ca65]" />
                      </span>
                      <span className="text-xs font-bold text-[#c29b38] uppercase tracking-wider">
                        Infographic Di Sản
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('heritage-infographic');
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f5e3a9] bg-[#c29b38]/20 hover:bg-[#c29b38] hover:text-slate-950 px-2.5 py-1 rounded-lg border border-[#c29b38]/40 transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      Xem Infographic khổ lớn
                    </button>
                  </div>
                  
                  <div 
                    onClick={() => {
                      setActiveTab('heritage-infographic');
                    }}
                    className="group relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-lg overflow-hidden border border-slate-800 hover:border-[#c29b38]/60 cursor-pointer bg-slate-950 flex items-center justify-center transition-all"
                  >
                    <img
                      src={getMediaUrl(place.heritageInfographicImage || place.infographicImage || '')}
                      alt={place.heritageInfographicTitle || `Infographic ${place.name}`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-3 sm:p-4">
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-white group-hover:text-[#f5e3a9] transition-colors">
                          {place.heritageInfographicTitle || `Infographic Di Sản: ${place.name}`}
                        </p>
                        <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                          {place.heritageInfographicDesc || 'Đồ họa thông tin chuẩn hóa trực quan hóa dữ liệu di sản'}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-[#f5e3a9] border border-[#c29b38]/40 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#e6ca65]" />
                      Bản vẽ Infographic
                    </div>
                  </div>
                </div>
              )}

              {/* Khái quát */}
              {place.shortIntro && (
                <div className="bg-[#161f30] p-4 sm:p-5 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#c29b38] mb-2 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#c29b38]" />
                    Khái quát
                  </h4>
                  <p className="text-slate-200 leading-relaxed whitespace-pre-line">
                    {place.shortIntro}
                  </p>
                </div>
              )}

              {/* Vị trí & Google Maps */}
              {place.location && (
                <div className="bg-[#161f30] p-4 sm:p-5 rounded-xl border border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#c29b38] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#c29b38]" />
                      Vị trí địa lý
                    </h4>
                    {place.mapUrl && (
                      <a
                        href={place.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c29b38]/20 hover:bg-[#c29b38] text-[#f5e3a9] hover:text-slate-950 text-xs font-semibold border border-[#c29b38]/40 transition-colors w-fit"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Mở trên Google Maps
                      </a>
                    )}
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    {place.location}
                  </p>
                  {place.secondaryMapUrl && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80">
                      <a
                        href={place.secondaryMapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#e6ca65] hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Điểm tham quan thứ 2 (Địa đạo Bến Đình) trên Google Maps
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Lịch sử và xã hội */}
              {place.historyAndSociety && (
                <div className="bg-[#161f30] p-4 sm:p-5 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#c29b38] mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#c29b38]" />
                    Lịch sử và xã hội
                  </h4>
                  <p className="text-slate-200 leading-relaxed whitespace-pre-line">
                    {place.historyAndSociety}
                  </p>
                </div>
              )}

              {/* Giá trị lịch sử */}
              {place.historicalValue && (
                <div className="bg-[#161f30] p-4 sm:p-5 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#c29b38] mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#c29b38]" />
                    Giá trị lịch sử
                  </h4>
                  <p className="text-slate-200 leading-relaxed whitespace-pre-line">
                    {place.historicalValue}
                  </p>
                </div>
              )}

              {/* Ý nghĩa */}
              {place.significance && (
                <div className="bg-[#161f30] p-4 sm:p-5 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#c29b38] mb-2 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#c29b38]" />
                    Ý nghĩa văn hóa & giáo dục
                  </h4>
                  <p className="text-slate-200 leading-relaxed whitespace-pre-line">
                    {place.significance}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB: INFOGRAPHIC DI SẢN CHUẨN HÓA */}
          {activeTab === 'heritage-infographic' && (
            <div className="space-y-4">
              {/* Infographic Header Bar */}
              <div className="bg-[#101926] p-4 sm:p-5 rounded-2xl border border-[#c29b38]/40 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#c29b38]/20 border border-[#c29b38]/50 text-[#f5e3a9] text-[10px] font-bold uppercase tracking-wider">
                      Infographic Di Sản
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-white font-serif-display mt-1.5">
                    {place.heritageInfographicTitle || `Infographic: ${place.name}`}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                    {place.heritageInfographicDesc || "Ảnh đồ họa thông tin trực quan hóa kiến trúc, lịch sử và giá trị văn hóa của di sản."}
                  </p>
                </div>

                {/* Fullscreen Button */}
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                  <button
                    onClick={() => setIsInfographicFullscreen(true)}
                    className="px-3.5 py-2 rounded-xl bg-[#c29b38]/20 hover:bg-[#c29b38] text-[#f5e3a9] hover:text-slate-950 transition-all border border-[#c29b38]/40 text-xs font-semibold flex items-center gap-2 shadow-sm"
                    title="Xem toàn màn hình"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>Toàn màn hình</span>
                  </button>
                </div>
              </div>

              {/* Display Canvas Frame */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#c29b38]/30 bg-slate-950 p-3 sm:p-6 flex items-center justify-center min-h-[460px] max-h-[75vh] shadow-2xl">
                <div 
                  className="flex items-center justify-center cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
                  onClick={() => setIsInfographicFullscreen(true)}
                  title="Nhấn để xem toàn màn hình"
                >
                  <img
                    src={currentImageUrl || getMediaUrl(place.image || '')}
                    alt={place.heritageInfographicTitle || `Infographic ${place.name}`}
                    className="max-w-full h-auto max-h-[70vh] object-contain rounded-xl shadow-2xl select-none"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEDICATED FULL GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <h3 className="text-base font-serif-display font-bold text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#c29b38]" />
                  Hình ảnh di sản: {place.name}
                </h3>
              </div>

              {/* Gallery Grid */}
              {galleryItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryItems.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxIndex(idx)}
                      className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-[#c29b38] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#c29b38]/10 transition-all duration-300"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                        <img 
                          src={getMediaUrl(item.url)} 
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <span className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white group-hover:bg-[#c29b38] group-hover:text-slate-950 transition-colors backdrop-blur-sm shadow opacity-0 group-hover:opacity-100">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <p>Đang cập nhật hình ảnh tư liệu</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: VIDEOS & TƯ LIỆU */}
          {activeTab === 'videos' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Danh sách liên kết video tài liệu, phóng sự truyền hình và clip khám phá thực tế được cung cấp:
              </p>
              {place.videos && place.videos.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {place.videos.map((vid, idx) => {
                    const isLink = vid.startsWith('http');
                    return (
                      <div 
                        key={idx}
                        className="p-4 rounded-xl bg-[#161f30] border border-slate-800 hover:border-[#c29b38]/40 transition-all flex items-start justify-between gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-red-950/60 border border-red-800/40 text-red-400 shrink-0">
                            <Video className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {isLink ? `Video tư liệu #${idx + 1}` : vid}
                            </p>
                            {isLink && (
                              <p className="text-xs font-mono text-slate-400 break-all mt-1">
                                {vid}
                              </p>
                            )}
                          </div>
                        </div>

                        {isLink && (
                          <a
                            href={vid}
                            target="_blank"
                            rel="noreferrer"
                            className="shrink-0 px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-semibold border border-red-500/40 transition-colors flex items-center gap-1"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Xem
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500">
                  Chưa có liên kết video cho mục này.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: INFOGRAPHIC */}
          {activeTab === 'infographic' && (
            <div className="space-y-4">
              <AIPlaceInfographic
                place={place}
                categoryTitle={categoryTitle}
              />
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0a0e17] border-t border-slate-800 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-400">
            HCMC-CultureHub • Di tích & Không gian Văn hóa
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && galleryItems[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Top Header */}
          <div 
            className="w-full max-w-5xl flex items-center justify-between text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <h4 className="text-sm sm:text-base font-serif-display font-bold text-white line-clamp-1">
                {place.name}
              </h4>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-[#c29b38] hover:text-slate-950 transition-all border border-white/20"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Center: Image with Navigation Controls */}
          <div 
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center p-2 sm:p-4 my-2 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            {galleryItems.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-[#c29b38] text-white hover:text-slate-950 transition-all border border-white/20 shadow-xl backdrop-blur-sm"
                title="Ảnh trước (Mũi tên trái)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Main Image */}
            <div className="relative max-h-[85vh] max-w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <img 
                src={getMediaUrl(galleryItems[lightboxIndex].url)} 
                alt=""
                className="max-h-[85vh] w-auto object-contain"
              />
            </div>

            {/* Next Button */}
            {galleryItems.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-[#c29b38] text-white hover:text-slate-950 transition-all border border-white/20 shadow-xl backdrop-blur-sm"
                title="Ảnh tiếp theo (Mũi tên phải)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* FULLSCREEN INFOGRAPHIC LIGHTBOX MODAL */}
      {isInfographicFullscreen && (place.heritageInfographicImage || place.infographicImage) && (
        <div 
          className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsInfographicFullscreen(false)}
        >
          {/* Lightbox Top Header */}
          <div 
            className="w-full max-w-6xl flex items-center justify-between text-white z-10 pb-2 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-[10px] font-mono uppercase text-[#e6ca65] block tracking-wider">
                Infographic Di Sản Chuẩn Hóa
              </span>
              <h4 className="text-sm sm:text-base font-serif-display font-bold text-white">
                {place.heritageInfographicTitle || `Infographic: ${place.name}`}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsInfographicFullscreen(false)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-red-600 text-white transition-all border border-white/20"
                title="Đóng (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center: Fullscreen Image Display */}
          <div 
            className="relative w-full max-w-6xl flex-1 flex items-center justify-center p-2 sm:p-4 my-2 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={getMediaUrl(place.heritageInfographicImage || place.infographicImage || '')} 
              alt={place.heritageInfographicTitle || `Infographic ${place.name}`}
              className="max-h-[85vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </div>
  );
};

