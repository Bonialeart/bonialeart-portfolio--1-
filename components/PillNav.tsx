import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export type PillNavItem = {
    label: string;
    value: string;
};

export interface PillNavProps {
    items: PillNavItem[];
    activeValue: string;
    onSelect: (value: string) => void;
    className?: string;
    ease?: string;
    baseColor?: string;
    pillColor?: string;
    hoveredPillTextColor?: string;
    pillTextColor?: string;
}

const PillNav: React.FC<PillNavProps> = ({
    items,
    activeValue,
    onSelect,
    className = '',
    ease = 'power3.easeOut',
    baseColor = '#6366f1', // Indigo-500
    pillColor = '#0f172a', // Slate-900
    hoveredPillTextColor = '#ffffff',
    pillTextColor = '#94a3b8', // Slate-400
}) => {
    const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
    const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
    const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);

    useEffect(() => {
        const layout = () => {
            circleRefs.current.forEach((circle, i) => {
                if (!circle?.parentElement) return;

                const pill = circle.parentElement as HTMLElement;
                const rect = pill.getBoundingClientRect();
                const { width: w, height: h } = rect;

                // Calculate circle dimensions based on pill size
                const R = ((w * w) / 4 + h * h) / (2 * h);
                const D = Math.ceil(2 * R) + 2;
                const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
                const originY = D - delta;

                circle.style.width = `${D}px`;
                circle.style.height = `${D}px`;
                circle.style.bottom = `-${delta}px`;

                // Initial state
                gsap.set(circle, {
                    xPercent: -50,
                    scale: 0,
                    transformOrigin: `50% ${originY}px`
                });

                const label = pill.querySelector<HTMLElement>('.pill-label');
                const white = pill.querySelector<HTMLElement>('.pill-label-hover');

                if (label) gsap.set(label, { y: 0 });
                if (white) gsap.set(white, { y: h + 12, opacity: 0 });

                // Create timeline
                tlRefs.current[i]?.kill();
                const tl = gsap.timeline({ paused: true });

                tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.5, ease, overwrite: 'auto' }, 0);

                if (label) {
                    tl.to(label, { y: -(h + 8), duration: 0.5, ease, overwrite: 'auto' }, 0);
                }

                if (white) {
                    gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
                    tl.to(white, { y: 0, opacity: 1, duration: 0.5, ease, overwrite: 'auto' }, 0);
                }

                tlRefs.current[i] = tl;
            });
        };

        // Run layout calculation
        layout();

        const onResize = () => layout();
        window.addEventListener('resize', onResize);

        if (document.fonts) {
            document.fonts.ready.then(layout).catch(() => { });
        }

        // Small delay to ensure DOM is fully rendered
        const timeout = setTimeout(layout, 100);

        return () => {
            window.removeEventListener('resize', onResize);
            clearTimeout(timeout);
        };
    }, [items, ease]); // Re-run if items change

    const handleEnter = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
            duration: 0.3,
            ease,
            overwrite: 'auto'
        });
    };

    const handleLeave = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(0, {
            duration: 0.2,
            ease,
            overwrite: 'auto'
        });
    };

    const cssVars = {
        ['--base']: baseColor,
        ['--pill-bg']: pillColor,
        ['--hover-text']: hoveredPillTextColor,
        ['--pill-text']: pillTextColor,
        ['--nav-h']: '42px',
        ['--pill-pad-x']: '20px',
        ['--pill-gap']: '4px'
    } as React.CSSProperties;

    return (
        <div className={`inline-flex items-center justify-center rounded-full ${className}`} style={cssVars}>
            <div
                className="relative items-center rounded-full flex"
                style={{
                    height: 'var(--nav-h)',
                    background: 'var(--base)',
                    padding: '3px'
                }}
            >
                <ul
                    role="menubar"
                    className="list-none flex items-stretch m-0 p-0 h-full"
                    style={{ gap: 'var(--pill-gap)' }}
                >
                    {items.map((item, i) => {
                        const isActive = activeValue === item.value;

                        const pillStyle: React.CSSProperties = {
                            background: isActive ? 'var(--base)' : 'var(--pill-bg)',
                            color: isActive ? 'var(--hover-text)' : 'var(--pill-text)',
                            paddingLeft: 'var(--pill-pad-x)',
                            paddingRight: 'var(--pill-pad-x)'
                        };

                        return (
                            <li key={item.value} role="none" className="flex h-full">
                                <button
                                    role="menuitem"
                                    onClick={() => onSelect(item.value)}
                                    className="relative overflow-hidden inline-flex items-center justify-center h-full border-none rounded-full font-['Space_Grotesk'] font-semibold text-sm uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors"
                                    style={pillStyle}
                                    onMouseEnter={() => !isActive && handleEnter(i)}
                                    onMouseLeave={() => !isActive && handleLeave(i)}
                                >
                                    {/* Circle Background Animation */}
                                    <span
                                        className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                                        style={{
                                            background: 'var(--base)',
                                            willChange: 'transform'
                                        }}
                                        aria-hidden="true"
                                        ref={el => {
                                            circleRefs.current[i] = el;
                                        }}
                                    />

                                    {/* Label Stack for Slide Animation */}
                                    <span className="label-stack relative inline-block leading-[1] z-[2]">
                                        <span
                                            className="pill-label relative z-[2] inline-block leading-[1]"
                                            style={{ willChange: 'transform' }}
                                        >
                                            {item.label}
                                        </span>

                                        <span
                                            className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                                            style={{
                                                color: 'var(--hover-text)',
                                                willChange: 'transform, opacity'
                                            }}
                                            aria-hidden="true"
                                        >
                                            {item.label}
                                        </span>
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default PillNav;
