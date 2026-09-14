"use client";

import { useEffect, useRef } from "react";
import { subscribeScroll } from "@/lib/motion/scroll-store";
import { useReducedMotion } from "@/lib/motion/use-media-query";

type MarqueeProps = {
  readonly items: readonly string[];
  readonly speed?: number;
  readonly className?: string;
  readonly itemClassName?: string;
  readonly repeat?: number;
};

/**
 * Kinetic ticker. Drift is constant, then pushed by scroll velocity and
 * flipped by scroll direction, so the strip reacts to how the page is moving.
 */
export function Marquee({
  items,
  speed = 0.6,
  className = "",
  itemClassName = "label",
  repeat = 4,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;

    let x = 0;
    let half = track.scrollWidth / 2;
    let paused = false;
    let frame = 0;
    let velocity = 0;
    let direction: 1 | -1 = 1;

    const unsubscribe = subscribeScroll((s) => {
      velocity = s.velocity;
      direction = s.direction;
    });

    const measure = () => {
      half = track.scrollWidth / 2;
    };
    window.addEventListener("resize", measure, { passive: true });

    const enter = () => (paused = true);
    const leave = () => (paused = false);
    track.addEventListener("pointerenter", enter);
    track.addEventListener("pointerleave", leave);

    const render = () => {
      const boost = Math.min(Math.abs(velocity) * 0.35, 14);
      const step = (paused ? speed * 0.15 : speed) + boost * speed;
      x -= step * (direction >= 0 ? 1 : -1);
      if (half > 0) {
        if (x <= -half) x += half;
        if (x > 0) x -= half;
      }
      track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
      window.removeEventListener("resize", measure);
      track.removeEventListener("pointerenter", enter);
      track.removeEventListener("pointerleave", leave);
    };
  }, [reduced, speed]);

  const sequence = Array.from({ length: repeat }).flatMap(() => items);

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div ref={trackRef} className="marquee-track">
        {sequence.map((item, index) => (
          <span key={`${item}-${index}`} className={`flex items-center gap-8 ${itemClassName}`}>
            {item}
            <span className="text-accent">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
