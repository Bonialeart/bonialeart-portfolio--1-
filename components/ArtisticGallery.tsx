import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BounceCards from './BounceCards';
import MagicBento, { BentoCardProps } from './MagicBento';
import PillNav from './PillNav';
import { GALLERY_ITEMS } from '../constants';
import { ArrowLeft, X, PlayCircle, Check, ChevronLeft, ChevronRight, Info, Camera, Aperture, Timer, Maximize2, Layers, Image as ImageIcon } from 'lucide-react';
import { extractColorsFromUrl } from '../utils/colorUtils';

gsap.registerPlugin(ScrollTrigger);

// --- SVG Assets for Handmade Feel ---
const PaperClip = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 50" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 42V10a6 6 0 0 0-12 0v28a2 2 0 0 0 4 0V12" />
        <path d="M8 12v26a2 2 0 0 0 4 0V10" strokeOpacity="0.5" />
    </svg>
);

const Tape = ({ className, color = "bg-[#e2d5b5]/80" }: { className?: string, color?: string }) => (
    <div className={`absolute h-8 ${color} backdrop-blur-sm shadow-sm z-20 pointer-events-none ${className}`}></div>
);

const Scribble = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 20" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M0 10c10-5 20 5 30 0s20-5 30 0 20-5 30 0" />
    </svg>
);

const ScratchOverlay = () => (
    <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay z-20">
        <svg width="100%" height="100%">
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
    </div>
);

interface ArtisticGalleryProps {
    onBack: () => void;
}

