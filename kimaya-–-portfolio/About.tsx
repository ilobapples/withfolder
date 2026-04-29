import React from 'react';

const About: React.FC = () => {
  return (
    <section className="min-h-screen bg-white flex flex-col lg:flex-row items-stretch overflow-hidden">
      {/* Content Column */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 lg:pl-24 xl:pl-40 py-20 lg:py-0">
        <div className="max-w-xl w-full space-y-8">
          <h2 className="text-5xl font-light border-b border-zinc-100 pb-6">About Me</h2>
          <div className="space-y-6 text-xl text-zinc-600 leading-relaxed font-light">
            <p>
              Hi, I'm Kimaya, a second-year visual communication student at UID from Trivandrum. I specialize in illustration and am currently exploring 2D animation and motion graphics. I'm a serial hobbyist who loves music and doggos the most :3. My favourite drink is water, I LOVE trying new instant noodle flavours, and if you ever cant find me for too long I'll be curled up in my bed reading a book or watching something on Youtube.
            </p>
            <p>
              If you're looking for someone who is creative, detail oriented, works well in a team, and learns new skills really fast—then you've come to the right place, my friend!
            </p>
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