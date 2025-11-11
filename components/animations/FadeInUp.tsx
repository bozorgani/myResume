'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  viewport?: { once?: boolean; amount?: number };
}

export function FadeInUp({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = '',
  viewport = { once: true, amount: 0.3 }
}: FadeInUpProps) {
  const isMobile = useIsMobile();
  
  // On mobile, disable animations for better scroll performance
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1] // easeOut cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

