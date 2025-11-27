import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onFinished }: { onFinished: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                // Random increment for more "realistic" feel
                const increment = Math.random() * 15;
                return Math.min(prev + increment, 100);
            });
        }, 150);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            // Small delay before finishing to let the user see 100%
            const timeout = setTimeout(() => {
                onFinished();
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [progress, onFinished]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <div className="relative">
                {/* Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-['Permanent_Marker'] text-white mb-4 tracking-wider"
                >
                    Bonialeart
                </motion.h1>

                {/* Scribble underline animation */}
                <svg viewBox="0 0 200 20" className="w-full h-6 text-indigo-500 opacity-80 absolute -bottom-4 left-0">
                    <motion.path
                        d="M5,15 Q50,5 100,12 T195,8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: progress / 100 }}
                        transition={{ duration: 0.1 }}
                    />
                </svg>
            </div>

            {/* Percentage */}
            <div className="mt-8 font-mono text-indigo-400 text-sm md:text-base">
                {Math.round(progress)}%
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
