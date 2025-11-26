
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for background changes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Sobre Mí' },
    { id: 'qualities', label: 'Cualidades' },
    { id: 'skills', label: 'Skills' },
    { id: 'gallery', label: 'Galería' },
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <>
      {/* Changed md:flex to lg:flex to keep hamburger on tablets */}
      <nav className={`fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/5' : ''} pointer-events-auto text-white`}>
        <div 
          className="text-xl md:text-2xl font-bold tracking-widest uppercase cursor-pointer z-50 relative"
          onClick={() => scrollToSection('home')}
        >
          Bonialeart
        </div>

        {/* Desktop Menu - Visible only on Large screens (Laptops/Desktops) */}
        <div className="hidden lg:flex gap-8 text-sm tracking-wide mix-blend-difference">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`} 
              onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }} 
              className="hover:text-indigo-400 transition-colors cursor-pointer uppercase font-medium text-slate-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile/Tablet Hamburger - Visible on md and below */}
        <button 
          className="lg:hidden z-50 p-2 text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile/Tablet Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-slate-950 z-40 flex flex-col items-center justify-center pointer-events-auto px-6"
          >
             {/* Decorative Background */}
             <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600 rounded-full blur-[100px]"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-600 rounded-full blur-[100px]"></div>
             </div>

            <div className="flex flex-col gap-8 text-center z-10 w-full max-w-md">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                  className="text-4xl md:text-5xl font-['Space_Grotesk'] font-light text-slate-200 hover:text-indigo-400 transition-colors cursor-pointer border-b border-slate-800 pb-4 w-full"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
