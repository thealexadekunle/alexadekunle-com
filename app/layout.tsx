import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Cursor } from "@/components/motion/cursor";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { personSchema, vavinixSchema, websiteSchema } from "@/lib/schema";
import { SITE, withBasePath } from "@/lib/site";
import { MotionProvider } from "@/lib/motion/motion-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

/** Technical metadata markers only: eyebrows, indices, tags, figure numbers. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Alex Adekunle | Technology Entrepreneur, Founder of Vavinix",
    template: "%s | Alex Adekunle",
  },
  description:
    "Alex Adekunle is a Nigerian technology entrepreneur and web developer. Founder of Vavinix. Building Aspire Trybe, OneArtPiece and The Receipt.",
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  icons: {
    icon: withBasePath("/img/favicon-eagle.png"),
    apple: withBasePath("/img/favicon-eagle.png"),
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    type: "profile",
    siteName: SITE.name,
    locale: SITE.locale,
    images: [{ url: SITE.portrait, width: 901, height: 1200, alt: `${SITE.name}, founder of Vavinix` }],
  },
  twitter: { card: "summary_large_image", site: `@${SITE.handle}`, creator: `@${SITE.handle}` },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink focus:px-5 focus:py-3 focus:text-[11px] focus:uppercase focus:tracking-[0.16em] focus:text-paper"
        >
          Skip to content
        </a>

        {/* Architectural grid: hairline rules behind the whole page */}
        <div className="grid-rules" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>

        <MotionProvider>
          <Cursor />
          <SiteHeader />

          <main id="main" className="relative z-[1]">
            {children}
          </main>

          <SiteFooter />
        </MotionProvider>

        <JsonLd graph={[personSchema, websiteSchema, vavinixSchema]} />
      </body>
    </html>
  );
}
