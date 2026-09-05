import React from 'react';
import { 
  Target, 
  BookOpen, 
  Sparkles, 
  Mail, 
  Heart, 
  CheckCircle2, 
  Send,
  Compass,
  GraduationCap,
  Layers,
  Award,
  ExternalLink,
  ClipboardCheck,
  MessageSquareHeart,
  Star
} from 'lucide-react';
import { SlideData, ProjectInfo } from '../types';
import { getMediaUrl } from '../utils/mediaFallback';

interface SlideAboutProps {
  slide: SlideData;
  projectInfo: ProjectInfo;
}

export const SlideAbout: React.FC<SlideAboutProps> = ({
  slide,
  projectInfo
}) => {
  return (
    <section 
      id={`slide-${slide.id}`} 
      className="relative min-h-[90vh] py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Header Eyebrow & Titles */}
      <div className="border-b border-white/10 pb-5 mb-8 animate-fade-rise">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#f5e3a9] text-xs font-semibold backdrop-blur-md">
            {slide.category}
          </span>
          <span className="text-xs text-white/50 font-mono">
            HÀNH TRÌNH SÁNG LẬP & TẦM NHÌN
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-white">
          {slide.primaryTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#e6ca65] mt-1 font-serif-display italic font-medium">
          {slide.secondaryTitle}
        </p>

        {/* Highlights */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {slide.keyHighlights.map((h, i) => (
            <div key={i} className="p-3 rounded-xl liquid-glass border border-white/10 text-xs text-white/80 flex items-start gap-2 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#c29b38] shrink-0 mt-0.5" />
              <span className="line-clamp-2">{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main 2-Column Editorial About Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): Core Information Pillars & Our Story */}
        <div className="lg:col-span-7 space-y-6 animate-fade-rise">
          
          {/* 4 Core Information Pillars (2x2 Grid) */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#e6ca65] flex items-center gap-2">
              <Target className="w-4 h-4 text-[#e6ca65]" />
              THÔNG TIN CƠ BẢN VỀ HCMC CULTUREHUB
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Mục tiêu */}
              <div className="p-4 rounded-xl liquid-glass border border-white/10">
                <h4 className="text-xs font-bold text-[#c29b38] uppercase mb-1.5 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  Mục tiêu
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  Hỗ trợ học sinh và công chúng khám phá văn hóa Thành phố Hồ Chí Minh theo hướng trực quan, tương tác và sinh động, qua đó khơi dậy sự hứng thú, tình yêu và ý thức gìn giữ những giá trị văn hóa của thành phố.
                </p>
              </div>

              {/* Nội dung */}
              <div className="p-4 rounded-xl liquid-glass border border-white/10">
                <h4 className="text-xs font-bold text-[#c29b38] uppercase mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Nội dung
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  Hệ thống tập trung vào nhiều phương diện của văn hóa như lịch sử, kiến trúc, ẩm thực, nghệ thuật, lễ hội, con người, đời sống cộng đồng và không gian đô thị.
                </p>
              </div>

              {/* Trải nghiệm học liệu số */}
              <div className="p-4 rounded-xl liquid-glass border border-white/10">
                <h4 className="text-xs font-bold text-[#e6ca65] uppercase mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Học liệu trực quan
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  Infographic tạp chí, bản đồ số, tư liệu hình ảnh và video thực tế giúp người học tiếp cận kiến thức di sản một cách đa chiều, cuốn hút.
                </p>
              </div>

              {/* Đối tượng hướng đến */}
              <div className="p-4 rounded-xl liquid-glass border border-white/10">
                <h4 className="text-xs font-bold text-[#c29b38] uppercase mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Đối tượng hướng đến
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  Học sinh THPT, sinh viên, giáo viên, phụ huynh và tất cả những ai yêu quý, muốn tìm hiểu sâu sắc về không gian văn hóa đô thị Thành phố Hồ Chí Minh.
                </p>
              </div>
            </div>
          </div>

          {/* CÂU CHUYỆN CỦA CHÚNG TÔI - 100% PRESERVED */}
          <div className="liquid-glass p-6 rounded-2xl border border-white/15 space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#c29b38] flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#c29b38]" />
              CÂU CHUYỆN CỦA CHÚNG TÔI
            </h3>
            <div className="text-xs sm:text-sm text-white/85 leading-relaxed space-y-3">
              <p>
                Chúng tôi tin rằng văn hóa không phải là những điều xa xôi chỉ tồn tại trong sách giáo khoa. Văn hóa hiện diện trong từng con phố, mái nhà, món ăn, câu hát, lễ hội và trong chính cách con người sống cùng nhau.
              </p>
              <p>
                Vì thế, HCMC CultureHub ra đời với mong muốn tạo nên một cách tiếp cận khác: để người trẻ tự mình khám phá văn hóa, quan sát, tương tác với tri thức di sản và kể lại những câu chuyện ấy bằng góc nhìn của chính mình.
              </p>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-center font-semibold text-[#f5e3a9]">
                Từ văn hóa → đến công nghệ → đến trải nghiệm → và cuối cùng là kết nối con người với cội nguồn.
              </div>
              <p className="italic text-center text-[#e6ca65] font-serif-display text-base pt-1">
                “Hiểu văn hóa là hiểu con người – yêu văn hóa là cách đẹp nhất để kết nối với cội nguồn và cộng đồng.”
              </p>
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Founders Card, Contact & Digital Library Scope */}
        <div className="lg:col-span-5 space-y-6 animate-fade-rise-delay">
          
          {/* Founders & Team Card */}
          <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/50 liquid-glass">
            <img 
              src={getMediaUrl("./assets/about_culturehub.webp")}
              alt="HCMC CultureHub Founders Team"
              className="w-full h-52 object-cover brightness-75 contrast-110"
            />
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#c29b38]/20 text-[#f5e3a9] border border-[#c29b38]/30 uppercase">
                  Nhóm Sáng Lập
                </span>
                <span className="text-xs font-mono text-white/60">3 Thành Viên Đồng Sáng Lập</span>
              </div>

              <h4 className="text-xl font-serif-display font-bold text-white">
                HCMC CultureHub
              </h4>

              <p className="text-xs text-white/80 italic font-serif-display">
                "{projectInfo.slogan}"
              </p>

              {/* Contact Block */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-white/60 block mb-2">
                  Kênh liên hệ chính thức:
                </span>
                <a
                  href={`mailto:${projectInfo.contactEmail}`}
                  className="p-3 rounded-xl liquid-glass border border-white/10 hover:border-[#c29b38] transition-all flex items-center justify-between text-xs text-white/90 group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#c29b38]/20 text-[#e6ca65]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-white font-medium">{projectInfo.contactEmail}</span>
                  </div>
                  <Send className="w-3.5 h-3.5 text-white/40 group-hover:text-[#e6ca65] transition-colors" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* MỤC KHẢO SÁT Ý KIẾN TRẢI NGHIỆM & LỜI CẢM ƠN */}
      <div 
        id="survey-section"
        className="mt-12 p-6 sm:p-8 lg:p-10 rounded-3xl liquid-glass border border-white/20 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle decorative background lights */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-[#c29b38]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-[#e6ca65]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text Block: Thank You & Purpose */}
          <div className="space-y-4 max-w-3xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c29b38]/20 border border-[#c29b38]/40 text-[#f5e3a9] text-xs font-bold uppercase tracking-wider">
              <ClipboardCheck className="w-4 h-4 text-[#e6ca65]" />
              <span>Khảo Sát Ý Kiến & Đóng Góp Phát Triển</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-white tracking-wide leading-tight">
              Lời Cảm Ơn Chân Thành Từ Đội Ngũ Phát Triển
            </h3>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              Cảm ơn bạn đã dành thời gian quý báu trải nghiệm website <strong className="text-[#f5e3a9]">HCMC CultureHub</strong>! 
              Mỗi chia sẻ, nhận xét và phản hồi của quý thầy cô, các bạn học sinh cùng cộng đồng yêu văn hóa là nguồn động lực to lớn giúp chúng tôi không ngừng cải tiến giao diện, làm giàu tư liệu và nâng tầm không gian học liệu số di sản Thành phố Hồ Chí Minh.
            </p>

            {/* Quality Badges - Removed dòng đóng góp cho môn GD địa phương */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-white/80">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#e6ca65]" />
                <span>Khảo sát nhanh: ~2 phút</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Lắng nghe & tiếp thu ý kiến</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <Star className="w-4 h-4 text-[#c29b38]" />
                <span>Kho học liệu di sản mở rộng</span>
              </div>
            </div>
          </div>

          {/* Right CTA Button */}
          <div className="shrink-0 w-full lg:w-auto text-center">
            <a
              href="https://forms.gle/baf2AwYp29T3joxd7"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-survey-form-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-[#c29b38] via-[#e6ca65] to-[#c29b38] hover:brightness-110 text-slate-950 font-bold text-sm sm:text-base transition-all shadow-xl shadow-[#c29b38]/30 hover:shadow-[#c29b38]/50 hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <MessageSquareHeart className="w-5 h-5 text-slate-950" />
              <span>Gửi Đóng Góp Ý Kiến Của Bạn</span>
              <ExternalLink className="w-4 h-4 text-slate-900 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <p className="text-[11px] text-white/50 mt-2 font-mono">
              Biểu mẫu Google Form chính thức: forms.gle/baf2AwYp29T3joxd7
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
