import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ARCHIVE_PROJECTS, MISC_ARTIFACTS } from './constants';
import { ArchiveAsset } from './types';

interface AssetModalProps {
  assets: ArchiveAsset[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const AssetModal: React.FC<AssetModalProps> = ({ assets, currentIndex, onClose, onNavigate }) => {
  const asset = assets[currentIndex];

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (assets.length <= 1) return;
    onNavigate((currentIndex + 1) % assets.length);
  }, [currentIndex, assets.length, onNavigate]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (assets.length <= 1) return;
    onNavigate((currentIndex - 1 + assets.length) % assets.length);
  }, [currentIndex, assets.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  if (!asset) return null;

  return (
    <div 
      className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 px-6"
      onClick={onClose}
    >
      <button 
        className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors p-4 z-[5002]"
        onClick={onClose}
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation Zones */}
      <div 
        onClick={handlePrev}
        className="absolute left-0 top-0 bottom-0 w-[40%] cursor-w-resize z-[5001] group"
      >
        <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-opacity">
          <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>
      <div 
        onClick={handleNext}
        className="absolute right-0 top-0 bottom-0 w-[40%] cursor-e-resize z-[5001] group"
      >
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-opacity">
          <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <div 
        className={`w-full ${asset.type === 'zine' ? 'max-w-6xl h-[85vh]' : 'max-w-5xl h-[80vh]'} flex flex-col items-center justify-center animate-in zoom-in-95 duration-500 relative z-[5002]`}
        onClick={(e) => e.stopPropagation()}
      >
        {asset.type === 'video' ? (
          <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
            <iframe 
              src={asset.url} 
              className="w-full h-full border-0" 
              allow="autoplay"
              title={asset.label}
            ></iframe>
          </div>
        ) : asset.type === 'zine' ? (
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white">
            <iframe 
              src={asset.url} 
              className="w-full h-full border-0" 
              allowFullScreen
              allow="clipboard-write"
              title={asset.label}
            ></iframe>
          </div>
        ) : (
          <img 
            src={asset.url} 
            alt={asset.label} 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        )}
        <div className="mt-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-2">Artifact_Inspection // {currentIndex + 1} of {assets.length}</p>
          <h4 className="text-xl font-light text-white italic">{asset.label}</h4>
        </div>
      </div>
    </div>
  );
};

