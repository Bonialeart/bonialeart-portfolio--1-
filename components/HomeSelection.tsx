
import React from 'react';
import { motion } from 'framer-motion';
import { GALLERY_ITEMS, PROFILE_IMAGE } from '../constants';
import { StickerStar, ScribbleSpiral, StickerSmile } from './Doodles';

interface HomeSelectionProps {
    onSelect: (view: 'portfolio' | 'artistic') => void;
}

const HomeSelection: React.FC<HomeSelectionProps> = ({ onSelect }) => {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-6 md:gap-24 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black -z-10"></div>
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-6 md:top-20 left-0 right-0 text-center z-20 px-4"
            >
                <div className="relative inline-block">
                    <h1 className="text-3xl md:text-6xl font-['Permanent_Marker'] text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        ELIGE TU EXPERIENCIA
                    </h1>
                    <StickerStar className="absolute -top-6 -right-6 md:-right-12 w-8 h-8 md:w-12 md:h-12 rotate-12 animate-pulse" />
                </div>
                <p className="text-slate-400 mt-2 md:mt-4 font-light tracking-wide text-sm md:text-base">Selecciona que te gustaria ver</p>
            </motion.div>

            {/* Option 1: Portfolio */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.05, rotate: -2, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer group relative w-full max-w-[280px] md:max-w-sm mt-16 md:mt-0"
                onClick={() => onSelect('portfolio')}
            >
                <div className="bg-[#f8f8f8] p-3 pb-12 md:p-4 md:pb-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-2 transition-transform duration-500 group-hover:rotate-0">
                    <div className="aspect-[4/5] overflow-hidden bg-gray-200 relative border border-gray-100">
                        <img src={PROFILE_IMAGE} alt="Portfolio" loading="lazy" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-indigo-900/40 mix-blend-multiply opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
                    </div>
                    <div className="absolute bottom-3 md:bottom-6 left-0 right-0 text-center">
                        <span className="font-['Permanent_Marker'] text-xl md:text-4xl text-slate-800 tracking-tighter">PORTAFOLIO</span>
                        <p className="font-['Space_Grotesk'] text-[10px] md:text-xs text-slate-500 uppercase tracking-widest mt-0.5 md:mt-1">Portafolio completo</p>
                    </div>
                </div>
                {/* Tape effect */}
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-24 md:w-32 h-6 md:h-8 bg-[#e2d5b5]/80 backdrop-blur-sm rotate-3 shadow-sm opacity-90"></div>

                {/* Doodle */}
                <StickerSmile className="absolute -bottom-8 -left-8 md:-bottom-10 md:-left-10 w-16 h-16 md:w-20 md:h-20 text-indigo-500 rotate-[-15deg] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Option 2: Artistic Gallery */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05, rotate: 2, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer group relative w-full max-w-[280px] md:max-w-sm"
                onClick={() => onSelect('artistic')}
            >
                <div className="bg-[#f8f8f8] p-3 pb-12 md:p-4 md:pb-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-1 transition-transform duration-500 group-hover:rotate-0">
                    <div className="aspect-[4/5] overflow-hidden bg-gray-200 relative border border-gray-100">
                        <img src={GALLERY_ITEMS[0]?.url} alt="Artistic Gallery" loading="lazy" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-pink-900/40 mix-blend-multiply opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
                    </div>
                    <div className="absolute bottom-3 md:bottom-6 left-0 right-0 text-center">
                        <span className="font-['Permanent_Marker'] text-xl md:text-4xl text-slate-800 tracking-tighter">ARTISTICO</span>
                        <p className="font-['Space_Grotesk'] text-[10px] md:text-xs text-slate-500 uppercase tracking-widest mt-0.5 md:mt-1">gALERIA DE ARTE</p>
                    </div>
                </div>
                {/* Tape effect */}
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-24 md:w-32 h-6 md:h-8 bg-[#e2d5b5]/80 backdrop-blur-sm -rotate-2 shadow-sm opacity-90"></div>

                {/* Doodle */}
                <ScribbleSpiral className="absolute -bottom-8 -right-8 md:-bottom-10 md:-right-10 w-20 h-20 md:w-24 md:h-24 text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow" />
            </motion.div>
        </div>
    );
};

export default HomeSelection;
