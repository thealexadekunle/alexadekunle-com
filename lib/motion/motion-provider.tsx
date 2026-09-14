"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Lenis from "lenis";
import { useReducedMotion } from "./use-media-query";
import { type ScrollState, getScrollState, setScrollState, subscribeScroll } from "./scroll-store";

export type CursorState = "default" | "link" | "media" | "aura" | "field";

type MotionContextValue = {
  /** Stops and restarts inertial scrolling — used when the drawer opens. */
  readonly lockScroll: (locked: boolean) => void;
  /** Scrolls to an element with the same easing as the wheel. */
  readonly scrollTo: (target: string | HTMLElement, offset?: number) => void;
  readonly reduced: boolean;
};

const MotionContext = createContext<MotionContextValue | null>(null);

/**
 * Owns every global motion concern: the Lenis instance, the single rAF loop
 * that drives it, and the scroll store that scroll-linked components read.
 *
 * Consumers subscribe to the store rather than receiving props, so adding a
 * parallax frame five levels deep costs nothing and drills nothing.
 */
export function MotionProvider({ children }: { readonly children: ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

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
    lenisRef.current = lenis;

    lenis.on("scroll", (event: { scroll: number; velocity: number; progress: number }) => {
      setScrollState({
        y: event.scroll,
        velocity: event.velocity,
        direction: event.velocity >= 0 ? 1 : -1,
        progress: event.progress,
      });
    });

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const lockScroll = useCallback((locked: boolean) => {
    document.body.style.overflow = locked ? "hidden" : "";
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (locked) lenis.stop();
    else lenis.start();
  }, []);

  const scrollTo = useCallback((target: string | HTMLElement, offset = -96) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.4 });
      return;
    }
    const element = typeof target === "string" ? document.querySelector(target) : target;
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // In-page anchors hand off to Lenis so jumps share the wheel's easing
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id.length < 2) return;
      const element = document.querySelector(id);
      if (!element) return;
      event.preventDefault();
      scrollTo(element as HTMLElement);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  const value = useMemo<MotionContextValue>(
    () => ({ lockScroll, scrollTo, reduced }),
    [lockScroll, scrollTo, reduced],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion(): MotionContextValue {
  const context = useContext(MotionContext);
  if (!context) throw new Error("useMotion must be used inside <MotionProvider>");
  return context;
}

/** Subscribe to the shared scroll record without re-rendering on every frame. */
export function useScrollValue<T>(select: (state: Readonly<ScrollState>) => T): T {
  const [selector] = useState(() => select);
  return useSyncExternalStore(
    subscribeScroll,
    () => selector(getScrollState()),
    () => selector({ y: 0, velocity: 0, direction: 1, progress: 0 }),
  );
}
