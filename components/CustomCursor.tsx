import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Since we forced cursor: none in CSS, we can't use getComputedStyle.
      // We must check the tag name or parent tags.
      const target = e.target as HTMLElement;
      const clickableTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'LABEL', 'SELECT'];
      
      // Check if target or any parent is clickable
      const isClickable = 
        clickableTags.includes(target.tagName) || 
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.onclick !== null; // rough check for JS click handlers

      setIsPointer(!!isClickable);
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <>
      {/* Main Pen Tip */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference"
        animate={{
          x: mousePosition.x - 2, // Align tip
          y: mousePosition.y - 2,
          rotate: isPointer ? 45 : 0,
          scale: isPointer ? 1.2 : 1
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.1
        }}
      >
        {/* SVG Pen Icon */}
        <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0px 0px 2px black)' }}
        >
            <path d="M12 19l7-7 3 3-7 7-3-3z" fill="white" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="M2 2l7.586 7.586" />
            <circle cx="11" cy="11" r="2" fill="black" />
        </svg>
      </motion.div>
    </>
  );
};

export default CustomCursor;