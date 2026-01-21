
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center">
          <img 
            src="logo.png" 
            alt="Zamil Marketing" 
            className="h-11 w-auto object-contain"
          />
        </div>
        
        <div className="flex gap-8 text-gray-500 text-sm font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>

        <p className="text-gray-600 text-xs font-medium">
          &copy; {new Date().getFullYear()} Zamil.Marketing Agency. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
