
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ParticleZ } from './ParticleZ';

interface HeroProps {
  onGetProposal: (url: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetProposal }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onGetProposal(url);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Content */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center z-10"
          >
            <motion.span variants={fadeInUp} className="className="text-[28px] lg:text-[40px] font-heading font-black leading-[1.2] mb-6"">
              Top Rated and Award Winning
            </motion.span>
            
            <motion.h1 variants={fadeInUp} className="text-[28px] lg:text-[40px] font-black leading-[1.2] mb-6">
              "Marketing Leader with 3+ Years of
 <br />
              <span className="relative inline-block">
                 Experience in Web Development, Graphic Designing & Digital Marketing"
                <motion.svg 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                  className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 340 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10C50 4 150 2 338 10" stroke="#FFD54F" strokeWidth="4" strokeLinecap="round" />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="className="text-3xl lg:text-4xl font-heading font-black leading-[1.2] mb-6">
              We provide results-driven marketing for interior design, including Google Map ranking, SEO, and social & search ads.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
              <motion.a 
                href="https://forms.gle/Y1WzQjVdFUdvtFJd9"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FFD54F] hover:bg-[#ffe082] text-black font-black px-8 py-4 rounded-sm uppercase tracking-tighter whitespace-nowrap text-center"
              >
                Get My Free Proposal
              </motion.a>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="mt-8 flex items-center space-x-4 opacity-50">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/${i}/40/40`} className="w-8 h-8 rounded-full border-2 border-black" alt="Client" />
                ))}
              </div>
              <span className="text-xs font-semibold">Join 500+ successful partners</span>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Particle Z (Hidden on Mobile) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="lg:col-span-5 relative hidden lg:flex items-center justify-center min-h-[500px] pointer-events-auto"
          >
            <div className="absolute inset-0 w-full h-full">
              <ParticleZ />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
