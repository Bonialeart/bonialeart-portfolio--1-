import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectModal from './ProjectModal';
import BounceCards from './BounceCards';
import PillNav from './PillNav';
import { GALLERY_ITEMS, CATEGORY_TRANSLATIONS } from '../constants';
import { Home } from 'lucide-react';
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
    const [selectedItem, setSelectedItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);

    // Filtering
    const [activeCategory, setActiveCategory] = useState<string>('Todos');

    // User-defined categories
    const categories = [
        'Todos',
        'Ilustraciones Digitales',
        'Arte de Entornos',
        'Arte Conceptual',
        'Diseño de Personajes',
        'Animación',
        'Diseño'
    ];

    const doesItemBelongToCategory = (item: typeof GALLERY_ITEMS[0], category: string): boolean => {
        switch (category) {
            case 'Todos':
                return true;
            case 'Ilustraciones Digitales':
                return item.category === 'Digital Painting';
            case 'Arte de Entornos':
                // Check for 3D or Sketches, or description keywords
                return item.category === '3d' || item.category === 'Sketches' || item.description.toLowerCase().includes('entorno') || item.description.toLowerCase().includes('landscape');
            case 'Arte Conceptual':
                return item.category === 'Sketches' || item.category === 'Digital Painting';
            case 'Diseño de Personajes':
                // Check for Digital Painting or 3D, usually characters
                return (item.category === 'Digital Painting' || item.category === '3d') && !item.description.toLowerCase().includes('landscape') && !item.description.toLowerCase().includes('entorno');
            case 'Animación':
                // Check if it has video media or description mentions animation
                return item.media?.some(m => m.type === 'video') || item.description.toLowerCase().includes('animación') || item.description.toLowerCase().includes('animation');
            case 'Diseño':
                return item.category === 'Design';
            default:
                return false;
        }
    };

    // Reverse the items for the Artistic Gallery so that newer projects (e.g. Logo) appear first/left
    // and older projects (e.g. Crimson Requiem) appear last/right, as requested.
    // We clone the array with [...GALLERY_ITEMS] before reversing to avoid mutating the original import.
    const filteredItems = [...GALLERY_ITEMS].reverse().filter(item => doesItemBelongToCategory(item, activeCategory));

    const navigateItem = (direction: number) => {
        if (!selectedItem) return;
        const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
        if (currentIndex === -1) return;

        const newIndex = (currentIndex + direction + filteredItems.length) % filteredItems.length;
        setSelectedItem(filteredItems[newIndex]);
    };

    const handleCardClick = (item: typeof GALLERY_ITEMS[0]) => {
        setSelectedItem(item);
    };

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-slate-950 overflow-hidden flex flex-col items-center justify-center text-slate-100 perspective-1000">

            {/* Back Button - Responsive Positioning */}
            <button
                onClick={onBack}
                className={`fixed z-50 rounded-full text-white hover:bg-indigo-500 transition-colors border-2 border-white/20 bg-indigo-600 backdrop-blur-md group
                bottom-6 left-6 p-3 shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:shadow-[0_0_25px_rgba(79,70,229,0.7)]
                ${selectedItem ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                title="Volver al Inicio"
            >
                <Home size={20} className="group-hover:scale-110 transition-transform w-5 h-5" />
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
                ÁLBUM
            </h2>

            {/* DESKTOP: OPTIMIZED CLEAN GALLERY */}
            <div className={`hidden lg:flex absolute inset-0 items-center justify-center z-10 transition-opacity duration-500 ${selectedItem ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <BounceCards
                    images={filteredItems.map(item => item.url)}
                    containerWidth="90%" // Use essentially full width
                    containerHeight={600}
                    animationDelay={0.3}
                    animationStagger={0.05}
                    transformStyles={filteredItems.map((_, i) => {
                        // LINEAR COMPACT SPREAD
                        const count = filteredItems.length;
                        // Reduce spread width to ensure more items fit
                        // 120px per card allocation, max 1000px total width

                        const totalSpread = Math.min(count * 120, 1000);
                        const spacing = count > 1 ? totalSpread / (count - 1) : 0;
                        const startX = -totalSpread / 2;

                        const x = startX + (i * spacing);
                        // Very minimal rotation for "organic" feel but readable
                        const rotate = (i % 2 === 0 ? 1 : -1) * 2;

                        return `translate(${x}px, 0px) rotate(${rotate}deg)`;
                    })}
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
                                    {CATEGORY_TRANSLATIONS[item.category] || item.category}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Instruction */}
            <div className={`fixed bottom-12 text-slate-500 font-['Space_Grotesk'] text-sm tracking-widest animate-pulse pointer-events-none transition-opacity duration-300 ${selectedItem ? 'opacity-0' : 'opacity-100'}`}>
                INTERACTÚA PARA REVELAR • CLIC PARA VER
            </div>

            {/* Full Screen Detail View */}
            {selectedItem && (
                <ProjectModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    hasNext={filteredItems.length > 1}
                    hasPrev={filteredItems.length > 1}
                    onNext={() => navigateItem(1)}
                    onPrev={() => navigateItem(-1)}
                />
            )}
        </div >
    );
};

export default ArtisticGallery;
