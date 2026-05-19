"use client";

import Link from "next/link";
import { SERIES, fmtDuration, type SeriesEntry } from "../lib/seriesData";
import VideoPreview from "./VideoPreview";

/**
 * Cinematic horizontal "Tiếp tục xem" strip used on the premium home and the
 * /continue page. Computes resume points from the static SERIES list — each
 * card surfaces the next unwatched episode rather than the last-watched, so
 * the CTA reads naturally as "Resume episode N".
 */
export default function ContinueRow({ limit = 6 }: { limit?: number }) {
  const items = SERIES.filter((s) => s.progress > 0 && s.progress < 1).slice(0, limit);
  if (items.length === 0) return null;

  return (
    <div className="row-snap no-scrollbar fade-edges flex gap-3 overflow-x-auto px-4 pb-2 pt-3">
      {items.map((series) => (
        <ContinueCard key={series.id} series={series} />
      ))}
    </div>
  );
}

function ContinueCard({ series }: { series: SeriesEntry }) {
  const total = series.episodes.length;
  const watched = series.episodes.filter((e) => e.watched).length;
  const nextEp =
    series.episodes.find((e) => !e.watched) ?? series.episodes[total - 1];
  const remainingSec = nextEp?.durationSec ?? 0;
  const progressPct = Math.max(Math.round(series.progress * 100), watched > 0 ? 4 : 0);

  return (
    <Link
      href={`/series/${series.id}`}
      className="lift-fx press-fx group relative block w-[260px] flex-shrink-0 overflow-hidden rounded-3xl"
      style={{
        background: "linear-gradient(180deg, #0d1c2d 0%, #0a141f 100%)",
        boxShadow: `0 18px 38px -18px ${series.accent}44, 0 0 0 1px ${series.accent}1f inset`,
      }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <VideoPreview
          src={series.previewVideoUrl}
          procedure={series.procedure}
          accent={series.accent}
          caption={series.title}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,11,20,0.1) 0%, rgba(5,11,20,0.55) 60%, rgba(5,11,20,0.95) 100%)",
          }}
          aria-hidden
        />

        {/* Centered resume button */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full backdrop-blur-md"
            style={{
              background: "rgba(0,0,0,0.45)",
              border: `1.5px solid ${series.accent}99`,
              boxShadow: `0 0 26px ${series.accent}66`,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Bottom title plate */}
        <div className="absolute inset-x-0 bottom-0 px-3.5 py-3">
          <p
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: series.accent }}
          >
            Tập {watched + 1} / {total} · còn {fmtDuration(remainingSec)}
          </p>
          <h3 className="mt-1 line-clamp-1 text-[14.5px] font-bold text-white">
            {nextEp?.title ?? series.title}
          </h3>
          <p className="line-clamp-1 text-[11px] text-white/65">
            {series.title}
          </p>
        </div>
      </div>

      {/* Sleek bottom progress bar */}
      <div className="relative h-1.5 w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: `${progressPct}%`,
            background: `linear-gradient(90deg, ${series.accent}, ${series.accent}cc)`,
            boxShadow: `0 0 10px ${series.accent}aa`,
          }}
          aria-hidden
        />
      </div>
    </Link>
  );
}
