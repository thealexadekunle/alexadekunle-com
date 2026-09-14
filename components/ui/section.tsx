import type { ReactNode } from "react";
import { Container } from "./container";

type SectionProps = {
  readonly children: ReactNode;
  readonly id?: string;
  readonly label?: string;
  readonly tone?: "paper" | "raised" | "ink";
  readonly bordered?: boolean;
  readonly className?: string;
  readonly labelledBy?: string;
};

const TONES = {
  paper: "bg-paper",
  raised: "bg-paper-50",
  ink: "bg-ink text-paper",
} as const;

/** Semantic section wrapper: owns vertical rhythm, tone and the top hairline. */
export function Section({
  children,
  id,
  tone = "paper",
  bordered = false,
  className = "",
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${TONES[tone]} ${bordered ? "border-t border-paper-200" : ""} scroll-mt-28 py-24 sm:py-32 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
