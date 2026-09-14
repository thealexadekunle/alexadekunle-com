import Link from "next/link";
import type { ReactNode } from "react";
import { MagneticButton } from "./magnetic-button";

type ButtonLinkProps = {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: "fill" | "ghost";
  readonly size?: "md" | "lg";
  readonly magnetic?: boolean;
  readonly className?: string;
};

/**
 * The one link-shaped control.
 *
 * `magnetic` is not decoration: it hands the anchor to MagneticButton via the
 * slot pattern, so the element itself springs toward the pointer. External
 * hrefs stay plain anchors so the static export never routes them through the
 * client router.
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
    variant === "fill" ? "btn-fill" : "btn-ghost",
    size === "lg" ? "btn-lg" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const external = href.startsWith("http") || href.startsWith("mailto:");

  const anchor = external ? (
    <a href={href} rel="noopener">
      <span>{children}</span>
    </a>
  ) : (
    <Link href={href}>
      <span>{children}</span>
    </Link>
  );

  if (magnetic) {
    return (
      <MagneticButton asChild className={classes}>
        {anchor}
      </MagneticButton>
    );
  }

  return external ? (
    <a href={href} rel="noopener" className={`btn ${classes}`}>
      <span>{children}</span>
    </a>
  ) : (
    <Link href={href} className={`btn ${classes}`}>
      <span>{children}</span>
    </Link>
  );
}
