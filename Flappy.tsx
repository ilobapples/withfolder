import React from 'react';

const Flappy: React.FC = () => {
  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h2 className="pixel-font text-white text-xl mb-2 tracking-tighter">FLAPPY_APPLE_PI</h2>
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] italic">coded and designed by me</p>
      </div>
      
      <div className="w-full max-w-5xl aspect-video relative rounded-lg overflow-hidden border-4 border-zinc-900 shadow-2xl">
        <iframe 
          src="https://www.lexaloffle.com/bbs/widget.php?pid=flappyapplepi"
          className="w-full h-full border-0"
          title="Flappy Bird"
        ></iframe>
      </div>
      
      <div className="mt-8 text-zinc-500 pixel-font text-xs tracking-widest flex flex-col items-center gap-2">
        <p className="animate-bounce">PRESS 'UP' ARROW TO FLY</p>
        <p className="text-[10px] opacity-50">SCROLL TO EXIT GAME</p>
      </div>
    </section>
  );
};

export default Flappy;