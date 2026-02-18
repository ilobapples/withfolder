import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECTS } from './constants';

const WorkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);
  const [pdfLoading, setPdfLoading] = useState(true);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f6f2]">
        <div className="text-center">
          <h1 className="text-4xl mb-4 font-light text-zinc-400 italic uppercase">FILE_NOT_FOUND</h1>
          <button onClick={() => navigate('/work')} className="text-zinc-500 underline uppercase tracking-widest text-xs">
            [BACK_TO_ARCHIVES]
          </button>
        </div>
      </div>
    );
  }

  const getPdfEmbedUrl = (url: string) => {
    if (!url) return '';
    const connector = url.includes('?') ? '&' : '?';
    return `${url}${connector}rm=minimal`;
  };

  return (
    <div className="min-h-screen bg-[#f1efe7] selection:bg-zinc-200">
      {/* Absolute Exit Button - High z-index to be above Navbar */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[2000]">
        <button 
          onClick={() => navigate('/work')}
          className="bg-white/90 border border-zinc-200 text-zinc-500 px-8 py-2 rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-900 hover:text-white transition-all shadow-sm backdrop-blur-md active:scale-95"
        >
          [CLOSE_FILE]
        </button>
      </div>

      <div className="max-w-[1200px] mx-auto pt-32 pb-40 px-6">
        {/* Header Section */}
        <header className="mb-24 flex flex-col items-center text-center">
          <div className="mb-4 inline-block px-3 py-1 border border-zinc-300 rounded-sm text-[10px] uppercase text-zinc-400 tracking-widest">
            {project.category} // {project.year}
          </div>
          <h1 className="text-5xl md:text-7xl font-light mb-6 text-zinc-900 leading-tight">
            {project.title}
          </h1>
          <div className="w-12 h-[1px] bg-zinc-300 mb-8"></div>
          <p className="max-w-2xl text-zinc-500 text-lg leading-relaxed italic">
            {project.description}
          </p>
        </header>

        {/* Process & Scrapbook Section */}
        {project.processImages ? (
          <div className="space-y-40">
            {/* The Main Narrative Story Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
              <div className="space-y-8">
                <h2 className="text-3xl font-light underline decoration-zinc-200 underline-offset-8">The Concept</h2>
                <div className="prose prose-zinc max-w-none">
                  <p className="text-zinc-600 text-lg leading-relaxed">
                    {project.fullContent}
                  </p>
                </div>

                {/* Legacy Spotify Player (if any) */}
                {project.spotifyEmbedUrl && (
                  <div className="pt-8">
                    <iframe
                      src={`${project.spotifyEmbedUrl}${project.spotifyEmbedUrl.includes('?') ? '&' : '?'}autoplay=0`}
                      width="100%"
                      height="80"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="rounded-lg grayscale opacity-50"
                    ></iframe>
                  </div>
                )}
              </div>
              
              {/* Primary Visual */}
              <div className="relative group sticky top-32">
                <div className="bg-white p-4 shadow-2xl border border-zinc-200 rotate-2 group-hover:rotate-0 transition-transform duration-700">
                   <img src={project.imageUrl} alt={project.title} className="w-full h-auto grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                   <div className="mt-4 text-[10px] text-zinc-400 uppercase tracking-widest text-center">Final_Execution_Plate_01</div>
                </div>
                {/* Adhesive Tape */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-10 bg-white/40 backdrop-blur-sm border border-white/50 -rotate-3 z-10 shadow-sm"></div>
              </div>
            </div>

            {/* Staggered Process Timeline */}
            <div className="space-y-32">
              <div className="flex items-center gap-4 opacity-30 justify-center">
                 <div className="h-[1px] w-20 bg-zinc-900"></div>
                 <span className="text-[10px] uppercase tracking-[0.5em]">Process_Log</span>
                 <div className="h-[1px] w-20 bg-zinc-900"></div>
              </div>

              {project.processImages.map((pImg, pIdx) => (
                <div 
                  key={pIdx} 
                  className={`flex flex-col ${pIdx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
                >
                  <div className="flex-1 w-full max-w-lg">
                    <div className={`bg-white p-3 shadow-xl border border-zinc-100 ${pIdx % 2 === 0 ? '-rotate-1' : 'rotate-1'} hover:rotate-0 transition-transform duration-500`}>
                       <img src={pImg.url} alt={pImg.label} className="w-full h-auto" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-4">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-[0.4em]">Step_0{pIdx + 1}</span>
                    <h3 className="text-2xl font-light">{pImg.label}</h3>
                    <div className="h-[1px] w-12 bg-zinc-200 mx-auto md:mx-0"></div>
                    <p className="text-zinc-500 italic text-sm">Documentation and aesthetic reflection of the design phase.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Fallback for other projects */
          <div className="flex flex-col items-center">
            {project.pdfUrl ? (
              <div className="w-full space-y-16 flex flex-col items-center">
                <div className="relative w-full h-[80vh] bg-white shadow-2xl rounded-sm overflow-hidden border border-zinc-200">
                  {pdfLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50 z-20">
                      <div className="w-8 h-8 border-2 border-zinc-200 border-t-zinc-800 rounded-full animate-spin mb-4"></div>
                      <p className="text-[10px] uppercase tracking-widest text-zinc-400">Loading Artifact...</p>
                    </div>
                  )}
                  <iframe
                    src={getPdfEmbedUrl(project.pdfUrl)} 
                    className="w-full h-full border-0 relative z-10"
                    onLoad={() => setPdfLoading(false)}
                  ></iframe>
                </div>
                <div className="prose prose-zinc text-center max-w-2xl">
                   <p className="text-zinc-600 leading-relaxed text-lg">{project.fullContent}</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-12">
                    <img src={project.imageUrl} className="w-full shadow-2xl p-4 bg-white border border-zinc-100 rotate-1" alt={project.title} />
                 </div>
                 <div className="space-y-6">
                    <h2 className="text-3xl font-light underline decoration-zinc-100 underline-offset-8">Project Details</h2>
                    <p className="text-zinc-600 leading-relaxed text-lg">{project.fullContent}</p>
                 </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Navigation */}
        <footer className="mt-60 pt-20 border-t border-zinc-200 flex flex-col items-center gap-12">
           <button 
              onClick={() => navigate('/work')}
              className="group flex flex-col items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all transform group-hover:-translate-y-2">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-[0.8em] text-zinc-300 group-hover:text-zinc-900 transition-colors">Return_Archive</span>
            </button>
            <div className="flex gap-1">
               {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-1 bg-zinc-200 rounded-full"></div>)}
            </div>
        </footer>
      </div>
    </div>
  );
};

export default WorkDetail;