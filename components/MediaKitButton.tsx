import React from 'react';
import { motion } from 'framer-motion';

const MediaKitButton = () => {
    return (
        <motion.a
            href="https://bonialemediakit.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="
        fixed bottom-8 right-8 z-50
        flex items-center gap-2 px-6 py-3
        bg-[#E91E63] text-white border-3 border-black 
        shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
        hover:translate-x-[2px] hover:translate-y-[2px] 
        hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
        transition-all duration-200
        font-['Permanent_Marker'] tracking-wider text-base md:text-lg
        transform -rotate-2 hover:rotate-0
      "
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: -2 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
            whileHover={{ scale: 1.05 }}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M12 18v-6" />
                <path d="M9 15l3 3 3-3" />
            </svg>
            MEDIA KIT
        </motion.a>
    );
};

export default MediaKitButton;
