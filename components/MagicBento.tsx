import React from 'react';

export interface BentoCardProps {
    id?: string | number;
    title?: string;
    description?: string;
    label?: string;
    img?: string;
    video?: string;
    type?: 'default' | 'image' | 'video' | 'font' | 'color-palette' | 'pattern' | 'logo' | 'link' | 'mockup';

    // Grid Spanning
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2;

    // Styling
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;

    // Actions
    onClick?: () => void;
    url?: string;

    // Content Specifics
    colors?: { hex: string; name: string }[]; // For palette type
    imgFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'; // Custom image fitting
}

export interface BentoProps {
    cards: BentoCardProps[];
    gap?: number;
}

const BentoCard: React.FC<BentoCardProps> = ({
    title,
    description,
    label,
    img,
    video,
    type = 'default',
    colSpan = 1,
    rowSpan = 1,
    backgroundColor = '#1e1e1e',
    textColor = '#ffffff',
    fontFamily,
    onClick,
    url,
    colors,
    imgFit = 'cover'
}) => {
    // Determine grid classes based on span
    // Mobile: always col-span-1 (or full width), Desktop: use props
    const getGridClasses = () => {
        const mdColClass = colSpan === 2 ? 'md:col-span-2' : colSpan === 3 ? 'md:col-span-3' : colSpan === 4 ? 'md:col-span-4' : 'md:col-span-1';
        const mdRowClass = rowSpan === 2 ? 'md:row-span-2' : 'md:row-span-1';
        return `${mdColClass} ${mdRowClass}`;
    };

    const Container = url && !onClick ? 'a' : 'div';
    const containerProps = url && !onClick ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : { onClick };

    return (
        <Container
            {...containerProps}
            className={`
                group relative overflow-hidden rounded-[2rem] 
                transition-all duration-500 ease-out
                hover:scale-[1.02] hover:shadow-2xl hover:z-10
                flex flex-col
                ${getGridClasses()}
                ${onClick || url ? 'cursor-pointer' : ''}
            `}
            style={{
                backgroundColor,
                color: textColor,
                minHeight: rowSpan === 2 ? '500px' : '240px'
            }}
        >
            {/* --- TYPE: LOGO --- */}
            {type === 'logo' && (
                <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                    {img && (
                        <img
                            src={img}
                            alt={title}
                            className="w-full h-full object-contain filter drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                        />
                    )}
                </div>
            )}

            {/* --- TYPE: PATTERN --- */}
            {type === 'pattern' && img && (
                <div
                    className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                    style={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: '150px',
                        backgroundRepeat: 'repeat'
                    }}
                />
            )}
            {/* Fallback geometric pattern if no image */}
            {type === 'pattern' && !img && (
                <div className="absolute inset-0 opacity-10 flex flex-wrap content-center justify-center p-4">
                    <div className="w-full h-full grid grid-cols-6 gap-2 rotate-12 scale-150">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <div key={i} className="w-full aspect-square bg-current rounded-full alpha-20" />
                        ))}
                    </div>
                </div>
            )}

            {/* --- TYPE: IMAGE / MOCKUP --- */}
            {
                (type === 'image' || type === 'mockup' || type === 'default') && img && (
                    <div className="absolute inset-0">
                        <img
                            src={img}
                            alt={title}
                            className={`w-full h-full object-${imgFit} transition-transform duration-700 ease-out group-hover:scale-105`}
                        />
                        {/* Gradient Overlay for Text Readability if needed */}
                        {(title || description) && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                        )}
                    </div>
                )
            }

            {/* --- TYPE: COLOR PALETTE --- */}
            {
                type === 'color-palette' && colors && (
                    <div className="absolute inset-0 flex flex-row h-full w-full">
                        {colors.map((c, i) => (
                            <div
                                key={i}
                                className="flex-1 h-full flex flex-col justify-end p-4 gap-1 transition-all duration-300 hover:flex-[1.5]"
                                style={{ backgroundColor: c.hex }}
                            >
                                <span className={`font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-widest leading-none ${Number(c.hex.replace('#', '0x')) > 0xffffff / 1.5 ? 'text-black/60' : 'text-white/60'}`}>
                                    {c.name}
                                </span>
                                <span className={`font-mono text-xs font-bold ${Number(c.hex.replace('#', '0x')) > 0xffffff / 1.5 ? 'text-black' : 'text-white'}`}>
                                    {c.hex}
                                </span>
                            </div>
                        ))}
                    </div>
                )
            }

            {/* --- TYPE: TYPOGRAPHY --- */}
            {
                type === 'font' && (
                    <div className="absolute inset-0 p-8 flex flex-col justify-center">
                        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/10 group-hover:bg-white/20 transition-colors">
                            <h2 className="text-6xl md:text-8xl mb-2" style={{ fontFamily }}>Aa</h2>
                            <p className="text-2xl opacity-80" style={{ fontFamily }}>abcdefghijklmnopqrstuvwxyz</p>
                            <p className="text-2xl opacity-80" style={{ fontFamily }}>0123456789</p>
                            <p className="mt-4 text-sm font-mono opacity-50 uppercase tracking-widest">{fontFamily}</p>
                        </div>
                    </div>
                )
            }

            {/* --- CONTENT OVERLAY (Titles, Descriptions) --- */}
            {/* Only show for grid items that aren't purely visual/full-bleed unless they have content */}
            {
                (title || description || label) && type !== 'color-palette' && (
                    <div className="relative z-20 mt-auto p-6 md:p-8">
                        {label && (
                            <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold uppercase tracking-widest rounded-full bg-white/20 backdrop-blur-md border border-white/10">
                                {label}
                            </span>
                        )}
                        {title && (
                            <h3 className="text-2xl font-bold leading-tight mb-2 drop-shadow-md">
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p className="text-sm opacity-80 leading-relaxed max-w-[90%] drop-shadow-md">
                                {description}
                            </p>
                        )}
                    </div>
                )
            }

            {/* Hover Shine Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </div>
        </Container >
    );
};

const MagicBento: React.FC<BentoProps> = ({ cards, gap = 24 }) => {
    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
            <div
                className="grid grid-cols-1 md:grid-cols-4 auto-rows-min md:auto-rows-[minmax(240px,auto)] gap-4 md:gap-6"
            >
                {cards.map((card, index) => (
                    <BentoCard key={index} {...card} />
                ))}
            </div>
        </div>
    );
};

export default MagicBento;
