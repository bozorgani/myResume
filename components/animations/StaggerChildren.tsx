'use client';

import { motion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  viewport?: { once?: boolean; amount?: number };
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export function StaggerChildren({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  viewport = { once: true, amount: 0.2 }
}: StaggerChildrenProps) {
  const isMobile = useIsMobile();
  
  // On mobile, disable stagger animations for better scroll performance
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }
  
  const customVariants: Variants = {
    ...containerVariants,
    visible: {
      ...containerVariants.visible,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={customVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  const isMobile = useIsMobile();
  
  // On mobile, render without animation
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

