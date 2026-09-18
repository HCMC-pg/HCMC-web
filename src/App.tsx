import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import { AmbientSilkLight } from './components/AmbientSilkLight';
import { ScrollProgressBar } from './components/ScrollProgressBar';

// Lazy load modals to optimize initial bundle size and speed up page load
const PlaceDetailModal = React.lazy(() => import('./components/PlaceDetailModal').then(m => ({ default: m.PlaceDetailModal })));
const SearchModal = React.lazy(() => import('./components/SearchModal').then(m => ({ default: m.SearchModal })));

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger for maximum concurrency performance & minimum callback overhead
ScrollTrigger.config({
  limitCallbacks: true,
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
});

const contentData = contentDataRaw as unknown as ContentData;

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);
  const [selectedPlaceCategory, setSelectedPlaceCategory] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

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

  // Smooth scroll handler
  const handleNavigateSlide = useCallback((slideIndex: number) => {
    setCurrentSlide(prev => (prev === slideIndex ? prev : slideIndex));
    if (slideIndex === 7) {
      window.dispatchEvent(new CustomEvent('activate-web-game'));
    }
    const targetSlide = contentData.slides[slideIndex];
    if (targetSlide) {
      const element = 
        document.getElementById(`slide-${targetSlide.id}`) ||
        (targetSlide.id === 'game' ? document.getElementById('slide-game') : null) ||
        (targetSlide.id === 'game' ? document.getElementById('slide-web-game') : null) ||
        document.querySelectorAll<HTMLElement>('.slide-section')[slideIndex] ||
        null;
      if (element) {
        const yOffset = -75;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, []);

  const handleOpenPlace = useCallback((place: PlaceItem, categoryTitle: string) => {
    setSelectedPlace(place);
    setSelectedPlaceCategory(categoryTitle);
  }, []);

  // GSAP ScrollTrigger setup for magazine slide transitions
  useEffect(() => {
    // Give DOM time to mount
    const timer = setTimeout(() => {
      const slideSections = document.querySelectorAll<HTMLElement>('.slide-section');
      const triggers: ScrollTrigger[] = [];

      slideSections.forEach((section, index) => {
        // Active Slide tracking on scroll with state de-duplication
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => setCurrentSlide(prev => (prev === index ? prev : index)),
          onEnterBack: () => setCurrentSlide(prev => (prev === index ? prev : index)),
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

      {/* Top Global Silk Shimmer Progress Bar (Hardware Accelerated & Zero React Re-render) */}
      <ScrollProgressBar 
        totalSlides={contentData.slides.length} 
        currentSlide={currentSlide} 
      />

      {/* 9 Slides Container */}
      <main className="pt-20 pb-28 space-y-16 lg:space-y-24 relative z-20">
        
        {/* SLIDE 1 (S1): Trang chủ - Hero */}
        <div className="slide-section" id="slide-hero">
          <div className="slide-inner-anim">
            <SlideHero
              slide={contentData.slides[0]}
              projectInfo={contentData.projectInfo}
              onNavigateSlide={handleNavigateSlide}
            />
          </div>
        </div>

        {/* SLIDE 2 (S2): Nhóm 1 - Không gian lịch sử và ký ức đô thị */}
        <div className="slide-section" id="slide-group1">
          <div className="slide-inner-anim">
            <SlideLearningGroup
              slide={contentData.slides[1]}
              onSelectPlace={handleOpenPlace}
              onNextSlide={() => handleNavigateSlide(2)}
            />
          </div>
        </div>

        {/* SLIDE 3 (S3): Nhóm 2 - Không gian kiến trúc và tín ngưỡng */}
        <div className="slide-section" id="slide-group2">
          <div className="slide-inner-anim">
            <SlideLearningGroup
              slide={contentData.slides[2]}
              onSelectPlace={handleOpenPlace}
              onNextSlide={() => handleNavigateSlide(3)}
            />
          </div>
        </div>

        {/* SLIDE 4 (S4): Nhóm 3 - Không gian thương mại và đời sống cộng đồng */}
        <div className="slide-section" id="slide-group3">
          <div className="slide-inner-anim">
            <SlideLearningGroup
              slide={contentData.slides[3]}
              onSelectPlace={handleOpenPlace}
              onNextSlide={() => handleNavigateSlide(4)}
            />
          </div>
        </div>

        {/* SLIDE 5 (S5): Nhóm 4 - Không gian sáng tạo và làng nghề */}
        <div className="slide-section" id="slide-group4">
          <div className="slide-inner-anim">
            <SlideLearningGroup
              slide={contentData.slides[4]}
              onSelectPlace={handleOpenPlace}
              onNextSlide={() => handleNavigateSlide(5)}
            />
          </div>
        </div>

        {/* SLIDE 6 (S6): Nhóm 5 - Không gian biển, sông nước và đô thị hiện đại */}
        <div className="slide-section" id="slide-group5">
          <div className="slide-inner-anim">
            <SlideLearningGroup
              slide={contentData.slides[5]}
              onSelectPlace={handleOpenPlace}
              onNextSlide={() => handleNavigateSlide(6)}
            />
          </div>
        </div>

        {/* SLIDE 7 (S7): Bản đồ số & Không gian Văn hóa Đô thị Mới */}
        <div className="slide-section" id="slide-map">
          <div className="slide-inner-anim">
            <SlideInteractiveMap
              slide={contentData.slides[6]}
              allPlaces={allPlaces}
              onSelectPlace={handleOpenPlace}
            />
          </div>
        </div>

        {/* SLIDE 8: Web Game Trải Nghiệm Sài Gòn Kỳ Bí */}
        <div className="slide-section" id="slide-game">
          <div className="slide-inner-anim">
            <SlideWebGame onNextSlide={() => handleNavigateSlide(8)} />
          </div>
        </div>

        {/* SLIDE 9: Giới thiệu về HCMC CultureHub */}
        <div className="slide-section" id="slide-about">
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
        <React.Suspense fallback={null}>
          <PlaceDetailModal
            place={selectedPlace}
            categoryTitle={selectedPlaceCategory}
            onClose={() => setSelectedPlace(null)}
          />
        </React.Suspense>
      )}

      {isSearchOpen && (
        <React.Suspense fallback={null}>
          <SearchModal
            allPlaces={allPlaces}
            onSelectPlace={handleOpenPlace}
            onNavigateSlide={handleNavigateSlide}
            onClose={() => setIsSearchOpen(false)}
          />
        </React.Suspense>
      )}

    </div>
  );
}

