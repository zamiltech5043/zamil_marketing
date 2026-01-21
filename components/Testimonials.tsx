
import React from 'react';
import { Quote, Star } from 'lucide-react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

const REVIEWS = [
  {
    text: "As an interior designer, visuals are everything. Zamil.Marketing took our raw project footage and turned them into stunning Instagram Reels. Our engagement has skyrocketed, and we’ve booked three high-ticket renovations just from Meta Ads this month!",
    author: "Sarah Jenkins",
    company: "Luxe Haven Interiors",
    rating: 5
  },
  {
    text: "We struggled to show up on Google for years. Within weeks of their Google Map SEO service, we jumped into the Top 3 'Map Pack.' Now, when people search for furniture stores in our city, we are the first ones they call.",
    author: "Robert Chen",
    company: "Heritage Oak Furniture",
    rating: 5
  },
  {
    text: "The website they developed for us is breathtaking. It’s fast, mobile-friendly, and perfectly showcases our design portfolio. Our clients constantly comment on how professional our site looks. Truly a game-changer for our brand.",
    author: "Elena Rodriguez",
    company: "Studio Blue Designs",
    rating: 5
  },
  {
    text: "I was skeptical about Google Ads for high-end furniture, but the targeting strategy used here is brilliant. We aren't just getting clicks; we are getting high-intent buyers looking for custom pieces. The ROI has been incredible.",
    author: "Jameson Blake",
    company: "Artisan Living Co.",
    rating: 5
  },
  {
    text: "Their SEO strategy is top-notch. We now rank #1 for 'Modern Interior Designer' in our region. Our organic inquiries have tripled, and we no longer have to rely solely on word-of-mouth referrals.",
    author: "Sophia Thorne",
    company: "Thorne & Co. Interiors",
    rating: 5
  },
  {
    text: "Handling social media was taking up all my time. Handing it over to this team was the best move. They handle the posting, the video editing, and the ad management seamlessly. I can finally focus on my actual design work.",
    author: "Marcus Thorne",
    company: "Urban Space Aesthetics",
    rating: 5
  },
  {
    text: "The video editing quality is unmatched. They know exactly how to time the transitions for 'Before & After' reveals that go viral on TikTok. Our follower count grew by 5,000 in just two months.",
    author: "Chloe Whitaker",
    company: "Whitaker Design Studio",
    rating: 5
  },
  {
    text: "If you want someone who understands the luxury market, look no further. Their Meta Ads funnel captured leads we couldn't reach before. The quality of clients coming through our doors has significantly improved.",
    author: "David Vance",
    company: "Vance Luxury Furniture",
    rating: 5
  },
  {
    text: "Outstanding website problem-solving. My previous site was slow and kept crashing during sales. They fixed the backend issues and optimized the speed, and now our checkout process is smoother than ever.",
    author: "Amina Al-Fayed",
    company: "Desert Rose Decor",
    rating: 5
  }
];

const TestimonialCard = ({ review, idx }: { review: typeof REVIEWS[0], idx: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightColor = "rgba(255, 213, 79, 0.12)";
  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.2, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      className="group bg-[#0A0A0A] border border-white/5 p-8 relative hover:border-[#FFD54F]/20 transition-all duration-300"
    >
      <motion.div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300 z-0"
        style={{ background }}
      />
      
      <div className="relative z-10">
        <Quote className="text-[#FFD54F] mb-6 opacity-40" size={32} />
        <div className="flex mb-4">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} size={14} className="text-[#FFD54F] fill-[#FFD54F]" />
          ))}
        </div>
        <p className="text-gray-300 leading-relaxed mb-8 italic">
          "{review.text}"
        </p>
        <div>
          <p className="font-bold text-white group-hover:text-[#FFD54F] transition-colors">{review.author}</p>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{review.company}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Background Decorative Element */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFD54F]/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#FFD54F] font-bold tracking-widest text-xs uppercase mb-4 block">Testimonials</span>
          <h2 className="text-4xl lg:text-5xl font-heading font-black">Trusted by Global Brands</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <TestimonialCard key={idx} review={review} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
