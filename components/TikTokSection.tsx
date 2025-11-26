
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause, Heart, MessageCircle, Share2, Music2, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

// TU PERFIL DE TIKTOK
const TIKTOK_PROFILE_URL = "https://www.tiktok.com/@bonialeart?lang=en";

// Función auxiliar para arreglar enlaces de Dropbox
const getPlayableVideoUrl = (url: string) => {
    if (!url) return "";
    if (url.includes('dropbox.com')) {
        return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    }
    return url;
};

// CONFIGURACIÓN DE VIDEOS
const TIKTOK_VIDEOS = [
    {
        id: 1,
        views: "49.1k",
        likes: "8.2k",
        desc: "Listo para llevar tu animación al siguiente nivel? Aqui 5 libros de animacion que te ayudarán The Animator",
        url: "https://www.dropbox.com/scl/fi/ahbc4rglzsp7z9k0n9t21/Mejores-libros-de-arte.mp4?rlkey=w0c1708kql7xr4d0fixin1sd9&st=b7ud40re&dl=0",
        tiktokUrl: "https://www.tiktok.com/@bonialeart/video/7516201587828591877?lang=en"
    },
    {
        id: 2,
        views: "392.4k",
        likes: "51k",
        desc: "AFFINITY AHORA ES GRATIS La app profesional de diseño que todos esperaban • Diseño vectorial, edición de fotos y...",
        url: "https://www.dropbox.com/scl/fi/kmr6amag83bwa93lo5qof/Afiinity-Gratis.mp4?rlkey=gdworsbbzxhawp1imguqskl80&st=w9xtr4tz&dl=0",
        tiktokUrl: "https://www.tiktok.com/@bonialeart/video/7568148809679752504?lang=en"
    },
    {
        id: 3,
        views: "5685k",
        likes: "820",
        desc: "Tutorial de como pintar agua en digital. ⚡",
        url: "https://www.dropbox.com/scl/fi/55a0bllef3sd07trotq4w/Agua-tutorial.mp4?rlkey=f1vmv8n05a387778insr4g753&st=xgc3cqar&dl=0",
        tiktokUrl: "https://www.tiktok.com/@bonialeart/video/7519910057329429766?lang=en"
    },
    {
        id: 4,
        views: "26.7k",
        likes: "4913",
        desc: "La mejor página para conseguir inspiración de Arte Digital y concept art | IAMAG La página que todo artista debería...",
        url: "https://www.dropbox.com/scl/fi/ue08rbqcfm0rg81ks64lt/IAMAG.mp4?rlkey=c001i8ratt9xdq5ufardsu72v&st=admjzjwn&dl=0",
        tiktokUrl: "https://www.tiktok.com/@bonialeart/video/7517418556884274438?lang=en"
    }
];