const Archive: React.FC = () => {
  const navigate = useNavigate();
  const [activeContext, setActiveContext] = useState<{ assets: ArchiveAsset[], index: number } | null>(null);

  return (
    <section className="min-h-screen bg-[#fcfbf7] selection:bg-zinc-200 py-16 md:py-24 px-6 md:px-12 relative">
      {/* Floating Close Button - Added to ensure exit is possible */}
      <div className="fixed top-8 right-8 z-[2000]">
        <button 
          onClick={() => navigate('/')}
          className="bg-white/90 border border-zinc-200 text-zinc-500 px-6 py-2.5 rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-900 hover:text-white transition-all shadow-sm backdrop-blur-md active:scale-95"
        >
          Close_Archive
        </button>
      </div>

      {activeContext && (
        <AssetModal 
          assets={activeContext.assets} 
          currentIndex={activeContext.index} 
          onClose={() => setActiveContext(null)} 
          onNavigate={(idx) => setActiveContext({ ...activeContext, index: idx })}
        />
      )}
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col items-center">
          <div className="px-4 py-1 border border-zinc-200 rounded-sm mb-4">
             <span className="text-[10px] uppercase tracking-[0.6em] text-zinc-400">Archive_Artifacts_V.01</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-light text-zinc-900 mb-4 italic text-center">Miscellaneous Log</h2>
          <div className="w-16 h-[1px] bg-zinc-200"></div>
        </header>

        {/* Structured Archive Projects */}
        <div className="space-y-12 mb-16">
          {ARCHIVE_PROJECTS.map((proj) => (
            <div key={proj.id} className="bg-white/40 border border-zinc-100 p-8 md:p-12 rounded-3xl backdrop-blur-sm shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8 pb-8 border-b border-zinc-100">
                <div className="max-w-xl">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400">File_Ref_{proj.id}</span>
                  </div>
                  <h3 className="text-4xl font-light mb-4 text-zinc-800">{proj.title}</h3>
                  <p className="text-zinc-500 italic text-sm">{proj.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <div className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-300">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                     </svg>
                   </div>
                   <span className="text-[8px] uppercase tracking-[0.4em] text-zinc-300">Package_Accessible</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                {proj.assets.map((asset, aIdx) => (
                  <div 
                    key={aIdx} 
                    className="group relative cursor-pointer"
                    onClick={() => setActiveContext({ assets: proj.assets, index: aIdx })}
                  >
                    <div className="bg-white p-3 shadow-lg border border-zinc-100 rounded-sm transform transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
                      {asset.type === 'video' ? (
                        <div className="aspect-[4/5] bg-zinc-900 rounded-sm overflow-hidden relative">
                           <div className="absolute inset-0 z-10 bg-zinc-900/40 mix-blend-color grayscale transition-opacity group-hover:opacity-0 pointer-events-none"></div>
                           <iframe src={asset.url} className="w-full h-full pointer-events-none scale-[1.3]" frameBorder="0" allow="autoplay" />
                           <div className="absolute inset-0 bg-black/5 pointer-events-none z-20"></div>
                        </div>
                      ) : asset.type === 'zine' ? (
                        <div className="aspect-[4/5] bg-[#efefef] rounded-sm overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                           {asset.thumbnailUrl ? (
                             <img src={asset.thumbnailUrl} alt={asset.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                           ) : (
                             <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-zinc-200">
                               <svg className="w-16 h-16 text-zinc-300 mb-6 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                               </svg>
                             </div>
                           )}
                           <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-[2px]">
                              <span className="pixel-font text-[9px] text-white uppercase tracking-widest mb-2">Interactive</span>
                              <span className="text-xl font-light italic text-white">Open Flipbook</span>
                           </div>
                        </div>
                      ) : (
                        <div className="aspect-[4/5] bg-zinc-50 rounded-sm overflow-hidden">
                          <img src={asset.url} alt={asset.label} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                        </div>
                      )}
                      <div className="mt-3 flex justify-between items-center border-t border-zinc-50 pt-2">
                         <span className="text-[9px] uppercase tracking-widest text-zinc-400">{asset.label}</span>
                         <span className="text-[8px] text-zinc-300 font-mono">0{aIdx + 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Loose Sketches Masonry Grid */}
        <div className="pt-12 border-t border-zinc-100">
          <div className="flex items-center gap-4 mb-10 opacity-30">
             <div className="h-[1px] w-12 bg-zinc-900"></div>
             <h4 className="text-[10px] uppercase tracking-[0.8em] whitespace-nowrap">Primary_Artifact_Feed</h4>
             <div className="h-[1px] flex-1 bg-zinc-900"></div>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {MISC_ARTIFACTS.map((sketch) => (
              <div 
                key={sketch.id} 
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setActiveContext({ assets: [{ type: 'image', url: sketch.url, label: sketch.title }], index: 0 })}
              >
                <div className="bg-white p-2 shadow-sm border border-zinc-100 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                  <img src={sketch.url} alt={sketch.title} className="w-full rounded-sm grayscale-[0.2] group-hover:grayscale-0 transition-all" />
                  <div className="mt-2 text-[9px] text-zinc-400 uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {sketch.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-24 py-16 flex flex-col items-center opacity-10">
           <div className="w-[1px] h-24 bg-gradient-to-b from-zinc-900 to-transparent"></div>
           <span className="text-[10px] tracking-[2em] mt-8 uppercase">End_Of_Archive</span>
        </footer>
      </div>
      <style>{`
        .perspective-2000 { perspective: 2000px; }
      `}</style>
    </section>
  );
};

export default Archive;