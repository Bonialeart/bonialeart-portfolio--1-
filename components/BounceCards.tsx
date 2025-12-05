import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface BounceCardsProps {
    className?: string;
    images: string[];
    containerWidth?: number | string;
    containerHeight?: number | string;
    animationDelay?: number;
    animationStagger?: number;
    ease?: string;
    transformStyles?: string[];
    onClick?: (index: number) => void;
    imageStyles?: React.CSSProperties[]; // New prop for individual image styles
}

const BounceCards: React.FC<BounceCardsProps> = ({
    className = "",
    images = [],
    containerWidth = 500,
    containerHeight = 400,
    animationDelay = 0.5,
    animationStagger = 0.06,
    ease = "elastic.out(1, 0.8)",
    transformStyles = [
        "rotate(10deg) translate(-170px)",
        "rotate(5deg) translate(-85px)",
        "rotate(-3deg)",
        "rotate(-10deg) translate(85px)",
        "rotate(-20deg) translate(170px)"
    ],
    onClick,
    imageStyles = []
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".card",
                { scale: 0 },
                {
                    scale: 1,
                    stagger: animationStagger,
                    ease: ease,
                    delay: animationDelay,
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [animationStagger, ease, animationDelay]);

    const handleMouseEnter = () => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll('.card');

        cards.forEach((card, i) => {
            // Cycle through transform styles if more images than styles
            // We center the styles around the middle if possible, or just cycle
            const style = transformStyles[i % transformStyles.length];

            gsap.to(card, {
                transform: style,
                duration: 0.4,
                ease: "power2.out"
            });
        });
    };

    const handleMouseLeave = () => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll('.card');

        gsap.to(cards, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
                cards.forEach((card, i) => {
                    (card as HTMLElement).style.zIndex = i.toString();
                });
            }
        });
    };

    const handleCardEnter = (e: React.MouseEvent<HTMLDivElement>, hoveredIndex: number) => {
        if (!containerRef.current) return;
        const target = e.currentTarget;
        const cards = containerRef.current.querySelectorAll('.card');

        // Bring hovered card to front
        target.style.zIndex = "100";

        // Scale and lift the hovered card
        gsap.to(target, {
            scale: 1.4,
            y: -70,
            duration: 0.3,
            ease: "back.out(1.5)",
            overwrite: "auto"
        });

        // Push other cards away from the hovered card
        cards.forEach((card, i) => {
            if (i !== hoveredIndex) {
                const distance = i - hoveredIndex;
                const pushAmount = distance < 0 ? -80 : 80; // Push left or right

                gsap.to(card, {
                    x: `+=${pushAmount}`,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }
        });
    };

    const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        if (!containerRef.current) return;
        const target = e.currentTarget;
        const cards = containerRef.current.querySelectorAll('.card');
        const style = transformStyles[index % transformStyles.length];

        // Keep it above others while returning
        target.style.zIndex = "50";

        // Return hovered card to original state
        gsap.to(target, {
            transform: style,
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
            onComplete: () => {
                target.style.zIndex = index.toString();
            }
        });

        // Return all other cards to their fanned positions
        cards.forEach((card, i) => {
            if (i !== index) {
                const cardStyle = transformStyles[i % transformStyles.length];
                gsap.to(card, {
                    transform: cardStyle,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }
        });
    };

    return (
        <div
            ref={containerRef}
            className={`relative flex items-center justify-center ${className}`}
            style={{
                width: typeof containerWidth === 'number' ? `${containerWidth}px` : containerWidth,
                height: typeof containerHeight === 'number' ? `${containerHeight}px` : containerHeight
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {images.map((src, i) => (
                <div
                    key={i}
                    className="card absolute w-[320px] bg-[#f8f8f8] p-4 pb-14 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow transform-gpu"
                    style={{
                        zIndex: images.length - i, // First item on top
                        // Initial stable position to prevent jumping
                        transform: transformStyles[i % transformStyles.length] || `rotate(${(i - images.length / 2) * 5}deg)`
                    }}
                    onClick={() => onClick && onClick(i)}
                    onMouseEnter={(e) => handleCardEnter(e, i)}
                    onMouseLeave={(e) => handleCardLeave(e, i)}
                >
                    <div className="w-full aspect-[4/5] overflow-hidden bg-gray-200 border border-gray-100 relative">
                        <img
                            src={src}
                            alt=""
                            className="w-full h-full object-cover pointer-events-none"
                            style={imageStyles[i] || {}}
                        />
                        <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BounceCards;
