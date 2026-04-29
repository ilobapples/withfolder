import React from 'react';

const Sketchbook: React.FC = () => {
  const sketches = [
    { id: 1, title: 'Portrait B&W', url: 'https://lh3.googleusercontent.com/d/1JMf65qzboiConA9Q4NaSjNFVXFulsO_S' },
    { id: 2, title: 'Portrait Color', url: 'https://lh3.googleusercontent.com/d/1JljDRp5aWsczpDSRaZlU9zRvwZw9rPd9' },
    { id: 3, title: 'Smile Sketch', url: 'https://lh3.googleusercontent.com/d/11LXi3NrJRChSFYs20ED7L4KB78K_O18J' },
    { id: 4, title: 'Midnight Line', url: 'https://picsum.photos/seed/s3/500/500' },
    { id: 5, title: 'Shadow Work', url: 'https://picsum.photos/seed/s4/500/500' },
    { id: 6, title: 'Color Study', url: 'https://picsum.photos/seed/s5/500/500' },
    { id: 7, title: 'Drafting', url: 'https://picsum.photos/seed/s6/500/500' },
    { id: 8, title: 'Character 1', url: 'https://picsum.photos/seed/s7/500/500' },
    { id: 9, title: 'Landscape', url: 'https://picsum.photos/seed/s9/500/500' },
  ];

  return (
    <section className="min-h-screen bg-zinc-100 pt-32 pb-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-light mb-12 text-center">My Sketchbook</h2>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {sketches.map((sketch) => (
            <div key={sketch.id} className="break-inside-avoid">
              <img 
                src={sketch.url} 
                alt={sketch.title} 
                className="w-full rounded-lg shadow-sm border-4 border-white hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sketchbook;