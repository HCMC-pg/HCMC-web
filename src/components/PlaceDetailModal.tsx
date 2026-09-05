import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  ExternalLink, 
  Video, 
  Sparkles, 
  Copy, 
  Check, 
  Bookmark, 
  Share2, 
  Clock, 
  Landmark,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { PlaceItem } from '../types';
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
  const [activeTab, setActiveTab] = useState<'info' | 'infographic' | 'videos'>('info');

  if (!place) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
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
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-[#c29b38] text-white hover:text-slate-950 transition-all z-20 backdrop-blur-sm border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on Banner */}
          <div className="absolute bottom-4 left-6 right-6 z-10">
            <span className="inline-block text-[11px] font-bold tracking-wider px-2.5 py-1 rounded bg-[#c29b38]/30 text-[#f5e3a9] border border-[#c29b38]/50 uppercase mb-2">
              {categoryTitle}
            </span>
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
            Infographic Tóm Tắt Di Sản
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
              
              {/* Thẻ Căn cứ tư liệu */}
              {place.officialSource && (
                <div className="bg-[#101926] p-4 sm:p-5 rounded-xl border border-slate-800 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#c29b38]/15 text-[#f5e3a9] border border-[#c29b38]/30 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-[#c29b38] uppercase tracking-wider block">
                        Hồ sơ tư liệu:
                      </span>
                      <p className="text-xs text-slate-300">
                        {place.officialSource}
                      </p>
                    </div>
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
                    <ShieldCheck className="w-4 h-4 text-[#c29b38]" />
                    Ý nghĩa văn hóa & giáo dục
                  </h4>
                  <p className="text-slate-200 leading-relaxed whitespace-pre-line">
                    {place.significance}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VIDEOS & TƯ LIỆU */}
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

          {/* TAB 2: INFOGRAPHIC */}
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
    </div>
  );
};
