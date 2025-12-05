
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Detect scroll for background changes and hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled down
      if (currentScrollY > 50) {
        setScrolled(true);
        // Hide if scrolling down and not at the top
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          // Show if scrolling up
          setIsVisible(true);
        }
      } else {
        setScrolled(false);
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
    { id: 'skills', label: 'Habilidades' },
    { id: 'gallery', label: 'Galería' },
    { id: 'services', label: 'Servicios' },
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <>
      {/* Changed md:flex to lg:flex to keep hamburger on tablets */}
      <nav className={`fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/5' : ''} ${!isVisible && !isOpen ? '-translate-y-full' : 'translate-y-0'} pointer-events-auto text-white`}>
        <div
          className="text-xl md:text-2xl font-bold tracking-widest uppercase cursor-pointer z-50 relative"
          onClick={() => scrollToSection('home')}
        >
          <img
            src="https://www.dropbox.com/scl/fi/9q9hko6g1xf1h7llrog4l/logo.png?rlkey=nzog3afkbp36668f9nv6hbihv&st=t74qbrli&raw=1"
            alt="Bonialeart Logo"
            className="h-14 md:h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Desktop Menu - Visible only on Large screens (Laptops/Desktops) */}
        <div className="hidden lg:flex gap-4 text-sm tracking-wide items-center">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
              className="relative group px-4 py-2 cursor-pointer"
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              initial={{ rotate: 0 }}
            >
              {/* Paper Background */}
              <div className={`absolute inset-0 ${link.id === 'contact' ? 'bg-[#ffbd2e]' : 'bg-[#f1f5f9]'} shadow-md transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} group-hover:rotate-0 transition-transform duration-300 rounded-sm`}></div>

              {/* Tape Effect */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-white/40 backdrop-blur-[1px] rotate-[-2deg] shadow-sm z-10 border-l border-r border-white/20"></div>

              {/* Text */}
              <span className={`relative z-10 font-['Permanent_Marker'] ${link.id === 'contact' ? 'text-slate-900 group-hover:text-white' : 'text-slate-900 group-hover:text-indigo-600'} transition-colors text-sm md:text-base`}>
                {link.label}
              </span>
            </motion.a>
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
