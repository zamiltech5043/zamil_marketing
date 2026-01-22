import React from 'react';
import { Play } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

// --- TILT CARD COMPONENT ---
const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 213, 79, 0.1) 0%, transparent 70%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <motion.div 
        className="absolute inset-0 pointer-events-none z-10" 
        style={{ background: glareBackground }}
      />
      {children}
    </motion.div>
  );
};

// --- MAIN PORTFOLIO SECTION ---
export const Portfolio: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="portfolio" className="py-24 px-6 bg-black scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#FFD54F] font-bold tracking-widest text-xs uppercase mb-4 block">Our Previous Work</span>
          <h2 className="text-4xl lg:text-6xl font-black uppercase text-white">Battle-Tested Results</h2>
        </motion.div>

        {/* 1. Video Reels Section */}
        <div className="mb-24">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl text-white font-bold mb-8 border-l-4 border-[#FFD54F] pl-4"
          >
            Video Editing Reels 
          </motion.h3>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {["zamil1.mp4", "zamil2.mp4", "zamil3.mp4", "zamil4.mp4"].map((video, index) => (
              <motion.div key={`video-${index}`} variants={itemVariants} className="perspective-1000">
                <TiltCard className="aspect-[9/16] bg-[#0A0A0A] rounded-sm relative group overflow-hidden cursor-pointer border border-white/5 hover:border-[#FFD54F]/30">
                  <video
                    src={`/videos/${video}`}
                    autoPlay loop muted playsInline
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-14 h-14 bg-[#FFD54F] rounded-full flex items-center justify-center text-black group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,213,79,0.4)]" style={{ transform: "translateZ(60px)" }}>
                      <Play fill="currentColor" size={24} className="ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 z-20" style={{ transform: "translateZ(40px)" }}>
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-[#FFD54F]">Campaign #{index + 1}</p>
                    <p className="text-sm font-bold text-white truncate">Premium Edit</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

       {/* 2. SEO & Ads Portfolio Section */}
<div className="mb-24">
  <motion.h3 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="text-2xl text-white font-bold mb-8 border-l-4 border-[#FFD54F] pl-4"
  >
    SEO & Ads Case Studies
  </motion.h3>

  <motion.div 
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    {[
      { title: "SEO Optimization", subtitle: "Top Rankings for Interior Design" },
      { title: "Google Maps Ranking", subtitle: "Local 3-Pack for Furniture" },
      { title: "Meta Ads Performance", subtitle: "High-ROI Social Campaigns" },
      { title: "Business Growth", subtitle: "Lead Gen for Decor Brands" },
      { title: "Local SEO Strategy", subtitle: "City-Wide Search Dominance" },
      { title: "Conversion Funnel", subtitle: "Paid Ads Strategy" },
      { title: "Viral Video Marketing", subtitle: "High-Engagement Furniture Reels" },
      { title: "Web Speed Optimization", subtitle: "UX Improvements for Design Sites" },
      { title: "Brand Authority", subtitle: "Dominating the Interior Niche" }
    ].map((item, index) => (
      <motion.div key={`case-${index}`} variants={itemVariants} className="group perspective-1000 cursor-pointer">
        <TiltCard className="aspect-[16/9] bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden relative hover:border-[#FFD54F]/40 transition-all duration-500">
          
          {/* IMAGE - 1024x622 fits perfectly here */}
          <img
            src={`/public/img${index + 1}.png`}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-70"
          />

          {/* OVERLAY GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* FLOATING TEXT ON TILT */}
          <div 
            className="absolute bottom-6 left-6 right-6 z-20" 
            style={{ transform: "translateZ(40px)" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-tighter text-[#FFD54F]">
              {item.title}
            </p>
            <p className="text-sm font-bold text-white truncate">
              {item.subtitle}
            </p>
          </div>
        </TiltCard>
      </motion.div>
    ))}
  </motion.div>
</div>
        {/* 3. Web Experiences Section */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl text-white font-bold mb-8 border-l-4 border-[#FFD54F] pl-4"
          >
            Web Development Projects
          </motion.h3>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { title: "Faboolux Interior Design", service: "Interior Design", link: "https://faboolux.com", img: "/components/website/web1.png" },
              { title: "Aura Interiors", service: "Luxury Brand Interior ", link: "https://aurainteriors.pk", img: "/components/website/web2.png" },
              { title: "Awesome Interiors", service: "Premium Portfolio Site", link: "https://awesomeinteriors.co.in", img: "/components/website/web3.png" },
              { title: "Good Luck Interiors", service: "Interior Platform Design", link: "https://www.goodluckinteriors.com", img: "/components/website/web4.png" },
              { title: "Level UAE", service: "Interior & Furniture", link: "https://www.leveluae.com/", img: "/components/website/web5.png" },
              { title: "Living by SNP", service: "Interior Design Company", link: "https://livingbysnp.com/", img: "/components/website/web6.png" }
            ].map((project, index) => (
              <motion.div variants={itemVariants} key={`web-${index}`} className="group perspective-1000">
                <TiltCard className="bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden relative hover:border-[#FFD54F]/40 transition-all duration-500 flex flex-col h-full">
                  <div className="aspect-[19/9] overflow-hidden">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow bg-[#0A0A0A]" style={{ transform: "translateZ(30px)" }}>
                    <h4 className="text-xl font-bold text-white group-hover:text-[#FFD54F] transition-colors mb-2">{project.title}</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-6">{project.service}</p>
                    <div className="mt-auto">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-black text-[10px] font-black px-6 py-3 uppercase tracking-tighter hover:bg-[#FFD54F] transition-colors"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
