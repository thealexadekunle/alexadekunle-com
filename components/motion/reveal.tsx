"use client";

import { type ReactNode, type Ref, useRef } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotion } from "@/lib/motion/use-media-query";

type RevealProps = {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly className?: string;
  readonly as?: "div" | "section" | "figure" | "li" | "article";
};

/** Fade-and-rise on entry. Plays once; honours reduced motion by rendering flat. */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      ref={ref as Ref<never>}
      className={className}
      initial={reduced ? undefined : { opacity: 0, y: 26 }}
      animate={inView || reduced ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      {children}
    </Component>
  );
}
