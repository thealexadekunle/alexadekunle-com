"use client";

import { type ReactNode, useRef } from "react";
import { useFinePointer, useReducedMotion } from "@/lib/motion/use-media-query";
import { Slot } from "./slot";

type MagneticButtonProps = {
  readonly children: ReactNode;
  readonly asChild?: boolean;
  readonly className?: string;
  readonly strength?: number;
  readonly onClick?: () => void;
  readonly type?: "button" | "submit";
  readonly disabled?: boolean;
};

/**
 * Pointer-attracted control. The shell springs toward the cursor and the label
 * trails it, which reads as weight rather than a jump.
 *
 * `asChild` lends the behaviour to a `Link` or an `a` so navigation keeps
 * working without wrapping an anchor in a button.
 */
export function MagneticButton({
  children,
  asChild = false,
  className = "",
  strength = 0.28,
  onClick,
  type = "button",
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const raf = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const animate = () => {
    const element = ref.current;
    if (!element) return;
    current.current.x += (target.current.x - current.current.x) * 0.16;
    current.current.y += (target.current.y - current.current.y) * 0.16;
    element.style.transform = `translate3d(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px, 0)`;

    const settled =
      Math.abs(current.current.x - target.current.x) < 0.1 &&
      Math.abs(current.current.y - target.current.y) < 0.1;

    if (settled && target.current.x === 0 && target.current.y === 0) {
      element.style.transform = "";
      raf.current = null;
      return;
    }
    raf.current = requestAnimationFrame(animate);
  };

  const handlers =
    fine && !reduced
      ? {
          onPointerMove: (event: React.PointerEvent<HTMLElement>) => {
            const element = event.currentTarget;
            const rect = element.getBoundingClientRect();
            target.current = {
              x: (event.clientX - rect.left - rect.width / 2) * strength,
              y: (event.clientY - rect.top - rect.height / 2) * strength * 1.5,
            };
            if (raf.current === null) raf.current = requestAnimationFrame(animate);
          },
          onPointerLeave: () => {
            target.current = { x: 0, y: 0 };
            if (raf.current === null) raf.current = requestAnimationFrame(animate);
          },
        }
      : {};

  const shared = {
    ref: ref as React.Ref<never>,
    className: `btn ${className}`,
    "data-magnetic": "",
    ...handlers,
  };

  if (asChild) {
    return <Slot {...shared}>{children}</Slot>;
  }

  return (
    <button {...shared} type={type} onClick={onClick} disabled={disabled}>
      <span>{children}</span>
    </button>
  );
}
