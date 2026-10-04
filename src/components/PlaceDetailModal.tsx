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
import { LivingCulturalScene } from './LivingCulturalScene';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#24180f]/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#fffdfa] border border-[#dfd3be] rounded-3xl shadow-2xl overflow-hidden my-4 text-[#2b2016] animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        id="place-detail-modal"
      >
        {/* Modal Top Header Bar with Image banner as Living Artwork */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0 bg-[#f4eee2] living-painting-frame">
          <LivingCulturalScene
            imageSrc={place.image}
            alt={place.name}
            placeName={place.name}
            priority={true}
            aspectClassName="h-full w-full"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            id="close-place-detail-modal-btn"
            aria-label="Đóng"
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-[#a33827] text-[#24180f] hover:text-white transition-all z-20 backdrop-blur-sm border border-white/40 cursor-pointer shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on Banner */}
          <div className="absolute bottom-4 left-6 right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-white/20 text-[#f5e3a9] text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm border border-white/20">
                {categoryTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-white tracking-wide mt-1">
                {place.name}
              </h2>
              {place.location && (
                <p className="text-xs sm:text-sm text-white/90 mt-1 flex items-center gap-1.5 line-clamp-1">
                  <MapPin className="w-4 h-4 text-[#f5e3a9] shrink-0" />
                  {place.location}
                </p>
              )}
            </div>
            {galleryItems.length > 0 && (
              <button
                onClick={() => setActiveTab('gallery')}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-[#a33827] text-[#24180f] hover:text-white text-xs font-medium border border-white/40 backdrop-blur-md transition-all shrink-0 shadow-md cursor-pointer"
                title="Xem bộ sưu tập Hình ảnh di sản"
              >
                <Camera className="w-3.5 h-3.5 text-[#a33827]" />
                Hình ảnh di sản ({galleryItems.length})
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation (Archival Folio Tabs) */}
        <div className="flex border-b border-[#dfd3be] bg-[#faf6ee] px-6 gap-2 sm:gap-4 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'info'
                ? 'border-[#a33827] text-[#a33827]'
                : 'border-transparent text-[#6e5d4d] hover:text-[#24180f]'
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
              className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'heritage-infographic'
                  ? 'border-[#a33827] text-[#a33827]'
                  : 'border-transparent text-[#6e5d4d] hover:text-[#24180f]'
              }`}
            >
              <FileImage className="w-4 h-4 text-[#a33827]" />
              Infographic di sản
            </button>
          )}

          {/* DEDICATED TAB: HÌNH ẢNH DI SẢN */}
          <button
            id="modal-tab-gallery"
            onClick={() => setActiveTab('gallery')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'gallery'
                ? 'border-[#a33827] text-[#a33827]'
                : 'border-transparent text-[#6e5d4d] hover:text-[#24180f]'
            }`}
          >
            <Camera className="w-4 h-4 text-[#a33827]" />
            Hình ảnh di sản ({galleryItems.length})
          </button>

          <button
            id="modal-tab-infographic"
            onClick={() => setActiveTab('infographic')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'infographic'
                ? 'border-[#a33827] text-[#a33827]'
                : 'border-transparent text-[#6e5d4d] hover:text-[#24180f]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#b8863b]" />
            Phân Tích Di Sản
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'videos'
                ? 'border-[#a33827] text-[#a33827]'
                : 'border-transparent text-[#6e5d4d] hover:text-[#24180f]'
            }`}
          >
            <Video className="w-4 h-4" />
            Video tư liệu ({place.videos?.length || 0})
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed text-[#3a2d21] bg-[#faf6ee]/50">
          
          {/* TAB 1: FULL CONTENT PRESERVING 100% OF RAW TEXT */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              
              {/* Thẻ Căn cứ tư liệu / Hồ sơ học liệu */}
              {(place.officialSources || place.officialSource) && (
                <div className="bg-[#ffffff] p-4 sm:p-5 rounded-2xl border border-[#dfd3be] shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-[#eee5d5] pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#faece9] text-[#a33827] border border-[#edcac4] shrink-0">
                        <BookOpen className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-bold text-[#a33827] uppercase tracking-wider font-serif-display">
                        Hồ Sơ Học Liệu & Căn Cứ Tư Liệu Chính Thống
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#255e37] bg-[#e8f4eb] px-2.5 py-0.5 rounded-full border border-[#badbc2]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Nguồn uy tín
                    </span>
                  </div>

                  {/* Danh sách 2-3 nguồn uy tín chính thống */}
                  <div className="space-y-1.5">
                    {place.officialSources && place.officialSources.length > 0 ? (
                      place.officialSources.map((srcItem, sIndex) => (
                        <div key={sIndex} className="flex items-start gap-2 text-xs text-[#3a2d21] bg-[#faf6ee] p-2.5 rounded-xl border border-[#e5dac6]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#255e37] shrink-0 mt-0.5" />
                          <span className="leading-snug">{srcItem}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-start gap-2 text-xs text-[#3a2d21] bg-[#faf6ee] p-2.5 rounded-xl border border-[#e5dac6]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#255e37] shrink-0 mt-0.5" />
                        <span className="leading-snug">{place.officialSource}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-[#eee5d5] text-xs">
                    {place.establishedYear && (
                      <div className="bg-[#faf6ee] rounded-xl p-2.5 border border-[#dfd3be]">
                        <span className="text-[#7d6b5b] block text-[10px] uppercase font-semibold">Khởi lập / Khánh thành</span>
                        <span className="text-[#a33827] font-semibold">{place.establishedYear}</span>
                      </div>
                    )}
                    {place.classification && (
                      <div className="bg-[#faf6ee] rounded-xl p-2.5 border border-[#dfd3be]">
                        <span className="text-[#7d6b5b] block text-[10px] uppercase font-semibold">Xếp hạng Di sản / Phân loại</span>
                        <span className="text-[#2b2016] font-medium">{place.classification}</span>
                      </div>
                    )}
                    {place.architectOrOrigin && (
                      <div className="bg-[#faf6ee] rounded-xl p-2.5 border border-[#dfd3be]">
                        <span className="text-[#7d6b5b] block text-[10px] uppercase font-semibold">Kiến trúc sư / Nguồn gốc</span>
                        <span className="text-[#2b2016] font-medium">{place.architectOrOrigin}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Thẻ xem nhanh Infographic Di Sản (Nếu có) */}
              {(place.heritageInfographicImage || place.infographicImage) && (
                <div className="bg-[#ffffff] p-4 sm:p-5 rounded-2xl border border-[#dfd3be] shadow-sm space-y-3">
                  <div className="flex flex-wrap items-center justify-between border-b border-[#eee5d5] pb-2.5 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#faece9] text-[#a33827] border border-[#edcac4] shrink-0">
                        <FileImage className="w-3.5 h-3.5 text-[#a33827]" />
                      </span>
                      <span className="text-xs font-bold text-[#a33827] uppercase tracking-wider font-serif-display">
                        Infographic Di Sản
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('heritage-infographic');
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a33827] bg-[#faece9] hover:bg-[#a33827] hover:text-white px-2.5 py-1 rounded-lg border border-[#edcac4] transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      Xem Infographic khổ lớn
                    </button>
                  </div>
                  
                  <div 
                    onClick={() => {
                      setActiveTab('heritage-infographic');
                    }}
                    className="group relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-xl overflow-hidden border border-[#dfd2bd] hover:border-[#a33827] cursor-pointer bg-[#f4eee2] flex items-center justify-center transition-all"
                  >
                    <img
                      src={currentImageUrl || getMediaUrl(place.image || '')}
                      alt={place.heritageInfographicTitle || `Infographic ${place.name}`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#24180f]/80 via-transparent to-transparent flex items-end p-3 sm:p-4">
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-white group-hover:text-[#f5e3a9] transition-colors">
                          {place.heritageInfographicTitle || `Infographic Di Sản: ${place.name}`}
                        </p>
                        <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5">
                          {place.heritageInfographicDesc || 'Đồ họa thông tin chuẩn hóa trực quan hóa dữ liệu di sản'}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#a33827] border border-[#dfd3be] flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3 text-[#b8863b]" />
                      Bản vẽ Infographic
                    </div>
                  </div>
                </div>
              )}

              {/* Khái quát */}
              {place.shortIntro && (
                <div className="bg-[#ffffff] p-4 sm:p-5 rounded-2xl border border-[#e5dac6] shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#a33827] mb-2 flex items-center gap-2 font-serif-display">
                    <Landmark className="w-4 h-4 text-[#a33827]" />
                    Khái quát
                  </h4>
                  <p className="text-[#3a2d21] leading-relaxed whitespace-pre-line">
                    {place.shortIntro}
                  </p>
                </div>
              )}

              {/* Vị trí & Google Maps */}
              {place.location && (
                <div className="bg-[#ffffff] p-4 sm:p-5 rounded-2xl border border-[#e5dac6] shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#a33827] flex items-center gap-2 font-serif-display">
                      <MapPin className="w-4 h-4 text-[#a33827]" />
                      Vị trí địa lý
                    </h4>
                    {place.mapUrl && (
                      <a
                        href={place.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#faece9] hover:bg-[#a33827] text-[#a33827] hover:text-white text-xs font-semibold border border-[#edcac4] transition-colors w-fit"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Mở trên Google Maps
                      </a>
                    )}
                  </div>
                  <p className="text-[#3a2d21] leading-relaxed">
                    {place.location}
                  </p>
                  {place.secondaryMapUrl && (
                    <div className="mt-2.5 pt-2 border-t border-[#eee5d5]">
                      <a
                        href={place.secondaryMapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#a33827] hover:underline font-semibold"
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
                <div className="bg-[#ffffff] p-4 sm:p-5 rounded-2xl border border-[#e5dac6] shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#a33827] mb-2 flex items-center gap-2 font-serif-display">
                    <Award className="w-4 h-4 text-[#a33827]" />
                    Lịch sử và xã hội
                  </h4>
                  <p className="text-[#3a2d21] leading-relaxed whitespace-pre-line">
                    {place.historyAndSociety}
                  </p>
                </div>
              )}

              {/* Giá trị lịch sử */}
              {place.historicalValue && (
                <div className="bg-[#ffffff] p-4 sm:p-5 rounded-2xl border border-[#e5dac6] shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#a33827] mb-2 flex items-center gap-2 font-serif-display">
                    <Clock className="w-4 h-4 text-[#a33827]" />
                    Giá trị lịch sử
                  </h4>
                  <p className="text-[#3a2d21] leading-relaxed whitespace-pre-line">
                    {place.historicalValue}
                  </p>
                </div>
              )}

              {/* Ý nghĩa */}
              {place.significance && (
                <div className="bg-[#ffffff] p-4 sm:p-5 rounded-2xl border border-[#e5dac6] shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#a33827] mb-2 flex items-center gap-2 font-serif-display">
                    <Landmark className="w-4 h-4 text-[#a33827]" />
                    Ý nghĩa văn hóa & giáo dục
                  </h4>
                  <p className="text-[#3a2d21] leading-relaxed whitespace-pre-line">
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
              <div className="bg-[#ffffff] p-4 sm:p-5 rounded-2xl border border-[#dfd3be] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#faece9] border border-[#edcac4] text-[#a33827] text-[10px] font-bold uppercase tracking-wider">
                      Infographic Di Sản
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-[#24180f] font-serif-display mt-1.5">
                    {place.heritageInfographicTitle || `Infographic: ${place.name}`}
                  </h3>
                  <p className="text-xs text-[#6e5d4d] line-clamp-2 mt-1">
                    {place.heritageInfographicDesc || "Ảnh đồ họa thông tin trực quan hóa kiến trúc, lịch sử và giá trị văn hóa của di sản."}
                  </p>
                </div>

                {/* Fullscreen Button */}
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                  <button
                    onClick={() => setIsInfographicFullscreen(true)}
                    className="px-3.5 py-2 rounded-xl bg-[#faece9] hover:bg-[#a33827] text-[#a33827] hover:text-white transition-all border border-[#edcac4] text-xs font-semibold flex items-center gap-2 shadow-sm cursor-pointer"
                    title="Xem toàn màn hình"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>Toàn màn hình</span>
                  </button>
                </div>
              </div>

              {/* Display Canvas Frame */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#dfd3be] bg-[#fbf7ef] p-3 sm:p-6 flex items-center justify-center min-h-[460px] max-h-[75vh] shadow-inner">
                <div 
                  className="flex items-center justify-center cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
                  onClick={() => setIsInfographicFullscreen(true)}
                  title="Nhấn để xem toàn màn hình"
                >
                  <img
                    src={currentImageUrl || getMediaUrl(place.image || '')}
                    alt={place.heritageInfographicTitle || `Infographic ${place.name}`}
                    className="max-w-full h-auto max-h-[70vh] object-contain rounded-xl shadow-xl select-none border border-[#e5dac6]"
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
              <div className="pb-4 border-b border-[#dfd3be]">
                <h3 className="text-base font-serif-display font-bold text-[#24180f] flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#a33827]" />
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
                      className="group relative rounded-2xl overflow-hidden bg-white border border-[#e5dac6] hover:border-[#b8863b] cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 p-2"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#f4eee2]">
                        <img 
                          src={getMediaUrl(item.url)} 
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <span className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/80 text-[#24180f] group-hover:bg-[#a33827] group-hover:text-white transition-colors backdrop-blur-sm shadow opacity-0 group-hover:opacity-100">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-[#7d6b5b]">
                  <p>Đang cập nhật hình ảnh tư liệu</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: VIDEOS & TƯ LIỆU */}
          {activeTab === 'videos' && (
            <div className="space-y-4">
              <p className="text-xs text-[#6e5d4d]">
                Danh sách liên kết video tài liệu, phóng sự truyền hình và clip khám phá thực tế được cung cấp:
              </p>
              {place.videos && place.videos.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {place.videos.map((vid, idx) => {
                    const isLink = vid.startsWith('http');
                    return (
                      <div 
                        key={idx}
                        className="p-4 rounded-xl bg-[#ffffff] border border-[#e5dac6] hover:border-[#a33827]/40 transition-all flex items-start justify-between gap-4 shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-[#faece9] border border-[#edcac4] text-[#a33827] shrink-0">
                            <Video className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#24180f]">
                              {isLink ? `Video tư liệu #${idx + 1}` : vid}
                            </p>
                            {isLink && (
                              <p className="text-xs font-mono text-[#7d6b5b] break-all mt-1">
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
                            className="shrink-0 px-3 py-1.5 rounded-lg bg-[#faece9] hover:bg-[#a33827] text-[#a33827] hover:text-white text-xs font-semibold border border-[#edcac4] transition-colors flex items-center gap-1"
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
                <div className="p-8 text-center text-[#7d6b5b]">
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
        <div className="p-4 bg-[#faf6ee] border-t border-[#dfd3be] flex items-center justify-between shrink-0">
          <div className="text-xs text-[#6e5d4d]">
            HCMC-CultureHub • Di tích & Không gian Văn hóa
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#ffffff] hover:bg-[#faece9] text-[#24180f] hover:text-[#a33827] text-xs font-semibold border border-[#dfd3be] transition-colors cursor-pointer shadow-sm"
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
              className="p-2.5 rounded-full bg-white/10 hover:bg-[#a33827] text-white transition-all border border-white/20 cursor-pointer"
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
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-[#a33827] text-white transition-all border border-white/20 shadow-xl backdrop-blur-sm cursor-pointer"
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
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-[#a33827] text-white transition-all border border-white/20 shadow-xl backdrop-blur-sm cursor-pointer"
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
                className="p-2 rounded-full bg-white/10 hover:bg-red-600 text-white transition-all border border-white/20 cursor-pointer"
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
              src={currentImageUrl || getMediaUrl(place.image || '')} 
              alt={place.heritageInfographicTitle || `Infographic ${place.name}`}
              className="max-h-[85vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </div>
  );
};
