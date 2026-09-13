# Alex Adekunle — Personal Brand Site

Sixteen-page editorial prototype. Light mode only. Static HTML + Tailwind + vanilla JS, assembled by a small Python builder so the nav, footer and `<head>` exist in exactly one place.

## Run

```bash
python3 -m http.server 4321     # http://localhost:4321
```

## Build

Pages are generated, not hand-maintained.

```bash
python3 build.py                # rewrites all 16 HTML files in the project root
```

| Path | Role |
|---|---|
| `build.py` | Page register (title, meta, canonical, robots, JSON-LD) + renderer |
| `src/layout.html` | The shell: head, nav, mobile drawer, footer, script tags |
| `src/pages/*.html` | One content fragment per page — the only file you edit for copy |
| `assets/css/main.css` | Design system: tokens, grid rules, components, motion |
| `assets/js/main.js` | Kinetic system: Lenis, one rAF ticker, split lines, curtain reveals, parallax, magnetic CTAs, tilt, cursor label, veil transitions, filters, scope toggle, availability clock, forms |
| `robots.txt`, `sitemap.xml` | AI crawlers allowed; indexable URLs only |

Edit a fragment → run `python3 build.py` → reload. Never edit the generated root `.html` files; the next build overwrites them.

## Pages

**Core** — `index` · `about` (About + Lifestyle + milestones + collage) · `services` (tiers, process, fit) · `contact` (intake + booking)

There is no `/work` route, by design: the portfolio and every client-name query belong on vavinix.com. The homepage carries one proof line and a single outbound link instead.

**Ventures** — `ventures` hub + `ventures-vavinix`, `ventures-aspire-trybe`, `ventures-oneartpiece`, `ventures-the-receipt`

**Supporting** — `the-eagle` · `speaking` · `ideas` · `journal` · `media` · `resources` · `gallery`

## Motion system

One `requestAnimationFrame` ticker drives every scroll-linked effect. Nothing reads layout inside the loop — geometry is cached on resize — and every animated property is `transform` or `opacity`. Measured at **60fps with zero long frames** on home, about and gallery during scripted scroll.

| Effect | Hook | Notes |
|---|---|---|
| Inertial scroll | Lenis 1.1.20 (jsDelivr) | `lerp 0.09`; anchor links hand off to `lenis.scrollTo`; drawer calls `lenis.stop()` |
| Curtain reveal | `data-clip` | Paper curtain scales off the media, inner image settles from `scale(1.14)` |
| Parallax | `data-parallax` on `.frame__inner` | Drift happens inside the frame's overflow, so media lags without overlapping copy. Four alternating speeds |
| Split lines | `data-split` | JS measures rendered line breaks, wraps each line in a mask, staggers 90ms, re-splits on significant resize |
| Velocity marquee | `.marquee` | JS transform; speed and direction take a push from scroll velocity, slows on hover |
| Magnetic CTAs | `data-magnetic` | Spring lerp on the shell, label trails at 32% |
| Tilt + border light | `data-tilt` | `--mx/--my` feed a masked radial border glow; 2.4 degree perspective tilt |
| Cursor label | `data-cursor-target` | Lerped follower naming the destination |
| Page transitions | `data-veil` | Veil wipes down on internal navigation, up on arrival, bfcache-safe |

Hooks are attached in `build.py` (`add_motion`), not hand-written into fragments, so content files stay pure markup. Tilt, magnetic and cursor bind on fine pointers only. `prefers-reduced-motion` disables Lenis, the veil, curtains, line masks, parallax and tilt — verified in a reduced-motion browser context.

**One trap worth knowing:** the reveal first used `clip-path` on the observed element. A clipped element reports a zero intersection rect, so IntersectionObserver could never fire the reveal it was waiting for. The curtain pseudo-element keeps the box measurable.

## Interactive pieces

- **Services** — `data-scope` toggle swaps every commitment line and the deliverables table timing between project engagement and ongoing retainer, and switches the explanatory paragraph.
- **Contact** — availability badge and clock run off `Intl.DateTimeFormat` in `Africa/Lagos`, flipping to "Offline — replies next working day" outside 09:00 to 18:00 on weekdays.
- **Gallery** — category filters with a live count.

## Design system

```
#FFFFFF  paper      base
#FAFAFA  paper-50   alternating band
#F4F4F5  paper-100  media backing
#DEDEE2  paper-200  section rules, kinetic footer type
#D4D4D8  line-strong component outlines: cells, rows, fields, tags, chips
#E4E4E7  line       hairline dividers and the architectural column rules
#09090B  ink        type, dark CTA panels
#18181B  ink-soft   body emphasis
#71717A  zinc-500   secondary copy
#FFA500  accent     pips, hover fills, active rules, index numbers
```

Inter 300–700. `.display` for headlines (`tracking-display`, −0.055em), `.label` for uppercase micro-labels (10px, 0.2em). Five fixed hairline column rules sit behind every page (`.grid-rules`).

Motion: masked headline reveal, `data-reveal` fade-up with `data-delay`, `data-parallax` drift, magnetic CTAs, accent-fill button wipe, cursor label on media tiles (`data-cursor-target`). All of it collapses under `prefers-reduced-motion`.

## SEO

