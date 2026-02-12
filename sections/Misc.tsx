import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Misc: React.FC = () => {
  const navigate = useNavigate();
  const [camTilt, setCamTilt] = useState({ x: 0, y: 0 });
  const camRef = useRef<HTMLDivElement>(null);

  const handleCamMove = (e: React.MouseEvent) => {
    if (!camRef.current) return;
    const rect = camRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    setCamTilt({ x: x * 20, y: -y * 20 });
  };

  return (
    <section className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-12">
        
        {/* Digi Cam Component */}
        <div className="flex flex-col items-center gap-8">
          <div 
            ref={camRef}
            onMouseMove={handleCamMove}
            onMouseLeave={() => setCamTilt({ x: 0, y: 0 })}
            onClick={() => navigate('/memories')}
            className="perspective-1000 cursor-pointer group"
          >
            <div 
              style={{
                transform: `rotateX(${camTilt.y}deg) rotateY(${camTilt.x}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
              className="relative w-[340px] h-[220px] bg-zinc-400 rounded-[40px] shadow-2xl flex items-center justify-center border-t-[10px] border-zinc-300"
            >
              <div className="absolute inset-4 border-2 border-zinc-500 rounded-[32px]"></div>
              
              {/* Lens */}
              <div className="relative w-36 h-36 rounded-full bg-zinc-800 border-[10px] border-zinc-600 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
                <div className="w-18 h-18 rounded-full bg-zinc-900 border-2 border-zinc-700 overflow-hidden relative">
                   {/* Lens Reflection */}
                  <div className="absolute top-2 left-2 w-6 h-6 bg-white/10 rounded-full blur-[1px]"></div>
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-blue-500/20 rounded-full blur-[2px]"></div>
                </div>
              </div>

              {/* Flash/Viewfinder area */}
              <div className="absolute top-6 right-10 w-14 h-8 bg-zinc-200 rounded-md flex items-center justify-center overflow-hidden border border-zinc-300 shadow-inner">
                 <div className="w-10 h-3 bg-white/90 glint-effect rounded-full opacity-60"></div>
              </div>

              {/* Decorative Text */}
              <div className="absolute bottom-8 right-12 pixel-font text-[7px] text-zinc-600 opacity-60 tracking-tighter">
                OPTICAL_ZOOM
              </div>
              
              <div className="absolute bottom-8 left-12 pixel-font text-[9px] text-zinc-700/80">
                K-CAM 2K
              </div>
            </div>
          </div>
          <span className="pixel-font text-[10px] text-zinc-400 uppercase tracking-[0.5em] mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
            [ENTER_DIGITAL_ARCHIVE]
          </span>
        </div>

      </div>

      <p className="mt-24 text-zinc-300 font-mono text-[10px] uppercase tracking-[0.8em] animate-pulse">
        Interact with the device
      </p>
    </section>
  );
};

export default Misc;
