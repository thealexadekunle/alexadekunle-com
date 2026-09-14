"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { AspectFrame } from "@/components/ui/aspect-frame";
import { GALLERY, type GalleryFrame } from "@/lib/content/editorial";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "work", label: "At work" },
  { value: "events", label: "Speaking & events" },
  { value: "travel", label: "Travel and places" },
  { value: "portraits", label: "Portraits" },
  { value: "objects", label: "Objects" },
] as const;

type Filter = (typeof FILTERS)[number]["value"];

const isReal = (frame: GalleryFrame) => frame.src.includes("alex-adekunle");

export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = GALLERY.filter((frame) => filter === "all" || frame.category === filter);

  return (
    <>
      <div className="mt-12 flex flex-wrap gap-2" role="group" aria-label="Filter photographs">
        {FILTERS.map((option) => (
          <button
            key={option.value}
            type="button"
            className="chip"
            aria-pressed={filter === option.value}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="label mt-4" aria-live="polite">
        {String(shown.length).padStart(2, "0")} photographs shown
      </p>

      <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-12">
        {shown.map((frame, index) => (
          <Reveal key={frame.src} as="figure" delay={(index % 3) * 70} className={frame.span}>
            <AspectFrame
              src={frame.src}
              alt={frame.alt}
              ratio={frame.ratio}
              muted={!isReal(frame)}
              sizes="(max-width: 640px) 50vw, 40vw"
            />
            <figcaption className="mt-3 text-[11px] text-zinc-500">{frame.caption}</figcaption>
          </Reveal>
        ))}
      </div>
    </>
  );
}
