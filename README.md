# alexadekunle.com

Personal brand site for Alex Adekunle — technology entrepreneur, founder of Vavinix.
Next.js App Router, TypeScript, Tailwind, statically exported to GitHub Pages.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit, strict
npm run build        # static export to out/
npm run deploy       # build + copy to docs/ (what Pages serves)
```

## Architecture

```
app/                 routes — one folder per page, Server Components by default
  layout.tsx         shell: fonts, metadata, grid rules, header, footer, JSON-LD
  page.tsx           home
  [route]/page.tsx   about, ventures, writing, the-eagle, speaking, contact
  ventures/[slug]/   4 venture pages via generateStaticParams
  robots.ts          AI crawlers deliberately allowed
  sitemap.ts         indexable URLs only
components/
  ui/                primitives: Slot, MagneticButton, BentoGrid, TextReveal, AspectFrame,
                     Container, Section, ButtonLink, Marquee, forms
  sections/          page sections: Hero, WhatPeopleBring, VenturesGrid, EagleTeaser, ContactBanner…
  motion/            Reveal, MaskedLines, ParallaxFrame, Cursor
  site-header.tsx    floating glass header + mobile drawer
  site-footer.tsx    kinetic footer
lib/
  site.ts            domain, handles, bios — one place to change the domain
  schema.ts          Person / WebSite / Organization nodes
  content/           typed copy: home, about, ventures, venture-detail, writing,
                     principles, speaking, navigation
  motion/            MotionProvider (Lenis + scroll lock + anchor easing),
                     shared scroll store, media-query hooks
  image-loader.ts    maps next/image widths onto pre-built variants
public/img/          photography, generated scenes, logos, manifest
docs/                build output committed for GitHub Pages
```

### Patterns

- **Slot / `asChild`** — `components/ui/slot.tsx` is a ~30-line local Slot. `MagneticButton`,
  `BentoCell` and `ButtonLink` render *into* their child rather than wrapping it, so a `Link`
  keeps working while inheriting behaviour. No Radix dependency for one behaviour.
- **Motion context** — `MotionProvider` owns the Lenis instance, the single rAF loop, scroll
  locking and anchor easing. Scroll-linked components subscribe to a module store via
  `useSyncExternalStore`, so a parallax frame five levels deep costs nothing and drills nothing.
- **External state, not effects** — media queries and the Lagos clock are read with
  `useSyncExternalStore`, which gives a defined server snapshot and removes the
  setState-in-effect cascade the React compiler lints against.
- **Compound components** — `BentoGrid` / `BentoGrid.Cell`, `Section` with tone and border slots.

**Server vs client.** Everything renders on the server by default. `"use client"` appears
only where it must: the header (scroll state), the cursor, the motion primitives, the
forms, and the availability clock.

## Design system

Tokens live in `tailwind.config.ts` and are mirrored as CSS custom properties in
`app/globals.css`, so pseudo-elements and keyframes reach the same values.

```
#FFFFFF paper        #FAFAFA paper-50     #F4F4F5 paper-100
#DEDEE2 paper-200    #E4E4E7 line         #D4D4D8 line-strong
#0A0A0A ink          #18181B ink-900      #27272A ink-800
#71717A zinc-500     #A1A1AA zinc-400     #FFA500 accent
```

Inter via `next/font/google`. `.display` for headlines (−0.055em), `.label` for uppercase
micro-labels (10px / 0.2em). Accent is surgical: status pips, hover fills, active rules,
index numerals, focal CTAs.

## Motion

One `requestAnimationFrame` loop (Lenis) writes to a shared scroll store; every
scroll-linked effect subscribes rather than attaching its own listener.

| Effect | Where |
|---|---|
| Inertial scroll | `lib/motion/smooth-scroll.tsx` — Lenis, anchors handed off to `scrollTo` |
| Masked line reveals | `components/motion/masked-lines.tsx` |
| In-frame parallax | `components/motion/parallax-frame.tsx` — drift inside the frame's overflow |
| Entrance fades | `components/motion/reveal.tsx` — `useInView`, plays once |
| Velocity marquee | `components/ui/marquee.tsx` |
| Adaptive cursor | `components/motion/cursor.tsx` |

**Cursor states:** `default` 36px ring · `link` 60px accent · `media` labelled capsule ·
`aura` 56px over non-clickable editorial media · `field` 3×30 caret. Plus proximity snap
toward buttons, flick stretch, and a press compression. Removed entirely when
`(hover: hover) and (pointer: fine)` does not match; the native cursor is only hidden by a
class JavaScript adds at boot, so a script failure never leaves the page without a pointer.

`prefers-reduced-motion` disables Lenis, parallax, stretch and every entrance.

## Content and truth

Copy is typed data in `lib/content/`, traceable to the brand strategy document. Two
standing constraints:

1. **No synthetic portraits.** Every image of Alex is a real photograph.
2. **No portfolio here.** Client work and case studies live on vavinix.com, and every
   portfolio intent on this site routes outward: the home client-work band, the Vavinix
   venture page, the footer column and the footer legal line. Two domains competing for
   "who designed X" splits the signal, and the weaker domain usually wins the wrong one.
3. **No invented metrics.** Nothing on the site states a number that cannot be verified.

### Site map (v5, eleven URLs)

`/` · `/about` · `/ventures` · `/ventures/{vavinix,aspire-trybe,oneartpiece,the-receipt}` ·
`/writing` · `/the-eagle` · `/speaking` · `/contact`

v5 folded the earlier map down: Ideas and Journal merged into **Writing**, Lifestyle and
Gallery into **About** (as the photo strip), Media into **Speaking** (which now carries the
press kit at `#press-kit`), and Resources was cut. `/writing` ships `noindex, follow` and
stays out of the sitemap until three pieces are published; individual pieces are indexable
from the day they go live.

**Redirects are a host concern.** A static export cannot emit 301s, so configure these at
the DNS/CDN layer before launch:

| Retired | Send to |
| --- | --- |
| `/lifestyle`, `/gallery` | `/about` |
| `/media` | `/speaking` |
| `/ideas`, `/journal` | `/writing` |
| `/services` | `/ventures/vavinix` |
| `/resources`, `/work`, `/work/*` | `/` |

**One fact to confirm before launch.** The About copy states the Mathematics degree at
FUNAAB was finished in 2024, with Vavinix already running. The strategy document flags this
for confirmation; `lib/content/about.ts` carries the same note in a comment.

## Deployment

GitHub Pages serves `docs/` from `main`. `npm run deploy` rebuilds it. The export is
static — no Node runtime — so `output: "export"` is set and `next/image` uses a custom
loader that maps requested widths onto the pre-built variants in `public/img`.

Before the domain goes live: point `alexadekunle.com` at Pages (four A records), then every
canonical, `@id` and OG URL already resolves correctly from `lib/site.ts`.

## History

The previous build — a Python-generated static site — is preserved in git history at
`01ee81c` if any markup needs consulting.

### Device sweep

8 profiles x 12 routes = 96 checks on the v5 map, all clean: iPhone SE (320px), iPhone 12,
Pixel 7, iPad mini, iPad Pro, laptop, desktop, wide (1920px). Zero horizontal overflow,
zero non-2xx responses, zero console errors, exactly one `h1` per page.

Zero horizontal scroll, zero tap targets under 24px, zero unreadable type. Drawer pins and
every link stays hittable at all depths down to 280px, where the minimum menu row is 44px.
