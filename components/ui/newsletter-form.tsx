"use client";

import { type FormEvent, useState } from "react";

/** Footer opt-in. Validates locally; POST target is wired at launch. */
export function NewsletterForm() {
  const [status, setStatus] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.elements.namedItem("email");
    if (!(email instanceof HTMLInputElement) || !email.checkValidity() || !email.value.trim()) {
      setStatus("That address does not look right.");
      if (email instanceof HTMLInputElement) email.focus();
      return;
    }
    // TODO: POST to the list provider before launch.
    form.reset();
    setStatus("You are on the list. Notes from the build, every other week.");
  };

  return (
    <form className="mt-8 max-w-sm" onSubmit={onSubmit} noValidate>
      <label className="label" htmlFor="newsletter-email">
        Notes from the build
      </label>
      <div className="mt-3 flex border border-line-strong bg-paper">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-zinc-400"
        />
        <button
          type="submit"
          className="shrink-0 bg-ink px-5 text-[11px] font-medium uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink"
        >
          Join
        </button>
      </div>
      <p className="mt-3 text-xs text-zinc-500">Roughly every other week. No pitch, no filler.</p>
      <p role="status" aria-live="polite" className="mt-2 text-xs font-medium text-ink">
        {status}
      </p>
    </form>
  );
}
