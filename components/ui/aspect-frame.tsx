import Image from "next/image";
import type { ReactNode } from "react";
import { ParallaxFrame } from "@/components/motion/parallax-frame";

type AspectFrameProps = {
  readonly src: string;
  readonly alt: string;
  readonly ratio?: "16/10" | "16/9" | "4/5" | "3/4" | "2/3" | "1/1";
  readonly sizes?: string;
  readonly priority?: boolean;
  readonly muted?: boolean;
  readonly parallax?: number | false;
  readonly className?: string;
  readonly overlay?: ReactNode;
};

const RATIOS = {
  "16/10": "aspect-[16/10]",
  "16/9": "aspect-[16/9]",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "2/3": "aspect-[2/3]",
  "1/1": "aspect-square",
} as const;

/**
 * Every photographic frame on the site.
 *
 * `fill` + a ratio wrapper means the box reserves its space before the image
 * arrives, so there is no layout shift and no need to thread intrinsic
 * dimensions through the call site. Parallax happens inside the clipped box,
 * so media lags the scroll without pushing into neighbouring copy.
 */
export function AspectFrame({
  src,
  alt,
  ratio = "4/5",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 60vw",
  priority = false,
  muted = true,
  parallax = 0.055,
  className = "",
  overlay,
}: AspectFrameProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
    />
  );

  return (
    <div className={`frame ${muted ? "frame-muted" : ""} ${RATIOS[ratio]} ${className}`}>
      {parallax === false ? (
        image
      ) : (
        <ParallaxFrame speed={parallax} className="frame-inner">
          {image}
        </ParallaxFrame>
      )}
      {overlay}
    </div>
  );
}