const ArtisticGallery: React.FC<ArtisticGalleryProps> = ({ onBack }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const mockupsRef = useRef<HTMLDivElement>(null); // Ref for Mockups section
    const [selectedItem, setSelectedItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [palette, setPalette] = useState<string[]>([]);
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    // Filtering
    const [activeCategory, setActiveCategory] = useState<string>('All');

    // User-defined categories
    const categories = [
        'All',
        'Digital Illustrations',
        'Environment Art',
        'Concept Art',
        'Character Design',
        'Animation',
        'Design'
    ];

    const doesItemBelongToCategory = (item: typeof GALLERY_ITEMS[0], category: string): boolean => {
        switch (category) {
            case 'All':
                return true;
            case 'Digital Illustrations':
                return item.category === 'Digital Painting';
            case 'Environment Art':
                // Check for 3D or Sketches, or description keywords
                return item.category === '3d' || item.category === 'Sketches' || item.description.toLowerCase().includes('entorno') || item.description.toLowerCase().includes('landscape');
            case 'Concept Art':
                return item.category === 'Sketches' || item.category === 'Digital Painting';
            case 'Character Design':
                // Check for Digital Painting or 3D, usually characters
                return (item.category === 'Digital Painting' || item.category === '3d') && !item.description.toLowerCase().includes('landscape') && !item.description.toLowerCase().includes('entorno');
            case 'Animation':
                // Check if it has video media or description mentions animation
                return item.media?.some(m => m.type === 'video') || item.description.toLowerCase().includes('animación') || item.description.toLowerCase().includes('animation');
            case 'Design':
                return item.category === 'Design';
            default:
                return false;
        }
    };

    const filteredItems = GALLERY_ITEMS.filter(item => doesItemBelongToCategory(item, activeCategory));

    // Modal Entrance Animation & Scroll Triggers
    useLayoutEffect(() => {
        if (selectedItem && modalRef.current) {
            const ctx = gsap.context(() => {
                // Shutter/Reveal Animation
                const tl = gsap.timeline();

                // 1. Overlay Fade In
                tl.fromTo('#modal-shutter',
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3, ease: "power2.inOut" }
                );

                // 2. Circular Reveal of Content
                tl.fromTo(modalRef.current,
                    {
                        clipPath: "circle(0% at 50% 50%)",
                        opacity: 1
                    },
                    {
                        clipPath: "circle(150% at 50% 50%)",
                        duration: 1.2,
                        ease: "expo.inOut"
                    },
                    "-=0.1"
                );

                // 3. Staggered Content Entry (Hero)
                tl.from('.hero-element', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out"
                }, "-=0.8");

                // 4. Scroll Animations for Content Sections
                const sections = gsap.utils.toArray('.content-section');
                sections.forEach((section: any) => {
                    gsap.fromTo(section,
                        {
                            y: 50,
                            opacity: 0
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: section,
                                scroller: modalRef.current, // Important: define the scroller
                                start: "top 85%", // Start animation when top of section hits 85% of viewport
                                toggleActions: "play none none reverse" // Play on enter, reverse on leave back up
                            }
                        }
                    );
                });

            }, modalRef); // Scope to modalRef

            return () => ctx.revert();
        }
    }, [selectedItem]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedItem) return;

            if (e.key === 'Escape') {
                handleCloseAnimation();
            } else if (e.key === 'ArrowLeft') {
                navigateItem(-1);
            } else if (e.key === 'ArrowRight') {
                navigateItem(1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItem, filteredItems]);

    const navigateItem = (direction: number) => {
        if (!selectedItem) return;
        const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
        if (currentIndex === -1) return;

        const newIndex = (currentIndex + direction + filteredItems.length) % filteredItems.length;
        handleCardClick(filteredItems[newIndex]);
    };

    const handleCardClick = async (item: typeof GALLERY_ITEMS[0]) => {
        setSelectedItem(item);
        setActiveImage(item.url);

        try {
            const colors = await extractColorsFromUrl(item.url);
            setPalette(colors);
        } catch (e) {
            console.warn("Failed to extract colors", e);
            setPalette([]);
        }
    };

    const handleCloseAnimation = () => {
        if (!modalRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setSelectedItem(null);
                    setActiveImage(null);
                    setPalette([]);
                }
            });

            // Reverse Reveal
            tl.to(modalRef.current, {
                clipPath: "circle(0% at 50% 50%)",
                duration: 0.8,
                ease: "expo.inOut"
            });

            tl.to('#modal-shutter', {
                opacity: 0,
                duration: 0.3
            }, "-=0.3");

        }, modalRef); // Scope to modalRef
    };

    const handleCopyColor = (color: string) => {
        navigator.clipboard.writeText(color);
        setCopiedColor(color);
        setTimeout(() => setCopiedColor(null), 2000);
    };

    const scrollToMockups = () => {
        mockupsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-slate-950 overflow-hidden flex flex-col items-center justify-center text-slate-100 perspective-1000">

            {/* Back Button - Responsive Positioning */}
            <button
                onClick={onBack}
                className={`fixed z-50 rounded-full text-white hover:bg-indigo-600 transition-colors border border-slate-700 bg-slate-900/80 backdrop-blur-md group
                top-6 left-6 p-3 hidden lg:block
                bottom-6 left-6 p-2 lg:hidden shadow-lg
                ${selectedItem ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform lg:w-5 lg:h-5 w-4 h-4" />
            </button>

            {/* Category Filters */}
            <div className={`fixed top-6 left-0 right-0 z-40 flex justify-center transition-opacity duration-300 ${selectedItem ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="max-w-[95vw] overflow-x-auto no-scrollbar px-4 py-2">
                    <PillNav
                        items={categories.map(cat => ({ label: cat, value: cat }))}
                        activeValue={activeCategory}
                        onSelect={setActiveCategory}
                        baseColor="#6366f1" // Indigo-500
                        pillColor="#0f172a" // Slate-900
                        pillTextColor="#94a3b8" // Slate-400
                        hoveredPillTextColor="#ffffff"
                    />
                </div>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black -z-20 fixed"></div>
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] -z-10 fixed"></div>

            {/* Title Background (Desktop Only) */}
            <h2 className={`hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-800/50 font-['Permanent_Marker'] text-[15vw] opacity-10 select-none pointer-events-none whitespace-nowrap z-0 transition-opacity duration-500 ${selectedItem ? 'opacity-0' : 'opacity-10'}`}>
                ALBUM
            </h2>

            {/* DESKTOP: Bounce Cards Container */}
            <div className={`hidden lg:flex absolute inset-0 items-center justify-center z-10 transition-opacity duration-500 ${selectedItem ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <BounceCards
                    images={filteredItems.map(item => item.url)}
                    containerWidth={800}
                    containerHeight={600}
                    animationDelay={0.5}
                    animationStagger={0.08}
                    transformStyles={[
                        "rotate(-20deg) translate(-480px)",
                        "rotate(-15deg) translate(-360px)",
                        "rotate(-10deg) translate(-240px)",
                        "rotate(-5deg) translate(-120px)",
                        "rotate(0deg)",
                        "rotate(5deg) translate(120px)",
                        "rotate(10deg) translate(240px)",
                        "rotate(15deg) translate(360px)",
                        "rotate(20deg) translate(480px)"
                    ]}
                    onClick={(index) => handleCardClick(filteredItems[index])}
                    imageStyles={filteredItems.map(item => item.objectPosition ? { objectPosition: item.objectPosition } : {})}
                />
            </div>

            {/* MOBILE/TABLET: Scrollable Polaroid List */}
            <div className={`lg:hidden absolute inset-0 z-10 overflow-y-auto pt-24 pb-20 px-4 transition-opacity duration-500 ${selectedItem ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-2xl mx-auto pb-12">
                    {filteredItems.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => handleCardClick(item)}
                            className={`relative bg-[#fdfbf7] p-3 pb-12 shadow-2xl transform transition-transform active:scale-95 duration-200 cursor-pointer group ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
                        >
                            {/* Tape */}
                            <Tape className={`w-24 -top-3 left-1/2 -translate-x-1/2 opacity-90 ${index % 2 === 0 ? '-rotate-2' : 'rotate-1'}`} />

                            {/* Image Container */}
                            <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden relative border border-slate-200/50">
                                <img
                                    src={item.url}
                                    alt={item.title}
                                    className="w-full h-full object-cover filter sepia-[0.1] group-hover:sepia-0 transition-all duration-500"
                                    loading="lazy"
                                />
                                <ScratchOverlay />
                            </div>

                            {/* Caption */}
                            <div className="absolute bottom-3 left-0 right-0 text-center">
                                <p className="font-['Permanent_Marker'] text-slate-800 text-xl truncate px-4">
                                    {item.title}
                                </p>
                                <p className="font-['Space_Grotesk'] text-slate-500 text-[10px] uppercase tracking-widest">
                                    {item.category}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Instruction */}
            <div className={`fixed bottom-12 text-slate-500 font-['Space_Grotesk'] text-sm tracking-widest animate-pulse pointer-events-none transition-opacity duration-300 ${selectedItem ? 'opacity-0' : 'opacity-100'}`}>
                HOVER TO REVEAL • CLICK TO VIEW
            </div>

            {/* Full Screen Detail View */}
            {selectedItem && (
                <div className="fixed inset-0 z-[200] pointer-events-auto">
                    {/* Animation Overlay (Shutter) */}
                    <div
                        id="modal-shutter"
                        className="absolute inset-0 bg-black z-[190] pointer-events-none"
                    ></div>

                    <div
                        ref={modalRef}
                        className="absolute inset-0 bg-[#050505] overflow-y-auto custom-scrollbar opacity-0 z-[200]"
                        id="modal-content"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleCloseAnimation}
                            className="fixed top-6 right-6 z-[210] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md group"
                        >
                            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        {/* Navigation Buttons (Visible on Desktop) */}
                        <button
                            onClick={() => navigateItem(-1)}
                            className="fixed top-1/2 left-6 z-[210] -translate-y-1/2 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all hidden md:block"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button
                            onClick={() => navigateItem(1)}
                            className="fixed top-1/2 right-6 z-[210] -translate-y-1/2 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all hidden md:block"
                        >
                            <ChevronRight size={32} />
                        </button>

                        <div className="min-h-screen flex flex-col">

                            {/* Standard Hero Section (Restored for ALL categories) */}
                            <div className="w-full h-screen flex flex-col md:flex-row relative">
                                {/* Left: Main Image */}
                                <div className="w-full md:w-[65%] h-[50vh] md:h-full relative bg-[#0a0a0a] flex items-center justify-center p-8 md:p-16 hero-element">
                                    {/* Paper Effect Container */}
                                    <div className="relative w-full h-full max-h-[80vh] shadow-[0_0_50px_rgba(0,0,0,0.5)] transform rotate-1 transition-transform hover:rotate-0 duration-700 group">
                                        {/* Binder Holes */}
                                        <div className="absolute top-4 left-4 md:left-8 w-4 h-4 md:w-6 md:h-6 bg-[#0a0a0a] rounded-full shadow-inner z-30"></div>
                                        <div className="absolute top-4 right-4 md:right-8 w-4 h-4 md:w-6 md:h-6 bg-[#0a0a0a] rounded-full shadow-inner z-30"></div>

                                        {/* Tape */}
                                        <Tape className="w-48 -top-6 left-1/2 -translate-x-1/2 -rotate-2 h-12" />

                                        {/* Paper Clip */}
                                        <PaperClip className="absolute -top-8 right-12 w-8 h-16 text-slate-300 rotate-12 z-40 drop-shadow-md" />

                                        <div className="w-full h-full bg-[#fdfbf7] p-2 md:p-4 pb-12 md:pb-16 shadow-2xl overflow-hidden relative">
                                            <ScratchOverlay />
                                            <div className="w-full h-full bg-gray-100 overflow-hidden relative flex items-center justify-center border border-slate-200">
                                                {(() => {
                                                    const activeMediaItem = selectedItem.media?.find(m => m.url === activeImage);
                                                    const isVideo = activeMediaItem?.type === 'video' || activeImage?.match(/\.(mp4|webm|ogg)$/i);

                                                    if (isVideo) {
                                                        return (
                                                            <video
                                                                key={activeImage}
                                                                src={activeImage || ""}
                                                                className="w-full h-full object-contain animate-in fade-in duration-700"
                                                                controls
                                                                autoPlay
                                                                loop
                                                                playsInline
                                                            />
                                                        );
                                                    } else {
                                                        return (
                                                            <img
                                                                key={activeImage}
                                                                src={activeImage || selectedItem.url}
                                                                alt={selectedItem.title}
                                                                loading="lazy"
                                                                className="w-full h-full object-contain mix-blend-multiply animate-in fade-in duration-700"
                                                            />
                                                        );
                                                    }
                                                })()}
                                            </div>
                                            <div className="absolute bottom-4 right-6 text-right">
                                                <p className="font-['Permanent_Marker'] text-slate-800 text-2xl opacity-80">0{selectedItem.id}.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Title & Intro */}
                                <div className="w-full md:w-[35%] h-[50vh] md:h-full bg-[#0f0f0f] flex flex-col justify-center p-8 md:p-16 relative border-l border-white/5 hero-element">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <h1 className="text-[12rem] font-['Space_Grotesk'] font-bold text-white leading-none overflow-hidden select-none">
                                            {String(selectedItem.id).padStart(2, '0')}
                                        </h1>
                                    </div>

                                    <div className="relative z-10">
                                        <div className="inline-block px-4 py-1.5 border border-indigo-500/50 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-['Space_Grotesk'] tracking-widest uppercase mb-6">
                                            {selectedItem.category}
                                        </div>

                                        <h2 className="text-5xl md:text-7xl font-['Permanent_Marker'] text-white leading-[0.9] mb-8">
                                            {selectedItem.title}
                                        </h2>

                                        <Scribble className="w-32 h-6 text-indigo-500 mb-8 opacity-80" />

                                        <p className="text-slate-400 font-light text-lg leading-relaxed animate-pulse">
                                            Scroll to explore
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Content Sections */}
                            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-32">

                                {/* PHOTOGRAPHY LAYOUT */}
                                {selectedItem.category === 'Photography' && (
                                    <>
                                        {/* 01. SOBRE LA TOMA */}
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start content-section">
                                            <div className="md:col-span-4">
                                                <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                                    <span className="text-indigo-500">01.</span> SOBRE LA TOMA
                                                </h3>
                                                <div className="w-full h-[1px] bg-white/10"></div>
                                            </div>
                                            <div className="md:col-span-8 space-y-8">
                                                <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                                                    {selectedItem.description}
                                                </p>

                                                {/* Camera Info Box - Paper Style */}
                                                {selectedItem.cameraInfo && (
                                                    <div className="relative bg-[#fdfbf7] p-8 pt-10 rounded-sm shadow-xl rotate-1 transition-transform hover:rotate-0 group">
                                                        <Tape className="w-32 -top-4 left-1/2 -translate-x-1/2 -rotate-1 opacity-90" />

                                                        <h3 className="text-xl font-['Permanent_Marker'] text-slate-800 mb-6 flex items-center gap-2 border-b-2 border-slate-200 pb-2">
                                                            <Camera className="text-slate-800" strokeWidth={2.5} size={20} />
                                                            LOG DE CÁMARA
                                                        </h3>

                                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
                                                            <div className="space-y-1">
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modelo</span>
                                                                <p className="text-slate-800 font-['Space_Grotesk'] font-bold">{selectedItem.cameraInfo.model}</p>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lente</span>
                                                                <p className="text-slate-800 font-['Space_Grotesk'] font-bold">{selectedItem.cameraInfo.lens}</p>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Apertura</span>
                                                                <p className="text-slate-800 font-['Space_Grotesk'] font-bold flex items-center gap-2">
                                                                    <Aperture size={14} className="text-indigo-500" /> {selectedItem.cameraInfo.aperture}
                                                                </p>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Obturador</span>
                                                                <p className="text-slate-800 font-['Space_Grotesk'] font-bold flex items-center gap-2">
                                                                    <Timer size={14} className="text-indigo-500" /> {selectedItem.cameraInfo.shutterSpeed}
                                                                </p>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ISO</span>
                                                                <p className="text-slate-800 font-['Space_Grotesk'] font-bold flex items-center gap-2">
                                                                    <Maximize2 size={14} className="text-indigo-500" /> {selectedItem.cameraInfo.iso}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Decorative stamp or signature area */}
                                                        <div className="absolute bottom-4 right-6 opacity-10 rotate-12 pointer-events-none">
                                                            <div className="border-2 border-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
                                                                <span className="font-['Permanent_Marker'] text-xs text-slate-900">APPROVED</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* 02. ÁLBUM DE FOTOS */}
                                        <div className="space-y-8 content-section">
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                                                <div className="md:col-span-4">
                                                    <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                                        <span className="text-indigo-500">02.</span> ÁLBUM DE FOTOS
                                                    </h3>
                                                    <div className="w-full h-[1px] bg-white/10"></div>
                                                </div>
                                            </div>

                                            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 pt-8">
                                                {/* Main Image */}
                                                <div className="break-inside-avoid relative group">
                                                    <div className="bg-white p-4 pb-16 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-300 transform-gpu relative">
                                                        <Tape className="w-32 -top-4 left-1/2 -translate-x-1/2 -rotate-2 opacity-90" />
                                                        <div className="w-full bg-gray-100 overflow-hidden relative">
                                                            <img src={selectedItem.url} alt={selectedItem.title} className="w-full h-auto object-contain" />
                                                            <ScratchOverlay />
                                                        </div>
                                                        <div className="mt-4 font-['Handlee'] text-slate-800 text-xl text-center">
                                                            {selectedItem.title}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Media Images */}
                                                {selectedItem.media?.map((mediaItem, idx) => (
                                                    <div key={idx} className="break-inside-avoid relative group">
                                                        <div className={`bg-white p-4 pb-16 shadow-2xl transition-transform duration-300 transform-gpu hover:z-10 hover:scale-105 ${idx % 2 === 0 ? '-rotate-2' : 'rotate-2'} hover:rotate-0 relative`}>
                                                            <Tape className={`w-28 -top-3 left-1/2 -translate-x-1/2 opacity-90 ${idx % 2 === 0 ? 'rotate-1' : '-rotate-3'}`} />
                                                            <div className="w-full bg-gray-100 overflow-hidden relative">
                                                                {mediaItem.type === 'video' ? (
                                                                    <video src={mediaItem.url} className="w-full h-auto object-contain" muted loop autoPlay playsInline />
                                                                ) : (
                                                                    <img src={mediaItem.url} alt="" className="w-full h-auto object-contain" />
                                                                )}
                                                                <ScratchOverlay />
                                                            </div>
                                                            <div className="mt-4 font-['Handlee'] text-slate-800 text-xl text-center">
                                                                Captura #{idx + 1}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* DESIGN CATEGORY LAYOUT */}
                                {selectedItem.category === 'Design' && selectedItem.bentoData && (
                                    <>
                                        {/* 01. DESIGN SYSTEM (Bento) */}
                                        <div className="content-section">
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-12">
                                                <div className="md:col-span-4">
                                                    <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                                        <span className="text-indigo-500">01.</span> DESIGN SYSTEM
                                                    </h3>
                                                    <div className="w-full h-[1px] bg-white/10"></div>
                                                </div>
                                            </div>

                                            <div className="w-full">
                                                <MagicBento
                                                    cards={selectedItem.bentoData.map(card => ({
                                                        ...card,
                                                        onClick: card.title === 'View Mockups' ? scrollToMockups : undefined
                                                    }))}
                                                    textAutoHide={true}
                                                    enableStars={true}
                                                    enableSpotlight={true}
                                                    enableBorderGlow={true}
                                                    enableTilt={true}
                                                    enableMagnetism={true}
                                                    clickEffect={true}
                                                    spotlightRadius={300}
                                                    particleCount={12}
                                                    glowColor="132, 0, 255"
                                                />
                                            </div>
                                        </div>

                                        {/* 02. THE STORY */}
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start content-section">
                                            <div className="md:col-span-4">
                                                <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                                    <span className="text-indigo-500">02.</span> THE STORY
                                                </h3>
                                                <div className="w-full h-[1px] bg-white/10"></div>
                                            </div>
                                            <div className="md:col-span-8">
                                                <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                                                    {selectedItem.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* 03. SPECS */}
                                        {selectedItem.technicalInfo && (
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start content-section">
                                                <div className="md:col-span-4">
                                                    <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                                        <span className="text-indigo-500">03.</span> SPECS
                                                    </h3>
                                                    <div className="w-full h-[1px] bg-white/10"></div>
                                                </div>
                                                <div className="md:col-span-8">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                                        {Object.entries(selectedItem.technicalInfo).map(([key, value]) => (
                                                            <div key={key} className="bg-white/5 p-6 rounded-lg border border-white/5 hover:border-indigo-500/30 transition-colors">
                                                                <h4 className="text-indigo-400 uppercase tracking-widest text-xs mb-2 font-bold">{key}</h4>
                                                                <p className="text-slate-200 font-['Space_Grotesk'] text-lg">{value}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* 04. MOCKUPS */}
                                        {selectedItem.mockups && (
                                            <div ref={mockupsRef} className="space-y-24 pt-12">
                                                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start content-section">
                                                    <div className="md:col-span-4">
                                                        <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                                            <span className="text-indigo-500">04.</span> MOCKUPS
                                                        </h3>
                                                        <div className="w-full h-[1px] bg-white/10"></div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 gap-16">
                                                    {selectedItem.mockups.map((mockup, idx) => (
                                                        <div key={idx} className="group relative">
                                                            <div className="relative overflow-hidden rounded-xl shadow-2xl border border-white/10 bg-slate-900">
                                                                <img
                                                                    src={mockup.url}
                                                                    alt={mockup.title}
                                                                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                                                    <h4 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{mockup.title}</h4>
                                                                    <p className="text-slate-300 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{mockup.description}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* STANDARD LAYOUT (For anything NOT Design AND NOT Photography) */}
                                {selectedItem.category !== 'Design' && selectedItem.category !== 'Photography' && (
                                    <>
                                        {/* 01. THE STORY */}
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start content-section">
                                            <div className="md:col-span-4">
                                                <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                                    <span className="text-indigo-500">01.</span> THE STORY
                                                </h3>
                                                <div className="w-full h-[1px] bg-white/10"></div>
                                            </div>
                                            <div className="md:col-span-8">
                                                <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                                                    {selectedItem.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* 02. SPECS (if exists) */}
                                        {selectedItem.technicalInfo && (
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start content-section">
                                                <div className="md:col-span-4">
                                                    <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                                        <span className="text-indigo-500">02.</span> SPECS
                                                    </h3>
                                                    <div className="w-full h-[1px] bg-white/10"></div>
                                                </div>
                                                <div className="md:col-span-8">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                                        {Object.entries(selectedItem.technicalInfo).map(([key, value]) => (
                                                            <div key={key} className="bg-white/5 p-6 rounded-lg border border-white/5 hover:border-indigo-500/30 transition-colors">
                                                                <h4 className="text-indigo-400 uppercase tracking-widest text-xs mb-2 font-bold">{key}</h4>
                                                                <p className="text-slate-200 font-['Space_Grotesk'] text-lg">{value}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* 03/02. PALETTE */}
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start content-section">
                                            <div className="md:col-span-4">
                                                <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                                    <span className="text-indigo-500">{selectedItem.technicalInfo ? '03.' : '02.'}</span> PALETTE
                                                </h3>
                                                <div className="w-full h-[1px] bg-white/10"></div>
                                            </div>
                                            <div className="md:col-span-8">
                                                <div className="flex flex-wrap gap-6">
                                                    {palette.length > 0 ? (
                                                        palette.map((color, index) => (
                                                            <div key={index} className="group relative">
                                                                <button
                                                                    onClick={() => handleCopyColor(color)}
                                                                    className="w-24 h-36 bg-white rounded-lg shadow-xl hover:-translate-y-2 transition-transform duration-300 flex flex-col relative overflow-hidden"
                                                                >
                                                                    {/* Color Area */}
                                                                    <div
                                                                        className="w-full h-24 relative"
                                                                        style={{ backgroundColor: color }}
                                                                    >
                                                                        <ScratchOverlay />
                                                                    </div>

                                                                    {/* Info Area */}
                                                                    <div className="flex-grow flex flex-col justify-center items-center bg-[#fdfbf7] border-t border-slate-100">
                                                                        <span className="text-slate-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                                                                            {color}
                                                                        </span>
                                                                    </div>

                                                                    {/* Hole Punch */}
                                                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#050505] rounded-full shadow-inner border border-white/10"></div>

                                                                    {/* Copied Feedback */}
                                                                    {copiedColor === color && (
                                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10">
                                                                            <Check className="text-white drop-shadow-md" />
                                                                        </div>
                                                                    )}
                                                                </button>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="flex gap-4">
                                                            {[1, 2, 3, 4, 5].map(i => (
                                                                <div key={i} className="w-24 h-36 rounded-lg bg-slate-800 animate-pulse" />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 04/03. ASSETS */}
                                        {selectedItem.media && selectedItem.media.length > 0 && (
                                            <div className="space-y-24">
                                                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start content-section">
                                                    <div className="md:col-span-4">
                                                        <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                                            <span className="text-indigo-500">{selectedItem.technicalInfo ? '04.' : '03.'}</span> ASSETS
                                                        </h3>
                                                        <div className="w-full h-[1px] bg-white/10"></div>
                                                    </div>
                                                </div>

                                                {selectedItem.media.map((mediaItem, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center content-section`}
                                                    >
                                                        {/* Image Side */}
                                                        <div className="w-full md:w-2/3 relative group cursor-pointer" onClick={() => {
                                                            setActiveImage(mediaItem.url);
                                                            if (modalRef.current) {
                                                                modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                                                            }
                                                        }}>
                                                            <div className={`relative bg-white p-3 md:p-4 shadow-2xl transform transition-transform duration-500 hover:scale-[1.02] ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                                                                {/* Decorative Elements */}
                                                                <PaperClip className={`absolute -top-6 ${idx % 2 === 0 ? 'right-12' : 'left-12'} w-8 h-16 text-slate-400 z-20`} />
                                                                <Tape className={`w-32 -bottom-4 ${idx % 2 === 0 ? 'left-1/2' : 'right-1/2'} rotate-2`} />
                                                                <ScratchOverlay />

                                                                <div className="w-full bg-gray-100 overflow-hidden relative border border-slate-200">
                                                                    {mediaItem.type === 'video' ? (
                                                                        <div className="w-full aspect-video relative flex items-center justify-center bg-black">
                                                                            <video
                                                                                src={mediaItem.url}
                                                                                className="w-full h-full object-cover opacity-90"
                                                                                muted
                                                                                loop
                                                                                playsInline
                                                                            />
                                                                            <PlayCircle className="absolute text-white/70 w-16 h-16" />
                                                                        </div>
                                                                    ) : (
                                                                        <img src={mediaItem.url} alt="" loading="lazy" className="w-full h-auto object-contain mix-blend-multiply" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Text Side */}
                                                        <div className="w-full md:w-1/3 space-y-6">
                                                            <div className="flex items-center gap-4">
                                                                <span className="text-6xl font-['Permanent_Marker'] text-slate-700 opacity-20">0{idx + 1}</span>
                                                                <div className="h-[1px] flex-grow bg-white/10"></div>
                                                            </div>
                                                            <h4 className="text-2xl font-['Space_Grotesk'] text-white font-bold">
                                                                {mediaItem.type === 'video' ? 'Motion Process' : 'Visual Concept'}
                                                            </h4>
                                                            <p className="text-slate-400 font-light leading-relaxed font-['Handlee'] text-lg italic">
                                                                "Exploring the depths of the design through {mediaItem.type === 'video' ? 'motion and dynamics' : 'visual composition and color'}. Every detail counts in the final render."
                                                            </p>
                                                            <div className="flex gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                                                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                                                                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Footer */}
                                <div className="py-12 border-t border-white/5 text-center text-slate-500 font-['Space_Grotesk'] text-sm tracking-widest">
                                    BONIALEART PORTFOLIO • 2024
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArtisticGallery;
