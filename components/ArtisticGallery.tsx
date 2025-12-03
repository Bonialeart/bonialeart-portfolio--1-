
import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from "gsap/Draggable";
import { GALLERY_ITEMS } from '../constants';
import { ArrowLeft, X, PlayCircle, Check } from 'lucide-react';
import { extractColorsFromUrl } from '../utils/colorUtils';

// Register GSAP Plugins
gsap.registerPlugin(Draggable);

// --- SVG Assets for Handmade Feel ---
const PaperClip = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 50" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 42V10a6 6 0 0 0-12 0v28a2 2 0 0 0 4 0V12" />
        <path d="M8 12v26a2 2 0 0 0 4 0V10" strokeOpacity="0.5" />
    </svg>
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
    const [selectedItem, setSelectedItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [palette, setPalette] = useState<string[]>([]);
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    // Initial Animation & Draggable Setup
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.gallery-card') as HTMLElement[];

            gsap.set(cards, {
                x: 0,
                y: window.innerHeight + 200,
                rotate: 0,
                scale: 0.8,
                opacity: 0
            });

            cards.forEach((card, i) => {
                const angle = gsap.utils.random(-15, 15);
                const x = gsap.utils.random(-200, 200);
                const y = gsap.utils.random(-100, 100);

                gsap.to(card, {
                    x: x,
                    y: y,
                    rotate: angle,
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "power4.out",
                    delay: i * 0.1,
                    onComplete: () => {
                        gsap.to(card, {
                            y: `+=${gsap.utils.random(-10, 10)}`,
                            duration: gsap.utils.random(2, 4),
                            repeat: -1,
                            yoyo: true,
                            ease: "sine.inOut"
                        });
                    }
                });
            });

            Draggable.create(cards, {
                type: "x,y",
                edgeResistance: 0.65,
                bounds: containerRef.current,
                inertia: true,
                zIndexBoost: true,
                onPress: function () {
                    gsap.killTweensOf(this.target, "y");
                    gsap.to(this.target, { scale: 1.1, rotate: 0, duration: 0.2, overwrite: true, boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.6)" });
                },
                onRelease: function () {
                    gsap.to(this.target, { scale: 1, duration: 0.2, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" });
                },
                onClick: function () {
                    const id = this.target.getAttribute('data-id');
                    const item = GALLERY_ITEMS.find(i => i.id === Number(id));
                    if (item) {
                        handleCardClick(item);
                    }
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Modal Entrance Animation
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

                // 3. Staggered Content Entry
                tl.from('.hero-element', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out"
                }, "-=0.8");

            }, modalRef); // Scope to modalRef

            return () => ctx.revert();
        }
    }, [selectedItem]);

    const handleCardClick = async (item: typeof GALLERY_ITEMS[0]) => {
        if (selectedItem) return;
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

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-slate-950 overflow-hidden flex flex-col items-center justify-center text-slate-100 perspective-1000">

            {/* Back Button */}
            <button
                onClick={onBack}
                className={`fixed top-6 left-6 z-50 p-3 bg-slate-900/80 backdrop-blur-md rounded-full text-white hover:bg-indigo-600 transition-colors border border-slate-700 group ${selectedItem ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black -z-20"></div>
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] -z-10"></div>

            {/* Title Background */}
            <h2 className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-800/50 font-['Permanent_Marker'] text-[15vw] opacity-10 select-none pointer-events-none whitespace-nowrap z-0 transition-opacity duration-500 ${selectedItem ? 'opacity-0' : 'opacity-10'}`}>
                ALBUM
            </h2>

            {/* Cards Container */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${selectedItem ? 'opacity-0' : 'opacity-100'}`}>
                <div className="w-full h-full flex items-center justify-center">
                    {GALLERY_ITEMS.map((item) => {
                        const isWide = item.id === 2;
                        return (
                            <div
                                key={item.id}
                                data-id={item.id}
                                className={`gallery-card absolute bg-white p-3 pb-12 shadow-2xl cursor-grab active:cursor-grabbing pointer-events-auto transform-gpu will-change-transform hover:z-10 ${isWide ? 'w-80 md:w-[28rem] aspect-video' : 'w-64 md:w-80 aspect-[3/4]'}`}
                            >
                                <div className="w-full h-full bg-gray-100 overflow-hidden border border-gray-200 relative pointer-events-none">
                                    <img src={item.url} alt={item.title} loading="lazy" className="w-full h-full object-cover pointer-events-none" />
                                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors"></div>
                                </div>
                                <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
                                    <p className="font-['Permanent_Marker'] text-slate-900 text-lg truncate px-4">{item.title}</p>
                                    <p className="font-['Space_Grotesk'] text-slate-500 text-[10px] uppercase tracking-widest">{item.category}</p>
                                </div>
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#e2d5b5]/90 backdrop-blur-sm rotate-1 shadow-sm opacity-90 pointer-events-none"></div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Instruction */}
            <div className={`fixed bottom-12 text-slate-500 font-['Space_Grotesk'] text-sm tracking-widest animate-pulse pointer-events-none transition-opacity duration-300 ${selectedItem ? 'opacity-0' : 'opacity-100'}`}>
                DRAG TO ARRANGE • CLICK TO VIEW
            </div>

            {/* Full Screen Detail View */}
            {selectedItem && (
                <div className="fixed inset-0 z-[60] pointer-events-auto">
                    {/* Animation Overlay (Shutter) */}
                    <div
                        id="modal-shutter"
                        className="absolute inset-0 bg-black z-50 pointer-events-none"
                    ></div>

                    <div
                        ref={modalRef}
                        className="absolute inset-0 bg-[#050505] overflow-y-auto custom-scrollbar opacity-0 z-[60]"
                        id="modal-content"
                    >
                        <button
                            onClick={handleCloseAnimation}
                            className="fixed top-6 right-6 z-[70] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md group"
                        >
                            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        <div className="min-h-screen flex flex-col">

                            {/* Hero Section */}
                            <div className="w-full h-screen flex flex-col md:flex-row relative">
                                {/* Left: Main Image */}
                                <div className="w-full md:w-[65%] h-[50vh] md:h-full relative bg-[#0a0a0a] flex items-center justify-center p-8 md:p-16 hero-element">
                                    {/* Paper Effect Container */}
                                    <div className="relative w-full h-full max-h-[80vh] shadow-[0_0_50px_rgba(0,0,0,0.5)] transform rotate-1 transition-transform hover:rotate-0 duration-700 group">
                                        {/* Binder Holes */}
                                        <div className="absolute top-4 left-4 md:left-8 w-4 h-4 md:w-6 md:h-6 bg-[#0a0a0a] rounded-full shadow-inner z-30"></div>
                                        <div className="absolute top-4 right-4 md:right-8 w-4 h-4 md:w-6 md:h-6 bg-[#0a0a0a] rounded-full shadow-inner z-30"></div>

                                        {/* Tape */}
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-12 bg-[#e2d5b5]/90 backdrop-blur-sm -rotate-2 shadow-lg z-20"></div>

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

                                {/* Description */}
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

                                {/* Palette */}
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start content-section">
                                    <div className="md:col-span-4">
                                        <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                            <span className="text-indigo-500">02.</span> PALETTE
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
                                                            className="w-24 h-32 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-end pb-4 border border-white/5 relative overflow-hidden"
                                                            style={{ backgroundColor: color }}
                                                        >
                                                            <span className="bg-black/20 backdrop-blur-sm text-white text-xs font-mono px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                                {color}
                                                            </span>
                                                            {copiedColor === color && (
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                                                                    <Check className="text-white" />
                                                                </div>
                                                            )}
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="flex gap-4">
                                                    {[1, 2, 3, 4, 5].map(i => (
                                                        <div key={i} className="w-24 h-32 rounded-lg bg-slate-800 animate-pulse" />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Magazine Style Assets */}
                                {selectedItem.media && selectedItem.media.length > 0 && (
                                    <div className="space-y-24">
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start content-section">
                                            <div className="md:col-span-4">
                                                <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4 flex items-center gap-3">
                                                    <span className="text-indigo-500">03.</span> ASSETS
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
                                                    // Scroll to top of the modal container
                                                    if (modalRef.current) {
                                                        modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }
                                                }}>
                                                    <div className={`relative bg-white p-3 md:p-4 shadow-2xl transform transition-transform duration-500 hover:scale-[1.02] ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                                                        {/* Decorative Elements */}
                                                        <PaperClip className={`absolute -top-6 ${idx % 2 === 0 ? 'right-12' : 'left-12'} w-8 h-16 text-slate-400 z-20`} />
                                                        <div className={`absolute -bottom-4 ${idx % 2 === 0 ? 'left-1/2' : 'right-1/2'} w-32 h-8 bg-[#e2d5b5]/80 backdrop-blur-sm rotate-2 shadow-sm z-20`}></div>
                                                        <ScratchOverlay />

                                                        <div className="aspect-video w-full bg-gray-100 overflow-hidden relative border border-slate-200">
                                                            {mediaItem.type === 'video' ? (
                                                                <div className="w-full h-full relative flex items-center justify-center bg-black">
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
                                                                <img src={mediaItem.url} alt="" loading="lazy" className="w-full h-full object-cover mix-blend-multiply" />
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
