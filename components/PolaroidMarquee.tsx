
import React from 'react';
import { motion } from 'framer-motion';
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
    <div className="relative flex-shrink-0 w-64 h-96 group perspective-1000 flex flex-col justify-end pb-8">
      {/* Rope Segment - Static relative to container (moves with marquee) */}
      {/* Rope Segment - Continuous Single Line */}
      <div className="absolute top-0 -left-[24px] -right-[24px] h-8 z-10 pointer-events-none">
        <svg width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
          <defs>
            <pattern id="ropePattern" x="0" y="0" width="12" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
              <path d="M0,0 L12,0" stroke="#d4a373" strokeWidth="2" strokeLinecap="round" />
            </pattern>
          </defs>

          {/* Main Taut Rope Body (connecting left to right) */}
          <path
            d="M0,4 L400,4"
            stroke="#8b5a2b"
            strokeWidth="3"
            fill="none"
          />
          {/* Rope Texture Overlay */}
          <path
            d="M0,4 L400,4"
            stroke="url(#ropePattern)"
            strokeWidth="3"
            fill="none"
          />
          {/* Subtle Highlight */}
          <path
            d="M0,3 L400,3"
            stroke="#e6ccb2"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>

      <motion.div
        onClick={onClick}
        initial={{ rotate: Math.random() * 4 - 2 }}
        animate={{ rotate: index % 2 === 0 ? 2 : -2 }}
        whileHover={{
          rotate: 0,
          scale: 1.05,
          y: -5,
          transition: { type: 'spring', stiffness: 300, damping: 15 }
        }}
        className={`relative cursor-pointer p-3 bg-[#fdfbf7] shadow-xl transform transition-all duration-300 w-64 h-80 flex flex-col items-center justify-start origin-top z-20`}
        style={{ boxShadow: '5px 15px 25px rgba(0,0,0,0.2)' }}
      >
        {/* Realistic Front-Facing Wooden Clothespin */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-8 h-20 z-30 pointer-events-auto filter drop-shadow-md origin-center hover:animate-pulse">
          <svg viewBox="0 0 40 100" className="w-full h-full" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="woodGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#e1c699" />
                <stop offset="20%" stopColor="#d4b483" />
                <stop offset="50%" stopColor="#e6ccb2" />
                <stop offset="80%" stopColor="#d4b483" />
                <stop offset="100%" stopColor="#cfa670" />
              </linearGradient>
            </defs>

            {/* Metal Spring Back Loop */}
            <path d="M6 45 C2 45 2 60 6 60 L34 60 C38 60 38 45 34 45" fill="none" stroke="#a1a1aa" strokeWidth="3" strokeLinecap="round" />

            {/* Main Wooden Body */}
            <rect x="10" y="0" width="20" height="95" rx="2" fill="url(#woodGradient)" />

            {/* Wood Grain details */}
            <line x1="14" y1="5" x2="14" y2="90" stroke="#b08d55" strokeWidth="0.5" opacity="0.4" />
            <line x1="20" y1="5" x2="20" y2="90" stroke="#b08d55" strokeWidth="0.5" opacity="0.4" />
            <line x1="26" y1="5" x2="26" y2="90" stroke="#b08d55" strokeWidth="0.5" opacity="0.4" />

            {/* Top Grooves */}
            <line x1="10" y1="8" x2="30" y2="8" stroke="#b08d55" strokeWidth="1.5" opacity="0.5" />
            <line x1="10" y1="16" x2="30" y2="16" stroke="#b08d55" strokeWidth="1.5" opacity="0.5" />

            {/* Metal Spring Arms and Bar */}
            <path d="M6 60 L6 50" fill="none" stroke="#d4d4d8" strokeWidth="3" strokeLinecap="round" />
            <path d="M34 60 L34 50" fill="none" stroke="#d4d4d8" strokeWidth="3" strokeLinecap="round" />
            <line x1="6" y1="62" x2="34" y2="62" stroke="#d4d4d8" strokeWidth="3" strokeLinecap="round" />
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
      </motion.div>
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
