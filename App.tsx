import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Work from './Work';
import WorkDetail from './WorkDetail';
import Misc from './Misc';
import Memories from './Memories';
import Archive from './Archive';
import Flappy from './Flappy';
import Sketchbook from './sections/Sketchbook';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || window.innerWidth < 1024) return;

    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (!target) return;

      const computedCursor = window.getComputedStyle(target).cursor;
      setIsPointer(
        computedCursor === 'pointer' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' ||
        !!target.closest('button') ||
        !!target.closest('a')
      );
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed pointer-events-none hidden lg:block z-[99999]"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${isPointer ? 2.2 : 1})`,
        transition: 'transform 0.15s ease-out',
        mixBlendMode: 'difference',
        willChange: 'transform, left, top'
      }}
    >
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 24 24" 
        fill="white"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isInverted = location.pathname === '/flappy' || location.pathname === '/memories' || location.pathname === '/sketchbook';

  const homeBlackIcon = "https://lh3.googleusercontent.com/d/1D7_94ZwJFVtnJzF6Qg9WvWGn0UazKz07";
  const homeWhiteIcon = "https://lh3.googleusercontent.com/d/18xCKeKUBwJB1PDGb28D6RhnJUNghxCLu";

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Work', path: '/work' },
    { name: 'Archive', path: '/archive' },
    { name: 'Misc', path: '/misc' },
    { name: 'Flappy Bird', path: '/flappy' },
    { name: 'Contact Me', path: 'mailto:kimoiaiscool@gmail.com', isExternal: true },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div className="fixed top-[20px] md:top-[30px] left-[20px] md:left-[30px] right-[20px] md:right-[30px] flex justify-between items-center z-[1000]">
        <Link to="/" className="transition-transform hover:scale-105 active:scale-95">
          <img 
            src={isInverted ? homeWhiteIcon : homeBlackIcon} 
            alt="Home" 
            className="w-[45px] md:w-[60px] block" 
          />
        </Link>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg border transition-all ${
            isInverted ? 'border-white/20 text-white' : 'border-black/10 text-black'
          } bg-white/10 backdrop-blur-md`}
          aria-label="Toggle Menu"
        >
          <div className={`w-6 h-0.5 transition-all ${isInverted ? 'bg-white' : 'bg-black'} ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 transition-all ${isInverted ? 'bg-white' : 'bg-black'} ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 transition-all ${isInverted ? 'bg-white' : 'bg-black'} ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </div>

      <div className={`fixed inset-0 z-[900] lg:hidden bg-[#fafafa]/98 backdrop-blur-xl transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
          <div className="text-[10px] uppercase tracking-[1em] text-zinc-300 mb-6 italic">Navigation_Index</div>
          {navLinks.map((link) => (
            link.isExternal ? (
              <a
                key={link.path}
                href={link.path}
                className="group relative flex flex-col items-center"
              >
                <span className="text-3xl font-light text-zinc-900 group-hover:italic transition-all">
                  {link.name}
                </span>
                <div className="w-0 h-[1px] bg-zinc-900 group-hover:w-full transition-all duration-300 mt-1"></div>
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className="group relative flex flex-col items-center"
              >
                <span className="text-3xl font-light text-zinc-900 group-hover:italic transition-all">
                  {link.name}
                </span>
                <div className="w-0 h-[1px] bg-zinc-900 group-hover:w-full transition-all duration-300 mt-1"></div>
              </Link>
            )
          ))}
          <div className="mt-12 flex gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-200"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 animate-pulse"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-200"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen relative selection:bg-zinc-200">
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:id" element={<WorkDetail />} />
          <Route path="/archive" element={<Misc />} />
          <Route path="/misc" element={<Archive />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/sketchbook" element={<Sketchbook />} />
          <Route path="/flappy" element={<Flappy />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;