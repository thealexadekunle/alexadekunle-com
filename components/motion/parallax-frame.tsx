"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { subscribeScroll } from "@/lib/motion/scroll-store";
import { useReducedMotion } from "@/lib/motion/use-media-query";

type ParallaxFrameProps = {
  readonly children: ReactNode;
  readonly speed?: number;
  readonly className?: string;
};

/**
 * Vertical drift inside the frame's own overflow, so media lags the scroll
 * without ever overlapping neighbouring copy. Geometry is cached and only
 * re-read on resize; the transform is the only thing written per frame.
 */
export function ParallaxFrame({ children, speed = 0.055, className }: ParallaxFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;

    let top = 0;
    let height = 0;
    let current = 0;

    const measure = () => {
      const rect = element.getBoundingClientRect();
      top = rect.top + window.scrollY;
      height = rect.height;
    };
    measure();

    const unsubscribe = subscribeScroll(({ y }) => {
      const viewport = window.innerHeight;
      const centre = top + height / 2 - y - viewport / 2;
      if (centre < -viewport * 1.6 || centre > viewport * 1.6) return;
      const target = centre * -speed;
      current += (target - current) * 0.12;
      element.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
    });

    window.addEventListener("resize", measure, { passive: true });
    return () => {
      unsubscribe();
      window.removeEventListener("resize", measure);
    };
  }, [reduced, speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
