'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagicBentoCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
}

export function MagicBentoCard({ 
  children, 
  className = '', 
  glowColor = 'rgba(59, 130, 246, 0.5)',
  intensity = 0.3
}: MagicBentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, {
    stiffness: 500,
    damping: 100
  });
  const mouseYSpring = useSpring(y, {
    stiffness: 500,
    damping: 100
  });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    setMousePosition({ x: (mouseX / width) * 100, y: (mouseY / height) * 100 });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    setMousePosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      className={`relative group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Animated gradient border */}
      <motion.div 
        className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8))',
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      {/* Glow effect that follows mouse */}
      <motion.div
        className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, ${glowColor}, transparent 40%)`,
        }}
      />

      {/* Card content */}
      <motion.div
        className="relative h-full"
        style={{
          transform: 'translateZ(10px)',
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
