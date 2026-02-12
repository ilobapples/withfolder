import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Home from './sections/Home';
import About from './sections/About';
import Work from './sections/Work';
import WorkDetail from './sections/WorkDetail';
import Misc from './sections/Misc';
import Memories from './sections/Memories';
import Archive from './sections/Archive';
import Flappy from './sections/Flappy';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if it's a clickable element
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' ||
        !!target.closest('button') ||
        !!target.closest('a')
      );

      // Check if we should hide the star (e.g., over the home portrait)
      setIsHidden(!!target.closest('[data-hide-cursor="true"]'));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className={`fixed pointer-events-none z-[9999] transition-all duration-200 ease-out ${isHidden ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${isHidden ? 0 : (isPointer ? 1.5 : 1)})`,
        mixBlendMode: 'difference'
      }}
    >
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 24 24" 
        fill="white" 
        className="drop-shadow-sm"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </div>
  );
};

const HomeButton: React.FC = () => {
  const location = useLocation();
  const isInverted = location.pathname === '/flappy' || location.pathname === '/memories';

  // Hand-drawn home icons provided by the user
  const homeBlackIcon = "https://lh3.googleusercontent.com/d/1D7_94ZwJFVtnJzF6Qg9WvWGn0UazKz07";
  const homeWhiteIcon = "https://lh3.googleusercontent.com/d/18xCKeKUBwJB1PDGb28D6RhnJUNghxCLu";

  return (
    <Link 
      to="/" 
      className="fixed top-[30px] left-[30px] z-[1000] transition-transform hover:scale-105 active:scale-95"
    >
      <img 
        src={isInverted ? homeWhiteIcon : homeBlackIcon} 
        alt="Home" 
        className="w-[60px] block" 
      />
    </Link>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
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
        <HomeButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:id" element={<WorkDetail />} />
          <Route path="/misc" element={<Misc />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/flappy" element={<Flappy />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;