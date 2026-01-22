import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TEAM = [
  {
    name: "Malik Waqas",
    role: "Founder & Chief Strategist",
    img: "/public/team/waqas.png"
  },
  {
    name: "Muzamil Abbas",
    role: "Head of Growth",
    img: "/public/team/muzanil.png"
  },
  {
    name: "Sualeha Arif",
    role: "Marketing Director",
    img: "/public/team/girl1.png"
  },
  {
    name: "Muqadas Arshad",
    role: "Creative Director",
    img: "/public/team/girl2.png"
  }
];

const TeamMemberCard = ({ member }: { member: typeof TEAM[0] }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30
  });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const rect = currentTarget.getBoundingClientRect();
    x.set(clientX / rect.width - rect.left / rect.width - 0.5);
    y.set(clientY / rect.height - rect.top / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.6 }
        }
      }}
      className="group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative bg-[#0A0A0A] border border-white/5 p-4 rounded-sm transition-colors hover:border-[#FFD54F]/30"
      >
        <div
          className="aspect-square bg-[#111] overflow-hidden mb-6 relative border border-white/5"
          style={{ transform: 'translateZ(30px)' }}
        >
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
          />
        </div>

        <div style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-xl font-bold group-hover:text-[#FFD54F] transition-colors">
            {member.name}
          </h3>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">
            {member.role}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 px-6 bg-[#050505] scroll-mt-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-[#FFD54F] font-bold tracking-widest text-xs uppercase mb-4 block">
            The Brains
          </span>
          <h2 className="text-4xl lg:text-5xl font-heading font-black">
            Our Core Team
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {TEAM.map((member, idx) => (
            <TeamMemberCard key={idx} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
