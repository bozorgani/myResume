import { useRef, useCallback } from 'react';

/**
 * Optimized mouse move handler that batches DOM reads using requestAnimationFrame
 * to prevent forced reflows
 */
export function useOptimizedMouseMove<T extends HTMLElement>(
  ref: React.RefObject<T>,
  onMove: (rect: DOMRect, mouseX: number, mouseY: number, xPct: number, yPct: number) => void
) {
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastEventRef = useRef<React.MouseEvent<T> | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<T>) => {
    if (!ref.current) return;
    
    // Store the latest event
    lastEventRef.current = e;
    
    // Throttle DOM reads using requestAnimationFrame
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current || !lastEventRef.current) {
          rafRef.current = null;
          return;
        }
        
        // Batch DOM read - only read once per frame
        if (!rectRef.current) {
          rectRef.current = ref.current.getBoundingClientRect();
        }
        
        const rect = rectRef.current;
        const mouseX = lastEventRef.current.clientX - rect.left;
        const mouseY = lastEventRef.current.clientY - rect.top;
        const xPct = mouseX / rect.width - 0.5;
        const yPct = mouseY / rect.height - 0.5;
        
        onMove(rect, mouseX, mouseY, xPct, yPct);
        
        rafRef.current = null;
        lastEventRef.current = null;
      });
    }
  }, [ref, onMove]);

  const handleMouseLeave = useCallback(() => {
    // Cancel pending animation frame
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    
    // Invalidate cached rect
    rectRef.current = null;
    lastEventRef.current = null;
  }, []);

  return { handleMouseMove, handleMouseLeave };
}

