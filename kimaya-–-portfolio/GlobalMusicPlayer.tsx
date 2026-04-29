import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PROJECTS } from './constants';

const DEFAULT_SOUNDTRACK = "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM3M"; // Artist's Main Vibe
const FLAPPY_SOUNDTRACK = "https://open.spotify.com/embed/playlist/37i9dQZF1DX0hxeDs36cs3"; // Artist's Gaming Vibe

const GlobalMusicPlayer: React.FC = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentUri, setCurrentUri] = useState(DEFAULT_SOUNDTRACK);
  const [activeContext, setActiveContext] = useState('Atmosphere');

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    
    // Work Detail Context
    if (pathParts[1] === 'work' && pathParts[2]) {
      const project = PROJECTS.find(p => p.id === pathParts[2]);
      if (project?.spotifyEmbedUrl) {
        setCurrentUri(project.spotifyEmbedUrl);
        setActiveContext(`Curated for: ${project.title}`);
        return;
      }
    }

    // Gaming Context
    if (location.pathname === '/flappy') {
      setCurrentUri(FLAPPY_SOUNDTRACK);
      setActiveContext('Gaming Session');
      return;
    }

    // Default Artist Vibe
    setCurrentUri(DEFAULT_SOUNDTRACK);
    setActiveContext('Artist Vibe');
  }, [location.pathname]);

  return (
    <div className="fixed bottom-6 right-6 z-[3000] flex flex-col items-end gap-3">
      {/* Expanded Soundtrack Hub */}
      {isExpanded && (
        <div className="bg-white/95 backdrop-blur-xl border border-zinc-200 rounded-2xl shadow-2xl p-4 w-[340px] animate-in slide-in-from-bottom-4 duration-500 ease-out">
          <div className="flex justify-between items-center mb-3 px-1">
            <div className="flex flex-col">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Soundtrack</h3>
              <span className="text-[11px] font-medium text-zinc-900">{activeContext}</span>
            </div>
            <button 
              onClick={() => setIsExpanded(false)}
              className="text-zinc-400 hover:text-zinc-900 transition-colors p-1"
            >
              ✕
            </button>
          </div>

          <div className="rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 mb-2 h-[80px]">
            <iframe
              src={currentUri}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="block"
            ></iframe>
          </div>
          
          <div className="px-1 flex justify-between items-center">
            <p className="text-[9px] text-zinc-400 italic">Curated by Kimaya</p>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Music Toggle */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 transform active:scale-95 group ${
          isExpanded ? 'bg-zinc-900 text-white rotate-90 scale-110' : 'bg-white text-zinc-900 hover:scale-110'
        }`}
      >
        {isExpanded ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-6 h-6 group-hover:text-green-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.31c-.216.356-.677.472-1.033.256-2.87-1.752-6.485-2.15-10.74-1.175-.407.094-.813-.16-.906-.566-.094-.407.16-.813.566-.906 4.654-1.066 8.653-.615 11.857 1.34.356.216.472.677.256 1.033zm1.467-3.258c-.272.44-.847.58-1.287.308-3.284-2.016-8.29-2.603-12.176-1.423-.496.15-1.02-.13-1.17-.627-.15-.497.13-1.022.627-1.172 4.437-1.347 9.945-.69 13.718 1.626.44.27.58.846.308 1.288zm.126-3.41c-3.94-2.34-10.45-2.556-14.232-1.41-.605.184-1.24-.16-1.425-.766-.184-.604.16-1.238.765-1.423 4.34-1.317 11.53-1.063 16.057 1.623.544.323.722 1.024.4 1.568-.324.545-1.025.722-1.565.402z"/>
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default GlobalMusicPlayer;