"use client";
import { useEffect } from "react";

// Spring-like ease out (overshoots slightly then settles)
function easeOutBack(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

export default function SmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;
      
      const href = anchor.getAttribute("href");
      // Only intercept internal # links
      if (!href || !href.startsWith("#") || href.length === 1) return;
      
      const targetElement = document.querySelector(href);
      if (!targetElement) return;
      
      e.preventDefault();
      
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      
      let start: number | null = null;
      // Duration of the jump animation in ms
      const duration = 1000; 
      
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percent = Math.min(progress / duration, 1);
        
        // Apply spring easing
        const ease = easeOutBack(percent);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (progress < duration) {
          window.requestAnimationFrame(step);
        } else {
          // Ensure we land exactly on target
          window.scrollTo(0, targetPosition);
          // Update URL hash without causing a jump
          window.history.pushState(null, "", href);
        }
      };
      
      window.requestAnimationFrame(step);
    };

    // Use capturing phase to intercept before Next.js Link or other handlers
    document.addEventListener("click", handleAnchorClick, { capture: true });
    
    return () => document.removeEventListener("click", handleAnchorClick, { capture: true });
  }, []);
  
  return null;
}
