"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media query as an external store.
 *
 * `useSyncExternalStore` is the correct primitive here: the browser owns this
 * state, so React subscribes to it rather than mirroring it into an effect.
 * It also gives a defined server snapshot, which keeps the static export from
 * hydrating against a different value than it rendered.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => serverValue, [serverValue]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** The user asked the platform for less motion. Honour it everywhere. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Only devices that can truly hover with a precise pointer. */
export function useFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
