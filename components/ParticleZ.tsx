
import React, { useEffect, useRef } from 'react';

export const ParticleZ: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999 };
    const interactionRadius = 100;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      
      if (rect.width === 0 || rect.height === 0) return;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.scale(dpr, dpr);
      init(rect.width, rect.height);
    };

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      vx: number;
      vy: number;
      friction: number;
      ease: number;
      color: string;
      
      constructor(x: number, y: number, containerWidth: number, containerHeight: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = (Math.random() * 1.2) + 0.8;
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.92; // Higher friction for fluid feel
        this.ease = 0.04 + Math.random() * 0.04;
        
        const l = 45 + Math.random() * 25;
        this.color = `hsl(45, 100%, ${l}%)`;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius;
            const angle = Math.atan2(dy, dx);
            
            // Push away velocity
            const pushX = Math.cos(angle) * force * 8;
            const pushY = Math.sin(angle) * force * 8;
            
            this.vx -= pushX;
            this.vy -= pushY;
        }

        // Home-seeking force
        const homeDx = (this.baseX - this.x) * this.ease;
        const homeDy = (this.baseY - this.y) * this.ease;

        this.vx += homeDx;
        this.vy += homeDy;

        // Apply physics
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    function init(width: number, height: number) {
      if (width <= 0 || height <= 0) return;
      particles = [];
      
      const fontSize = Math.min(width, height) * 0.9;
      ctx!.fillStyle = 'white';
      ctx!.font = `900 ${fontSize}px Montserrat, sans-serif`;
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      ctx!.fillText('Z', width / 2, height / 2);

      const dpr = window.devicePixelRatio || 1;
      const imageData = ctx!.getImageData(0, 0, width * dpr, height * dpr);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      
      const step = Math.floor(5 * dpr); 
      
      for (let y = 0; y < imageData.height; y += step) {
        for (let x = 0; x < imageData.width; x += step) {
          if (imageData.data[(y * 4 * imageData.width) + (x * 4) + 3] > 128) {
            particles.push(new Particle(x / dpr, y / dpr, width, height));
          }
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
        mouse.x = -9999;
        mouse.y = -9999;
    }

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-visible">
      <canvas ref={canvasRef} className="cursor-default" />
    </div>
  );
};
