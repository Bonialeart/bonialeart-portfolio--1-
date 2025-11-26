
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Image as ImageIcon, ZoomIn, ChevronLeft, ChevronRight, Play, Pause, Copy } from 'lucide-react';
import { GalleryItem, MediaItem } from '../types';
import { extractColorsFromUrl } from '../utils/colorUtils';

interface GalleryProps {
    items: GalleryItem[];
    selectedId: number | null;
    setSelectedId: (id: number | null) => void;
}

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

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
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
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => {
                setShowIcon(false);
                setIsZoomed(false); 
            }}
            onMouseMove={handleMouseMove}
            onClick={toggleZoom}
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
        switch(patternIndex) {
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
            <div className="w-full max-w-[1400px] px-4 pb-24">
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
                            className={`${getGridClass(index)} relative group rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer hover:border-indigo-500/30 transition-all duration-500`}
                            whileHover={{ y: -5 }}
                        >
                            <ImageWithLoader 
                                src={item.url} 
                                alt={item.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                priority={index < 6} 
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                            <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="block text-6xl md:text-7xl font-light text-white font-['Space_Grotesk'] leading-none mb-1 opacity-90">
                                        {item.id < 10 ? `0${item.id}` : item.id}
                                        <span className="text-lg align-top text-indigo-400 ml-1 opacity-60">.</span>
                                    </span>
                                    <div className="h-[1px] w-12 bg-indigo-500 mb-3 mt-1 opacity-50 group-hover:w-24 transition-all duration-500"></div>
                                    <span className="block text-sm md:text-base font-medium text-slate-200 uppercase tracking-widest">
                                        {item.title}
                                    </span>
                                    <span className="text-xs text-indigo-400 font-mono mt-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* --- MODAL --- */}
            <AnimatePresence>
                {selectedId && modalItem && (
                    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center md:px-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl cursor-pointer pointer-events-auto"
                        />
                        
                        {/* Layout: 
                            Mobile: Stacked (Image 50%, Info 50%)
                            Tablet (md): Stacked (Image 60%, Info 40%) -> Changed from previous row layout
                            Laptop (lg): Row (Image 75%, Info 25%) 
                        */}
                        <motion.div
                            layoutId={`card-container-${modalItem.id}`}
                            className="relative w-full h-[100dvh] md:h-[90vh] lg:max-w-6xl lg:h-[85vh] overflow-hidden bg-slate-900 shadow-2xl flex flex-col lg:flex-row pointer-events-auto border-0 md:border border-white/5 z-50 md:rounded-lg"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <button 
                                onClick={() => setSelectedId(null)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 text-white/50 hover:text-white bg-black/50 rounded-full backdrop-blur-md hover:bg-black/70 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Media Viewport */}
                            <div className="w-full lg:w-3/4 h-[50%] md:h-[60%] lg:h-full relative bg-[#050505] flex flex-col group/carousel shrink-0">
                                <div className="relative flex-grow h-full flex items-center justify-center p-0 md:p-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[length:20px_20px] overflow-hidden">
                                    
                                    {/* Navigation Arrows */}
                                    {mediaList.length > 1 && (
                                        <>
                                            <button 
                                                onClick={handlePrevMedia}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 text-white/70 hover:bg-black/50 hover:text-white transition-all backdrop-blur-sm opacity-100 lg:opacity-0 lg:group-hover/carousel:opacity-100"
                                            >
                                                <ChevronLeft size={32} />
                                            </button>
                                            <button 
                                                onClick={handleNextMedia}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 text-white/70 hover:bg-black/50 hover:text-white transition-all backdrop-blur-sm opacity-100 lg:opacity-0 lg:group-hover/carousel:opacity-100"
                                            >
                                                <ChevronRight size={32} />
                                            </button>
                                        </>
                                    )}

                                    {activeMedia?.type === 'video' ? (
                                        <CustomVideoPlayer 
                                            src={activeMedia.url} 
                                            poster={activeMedia.thumbnail}
                                        />
                                    ) : (
                                        <ZoomableImage 
                                            src={activeMedia?.url} 
                                            alt={modalItem.title} 
                                        />
                                    )}
                                </div>
                                
                                {/* Thumbnails Strip */}
                                {mediaList.length > 1 && (
                                    <div className="h-16 md:h-20 bg-slate-950 border-t border-white/10 flex gap-2 p-2 overflow-x-auto justify-center flex-shrink-0 z-20 relative">
                                        {mediaList.map((m, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentMediaIndex(idx)}
                                                className={`relative aspect-square h-full rounded-md overflow-hidden border-2 transition-all ${currentMediaIndex === idx ? 'border-indigo-500 opacity-100 scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                            >
                                                 <img src={m.thumbnail || m.url} className="w-full h-full object-cover" loading="lazy" alt="thumbnail" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Info Panel */}
                            <div className="w-full lg:w-1/4 h-[50%] md:h-[40%] lg:h-full bg-slate-950 border-t lg:border-t-0 lg:border-l border-white/5 p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow">
                                <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest border-b border-indigo-500/30 pb-1 mb-4 inline-block">{modalItem.category}</span>
                                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 md:mb-6 mt-2">{modalItem.title}</h2>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-mono">{modalItem.description}</p>
                                
                                <div className="border-t border-white/10 pt-6">
                                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2">
                                        Color Palette
                                        <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">HEX</span>
                                    </h4>
                                    
                                    <div className="flex flex-wrap gap-3">
                                        {palettes[modalItem.id] ? (
                                            palettes[modalItem.id].map((color, index) => (
                                                <div key={index} className="relative group">
                                                    <button
                                                        onClick={() => handleCopyColor(color)}
                                                        className="w-10 h-10 rounded-full border-2 border-white/10 shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center group hover:border-white/40"
                                                        style={{ backgroundColor: color }}
                                                        title="Click to Copy"
                                                    >
                                                       {copiedColor === color && <Check size={16} className="text-white drop-shadow-md" />}
                                                    </button>
                                                    
                                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                                                        {copiedColor === color ? 'Copied!' : color}
                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex gap-2">
                                                {[1,2,3,4,5].map(i => (
                                                    <div key={i} className="w-10 h-10 rounded-full bg-slate-800 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
