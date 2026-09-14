import Image from "next/image";
import { ParallaxFrame } from "@/components/motion/parallax-frame";

type MediaFrameProps = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly aspect?: string;
  readonly sizes?: string;
  readonly priority?: boolean;
  readonly muted?: boolean;
  readonly parallax?: number | false;
  readonly className?: string;
};

/**
 * Every photographic frame on the site. Fixed aspect box, overflow clipped,
 * optional parallax layer inside that overflow so media lags the scroll
 * without ever pushing into neighbouring copy.
 */
export function MediaFrame({
  src,
  alt,
  width,
  height,
  aspect = "aspect-[4/5]",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 60vw",
  priority = false,
  muted = true,
  parallax = 0.055,
  className = "",
}: MediaFrameProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className="h-full w-full object-cover"
    />
  );

  return (
    <div className={`frame ${muted ? "frame-muted" : ""} ${aspect} ${className}`}>
      {parallax === false ? (
        image
      ) : (
        <ParallaxFrame speed={parallax} className="frame-inner">
          {image}
        </ParallaxFrame>
      )}
    </div>
  );
}
