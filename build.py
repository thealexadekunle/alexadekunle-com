#!/usr/bin/env python3
"""
Static builder for alexadekunle.com.

One layout shell + one content fragment per page + one metadata record.
Run `python3 build.py` to emit every page into the project root.

    src/layout.html      the shell: head, nav, footer, script tags
    src/pages/<slug>.html   body content for that page
    PAGES (below)        title, description, canonical, schema, nav state

Keeping the shell in exactly one file is what makes the nav, footer and
head consistent across nineteen pages without hand-syncing nineteen copies.
"""

import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"
SITE = "https://alexadekunle.com"

# ---------------------------------------------------------------------------
# Shared schema nodes. One canonical Person @id for the entire site; every
# page references it rather than declaring a second Person.
# ---------------------------------------------------------------------------
PERSON_ID = f"{SITE}/#alex-adekunle"
VAVINIX_ID = "https://vavinix.com/#organization"

PERSON = {
    "@type": "Person",
    "@id": PERSON_ID,
    "name": "Alex Adekunle",
    "alternateName": ["Alex Akinyele Adekunle", "thealexadekunle"],
    "givenName": "Alex",
    "additionalName": "Akinyele",
    "familyName": "Adekunle",
    "nationality": {"@type": "Country", "name": "Nigeria"},
    "url": f"{SITE}/",
    "mainEntityOfPage": f"{SITE}/about",
    "image": f"{SITE}/assets/img/alex-adekunle-portrait.jpg",
    "description": ("Nigerian technology entrepreneur, web developer and business strategist. "
                    "Founder of Vavinix. Building Aspire Trybe, OneArtPiece and The Receipt."),
    "jobTitle": ["Founder", "Technology Entrepreneur", "Web Developer", "Business Strategist"],
    "worksFor": {"@id": VAVINIX_ID},
    "founder": [
        {"@id": VAVINIX_ID},
        {"@id": f"{SITE}/ventures/aspire-trybe#organization"},
        {"@id": f"{SITE}/ventures/oneartpiece#organization"},
        {"@id": f"{SITE}/ventures/the-receipt#organization"},
    ],
    "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Federal University of Agriculture, Abeokuta",
        "alternateName": "FUNAAB",
        "url": "https://funaab.edu.ng/",
    },
    "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "educationalLevel": "BSc",
        "about": "Mathematics",
    },
    "knowsAbout": [
        "Web development", "Web design", "Search engine optimization", "Digital branding",
        "Technology entrepreneurship", "Business strategy", "AI automation", "Web3",
        "Youth empowerment in Africa",
    ],
    "knowsLanguage": ["English", "Yoruba"],
    "sameAs": [
        "https://www.linkedin.com/in/thealexadekunle/",
        "https://www.instagram.com/thealexadekunle",
        "https://x.com/thealexadekunle",
        "https://www.facebook.com/thealexadekunle",
        "https://www.tiktok.com/@thealexadekunle",
        "https://vavinix.com",
        "https://techbehemoths.com/company/vavinix-ltd",
    ],
}

WEBSITE = {
    "@type": "WebSite",
    "@id": f"{SITE}/#website",
    "url": f"{SITE}/",
    "name": "Alex Adekunle",
    "publisher": {"@id": PERSON_ID},
    "inLanguage": "en",
}

VAVINIX_ORG = {
    "@type": "Organization",
    "@id": VAVINIX_ID,
    "name": "Vavinix",
    "url": "https://vavinix.com",
    "foundingDate": "2021",
    "founder": {"@id": PERSON_ID},
    "description": ("Web design, digital branding and software development company serving "
                    "clients across the United States, United Kingdom, Spain and Nigeria."),
    "areaServed": ["US", "GB", "ES", "NG"],
    "sameAs": ["https://techbehemoths.com/company/vavinix-ltd"],
}


def org(slug, name, description, extra=None):
    """Venture Organization node, founder pointing back at the site Person @id."""
    node = {
        "@type": "Organization",
        "@id": f"{SITE}/ventures/{slug}#organization",
        "name": name,
        "founder": {"@id": PERSON_ID},
        "description": description,
        "areaServed": "NG",
    }
    if extra:
        node.update(extra)
    return node


def page_node(ptype, url, name, extra=None):
    node = {"@type": ptype, "@id": f"{url}#page", "url": url, "name": name,
            "isPartOf": {"@id": f"{SITE}/#website"}, "mainEntity": {"@id": PERSON_ID}}
    if extra:
        node.update(extra)
    return node


