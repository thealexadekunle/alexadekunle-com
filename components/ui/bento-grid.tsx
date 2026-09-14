import type { ReactNode } from "react";
import { Slot } from "./slot";

type BentoGridProps = { readonly children: ReactNode; readonly className?: string };

/** Asymmetric grid shell. Children declare their own span. */
export function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <div className={`grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-12 ${className}`}>
      {children}
    </div>
  );
}

type BentoCellProps = {
  readonly children: ReactNode;
  readonly span?: string;
  readonly asChild?: boolean;
  readonly className?: string;
};

/** One cell. `asChild` lets an article or a link become the cell itself. */
export function BentoCell({ children, span = "lg:col-span-6", asChild = false, className = "" }: BentoCellProps) {
  const classes = `group ${span} ${className}`;
  if (asChild) return <Slot className={classes}>{children}</Slot>;
  return <div className={classes}>{children}</div>;
}

BentoGrid.Cell = BentoCell;
