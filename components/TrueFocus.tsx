'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface TrueFocusProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function TrueFocus({ children, className = '', delay = 0 }: TrueFocusProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.span
      ref={ref}
      className={`relative inline-block overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
      }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: 'easeOut'
      }}
    >
      {/* True Focus spotlight - circular light that smoothly follows mouse */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '120px',
          height: '120px',
          left: mouseXSpring,
          top: mouseYSpring,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.7) 20%, rgba(255, 255, 255, 0.3) 40%, transparent 70%)',
          mixBlendMode: 'overlay',
          borderRadius: '50%',
          filter: 'blur(3px)',
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ 
          opacity: { duration: 0.2 },
          scale: { duration: 0.3 }
        }}
      />
      
      {/* Continuous scanning light beam */}
      {isHovered && (
        <motion.div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            width: '35%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0.5) 80%, transparent 100%)',
            mixBlendMode: 'overlay',
            transform: 'skewX(-12deg)',
          }}
          animate={{
            x: ['-150%', '450%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: 0.4,
          }}
        />
      )}
      
      {/* Outer glow that follows mouse */}
      <motion.div
        className="absolute -inset-3 rounded-lg pointer-events-none blur-xl"
        style={{
          background: isHovered
            ? `radial-gradient(150px circle at ${x.get()}px ${y.get()}px, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.3) 40%, transparent 70%)`
            : 'transparent',
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <span className="relative z-10 block">
        {children}
      </span>
    </motion.span>
  );
}
