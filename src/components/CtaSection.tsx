import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Compass, 
  Sparkles, 
  MapPin, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Heart, 
  ExternalLink,
  BookOpen,
  Landmark
} from 'lucide-react';

interface CtaSectionProps {
  onNavigateSlide?: (slideIndex: number) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onNavigateSlide }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Parallax transforms for the dashboard mock
  const yDashboard = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotateXDashboard = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -5]);
  const scaleDashboard = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);
  const opacityDashboard = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.6]);

  const videoUrl = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";
  const grassBgUrl = "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1780586778/cta-bg_mlwy5s.png";

  return (
    <section 
      ref={containerRef}
      id="cta-experience-section" 
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center overflow-hidden rounded-3xl my-12"
    >
      {/* Background Video with subtle overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover brightness-[0.4] contrast-[1.1] scale-105"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Dark Vignette & Liquid Gradient Masks */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/80" />
      </div>

      {/* Decorative Grass Overlay at Bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 pointer-events-none z-10 opacity-70 bg-bottom bg-repeat-x bg-contain"
        style={{ backgroundImage: `url(${grassBgUrl})` }}
      />

      {/* Main Content Layer */}
      <div className="relative z-20 space-y-12 max-w-5xl mx-auto w-full">
        
        {/* Header Eyebrow & Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-white/20 text-[#f5e3a9] text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#e6ca65]" />
            <span>Không Gian Trải Nghiệm Học Liệu Số</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-bold text-white tracking-wide leading-tight">
            Khám Phá Di Sản Sài Gòn - TP. Hồ Chí Minh
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 leading-relaxed font-sans">
            Tích hợp bản đồ số tương tác, thư viện ảnh tư liệu phân giải cao, hệ thống infographic trực quan hóa kiến thức và dữ liệu địa danh sau sáp nhập chính xác nhất.
          </p>
        </div>

        {/* Parallax Dashboard Mock */}
        <motion.div 
          style={{ 
            y: yDashboard, 
            rotateX: rotateXDashboard, 
            scale: scaleDashboard,
            opacity: opacityDashboard,
            perspective: 1000 
          }}
          className="liquid-glass-card rounded-3xl p-5 sm:p-8 border border-white/20 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient Glow inside Mock */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#c29b38]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Window Chrome */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs font-mono text-white/50 ml-2">hcmc-culturehub.vn/di-san-do-thi</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#f5e3a9]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dữ liệu cập nhật 2026</span>
            </div>
          </div>

          {/* Inner Mock Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Column 1: Di tích & Không gian */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#e6ca65] font-semibold">
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  <Landmark className="w-4 h-4" /> 5 Không Gian Lớn
                </span>
                <span className="font-mono">30+ Địa danh</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Hệ thống hóa từ kiến trúc lịch sử, cơ sở tín ngưỡng, thương mại sầm uất, làng nghề thủ công đến không gian biển Cần Giờ.
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-white/50">
                <span>Hồ sơ di sản số</span>
                <span className="text-[#f5e3a9]">Toàn diện & Chuẩn hóa</span>
              </div>
            </div>

            {/* Column 2: Bản đồ số địa chỉ mới */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#e6ca65] font-semibold">
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  <MapPin className="w-4 h-4" /> Địa Giới Mới
                </span>
                <span className="font-mono">Chuẩn hóa</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Tất cả địa chỉ di tích đều được đồng bộ theo đơn vị hành chính sau sắp xếp (phường mới, quận mới) kèm tọa độ GPS chính xác.
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-white/50">
                <span>Dẫn đường Google Maps</span>
                <span className="text-[#f5e3a9]">Tích hợp 1-chạm</span>
              </div>
            </div>

            {/* Column 3: Infographic & Tư liệu số */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#e6ca65] font-semibold">
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" /> Infographic Tạp Chí
                </span>
                <span className="font-mono">Đồ họa sắc nét</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Bố cục tạp chí di sản tinh tế, bảng màu đặc trưng văn hóa, dòng thời gian niên đại và các điểm ảnh tương tác sống động.
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-white/50">
                <span>Xuất PDF & In ấn</span>
                <span className="text-[#f5e3a9]">Hỗ trợ sẵn</span>
              </div>
            </div>

          </div>

          {/* Action Row inside Dashboard Mock */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-white/70">
              <CheckCircle2 className="w-4 h-4 text-[#e6ca65]" />
              <span>Thiết kế tối ưu cho máy tính, máy tính bảng và điện thoại di động</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onNavigateSlide && onNavigateSlide(6)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full liquid-glass border border-white/20 text-white hover:text-[#f5e3a9] text-xs font-semibold hover:border-[#c29b38] transition-all"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Mở Bản Đồ Số</span>
              </button>

              <a
                href="https://forms.gle/baf2AwYp29T3joxd7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#c29b38] via-[#e6ca65] to-[#c29b38] text-slate-950 text-xs font-bold hover:brightness-110 shadow-lg shadow-[#c29b38]/20 transition-all"
              >
                <span>Khảo Sát Ý Kiến</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
