import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: "fill" | "ghost";
  readonly size?: "md" | "lg";
  readonly magnetic?: boolean;
  readonly className?: string;
};

/**
 * One link-shaped button. External hrefs render as a plain anchor so the
 * static export never routes them through the client router.
 */
export function ButtonLink({
  href,
  children,
  variant = "fill",
  size = "md",
  magnetic = false,
  className = "",
}: ButtonLinkProps) {
  const classes = [
    "btn",
    variant === "fill" ? "btn-fill" : "btn-ghost",
    size === "lg" ? "btn-lg" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const external = href.startsWith("http") || href.startsWith("mailto:");
  const magneticProps = magnetic ? { "data-magnetic": "" } : {};

  if (external) {
    return (
      <a
        href={href}
        rel="noopener"
        className={classes}
        {...magneticProps}
      >
        <span>{children}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...magneticProps}>
      <span>{children}</span>
    </Link>
  );
}
