"use client";

import Link from "next/link";
import { fmtCount, type SeriesEntry } from "../lib/seriesData";
import VideoPreview from "./VideoPreview";

type Variant = "featured" | "poster" | "landscape" | "tall";

type Props = {
  series: SeriesEntry;
  variant?: Variant;
  badge?: string;
  /** Autoplay the silent video on first card mount (used for the first featured). */
  eagerPreview?: boolean;
};

/**
 * Single cinematic series card with four variants:
 *   - featured  : 4:5 hero card with autoplay video preview + glow halo
 *   - poster    : 2:3 portrait poster (used in "Mới phát hành")
 *   - landscape : 16:9 with progress bar (used for catalog grid)
 *   - tall      : 4:6 with deep accent border (used in "Hot"/curated rails)
 */
export default function SeriesCard({
  series,
  variant = "featured",
  badge,
  eagerPreview,
}: Props) {
  if (variant === "featured") return <Featured series={series} badge={badge} eagerPreview={eagerPreview} />;
  if (variant === "poster") return <Poster series={series} badge={badge} />;
  if (variant === "landscape") return <Landscape series={series} badge={badge} />;
  return <Tall series={series} badge={badge} />;
}

function Featured({
  series,
  badge,
  eagerPreview,
}: {
  series: SeriesEntry;
  badge?: string;
  eagerPreview?: boolean;
}) {
  const free = series.episodes.filter((e) => e.isFree).length;
  return (
    <Link
      href={`/series/${series.id}`}
      className="lift-fx press-fx relative block w-[290px] flex-shrink-0 overflow-hidden rounded-[28px]"
      style={{
        boxShadow: `0 24px 60px -18px ${series.accent}55, 0 0 0 1px ${series.accent}33 inset`,
      }}
    >
      <div className="relative aspect-[4/5] w-full">
        <VideoPreview
          src={series.previewVideoUrl}
          procedure={series.procedure}
          accent={series.accent}
          caption={series.title}
          eager={eagerPreview}
        />

        {/* Deep cinematic scrim */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,11,20,0.15) 0%, transparent 38%, rgba(5,11,20,0.92) 92%)",
          }}
          aria-hidden
        />

        {/* Side accent rule */}
        <div
          className="absolute inset-y-0 left-0 w-[3px]"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${series.accent} 50%, transparent 100%)`,
            boxShadow: `0 0 22px ${series.accent}`,
          }}
          aria-hidden
        />

        {/* Top-row badges */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
            style={{
              background: "rgba(0,0,0,0.55)",
              color: series.accent,
              border: `1px solid ${series.accent}55`,
            }}
          >
            {series.episodes.length} tập
          </span>
          {(badge || series.newRelease) && (
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-extrabold tracking-wider"
              style={{
                background: "linear-gradient(135deg, #fde68a, #f5b945)",
                color: "#2a1900",
                boxShadow: "0 0 16px rgba(245,185,69,0.4)",
              }}
            >
              {badge ?? "MỚI"}
            </span>
          )}
        </div>

        {/* Bottom copy */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.22em] neon-text"
            style={{ color: series.accent }}
          >
            {series.subtitle}
          </p>
          <h3 className="font-display mt-1 text-[22px] font-black leading-[1.05] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            {series.title}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-white/80">
            <span className="flex items-center gap-0.5">
              <span style={{ color: "#f5b945" }}>★</span> {series.rating}
            </span>
            <span className="text-white/40">·</span>
            <span>{fmtCount(series.studentCount)} hv</span>
            <span className="text-white/40">·</span>
            <span>{free} miễn phí</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Poster({ series, badge }: { series: SeriesEntry; badge?: string }) {
  return (
    <Link
      href={`/series/${series.id}`}
      className="lift-fx press-fx relative block w-[168px] flex-shrink-0 overflow-hidden rounded-2xl"
      style={{ boxShadow: `0 16px 32px -16px ${series.accent}55` }}
    >
      <div className="relative aspect-[2/3] w-full">
        <VideoPreview
          src={series.previewVideoUrl}
          procedure={series.procedure}
          accent={series.accent}
          caption={series.title}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(5,11,20,0.95) 80%)",
          }}
          aria-hidden
        />
        {badge && (
          <span
            className="absolute left-2 top-2 rounded-md px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider"
            style={{ background: series.accent, color: "#001815" }}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="line-clamp-2 text-[13px] font-bold leading-tight text-white">
          {series.title}
        </h3>
        <p className="mt-0.5 text-[10px] text-white/65">
          {series.episodes.length} tập · ★ {series.rating}
        </p>
      </div>
    </Link>
  );
}

function Landscape({ series, badge }: { series: SeriesEntry; badge?: string }) {
  const totalEp = series.episodes.length;
  const watchedEp = series.episodes.filter((e) => e.watched).length;
  return (
    <Link
      href={`/series/${series.id}`}
      className="lift-fx press-fx glass-card group relative block overflow-hidden rounded-3xl"
      style={{
        boxShadow: `0 22px 44px -22px ${series.accent}33, 0 0 0 1px ${series.accent}22 inset`,
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
          className="absolute inset-y-0 left-0 w-1"
          style={{ background: series.accent }}
          aria-hidden
        />
        <div className="absolute right-3 top-3 flex items-center gap-2">
          {badge && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-bold backdrop-blur-md"
              style={{
                background: "rgba(245,185,69,0.18)",
                color: "var(--premium)",
                border: "1px solid rgba(245,185,69,0.4)",
              }}
            >
              {badge}
            </span>
          )}
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-bold backdrop-blur-md"
            style={{
              background: "rgba(0,0,0,0.55)",
              color: "white",
              border: `1px solid ${series.accent}55`,
            }}
          >
            {totalEp} tập
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-[16px] font-bold leading-tight">{series.title}</h3>
        <p
          className="mt-0.5 text-[12px] font-medium"
          style={{ color: series.accent }}
        >
          {series.subtitle}
        </p>
        <p className="mt-1.5 line-clamp-2 text-[12.5px] text-text-dim">
          {series.description}
        </p>

        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-text-dim">
              {watchedEp > 0
                ? `Đã xem ${watchedEp}/${totalEp}`
                : `${totalEp} tập`}
            </span>
            <span className="font-semibold" style={{ color: series.accent }}>
              {Math.round(series.progress * 100)}%
            </span>
          </div>
          <div
            className="mt-1.5 h-1 overflow-hidden rounded-full"
            style={{ background: "var(--bg-elev)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.max(series.progress * 100, watchedEp > 0 ? 3 : 0)}%`,
                background: `linear-gradient(90deg, ${series.accent}, ${series.accent}cc)`,
                boxShadow: `0 0 10px ${series.accent}80`,
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