# ---------------------------------------------------------------------------
# Global navigation. `key` matches each page's `nav` value for active state.
# ---------------------------------------------------------------------------
NAV = [
    ("about", "About", "about.html"),
    ("ventures", "Ventures", "ventures.html"),
    ("services", "Services", "services.html"),
    ("eagle", "The Eagle", "the-eagle.html"),
    ("speaking", "Speaking", "speaking.html"),
]

FOOTER_EXPLORE = [
    ("About", "about.html"), ("Ventures", "ventures.html"),
    ("Services", "services.html"), ("Ideas", "ideas.html"), ("Journal", "journal.html"),
    ("The Eagle", "the-eagle.html"), ("Speaking", "speaking.html"),
    ("Lifestyle", "about.html#lifestyle"), ("Gallery", "gallery.html"),
]
FOOTER_VENTURES = [
    ("Vavinix", "ventures-vavinix.html"), ("Aspire Trybe", "ventures-aspire-trybe.html"),
    ("OneArtPiece", "ventures-oneartpiece.html"), ("The Receipt", "ventures-the-receipt.html"),
]
FOOTER_CONNECT = [
    ("Instagram", "https://www.instagram.com/thealexadekunle"),
    ("LinkedIn", "https://www.linkedin.com/in/thealexadekunle/"),
    ("X", "https://x.com/thealexadekunle"),
    ("Facebook", "https://www.facebook.com/thealexadekunle"),
    ("TikTok", "https://www.tiktok.com/@thealexadekunle"),
    ("Media", "media.html"), ("Resources", "resources.html"),
    ("Contact", "contact.html"), ("Press kit", "media.html#press-kit"),
]


