"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SeriesEntry } from "../lib/seriesData";
import { fmtCount } from "../lib/seriesData";
import VideoPreview from "./VideoPreview";

type Props = {
  picks: SeriesEntry[];
};

/**
 * Cinematic hero rotator at the top of the premium home. Auto-cycles between
 * featured series, plays a silent loop preview behind a heavy scrim, and
 * surfaces a doctor avatar, tagline, and dual CTA (Watch / +My List).
 */
export default function HeroBanner({ picks }: Props) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (picks.length <= 1) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % picks.length),
      9000,
    );
    return () => clearInterval(id);
  }, [picks.length]);

  const series = picks[idx];
  if (!series) return null;

  return (
    <section className="relative h-[68vh] min-h-[460px] max-h-[640px] w-full overflow-hidden">
      <div key={series.id} className="absolute inset-0">
        <VideoPreview
          src={series.previewVideoUrl}
          procedure={series.procedure}
          accent={series.accent}
          caption={series.title}
          eager
        />
      </div>

      {/* Side + bottom cinematic scrims */}
      <div className="hero-side-scrim pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-scrim pointer-events-none absolute inset-0" aria-hidden />

      {/* Top brand chrome */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-[max(env(safe-area-inset-top),1rem)]">
        <div className="pointer-events-auto flex items-center gap-2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black"
            style={{
              background: "linear-gradient(135deg, #1fb6a8, #14a094)",
              color: "#001815",
              boxShadow: "0 0 18px rgba(31,182,168,0.45)",
            }}
          >
            R
          </div>
          <div className="leading-none">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">
              RHM
            </p>
            <p className="text-[15px] font-extrabold text-white">
              Play<span className="ml-1 align-top text-[8px] text-white/50">®</span>
            </p>
          </div>
        </div>
        <Link
          href="/series"
          aria-label="Tìm kiếm"
          className="pointer-events-auto press-fx tap-target glass-dark flex items-center justify-center rounded-full"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d="M21 20l-5.6-5.6A8 8 0 1 0 14 16.4L20 21Zm-11-2a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z" />
          </svg>
        </Link>
      </div>

      {/* Hero copy + CTAs */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-8">
        {series.newRelease && (
          <span
            className="mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#2a1900]"
            style={{
              background: "linear-gradient(135deg, #fde68a, #f5b945)",
              boxShadow: "0 0 18px rgba(245,185,69,0.45)",
            }}
          >
            <SparkleIcon /> Tập mới · cập nhật tuần này
          </span>
        )}

        <p
          className="text-[11px] font-bold uppercase tracking-[0.28em]"
          style={{
            color: series.accent,
            textShadow: `0 0 14px ${series.accent}99`,
          }}
        >
          Tuyển chọn cao cấp
        </p>
        <h1 className="font-display mt-2 text-[36px] font-black leading-[1.02] tracking-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)]">
          {series.title}
        </h1>
        {series.tagline && (
          <p className="mt-2 max-w-[88%] text-[13.5px] font-medium text-white/80">
            {series.tagline}
          </p>
        )}

        <div className="mt-4 flex items-center gap-3 text-[12px] text-white/75">
          <span className="flex items-center gap-1 font-semibold">
            <span style={{ color: "#f5b945" }}>★</span>
            <span className="text-white">{series.rating}</span>
          </span>
          <BulletSep />
          <span>
            <span className="font-semibold text-white">
              {fmtCount(series.studentCount)}
            </span>{" "}
            học viên
          </span>
          <BulletSep />
          <span>{series.episodes.length} tập</span>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Link
            href={`/series/${series.id}`}
            className="press-fx tap-target flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 text-[14.5px] font-extrabold"
            style={{
              background: "white",
              color: "#04121f",
              paddingTop: 13,
              paddingBottom: 13,
              boxShadow: "0 14px 30px -10px rgba(255,255,255,0.35)",
            }}
          >
            <PlayIcon /> Xem ngay
          </Link>
          <Link
            href={`/series/${series.id}`}
            className="press-fx tap-target glass-dark flex items-center justify-center gap-2 rounded-2xl px-4 text-[13px] font-bold text-white"
            style={{ paddingTop: 12, paddingBottom: 12 }}
          >
            <PlusIcon /> Danh sách
          </Link>
        </div>

        {/* Slide indicators */}
        {picks.length > 1 && (
          <div className="mt-5 flex items-center gap-1.5">
            {picks.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Xem ${p.title}`}
                onClick={() => setIdx(i)}
                className="h-1 overflow-hidden rounded-full transition-all"
                style={{
                  width: i === idx ? 28 : 12,
                  background:
                    i === idx
                      ? "linear-gradient(90deg, #5eead4, #1fb6a8)"
                      : "rgba(255,255,255,0.25)",
                  boxShadow:
                    i === idx ? "0 0 12px rgba(31,182,168,0.6)" : "none",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function BulletSep() {
  return <span className="text-white/35">·</span>;
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2 14 9l7 2-7 2-2 7-2-7-7-2 7-2z" />
    </svg>
  );
}
