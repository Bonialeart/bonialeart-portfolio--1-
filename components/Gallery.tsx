
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Pause, Play, ZoomIn } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { GalleryItem, MediaItem } from '../types';
import { CATEGORY_TRANSLATIONS } from '../constants';
import { extractColorsFromUrl } from '../utils/colorUtils';

interface GalleryProps {
    items: GalleryItem[];
    selectedId: number | null;
    setSelectedId: (id: number | null) => void;
}

// --- PushPin Component ---
const PushPin = ({ className }: { className?: string }) => (
    <div className={`absolute z-50 pointer-events-none ${className}`} style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))' }}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <line x1="50" y1="50" x2="50" y2="95" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            <path d="M68 25 C68 12 32 12 32 25 C32 32 38 38 38 45 L38 52 L30 52 L30 58 L70 58 L70 52 L62 52 L62 45 C62 38 68 32 68 25 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
            <ellipse cx="45" cy="22" rx="6" ry="3" fill="white" opacity="0.4" />
        </svg>
    </div>
);

const PaperTexture = () => (
    <div className="absolute inset-0 pointer-events-none opacity-40 z-10 mix-blend-multiply rounded-[2px]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}>
    </div>
);

// --- Image Component with Loader ---
const ImageWithLoader = React.memo(({
    src,
    alt,
    className,
    priority = false,
    layoutId
}: {
    src: string,
    alt: string,
    className?: string,
    priority?: boolean,
    layoutId?: string
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={`relative overflow-hidden bg-slate-800 ${className}`}>
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center z-0 bg-slate-800">
                    <div className="absolute inset-0 bg-slate-700/50 animate-pulse" />
                    <ImageIcon size={24} className="text-slate-600 opacity-20" />
                </div>
            )}
            <motion.img
                layoutId={layoutId}
                src={src}
                alt={alt}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className={`relative z-10 w-full h-full object-cover ${className}`}
            />
        </div>
    );
});

