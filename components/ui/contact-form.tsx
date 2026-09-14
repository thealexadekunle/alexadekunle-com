"use client";

import { type FormEvent, useState } from "react";

const TOPICS = [
  { value: "project", label: "A project or product" },
  { value: "advisory", label: "Strategy or advisory" },
  { value: "partnership", label: "Partnership or venture" },
  { value: "speaking", label: "Speaking" },
  { value: "media", label: "Media or press" },
  { value: "general", label: "Something else" },
] as const;

/**
 * Intake form with floating labels. Validation runs locally; the POST target
 * is wired at launch (see the TODO below).
 */
export function ContactForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const invalid = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[required]")).filter(
      (field) => !field.value.trim() || !field.checkValidity(),
    );

    if (invalid.length > 0) {
      setStatus("One or two fields still need you.");
      invalid[0]?.focus();
      return;
    }

    setSending(true);
    // TODO: POST new FormData(form) to the intake endpoint before launch.
    window.setTimeout(() => {
      form.reset();
      setSending(false);
      setStatus("Got it. I read everything that comes through here, and I will come back to you.");
    }, 600);
  };

  return (
    <form className="border border-line-strong bg-paper p-6 sm:p-9" onSubmit={onSubmit} noValidate>
      <h2 className="label">Tell me what you are building</h2>
      <p className="prose-body mt-4 text-[15px]">
        What are you working on? What problem are you actually trying to solve? What would success
        look like if it went well?
      </p>

      <div className="mt-9 grid gap-6 sm:grid-cols-2">
        <div className="field">
          <input className="field-input peer" id="name" name="name" type="text" autoComplete="name" required placeholder=" " />
          <label className="field-label" htmlFor="name">Name</label>
        </div>
        <div className="field">
          <input className="field-input peer" id="email" name="email" type="email" autoComplete="email" required placeholder=" " />
          <label className="field-label" htmlFor="email">Email</label>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="field">
          <input className="field-input peer" id="company" name="company" type="text" autoComplete="organization" placeholder=" " />
          <label className="field-label" htmlFor="company">Company (optional)</label>
        </div>
        <div className="field">
          <select className="field-input" id="topic" name="topic" defaultValue="project">
            {TOPICS.map((topic) => (
              <option key={topic.value} value={topic.value}>{topic.label}</option>
            ))}
          </select>
          <label className="field-label !top-2 !scale-[0.72]" htmlFor="topic">Enquiry type</label>
        </div>
      </div>

      <div className="field mt-6">
        <textarea className="field-input peer min-h-[8.5rem]" id="message" name="message" rows={5} required placeholder=" " />
        <label className="field-label" htmlFor="message">The brief</label>
      </div>

      <button type="submit" className="btn btn-fill mt-9 sm:!w-auto" disabled={sending}>
        <span>{sending ? "Sending…" : "Send it over"}</span>
      </button>

      <p role="status" aria-live="polite" className="mt-5 text-sm font-medium text-ink">
        {status}
      </p>
      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        I read everything that comes through here, and I will come back to you.
      </p>
    </form>
  );
}