# ---------------------------------------------------------------------------
# Page register. Titles and meta descriptions are the exact strings from the
# copy document's per-page SEO specification wherever one exists.
# ---------------------------------------------------------------------------
PAGES = [
    dict(
        out="index.html", nav="home", canonical=f"{SITE}/",
        title="Alex Adekunle | Technology Entrepreneur, Founder of Vavinix",
        desc=("Alex Adekunle is a Nigerian technology entrepreneur and web developer. Founder of "
              "Vavinix. Building Aspire Trybe, OneArtPiece and The Receipt."),
        og_type="profile",
        schema=[PERSON, WEBSITE, VAVINIX_ORG],
    ),
    dict(
        out="about.html", nav="about", canonical=f"{SITE}/about",
        title="About Alex Adekunle | Nigerian Technology Entrepreneur and Founder",
        desc=("Alex Akinyele Adekunle, technology entrepreneur, web developer and founder of "
              "Vavinix. Building on the web since 2011. BSc Mathematics, FUNAAB, Nigeria."),
        og_type="profile",
        schema=[page_node("ProfilePage", f"{SITE}/about", "About Alex Adekunle")],
    ),
    dict(
        out="ventures.html", nav="ventures", canonical=f"{SITE}/ventures",
        title="Ventures | Vavinix, Aspire Trybe, OneArtPiece and The Receipt",
        desc=("The companies Alex Adekunle is building: Vavinix, Aspire Trybe, OneArtPiece and "
              "The Receipt. Technology, youth opportunity, art and accountability."),
        schema=[page_node("CollectionPage", f"{SITE}/ventures", "Ventures", {
            "mainEntity": {
                "@type": "ItemList",
                "itemListElement": [
                    {"@type": "ListItem", "position": i + 1, "url": f"{SITE}/ventures/{s}", "name": n}
                    for i, (s, n) in enumerate([
                        ("vavinix", "Vavinix"), ("aspire-trybe", "Aspire Trybe"),
                        ("oneartpiece", "OneArtPiece"), ("the-receipt", "The Receipt")])
                ],
            }})],
    ),
    dict(
        out="ventures-vavinix.html", nav="ventures", canonical=f"{SITE}/ventures/vavinix",
        title="Vavinix | The Web Design Company Founded by Alex Adekunle",
        desc=("Vavinix is the web design and digital branding company Alex Adekunle founded in "
              "2021, serving clients in the US, UK, Spain and Nigeria."),
        schema=[VAVINIX_ORG],
    ),
    dict(
        out="ventures-aspire-trybe.html", nav="ventures", canonical=f"{SITE}/ventures/aspire-trybe",
        title="Aspire Trybe | The African Tech Talent Movement by Alex Adekunle",
        desc=("Aspire Trybe is a youth movement building the largest community of African tech "
              "talent. Digital skills, entrepreneurship and opportunity for ages 17 to 30."),
        schema=[org("aspire-trybe", "Aspire Trybe",
                    "A youth movement building the largest community of African tech talent.",
                    {"alternateName": "AspireTrybeX"})],
    ),
    dict(
        out="ventures-oneartpiece.html", nav="ventures", canonical=f"{SITE}/ventures/oneartpiece",
        title="OneArtPiece | Verified Physical Artwork and Artist Royalties",
        desc=("OneArtPiece is a marketplace for verified physical artwork. Blockchain "
              "certificates of authenticity and resale royalties that follow the artist."),
        schema=[org("oneartpiece", "OneArtPiece",
                    "A marketplace for verified physical artwork with blockchain certificates of "
                    "authenticity and resale royalties that follow the artist.")],
    ),
    dict(
        out="ventures-the-receipt.html", nav="ventures", canonical=f"{SITE}/ventures/the-receipt",
        title="The Receipt | Auditing Nigeria’s 36 Governors Against Their Manifestos",
        desc=("The Receipt tracks all 36 Nigerian state governors against their campaign "
              "manifestos. Promises made, evidence attached, updated over time."),
        schema=[org("the-receipt", "The Receipt",
                    "An audit of all thirty six Nigerian state governors against the manifestos "
                    "they campaigned on.", {"isPartOf": {"@id": VAVINIX_ID}})],
    ),
    dict(
        out="services.html", nav="services", canonical=f"{SITE}/services",
        title="Work With Alex Adekunle | Advisory, Ventures and Delivery",
        desc=("How to work with Alex Adekunle: strategy and advisory, delivery through Vavinix, "
              "speaking and venture partnerships. Scope, process and timelines."),
        schema=[page_node("WebPage", f"{SITE}/services", "Work with Alex Adekunle")],
    ),
    dict(
        out="the-eagle.html", nav="eagle", canonical=f"{SITE}/the-eagle",
        title="The Eagle | The Seven Principles of Alex Adekunle",
        desc=("Discipline, focus, consistency, faith, patience, hustle and freedom. The Eagle is "
              "the personal philosophy behind how Alex Adekunle builds."),
        schema=[page_node("WebPage", f"{SITE}/the-eagle", "The Eagle", {
            "mainEntity": {"@id": PERSON_ID},
            "about": {
                "@type": "ItemList",
                "itemListElement": [
                    {"@type": "ListItem", "position": i + 1, "name": n}
                    for i, n in enumerate(["Discipline", "Focus", "Consistency", "Faith",
                                           "Patience", "Hustle", "Freedom"])],
            }})],
    ),
    dict(
        out="speaking.html", nav="speaking", canonical=f"{SITE}/speaking",
        title="Speaking | Book Alex Adekunle, Technology and Entrepreneurship Speaker",
        desc=("Alex Adekunle speaks on technology, entrepreneurship, AI and digital opportunity "
              "in Africa. Available for conferences, universities and podcasts."),
        schema=[page_node("WebPage", f"{SITE}/speaking", "Speaking")],
    ),
    dict(
        out="contact.html", nav="contact", canonical=f"{SITE}/contact",
        title="Contact Alex Adekunle | Partnerships, Speaking and Media",
        desc=("Get in touch with Alex Adekunle, founder of Vavinix, for partnerships, speaking, "
              "media enquiries and project conversations."),
        schema=[page_node("ContactPage", f"{SITE}/contact", "Contact Alex Adekunle", {
            "mainEntity": {"@id": PERSON_ID},
            "contactPoint": [
                {"@type": "ContactPoint", "contactType": "project enquiries",
                 "url": "https://vavinix.com"},
                {"@type": "ContactPoint", "contactType": "speaking",
                 "email": "speaking@alexadekunle.com"},
                {"@type": "ContactPoint", "contactType": "media",
                 "email": "press@alexadekunle.com"},
                {"@type": "ContactPoint", "contactType": "general",
                 "email": "hello@alexadekunle.com"},
            ]})],
    ),
    # Thin at launch: noindex, follow until each holds three real items.
    dict(
        out="ideas.html", nav="", canonical=f"{SITE}/ideas", robots="noindex, follow",
        title="Ideas | Alex Adekunle on Technology, Business and Building in Africa",
        desc=("Essays and principles from Alex Adekunle on technology, business, leadership, "
              "entrepreneurship and building opportunity across Africa."),
        schema=[page_node("CollectionPage", f"{SITE}/ideas", "Ideas")],
    ),
    dict(
        out="journal.html", nav="", canonical=f"{SITE}/journal", robots="noindex, follow",
        title="Journal | Alex Adekunle, Building in Public",
        desc=("Founder notes, project lessons and business experiments from Alex Adekunle. "
              "Building in public, documented as it happens."),
        schema=[page_node("Blog", f"{SITE}/journal", "Journal")],
    ),
    dict(
        out="media.html", nav="", canonical=f"{SITE}/media", robots="noindex, follow",
        title="Media and Press | Alex Adekunle Interviews, Podcasts and Features",
        desc=("Interviews, podcast appearances, features and press coverage of Alex Adekunle, "
              "founder of Vavinix. Press kit and media enquiries."),
        schema=[page_node("CollectionPage", f"{SITE}/media", "Media and Press")],
    ),
    dict(
        out="resources.html", nav="", canonical=f"{SITE}/resources", robots="noindex, follow",
        title="Resources | Tools and Systems Alex Adekunle Uses and Recommends",
        desc=("The tools, frameworks, books and systems Alex Adekunle uses for building, "
              "automating and running a digital business. Tested, not sponsored."),
        schema=[page_node("CollectionPage", f"{SITE}/resources", "Resources")],
    ),
    dict(
        out="gallery.html", nav="", canonical=f"{SITE}/gallery",
        title="Gallery | Alex Adekunle in Photographs",
        desc=("Photographs from the journey: work, travel, speaking and the people around the "
              "building. Alex Adekunle, founder of Vavinix."),
        schema=[page_node("ImageGallery", f"{SITE}/gallery", "Gallery")],
    ),
]