// --- Custom Video Player Component ---
const CustomVideoPlayer = ({ src, poster }: { src: string, poster?: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const togglePlay = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            if (duration > 0) {
                setProgress((current / duration) * 100);
            }
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;
            videoRef.current.currentTime = percentage * videoRef.current.duration;
        }
    };

    return (
        <div className="relative w-full h-full group/video bg-black flex items-center justify-center" onClick={togglePlay}>
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                playsInline
            />

            <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover/video:opacity-100' : 'opacity-100'}`}>
                <button
                    onClick={togglePlay}
                    className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:scale-110 transition-transform hover:bg-white/20"
                >
                    {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" />}
                </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/10 transition-opacity duration-300 opacity-0 group-hover/video:opacity-100" onClick={(e) => e.stopPropagation()}>
                <div
                    className="absolute inset-0 cursor-pointer"
                    onClick={handleProgressClick}
                >
                    <div
                        className="h-full bg-indigo-500 relative"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm scale-0 group-hover/video:scale-100 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Zoomable Image Component ---
const ZoomableImage = ({ src, alt }: { src?: string, alt: string }) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [showIcon, setShowIcon] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouch || !containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();

        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setMousePos({ x, y });
    };

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    if (!src) return null;

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full flex items-center justify-center overflow-hidden group/zoom ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onMouseEnter={() => !isTouch && setShowIcon(true)}
            onMouseLeave={() => {
                setShowIcon(false);
                setIsZoomed(false);
            }}
            onMouseMove={handleMouseMove}
            onClick={!isTouch ? toggleZoom : undefined}
        >
            <div className={`absolute inset-0 z-20 pointer-events-none flex items-center justify-center transition-opacity duration-300 ${showIcon && !isZoomed ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-black/40 p-4 rounded-full backdrop-blur-md border border-white/20 shadow-xl transform transition-transform group-hover/zoom:scale-110">
                    <ZoomIn className="text-white" size={32} />
                </div>
            </div>

            <img
                src={src}
                alt={alt}
                className="max-w-full max-h-full object-contain transition-transform duration-300 ease-out will-change-transform shadow-2xl"
                style={{
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                }}
                loading="eager"
            />
        </div>
    );
};


const Gallery: React.FC<GalleryProps> = ({ items = [], selectedId, setSelectedId }) => {
    // State selectedId is now lifted to props
    const [palettes, setPalettes] = useState<Record<number, string[]>>({});
    const [copiedColor, setCopiedColor] = useState<string | null>(null);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const safeItems = useMemo(() => items || [], [items]);
    const modalItem = useMemo(() => safeItems.find(i => i.id === selectedId), [safeItems, selectedId]);

    useEffect(() => {
        if (selectedId && modalItem && !palettes[selectedId]) {
            const fetchColor = async () => {
                try {
                    const colors = await extractColorsFromUrl(modalItem.url);
                    setPalettes(prev => ({ ...prev, [selectedId]: colors }));
                } catch (e) {
                    console.warn("Failed to extract colors", e);
                }
            };
            fetchColor();
        }
    }, [selectedId, modalItem, palettes]);

    useEffect(() => {
        if (selectedId) setCurrentMediaIndex(0);
    }, [selectedId]);

    const handleCopyColor = (color: string) => {
        navigator.clipboard.writeText(color);
        setCopiedColor(color);
        setTimeout(() => setCopiedColor(null), 2000);
    };

    const mediaList: MediaItem[] = useMemo(() => {
        if (!modalItem) return [];
        return modalItem.media && modalItem.media.length > 0
            ? modalItem.media
            : [{ type: 'image', url: modalItem.url }];
    }, [modalItem]);

    const activeMedia = useMemo(() => {
        if (mediaList.length === 0) return null;
        if (currentMediaIndex >= mediaList.length) return mediaList[0];
        return mediaList[currentMediaIndex];
    }, [mediaList, currentMediaIndex]);

    const handlePrevMedia = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (mediaList.length <= 1) return;
        setCurrentMediaIndex(prev => (prev - 1 + mediaList.length) % mediaList.length);
    };

    const handleNextMedia = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (mediaList.length <= 1) return;
        setCurrentMediaIndex(prev => (prev + 1) % mediaList.length);
    };

    const getGridClass = (index: number) => {
        const patternIndex = index % 6;
        switch (patternIndex) {
            case 0: return "md:col-span-1 md:row-span-2";
            case 1: return "md:col-span-2 md:row-span-1";
            case 2: return "md:col-span-1 md:row-span-1";
            case 3: return "md:col-span-1 md:row-span-2";
            case 4: return "md:col-span-1 md:row-span-1";
            case 5: return "md:col-span-1 md:row-span-1";
            default: return "md:col-span-1 md:row-span-1";
        }
    };

    if (safeItems.length === 0) return null;

    return (
        <div className="w-full relative min-h-[800px] flex flex-col items-center">

            {/* --- MOSAIC GRID VIEW --- */}
            <div className="w-full max-w-[1400px] px-4 pb-24 relative z-10">
                {/* Corkboard Background Container */}
                <div className="relative p-6 md:p-10 rounded-xl border-[16px] border-[#3e2723] bg-[#bc9e82] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                    {/* Cork Texture */}
                    <div
                        className="absolute inset-0 z-0 opacity-90"
                        style={{
                            backgroundImage: 'url(/assets/cork-board.png)',
                            backgroundSize: '400px',
                            backgroundRepeat: 'repeat',
                            backgroundBlendMode: 'multiply'
                        }}
                    ></div>
                    {/* Inner Vignette/Shadow */}
                    <div className="absolute inset-0 z-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.6)]"></div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] md:auto-rows-[320px] gap-4"
                    >
                        {safeItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layoutId={`card-container-${item.id}`}
                                onClick={() => setSelectedId(item.id)}
                                className={`${getGridClass(index)} relative group rounded-[2px] bg-[#f8f5e6] cursor-pointer shadow-xl transform-gpu origin-top`}
                                whileHover={{
                                    rotate: [0, 2, -2, 1, -1, 0],
                                    transition: { duration: 0.6, ease: "easeInOut" }
                                }}
                                style={{
                                    overflow: 'visible',
                                    transform: `rotate(${index % 2 === 0 ? '1deg' : '-0.5deg'})`, // Initial static rotation
                                }}
                            >
                                <PaperTexture />
                                {/* PushPin with better shadow/position */}
                                <PushPin className={`w-8 h-8 -top-3 left-1/2 -translate-x-1/2 transform ${index % 3 === 0 ? 'rotate-12' : '-rotate-6'}`} />

                                <div className="w-full h-full p-2 relative overflow-hidden rounded-sm">
                                    <ImageWithLoader
                                        src={item.url}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                        priority={false}
                                    />

                                    <div className="absolute inset-2 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                                    <div className="absolute bottom-2 left-2 p-4 z-20 w-[calc(100%-1rem)]">
                                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                            <span className="block text-4xl md:text-5xl font-light text-white font-['Space_Grotesk'] leading-none mb-1 opacity-90">
                                                {item.id < 10 ? `0${item.id}` : item.id}
                                                <span className="text-lg align-top text-indigo-400 ml-1 opacity-60">.</span>
                                            </span>
                                            <div className="h-[1px] w-8 bg-indigo-500 mb-2 mt-1 opacity-50 group-hover:w-16 transition-all duration-500"></div>
                                            <span className="block text-sm font-medium text-slate-200 uppercase tracking-widest truncate">
                                                {item.title}
                                            </span>
                                            <span className="text-xs text-indigo-400 font-mono mt-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                                                {CATEGORY_TRANSLATIONS[item.category] || item.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* --- MODAL --- */}
            {selectedId && modalItem && (
                <ProjectModal
                    item={modalItem}
                    onClose={() => setSelectedId(null)}
                    hasNext={items.length > 1}
                    hasPrev={items.length > 1}
                    onNext={() => {
                        const currentIndex = items.findIndex(i => i.id === selectedId);
                        const nextIndex = (currentIndex + 1) % items.length;
                        setSelectedId(items[nextIndex].id);
                    }}
                    onPrev={() => {
                        const currentIndex = items.findIndex(i => i.id === selectedId);
                        const prevIndex = (currentIndex - 1 + items.length) % items.length;
                        setSelectedId(items[prevIndex].id);
                    }}
                />
            )}
        </div>
    );
};

export default Gallery;
