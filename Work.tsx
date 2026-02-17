import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from './constants';

const ProjectFolder: React.FC<{ title: string; category: string; imageUrl: string; index: number }> = ({ title, category, imageUrl, index }) => {
  const rotation = (index % 3 === 0 ? -1.5 : index % 3 === 1 ? 1 : 2.5);
  
  return (
    <div 
      className="relative w-full aspect-square flex flex-col items-center justify-center group cursor-none transition-transform duration-500 hover:z-50"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Folder Container - Updated to Zinc-600 (Grey) */}
      <div className="relative w-48 md:w-60 h-44 md:h-56 bg-zinc-600 shadow-2xl rounded-r-lg rounded-bl-lg transition-all duration-500 group-hover:-translate-y-6 group-hover:scale-110 group-active:scale-95 border-t border-white/10">
        
        {/* Folder Tab - Updated to match body */}
        <div className="absolute -top-4 left-0 w-20 md:w-24 h-4 bg-zinc-600 rounded-t-lg border-t border-white/10 flex items-center px-2">
           <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
        </div>

        {/* Thumbnail Area (The "Work") */}
        <div className="absolute top-2 left-2 right-2 bottom-8 bg-white rounded shadow-inner overflow-hidden transform transition-transform group-hover:rotate-1 duration-500">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
          />
          {/* Subtle Reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
        </div>
        
        {/* Label Strip - Updated text colors for contrast on grey */}
        <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-between px-3">
          <span className="text-zinc-50 font-bold text-[9px] md:text-[11px] uppercase tracking-tighter truncate max-w-[70%]">
            {title}
          </span>
          <span className="text-zinc-300 text-[8px] font-mono opacity-80">
            REF_0{index + 1}
          </span>
        </div>
        
        {/* Binder Holes decoration - Adjusted opacity for grey background */}
        <div className="absolute top-1/2 left-1 w-1.5 h-1.5 border border-white/20 rounded-full opacity-40"></div>
        <div className="absolute top-1/3 left-1 w-1.5 h-1.5 border border-white/20 rounded-full opacity-40"></div>
        <div className="absolute bottom-1/3 left-1 w-1.5 h-1.5 border border-white/20 rounded-full opacity-40"></div>
      </div>
      
      {/* Category Hint */}
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 italic">{category}</span>
      </div>
      
      {/* Soft Shadow */}
      <div className="w-44 md:w-52 h-4 bg-black/20 blur-xl rounded-full mt-2 transform scale-x-125 transition-transform duration-500 group-hover:scale-x-150"></div>
    </div>
  );
};

const Work: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#fcfbf7] relative py-24 px-8 md:px-20 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-zinc-100/20 to-zinc-200/30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-16 md:mb-24 flex flex-col items-center lg:items-start">
          <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-[1px] bg-zinc-300"></div>
             <h2 className="text-4xl md:text-6xl font-light text-zinc-400 uppercase tracking-tighter italic">
              Projects
            </h2>
          </div>
          <p className="text-zinc-400 text-[10px] md:text-xs uppercase tracking-[0.5em] ml-0 lg:ml-16">
            Visual Repository — Accessing Artifacts...
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.id}
              onClick={() => navigate(`/work/${project.id}`)}
              className="flex justify-center"
            >
              <ProjectFolder 
                title={project.title} 
                category={project.category} 
                imageUrl={project.imageUrl}
                index={index} 
              />
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-12 right-12 pointer-events-none opacity-10 hidden md:block">
        <div className="w-40 h-40 border-4 border-zinc-900 rounded-full flex items-center justify-center -rotate-12">
          <div className="text-center p-4">
            <span className="block text-xs font-bold uppercase tracking-widest">Verified Case</span>
            <span className="block text-[8px] mt-1">LOGGED: 2024.V.3</span>
          </div>
        </div>
      </div>

      <div className="fixed left-6 top-1/2 -translate-y-1/2 -rotate-90 pointer-events-none opacity-20 hidden lg:block">
        <span className="text-[10px] uppercase tracking-[2em] text-zinc-900 whitespace-nowrap">
          SYSTEM_PORTFOLIO_V.3
        </span>
      </div>
    </section>
  );
};

export default Work;