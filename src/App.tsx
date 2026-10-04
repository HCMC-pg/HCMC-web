import React, { useState, useEffect, useMemo, useCallback } from 'react';

import contentDataRaw from './data/contentData.json';
import { ContentData, PlaceItem } from './types';
import { ArtBookCover } from './components/ArtBookCover';
import { ArtBookNavigation } from './components/ArtBookNavigation';
import { ArtBookSpreadContainer } from './components/ArtBookSpreadContainer';
import { AmbientSilkLight } from './components/AmbientSilkLight';

// Slide Content Components
import { SlideHero } from './components/SlideHero';
import { SlideLearningGroup } from './components/SlideLearningGroup';
import { SlideInteractiveMap } from './components/SlideInteractiveMap';
import { SlideWebGame } from './components/SlideWebGame';
import { SlideAbout } from './components/SlideAbout';

// Lazy load modals for optimal bundle size
const PlaceDetailModal = React.lazy(() => import('./components/PlaceDetailModal').then(m => ({ default: m.PlaceDetailModal })));
const SearchModal = React.lazy(() => import('./components/SearchModal').then(m => ({ default: m.SearchModal })));

const contentData = contentDataRaw as unknown as ContentData;

export default function App() {
  // Book Physical State: Starts closed for the cinematic opening scene
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);
  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const [isTurning, setIsTurning] = useState<boolean>(false);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev'>('next');

  // Interactive Modals State
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);
  const [selectedPlaceCategory, setSelectedPlaceCategory] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Flatten places with their group identity for search and map
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

  // Page Turn Handlers
  const handleNavigateSpread = useCallback((targetIndex: number) => {
    if (targetIndex === currentSpread || targetIndex < 0 || targetIndex >= contentData.slides.length) return;
    const direction = targetIndex > currentSpread ? 'next' : 'prev';
    setTurnDirection(direction);
    setIsTurning(true);

    if (targetIndex === 7) {
      window.dispatchEvent(new CustomEvent('activate-web-game'));
    }

    setTimeout(() => {
      setCurrentSpread(targetIndex);
      setTimeout(() => {
        setIsTurning(false);
      }, 350);
    }, 350);
  }, [currentSpread]);

  const handleNextSpread = useCallback(() => {
    if (currentSpread < contentData.slides.length - 1) {
      handleNavigateSpread(currentSpread + 1);
    }
  }, [currentSpread, handleNavigateSpread]);

  const handlePrevSpread = useCallback(() => {
    if (currentSpread > 0) {
      handleNavigateSpread(currentSpread - 1);
    }
  }, [currentSpread, handleNavigateSpread]);

  const handleOpenPlace = useCallback((place: PlaceItem, categoryTitle: string) => {
    setSelectedPlace(place);
    setSelectedPlaceCategory(categoryTitle);
  }, []);

  // Keyboard navigation: Left/Right Arrow to turn pages, Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInput = activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement;
      
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (!isInput && !selectedPlace && !isSearchOpen && isBookOpen) {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
          e.preventDefault();
          handleNextSpread();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          handlePrevSpread();
        } else if (e.key === 'Home') {
          e.preventDefault();
          handleNavigateSpread(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          handleNavigateSpread(contentData.slides.length - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBookOpen, handleNextSpread, handlePrevSpread, handleNavigateSpread, selectedPlace, isSearchOpen]);

  // Gentle Mouse Wheel / Touch Page Turn Detection
  useEffect(() => {
    let isWheeling = false;

    const handleWheel = (e: WheelEvent) => {
      if (selectedPlace || isSearchOpen || !isBookOpen) return;
      const target = e.target as HTMLElement;
      // Do not turn if user is scrolling inside an internal scrollable box
      if (target.closest('.overflow-y-auto') || target.closest('iframe')) return;

      if (Math.abs(e.deltaY) > 55 && !isWheeling) {
        isWheeling = true;
        if (e.deltaY > 0) {
          handleNextSpread();
        } else {
          handlePrevSpread();
        }
        setTimeout(() => {
          isWheeling = false;
        }, 750);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isBookOpen, handleNextSpread, handlePrevSpread, selectedPlace, isSearchOpen]);

  // Current Slide Data for the active spread
  const activeSlide = contentData.slides[currentSpread] || contentData.slides[0];

  return (
    <div className="min-h-screen artbook-desk text-[#2c2219] selection:bg-[#ecd8af] selection:text-[#20160d] relative overflow-x-hidden flex flex-col justify-between silk-smooth">
      
      {/* 1. Atmospheric Ambient Sunbeam & Living Elements */}
      <AmbientSilkLight />

      {/* 2. Closed Book Opening Scene (When isBookOpen is false) */}
      <ArtBookCover 
        projectInfo={contentData.projectInfo}
        isOpen={isBookOpen}
        onOpenBook={() => setIsBookOpen(true)}
      />

      {/* 3. Silk Ribbon Bookmark Header & Chapter Index Navigation */}
      {isBookOpen && (
        <ArtBookNavigation
          currentSpread={currentSpread}
          slides={contentData.slides}
          onSelectSpread={handleNavigateSpread}
          onOpenSearch={() => setIsSearchOpen(true)}
          onCloseBook={() => setIsBookOpen(false)}
        />
      )}

      {/* 4. Physical 2-Page Art Book Spread Container */}
      {isBookOpen && (
        <main className="flex-1 flex items-center justify-center pt-18 sm:pt-20 pb-8 sm:pb-12 z-20">
          <ArtBookSpreadContainer
            currentSpread={currentSpread}
            totalSpreads={contentData.slides.length}
            currentSlide={activeSlide}
            onNextSpread={handleNextSpread}
            onPrevSpread={handlePrevSpread}
            isTurning={isTurning}
            turnDirection={turnDirection}
          >
            {/* SPREAD 1 (Chương 01): Trang Chủ & Bức Họa Toàn Cảnh */}
            {currentSpread === 0 && (
              <SlideHero
                slide={contentData.slides[0]}
                projectInfo={contentData.projectInfo}
                onNavigateSlide={handleNavigateSpread}
              />
            )}

            {/* SPREAD 2 (Chương 02): Nhóm 1 - Không gian lịch sử và ký ức đô thị */}
            {currentSpread === 1 && (
              <SlideLearningGroup
                slide={contentData.slides[1]}
                onSelectPlace={handleOpenPlace}
                onNextSlide={handleNextSpread}
              />
            )}

            {/* SPREAD 3 (Chương 03): Nhóm 2 - Kiến trúc biểu tượng và không gian tín ngưỡng */}
            {currentSpread === 2 && (
              <SlideLearningGroup
                slide={contentData.slides[2]}
                onSelectPlace={handleOpenPlace}
                onNextSlide={handleNextSpread}
              />
            )}

            {/* SPREAD 4 (Chương 04): Nhóm 3 - Không gian thương mại và đời sống cộng đồng */}
            {currentSpread === 3 && (
              <SlideLearningGroup
                slide={contentData.slides[3]}
                onSelectPlace={handleOpenPlace}
                onNextSlide={handleNextSpread}
              />
            )}

            {/* SPREAD 5 (Chương 05): Nhóm 4 - Không gian sáng tạo và làng nghề */}
            {currentSpread === 4 && (
              <SlideLearningGroup
                slide={contentData.slides[4]}
                onSelectPlace={handleOpenPlace}
                onNextSlide={handleNextSpread}
              />
            )}

            {/* SPREAD 6 (Chương 06): Nhóm 5 - Không gian biển, sông nước và đô thị hiện đại */}
            {currentSpread === 5 && (
              <SlideLearningGroup
                slide={contentData.slides[5]}
                onSelectPlace={handleOpenPlace}
                onNextSlide={handleNextSpread}
              />
            )}

            {/* SPREAD 7 (Chương 07): Bản đồ số & Không gian Văn hóa Đô thị Mới */}
            {currentSpread === 6 && (
              <SlideInteractiveMap
                slide={contentData.slides[6]}
                allPlaces={allPlaces}
                onSelectPlace={handleOpenPlace}
              />
            )}

            {/* SPREAD 8 (Chương 08): Web Game Trải Nghiệm Sài Gòn Kỳ Bí */}
            {currentSpread === 7 && (
              <SlideWebGame onNextSlide={handleNextSpread} />
            )}

            {/* SPREAD 9 (Chương 09): Lời Bạt, Sáng Lập & Sổ Lưu Niệm */}
            {currentSpread === 8 && (
              <SlideAbout
                slide={contentData.slides[8] || contentData.slides[7]}
                projectInfo={contentData.projectInfo}
              />
            )}
          </ArtBookSpreadContainer>
        </main>
      )}

      {/* 5. Colophon & Book Edition Footer on Wooden Desk */}
      {isBookOpen && (
        <footer className="border-t border-[#423022] bg-[#1a120b]/90 py-5 px-4 sm:px-8 text-xs text-[#a88d74] relative z-20 select-none">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="font-serif-display font-bold text-[#d4a34b] tracking-wider">
                HCMC CULTUREHUB • QUYỂN SÁCH DI SẢN SỐ
              </span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline italic">{contentData.projectInfo.slogan}</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="hidden sm:inline">Phím ← → lật trang</span>
              <span>Liên hệ: <a href={`mailto:${contentData.projectInfo.contactEmail}`} className="text-[#d4a34b] hover:underline">{contentData.projectInfo.contactEmail}</a></span>
            </div>
          </div>
        </footer>
      )}

      {/* 6. Archival Modals */}
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
            onNavigateSlide={handleNavigateSpread}
            onClose={() => setIsSearchOpen(false)}
          />
        </React.Suspense>
      )}

    </div>
  );
}
