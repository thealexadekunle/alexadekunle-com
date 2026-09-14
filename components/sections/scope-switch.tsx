"use client";

import { useState } from "react";
import { DELIVERABLES, TIERS } from "@/lib/content/services";

type Scope = "project" | "retainer";

/**
 * Engagement-shape toggle. Swaps every commitment line and the deliverables
 * table timing between a fixed-scope project and an ongoing retainer.
 */
export function ScopeSwitch() {
  const [scope, setScope] = useState<Scope>("project");

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-3" role="group" aria-label="Engagement shape">
        {(["project", "retainer"] as const).map((value) => (
          <button
            key={value}
            type="button"
            className="chip"
            aria-pressed={scope === value}
            onClick={() => setScope(value)}
          >
            {value === "project" ? "Project engagement" : "Ongoing retainer"}
          </button>
        ))}
        <span className="label">Commitment and cadence update below</span>
      </div>

      <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
        {TIERS.map((tier) => (
          <article key={tier.index} className="lg:col-span-6">
            <div className="border-t border-line-strong pt-8">
              <div className="flex items-baseline justify-between gap-6">
                <span className="tile-index">{tier.index}</span>
                <span className={`label ${tier.badgeAccent ? "label-accent" : ""}`}>{tier.badge}</span>
              </div>
              <h3 className="tile-title">{tier.title}</h3>
              <p className="prose-body mt-4">{tier.body}</p>
              <ul className="mt-8 space-y-3 text-[15px] text-zinc-500">
                {tier.deliverables.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-accent" aria-hidden="true">—</span> {item}
                  </li>
                ))}
              </ul>
              <p className="label mt-8">{tier.timing[scope]}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20 border-t border-paper-200 pt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h3 className="label">What lands in your hands</h3>
          <p className="label">
            {scope === "project" ? "Fixed scope · defined end" : "Rolling scope · monthly review"}
          </p>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className="sr-only">Deliverables, ownership and timing by engagement</caption>
            <thead>
              <tr className="border-y border-paper-200">
                <th scope="col" className="label py-4 pr-6 font-medium">Engagement</th>
                <th scope="col" className="label py-4 pr-6 font-medium">Deliverable</th>
                <th scope="col" className="label py-4 pr-6 font-medium">Who runs it</th>
                <th scope="col" className="label py-4 font-medium">Timing</th>
              </tr>
            </thead>
            <tbody className="align-top">
              {DELIVERABLES.map((row) => (
                <tr key={row.engagement} className="border-b border-paper-200 transition-colors hover:bg-paper-50">
                  <th scope="row" className="py-6 pr-6 text-lg font-medium tracking-editorial">
                    {row.engagement}
                  </th>
                  <td className="py-6 pr-6 text-[15px] text-zinc-500">{row.deliverable}</td>
                  <td className="py-6 pr-6 text-[15px] text-zinc-500">{row.owner}</td>
                  <td className="py-6 text-[15px] text-zinc-500">{row.timing[scope]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="prose-body mt-8 max-w-2xl">
          {scope === "project"
            ? "Fixed scope suits a defined problem with an end state: a launch, a reposition, a rebuild. You get the brief, the build and the handover."
            : "A retainer suits a business still finding its shape, where the next decision is not knowable in month one. Same people, rolling scope, reviewed monthly."}
        </p>
      </div>
    </>
  );
}
