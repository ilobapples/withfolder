import React from 'react';

const About: React.FC = () => {
  return (
    <section className="min-h-screen bg-white flex flex-col lg:flex-row items-stretch overflow-hidden">
      {/* Content Column */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 lg:pl-24 xl:pl-40 py-20 lg:py-0">
        <div className="max-w-xl w-full space-y-8">
          <h2 className="text-5xl font-light border-b border-zinc-100 pb-6">About Me</h2>
          <div className="space-y-6 text-xl text-zinc-600 leading-relaxed">
            <p>
              I am an artist and illustrator based in a world of rhythm and color. My work explores the intersection of traditional mediums and digital interactive experiences.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <span className="text-2xl">✏️</span>
                <span>Artist & illustrator</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-2xl">🎧</span>
                <span>Music-driven creator</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-2xl">📚</span>
                <span>Loves books & films</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-2xl">🎮</span>
                <span>Experiments with code & games</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Full-width Image Column */}
      <div className="flex-1 h-[60vh] lg:h-screen w-full relative">
        <img 
          src="https://lh3.googleusercontent.com/d/11LXi3NrJRChSFYs20ED7L4KB78K_O18J" 
          alt="Kimaya Smile Sketch" 
          className="w-full h-full object-cover"
        />
        {/* Subtle aesthetic gradient overlay to merge with the content side */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default About;