# ---------------------------------------------------------------------------
# Responsive images: every Unsplash frame gets a width-descriptor srcset so
# a 375px phone downloads a 480px file instead of a 1800px one.
# ---------------------------------------------------------------------------
SRCSET_WIDTHS = [480, 768, 1024, 1400, 1900]
DEFAULT_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 60vw"

# Widths actually rendered for each local image, written by the image pipeline.
_manifest_path = ROOT / "assets" / "img" / "manifest.json"
IMG_MANIFEST = json.loads(_manifest_path.read_text()) if _manifest_path.exists() else {}


def add_srcset(html):
    """Give every image a width-descriptor srcset.

    Local images are served from assets/img in the widths the pipeline built,
    and carry their true intrinsic dimensions so nothing shifts while loading.
    Remote Unsplash URLs keep the query-param treatment.
    """
    def repl(match):
        tag = match.group(0)
        if "srcset=" in tag:
            return tag
        src = re.search(r'src="([^"]+)"', tag).group(1)

        if src.startswith("assets/img/"):
            name = src.rsplit("/", 1)[-1].rsplit(".", 1)[0]
            entry = IMG_MANIFEST.get(name)
            if not entry:
                return tag
            srcset = ", ".join("assets/img/%s-%d.jpg %dw" % (name, w, w) for w in entry["widths"])
            extra = ' srcset="%s" sizes="%s"' % (srcset, DEFAULT_SIZES)
            # Replace the stale placeholder dimensions with the real ones
            tag = re.sub(r'width="\d+"', 'width="%d"' % entry["native"], tag)
            tag = re.sub(r'height="\d+"', 'height="%d"' % entry["height"], tag)
        elif "images.unsplash.com" in src:
            base = re.sub(r"([?&])w=\d+", r"\1w=%d", src)
            if "w=%d" not in base:
                return tag
            srcset = ", ".join("%s %dw" % (base % w, w) for w in SRCSET_WIDTHS)
            extra = ' srcset="%s" sizes="%s"' % (srcset, DEFAULT_SIZES)
        else:
            return tag

        return tag[:-2] + extra + " />" if tag.rstrip().endswith("/>") else tag[:-1] + extra + ">"

    return re.sub(r"<img\b[^>]*>", repl, html)


# ---------------------------------------------------------------------------
# Motion hooks. Attached at build time so content fragments stay pure markup:
#   data-clip     image frames wipe in behind a moving clip-path edge
#   data-split    plain-text headings and ledes split into per-line masks
#   data-tilt     interactive cards tilt and light their border on pointer move
#   data-magnetic status pills pull toward the cursor
# ---------------------------------------------------------------------------
# Attributes may appear in any order, so do not assume class comes first.
SPLIT_TAGS = re.compile(
    r'<(h2|h3)\s+([^>]*?)class="([^"]*display--sm[^"]*)"([^>]*)>([^<]+)</\1>')


