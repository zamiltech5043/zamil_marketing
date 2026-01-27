
import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-center space-y-4 z-[90]">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white rounded-full hover:bg-[#FFD54F] hover:text-black transition-all shadow-2xl"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/+923217795218"
        target="_blank"
        rel="noopener noreferrer"
        // className="w-14 h-14 bg-[#25D366] flex items-center justify-center text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] transition-all relative group"
        aria-label="Contact on WhatsApp"
      >
        <span className="absolute -left-32 bg-black/80 backdrop-blur-md text-white text-xs py-2 px-4 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest font-bold border border-white/10 whitespace-nowrap">
          Chat with us
        </span>
        {/* <MessageCircle size={32} fill="currentColor" /> */}
        <img src="/whatsapp-logo.webp" alt="WhatsApp" width={64} height={64} />
      </motion.a>
    </div>
  );
};
