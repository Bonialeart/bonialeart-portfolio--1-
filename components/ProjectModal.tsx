import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, Camera, Aperture, Timer, Maximize2, Check, PlayCircle } from 'lucide-react';
import MagicBento from './MagicBento';
import { CATEGORY_TRANSLATIONS } from '../constants';
import { GalleryItem } from '../types';
import { extractColorsFromUrl } from '../utils/colorUtils';

gsap.registerPlugin(ScrollTrigger);

// --- SVG Assets ---
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

interface ProjectModalProps {
    item: GalleryItem;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
    hasNext?: boolean;
    hasPrev?: boolean;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ item, onClose, onNext, onPrev, hasNext, hasPrev }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const mockupsRef = useRef<HTMLDivElement>(null);
    const [activeImage, setActiveImage] = useState<string | null>(item.url);
    const [palette, setPalette] = useState<string[]>([]);
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    // Update active image when item changes
    useEffect(() => {
        setActiveImage(item.url);
        // Extract colors
        extractColorsFromUrl(item.url).then(colors => setPalette(colors)).catch(e => console.warn(e));
    }, [item]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // Animation on Mount
    useLayoutEffect(() => {
        if (modalRef.current) {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline();

                // 1. Overlay Fade In
                tl.fromTo('#modal-shutter',
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3, ease: "power2.inOut" }
                );

                // 2. Circular Reveal
                tl.fromTo(modalRef.current,
                    { clipPath: "circle(0% at 50% 50%)", opacity: 1 },
                    { clipPath: "circle(150% at 50% 50%)", duration: 1.2, ease: "expo.inOut" },
                    "-=0.1"
                );

                // 3. Staggered Content Entry
                tl.from('.hero-element', {
                    y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out"
                }, "-=0.8");

                // 4. Scroll Animations removed to ensure visibility
                // Content sections will render normally without being hidden by GSAP
            }, modalRef);

            return () => ctx.revert();
        }
    }, [item.id]); // Re-run when item changes to re-trigger animations if specific to new content, though usually we want to just swap content. 
    // Actually, for a completely new modal feel on nav, we might want to re-run. 
    // But if we are just switching items, maybe we want a different transition?
    // For now, let's keep it simple: it re-runs the entry animation which might feel a bit heavy but ensures it works.

    const handleCloseAnimation = () => {
        if (!modalRef.current) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    onClose();
                }
            });
            tl.to(modalRef.current, { clipPath: "circle(0% at 50% 50%)", duration: 0.8, ease: "expo.inOut" });
            tl.to('#modal-shutter', { opacity: 0, duration: 0.3 }, "-=0.3");
        }, modalRef);
    };

    const handleCopyColor = (color: string) => {
        navigator.clipboard.writeText(color);
        setCopiedColor(color);
        setTimeout(() => setCopiedColor(null), 2000);
    };

    const scrollToMockups = () => {
        mockupsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleCloseAnimation();
            if (e.key === 'ArrowLeft' && onPrev) onPrev();
            if (e.key === 'ArrowRight' && onNext) onNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onNext, onPrev]);


    const renderContent = () => {
        return (
            <div className="min-h-screen flex flex-col">
                {/* Standard Hero Section */}
                <div className="w-full h-screen flex flex-col md:flex-row relative">
                    {/* Left: Main Image */}
                    <div className="w-full md:w-[65%] h-[50vh] md:h-full relative bg-[#0a0a0a] flex items-center justify-center p-8 md:p-16 hero-element">
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
                                        const activeMediaItem = item.media?.find(m => m.url === activeImage);
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
                                                    src={activeImage || item.url}
                                                    alt={item.title}
                                                    loading="lazy"
                                                    className="w-full h-full object-contain mix-blend-multiply animate-in fade-in duration-700"
                                                />
                                            );
                                        }
                                    })()}
                                </div>
                                <div className="absolute bottom-4 right-6 text-right">
                                    <p className="font-['Permanent_Marker'] text-slate-800 text-2xl opacity-80">0{item.id}.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Title & Intro */}
                    <div className="w-full md:w-[35%] h-[50vh] md:h-full bg-[#0f0f0f] flex flex-col justify-center p-8 md:p-16 relative border-l border-white/5 hero-element">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <h1 className="text-[12rem] font-['Space_Grotesk'] font-bold text-white leading-none overflow-hidden select-none">
                                {String(item.id).padStart(2, '0')}
                            </h1>
                        </div>

                        <div className="relative z-10">
                            <div className="inline-block px-4 py-1.5 border border-indigo-500/50 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-['Space_Grotesk'] tracking-widest uppercase mb-6">
                                {CATEGORY_TRANSLATIONS[item.category] || item.category}
                            </div>

                            <h2 className="text-5xl md:text-7xl font-['Permanent_Marker'] text-white leading-[0.9] mb-8">
                                {item.title}
                            </h2>

                            <Scribble className="w-32 h-6 text-indigo-500 mb-8 opacity-80" />

                            <p className="text-slate-400 font-light text-lg leading-relaxed animate-pulse">
                                Desliza para explorar
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-32">

                    {/* PHOTOGRAPHY LAYOUT */}
                    {item.category === 'Photography' && (
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
                                        {item.description}
                                    </p>

                                    {/* Camera Info Box */}
                                    {item.cameraInfo && (
                                        <div className="relative bg-[#fdfbf7] p-8 pt-10 rounded-sm shadow-xl rotate-1 transition-transform hover:rotate-0 group">
                                            <Tape className="w-32 -top-4 left-1/2 -translate-x-1/2 -rotate-1 opacity-90" />
                                            <h3 className="text-xl font-['Permanent_Marker'] text-slate-800 mb-6 flex items-center gap-2 border-b-2 border-slate-200 pb-2">
                                                <Camera className="text-slate-800" strokeWidth={2.5} size={20} />
                                                LOG DE CÁMARA
                                            </h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modelo</span>
                                                    <p className="text-slate-800 font-['Space_Grotesk'] font-bold">{item.cameraInfo.model}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lente</span>
                                                    <p className="text-slate-800 font-['Space_Grotesk'] font-bold">{item.cameraInfo.lens}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Apertura</span>
                                                    <p className="text-slate-800 font-['Space_Grotesk'] font-bold flex items-center gap-2">
                                                        <Aperture size={14} className="text-indigo-500" /> {item.cameraInfo.aperture}
                                                    </p>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Obturador</span>
                                                    <p className="text-slate-800 font-['Space_Grotesk'] font-bold flex items-center gap-2">
                                                        <Timer size={14} className="text-indigo-500" /> {item.cameraInfo.shutterSpeed}
                                                    </p>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ISO</span>
                                                    <p className="text-slate-800 font-['Space_Grotesk'] font-bold flex items-center gap-2">
                                                        <Maximize2 size={14} className="text-indigo-500" /> {item.cameraInfo.iso}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-4 right-6 opacity-10 rotate-12 pointer-events-none">
                                                <div className="border-2 border-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
                                                    <span className="font-['Permanent_Marker'] text-xs text-slate-900">APROBADO</span>
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
                                                <img src={item.url} alt={item.title} className="w-full h-auto object-contain" />
                                                <ScratchOverlay />
                                            </div>
                                            <div className="mt-4 font-['Handlee'] text-slate-800 text-xl text-center">{item.title}</div>
                                        </div>
                                    </div>
                                    {/* Media Images */}
                                    {item.media?.map((mediaItem, idx) => (
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
                                                <div className="mt-4 font-['Handlee'] text-slate-800 text-xl text-center">Captura #{idx + 1}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* DESIGN CATEGORY LAYOUT */}
                    {item.category === 'Design' && item.bentoData && (
                        <>
                            {/* 01. SISTEMA DE DISEÑO (Bento) */}
                            <div className="content-section">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-12">
                                    <div className="md:col-span-4">
                                        <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                            <span className="text-indigo-500">01.</span> SISTEMA DE DISEÑO
                                        </h3>
                                        <div className="w-full h-[1px] bg-white/10"></div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <MagicBento
                                        cards={item.bentoData.map(card => ({
                                            ...card,
                                            onClick: card.title === 'Ver Mockups' ? scrollToMockups : undefined
                                        }))}
                                    />
                                </div>
                            </div>

                            {/* 02. LA HISTORIA */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start content-section">
                                <div className="md:col-span-4">
                                    <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="text-indigo-500">02.</span> LA HISTORIA
                                    </h3>
                                    <div className="w-full h-[1px] bg-white/10"></div>
                                </div>
                                <div className="md:col-span-8">
                                    <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* 03. ESPECIFICACIONES */}
                            {item.technicalInfo && (
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start content-section">
                                    <div className="md:col-span-4">
                                        <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                            <span className="text-indigo-500">03.</span> ESPECIFICACIONES
                                        </h3>
                                        <div className="w-full h-[1px] bg-white/10"></div>
                                    </div>
                                    <div className="md:col-span-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            {Object.entries(item.technicalInfo).map(([key, value]) => (
                                                <div key={key} className="bg-white/5 p-6 rounded-lg border border-white/5 hover:border-indigo-500/30 transition-colors">
                                                    <h4 className="text-indigo-400 uppercase tracking-widest text-xs mb-2 font-bold">
                                                        {key === 'software' ? 'Software' : key === 'year' ? 'Año' : key === 'dimensions' ? 'Dimensiones' : key === 'technique' ? 'Técnica' : key}
                                                    </h4>
                                                    <p className="text-slate-200 font-['Space_Grotesk'] text-lg">{value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 04. EXPLORACIÓN CREATIVA */}
                            {item.process && (
                                <div className="space-y-24 content-section mb-24">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                                        <div className="md:col-span-4">
                                            <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                                <span className="text-indigo-500">04.</span> EXPLORACIÓN
                                            </h3>
                                            <div className="w-full h-[1px] bg-white/10"></div>
                                        </div>
                                        <div className="md:col-span-8">
                                            <p className="text-xl text-slate-300 font-light leading-relaxed mb-12">
                                                El camino hacia la identidad final involucró la exploración de diversas metáforas visuales.
                                            </p>
                                            <div className="space-y-20">
                                                {item.process.map((proc, idx) => (
                                                    <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                                                        <div className="w-full lg:w-1/2 relative group z-10 hover:z-50 transition-all duration-300">
                                                            <div className={`relative bg-[#fdfbf7] p-3 pb-8 shadow-xl transform transition-transform duration-500 hover:scale-[1.5] cursor-zoom-in ${idx % 2 === 0 ? 'rotate-2 hover:rotate-0' : '-rotate-2 hover:rotate-0'}`}>
                                                                <Tape className={`w-32 -top-3 left-1/2 -translate-x-1/2 opacity-90 ${idx % 2 === 0 ? '-rotate-2' : 'rotate-1'}`} />
                                                                <div className="w-full aspect-[4/3] bg-slate-100 overflow-hidden relative border border-slate-200">
                                                                    <img src={proc.url} alt={proc.title} className="w-full h-full object-contain p-4 opacity-90 mix-blend-multiply" />
                                                                    <ScratchOverlay />
                                                                </div>
                                                                <div className="absolute bottom-2 right-4 text-slate-400 font-['Permanent_Marker'] text-xs opacity-50">v.{idx + 1}</div>
                                                            </div>
                                                        </div>
                                                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                                                            <div className="inline-block px-3 py-1 mb-4 border rounded-full text-[10px] font-bold tracking-widest uppercase border-indigo-500/30 text-indigo-400 bg-indigo-500/10">
                                                                Prototipo {String(idx + 1).padStart(2, '0')}
                                                            </div>
                                                            <h4 className="text-2xl md:text-3xl font-['Permanent_Marker'] text-white mb-4">{proc.title}</h4>
                                                            <p className="text-slate-300 font-['Space_Grotesk'] text-lg leading-relaxed opacity-90">{proc.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 05. MOCKUPS */}
                            {item.mockups && (
                                <div ref={mockupsRef} className="space-y-24 pt-12">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start content-section">
                                        <div className="md:col-span-4">
                                            <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                                <span className="text-indigo-500">05.</span> MOCKUPS
                                            </h3>
                                            <div className="w-full h-[1px] bg-white/10"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-16">
                                        {item.mockups.map((mockup, idx) => (
                                            <div key={idx} className="group relative">
                                                <div className="relative overflow-hidden rounded-xl shadow-2xl border border-white/10 bg-slate-900">
                                                    <img src={mockup.url} alt={mockup.title} className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" />
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

                    {/* STANDARD LAYOUT (NOT Design AND NOT Photography) */}
                    {item.category !== 'Design' && item.category !== 'Photography' && (
                        <>
                            {/* 01. LA HISTORIA */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start content-section">
                                <div className="md:col-span-4">
                                    <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="text-indigo-500">01.</span> LA HISTORIA
                                    </h3>
                                    <div className="w-full h-[1px] bg-white/10"></div>
                                </div>
                                <div className="md:col-span-8">
                                    <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* 02. ESPECIFICACIONES (if exists) */}
                            {item.technicalInfo && (
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start content-section">
                                    <div className="md:col-span-4">
                                        <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                            <span className="text-indigo-500">02.</span> ESPECIFICACIONES
                                        </h3>
                                        <div className="w-full h-[1px] bg-white/10"></div>
                                    </div>
                                    <div className="md:col-span-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            {Object.entries(item.technicalInfo).map(([key, value]) => (
                                                <div key={key} className="bg-white/5 p-6 rounded-lg border border-white/5 hover:border-indigo-500/30 transition-colors">
                                                    <h4 className="text-indigo-400 uppercase tracking-widest text-xs mb-2 font-bold">{key}</h4>
                                                    <p className="text-slate-200 font-['Space_Grotesk'] text-lg">{value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 03/02. PALETA */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start content-section">
                                <div className="md:col-span-4">
                                    <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="text-indigo-500">{item.technicalInfo ? '03.' : '02.'}</span> PALETA
                                    </h3>
                                    <div className="w-full h-[1px] bg-white/10"></div>
                                </div>
                                <div className="md:col-span-8">
                                    <div className="flex flex-wrap gap-6">
                                        {palette.length > 0 ? (
                                            palette.map((color, index) => (
                                                <div key={index} className="relative group/palette">
                                                    <button
                                                        onClick={() => handleCopyColor(color)}
                                                        className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/10 shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center hover:border-white/40"
                                                        style={{ backgroundColor: color }}
                                                    >
                                                        {copiedColor === color && <Check className="text-white drop-shadow-md" />}
                                                    </button>
                                                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-slate-400 opacity-0 group-hover/palette:opacity-100 transition-opacity">
                                                        {color}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-slate-500 font-mono">Analizando colores...</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* 04/03. ACTIVOS */}
                            {item.media && item.media.length > 0 && (
                                <div className="space-y-24 content-section mt-12 pb-24">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                                        <div className="md:col-span-4">
                                            <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                                <span className="text-indigo-500">{item.technicalInfo ? '04.' : '03.'}</span> ACTIVOS
                                            </h3>
                                            <div className="w-full h-[1px] bg-white/10"></div>
                                        </div>
                                    </div>

                                    {item.media.map((mediaItem, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
                                        >
                                            {/* Image Side */}
                                            <div className="w-full md:w-2/3 relative group cursor-pointer" onClick={() => {
                                                setActiveImage(mediaItem.url);
                                                if (modalRef.current) {
                                                    modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                                                }
                                            }}>
                                                <div className={`relative bg-white p-3 shadow-2xl transition-all duration-300 transform-gpu group-hover:scale-[1.02] ${idx % 2 === 0 ? 'rotate-1 group-hover:rotate-0' : '-rotate-1 group-hover:rotate-0'}`}>
                                                    <Tape className={`w-32 -top-4 left-1/2 -translate-x-1/2 opacity-90 ${idx % 2 === 0 ? '-rotate-2' : 'rotate-2'}`} />
                                                    <div className="w-full bg-gray-100 overflow-hidden relative border border-slate-200">
                                                        {mediaItem.type === 'video' ? (
                                                            <>
                                                                <video
                                                                    src={mediaItem.url}
                                                                    className="w-full h-auto object-contain filter contrast-125 hover:contrast-100 transition-all duration-500"
                                                                    muted
                                                                    loop
                                                                    autoPlay
                                                                    playsInline
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-all pointer-events-none">
                                                                    <PlayCircle className="text-white opacity-80 group-hover:opacity-0 transition-opacity drop-shadow-lg" size={48} />
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <img
                                                                src={mediaItem.url}
                                                                alt=""
                                                                className="w-full h-auto object-contain filter contrast-125 hover:contrast-100 transition-all duration-500"
                                                                loading="lazy"
                                                            />
                                                        )}
                                                        <ScratchOverlay />
                                                    </div>
                                                    <div className="absolute -bottom-10 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <span className="font-['Permanent_Marker'] text-slate-500">Ver en detalle</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Text Side */}
                                            <div className="w-full md:w-1/3 space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-5xl font-['Permanent_Marker'] text-indigo-500/50">{String(idx + 1).padStart(2, '0')}</span>
                                                    <div className="h-[2px] w-12 bg-indigo-500/30"></div>
                                                </div>
                                                <h4 className="text-2xl font-bold text-white">Vista Detallada</h4>
                                                <p className="text-slate-400 font-light leading-relaxed">
                                                    Exploración visual de los detalles y composición de la obra.
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    };


    return (
        <div className="fixed inset-0 z-[200] pointer-events-auto">
            {/* Shutter Overlay */}
            <div id="modal-shutter" className="absolute inset-0 bg-black z-[190] pointer-events-none"></div>

            {/* Main Modal Container */}
            <div
                ref={modalRef}
                className="absolute inset-0 bg-[#050505] overflow-y-auto custom-scrollbar opacity-0 z-[200]"
            >
                {/* Close Button */}
                <button
                    onClick={handleCloseAnimation}
                    className="fixed top-6 right-6 z-[210] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md group"
                >
                    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Navigation Buttons (Desktop) */}
                {hasPrev && (
                    <button
                        onClick={onPrev}
                        className="fixed top-1/2 left-6 z-[210] -translate-y-1/2 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all hidden md:block"
                    >
                        <ChevronLeft size={32} />
                    </button>
                )}
                {hasNext && (
                    <button
                        onClick={onNext}
                        className="fixed top-1/2 right-6 z-[210] -translate-y-1/2 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all hidden md:block"
                    >
                        <ChevronRight size={32} />
                    </button>
                )}

                {renderContent()}
            </div>
        </div>
    );
};

export default ProjectModal;