function Tall({ series, badge }: { series: SeriesEntry; badge?: string }) {
  return (
    <Link
      href={`/series/${series.id}`}
      className="lift-fx press-fx relative block w-[200px] flex-shrink-0 overflow-hidden rounded-3xl"
      style={{ boxShadow: `0 22px 44px -20px ${series.accent}55` }}
    >
      <div className="relative aspect-[3/4] w-full">
        <VideoPreview
          src={series.previewVideoUrl}
          procedure={series.procedure}
          accent={series.accent}
          caption={series.title}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-3/4"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(5,11,20,0.95) 85%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-y-0 left-0 w-[3px]"
          style={{
            background: series.accent,
            boxShadow: `0 0 16px ${series.accent}`,
          }}
          aria-hidden
        />
        {badge && (
          <span
            className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-extrabold tracking-wider"
            style={{
              background: "rgba(0,0,0,0.55)",
              color: "white",
              border: `1px solid ${series.accent}66`,
            }}
          >
            {badge}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-3.5">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: series.accent }}
          >
            {series.subtitle}
          </p>
          <h3 className="font-display mt-1 text-[16px] font-black leading-tight text-white">
            {series.title}
          </h3>
          <p className="mt-1 text-[10.5px] text-white/70">
            ★ {series.rating} · {series.episodes.length} tập
          </p>
        </div>
      </div>
    </Link>
  );
}
