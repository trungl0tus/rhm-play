"use client";

import { useEffect, useRef, useState } from "react";
import CinematicPoster, { type Procedure } from "./CinematicPoster";

type Props = {
  src?: string;
  procedure: Procedure;
  accent: string;
  caption?: string;
  /** Higher rootMargin keeps the video loaded just before it enters viewport. */
  eager?: boolean;
  className?: string;
  /** Disable autoplay (used inside continue-watching where stills feel calmer). */
  staticOnly?: boolean;
};

/**
 * VideoPreview paints a CinematicPoster instantly, then crossfades to a muted
 * autoplay clip once visible. Falls back gracefully if `src` is omitted or
 * the video fails to load. All previews are silent and looped — the global
 * audio control lives on the FeedReel only.
 */
export default function VideoPreview({
  src,
  procedure,
  accent,
  caption,
  eager,
  className = "",
  staticOnly,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(eager ?? false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (staticOnly || !src) return;
    if (eager) {
      setActive(true);
      return;
    }
    const node = wrapperRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(true);
        }
      },
      { rootMargin: "200px", threshold: 0.05 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [eager, src, staticOnly]);

  useEffect(() => {
    if (!active) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p) p.catch(() => undefined);
  }, [active]);

  return (
    <div ref={wrapperRef} className={`relative h-full w-full overflow-hidden ${className}`}>
      <CinematicPoster procedure={procedure} accent={accent} caption={caption} />
      {src && !staticOnly && active && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setReady(true)}
          onCanPlay={() => setReady(true)}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
          aria-hidden
        />
      )}
    </div>
  );
}
