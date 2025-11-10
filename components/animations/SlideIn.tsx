'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Direction = 'left' | 'right' | 'up' | 'down';

interface SlideInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
  viewport?: { once?: boolean; amount?: number };
}

const directionMap: Record<Direction, { x?: number; y?: number }> = {
  left: { x: -50 },
  right: { x: 50 },
  up: { y: -50 },
  down: { y: 50 }
};

export function SlideIn({ 
  children, 
  direction = 'up',
  delay = 0, 
  duration = 0.6,
  className = '',
  distance = 30,
  viewport = { once: true, amount: 0.3 }
}: SlideInProps) {
  const { x = 0, y = 0 } = directionMap[direction];
  
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: x ? x * (distance / 30) : 0,
        y: y ? y * (distance / 30) : 0
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0,
        y: 0
      }}
      viewport={viewport}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

