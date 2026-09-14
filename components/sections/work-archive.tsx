"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { AspectFrame } from "@/components/ui/aspect-frame";
import { BentoGrid } from "@/components/ui/bento-grid";
import { CASE_STUDIES, WORK_SECTORS } from "@/lib/content/work";

type Sector = (typeof WORK_SECTORS)[number]["value"];

/** Spans alternate so the archive reads as an editorial spread, not a card grid. */
const SPANS = ["lg:col-span-7", "lg:col-span-5 lg:pt-24", "lg:col-span-5", "lg:col-span-7 lg:pt-24"] as const;
const RATIOS = ["16/10", "4/5", "4/5", "16/10"] as const;

export function WorkArchive() {
  const [sector, setSector] = useState<Sector>("all");

  const shown = useMemo(
    () => CASE_STUDIES.filter((study) => sector === "all" || study.sector === sector),
    [sector],
  );

  return (
    <>
      <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-y border-paper-200 py-5">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter work by sector">
          {WORK_SECTORS.map((option) => (
            <button
              key={option.value}
              type="button"
              className="chip"
              aria-pressed={sector === option.value}
              onClick={() => setSector(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="label" aria-live="polite">
          {String(shown.length).padStart(2, "0")} projects shown
        </p>
      </div>

      <BentoGrid className="mt-16">
        {shown.map((study, index) => (
          <Reveal
            key={study.slug}
            as="article"
            delay={index % 2 === 0 ? 0 : 90}
            className={`group ${SPANS[index % SPANS.length]}`}
          >
            <Link href={`/work/${study.slug}`} className="block" data-cursor-label="View project">
              <AspectFrame
                src={study.cover}
                alt={study.coverAlt}
                ratio={RATIOS[index % RATIOS.length]}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
              />
              <div className="mt-6 flex items-baseline justify-between gap-6">
                <span className="tile-index">
                  Case {String(index + 1).padStart(2, "0")} — {study.sectorLabel}
                </span>
                <span className="label">{study.discipline}</span>
              </div>
              <h2 className="tile-title">{study.client}</h2>
              <p className="prose-body mt-4 max-w-xl">{study.summary}</p>
              <div className="mt-[18px] flex flex-wrap gap-2">
                {study.stack.slice(0, 3).map((item) => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
              <span className="tile-rule" aria-hidden="true" />
            </Link>
          </Reveal>
        ))}
      </BentoGrid>
    </>
  );
}
