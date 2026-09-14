"use client";

import { useEffect, useState } from "react";
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

/**
 * Live availability, read from the real clock in Lagos.
 *
 * Rendered empty on the server and filled after mount: a static export bakes
 * HTML at build time, so a server-rendered time would be permanently wrong.
 */
export function Availability({ variant = "pill" }: { readonly variant?: "pill" | "inline" }) {
  const [state, setState] = useState<Availability | null>(null);

  useEffect(() => {
    setState(read());
    const timer = window.setInterval(() => setState(read()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  if (variant === "inline") {
    return <span suppressHydrationWarning>{state?.clock ?? "WAT"}</span>;
  }

  return (
    <span className="pill" suppressHydrationWarning>
      <span className={`pill-pip ${state && !state.open ? "!bg-zinc-400 after:!animate-none" : ""}`} aria-hidden="true" />
      {state?.status ?? "Checking availability"}
    </span>
  );
}
