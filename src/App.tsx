import React, { useState, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import contentDataRaw from './data/contentData.json';
import { ContentData, PlaceItem, SlideData } from './types';
import { Header } from './components/Header';
import { SlideHero } from './components/SlideHero';
import { SlideLearningGroup } from './components/SlideLearningGroup';
import { SlideInteractiveMap } from './components/SlideInteractiveMap';
import { SlideWebGame } from './components/SlideWebGame';
import { SlideAbout } from './components/SlideAbout';
import { SlideNavigator } from './components/SlideNavigator';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { SearchModal } from './components/SearchModal';
import { AmbientSilkLight } from './components/AmbientSilkLight';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const contentData = contentDataRaw as unknown as ContentData;

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);
  const [selectedPlaceCategory, setSelectedPlaceCategory] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Flatten places with their group identity for global search and map
  const allPlaces = useMemo(() => {
    const list: { place: PlaceItem; groupName: string; groupId: string; slideIndex: number }[] = [];
    contentData.slides.forEach((slide, sIdx) => {
      if (slide.places) {
        slide.places.forEach((p) => {
          list.push({
            place: p,
            groupName: slide.primaryTitle,
            groupId: slide.id,
            slideIndex: sIdx
          });
        });
      }
    });
    return list;
  }, []);

  // Track native window scroll progress (smooth wheel & touch gestures)
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = (window.scrollY / scrollHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, Math.round(progress))));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP ScrollTrigger setup for magazine slide transitions
  useEffect(() => {
    // Give DOM time to mount
    const timer = setTimeout(() => {
      const slideSections = document.querySelectorAll<HTMLElement>('.slide-section');
      const triggers: ScrollTrigger[] = [];

      slideSections.forEach((section, index) => {
        // Active Slide tracking on scroll
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => setCurrentSlide(index),
          onEnterBack: () => setCurrentSlide(index),
        });
        triggers.push(trigger);

        // Smooth magazine reveal animation
        const contentBox = section.querySelector('.slide-inner-anim');
        if (contentBox) {
          gsap.fromTo(
            contentBox,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      return () => {
        triggers.forEach((t) => t.kill());
      };
    }, 150);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Smooth scroll handler
  const handleNavigateSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    const targetSlide = contentData.slides[slideIndex];
    if (targetSlide) {
      const element = document.getElementById(`slide-${targetSlide.id}`);
      if (element) {
        const yOffset = -75;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPlace = (place: PlaceItem, categoryTitle: string) => {
    setSelectedPlace(place);
    setSelectedPlaceCategory(categoryTitle);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-[#f1f5f9] selection:bg-[#c29b38] selection:text-slate-950 relative overflow-x-hidden silk-smooth">
      
      {/* Ambient Silk Mouse Lighting Glow */}
      <AmbientSilkLight />

      {/* Sticky Top Header Navigation */}
      <Header
        currentSlide={currentSlide}
        slides={contentData.slides}
        onSelectSlide={handleNavigateSlide}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Floating Side Dot Navigator */}
      <SlideNavigator
        currentSlide={currentSlide}
        slides={contentData.slides}
        onNavigateSlide={handleNavigateSlide}
      />

      {/* Top Global Silk Shimmer Progress Bar */}
      <div className="fixed top-18 left-0 right-0 h-[3px] bg-slate-900/80 z-30 overflow-hidden backdrop-blur-sm">
        <div 
          className="h-full silk-shimmer-bar transition-all duration-200 shadow-md shadow-[#c29b38]/40"
          style={{ width: `${Math.max(scrollProgress, ((currentSlide + 1) / contentData.slides.length) * 100)}%` }}
        />
      </div>

      {/* 9 Slides Container */}
      <main className="pt-20 pb-28 space-y-16 lg:space-y-24 relative z-20">
        
        {/* SLIDE 1 (S1): Trang chủ - Hero */}
        <div className="slide-section">
          <div className="slide-inner-anim">
            <SlideHero
              slide={contentData.slides[0]}
              projectInfo={contentData.projectInfo}
              onNavigateSlide={handleNavigateSlide}
            />
          </div>
        </div>

        {/* SLIDE 2 (S2): Nhóm 1 - Không gian lịch sử và ký ức đô thị */}
        <div className="slide-section">
          <div className="slide-inner-anim">
            <SlideLearningGroup
              slide={contentData.slides[1]}
              onSelectPlace={handleOpenPlace}
              onNextSlide={() => handleNavigateSlide(2)}
            />
          </div>
        </div>

        {/* SLIDE 3 (S3): Nhóm 2 - Không gian kiến trúc và tín ngưỡng */}
        <div className="slide-section">
          <div className="slide-inner-anim">
            <SlideLearningGroup
              slide={contentData.slides[2]}
              onSelectPlace={handleOpenPlace}
              onNextSlide={() => handleNavigateSlide(3)}
            />
          </div>
        </div>

        {/* SLIDE 4 (S4): Nhóm 3 - Không gian thương mại và đời sống cộng đồng */}
        <div className="slide-section">
          <div className="slide-inner-anim">
            <SlideLearningGroup
              slide={contentData.slides[3]}
              onSelectPlace={handleOpenPlace}
              onNextSlide={() => handleNavigateSlide(4)}
            />
          </div>
        </div>

        {/* SLIDE 5 (S5): Nhóm 4 - Không gian sáng tạo và làng nghề */}
        <div className="slide-section">
          <div className="slide-inner-anim">
            <SlideLearningGroup
              slide={contentData.slides[4]}
              onSelectPlace={handleOpenPlace}
              onNextSlide={() => handleNavigateSlide(5)}
            />
          </div>
        </div>

        {/* SLIDE 6 (S6): Nhóm 5 - Không gian biển, sông nước và đô thị hiện đại */}
        <div className="slide-section">
          <div className="slide-inner-anim">
            <SlideLearningGroup
              slide={contentData.slides[5]}
              onSelectPlace={handleOpenPlace}
              onNextSlide={() => handleNavigateSlide(6)}
            />
          </div>
        </div>

        {/* SLIDE 7 (S7): Bản đồ số & Không gian Văn hóa Đô thị Mới */}
        <div className="slide-section">
          <div className="slide-inner-anim">
            <SlideInteractiveMap
              slide={contentData.slides[6]}
              allPlaces={allPlaces}
              onSelectPlace={handleOpenPlace}
            />
          </div>
        </div>

        {/* SLIDE 8: Web Game Trải Nghiệm Sài Gòn Kỳ Bí */}
        <div className="slide-section">
          <div className="slide-inner-anim">
            <SlideWebGame onNextSlide={() => handleNavigateSlide(8)} />
          </div>
        </div>

        {/* SLIDE 9: Giới thiệu về HCMC CultureHub */}
        <div className="slide-section">
          <div className="slide-inner-anim">
            <SlideAbout
              slide={contentData.slides[8] || contentData.slides[7]}
              projectInfo={contentData.projectInfo}
            />
          </div>
        </div>

      </main>

      {/* Magazine Footer */}
      <footer className="border-t border-white/10 bg-black/80 backdrop-blur-xl py-10 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/60">
            <div className="space-y-1 text-center md:text-left">
              <p className="font-accent font-bold text-[#f5e3a9] tracking-wider text-sm">
                HCMC CULTUREHUB • KHO HỌC LIỆU DI SẢN SỐ
              </p>
              <p className="text-white/60">
                {contentData.projectInfo.slogan}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
              {contentData.slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => handleNavigateSlide(idx)}
                  className="hover:text-[#c29b38] transition-colors"
                >
                  {s.id}
                </button>
              ))}
            </div>

            <div className="text-center md:text-right font-mono text-[11px] text-slate-400">
              Liên hệ: <a href={`mailto:${contentData.projectInfo.contactEmail}`} className="text-[#c29b38] hover:underline font-semibold">{contentData.projectInfo.contactEmail}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedPlace && (
        <PlaceDetailModal
          place={selectedPlace}
          categoryTitle={selectedPlaceCategory}
          onClose={() => setSelectedPlace(null)}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          allPlaces={allPlaces}
          onSelectPlace={handleOpenPlace}
          onNavigateSlide={handleNavigateSlide}
          onClose={() => setIsSearchOpen(false)}
        />
      )}

    </div>
  );
}

