'use client';

import { useEffect, useRef, useMemo, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '@/hooks/useIsMobile';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';
  id?: string;
}

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  as = 'h2',
  id
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  
  const isTextOnly = typeof children === 'string' || typeof children === 'number';
  
  const splitText = useMemo(() => {
    // If children is a string or number, split it into words
    if (isTextOnly) {
      const text = String(children);
      return text.split(/(\s+)/).map((word, index) => {
        if (word.match(/^\s+$/)) return word;
        return (
          <span className="word" key={index}>
            {word}
          </span>
        );
      });
    }
    
    // For JSX content, we'll animate the whole element
    return null;
  }, [children, isTextOnly]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Disable animation on mobile
    if (isMobile) {
      gsap.set(el, { opacity: 1, rotate: 0, filter: 'blur(0px)' });
      const wordElements = el.querySelectorAll('.word');
      if (wordElements.length > 0) {
        gsap.set(wordElements, { opacity: 1, filter: 'blur(0px)', y: 0 });
      }
      return;
    }

    const scroller = scrollContainerRef?.current || window;

    // Check if element is at top for immediate animation
    const rect = el.getBoundingClientRect();
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
    const isAtTop = rect.top < windowHeight * 0.3;
    const isInViewport = rect.top < windowHeight && rect.bottom > 0;

    // Rotation animation for the container
    if (isAtTop && isInViewport) {
      // If at top, animate immediately
      gsap.fromTo(
        el,
        { 
          transformOrigin: '0% 50%', 
          rotate: baseRotation,
          opacity: 0.3
        },
        {
          ease: 'power2.out',
          rotate: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.1
        }
      );
    } else {
      // Otherwise use scroll trigger
      gsap.fromTo(
        el,
        { 
          transformOrigin: '0% 50%', 
          rotate: baseRotation,
          opacity: 0.3
        },
        {
          ease: 'none',
          rotate: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: el,
            scroller: scroller as any,
            start: 'top bottom',
            end: rotationEnd,
            scrub: 1,
            invalidateOnRefresh: true
          }
        }
      );
    }

    const wordElements = el.querySelectorAll('.word');
    
    if (wordElements.length > 0 && isTextOnly) {
      // Use the rect and checks already defined above
      
      // Set initial state for all words
      // If already in viewport and at top, show immediately with animation
      const initialOpacity = baseOpacity;
      const initialY = 20;
      const initialBlur = enableBlur ? `blur(${blurStrength}px)` : 'none';
      
      gsap.set(wordElements, {
        opacity: initialOpacity,
        filter: initialBlur,
        y: initialY,
        willChange: 'opacity, filter, transform'
      });

      // If element is at top of page, animate immediately without scroll trigger
      if (isAtTop && isInViewport) {
        gsap.to(wordElements, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: {
            amount: 0.8,
            from: 'start'
          },
          ease: 'power2.out',
          delay: 0.2
        });
      } else {
        // Create a timeline for smoother animation with scroll trigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            scroller: scroller as any,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: 1.5,
            invalidateOnRefresh: true,
            // If already past the start point, complete immediately
            onEnter: () => {
              gsap.to(wordElements, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.5,
                stagger: 0.05,
                ease: 'power2.out'
              });
            }
          }
        });

        // Animate words with stagger
        tl.to(wordElements, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: {
            amount: 0.8,
            from: 'start'
          },
          ease: 'power2.out'
        });

        // Blur animation with stagger
        if (enableBlur) {
          tl.to(wordElements, {
            filter: 'blur(0px)',
            duration: 1,
            stagger: {
              amount: 0.8,
              from: 'start'
            },
            ease: 'power2.out'
          }, 0); // Start at the same time as opacity
        }
      }
    } else if (!isTextOnly) {
      // For JSX content, animate the whole element
      const rect = el.getBoundingClientRect();
      const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
      const isInViewport = rect.top < windowHeight && rect.bottom > 0;
      const initialOpacity = (isInViewport && rect.top < windowHeight * 0.5) ? 1 : baseOpacity;
      const initialY = (isInViewport && rect.top < windowHeight * 0.5) ? 0 : 50;
      const initialBlur = (isInViewport && rect.top < windowHeight * 0.5) ? 'blur(0px)' : (enableBlur ? `blur(${blurStrength}px)` : 'none');
      
      gsap.set(el, {
        opacity: initialOpacity,
        filter: initialBlur,
        y: initialY
      });
      
      gsap.fromTo(
        el,
        { 
          opacity: initialOpacity,
          filter: initialBlur,
          y: initialY
        },
        {
          ease: 'power2.out',
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          scrollTrigger: {
            trigger: el,
            scroller: scroller as any,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: 1.5,
            invalidateOnRefresh: true
          }
        }
      );
      
      // Fallback for JSX content
      if (isInViewport && rect.top < windowHeight * 0.3) {
        setTimeout(() => {
          gsap.to(el, {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          });
        }, 100);
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength, isTextOnly, isMobile]);

  const Component = as;

  return (
    <Component 
      ref={containerRef as any} 
      className={`scroll-reveal ${containerClassName}`}
      {...(id ? { id } : {})}
    >
      {isTextOnly && splitText ? (
        <span className={`scroll-reveal-text ${textClassName}`}>{splitText}</span>
      ) : (
        <span className={`scroll-reveal-text ${textClassName}`}>
          {children}
        </span>
      )}
    </Component>
  );
};

export default ScrollReveal;
