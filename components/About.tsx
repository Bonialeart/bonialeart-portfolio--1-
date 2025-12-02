
import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE_IMAGE, POLAROID_TEXT, CV_URL } from '../constants';
import { ArrowRight, Mail, Globe, Download } from 'lucide-react';

interface AboutProps {
    text: string;
}

// Custom SVG Components for the "Doodle/Sticker" look
const StickerSmile = () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-24 md:h-24 text-pink-600 drop-shadow-lg transform -rotate-12">
        <path d="M25,35 L35,45 M35,35 L25,45" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M65,35 L75,45 M75,35 L65,45" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M25,65 Q50,85 75,65" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
);

const StickerFlame = () => (
    <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 text-pink-600 drop-shadow-lg">
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

const ScribbleArrow = () => (
    <svg viewBox="0 0 100 50" className="w-24 h-12 md:w-32 md:h-16 text-white opacity-80">
        <path d="M10,25 Q50,5 90,25" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5" />
        <path d="M80,20 L90,25 L85,35" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
);

const About: React.FC<AboutProps> = ({ text }) => {
    return (
        <div className="container mx-auto px-4 relative overflow-visible">

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-10 right-10 text-slate-800 opacity-20 font-['Permanent_Marker'] text-6xl md:text-8xl lg:text-9xl select-none">
                    CREATIVE
                </div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-12 md:gap-16 lg:gap-24">

                {/* LEFT COLUMN: Polaroid & Stickers */}
                <div className="w-full lg:w-5/12 relative mt-12 lg:mt-0">
                    <motion.div
                        initial={{ opacity: 0, y: -20, rotate: -5 }}
                        whileInView={{ opacity: 1, y: 0, rotate: -5 }}
                        viewport={{ once: true }}
                        className="absolute -top-12 -left-2 md:-top-16 md:-left-4 z-20"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Permanent_Marker'] text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] tracking-widest">
                            About ME
                            <div className="h-1 w-full bg-white mt-1 rounded-full" />
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                        className="absolute -top-6 -right-2 md:-top-8 md:-right-8 z-30"
                    >
                        <StickerSmile />
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.4 }}
                        className="absolute bottom-12 -right-6 md:-right-12 z-30 hidden sm:block"
                    >
                        <StickerFlame />
                    </motion.div>

                    {/* The Polaroid */}
                    <motion.div
                        initial={{ rotate: 0, y: 50, opacity: 0 }}
                        whileInView={{ rotate: -6, y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        viewport={{ once: true }}
                        className="bg-white p-3 pb-12 md:p-4 md:pb-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-[-6deg] hover:rotate-[-2deg] transition-transform duration-500 ease-out w-[80%] md:w-[70%] lg:w-[90%] max-w-md mx-auto relative"
                    >
                        <div className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 w-24 md:w-32 h-8 md:h-10 bg-white/30 backdrop-blur-sm rotate-2 border border-white/20 shadow-sm z-10"></div>

                        <div className="aspect-[4/5] overflow-hidden bg-slate-200 grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-700">
                            <img
                                src={PROFILE_IMAGE}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                        </div>

                        <div className="absolute bottom-3 md:bottom-4 left-4 md:left-6 font-['Permanent_Marker'] text-slate-900 text-lg md:text-xl transform -rotate-1 flex justify-between w-[85%]">
                            <span>{POLAROID_TEXT.left}</span>
                            <span>{POLAROID_TEXT.right}</span>
                        </div>

                        <div className="absolute -left-4 md:-left-6 top-1/3 w-16 h-16 md:w-24 md:h-24 bg-black rounded-full text-white flex items-center justify-center border-2 border-white transform -rotate-12 shadow-xl z-20">
                            <div className="text-center leading-none">
                                <span className="block text-[8px] md:text-[10px] tracking-widest uppercase">Digital</span>
                                <span className="block text-sm md:text-xl font-bold font-['Permanent_Marker'] text-pink-500">ARTIST</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: Typography & Content */}
                <div className="w-full lg:w-7/12 relative pt-4 md:pt-8 lg:pl-12">

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-6xl md:text-6xl lg:text-9xl font-black tracking-tighter text-white mb-4 md:mb-6 leading-[0.9] md:leading-[0.8]">
                            HI!!
                        </h1>

                        <div className="bg-slate-900/50 border-l-4 border-pink-600 pl-4 md:pl-6 py-2 mb-6 md:mb-8 backdrop-blur-sm">
                            <p className="text-lg md:text-xl text-white font-light">
                                Mi nombre es <strong className="text-pink-500">Bonialeart</strong>, Soy un Diseñador / Ilustrador /Fotografo
                            </p>
                        </div>

                        <div className="space-y-6 text-slate-300 text-base md:text-lg leading-relaxed max-w-xl">
                            <p className="first-letter:text-4xl md:first-letter:text-5xl first-letter:font-['Permanent_Marker'] text-white first-letter:float-left first-letter:mr-3 first-letter:mt-[-5px] md:first-letter:mt-[-10px]">
                                {text}
                            </p>

                            {/* CV Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="pt-2"
                            >
                                <a
                                    href={CV_URL}
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold font-['Space_Grotesk'] uppercase tracking-widest text-xs md:text-sm hover:bg-indigo-500 transition-all duration-300 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                >
                                    Descargar CV
                                    <Download size={18} />
                                </a>
                            </motion.div>

                            <div className="relative p-4 md:p-6 border border-dashed border-slate-600 rounded-lg bg-slate-950/50 mt-8">
                                <div className="absolute -top-3 -left-3 bg-slate-950 px-2 text-pink-500">
                                    <Globe size={20} />
                                </div>
                                <p className="font-['Permanent_Marker'] text-lg md:text-xl text-white transform rotate-1">
                                    "Cada pieza es un descubrimiento; cada proyecto, una conexión."
                                </p>
                                <div className="absolute bottom-4 right-[-40px] hidden lg:block">
                                    <ScribbleArrow />
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 md:mt-12 flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm font-mono tracking-wider border-t border-slate-800 pt-6"
                        >
                            <a href="#contact" className="flex items-center gap-2 hover:text-pink-500 transition-colors group">
                                <div className="bg-white text-black rounded-full p-1 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                                    <Mail size={14} />
                                </div>
                                bonialeart@gmail.com
                            </a>
                            <span className="text-slate-600 hidden sm:inline">*</span>
                            <span className="hidden sm:inline">+351 936 562 723</span>
                            <span className="text-slate-600 hidden sm:inline">*</span>
                            <a href="#" className="flex items-center gap-2 hover:text-pink-500 transition-colors">
                                https://www.artstation.com/boniale
                                <ArrowRight size={14} className="-rotate-45" />
                            </a>
                        </motion.div>

                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default About;