- Unique title + meta description on all 16 pages — verified no duplicates.
- Exactly one `<h1>` per page.
- One canonical `Person` `@id` (`https://alexadekunle.com/#alex-adekunle`); every other page references it rather than declaring a second Person.
- Vavinix `Organization` points back at the Person as founder using identical `@id` strings — the closed loop that makes it a verified relationship.
- Open Graph + Twitter cards on every page, from the same title/description record.
- `ideas`, `journal`, `media`, `resources` ship `noindex, follow` and stay out of the sitemap until each holds three real items.
- Alt text follows `Alex Adekunle, founder of Vavinix, [context]` throughout.

## Before shipping

1. **Compile Tailwind.** The Play CDN ships the JIT compiler and is not for production. Move the `tailwind.config` object from `src/layout.html` into `tailwind.config.js`, build to `assets/css/tailwind.css`, swap the `<script>` for a `<link>`.
2. **Replace Unsplash placeholders** with real photography. Keep the alt pattern, name files `alex-adekunle-[context].webp`, serve WebP/AVIF.
3. **Wire the forms.** `wire()` in [assets/js/main.js](assets/js/main.js) has the `TODO` marking the fetch. Route speaking and press to their own inboxes.
4. **Drop in the scheduling embed** where `contact.html` marks the calendar slot.
5. **Ship the OG image** at `/images/alex-adekunle-og.jpg`, 1200×630.
7. **Pretty URLs.** Canonicals use `/about`, `/ventures/vavinix` etc. Map `about.html → /about` at the host (Netlify `_redirects`, Vercel `cleanUrls`, or nginx `try_files`) before indexing.
7. **Confirm the domain** and pick https + www or non-www, 301 everything else.

## Imagery

Two kinds of image, handled differently.

**Real photography** — `alex-adekunle-portrait`, `-agbada`, `-studio`. Supplied studio shots, used for the home hero, the About column and three gallery slots. These carry the document's alt pattern, `Alex Adekunle, founder of Vavinix, [context]`, and the Person schema `image` and Open Graph card both point at `alex-adekunle-portrait.jpg`.

**Brand marks** — `logo.svg` (header and footer wordmark), `favicon-eagle.png`, and three venture marks trimmed from their supplied cream plates to transparent PNG (`vavinix-venture`, `aspire-trybe-venture`, `thereceipt-venture`). Originals kept in `_src/`. The Aspire Trybe file arrived named `aspiretrybex-` and was renamed: the old brand name now appears exactly once in the build, as schema `alternateName`, which is what the document specifies. OneArtPiece has no mark yet — its pages use scene imagery.

**Generated scenes** — the remaining twelve, Higgsfield `gpt_image_2_5`, one matched set: white light, minimal composition, neutral palette, no people.

- Sources: `assets/img/_src/*.png` — **gitignored**, regenerate rather than commit.
- Served: `assets/img/<name>-<width>.jpg` at 480 / 768 / 1024 / native, plus `<name>.jpg` as the default `src`.
- `assets/img/manifest.json` records the widths and true intrinsic dimensions; `build.py` reads it to write `srcset`, `sizes`, `width` and `height`, so nothing shifts while loading. 6.5MB total across 53 files.

**Two deliberate constraints:**

1. **No synthetic portraits of Alex.** Every image of him is a real photograph. A generated face published as the real founder would be fabrication, and it would undercut the entity strategy this site is built on.
2. **Alt text describes what is in frame.** Photographs name him; generated scenes describe the room. The footer says which is which: *"Portraits are photographs. Interiors and still lifes are AI-generated stand-ins, pending a shoot."* When the full shoot lands, replace the scenes and delete that line.

To regenerate, prompts live in the conversation that produced them; the pipeline is `sips` in a short Python block — see git history for the exact call.

## Responsive

Verified in headless Chrome across 320 / 375 / 430 / 768 / 1024 / 1280 / 1536 / 2560 — 128 renders, zero horizontal overflow, zero clipped headlines, no tap target under 40px.

- `build.py` injects a width-descriptor `srcset` (480/768/1024/1400/1900) plus `sizes` on every Unsplash frame, so a 375px phone downloads a 480px file rather than an 1800px one.
- Display type is fluid (`clamp(2.1rem, 10.2vw, 9rem)`); clip masks carry descender padding so nothing is cut at any size.
- Card grids pair at `sm`, go editorial at `lg`. Definition rows get a dedicated 640–1023px layout.
- Buttons go full width below 480px; form inputs are 16px so iOS does not zoom on focus.
- Mobile drawer scrolls, locks the body, respects `env(safe-area-inset-bottom)`, and has a landscape-phone layout.
- Architectural column rules thin from 5 to 3 to 2 and drop out entirely below 400px.
- `@media (hover: none)` strips hover-only affordances; `prefers-reduced-motion` disables all of it.

To re-run the checks, serve the folder and point a Playwright script at it — the harness used during the build lived in the scratchpad, not the repo.

### Verified after the motion pass

- 128 renders (16 pages x 8 viewports, 320 to 2560): zero page-level overflow. The detector ignores elements an ancestor already scrolls or clips.
- Every page swept top to bottom: all curtains, reveals, split lines and parallax layers fire — 16/16 pages, zero console errors.
- 60fps, zero frames over 22ms, during scripted scroll on the three heaviest pages.
- Touch context: native momentum retained, reveals fire, marquee runs.
- Reduced-motion context: Lenis off, veil hidden, curtains open, lines visible, marquee static.
