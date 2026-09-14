import {
  Children,
  cloneElement,
  isValidElement,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

type SlotProps = HTMLAttributes<HTMLElement> & { readonly children?: ReactNode };

type MergeableProps = HTMLAttributes<HTMLElement> & AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * Polymorphic slot.
 *
 * Renders into its single child instead of emitting a wrapper element, so a
 * primitive can lend its styling and behaviour to a `Link`, a `button`, or
 * anything else without nesting a redundant node. Class names merge; the
 * child's own props win, so a caller can always override.
 *
 * Kept local rather than pulling in Radix: this is the whole of the behaviour
 * the pattern needs here.
 */
export function Slot({ children, ...slotProps }: SlotProps) {
  if (!isValidElement(children)) return null;

  const child = children as ReactElement<MergeableProps>;
  const childProps = child.props;

  return cloneElement(child, {
    ...slotProps,
    ...childProps,
    className: [slotProps.className, childProps.className].filter(Boolean).join(" "),
    style: { ...slotProps.style, ...childProps.style },
  } as MergeableProps);
}

/** True when the caller passed exactly one element, which `asChild` requires. */
export function hasSingleChild(children: ReactNode): boolean {
  return Children.count(children) === 1 && isValidElement(children);
}
