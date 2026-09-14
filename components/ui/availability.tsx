"use client";

import { useCallback, useSyncExternalStore } from "react";
import { SITE } from "@/lib/site";

type Availability = { readonly clock: string; readonly open: boolean; readonly status: string };

function read(): Availability {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: SITE.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const hour = Number.parseInt(get("hour"), 10);
  const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(get("weekday"));
  const open = weekday && hour >= 9 && hour < 18;

  return {
    clock: `${get("hour")}:${get("minute")} WAT`,
    open,
    status: open ? "Online now" : "Offline — replies next working day",
  };
}

/** Cache the snapshot so useSyncExternalStore sees a stable reference. */
let snapshot: Availability = { clock: "WAT", open: true, status: "Checking availability" };

function subscribe(onChange: () => void): () => void {
  const tick = () => {
    const next = read();
    if (next.clock !== snapshot.clock || next.open !== snapshot.open) {
      snapshot = next;
      onChange();
    }
  };
  tick();
  const timer = window.setInterval(tick, 30_000);
  return () => window.clearInterval(timer);
}

const SERVER_SNAPSHOT: Availability = { clock: "WAT", open: true, status: "Checking availability" };

/**
 * Live availability from the real clock in Lagos.
 *
 * A static export bakes HTML at build time, so the server snapshot is a neutral
 * placeholder and the real time arrives on subscribe — no hydration mismatch,
 * no stale timestamp burned into the page.
 */
export function Availability({ variant = "pill" }: { readonly variant?: "pill" | "inline" }) {
  const getSnapshot = useCallback(() => snapshot, []);
  const getServerSnapshot = useCallback(() => SERVER_SNAPSHOT, []);
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (variant === "inline") return <span>{state.clock}</span>;

  return (
    <span className="pill">
      <span
        className={`pill-pip ${state.open ? "" : "!bg-zinc-400 after:!animate-none"}`}
        aria-hidden="true"
      />
      {state.status}
    </span>
  );
}
