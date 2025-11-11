'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  id?: string;
  children?: React.ReactNode;
}

export function DecryptedText({ 
  text, 
  className = '', 
  speed = 50,
  delay = 0,
  id,
  children
}: DecryptedTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDecrypting, setIsDecrypting] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [blurAmount, setBlurAmount] = useState(10);

  // Characters for decryption effect (mix of Persian, English, and symbols)
  const getRandomChar = () => {
    const chars = 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    return chars[Math.floor(Math.random() * chars.length)];
  };

  // Start animation after delay
  useEffect(() => {
    if (delay > 0 && !isStarted) {
      const timeout = setTimeout(() => {
        setIsStarted(true);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (delay === 0) {
      setIsStarted(true);
    }
  }, [delay, isStarted]);

  useEffect(() => {
    // Start decryption animation only after delay
    if (!isStarted) return;
    
    if (currentIndex < text.length) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          
          if (nextIndex <= text.length) {
            // Show random characters while decrypting
            const remainingLength = text.length - nextIndex;
            const randomChars = remainingLength > 0 
              ? Array.from({ length: remainingLength }, () => getRandomChar()).join('')
              : '';
            setDisplayedText(text.slice(0, nextIndex) + randomChars);
            
            // Reduce blur as we progress
            const progress = nextIndex / text.length;
            setBlurAmount(Math.max(0, 10 * (1 - progress)));
            
            if (nextIndex >= text.length) {
              // Decryption complete
              setDisplayedText(text);
              setIsDecrypting(false);
              setBlurAmount(0);
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }
            }
            
            return nextIndex;
          }
          return prev;
        });
      }, speed);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else if (currentIndex >= text.length && isDecrypting) {
      // Decryption complete
      setDisplayedText(text);
      setIsDecrypting(false);
      setBlurAmount(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [currentIndex, text, speed, isDecrypting, isStarted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <motion.span
      id={id}
      className={className}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isStarted ? 1 : 0,
        filter: isDecrypting ? `blur(${blurAmount}px)` : 'blur(0px)',
      }}
      transition={{ duration: 0.1 }}
    >
      {displayedText}
      {isDecrypting && currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-[1em] bg-current ml-1 align-middle"
        />
      )}
    </motion.span>
  );
}
