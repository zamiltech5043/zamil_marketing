
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#portfolio' },
    { name: 'Team', href: '#team' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        if (isOpen) toggleMenu();
      }
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
            className="flex items-center group"
          >
            <motion.img 
              src="logo.png" 
              alt="Zamil Marketing" 
              className="h-12 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-[#FFD54F] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://forms.gle/Y1WzQjVdFUdvtFJd9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFD54F] hover:bg-white transition-all text-black font-black px-6 py-2 rounded-sm text-xs uppercase tracking-widest inline-block"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
             <a 
              href="https://forms.gle/Y1WzQjVdFUdvtFJd9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFD54F] text-black font-black px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest inline-block"
             >
              Quote
            </a>
            <button 
              onClick={toggleMenu}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-black flex flex-col p-8"
          >
            <div className="flex items-center justify-between mb-20">
              <img 
                src="logo.png" 
                alt="Zamil Marketing" 
                className="h-10 w-auto object-contain"
              />
              <button 
                onClick={toggleMenu}
                className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col space-y-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-4xl font-heading font-black text-white hover:text-[#FFD54F] transition-colors uppercase tracking-tighter flex items-center justify-between group"
                >
                  {link.name}
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FFD54F]" size={32} />
                </motion.a>
              ))}
            </div>

            <div className="mt-auto border-t border-white/10 pt-8">
              <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-6">Start a conversation</p>
              <a href="mailto:hello@zamil.marketing" className="text-2xl font-bold text-white block mb-2">hello@zamil.marketing</a>
              <p className="text-[#FFD54F] font-bold tracking-widest">+1 (555) 000-ZAMIL</p>
              
              <button 
                onClick={() => { toggleMenu(); onOpenQuote(); }}
                className="w-full mt-10 bg-[#FFD54F] text-black font-black py-5 uppercase tracking-widest text-sm hover:bg-white transition-colors"
              >
                Get Your Proposal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
