"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PRIMARY_NAV } from "@/lib/content/navigation";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useMotion } from "@/lib/motion/motion-provider";
import { subscribeScroll } from "@/lib/motion/scroll-store";

/**
 * Floating header. Transparent at the top of a page, condensing into a
 * glassmorphic bar with a hairline and an accent progress rule once scrolled.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { lockScroll } = useMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const progressRef = useRef<HTMLDivElement>(null);

  // Navigating closes the drawer. Adjusting state during render is React's
  // sanctioned pattern for deriving from props — an effect here would queue a
  // second render pass for no reason.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    return subscribeScroll(({ y, progress }) => {
      setScrolled(y > 8);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(progress, 1)})`;
      }
    });
  }, []);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open, lockScroll]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-line-strong bg-paper/90 backdrop-blur-xl"
            : "border-b border-transparent bg-paper/70 backdrop-blur-md"
        }`}
      >
        <div
          ref={progressRef}
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-accent"
        />

        <div className="mx-auto flex max-w-8xl items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="group inline-flex items-center" aria-label="Alex Adekunle, home">
            <Image
              src="/img/logo.svg"
              alt=""
              aria-hidden="true"
              width={298}
              height={92}
              priority
              className="h-[34px] w-auto max-[420px]:h-[28px]"
            />
            <span className="sr-only">Alex Adekunle</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="group relative text-[13px] text-ink-900 transition-colors hover:text-ink aria-[current=page]:font-medium aria-[current=page]:text-ink"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-[7px] left-0 h-px bg-accent transition-all duration-500 ease-editorial ${
                    isActive(item.href) ? "w-full bg-ink" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <MagneticButton asChild className="btn-fill hidden !w-auto sm:inline-flex">
              <Link href="/contact">
                <span>Start a conversation</span>
              </Link>
            </MagneticButton>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 flex-col justify-center gap-[5px] border border-line-strong px-[9px] transition-colors hover:border-ink lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span
                aria-hidden="true"
                className={`block h-px w-full bg-ink transition-transform duration-300 ease-editorial ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`block h-px w-full bg-ink transition-transform duration-300 ease-editorial ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer is fixed to the viewport, never to the document: it must open
          in place no matter how far the page has been scrolled. */}
      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[55] animate-drawerIn bg-paper pt-[72px] lg:hidden"
        >
          <nav
            aria-label="Mobile"
            className="flex max-h-[calc(100dvh-72px)] flex-col overflow-y-auto px-gutter pb-[calc(40px+env(safe-area-inset-bottom))] pt-6"
          >
            {[...PRIMARY_NAV, { label: "Contact", href: "/contact" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex min-h-[var(--touch)] items-center justify-between border-b border-line-strong py-5 text-[clamp(1.35rem,6vw,1.75rem)] tracking-editorial"
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive(item.href) ? "bg-accent" : "bg-line"
                  }`}
                />
              </Link>
            ))}
            <Link href="/contact" className="btn btn-fill mt-8">
              <span>Start a conversation</span>
            </Link>
            <p className="label mt-8">{`Think better. Build better. Lead better.`}</p>
          </nav>
        </div>
      ) : null}
    </>
  );
}
