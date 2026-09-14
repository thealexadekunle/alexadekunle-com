"use client";

/**
 * One shared scroll record, written once per frame by SmoothScroll and read by
 * every scroll-linked effect. Components subscribe instead of each attaching
 * their own scroll listener.
 */
export type ScrollState = {
  y: number;
  velocity: number;
  direction: 1 | -1;
  progress: number;
};

const state: ScrollState = { y: 0, velocity: 0, direction: 1, progress: 0 };
const listeners = new Set<(s: ScrollState) => void>();

export function getScrollState(): Readonly<ScrollState> {
  return state;
}

export function setScrollState(next: Partial<ScrollState>): void {
  Object.assign(state, next);
  listeners.forEach((listener) => listener(state));
}

export function subscribeScroll(listener: (s: ScrollState) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
