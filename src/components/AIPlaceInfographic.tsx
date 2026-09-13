import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Maximize2, 
  X, 
  Layers, 
  Calendar, 
  MapPin, 
  Landmark, 
  Award, 
  RefreshCw,
  Eye,
  Sliders,
  ChevronRight,
  Play,
  Pause,
  Share2,
  Info,
  ShieldCheck,
  CheckCircle2,
  Clock,
  BookOpen
} from 'lucide-react';
import { PlaceItem } from '../types';
import { getPlaceInfographic, PlaceInfographicMeta } from '../data/infographicData';
import { getMediaUrl } from '../utils/mediaFallback';

interface AIPlaceInfographicProps {
  place: PlaceItem;
  categoryTitle?: string;
}

type InfographicMode = 'poster' | 'timeline';

export const AIPlaceInfographic: React.FC<AIPlaceInfographicProps> = ({
  place,
  categoryTitle
}) => {
  const meta: PlaceInfographicMeta = getPlaceInfographic(place.name, categoryTitle);
  
  const [activeMode, setActiveMode] = useState<InfographicMode>('poster');
  const [aspectRatio, setAspectRatio] = useState<'3:4' | '16:9' | '1:1'>('3:4');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);
  const [customGenCount, setCustomGenCount] = useState<number>(1);

  // Animated Timeline Auto-Play State
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState<number>(0);
  const [isTimelinePlaying, setIsTimelinePlaying] = useState<boolean>(false);
  const timelineIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentPrompt = meta.aiImagePrompt || 
    `A museum-grade educational infographic poster of ${place.name}, Ho Chi Minh City cultural heritage. Showing key architectural elements, historical timeline, data badges, warm golden and deep navy palette, modern visual layout.`;

  // Auto-play timeline step
  useEffect(() => {
    if (isTimelinePlaying && meta.milestones && meta.milestones.length > 0) {
      timelineIntervalRef.current = setInterval(() => {
        setActiveMilestoneIndex(prev => (prev + 1) % meta.milestones.length);
      }, 2500);
    } else {
      if (timelineIntervalRef.current) {
        clearInterval(timelineIntervalRef.current);
      }
    }
    return () => {
      if (timelineIntervalRef.current) clearInterval(timelineIntervalRef.current);
    };
  }, [isTimelinePlaying, meta.milestones]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const handleGenerateNew = () => {
    setIsGenerating(true);
    setGenerationStep('Đang đồng bộ tư liệu đồ họa di sản ' + place.name + '...');

    setTimeout(() => {
      setGenerationStep('Đang tối ưu hóa mốc son lịch sử & phân tích cắt lớp...');
    }, 700);

    setTimeout(() => {
      setIsGenerating(false);
      setCustomGenCount(prev => prev + 1);
      setGenerationStep('');
    }, 1200);
  };

  const isXomLuoi = place.name.toUpperCase().includes('XÓM LƯỚI');
  const hasHeritageAge = !isXomLuoi && Boolean(meta.heritageAgeYears && meta.heritageAgeYears > 0);

  return (
    <div className="space-y-6 text-slate-200">
      
      {/* Top Banner: Infographic Header & Navigation */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#101826] via-[#141f33] to-[#101826] border border-[#c29b38]/40 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#c29b38] to-[#e6ca65] text-slate-950 shadow-lg shadow-[#c29b38]/20 shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-white font-serif-display tracking-wide">
                  Bảng Phân Tích Di Sản • {place.name}
                </h3>
              </div>
              <p className="text-xs text-white/70 mt-0.5">
                Tổng hợp trực quan các thông số cốt lõi, mốc son lịch sử & giá trị văn hóa di sản
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsZoomOpen(true)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
              title="Phóng to ảnh khổ lớn"
            >
              <Maximize2 className="w-4 h-4 text-[#e6ca65]" />
            </button>
          </div>
        </div>

        {/* Mode Navigation Tabs (7 Vivid Educational Views) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#c29b38] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Chế độ trực quan hóa đồ họa:
            </span>
            {hasHeritageAge ? (
              <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
                Niên đại di sản: <span className="text-[#e6ca65] font-bold">{meta.heritageAgeYears} năm tuổi</span>
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setActiveMode('poster')}
              className={`p-2.5 rounded-xl border text-center transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                activeMode === 'poster'
                  ? 'bg-[#c29b38] border-[#c29b38] text-slate-950 font-bold shadow-md shadow-[#c29b38]/20'
                  : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <Eye className="w-4 h-4 shrink-0" />
              <span className="truncate">Phân Tích Di Sản</span>
            </button>

            <button
              onClick={() => setActiveMode('timeline')}
              className={`p-2.5 rounded-xl border text-center transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                activeMode === 'timeline'
                  ? 'bg-[#c29b38] border-[#c29b38] text-slate-950 font-bold shadow-md shadow-[#c29b38]/20'
                  : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span className="truncate">Biên Niên Sử</span>
            </button>
          </div>
        </div>

        {/* Generating Progress Indicator */}
        {isGenerating && (
          <div className="p-3.5 rounded-xl bg-[#1a273e] border border-[#c29b38] animate-pulse flex items-center gap-3">
            <RefreshCw className="w-4 h-4 text-[#e6ca65] animate-spin shrink-0" />
            <span className="text-xs text-[#f5e3a9] font-medium">{generationStep}</span>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* CHẾ ĐỘ 1: BẢNG INFOGRAPHIC TÓM TẮT TOÀN DIỆN (FULL SUMMARY POSTER) */}
      {/* ======================================================== */}
      {activeMode === 'poster' ? (
        <div className="space-y-6">
          {/* Infographic Poster Container */}
          <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-[#141e30] via-[#0f1726] to-[#0a0f1a] border-2 border-[#c29b38]/60 shadow-2xl space-y-6 relative overflow-hidden">
            
            {/* Poster Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-[#c29b38]/20 border border-[#c29b38]/40 text-[#f5e3a9] text-xs font-bold uppercase tracking-wider">
                    {meta.keyClassification}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
                    Khởi lập: {meta.yearEstablished} {hasHeritageAge ? `(${meta.heritageAgeYears} năm tuổi)` : ''}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-white tracking-wide">
                  {place.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#e6ca65] shrink-0" />
                  <span>{place.location}</span>
                </p>
              </div>
            </div>

            {/* Chỉ Số Vàng (Quick KPI Badges) */}
            <div className={`grid grid-cols-1 ${hasHeritageAge ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-3`}>
              <div className="p-3.5 rounded-2xl bg-[#101826] border border-[#c29b38]/30 shadow-md">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Khởi Lập / Khánh Thành</span>
                <span className="text-base sm:text-lg font-bold text-[#f5e3a9] font-mono mt-1 block">
                  {meta.yearEstablished}
                </span>
              </div>

              {hasHeritageAge && (
                <div className="p-3.5 rounded-2xl bg-[#101826] border border-[#c29b38]/30 shadow-md">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Tuổi Đời Di Sản</span>
                  <span className="text-base sm:text-lg font-bold text-[#e6ca65] font-mono mt-1 block">
                    {meta.heritageAgeYears} Năm
                  </span>
                </div>
              )}

              <div className="p-3.5 rounded-2xl bg-[#101826] border border-[#c29b38]/30 shadow-md">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Quy Mô & Kiến Trúc</span>
                <span className="text-xs sm:text-sm font-bold text-white mt-1 block line-clamp-1">
                  {meta.dimensionsOrScale}
                </span>
              </div>
            </div>

            {/* Middle Section: Visual Architecture Focal Card (Left: Annotated Image, Right: Architectural Highlights) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left (6 cols): Visual Graphic with Callout Pins */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#c29b38]/40 shadow-xl bg-slate-950 flex flex-col justify-between">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 group">
                  <img
                    src={meta.masterImage || getMediaUrl(place.image)}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Top image labels */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-[#f5e3a9] border border-[#c29b38]/40">
                      Đồ Họa Di Sản Tiêu Biểu
                    </span>
                  </div>

                  <button
                    onClick={() => setIsZoomOpen(true)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 hover:bg-[#c29b38] text-white hover:text-slate-950 transition-all backdrop-blur-md border border-white/20"
                    title="Phóng to ảnh khổ lớn"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {/* Caption on image */}
                  <div className="absolute bottom-3 left-3 right-3 text-left pointer-events-none">
                    <span className="text-[10px] font-mono text-[#e6ca65] block uppercase">Góc nhìn di sản tiêu biểu</span>
                    <p className="text-xs text-slate-200 font-medium line-clamp-1">{meta.visualHighlights[0] || place.name}</p>
                  </div>
                </div>
              </div>

              {/* Right (6 cols): 3-4 Key Visual Highlights */}
              <div className="lg:col-span-6 p-5 rounded-2xl bg-[#101826] border border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#c29b38] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#e6ca65]" />
                      Đặc Điểm Nổi Bật & Cấu Trúc Điểm Nhấn
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">Tóm tắt thị giác</span>
                  </div>

                  <div className="space-y-2.5">
                    {meta.visualHighlights.map((highlight, idx) => {
                      const hasNewline = highlight.includes('\n');
                      const title = hasNewline ? highlight.split('\n')[0] : null;
                      const content = hasNewline ? highlight.split('\n').slice(1).join('\n') : highlight;

                      return (
                        <div 
                          key={idx} 
                          className="p-3.5 rounded-xl bg-[#0b121e] border border-slate-800/80 hover:border-[#c29b38]/40 transition-colors flex items-start gap-3 text-xs"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#c29b38]/20 text-[#f5e3a9] border border-[#c29b38]/40 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            {title && (
                              <h5 className="font-bold text-[#f5e3a9] text-xs mb-1">
                                {title}
                              </h5>
                            )}
                            <p className="text-slate-200 leading-relaxed font-normal">
                              {content}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* Chuyển hướng Biên Niên Sử (Dòng thời gian lịch sử) */}
            <div className="p-4 rounded-2xl bg-[#101826] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#c29b38]/15 border border-[#c29b38]/30 flex items-center justify-center text-[#e6ca65] shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#c29b38]">
                    Biên Niên Sử & Mốc Son Lịch Sử
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Xem toàn bộ chuỗi tiến trình niên đại lịch sử và các sự kiện then chốt của {place.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveMode('timeline')}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#c29b38]/20 hover:bg-[#c29b38] text-[#f5e3a9] hover:text-slate-950 font-bold text-xs border border-[#c29b38]/40 transition-all flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Xem Biên Niên Sử</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2 Trụ Cột Tri Thức Tóm Tắt (Knowledge Pillars) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cột 1: Lịch sử & Giá trị Xã hội */}
              <div className="p-4.5 rounded-2xl bg-[#101826] border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-[#c29b38]">
                  <Award className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    1. Lịch Sử & Xã Hội
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Những dấu ấn tiêu biểu phản ánh quá trình hình thành, phát triển và những giá trị lịch sử – xã hội của không gian văn hóa đô thị Thành phố Hồ Chí Minh mới.
                </p>
              </div>

              {/* Cột 2: Trọng tâm Giá Trị Văn Hóa & Tinh Thần Di Sản */}
              <div className="p-4.5 rounded-2xl bg-[#101826] border border-[#c29b38]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#e6ca65]">
                  <BookOpen className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    2. Giá Trị Văn Hóa & Di Sản
                  </h4>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  Khám phá những giá trị văn hóa, di sản và đặc trưng của các địa phương, qua đó góp phần nâng cao hiểu biết và ý thức gìn giữ, phát huy giá trị văn hóa trong đời sống hiện đại.
                </p>
              </div>
            </div>

            {/* Hồ sơ học liệu & Nguồn tư liệu uy tín chính thống */}
            {(meta.officialSources || place.officialSources || place.officialSource) && (
              <div className="p-4 rounded-2xl bg-[#0d1522] border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#c29b38]/20 text-[#f5e3a9] border border-[#c29b38]/40 shrink-0">
                      <BookOpen className="w-3.5 h-3.5" />
                    </span>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#c29b38]">
                      Hồ Sơ Học Liệu • 2–3 Nguồn Uy Tín Chính Thống
                    </h4>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-800/50">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Đã kiểm chứng
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
                  {(meta.officialSources || place.officialSources || [place.officialSource || '']).filter(Boolean).map((sourceItem, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/90 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c29b38] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{sourceItem}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      ) : (
        /* 2-column Interactive Stage for other modes */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Stage (5 cols): Interactive Infographic Visual Canvas */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative group rounded-2xl overflow-hidden border border-[#c29b38]/50 shadow-2xl bg-slate-950">
              
              {/* Visual Viewport with Aspect Ratio */}
              <div className={`relative w-full overflow-hidden bg-slate-900 ${
                aspectRatio === '3:4' ? 'aspect-[3/4]' : aspectRatio === '16:9' ? 'aspect-video' : 'aspect-square'
              } transition-all duration-300`}>
                
                <img
                  src={meta.masterImage || getMediaUrl(place.image)}
                  alt={`Infographic ${place.name}`}
                  className="w-full h-full object-cover transition-all duration-500 brightness-95 contrast-105"
                />

                {/* Gradient Vignette for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                {/* Top Badges on Poster */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-[#f5e3a9] border border-[#c29b38]/40 uppercase tracking-wider">
                      Infographic HD
                    </span>
                    {hasHeritageAge && (
                      <span className="px-2 py-1 rounded-md bg-[#101826]/85 backdrop-blur-md text-[10px] font-mono font-bold text-slate-300 border border-slate-700">
                        {meta.heritageAgeYears} năm tuổi
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {(['3:4', '16:9'] as const).map(r => (
                      <button
                        key={r}
                        onClick={() => setAspectRatio(r)}
                        className={`pointer-events-auto px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-all ${
                          aspectRatio === r ? 'bg-[#c29b38] text-slate-950' : 'bg-black/60 text-slate-300 hover:text-white'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Canvas Caption & Identity */}
                <div className="absolute bottom-3 left-4 right-4 text-left z-10 pointer-events-none">
                  <p className="text-[11px] text-[#e6ca65] font-bold uppercase tracking-wider mb-0.5">
                    {meta.categoryTitle || categoryTitle || "Di tích & Không gian Văn hóa"}
                  </p>
                  <h4 className="text-lg font-serif-display font-bold text-white tracking-wide leading-tight drop-shadow-md">
                    {place.name}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-300 mt-1 font-mono">
                    <span>Khởi lập: <strong className="text-[#f5e3a9]">{meta.yearEstablished}</strong></span>
                    {hasHeritageAge && (
                      <>
                        <span>•</span>
                        <span>Tuổi đời: <strong className="text-[#e6ca65]">{meta.heritageAgeYears} năm</strong></span>
                      </>
                    )}
                  </div>
                </div>

                {/* Hover Fullscreen Zoom Button */}
                <button
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 hover:bg-[#c29b38] text-white hover:text-slate-950 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/20 z-20"
                  title="Phóng to Infographic toàn màn hình"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Action Toolbar Below Canvas */}
            <div className="w-full text-xs">
              <button
                onClick={() => setIsZoomOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#141d2e] hover:bg-[#1a273e] border border-slate-800 hover:border-[#c29b38]/40 transition-colors flex items-center justify-center gap-1.5 text-slate-300 hover:text-white"
              >
                <Eye className="w-3.5 h-3.5 text-[#e6ca65]" />
                <span>Xem Ảnh Gốc HD</span>
              </button>
            </div>

            {/* Return to Full Poster Mode Button */}
            <button
              onClick={() => setActiveMode('poster')}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#141f33] to-[#101826] hover:border-[#c29b38] border border-slate-800 text-xs font-bold text-[#f5e3a9] flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-[#e6ca65]" />
              <span>Quay lại Bảng Phân Tích Di Sản</span>
            </button>

            {/* Compact Heritage Profile Snippet */}
            <div className="p-3.5 rounded-xl bg-[#0e1524] border border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
              <div className="flex items-center justify-between text-[#c29b38] font-bold">
                <span>Hồ Sơ Di Tích</span>
                <span className="font-mono text-[#f5e3a9]">{meta.yearEstablished}</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                <strong className="text-slate-400">Quy mô:</strong> {meta.dimensionsOrScale}
              </p>
            </div>
          </div>

          {/* Right Stage (7 cols): Dynamic Interactive Workspace Based on activeMode */}
          <div className="lg:col-span-7 space-y-4">

            {/* Quick Metrics KPI Cards Bar */}
            {meta.keyDataPoints && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {meta.keyDataPoints.map((dp, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#141d2e] border border-slate-800 hover:border-[#c29b38]/30 transition-colors">
                    <span className="text-[10px] text-slate-400 block uppercase font-medium truncate">{dp.label}</span>
                    <span className="text-xs sm:text-sm font-bold text-[#f5e3a9] font-mono mt-0.5 block truncate">
                      {dp.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

          {/* ======================================================== */}
          {/* VIEW: BIÊN NIÊN SỬ TRỰC QUAN (INTERACTIVE TIMELINE & AUTO-PLAY) */}
          {/* ======================================================== */}
          {activeMode === 'timeline' && (
            <div className="p-5 rounded-2xl bg-[#141d2e] border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#c29b38] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#c29b38]" />
                    Biên niên sử & Dòng thời gian lịch sử
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Xem từng mốc son phát triển hoặc bật chế độ trình chiếu tự động
                  </p>
                </div>

                {/* Auto Play Toggle */}
                <button
                  onClick={() => setIsTimelinePlaying(!isTimelinePlaying)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto ${
                    isTimelinePlaying
                      ? 'bg-amber-500 text-slate-950 animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {isTimelinePlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#e6ca65]" />}
                  <span>{isTimelinePlaying ? 'Tạm Dừng Trình Chiếu' : 'Trình Chiếu Tự Động'}</span>
                </button>
              </div>

              {/* Progress Stepper Nodes Bar */}
              <div className="flex items-center justify-between gap-1 py-1 overflow-x-auto">
                {meta.milestones.map((m, idx) => {
                  const isActive = activeMilestoneIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveMilestoneIndex(idx);
                        setIsTimelinePlaying(false);
                      }}
                      className={`flex-1 min-w-[70px] py-2 px-1 rounded-xl text-center transition-all border ${
                        isActive
                          ? 'bg-[#c29b38] border-[#c29b38] text-slate-950 font-bold shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] font-mono block truncate">{m.year}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Milestone Highlight Card */}
              {meta.milestones[activeMilestoneIndex] && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#172338] to-[#101826] border-2 border-[#c29b38] space-y-2 animate-in fade-in duration-200 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base font-bold text-[#f5e3a9] font-mono flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#c29b38]" />
                      Năm: {meta.milestones[activeMilestoneIndex].year}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                      Mốc {activeMilestoneIndex + 1} / {meta.milestones.length}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                    {meta.milestones[activeMilestoneIndex].event}
                  </p>
                </div>
              )}

              {/* Full Timeline Flow */}
              <div className="relative pl-6 space-y-3 pt-2 before:content-[''] before:absolute before:left-2 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-[#c29b38] before:via-[#e6ca65] before:to-slate-800">
                {meta.milestones.map((m, idx) => {
                  const isCurrent = activeMilestoneIndex === idx;
                  return (
                    <div 
                      key={idx}
                      onClick={() => {
                        setActiveMilestoneIndex(idx);
                        setIsTimelinePlaying(false);
                      }}
                      className={`relative cursor-pointer group transition-all p-3 rounded-xl border ${
                        isCurrent
                          ? 'bg-[#1a2538] border-[#c29b38] ring-1 ring-[#c29b38]'
                          : 'bg-[#0f1726] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className={`absolute -left-6 top-3 w-3 h-3 rounded-full ring-4 ring-[#141d2e] transition-colors ${
                        isCurrent ? 'bg-[#e6ca65] scale-125' : 'bg-[#c29b38]'
                      }`} />
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono font-bold text-[#e6ca65]">
                          {m.year}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#c29b38] text-slate-950 font-bold uppercase">
                            Đang xem
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {m.event}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Trust & Verification Footer with Official Sources */}
          <div className="p-3.5 rounded-xl bg-[#0b101a] border border-slate-800 space-y-2 text-[11px] text-slate-400">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hồ Sơ Học Liệu • Nguồn Tư Liệu Chính Thống</span>
              </div>
              <span className="text-[#c29b38] font-mono text-[10px]">Đã xác thực</span>
            </div>
            <div className="space-y-1 pt-1">
              {(meta.officialSources || place.officialSources || [place.officialSource || '']).filter(Boolean).map((sourceItem, sIdx) => (
                <div key={sIdx} className="flex items-start gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3 h-3 text-[#c29b38] shrink-0 mt-0.5" />
                  <span className="leading-snug">{sourceItem}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
      )}

      {/* ======================================================== */}
      {/* FULLSCREEN LIGHTBOX ZOOM MODAL */}
      {/* ======================================================== */}
      {isZoomOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsZoomOpen(false)}
        >
          <div 
            className="relative max-w-5xl max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute -top-12 right-0 p-2.5 rounded-full bg-slate-900 hover:bg-[#c29b38] text-white hover:text-slate-950 transition-colors border border-slate-700 shadow-xl"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={meta.masterImage || getMediaUrl(place.image)}
              alt={`Infographic High-Res ${place.name}`}
              className="max-h-[82vh] w-auto object-contain rounded-xl border border-[#c29b38]/50 shadow-2xl"
            />

            <div className="mt-3 text-center">
              <h4 className="text-lg font-bold text-white font-serif-display">
                Đồ họa Infographic Di Sản: {place.name}
              </h4>
              <p className="text-xs text-[#e6ca65] mt-0.5">
                {meta.categoryTitle || categoryTitle} • Phân giải chuẩn bảo tàng
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

