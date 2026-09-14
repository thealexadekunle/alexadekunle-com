"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotion } from "@/lib/motion/use-media-query";

type TextRevealProps = {
  readonly lines: readonly string[];
  readonly className?: string;
  readonly as?: "h1" | "h2" | "h3" | "p";
  readonly id?: string;
  readonly stagger?: number;
};

/**
 * Line-by-line editorial reveal.
 *
 * Lines are authored explicitly rather than measured at runtime: measuring
 * rendered breaks means rewriting textContent, which drops inline markup and
 * mismatches at some widths. The clip box carries descender padding because
 * display line-height is 0.88 and a bare overflow-hidden box shears g, y and j.
 */
export function TextReveal({ lines, className, as = "h2", id, stagger = 0.09 }: TextRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const Tag = as;

  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden pb-[0.18em] pt-[0.06em] -mb-[0.18em]">
          <motion.span
            className="block"
            initial={reduced ? undefined : { y: "115%", opacity: 0 }}
            animate={inView || reduced ? { y: "0%", opacity: 1 } : undefined}
            transition={{
              duration: 0.95,
              ease: [0.22, 1, 0.36, 1],
              delay: reduced ? 0 : index * stagger,
            }}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        </span>
      ))}
    </Tag>
  );
}
