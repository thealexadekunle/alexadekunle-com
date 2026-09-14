"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "@/lib/motion/use-reduced-motion";

type CursorState = "default" | "link" | "media" | "aura" | "field";

const SNAP_RADIUS = 90;

/**
 * Adaptive cursor.
 *
 * A dot pinned to the true pointer position, and a ring that lags behind it,
 * stretches along the axis of travel during fast flicks, and snaps toward the
 * centre of nearby magnetic targets. Context is read from whatever sits under
 * the pointer, so it works on markup this component has never seen.
 *
 * Rendered only for fine pointers: a lagging ring on touch reads as jank.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = textRef.current;
    if (!fine || !root || !dot || !ring || !label) return;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pointer };
    let state: CursorState = "default";
    let magnet: { cx: number; cy: number; d: number } | null = null;
    let active = false;
    let frame = 0;
    let tick = 0;

    // The native cursor is only hidden once this is actually running, so a
    // failure here never leaves the page without a pointer.
    document.documentElement.classList.add("has-cursor");

    const setState = (next: CursorState, text?: string) => {
      if (next === state) return;
      state = next;
      root.dataset["state"] = next;
      label.textContent = next === "media" ? text ?? "View" : "";
    };

    const resolve = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return setState("default");

      if (target.closest("input, textarea, select, [contenteditable='true']")) {
        return setState("field");
      }

      const tagged = target.closest<HTMLElement>("[data-cursor-label]");
      if (tagged) {
        return setState("media", tagged.dataset["cursorLabel"] ?? "View");
      }

      const link = target.closest<HTMLElement>(
        "a, button, [role='button'], summary, label, .chip",
      );
      if (link) {
        if (link.querySelector("img, picture, video, .frame")) {
          const heading = link.querySelector("h2, h3")?.textContent ?? "View";
          return setState("media", heading.trim().slice(0, 28));
        }
        return setState("link");
      }

      // Editorial media that is not a link: widen the ring, but show no label.
      // A "VIEW" capsule over something unclickable promises an interaction
      // that does not exist.
      const frameEl = target.closest("figure, .frame");
      if (frameEl?.querySelector("img")) return setState("aura");

      setState("default");
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!active) {
        active = true;
        ringPos.x = pointer.x;
        ringPos.y = pointer.y;
        root.dataset["active"] = "true";
      }
      resolve(event.target);
    };

    const hide = () => {
      active = false;
      root.dataset["active"] = "false";
    };
    const press = () => (root.dataset["pressed"] = "true");
    const release = () => (root.dataset["pressed"] = "false");

    const findMagnet = () => {
      let best: typeof magnet = null;
      let bestDist = SNAP_RADIUS;
      document
        .querySelectorAll<HTMLElement>("[data-magnetic], .btn, button[type='submit']")
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          if (!r.width || r.bottom < 0 || r.top > window.innerHeight) return;
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const d = Math.hypot(pointer.x - cx, pointer.y - cy) - Math.max(r.width, r.height) / 2;
          if (d < bestDist) {
            bestDist = d;
            best = { cx, cy, d };
          }
        });
      return best;
    };

    const render = () => {
      if (++tick % 6 === 0) magnet = findMagnet();

      let targetX = pointer.x;
      let targetY = pointer.y;
      if (magnet && !reduced) {
        const pull = 1 - Math.min(Math.max(magnet.d, 0) / SNAP_RADIUS, 1);
        targetX += (magnet.cx - pointer.x) * pull * 0.45;
        targetY += (magnet.cy - pointer.y) * pull * 0.45;
      }

      const prevX = ringPos.x;
      const prevY = ringPos.y;
      const lerp = reduced ? 1 : 0.19;
      ringPos.x += (targetX - ringPos.x) * lerp;
      ringPos.y += (targetY - ringPos.y) * lerp;

      const vx = ringPos.x - prevX;
      const vy = ringPos.y - prevY;
      const speed = Math.hypot(vx, vy);
      const stretch = reduced ? 0 : Math.min(speed / 90, 0.4);
      const angle = stretch > 0.01 ? (Math.atan2(vy, vx) * 180) / Math.PI : 0;
      const pressed = root.dataset["pressed"] === "true" ? 0.9 : 1;
      const shapely = state === "default" || state === "link";

      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%) scale(${pressed})`;
      ring.style.transform =
        `translate3d(${ringPos.x.toFixed(2)}px, ${ringPos.y.toFixed(2)}px, 0) translate(-50%, -50%)` +
        (shapely
          ? ` rotate(${angle.toFixed(1)}deg) scale(${1 + stretch}, ${1 - stretch * 0.65})`
          : "") +
        ` scale(${pressed})`;

      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", press);
    document.addEventListener("pointerup", release);
    document.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-cursor");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", press);
      document.removeEventListener("pointerup", release);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [fine, reduced]);

  if (!fine) return null;

  return (
    <div ref={rootRef} className="cursor" data-cursor data-state="default" data-active="false" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring">
        <span ref={textRef} className="cursor-text" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
