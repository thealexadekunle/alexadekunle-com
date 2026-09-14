/** Numbered micro-label that opens most sections. */
export function Eyebrow({
  children,
  className = "",
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
}) {
  return <p className={`label ${className}`}>{children}</p>;
}
