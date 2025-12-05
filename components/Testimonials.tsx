import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

// --- SVG Assets for Handmade Feel (Duplicated/Shared Style) ---
const Tape = ({ className, color = "bg-[#e2d5b5]/90" }: { className?: string, color?: string }) => (
    <div className={`absolute h-8 ${color} backdrop-blur-sm shadow-sm z-20 pointer-events-none ${className}`}></div>
);

const ScratchOverlay = () => (
    <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-multiply z-10">
        <svg width="100%" height="100%">
            <filter id="noise-testi">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise-testi)" />
        </svg>
    </div>
);

const PaperTexture = () => (
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
);

const TESTIMONIALS = [
    {
        id: 1,
        name: "Sofia Rodriguez",
        role: "Directora de Arte",
        company: "Studio Ghibli",
        text: "La capacidad de Alejandro para capturar la emoción en sus pinturas digitales es inigualable. Su trabajo en 'Crimson Requiem' dio vida a nuestra visión.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
        rotation: "rotate-1"
    },
    {
        id: 2,
        name: "Marcus Chen",
        role: "Desarrollador Principal",
        company: "TechFlow",
        text: "Los activos 3D proporcionados para nuestro entorno de juego fueron optimizados perfectamente sin sacrificar la fidelidad visual. Un verdadero profesional.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
        rotation: "-rotate-2"
    },
    {
        id: 3,
        name: "Elena Vasquez",
        role: "Jefa de Marketing",
        company: "Solaris",
        text: "Contratamos a Bonialeart para una revisión completa de identidad de marca. El resultado fue un sistema elegante y moderno que comunica perfectamente nuestros valores.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
        rotation: "rotate-2"
    },
    {
        id: 4,
        name: "David Miller",
        role: "Desarrollador Indie",
        company: "Indie",
        text: "Los diseños de personajes para mi RPG fueron perfectos. Alejandro tiene un estilo único que realmente destaca. La comunicación fue fluida.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
        rotation: "-rotate-1"
    }
];

const Testimonials = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect for the background text or elements
    const x = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black -z-20"></div>
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] -z-10"></div>

            <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block relative"
                >
                    <h2 className="text-4xl md:text-6xl font-['Permanent_Marker'] text-slate-100 mb-4 transform -rotate-2">
                        TESTIMONIOS
                    </h2>
                    {/* Scribble Underline */}
                    <svg viewBox="0 0 200 20" className="w-full h-4 text-indigo-500 opacity-80 mx-auto">
                        <path d="M5,10 Q50,15 100,5 T195,10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                </motion.div>
                <p className="text-slate-400 mt-6 max-w-2xl mx-auto font-['Handlee'] text-xl">
                    Notas de clientes felices y colaboradores.
                </p>
            </div>

            {/* Carousel Container */}
            <div ref={containerRef} className="relative w-full overflow-hidden py-10">
                <div className="flex gap-8 px-6 md:px-12 w-max animate-scroll hover:pause items-center">
                    {/* Double the items for infinite scroll illusion */}
                    {[...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => (
                        <div
                            key={`${item.id}-${idx}`}
                            className={`w-[320px] md:w-[400px] bg-[#fdfbf7] p-6 pb-12 shadow-xl relative group transition-transform duration-300 hover:scale-105 hover:z-10 hover:rotate-0 ${item.rotation}`}
                        >
                            {/* Paper Texture & Effects */}
                            <PaperTexture />
                            <ScratchOverlay />

                            {/* Tape Element */}
                            <Tape className="w-32 -top-4 left-1/2 -translate-x-1/2 -rotate-1 opacity-90" />

                            {/* Content */}
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} size={14} className="text-yellow-500 fill-yellow-500" />
                                        ))}
                                    </div>
                                    <Quote className="text-slate-300 w-8 h-8 rotate-180" />
                                </div>

                                <p className="text-slate-800 font-['Handlee'] text-lg leading-relaxed mb-8 flex-grow">
                                    "{item.text}"
                                </p>

                                <div className="flex items-center gap-4 border-t border-slate-200 pt-4 mt-auto">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md grayscale group-hover:grayscale-0 transition-all">
                                        <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-slate-900 font-['Permanent_Marker'] text-lg leading-none mb-1">{item.name}</h4>
                                        <p className="text-indigo-600 text-xs font-bold uppercase tracking-wider font-['Space_Grotesk']">
                                            {item.role} <span className="text-slate-400">@</span> {item.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 60s linear infinite;
                }
                .hover\\:pause:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
