"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "./use-reduced-motion";
import { setScrollState } from "./scroll-store";

/**
 * Inertial scrolling. Mounted once in the root layout; owns the only
 * requestAnimationFrame loop that drives scroll position, and publishes the
 * result to the shared scroll store.
 *
 * Native scrolling is left alone when the user prefers reduced motion.
 */
export function SmoothScroll(): null {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrollState({
          y: window.scrollY,
          velocity: 0,
          direction: 1,
          progress: max > 0 ? window.scrollY / max : 0,
        });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.09,
    });

    lenis.on("scroll", (event: { scroll: number; velocity: number; progress: number }) => {
      setScrollState({
        y: event.scroll,
        velocity: event.velocity,
        direction: event.velocity >= 0 ? 1 : -1,
        progress: event.progress,
      });
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // In-page anchors hand off to Lenis so jumps keep the same easing
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id.length < 2) return;
      const element = document.querySelector(id);
      if (!element) return;
      event.preventDefault();
      lenis.scrollTo(element as HTMLElement, { offset: -96, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
