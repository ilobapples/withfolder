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
      className="relative transition-transform duration-300 hover:z-10"
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
        
        {/* Hover GIF effect */}
        {hoverGif && (
          <span className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-center bg-contain bg-no-repeat z-0`} style={{ backgroundImage: `url('${hoverGif}')` }}></span>
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
  const portraitRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!portraitRef.current || showFullColor) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const mask = `radial-gradient(circle 80px at ${x}px ${y}px, black 100%, transparent 100%)`;
    setMaskStyle({
      maskImage: mask,
      WebkitMaskImage: mask
    });
  };

  const handleMouseLeave = () => {
    if (showFullColor) return;
    setMaskStyle({
      maskImage: 'radial-gradient(circle 0px at 0 0, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(circle 0px at 0 0, transparent 100%)'
    });
  };

  return (
    <section className="min-h-screen flex items-center bg-[#fafafa] px-8 md:px-20 overflow-hidden relative">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Content Column */}
        <div className="order-2 lg:order-1 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-10">
            <h1 className="text-4xl md:text-6xl text-center leading-tight font-normal text-zinc-800">
              Hi, I’m Kimaya
            </h1>

            <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
              {/* Row 1: 3 buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                <NoteButton 
                  label="About" 
                  onClick={() => navigate('/about')} 
                  rotation={-2} 
                  hoverGif="spectacles-glint.gif"
                />
                <NoteButton 
                  label="Work" 
                  onClick={() => navigate('/work')} 
                  rotation={1.5} 
                  hoverGif="anxiety-lines.gif"
                />
                <NoteButton 
                  label="Archive" 
                  onClick={() => navigate('/archive')} 
                  onMouseEnter={() => setShowFullColor(true)}
                  onMouseLeave={() => setShowFullColor(false)}
                  rotation={-1} 
                />
              </div>

              {/* Row 2: 2 buttons */}
              <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto sm:justify-center">
                <div className="w-full sm:w-[180px]">
                  <NoteButton 
                    label="Misc" 
                    onClick={() => navigate('/misc')} 
                    rotation={3} 
                  />
                </div>
                <div className="w-full sm:w-[180px]">
                  <NoteButton 
                    label="Flappy Bird" 
                    onClick={() => navigate('/flappy')} 
                    rotation={-2.5} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portrait Column */}
        <div className="order-1 lg:order-2 flex justify-center">
          <div 
            ref={portraitRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-hide-cursor="true"
            className="relative w-full max-w-[480px]"
          >
            <img 
              src="https://lh3.googleusercontent.com/d/1JMf65qzboiConA9Q4NaSjNFVXFulsO_S" 
              alt="Kimaya B&W" 
              className="w-full h-auto block grayscale opacity-80"
            />
            <img 
              src="https://lh3.googleusercontent.com/d/1JljDRp5aWsczpDSRaZlU9zRvwZw9rPd9" 
              alt="Kimaya Color" 
              style={showFullColor ? { maskImage: 'none', WebkitMaskImage: 'none' } : maskStyle}
              className="absolute inset-0 w-full h-full object-cover transition-[mask-image] duration-300 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Social Links Footer - Fixed to bottom and aligned vertically with the name and button column */}
      <footer className="fixed bottom-10 left-0 right-0 px-8 md:px-20 pointer-events-none z-[100]">
        <div className="container mx-auto">
          {/* Mirrors the main grid to ensure horizontal alignment with the name column */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex justify-center pointer-events-auto">
              <div className="flex items-center gap-6 md:gap-10">
                <a 
                  href="https://www.behance.net/kimayarajesh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  Behance
                </a>
                <div className="w-1 h-1 bg-zinc-200 rounded-full"></div>
                <a 
                  href="https://www.instagram.com/kimoiaaaa/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  Instagram
                </a>
                <div className="w-1 h-1 bg-zinc-200 rounded-full"></div>
                <a 
                  href="https://www.linkedin.com/in/kimayarajesh/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            {/* Empty column on desktop to offset and stay below name */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Home;