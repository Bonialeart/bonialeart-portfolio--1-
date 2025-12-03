
import React from 'react';

// --- EXISTING DOODLES (Moved from About.tsx & MainPortfolio.tsx) ---

export const StickerSmile = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={`w-16 h-16 md:w-24 md:h-24 text-pink-600 drop-shadow-lg transform -rotate-12 ${className}`}>
        <path d="M25,35 L35,45 M35,35 L25,45" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M65,35 L75,45 M75,35 L65,45" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M25,65 Q50,85 75,65" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
);

export const StickerFlame = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={`w-24 h-24 md:w-32 md:h-32 text-pink-600 drop-shadow-lg ${className}`}>
        <path
            d="M50,5 C50,5 20,40 20,65 C20,85 35,95 50,95 C65,95 80,85 80,65 C80,40 50,5 50,5 Z M50,25 C50,25 65,55 65,70 C65,80 58,85 50,85 C42,85 35,80 35,70 C35,55 50,25 50,25 Z"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinejoin="round"
        />
        <path d="M50,45 L50,75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
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
    <svg viewBox="0 0 100 100" className={`w-12 h-12 md:w-16 md:h-16 text-yellow-400 drop-shadow-md ${className}`}>
        <path d="M50,5 L63,35 L95,38 L70,60 L78,90 L50,75 L22,90 L30,60 L5,38 L37,35 Z"
            fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M50,25 L50,25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
);

export const StickerCrown = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 60" className={`w-16 h-10 md:w-20 md:h-14 text-yellow-500 drop-shadow-sm ${className}`}>
        <path d="M10,50 L10,20 L30,40 L50,10 L70,40 L90,20 L90,50 Z"
            fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="10" cy="15" r="3" fill="currentColor" />
        <circle cx="50" cy="5" r="3" fill="currentColor" />
        <circle cx="90" cy="15" r="3" fill="currentColor" />
    </svg>
);

export const StickerWow = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 120 60" className={`w-24 h-12 md:w-32 md:h-16 text-pink-500 drop-shadow-md ${className}`}>
        <text x="10" y="45" fontFamily="Permanent Marker" fontSize="40" fill="currentColor" stroke="white" strokeWidth="1">WOW!</text>
        <path d="M5,50 Q60,60 115,50" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4,2" />
    </svg>
);

export const ScribbleSpiral = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={`w-16 h-16 md:w-24 md:h-24 text-indigo-400 opacity-60 ${className}`}>
        <path d="M50,50 m0,0 a5,5 0 1,0 10,0 a10,10 0 1,0 -20,0 a15,15 0 1,0 30,0 a20,20 0 1,0 -40,0 a25,25 0 1,0 50,0"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
