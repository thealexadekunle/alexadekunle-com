export type NavItem = { readonly label: string; readonly href: string };

/** Primary navigation. Eight items is the ceiling before a nav reads as a sitemap. */
export const PRIMARY_NAV: readonly NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Ventures", href: "/ventures" },
  { label: "Services", href: "/services" },
  { label: "The Eagle", href: "/the-eagle" },
  { label: "Speaking", href: "/speaking" },
];

export const FOOTER_EXPLORE: readonly NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Ventures", href: "/ventures" },
  { label: "Services", href: "/services" },
  { label: "Ideas", href: "/ideas" },
  { label: "Journal", href: "/journal" },
  { label: "The Eagle", href: "/the-eagle" },
  { label: "Speaking", href: "/speaking" },
  { label: "Lifestyle", href: "/about#lifestyle" },
  { label: "Gallery", href: "/gallery" },
];

export const FOOTER_VENTURES: readonly NavItem[] = [
  { label: "Vavinix", href: "/ventures/vavinix" },
  { label: "Aspire Trybe", href: "/ventures/aspire-trybe" },
  { label: "OneArtPiece", href: "/ventures/oneartpiece" },
  { label: "The Receipt", href: "/ventures/the-receipt" },
];

export const FOOTER_CONNECT: readonly NavItem[] = [
  { label: "Media", href: "/media" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
  { label: "Press kit", href: "/media#press-kit" },
];
