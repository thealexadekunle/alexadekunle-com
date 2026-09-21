export type NavItem = {
  readonly label: string;
  readonly href: string;
  /** Outbound links render as plain anchors and carry a mark. */
  readonly external?: boolean;
};

/** Seven top-level pages. Ventures opens a dropdown to its four children. */
export const PRIMARY_NAV: readonly NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Writing", href: "/writing" },
  { label: "The Eagle", href: "/the-eagle" },
  { label: "Speaking", href: "/speaking" },
];

export const FOOTER_EXPLORE: readonly NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Writing", href: "/writing" },
  { label: "The Eagle", href: "/the-eagle" },
  { label: "Speaking", href: "/speaking" },
  { label: "Contact", href: "/contact" },
  { label: "Portfolio", href: "https://vavinix.com", external: true },
];

export const FOOTER_VENTURES: readonly NavItem[] = [
  { label: "Vavinix", href: "/ventures/vavinix" },
  { label: "Aspire Trybe", href: "/ventures/aspire-trybe" },
  { label: "OneArtPiece", href: "/ventures/oneartpiece" },
  { label: "The Receipt", href: "/ventures/the-receipt" },
];

/** Press kit lives on Speaking now, so Connect points at it there. */
export const FOOTER_CONNECT: readonly NavItem[] = [
  { label: "Press kit", href: "/speaking#press-kit" },
];
