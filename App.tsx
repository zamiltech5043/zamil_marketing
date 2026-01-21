
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Team } from './components/Team';
import { Testimonials } from './components/Testimonials';
import { ProposalModal } from './components/ProposalModal';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { motion, useScroll } from 'framer-motion';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('');

  const handleOpenProposal = (url: string = '') => {
    setWebsiteUrl(url);
    setIsModalOpen(true);
  };

  const { scrollYProgress } = useScroll();

  return (
    <div className="relative bg-black text-white selection:bg-[#FFD54F] selection:text-black min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#FFD54F] z-[100] origin-left pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />

      <Navbar onOpenQuote={() => handleOpenProposal('')} />
      
      <main className="relative">
        <Hero onGetProposal={handleOpenProposal} />
        <Services />
        <Portfolio />
        
        {/* Stats Section */}
        <section className="py-24 px-6 border-y border-white/5 bg-[#050505] relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
            {[
              { val: "125%", label: "Avg ROI Increase" },
              { val: "500+", label: "Campaigns Launched" },
              { val: "24/7", label: "Active Support" },
              { val: "15M+", label: "Ad Spend Managed" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group cursor-default"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="inline-block"
                >
                  <div className="text-4xl lg:text-6xl font-heading font-black text-white group-hover:text-[#FFD54F] transition-colors duration-300 mb-2">
                    {stat.val}
                  </div>
                  <div className="text-gray-500 group-hover:text-gray-300 transition-colors uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold">
                    {stat.label}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* Subtle Background Accent */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        </section>

        <Team />
        <Testimonials />
      </main>

      <Footer />
      
      {/* Sticky floating buttons */}
      <FloatingActions />

      <ProposalModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        websiteUrl={websiteUrl} 
      />
    </div>
  );
};

export default App;
