
import React, { useState, useRef } from 'react';
import { motion, Variants, useScroll, useTransform, useSpring } from 'framer-motion';
import { GeneratedContent } from '../types';
import { INITIAL_CONTENT, GALLERY_ITEMS } from '../constants';
import ThreeBackground from './ThreeBackground';
import ArtModel from './ArtModel';
import Navigation from './Navigation';
import Gallery from './Gallery';
import Skills from './Skills';
import Contact from './Contact';
import About from './About';
import CustomCursor from './CustomCursor';
import Testimonials from './Testimonials';
import PolaroidMarquee from './PolaroidMarquee';
import Services from './Services';
import MediaKitButton from './MediaKitButton';
import { ArrowDown, Instagram, Globe, ArrowLeft, Home } from 'lucide-react';

import { ScribbleUnderline, ScribbleCircle, StickerStar, StickerCrown, StickerWow, ScribbleSpiral, StickerSmile } from './Doodles';

interface MainPortfolioProps {
    onBack: () => void;
}

const MainPortfolio: React.FC<MainPortfolioProps> = ({ onBack }) => {
    const [content, setContent] = useState<GeneratedContent>(INITIAL_CONTENT as any);
    const [selectedGalleryId, setSelectedGalleryId] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('Todos');
    const qualitiesContainerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLElement>(null);

    // Track scroll progress for the TALL qualities container
    const { scrollYProgress: qualityScrollProgress } = useScroll({
        target: qualitiesContainerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(qualityScrollProgress, { damping: 15, stiffness: 80 });

    // --- MARQUEE PARALLAX ---
    const { scrollYProgress: marqueeProgress } = useScroll({
        target: marqueeRef,
        offset: ["start end", "center center"]
    });

    const marqueeOpacity = useTransform(marqueeProgress, [0, 0.6], [0, 1]);
    const marqueeY = useTransform(marqueeProgress, [0, 1], [100, 0]);

    // --- PARALLAX LOGIC ---

    // Quality 1: Enters early
    const opacity1 = useTransform(smoothProgress, [0.0, 0.15, 0.25, 0.35], [0, 1, 1, 0]);
    const y1 = useTransform(smoothProgress, [0.0, 0.35], [100, -100]);

    // Quality 2: Middle
    const opacity2 = useTransform(smoothProgress, [0.30, 0.45, 0.55, 0.70], [0, 1, 1, 0]);
    const y2 = useTransform(smoothProgress, [0.30, 0.70], [100, -100]);

    // Quality 3: Late
    const opacity3 = useTransform(smoothProgress, [0.65, 0.80, 0.95, 1.0], [0, 1, 1, 1]);
    const y3 = useTransform(smoothProgress, [0.65, 1.0], [100, 0]);

    // Progress Line Indicators (Heights)
    const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    // Active State for dots based on scroll range
    const dot1Active = useTransform(smoothProgress, [0.1, 0.3], [0.2, 1]);
    const dot2Active = useTransform(smoothProgress, [0.4, 0.6], [0.2, 1]);
    const dot3Active = useTransform(smoothProgress, [0.75, 1], [0.2, 1]);

    // Animation Variants
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 50, transition: { duration: 0.5 } },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const qualities = content.qualities || [];

    const handlePolaroidClick = (id: number) => {
        setSelectedGalleryId(id);
        // Use setTimeout to ensure state update has begun and to give a slight delay for visual transition
        setTimeout(() => {
            const gallerySection = document.getElementById('gallery');
            if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 50);
    };

    // Filter out Photography items for the main portfolio gallery
    const basePortfolioItems = GALLERY_ITEMS.filter(item => item.category !== 'Photography');

    // Category Filtering Logic
    const doesItemBelongToCategory = (item: typeof GALLERY_ITEMS[0], category: string): boolean => {
        switch (category) {
            case 'Todos':
                return true;
            case 'Ilustraciones Digitales':
                return item.category === 'Digital Painting';
            case 'Arte de Entornos':
                return item.category === '3d' || item.category === 'Sketches' || item.description.toLowerCase().includes('entorno') || item.description.toLowerCase().includes('landscape');
            case 'Arte Conceptual':
                return item.category === 'Sketches' || item.category === 'Digital Painting';
            case 'Diseño de Personajes':
                return (item.category === 'Digital Painting' || item.category === '3d') && !item.description.toLowerCase().includes('landscape') && !item.description.toLowerCase().includes('entorno');
            case '3D':
                return item.category === '3d';
            case 'Diseño':
                return item.category === 'Design';
            default:
                return false;
        }
    };

    const portfolioItems = basePortfolioItems.filter(item => doesItemBelongToCategory(item, activeCategory));

    const categories = [
        'Todos',
        'Ilustraciones Digitales',
        'Arte de Entornos',
        'Arte Conceptual',
        'Diseño de Personajes',
        '3D',
        'Diseño'
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full min-h-screen text-slate-100 selection:bg-indigo-500 selection:text-white"
        >
            <CustomCursor />
            <ThreeBackground />
            <Navigation />
            <MediaKitButton />

            {/* Back Button - Responsive Positioning */}
            <button
                onClick={onBack}
                className="fixed z-50 rounded-full text-white hover:bg-indigo-600 transition-colors border border-slate-700 bg-slate-900/80 backdrop-blur-md
                bottom-6 left-6 p-3 shadow-lg group"
                title="Volver al Inicio"
            >
                <Home size={20} className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Hero Section */}
            <motion.section
                id="home"
                className="min-h-[100svh] flex flex-col justify-center items-center relative px-4 z-10 overflow-hidden pt-20 md:pt-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={staggerContainer}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-transparent -z-10"></div>
                <div className="text-center w-full max-w-7xl z-10 flex flex-col items-center justify-center">
                    <div className="relative inline-block my-8 md:my-16 w-full">
                        {/* Responsive Font Sizing: 
                    Mobile: 18vw 
                    Tablet (md): 21vw (Increased significantly for bold look)
                    Laptop (lg): 12rem
                    Desktop (xl): 15rem
                */}
                        <motion.h1
                            variants={fadeUp}
                            className="text-[18vw] md:text-[21vw] lg:text-[12rem] xl:text-[15rem] leading-[0.9] md:leading-[0.8] font-bold font-['Space_Grotesk'] tracking-tighter text-indigo-600 select-none mix-blend-screen opacity-90"
                        >
                            Portafolio
                        </motion.h1>

                        <motion.div
                            variants={fadeUp}
                            // Adjusted position for Tablet (MD) to account for larger size
                            className="absolute bottom-[-5%] left-[60%] md:bottom-[10%] md:left-[70%] lg:left-[70%] z-20 cursor-none origin-center"
                        >
                            {/* Scale increased on MD to 125 (1.25) for larger tape */}
                            <div className="scale-[0.58] md:scale-100 lg:scale-105 -rotate-12 origin-center transition-transform duration-300 relative">
                                <StickerStar className="absolute -top-12 -right-12 rotate-12 z-20" />
                                <motion.div
                                    whileHover={{
                                        y: -12,
                                        scale: 1.05,
                                        rotate: -2,
                                        boxShadow: "20px 25px 40px rgba(0,0,0,0.4)"
                                    }}
                                    className="relative bg-[#f1f5f9] py-3 px-6 md:py-4 md:px-10 shadow-[8px_8px_20px_rgba(0,0,0,0.6)] transform origin-bottom-right"
                                >
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 md:w-20 h-6 bg-[#e2d5b5]/90 rotate-1 shadow-sm backdrop-blur-sm"></div>
                                    <div className="absolute -bottom-3 -right-3 w-12 h-5 bg-[#e2d5b5]/80 rotate-[45deg] shadow-sm"></div>

                                    <span className="font-['Permanent_Marker'] text-2xl md:text-3xl lg:text-5xl text-slate-900 relative z-10 block tracking-wide whitespace-nowrap">
                                        Bonialeart
                                    </span>

                                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#000_1px,transparent_0)] bg-[length:3px_3px]"></div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div variants={fadeUp} className="h-1 w-24 md:w-32 bg-indigo-500 mx-auto mb-6 md:mb-10 shadow-[0_0_20px_rgba(99,102,241,0.6)] rounded-full" />

                    <motion.p variants={fadeUp} className="text-base md:text-xl lg:text-2xl font-light tracking-wide text-slate-300 mb-4 md:mb-8 max-w-2xl px-4 text-center">
                        {content.tagline}
                    </motion.p>
                    <motion.p variants={fadeUp} className="text-xs md:text-sm lg:text-base max-w-lg mx-auto text-slate-400 px-4 text-center leading-relaxed hidden md:block">
                        {content.bio}
                    </motion.p>
                </div>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute bottom-6 md:bottom-12 z-50 cursor-pointer p-2 hover:bg-white/5 rounded-full transition-colors"
                    onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                    aria-label="Ir a Galería"
                >
                    <ArrowDown className="w-6 h-6 md:w-8 md:h-8 text-indigo-400 hover:text-white transition-colors" />
                </motion.button>
            </motion.section>

            {/* NEW: Polaroid Marquee Section */}
            <motion.section
                ref={marqueeRef}
                style={{ opacity: marqueeOpacity, y: marqueeY }}
                className="relative z-30"
            >
                <PolaroidMarquee onSelect={handlePolaroidClick} />
            </motion.section>

            {/* About Section */}
            <motion.section
                id="about"
                className="py-20 md:py-32 relative z-20 overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-transparent -z-10"></div>
                <About text={content.aboutMe || INITIAL_CONTENT.aboutMe} />
            </motion.section>

            {/* QUALITIES SECTION - Parallax */}
            <motion.section
                ref={qualitiesContainerRef}
                id="qualities"
                className="h-[350vh] md:h-[400vh] relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0 }}
                variants={sectionVariants}
            >
                <div className="absolute inset-0 bg-slate-950/80 -z-10"></div>
                <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center">

                    {/* Progress Line - Tablet: left-10, Desktop: left-20 */}
                    <div className="absolute left-6 md:left-10 lg:left-20 top-1/4 bottom-1/4 w-[1px] bg-slate-800 hidden sm:block">
                        <motion.div
                            className="w-full bg-gradient-to-b from-indigo-500 to-orange-500"
                            style={{ height: progressHeight }}
                        />
                        <motion.div style={{ opacity: dot1Active }} className="absolute top-[10%] -left-[3px] w-[7px] h-[7px] rounded-full bg-white shadow-[0_0_10px_white]" />
                        <motion.div style={{ opacity: dot2Active }} className="absolute top-[50%] -left-[3px] w-[7px] h-[7px] rounded-full bg-white shadow-[0_0_10px_white]" />
                        <motion.div style={{ opacity: dot3Active }} className="absolute bottom-[10%] -left-[3px] w-[7px] h-[7px] rounded-full bg-white shadow-[0_0_10px_white]" />
                    </div>

                    {/* 3D Model - Optimized size and opacity for Tablet (MD) */}
                    <div className="relative w-full max-w-[600px] md:max-w-[500px] lg:max-w-[800px] aspect-square flex items-center justify-center z-10 opacity-50 md:opacity-60 lg:opacity-100">
                        <ArtModel scrollProgress={smoothProgress} />
                    </div>

                    {/* Floating Content Container */}
                    <div className="absolute inset-0 z-20 pointer-events-none container mx-auto">

                        {/* Quality 1 - Adjusted Positioning for Tablet */}
                        {qualities[0] && (
                            <motion.div
                                style={{ opacity: opacity1, y: y1 }}
                                className="absolute top-[25%] md:top-[20%] lg:top-[25%] left-6 md:left-8 lg:left-32 max-w-[80%] md:max-w-[300px] lg:max-w-xs"
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <ScribbleCircle />
                                    <span className="font-['Permanent_Marker'] text-indigo-400 tracking-widest text-lg md:text-xl">Paso 01</span>
                                </div>
                                <h3 className="text-4xl md:text-4xl lg:text-6xl font-bold text-white mb-4 font-['Space_Grotesk'] uppercase leading-none tracking-tighter">
                                    {qualities[0].title}
                                </h3>
                                <p className="text-slate-300 md:text-slate-400 font-mono text-xs leading-relaxed border-l-2 border-indigo-500/30 pl-4 bg-slate-950/50 lg:bg-transparent p-2 lg:p-0 rounded lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none">
                                    {qualities[0].description}
                                </p>
                                <svg className="absolute top-1/2 left-full w-12 lg:w-24 h-24 hidden lg:block -translate-y-1/2 opacity-40">
                                    <path d="M0,50 L80,50 L100,10" fill="none" stroke="#6366f1" strokeWidth="1" />
                                    <circle cx="0" cy="50" r="2" fill="#6366f1" />
                                </svg>
                            </motion.div>
                        )}

                        {/* Quality 2 - Centered on Tablet */}
                        {qualities[1] && (
                            <motion.div
                                style={{ opacity: opacity2, y: y2 }}
                                className="absolute top-[40%] md:top-[40%] lg:top-[45%] right-6 md:right-10 lg:right-32 max-w-[80%] md:max-w-[300px] lg:max-w-xs text-right"
                            >
                                <div className="flex items-center gap-4 mb-2 justify-end relative">
                                    <span className="font-['Permanent_Marker'] text-orange-500 tracking-widest text-lg md:text-xl">Paso 02</span>
                                    <div className="absolute -top-2 -right-2 w-12 h-12 border-2 border-orange-500/50 rounded-full animate-ping" />
                                </div>
                                <h3 className="text-4xl md:text-4xl lg:text-6xl font-bold text-white mb-4 font-['Space_Grotesk'] uppercase leading-none tracking-tighter">
                                    {qualities[1].title}
                                </h3>
                                <p className="text-slate-300 md:text-slate-400 font-mono text-xs leading-relaxed border-r-2 border-orange-500/30 pr-4 bg-slate-950/50 lg:bg-transparent p-2 lg:p-0 rounded lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none inline-block">
                                    {qualities[1].description}
                                </p>
                                <svg className="absolute top-1/2 right-full w-20 lg:w-32 h-12 hidden lg:block -translate-y-1/2 opacity-40">
                                    <path d="M128,20 L40,20 L10,50" fill="none" stroke="#f97316" strokeWidth="1" />
                                    <circle cx="128" cy="20" r="2" fill="#f97316" />
                                </svg>
                            </motion.div>
                        )}

                        {/* Quality 3 - Adjusted Bottom Position */}
                        {qualities[2] && (
                            <motion.div
                                style={{ opacity: opacity3, y: y3 }}
                                className="absolute bottom-[20%] md:bottom-[20%] left-6 md:left-16 lg:left-40 max-w-[80%] md:max-w-[300px] lg:max-w-xs"
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="font-['Permanent_Marker'] text-pink-500 tracking-widest text-lg md:text-xl">Paso 03</span>
                                </div>
                                <h3 className="text-4xl md:text-4xl lg:text-6xl font-bold text-white mb-4 font-['Space_Grotesk'] uppercase leading-none tracking-tighter">
                                    {qualities[2].title}
                                </h3>
                                <p className="text-slate-300 md:text-slate-400 font-mono text-xs leading-relaxed border-l-2 border-pink-500/30 pl-4 bg-slate-950/50 lg:bg-transparent p-2 lg:p-0 rounded lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none">
                                    {qualities[2].description}
                                </p>
                                <svg className="absolute bottom-full left-8 w-1 h-16 hidden lg:block opacity-40">
                                    <line x1="0" y1="64" x2="0" y2="0" stroke="#ec4899" strokeWidth="1" strokeDasharray="4,4" />
                                </svg>
                            </motion.div>
                        )}

                    </div>

                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(transparent_1px,transparent_1px),linear-gradient(90deg,#ffffff10_1px,transparent_1px)] bg-[size:50px_50px] md:bg-[size:100px_100px]"></div>
                </div>
            </motion.section>

            {/* Skills Section */}
            <motion.section
                id="skills"
                className="py-20 md:py-24 px-4 relative z-20 border-t border-slate-900/50"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-transparent -z-10"></div>
                <div className="max-w-5xl mx-auto text-center mb-16 md:mb-24">
                    <div className="inline-block relative">
                        <StickerCrown className="absolute -top-10 -right-10 rotate-12 z-20" />
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-['Permanent_Marker'] text-slate-100 z-10 relative">
                            HABILIDADES Y SOFTWARE
                        </h2>
                        <div className="w-full max-w-[200px] md:max-w-[300px] mx-auto">
                            <ScribbleUnderline color="text-pink-500" />
                        </div>
                    </div>
                </div>
                <Skills />
            </motion.section>

            {/* Gallery Section */}
            <motion.section
                id="gallery"
                className="min-h-screen py-20 md:py-24 px-4 relative z-20 border-t border-slate-900/50"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                variants={sectionVariants}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-transparent -z-10"></div>
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 md:mb-16 text-right">
                        <div className="inline-block relative">
                            <StickerWow className="absolute -top-12 -left-20 -rotate-12 z-20" />
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-['Permanent_Marker'] pr-2 md:pr-6">
                                OBRA RECIENTE
                            </h2>
                            <div className="w-1/2 ml-auto">
                                <ScribbleUnderline color="text-indigo-500" />
                            </div>
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-['Space_Grotesk'] transition-all border ${activeCategory === cat
                                    ? 'bg-indigo-500 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                                    : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <Gallery
                        items={portfolioItems}
                        selectedId={selectedGalleryId}
                        setSelectedId={setSelectedGalleryId}
                    />

                </div>
            </motion.section>

            {/* Services Section */}
            <motion.section
                id="services"
                className="py-20 md:py-24 relative z-20 border-t border-slate-900/50 bg-slate-950"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[length:30px_30px] opacity-[0.03] pointer-events-none"></div>

                <div className="max-w-5xl mx-auto text-center mb-16 md:mb-24 px-4">
                    <div className="inline-block relative">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-['Permanent_Marker'] text-slate-100 z-10 relative">
                            SERVICIOS
                        </h2>
                        <div className="w-full max-w-[200px] md:max-w-[300px] mx-auto">
                            <ScribbleUnderline color="text-indigo-500" />
                        </div>
                    </div>
                    <p className="text-slate-400 mt-6 max-w-2xl mx-auto font-light text-lg">
                        ¿Tienes una idea en mente? Puedo ayudarte a hacerla realidad.
                    </p>
                </div>

                <Services />
            </motion.section>

            {/* Testimonials Section (Moved below Services) */}
            <motion.section
                className="relative z-20 border-t border-slate-900/50"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={sectionVariants}
            >
                <Testimonials />
            </motion.section>

            {/* Contact Section */}
            <motion.section
                id="contact"
                className="py-20 md:py-32 px-4 relative z-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                variants={sectionVariants}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/90 to-indigo-950/90 -z-10"></div>
                <Contact />
            </motion.section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-900 bg-slate-950 text-center relative z-20 px-4 overflow-hidden">
                <ScribbleSpiral className="absolute bottom-4 right-4 md:right-10 opacity-10 rotate-45 pointer-events-none" />
                <div className="flex flex-col items-center justify-center gap-8">

                    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                        <a href="https://www.instagram.com/bonialeart/?hl=en" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-pink-500 hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300 group">
                            <Instagram size={20} strokeWidth={1.5} />
                        </a>
                        <a href="https://www.behance.net/brunoluden" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-500 hover:border-indigo-500 hover:bg-indigo-500/10 transition-all duration-300 group">
                            <Globe size={20} strokeWidth={1.5} />
                        </a>

                        <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-500 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 group">
                            {/* Pinterest Icon SVG */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="group-hover:text-red-500 transition-colors">
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z" />
                            </svg>
                        </a>
                        <a href="https://www.artstation.com/boniale" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-400 hover:bg-blue-400/10 transition-all duration-300 group">
                            {/* ArtStation Icon SVG - Increased to 24px for visual balance */}
                            <svg width="24" height="24" viewBox="0 0 209 196" fill="currentColor" className="group-hover:text-blue-400 transition-colors">
                                <g>
                                    <path d="M51.4,123.3l8.9,15.4l0,0c1.8,3.5,5.4,5.9,9.5,5.9l0,0l0,0h59.3l-12.3-21.3H51.4z" />
                                    <path d="M157.2,123.4c0-2.1-0.6-4.1-1.7-5.8l-34.8-60.4c-1.8-3.4-5.3-5.7-9.4-5.7H92.9l53.7,93l8.5-14.7 C156.7,127,157.2,125.8,157.2,123.4z" />
                                    <polygon points="108.1,108.1 84.2,66.6 60.2,108.1" />
                                </g>
                            </svg>
                        </a>
                    </div>

                    <p className="text-slate-500 uppercase tracking-widest text-xs md:text-sm">
                        © {new Date().getFullYear()} Bonialeart. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </motion.div>
    );
}

export default MainPortfolio;
