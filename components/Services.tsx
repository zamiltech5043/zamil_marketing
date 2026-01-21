
import React, { useRef } from 'react';
import { MapPin, Film, Users, Layout, Target, MousePointer2 } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

const SERVICES = [
  {
    title: 'Google Map Ranking',
    description: 'Boost your interior design visibility on Google Maps and attract more local clients.',
    icon: MapPin
  },
  {
    title: 'Video Editing',
    description: 'Professional high-engagement short-form and long-form content optimized for virality.',
    icon: Film
  },
  {
    title: 'Social Media Marketing',
    description: 'Strategic organic and paid growth across TikTok, Instagram, and LinkedIn.',
    icon: Users
  },
  {
    title: 'Web Development',
    description: 'High-performance, conversion-optimized websites built for modern digital dominance.',
    icon: Layout
  },
  {
    title: 'PPC',
    description: 'Direct-response systems that fill your pipeline with qualified, ready-to-buy leads.',
    icon: Target
  },
  {
    title: 'Google Ads',
    description: 'Precision-targeted search and display campaigns designed for maximum ROAS.',
    icon: MousePointer2
  }
];

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
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 213, 79, 0.15) 0%, transparent 80%)`;

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
        className="absolute inset-0 pointer-events-none z-0" 
        style={{ background: glareBackground }}
      />
      {children}
    </motion.div>
  );
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6 bg-[#050505] overflow-hidden scroll-mt-34">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-[#FFD54F] font-bold tracking-widest text-xs uppercase mb-4 block">Core Expertise</span>
            <h2 className="text-4xl lg:text-5xl font-heading font-black">Full-Spectrum <br/>Digital Dominance</h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-gray-400 max-w-sm"
          >
            We deliver end-to-end digital solutions that focus on the only metric that matters: your bottom line.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <TiltCard className="group h-full p-8 border border-white/5 bg-black hover:border-[#FFD54F]/40 transition-all cursor-default relative overflow-hidden perspective-1000">
                <div 
                  className="w-12 h-12 bg-white/5 group-hover:bg-[#FFD54F] rounded-sm flex items-center justify-center mb-6 transition-colors relative z-10"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <s.icon className="text-white group-hover:text-black transition-colors" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4 relative z-10" style={{ transform: "translateZ(30px)" }}>{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10" style={{ transform: "translateZ(20px)" }}>
                  {s.description}
                </p>
                
                {/* Decorative Z corner */}
                <div className="absolute -bottom-4 -right-4 text-white/[0.03] font-black text-8xl pointer-events-none select-none">
                  Z
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
