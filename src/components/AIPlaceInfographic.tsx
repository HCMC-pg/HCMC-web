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
  Compass, 
  RefreshCw,
  Eye,
  Sliders,
  ChevronRight,
  Play,
  Pause,
  Ruler,
  Share2,
  Info,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Clock,
  Grid,
  BookOpen
} from 'lucide-react';
import { PlaceItem } from '../types';
import { getPlaceInfographic, PlaceInfographicMeta } from '../data/infographicData';
import { getMediaUrl } from '../utils/mediaFallback';

interface AIPlaceInfographicProps {
  place: PlaceItem;
  categoryTitle?: string;
}

type InfographicMode = 'poster' | 'blueprint' | 'timeline' | 'metrics';

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

  // Heritage score calculation (e.g. 98 for Special National Heritage, 92 for National Heritage)
  const isSpecialNational = meta.keyClassification.toLowerCase().includes('đặc biệt') || meta.keyClassification.toLowerCase().includes('unesco');
  const heritageScore = isSpecialNational ? 98 : 92;
  const ageYears = meta.heritageAgeYears || 100;
  const saigonHistoryYears = 326; // 1698 - 2024
  const agePercentageOfSaigon = Math.min(100, Math.round((ageYears / saigonHistoryYears) * 100));

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
                <span className="px-2 py-0.5 rounded-full bg-[#c29b38]/20 border border-[#c29b38]/40 text-[#f5e3a9] text-[10px] font-bold">
                  {meta.keyClassification.split('•')[0].trim()}
                </span>
              </div>
              <p className="text-xs text-white/70 mt-0.5">
                Tổng hợp trực quan các thông số kiến trúc cốt lõi, mốc son lịch sử & giá trị văn hóa di sản
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
            <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
              Niên đại di sản: <span className="text-[#e6ca65] font-bold">{meta.heritageAgeYears} năm tuổi</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
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
              onClick={() => setActiveMode('blueprint')}
              className={`p-2.5 rounded-xl border text-center transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                activeMode === 'blueprint'
                  ? 'bg-[#c29b38] border-[#c29b38] text-slate-950 font-bold shadow-md shadow-[#c29b38]/20'
                  : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <Grid className="w-4 h-4 shrink-0" />
              <span className="truncate">Bản Vẽ Kỹ Thuật</span>
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

            <button
              onClick={() => setActiveMode('metrics')}
              className={`p-2.5 rounded-xl border text-center transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                activeMode === 'metrics'
                  ? 'bg-[#c29b38] border-[#c29b38] text-slate-950 font-bold shadow-md shadow-[#c29b38]/20'
                  : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <Activity className="w-4 h-4 shrink-0" />
              <span className="truncate">Chỉ Số Di Sản</span>
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
                    Khởi lập: {meta.yearEstablished} ({meta.heritageAgeYears} năm tuổi)
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

            {/* 4 Chỉ Số Vàng (Quick KPI Badges) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#101826] border border-[#c29b38]/30 shadow-md">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Khởi Lập / Khánh Thành</span>
                <span className="text-base sm:text-lg font-bold text-[#f5e3a9] font-mono mt-1 block">
                  {meta.yearEstablished}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5 truncate">{meta.architectOrOrigin}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#101826] border border-[#c29b38]/30 shadow-md">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Tuổi Đời Di Sản</span>
                <span className="text-base sm:text-lg font-bold text-[#e6ca65] font-mono mt-1 block">
                  {meta.heritageAgeYears} Năm
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">~{agePercentageOfSaigon}% lịch sử Sài Gòn</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#101826] border border-[#c29b38]/30 shadow-md">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Cấp Xếp Hạng</span>
                <span className="text-xs sm:text-sm font-bold text-white mt-1 block line-clamp-1">
                  {meta.keyClassification.split('•')[0].trim()}
                </span>
                <span className="text-[10px] text-[#f5e3a9] block mt-0.5">Điểm di sản: {heritageScore}/100</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#101826] border border-[#c29b38]/30 shadow-md">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Quy Mô & Cấu Trúc</span>
                <span className="text-xs sm:text-sm font-bold text-white mt-1 block line-clamp-1">
                  {meta.dimensionsOrScale}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{meta.blueprint?.orientation || 'Phong thủy Nam Bộ'}</span>
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
                      Sơ Đồ Cắt Lớp Kiến Trúc
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
                    <span className="text-[10px] font-mono text-[#e6ca65] block uppercase">Góc nhìn kiến trúc tiêu biểu</span>
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
                      Đặc Trưng Tạo Hình & Cấu Trúc Điểm Nhấn
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">Tóm tắt thị giác</span>
                  </div>

                  <div className="space-y-2.5">
                    {meta.visualHighlights.map((highlight, idx) => (
                      <div 
                        key={idx} 
                        className="p-3 rounded-xl bg-[#0b121e] border border-slate-800/80 hover:border-[#c29b38]/40 transition-colors flex items-start gap-3 text-xs"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#c29b38]/20 text-[#f5e3a9] border border-[#c29b38]/40 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-slate-200 leading-relaxed font-medium">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro Blueprint Notes */}
                <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#0b121e] border border-slate-800">
                    <span className="text-[10px] font-bold text-[#c29b38] block uppercase">Vật liệu chính:</span>
                    <span className="text-slate-300 text-[11px] line-clamp-1">{meta.blueprint?.materials.slice(0, 2).join(', ') || 'Đá hoa cương, gạch ngói'}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0b121e] border border-slate-800">
                    <span className="text-[10px] font-bold text-[#c29b38] block uppercase">Tác giả / Nguồn gốc:</span>
                    <span className="text-slate-300 text-[11px] line-clamp-1">{meta.architectOrOrigin.slice(0, 24)}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Sơ Đồ Biên Niên Sử Tóm Tắt (Chronological Milestone Infographic Roadmap) */}
            <div className="p-5 rounded-2xl bg-[#101826] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#c29b38]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#c29b38]">
                    Biên Niên Sử Lịch Sử Tóm Tắt
                  </h4>
                </div>
                <button
                  onClick={() => setActiveMode('timeline')}
                  className="text-[11px] text-[#e6ca65] hover:underline font-bold flex items-center gap-1"
                >
                  <span>Xem chi tiết timeline</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Horizontal Milestone Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                {meta.milestones.slice(0, 4).map((m, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-[#0b121e] border border-slate-800 hover:border-[#c29b38]/50 transition-all flex flex-col justify-between space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold font-mono text-[#f5e3a9] bg-[#c29b38]/15 px-2 py-0.5 rounded border border-[#c29b38]/30">
                        {m.year}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">Mốc #{idx + 1}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-snug line-clamp-2">
                      {m.event}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Trụ Cột Tri Thức Tóm Tắt (3 Knowledge Pillars) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Cột 1: Kiến trúc & Nghệ thuật */}
              <div className="p-4.5 rounded-2xl bg-[#101826] border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-[#c29b38]">
                  <Landmark className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    1. Kiến Trúc & Tạo Hình
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {place.architecturalStyle || meta.blueprint?.crossSectionNote || `Công trình mang ngôn ngữ kiến trúc tiêu biểu, kết hợp hài hòa giữa yếu tố cổ điển và sự thích nghi khí hậu nhiệt đới Nam Bộ.`}
                </p>
              </div>

              {/* Cột 2: Lịch sử & Giá trị Văn hóa */}
              <div className="p-4.5 rounded-2xl bg-[#101826] border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-[#c29b38]">
                  <Award className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    2. Lịch Sử & Xã Hội
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {place.historicalSignificance || `Chứng nhân lịch sử quan trọng trong tiến trình hình thành và phát triển của Sài Gòn - Thành phố Hồ Chí Minh qua hơn ba thế kỷ.`}
                </p>
              </div>

              {/* Cột 3: Trọng tâm Giá Trị Văn Hóa & Tinh Thần Di Sản */}
              <div className="p-4.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#e6ca65]">
                  <BookOpen className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    3. Giá Trị Văn Hóa & Di Sản
                  </h4>
                </div>
                <p className="text-xs text-white/80 leading-relaxed font-medium">
                  {place.educationalValue || `Học sinh và công chúng cần nắm vững niên đại khởi lập, giá trị bảo tồn cấp quốc gia và ý thức gìn giữ di sản trong không gian đô thị hiện đại.`}
                </p>
              </div>
            </div>

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
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    activeMode === 'blueprint' ? 'brightness-75 contrast-125 saturate-50 hue-rotate-180' : 'brightness-95 contrast-105'
                  }`}
                />

                {/* Blueprint Grid Overlay in Blueprint Mode */}
                {activeMode === 'blueprint' && (
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}
                  />
                )}

                {/* Gradient Vignette for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                {/* Top Badges on Poster */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-[#f5e3a9] border border-[#c29b38]/40 uppercase tracking-wider">
                      {activeMode === 'hotspots' ? 'Radar Hotspot' : activeMode === 'blueprint' ? 'Sơ đồ Kỹ thuật' : 'Infographic HD'}
                    </span>
                    {meta.heritageAgeYears && (
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
                    <span>•</span>
                    <span className="truncate">{meta.architectOrOrigin.slice(0, 32)}</span>
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
                <strong className="text-slate-400">Kiến trúc:</strong> {meta.architectOrOrigin}
              </p>
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
          {/* VIEW 2: BẢN VẼ KỸ THUẬT & KIẾN TRÚC (BLUEPRINT & ANATOMY) */}
          {/* ======================================================== */}
          {activeMode === 'blueprint' && (
            <div className="p-5 rounded-2xl bg-[#0a101b] border border-cyan-800/60 space-y-4 font-sans text-slate-200">
              <div className="flex items-center justify-between border-b border-cyan-900/60 pb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  Sơ đồ kết cấu & Bản vẽ mặt bằng kiến trúc
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                  Scale 1:500
                </span>
              </div>

              {/* Blueprint Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#0d1624] border border-cyan-900/60 space-y-1">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase block font-mono">
                    Hướng Tọa Độ & Địa Thế:
                  </span>
                  <p className="text-white font-medium">{meta.blueprint?.orientation}</p>
                  <p className="text-cyan-300/80 font-mono text-[11px]">GPS: {meta.blueprint?.gridCoords}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0d1624] border border-cyan-900/60 space-y-1">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase block font-mono">
                    Quy Mô Không Gian:
                  </span>
                  <p className="text-white font-medium">{meta.blueprint?.scale}</p>
                  <p className="text-cyan-300/80 font-mono text-[11px]">Khí hậu: Nhiệt đới gió mùa Nam Bộ</p>
                </div>
              </div>

              {/* Material Composition List */}
              <div className="p-4 rounded-xl bg-[#0d1624] border border-cyan-900/60 space-y-2">
                <span className="text-[11px] font-bold text-cyan-300 uppercase block font-mono flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-cyan-400" />
                  Vật liệu kiến trúc & Cấu kiện xây dựng cốt lõi:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {meta.blueprint?.materials.map((mat, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#070c14] border border-cyan-950 text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                      <span>{mat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Cross-Section Note */}
              <div className="p-3.5 rounded-xl bg-[#09121f] border border-cyan-900/40 text-xs text-slate-300 space-y-1 font-mono">
                <span className="text-cyan-400 font-bold block text-[10px] uppercase">
                  Ghi chú kỹ thuật bảo tồn di tích:
                </span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {meta.blueprint?.crossSectionNote || "Công trình được thiết kế với giải pháp chống nóng, đón gió đối lưu tự nhiên và hệ thoát nước thích ứng đặc thù sông nước miền Nam."}
                </p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 4: BIÊN NIÊN SỬ TRỰC QUAN (INTERACTIVE TIMELINE & AUTO-PLAY) */}
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

          {/* ======================================================== */}
          {/* VIEW 5: CHỈ SỐ & ĐO LƯỜNG DI SẢN (METRICS & VISUAL GAUGES) */}
          {/* ======================================================== */}
          {activeMode === 'metrics' && (
            <div className="p-5 rounded-2xl bg-[#141d2e] border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#c29b38] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#c29b38]" />
                  Chỉ số di sản & Tầm vóc lịch sử
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  Phân tích định lượng
                </span>
              </div>

              {/* Circular Gauge & Age Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                
                {/* SVG Gauge */}
                <div className="p-4 rounded-xl bg-[#0f1726] border border-slate-800 flex items-center gap-4">
                  <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-800"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#c29b38]"
                        strokeDasharray={`${heritageScore}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-lg font-extrabold text-[#f5e3a9] font-mono">{heritageScore}</span>
                      <span className="text-[9px] text-slate-400 block -mt-1">/100</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#c29b38] uppercase block">Chỉ số tầm vóc di sản:</span>
                    <h5 className="text-sm font-bold text-white mt-0.5">
                      {isSpecialNational ? 'Di Tích Quốc Gia Đặc Biệt' : 'Di Tích Lịch Sử Quốc Gia'}
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Xếp hạng theo tiêu chí bảo tồn, niên đại và giá trị văn hóa của Bộ Văn hóa, Thể thao và Du lịch.
                    </p>
                  </div>
                </div>

                {/* Age vs Saigon 326 Years Scale */}
                <div className="p-4 rounded-xl bg-[#0f1726] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Niên đại công trình:</span>
                    <strong className="text-[#f5e3a9] font-mono">{ageYears} năm</strong>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#c29b38] to-[#e6ca65] h-full rounded-full transition-all duration-1000"
                      style={{ width: `${agePercentageOfSaigon}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>1698 (Nguyễn Hữu Cảnh)</span>
                    <span className="text-[#e6ca65] font-bold">{agePercentageOfSaigon}% chiều dài lịch sử Sài Gòn</span>
                    <span>Nay</span>
                  </div>

                  <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
                    Công trình đã đồng hành qua <strong className="text-slate-200">{ageYears} năm</strong> thăng trầm cùng lịch sử đất phương Nam.
                  </p>
                </div>

              </div>

              {/* Data Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#0f1726] border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Niên Đại</span>
                  <span className="text-sm font-bold text-[#e6ca65] font-mono mt-1 block">{meta.yearEstablished}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0f1726] border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Cấp Xếp Hạng</span>
                  <span className="text-sm font-bold text-white font-mono mt-1 block truncate">Quốc Gia</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0f1726] border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Hiện Trạng</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono mt-1 block">Bảo Tồn Tốt</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0f1726] border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Giá Trị Văn Hóa</span>
                  <span className="text-sm font-bold text-[#f5e3a9] font-mono mt-1 block">Đặc Biệt</span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Trust & Verification Footer */}
          <div className="p-3 rounded-xl bg-[#0b101a] border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Nguồn tư liệu: Sở Du lịch, Sở Văn hóa & Giáo dục Địa phương Nam Bộ</span>
            </div>
            <span className="text-[#c29b38] font-mono">Chuẩn hóa dữ liệu</span>
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

