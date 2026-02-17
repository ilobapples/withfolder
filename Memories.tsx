import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEMORIES, NARRATIVE_STORY } from './constants';

const PhotoModal: React.FC<{ 
  photos: any[]; 
  currentIndex: number; 
  onClose: () => void;
  onNavigate: (index: number) => void;
}> = ({ photos, currentIndex, onClose, onNavigate }) => {
  const photo = photos[currentIndex];
  
  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIdx = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(nextIdx);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIdx = (currentIndex + 1) % photos.length;
    onNavigate(nextIdx);
  }, [currentIndex, photos.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  if (!photo) return null;

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 px-6"
      onClick={onClose}
    >
      {/* Top Controls */}
      <div className="absolute top-8 left-0 right-0 px-8 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <p className="pixel-font text-[8px] text-zinc-500 uppercase tracking-[0.4em]">
             Entry_{String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </p>
        </div>
        <button 
          className="pointer-events-auto flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
          onClick={onClose}
        >
          <span className="pixel-font text-[8px] uppercase tracking-widest">Close_X</span>
        </button>
      </div>

      {/* Navigation Arrows */}
      <button 
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[1002] w-12 h-12 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all"
        onClick={handlePrev}
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[1002] w-12 h-12 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all"
        onClick={handleNext}
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div 
        className="max-w-5xl w-full h-[75vh] md:h-[85vh] flex flex-col items-center justify-center animate-in zoom-in-95 duration-500 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Image Viewport */}
        <div 
          className="relative w-full h-full flex items-center justify-center cursor-pointer group"
          onClick={handleNext}
        >
          <img 
            key={photo.id}
            src={photo.url} 
            alt={photo.caption} 
            className="max-w-full max-h-full object-contain shadow-2xl ring-1 ring-white/10"
          />
          {/* Subtle hint that clicking advances */}
          <div className="absolute inset-y-0 right-0 w-1/4 bg-white/0 group-hover:bg-white/5 transition-colors flex items-center justify-end pr-8 opacity-0 group-hover:opacity-100 hidden md:flex">
             <span className="text-white/20 text-xs tracking-widest uppercase rotate-90 whitespace-nowrap">Next_Image</span>
          </div>
        </div>

        {/* Caption Area */}
        <div className="mt-8 text-center max-w-lg">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
            <p className="pixel-font text-[8px] text-zinc-500 uppercase tracking-[0.4em]">
              {photo.isNarrative ? 'Sequence_Entry' : 'Raw_Archive_Capture'}
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
          </div>
          <p className="text-sm text-zinc-300 italic leading-relaxed">
            {photo.caption}
          </p>
        </div>
      </div>
    </div>
  );
};

const Memories: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Combine story and other memories into one flat list
  const combinedPhotos = [
    ...NARRATIVE_STORY.map(s => ({ ...s, isNarrative: true })),
    ...MEMORIES.map(m => ({ ...m, isNarrative: false }))
  ];

  const handlePhotoClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-zinc-800">
      {currentIndex !== null && (
        <PhotoModal 
          photos={combinedPhotos} 
          currentIndex={currentIndex} 
          onClose={() => setCurrentIndex(null)}
          onNavigate={(idx) => setCurrentIndex(idx)}
        />
      )}

      {/* Absolute Minimal Exit Button */}
      <button 
        onClick={() => navigate('/archive')}
        className="fixed top-8 right-8 z-[100] group flex items-center gap-2 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/50 hover:border-white/20 transition-all active:scale-95"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 group-hover:bg-white animate-pulse"></div>
        <span className="pixel-font text-[8px] text-zinc-500 group-hover:text-white uppercase tracking-widest">Exit_Archive</span>
      </button>

      <div className="max-w-[1400px] mx-auto pt-24 px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center">
          <h2 className="pixel-font text-xs text-zinc-500 uppercase tracking-[0.5em] mb-2 opacity-50">Camera Roll</h2>
          <div className="w-8 h-[1px] bg-zinc-800"></div>
        </div>

        {/* Unified Photo Feed */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {combinedPhotos.map((item, idx) => (
            <div 
              key={item.id} 
              onClick={() => handlePhotoClick(idx)}
              className={`relative overflow-hidden group bg-zinc-900 aspect-square cursor-pointer ${
                item.isNarrative ? 'ring-1 ring-white/10' : ''
              }`}
            >
              <img 
                src={item.url} 
                alt={item.caption} 
                className={`w-full h-full object-cover transition-all duration-700 ${
                  item.isNarrative 
                    ? 'opacity-90 group-hover:opacity-100 group-hover:scale-105' 
                    : 'grayscale-[0.5] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110'
                }`}
              />
              
              {/* Discrete Metadata Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-300">
                   {item.isNarrative ? `SEQ_0${idx + 1}` : `SHOT_ID_${item.id}`}
                </p>
                <p className="text-[10px] text-zinc-500 italic mt-1 truncate">
                  {item.caption}
                </p>
              </div>

              {/* Index indicator for the narrative sequence only */}
              {item.isNarrative && (
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-mono text-white/30 group-hover:text-white/60 transition-colors">
                    0{idx + 1}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Endless Grid Decorative Footer */}
        <div className="mt-20 py-20 flex flex-col items-center gap-6 opacity-10">
          <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent"></div>
          <span className="pixel-font text-[8px] tracking-[2em]">END_OF_ROLL</span>
        </div>
      </div>
    </div>
  );
};

export default Memories;