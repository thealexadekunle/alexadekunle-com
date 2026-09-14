import type { ReactNode } from "react";

/** The one horizontal rhythm every section shares. */
export function Container({
  children,
  className = "",
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-8xl px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