def _split_tag(match):
    tag, before, classes, after, inner = match.groups()
    if "data-split" in before or "data-split" in after:
        return match.group(0)
    return '<%s %sclass="%s"%s data-split>%s</%s>' % (tag, before, classes, after, inner, tag)


def add_motion(html):
    # Any div carrying the frame class becomes a curtain-revealed media box,
    # wherever `frame` sits in its class list.
    html = re.sub(r'<div class="([^"]*\bframe\b[^"]*)"(?!\s*data-clip)', r'<div class="\1" data-clip', html)
    html = re.sub(r'<a class="(tile[^"]*)"', r'<a class="\1" data-tilt', html)
    html = html.replace('<span class="pill"', '<span class="pill" data-magnetic')

    # Wrap each framed image in a parallax layer. The drift happens inside the
    # frame's overflow, so media lags the scroll without ever overlapping copy.
    speeds = [0.055, 0.08, 0.04, 0.07]
    counter = {"i": 0}

    def wrap(match):
        open_div, gap_a, img, gap_b, close = match.groups()
        speed = speeds[counter["i"] % len(speeds)]
        counter["i"] += 1
        return ('%s%s<div class="frame__inner" data-parallax="%s">%s</div>%s%s'
                % (open_div, gap_a, speed, img, gap_b, close))

    html = re.sub(
        r'(<div class="[^"]*\bframe\b[^"]*" data-clip[^>]*>)(\s*)(<img\b[^>]*>)(\s*)(</div>)',
        wrap, html, flags=re.S)

    html = SPLIT_TAGS.sub(_split_tag, html)
    return html


# ---------------------------------------------------------------------------
# Render
# ---------------------------------------------------------------------------
def nav_markup(active):
    out = []
    for key, label, href in NAV:
        current = ' aria-current="page"' if key == active else ""
        out.append(f'<a class="nav-link" href="{href}"{current}>{label}</a>')
    return "\n          ".join(out)


def mobile_markup(active):
    items = list(NAV) + [("contact", "Contact", "contact.html")]
    out = []
    for key, label, href in items:
        current = ' aria-current="page"' if key == active else ""
        out.append(f'<a class="m-link" href="{href}"{current}><span>{label}</span>'
                   f'<span class="m-link__dot" aria-hidden="true"></span></a>')
    return "\n        ".join(out)


def links_markup(pairs, cls="foot-link"):
    out = []
    for label, href in pairs:
        rel = ' rel="me noopener"' if href.startswith("http") else ""
        out.append(f'<li><a class="{cls}" href="{href}"{rel}>{label}</a></li>')
    return "\n            ".join(out)


def build():
    layout = (SRC / "layout.html").read_text(encoding="utf-8")
    written = []

    for page in PAGES:
        slug = page["out"].replace(".html", "")
        fragment = SRC / "pages" / f"{slug}.html"
        if not fragment.exists():
            print(f"  ! missing fragment: {fragment}", file=sys.stderr)
            continue

        graph = json.dumps({"@context": "https://schema.org", "@graph": page["schema"]},
                           indent=2, ensure_ascii=False)

        html = layout
        for token, value in {
            "{{TITLE}}": page["title"],
            "{{DESC}}": page["desc"],
            "{{CANONICAL}}": page["canonical"],
            "{{ROBOTS}}": page.get("robots", "index, follow, max-image-preview:large"),
            "{{OG_TYPE}}": page.get("og_type", "website"),
            "{{JSONLD}}": graph,
            "{{NAV}}": nav_markup(page["nav"]),
            "{{MOBILE_NAV}}": mobile_markup(page["nav"]),
            "{{FOOT_EXPLORE}}": links_markup(FOOTER_EXPLORE),
            "{{FOOT_VENTURES}}": links_markup(FOOTER_VENTURES),
            "{{FOOT_CONNECT}}": links_markup(FOOTER_CONNECT),
            "{{BODY}}": fragment.read_text(encoding="utf-8"),
        }.items():
            html = html.replace(token, value)

        leftover = re.findall(r"\{\{[A-Z_]+\}\}", html)
        if leftover:
            print(f"  ! unreplaced tokens in {page['out']}: {set(leftover)}", file=sys.stderr)

        html = add_srcset(html)
        html = add_motion(html)
        (ROOT / page["out"]).write_text(html, encoding="utf-8")
        written.append(page["out"])

    print(f"built {len(written)} pages")
    for name in written:
        print(f"  · {name}")


if __name__ == "__main__":
    build()
