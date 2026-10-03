import React from 'react';
import { 
  Target, 
  Sparkles, 
  Mail, 
  Heart, 
  CheckCircle2, 
  Send,
  GraduationCap,
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

export const SlideAbout: React.FC<SlideAboutProps> = React.memo(({
  slide,
  projectInfo
}) => {
  return (
    <section 
      id={`slide-${slide.id}`} 
      className="relative min-h-[90vh] py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Header Eyebrow & Titles */}
      <div className="border-b border-[#dfd3be] pb-5 mb-8 animate-fade-rise">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-[#faece9] border border-[#edcac4] text-[#a33827] text-xs font-semibold shadow-sm">
            {slide.category}
          </span>
          <span className="text-xs text-[#786452] font-mono tracking-wider">
            HÀNH TRÌNH SÁNG LẬP & TẦM NHÌN
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-[#24180f]">
          {slide.primaryTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#944924] mt-1 font-serif-display italic font-medium">
          {slide.secondaryTitle}
        </p>
      </div>

      {/* Main 2-Column Editorial About Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): Core Information Pillars & Our Story */}
        <div className="lg:col-span-7 space-y-6 animate-fade-rise">
          
          {/* 3 Core Information Pillars */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#a33827] flex items-center gap-2 font-serif-display">
              <Target className="w-4 h-4 text-[#a33827]" />
              THÔNG TIN CƠ BẢN VỀ HCMC CULTUREHUB
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Mục tiêu */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#ffffff] border border-[#e5dac6] flex flex-col justify-between shadow-sm">
                <div>
                  <h4 className="text-xs font-bold text-[#a33827] uppercase mb-1.5 flex items-center gap-1.5 font-serif-display">
                    <Target className="w-3.5 h-3.5" />
                    Mục tiêu
                  </h4>
                  <p className="text-xs text-[#4b3c2f] leading-relaxed">
                    Hỗ trợ học sinh và công chúng khám phá văn hóa Thành phố Hồ Chí Minh theo hướng trực quan, tương tác và sinh động, qua đó khơi dậy sự hứng thú, tình yêu và ý thức gìn giữ những giá trị văn hóa của thành phố.
                  </p>
                </div>
              </div>

              {/* Trải nghiệm học liệu số */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#ffffff] border border-[#e5dac6] flex flex-col justify-between shadow-sm">
                <div>
                  <h4 className="text-xs font-bold text-[#b8863b] uppercase mb-1.5 flex items-center gap-1.5 font-serif-display">
                    <Sparkles className="w-3.5 h-3.5" />
                    Học liệu trực quan
                  </h4>
                  <p className="text-xs text-[#4b3c2f] leading-relaxed">
                    Infographic tạp chí, bản đồ số, tư liệu hình ảnh và video thực tế giúp người học tiếp cận kiến thức di sản một cách đa chiều, cuốn hút.
                  </p>
                </div>
              </div>

              {/* Đối tượng hướng đến */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#ffffff] border border-[#e5dac6] flex flex-col justify-between shadow-sm">
                <div>
                  <h4 className="text-xs font-bold text-[#255e37] uppercase mb-1.5 flex items-center gap-1.5 font-serif-display">
                    <GraduationCap className="w-3.5 h-3.5" />
                    Đối tượng hướng đến
                  </h4>
                  <p className="text-xs text-[#4b3c2f] leading-relaxed">
                    Học sinh THPT, sinh viên, giáo viên, phụ huynh và tất cả những ai yêu quý, muốn tìm hiểu sâu sắc về không gian văn hóa đô thị Thành phố Hồ Chí Minh.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CÂU CHUYỆN CỦA CHÚNG TÔI - 100% PRESERVED */}
          <div className="bg-[#fffdf9] p-6 sm:p-7 rounded-2xl border border-[#e5dac6] space-y-3.5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#a33827]" />
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#a33827] flex items-center gap-2 font-serif-display pl-1">
              <Heart className="w-4 h-4 text-[#a33827]" />
              CÂU CHUYỆN CỦA CHÚNG TÔI
            </h3>
            <div className="text-xs sm:text-sm text-[#433428] leading-relaxed space-y-3 pl-1">
              <p>
                Chúng tôi tin rằng văn hóa không phải là những điều xa xôi chỉ tồn tại trong sách giáo khoa. Văn hóa hiện diện trong từng con phố, mái nhà, món ăn, câu hát, lễ hội và trong chính cách con người sống cùng nhau.
              </p>
              <p>
                Vì thế, HCMC CultureHub ra đời với mong muốn tạo nên một cách tiếp cận khác: để người trẻ tự mình khám phá văn hóa, quan sát, tương tác với tri thức di sản và kể lại những câu chuyện ấy bằng góc nhìn của chính mình.
              </p>
              <p className="italic text-center text-[#8f4b26] font-serif-display text-base pt-1 font-medium">
                “Hiểu văn hóa là hiểu con người – yêu văn hóa là cách đẹp nhất để kết nối với cội nguồn và cộng đồng.”
              </p>
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Founders Card, Contact & Digital Library Scope */}
        <div className="lg:col-span-5 space-y-6 animate-fade-rise-delay">
          
          {/* Founders & Team Card Styled as Exhibition Portrait */}
          <div className="relative rounded-3xl overflow-hidden border border-[#dfd3be] shadow-md bg-[#ffffff] max-w-lg mx-auto lg:max-w-none">
            <div className="relative w-full py-4 px-4 bg-[#faf6ee] flex items-center justify-center overflow-hidden border-b border-[#ded1be]">
              <div className="p-2 bg-[#ffffff] rounded-xl border border-[#dfd2bd] shadow-sm">
                <img 
                  src={getMediaUrl(slide.image || "./assets/team3.jpg")}
                  alt="HCMC CultureHub Founders Team"
                  className="max-h-[230px] sm:max-h-[250px] w-auto max-w-full h-auto object-contain rounded-lg select-none mx-auto brightness-[0.98] contrast-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="p-5 sm:p-6 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#faece9] text-[#a33827] border border-[#edcac4] uppercase tracking-wide">
                  Nhóm Sáng Lập
                </span>
                <span className="text-xs font-mono text-[#786452]">3 Thành Viên Đồng Sáng Lập</span>
              </div>

              <h4 className="text-lg sm:text-xl font-serif-display font-bold text-[#24180f]">
                HCMC CultureHub
              </h4>

              <p className="text-xs text-[#5c4a3a] italic font-serif-display">
                "{projectInfo.slogan}"
              </p>

              {/* Contact Block */}
              <div className="pt-3 border-t border-[#eee5d5]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#786452] block mb-2 font-serif-display">
                  Kênh liên hệ chính thức:
                </span>
                <a
                  href={`mailto:${projectInfo.contactEmail}`}
                  className="p-3 rounded-xl bg-[#faf6ee] border border-[#ded1be] hover:border-[#b8863b] transition-all flex items-center justify-between text-xs text-[#24180f] group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#faece9] text-[#a33827]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[#24180f] font-semibold">{projectInfo.contactEmail}</span>
                  </div>
                  <Send className="w-3.5 h-3.5 text-[#8f7d6d] group-hover:text-[#a33827] transition-colors" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* MỤC KHẢO SÁT Ý KIẾN TRẢI NGHIỆM & LỜI CẢM ƠN (SỔ LƯU NIỆM & ĐÓNG GÓP) */}
      <div 
        id="survey-section"
        className="mt-12 p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#fffdf9] border-2 border-[#dfd3be] shadow-[0_8px_30px_rgba(67,52,35,0.08)] relative overflow-hidden"
      >
        {/* Subtle decorative background lights */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-[#ebd8bb]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-[#faece9]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text Block: Thank You & Purpose */}
          <div className="space-y-4 max-w-3xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faece9] border border-[#edcac4] text-[#a33827] text-xs font-bold uppercase tracking-wider shadow-sm">
              <ClipboardCheck className="w-4 h-4 text-[#a33827]" />
              <span>Khảo Sát Ý Kiến & Đóng Góp Phát Triển</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#24180f] tracking-wide leading-tight">
              Lời Cảm Ơn Chân Thành Từ Đội Ngũ Phát Triển
            </h3>

            <p className="text-sm sm:text-base text-[#4a3b2e] leading-relaxed">
              Cảm ơn bạn đã dành thời gian quý báu trải nghiệm website <strong className="text-[#a33827]">HCMC CultureHub</strong>! 
              Mỗi chia sẻ, nhận xét và phản hồi của quý thầy cô, các bạn học sinh cùng cộng đồng yêu văn hóa là nguồn động lực to lớn giúp chúng tôi không ngừng cải tiến giao diện, làm giàu tư liệu và nâng tầm không gian học liệu số di sản Thành phố Hồ Chí Minh.
            </p>

            {/* Quality Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1 text-xs text-[#5c4a3a]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffffff] border border-[#ded1be] shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#255e37]" />
                <span>Khảo sát nhanh: ~2 phút</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffffff] border border-[#ded1be] shadow-sm">
                <Heart className="w-4 h-4 text-[#a33827]" />
                <span>Lắng nghe & tiếp thu ý kiến</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffffff] border border-[#ded1be] shadow-sm">
                <Star className="w-4 h-4 text-[#b8863b]" />
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-[#a33827] via-[#ba4a37] to-[#8d2a1b] hover:brightness-105 text-white font-bold text-sm sm:text-base transition-all shadow-xl shadow-[#a33827]/25 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
            >
              <MessageSquareHeart className="w-5 h-5 text-white" />
              <span>Gửi Đóng Góp Ý Kiến Của Bạn</span>
              <ExternalLink className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
});
