import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const NoteButton: React.FC<{ 
  label: string; 
  onClick: () => void; 
  onMouseEnter?: () => void; 
  onMouseLeave?: () => void; 
  rotation: number;
  hoverGif?: string;
}> = ({ label, onClick, onMouseEnter, onMouseLeave, rotation, hoverGif }) => {
  return (
    <div 
      className="relative transition-transform duration-300 hover:z-10 w-full sm:w-auto"
      style={{ 
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Tape Element */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/40 backdrop-blur-sm border border-white/50 -rotate-2 z-20 shadow-sm pointer-events-none"></div>
      
      <button 
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="group relative bg-white border border-zinc-200 px-6 py-4 text-xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:scale-105 active:scale-95 w-full min-w-[140px] md:min-w-[180px]"
      >
        <span className="relative z-10">{label}</span>
        
        {/* Button-internal Hover GIF effect */}
        {hoverGif && (
          <span 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-center bg-contain bg-no-repeat z-0" 
            style={{ backgroundImage: `url('${hoverGif}')` }}
          ></span>
        )}
      </button>
    </div>
  );
};

const Home: React.FC = () => {
  const [maskStyle, setMaskStyle] = useState<React.CSSProperties>({
    maskImage: 'radial-gradient(circle 0px at 0 0, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(circle 0px at 0 0, transparent 100%)'
  });
  const [showFullColor, setShowFullColor] = useState(false);
  const [showContactBubble, setShowContactBubble] = useState(false);
  const [hoverOverlay, setHoverOverlay] = useState<string | null>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!portraitRef.current || showFullColor) return;
    
    const rect = portraitRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const mask = `radial-gradient(circle 100px at ${x}px ${y}px, black 100%, transparent 100%)`;
    setMaskStyle({
      maskImage: mask,
      WebkitMaskImage: mask
    });
  };

  const handleMouseLeavePortrait = () => {
    if (showFullColor) return;
    setMaskStyle({
      maskImage: 'radial-gradient(circle 0px at 0 0, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(circle 0px at 0 0, transparent 100%)'
    });
  };

  return (
    <section className="min-h-screen flex flex-col bg-[#fafafa] overflow-x-hidden relative">
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 md:px-12 lg:px-20 pt-24 lg:pt-0 pb-12 lg:pb-0">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content Column (Title + Buttons) */}
          <div className="order-2 lg:order-1 flex flex-col items-center justify-center transition-transform duration-500">
            <div className="flex flex-col items-center gap-10 md:gap-14 w-full">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-center leading-tight font-normal text-zinc-800 relative">
                Hi, I’m <a 
                  href="mailto:kimoiaiscool@gmail.com"
                  onMouseEnter={() => setShowContactBubble(true)}
                  onMouseLeave={() => setShowContactBubble(false)}
                  className="relative inline-block group underline decoration-zinc-200 underline-offset-8 transition-all hover:decoration-zinc-400"
                >
                  Kimaya
                  {/* Floating Contact Bubble */}
                  <div 
                    className={`absolute -top-14 left-1/2 -translate-x-1/2 px-4 py-2 bg-zinc-900 text-white text-[10px] uppercase tracking-widest rounded-full whitespace-nowrap transition-all duration-300 pointer-events-none z-50 ${
                      showContactBubble ? 'opacity-100 -translate-y-2' : 'opacity-0 translate-y-0'
                    }`}
                  >
                    Contact Me
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 rotate-45"></div>
                  </div>
                </a>
              </h1>

              <div className="flex flex-col items-center gap-8 md:gap-10 w-full max-w-3xl">
                {/* Row 1: Three Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
                  <NoteButton 
                    label="About" 
                    onClick={() => navigate('/about')} 
                    rotation={-2} 
                  />
                  <NoteButton 
                    label="Work" 
                    onClick={() => navigate('/work')} 
                    onMouseEnter={() => setHoverOverlay('https://lh3.googleusercontent.com/d/1GSERv4DxeBrqZWdNsAQQD9fMisuofGuD')}
                    onMouseLeave={() => setHoverOverlay(null)}
                    rotation={1.5} 
                  />
                  <NoteButton 
                    label="Misc" 
                    onClick={() => navigate('/misc')} 
                    onMouseEnter={() => setShowFullColor(true)}
                    onMouseLeave={() => setShowFullColor(false)}
                    rotation={-1} 
                  />
                </div>

                {/* Row 2: Two Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
                  <NoteButton 
                    label="Archive" 
                    onClick={() => navigate('/archive')} 
                    onMouseEnter={() => setHoverOverlay('https://lh3.googleusercontent.com/d/1XGBI_qrfVuVB27sIfzfjrbek3E4PA8qw')}
                    onMouseLeave={() => setHoverOverlay(null)}
                    rotation={3} 
                  />
                  <NoteButton 
                    label="Flappy Bird" 
                    onClick={() => navigate('/flappy')} 
                    onMouseEnter={() => setHoverOverlay('https://lh3.googleusercontent.com/d/1o3VpRSKv0NfbYeyiWQZE3ssHio6wET7D')}
                    onMouseLeave={() => setHoverOverlay(null)}
                    rotation={-2.5} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Portrait Column */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div 
              ref={portraitRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeavePortrait}
              className="relative w-full max-w-[320px] md:max-w-[420px] lg:max-w-[480px]"
            >
              {/* B&W Base */}
              <img 
                src="https://lh3.googleusercontent.com/d/1JMf65qzboiConA9Q4NaSjNFVXFulsO_S" 
                alt="Kimaya B&W" 
                className="w-full h-auto block grayscale opacity-80"
              />
              
              {/* Flashlight Masked Color Layer */}
              <img 
                src="https://lh3.googleusercontent.com/d/1JljDRp5aWsczpDSRaZlU9zRvwZw9rPd9" 
                alt="Kimaya Color" 
                style={showFullColor ? { maskImage: 'none', WebkitMaskImage: 'none', opacity: 1 } : { ...maskStyle, opacity: 1 }}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none"
              />

              {/* Dynamic Overlay Layer (GIFs for Work, Archive, Flappy Bird) */}
              <div 
                className={`absolute inset-0 w-full h-full transition-opacity duration-300 pointer-events-none ${hoverOverlay ? 'opacity-100' : 'opacity-0'}`}
              >
                {hoverOverlay && (
                  <img 
                    src={hoverOverlay} 
                    alt="Portrait Overlay" 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links Footer */}
      <footer className="w-full lg:fixed lg:bottom-10 lg:left-0 lg:right-0 px-8 md:px-20 py-12 lg:py-0 pointer-events-none z-[100]">
        <div className="container mx-auto">
          {/* Mirrors the main grid structure to ensure column 1 alignment, centered */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 transition-transform duration-500">
            <div className="flex justify-center pointer-events-auto">
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 xl:gap-10">
                <a 
                  href="https://www.behance.net/kimayarajesh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 hover:text-zinc-900 transition-colors py-2"
                >
                  Behance
                </a>
                <div className="hidden sm:block w-1 h-1 bg-zinc-200 rounded-full"></div>
                <a 
                  href="https://www.instagram.com/kimoiaaaa/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 hover:text-zinc-900 transition-colors py-2"
                >
                  Instagram
                </a>
                <div className="hidden sm:block w-1 h-1 bg-zinc-200 rounded-full"></div>
                <a 
                  href="https://www.linkedin.com/in/kimayarajesh/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 hover:text-zinc-900 transition-colors py-2"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Home;