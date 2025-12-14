
import React from 'react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../constants';

interface PolaroidMarqueeProps {
  onSelect: (id: number) => void;
}

const PolaroidCard = ({ item, onClick, index }: { item: GalleryItem; onClick: () => void; index: number }) => {
  // varied rotation slightly for a natural look
  const rotations = ['rotate-1', '-rotate-2', 'rotate-3', '-rotate-1', 'rotate-2'];
  const rotateClass = rotations[index % rotations.length];

  return (
    <div
      onClick={onClick}
      className={`relative group flex-shrink-0 cursor-pointer p-3 bg-[#fdfbf7] shadow-lg transform ${rotateClass} hover:rotate-0 hover:scale-110 hover:z-20 transition-all duration-300 w-64 h-80 flex flex-col items-center justify-start`}
      style={{ boxShadow: '5px 5px 15px rgba(0,0,0,0.5)' }}
    >
      {/* PushPin */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 z-20 pointer-events-none filter drop-shadow-md">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform -rotate-12">
          <line x1="50" y1="50" x2="50" y2="95" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
          <path d="M68 25 C68 12 32 12 32 25 C32 32 38 38 38 45 L38 52 L30 52 L30 58 L70 58 L70 52 L62 52 L62 45 C62 38 68 32 68 25 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
          <ellipse cx="45" cy="22" rx="6" ry="3" fill="white" opacity="0.4" />
        </svg>
      </div>

      {/* Image Container */}
      <div className="w-full aspect-square bg-slate-200 overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
        <img
          src={item.url}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* Caption */}
      <div className="w-full px-1">
        <p className="font-['Permanent_Marker'] text-slate-900 text-lg leading-tight truncate">
          {item.title}
        </p>
        <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mt-1">
          {item.category}
        </p>
      </div>
    </div>
  );
};

const PolaroidMarquee: React.FC<PolaroidMarqueeProps> = ({ onSelect }) => {
  // Duplicate items to ensure seamless infinite scroll (3x covers viewport easily for loop)
  const duplicatedItems = [...GALLERY_ITEMS, ...GALLERY_ITEMS, ...GALLERY_ITEMS];

  return (
    <div className="w-full py-16 bg-slate-950/50 overflow-hidden relative border-y border-white/5 z-20 group/marquee">

      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-max">
        <div
          className="flex gap-12 px-6 animate-marquee group-hover/marquee:[animation-play-state:paused]"
          style={{ width: 'max-content' }}
        >
          {duplicatedItems.map((item, index) => (
            <PolaroidCard
              key={`${item.id}-${index}`}
              item={item}
              index={index}
              onClick={() => onSelect(item.id)}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); } 
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PolaroidMarquee;