const TikTokCard = ({ video }: { video: typeof TIKTOK_VIDEOS[0] }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    // Performance: Pause video when it scrolls out of view
    const isInView = useInView(containerRef, { amount: 0.6 });

    useEffect(() => {
        if (!isInView && isPlaying && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, [isInView, isPlaying]);

    const togglePlay = () => {
        if (!videoRef.current) return;
        
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            // Pause other videos for performance
            document.querySelectorAll('video').forEach((v) => {
                if (v !== videoRef.current && !v.paused) {
                    v.pause();
                }
            });
            videoRef.current.play().catch(e => console.error("Play failed", e));
        }
        setIsPlaying(!isPlaying);
    };

    const handlePlayStateChange = () => {
        if (videoRef.current) {
            setIsPlaying(!videoRef.current.paused);
        }
    };

    // Optimize progress bar update using direct DOM manipulation to avoid re-renders
    const handleTimeUpdate = () => {
        if (videoRef.current && progressRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            progressRef.current.style.width = `${progress}%`;
        }
    };

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "50px" }}
            className="flex-shrink-0 snap-center relative group transform-gpu" // transform-gpu for hardware acceleration
        >
            {/* Removed expensive shadows and backdrop-filters for performance */}
            <div className="relative w-[280px] h-[500px] bg-slate-950 rounded-[2rem] border border-slate-800 overflow-hidden">
                
                <video 
                    ref={videoRef}
                    src={getPlayableVideoUrl(video.url)}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    preload="metadata" // Load metadata only
                    onPlay={handlePlayStateChange}
                    onPause={handlePlayStateChange}
                    onTimeUpdate={handleTimeUpdate}
                    onClick={togglePlay}
                />

                {/* Overlay Gradient - Simple CSS gradient, cheap to render */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none transition-opacity duration-300" 
                     style={{ opacity: isPlaying ? 0.4 : 1 }}
                />

                {/* Play Button Overlay (Center) */}
                <div 
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-20 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
                    onClick={togglePlay}
                >
                    {/* Replaced backdrop-blur with solid semi-transparent bg for speed */}
                    <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center border border-white/20 hover:scale-110 transition-transform cursor-pointer">
                        {isPlaying ? (
                             <Pause size={32} fill="white" className="text-white" />
                        ) : (
                             <Play size={32} fill="white" className="text-white ml-1" />
                        )}
                    </div>
                </div>

                {/* Open in TikTok Button - Made more prominent */}
                <a 
                    href={video.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 z-30 flex items-center gap-2 px-3 py-1.5 bg-black/60 rounded-full text-white text-xs font-bold border border-white/10 hover:bg-[#ff0050] hover:border-[#ff0050] transition-colors shadow-sm"
                    title="Ver en TikTok"
                    onClick={(e) => e.stopPropagation()}
                >
                    <span>TikTok</span>
                    <ExternalLink size={12} />
                </a>

                 {/* Video Playback Bottom Progress Bar with improved visibility */}
                 <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-900/50 z-30 backdrop-blur-sm">
                    <div ref={progressRef} className="h-full bg-indigo-500 w-0 transition-all duration-100 ease-linear" />
                </div>

                {/* UI Elements (Bottom) */}
                <div className="absolute bottom-4 left-4 right-14 z-20 pointer-events-none">
                    <div className="text-white text-sm font-medium mb-3 line-clamp-3 leading-snug drop-shadow-md">
                        {video.desc}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Music2 size={12} className={isPlaying ? "animate-spin-slow" : ""} />
                        <span className="truncate">Original Sound - Bonialeart</span>
                    </div>
                </div>

                {/* Side Actions (Right) */}
                <div className="absolute bottom-20 right-2 flex flex-col gap-4 items-center z-20 pointer-events-none">
                    <div className="flex flex-col items-center gap-1">
                        <div className="p-2 bg-slate-900/80 rounded-full text-white">
                            <Heart size={18} fill="currentColor" className="text-white" />
                        </div>
                        <span className="text-[10px] text-white font-bold">{video.likes}</span>
                    </div>
                    
                    <div className="flex flex-col items-center gap-1">
                        <div className="p-2 bg-slate-900/80 rounded-full text-white">
                            <MessageCircle size={18} />
                        </div>
                        <span className="text-[10px] text-white font-bold">402</span>
                    </div>

                    <div className="p-2 bg-slate-900/80 rounded-full text-white">
                        <Share2 size={18} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const TikTokSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
        const { current } = scrollRef;
        const scrollAmount = 300;
        if (direction === 'left') {
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 relative group/section">
        {/* Inject styles to hide scrollbar but keep functionality */}
        <style>{`
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            }
        `}</style>

        {/* Header */}
        <div className="text-center mb-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block relative group"
            >
                <h2 className="text-4xl md:text-6xl font-['Permanent_Marker'] text-white mb-2">
                    TIKTOK FEED
                </h2>
                <a 
                    href={TIKTOK_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 font-mono text-sm tracking-widest hover:text-pink-500 transition-colors flex items-center justify-center gap-2"
                >
                    @bonialeart
                    <ExternalLink size={12} />
                </a>
            </motion.div>
        </div>

        {/* Navigation Arrows - Visible on desktop to encourage interaction without scrollbar */}
        <div className="absolute top-[60%] -translate-y-1/2 left-2 md:-left-12 z-40 hidden md:block">
            <button 
                onClick={() => scroll('left')}
                className="p-3 md:p-4 rounded-full bg-slate-900 border border-slate-700 text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all shadow-xl active:scale-95"
                aria-label="Scroll left"
            >
                <ChevronLeft size={24} />
            </button>
        </div>
        <div className="absolute top-[60%] -translate-y-1/2 right-2 md:-right-12 z-40 hidden md:block">
             <button 
                onClick={() => scroll('right')}
                className="p-3 md:p-4 rounded-full bg-slate-900 border border-slate-700 text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all shadow-xl active:scale-95"
                aria-label="Scroll right"
            >
                <ChevronRight size={24} />
            </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
            ref={scrollRef}
            className="flex overflow-x-auto pb-10 gap-6 md:gap-10 px-4 snap-x snap-mandatory scroll-smooth hide-scrollbar"
            style={{ 
                maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                willChange: 'scroll-position' // Optimization hint for browser
            }}
        >
            {TIKTOK_VIDEOS.map((video) => (
                <TikTokCard key={video.id} video={video} />
            ))}
            
            {/* "See More" Card */}
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 snap-center flex items-center"
            >
                <a 
                    href={TIKTOK_PROFILE_URL} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-[280px] h-[400px] rounded-[2rem] border-2 border-dashed border-slate-800 flex flex-col items-center justify-center gap-4 group hover:border-pink-500 hover:bg-pink-500/5 transition-all"
                >
                    <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ExternalLink size={32} className="text-white" />
                    </div>
                    <span className="font-['Permanent_Marker'] text-xl text-slate-500 group-hover:text-white">
                        View All
                    </span>
                    <span className="text-xs text-slate-600 font-mono">@bonialeart</span>
                </a>
            </motion.div>
        </div>
    </div>
  );
};

export default TikTokSection;
