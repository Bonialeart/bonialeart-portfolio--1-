
import React from 'react';

// --- MASKING TAPE: warm, fibrous strip used to "stick" paper/polaroid elements down ---

export const Tape = ({ className = "", rotate = "-rotate-2" }: { className?: string, rotate?: string }) => (
    <div className={`absolute bg-gradient-to-b from-[#f4e9cf]/95 via-[#ecdcb3]/90 to-[#e2d0a3]/95 ${rotate} shadow-[0_3px_6px_rgba(0,0,0,0.2)] border-x border-white/50 z-20 pointer-events-none ${className}`}>
        <div
            className="absolute inset-0 opacity-40 mix-blend-multiply"
            style={{ backgroundImage: 'repeating-linear-gradient(115deg, transparent, transparent 3px, rgba(120,90,40,0.15) 3px, rgba(120,90,40,0.15) 4px)' }}
        />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-white/30" />
    </div>
);

// --- STICKERS: filled shapes + thick white "die-cut" border to read as real stickers ---

export const StickerSmile = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={`w-16 h-16 md:w-24 md:h-24 drop-shadow-lg transform -rotate-12 ${className}`}>
        <circle cx="50" cy="52" r="40" fill="#fde047" stroke="#ffffff" strokeWidth="7" />
        <circle cx="50" cy="52" r="40" fill="none" stroke="#78350f" strokeWidth="2" opacity="0.5" />
        <circle cx="24" cy="58" r="7" fill="#fb7185" opacity="0.55" />
        <circle cx="76" cy="58" r="7" fill="#fb7185" opacity="0.55" />
        <path d="M32,40 L42,50 M42,40 L32,50" stroke="#451a03" strokeWidth="5" strokeLinecap="round" />
        <path d="M58,40 L68,50 M68,40 L58,50" stroke="#451a03" strokeWidth="5" strokeLinecap="round" />
        <path d="M30,66 Q50,86 70,66" stroke="#451a03" strokeWidth="5.5" fill="none" strokeLinecap="round" />
    </svg>
);

export const StickerFlame = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={`w-24 h-24 md:w-32 md:h-32 drop-shadow-lg ${className}`}>
        <path
            d="M50,4 C50,4 14,42 14,66 C14,86 30,97 50,97 C70,97 86,86 86,66 C86,42 50,4 50,4 Z"
            fill="#f97316"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinejoin="round"
        />
        <path
            d="M50,4 C50,4 14,42 14,66 C14,86 30,97 50,97 C70,97 86,86 86,66 C86,42 50,4 50,4 Z"
            fill="none"
            stroke="#7c2d12"
            strokeWidth="2"
            strokeLinejoin="round"
            opacity="0.5"
        />
        <path
            d="M50,32 C50,32 32,56 32,71 C32,83 40,89 50,89 C60,89 68,83 68,71 C68,56 50,32 50,32 Z"
            fill="#fde047"
        />
    </svg>
);

export const ScribbleArrow = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 120 60" className={`w-24 h-12 md:w-32 md:h-16 text-white opacity-90 ${className}`}>
        {/* Main curved shaft with a slight loop/wobble */}
        <path d="M10,50 C30,45 40,15 70,15 C90,15 100,30 110,35"
            fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Arrowhead */}
        <path d="M95,25 L110,35 L98,48"
            fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ScribbleUnderline = ({ color = "text-indigo-500", className = "" }: { color?: string, className?: string }) => (
    <svg viewBox="0 0 200 20" className={`w-full h-6 ${color} opacity-80 mt-[-10px] ${className}`}>
        <path d="M5,15 Q50,5 100,12 T195,8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

export const ScribbleCircle = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={`absolute -top-6 -left-6 w-20 h-20 text-orange-500 opacity-60 -z-10 transform -rotate-12 ${className}`}>
        <path d="M50,10 A40,40 0 1,1 40,90 A40,40 0 0,1 50,10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
);

// --- NEW DOODLES ---

export const StickerStar = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={`w-12 h-12 md:w-16 md:h-16 drop-shadow-md ${className}`}>
        <path d="M50,5 L63,35 L95,38 L70,60 L78,90 L50,75 L22,90 L30,60 L5,38 L37,35 Z"
            fill="#facc15" stroke="#ffffff" strokeWidth="6" strokeLinejoin="round" />
        <path d="M50,5 L63,35 L95,38 L70,60 L78,90 L50,75 L22,90 L30,60 L5,38 L37,35 Z"
            fill="none" stroke="#854d0e" strokeWidth="2" strokeLinejoin="round" opacity="0.5" />
        <circle cx="38" cy="32" r="5" fill="#ffffff" opacity="0.6" />
    </svg>
);

export const StickerCrown = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 70" className={`w-16 h-10 md:w-20 md:h-14 drop-shadow-md ${className}`}>
        <path d="M10,62 L10,26 L30,46 L50,10 L70,46 L90,26 L90,62 Z"
            fill="#facc15" stroke="#ffffff" strokeWidth="6" strokeLinejoin="round" />
        <path d="M10,62 L10,26 L30,46 L50,10 L70,46 L90,26 L90,62 Z"
            fill="none" stroke="#854d0e" strokeWidth="2" strokeLinejoin="round" opacity="0.5" />
        <rect x="10" y="58" width="80" height="8" rx="1" fill="#eab308" stroke="#854d0e" strokeWidth="1" opacity="0.9" />
        <circle cx="30" cy="42" r="5" fill="#ec4899" />
        <circle cx="50" cy="28" r="5" fill="#6366f1" />
        <circle cx="70" cy="42" r="5" fill="#10b981" />
    </svg>
);

export const StickerWow = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 140 80" className={`w-28 h-16 md:w-36 md:h-20 drop-shadow-md ${className}`}>
        <path d="M12,40 Q6,10 38,12 Q70,-4 102,12 Q134,10 128,40 Q134,70 102,68 Q70,84 38,68 Q6,70 12,40 Z"
            fill="#ffffff" />
        <path d="M12,40 Q6,10 38,12 Q70,-4 102,12 Q134,10 128,40 Q134,70 102,68 Q70,84 38,68 Q6,70 12,40 Z"
            fill="none" stroke="#1e293b" strokeWidth="1.5" opacity="0.15" />
        <text x="18" y="53" fontFamily="'Permanent Marker', cursive" fontSize="34" fill="#ec4899" stroke="#831843" strokeWidth="1">WOW!</text>
    </svg>
);

export const ScribbleSpiral = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={`w-16 h-16 md:w-24 md:h-24 text-indigo-400 opacity-60 ${className}`}>
        <path d="M50,50 m0,0 a5,5 0 1,0 10,0 a10,10 0 1,0 -20,0 a15,15 0 1,0 30,0 a20,20 0 1,0 -40,0 a25,25 0 1,0 50,0"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
