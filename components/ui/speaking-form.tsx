"use client";

import { type FormEvent, useState } from "react";

const FORMATS = ["Keynote", "Fireside or panel", "Workshop", "Podcast or interview", "Remote session"] as const;

/**
 * Dedicated speaker enquiry. Routing bookers through the general contact form
 * costs a share of a small, high-value audience at every extra click.
 */
export function SpeakingForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const invalid = Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[required]"),
    ).filter((field) => !field.value.trim() || !field.checkValidity());

    if (invalid.length > 0) {
      setStatus("One or two fields still need you.");
      invalid[0]?.focus();
      return;
    }

    setSending(true);
    // TODO: POST new FormData(form) to the speaking inbox before launch.
    window.setTimeout(() => {
      form.reset();
      setSending(false);
      setStatus("Got it. I read everything that comes through here, and I will come back to you.");
    }, 600);
  };

  return (
    <form className="mt-12 border border-line-strong bg-paper p-6 sm:p-9" onSubmit={onSubmit} noValidate>
      <h2 className="label">Invite Alex Adekunle to speak</h2>
      <p className="prose-body mt-4 text-[15px]">
        Tell me about the event, the audience, and what you want them walking out with. That last one
        shapes everything else.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="field">
          <input className="field-input peer" id="sp-name" name="name" type="text" autoComplete="name" required placeholder=" " />
          <label className="field-label" htmlFor="sp-name">Name</label>
        </div>
        <div className="field">
          <input className="field-input peer" id="sp-email" name="email" type="email" autoComplete="email" required placeholder=" " />
          <label className="field-label" htmlFor="sp-email">Email</label>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="field">
          <input className="field-input peer" id="sp-event" name="event" type="text" required placeholder=" " />
          <label className="field-label" htmlFor="sp-event">Event name and date</label>
        </div>
        <div className="field">
          <select className="field-input" id="sp-format" name="format" defaultValue="Keynote">
            {FORMATS.map((format) => (
              <option key={format} value={format}>{format}</option>
            ))}
          </select>
          <label className="field-label !top-2 !scale-[0.72]" htmlFor="sp-format">Format</label>
        </div>
      </div>

      <div className="field mt-6">
        <textarea className="field-input peer min-h-[7rem]" id="sp-outcome" name="message" rows={4} required placeholder=" " />
        <label className="field-label" htmlFor="sp-outcome">What should they walk out with</label>
      </div>

      <button type="submit" className="btn btn-fill mt-8 sm:!w-auto" disabled={sending}>
        <span>{sending ? "Sending…" : "Send it over"}</span>
      </button>

      <p role="status" aria-live="polite" className="mt-5 text-sm font-medium text-ink">{status}</p>
    </form>
  );
}
