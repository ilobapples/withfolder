import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';

const FolderIcon: React.FC<{ title: string; category: string; index: number }> = ({ title, category, index }) => {
  const rotation = (index % 3 === 0 ? -2 : index % 3 === 1 ? 1 : 3);
  
  return (
    <div 
      className="relative w-full aspect-square flex flex-col items-center justify-center group cursor-none transition-transform duration-300 hover:z-50"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="relative w-44 md:w-56 h-32 md:h-40 bg-[#e6d8b8] shadow-lg rounded-r-lg rounded-bl-lg transition-all duration-300 group-hover:-translate-y-4 group-hover:scale-110 group-active:scale-95 border-t border-white/20">
        <div className="absolute -top-4 left-0 w-16 md:w-20 h-4 bg-[#e6d8b8] rounded-t-lg border-t border-white/20"></div>
        <div className="absolute top-1 left-2 right-2 bottom-1 bg-white/40 rounded transform -rotate-1 group-hover:rotate-0 transition-transform"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <span className="text-zinc-800 font-bold text-xs md:text-sm leading-tight uppercase tracking-tight mb-1">
            {title}
          </span>
          <div className="h-[1px] w-12 bg-zinc-900/10 mb-2"></div>
          <span className="text-zinc-500 text-[8px] md:text-[10px] uppercase tracking-widest">
            FILE_REF_{index + 1}
          </span>
        </div>
        
        <div className="absolute bottom-4 left-4 w-3 h-3 border border-zinc-900/10 rounded-full opacity-30"></div>
      </div>
      
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">{category}</span>
      </div>
      
      <div className="w-40 md:w-48 h-4 bg-black/5 blur-md rounded-full mt-2 transform scale-x-110"></div>
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
             <h2 className="text-4xl md:text-6xl font-light text-zinc-400 uppercase tracking-tighter">
              Archives
            </h2>
          </div>
          <p className="text-zinc-400 text-[10px] md:text-xs uppercase tracking-[0.5em] ml-0 lg:ml-16">
            Project Repository — Access Restricted
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.id}
              onClick={() => navigate(`/work/${project.id}`)}
              className="flex justify-center"
            >
              <FolderIcon title={project.title} category={project.category} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-12 right-12 pointer-events-none opacity-10 hidden md:block">
        <div className="w-40 h-40 border-4 border-zinc-900 rounded-full flex items-center justify-center -rotate-12">
          <div className="text-center p-4">
            <span className="block text-xs font-bold uppercase tracking-widest">Verified Artifact</span>
            <span className="block text-[8px] mt-1">LOGGED: 2024.Q1</span>
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