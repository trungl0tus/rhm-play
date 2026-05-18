"use client";

import Link from "next/link";
import { useState } from "react";
import {
  fmtCount,
  fmtDuration,
  type SeriesEntry,
  type SeriesEpisode,
} from "../lib/seriesData";
import CinematicPoster from "./CinematicPoster";

export default function EpisodeListView({ series }: { series: SeriesEntry }) {
  const total = series.episodes.length;
  const watched = series.episodes.filter((e) => e.watched).length;
  const free = series.episodes.filter((e) => e.isFree).length;
  const totalDuration = series.episodes.reduce(
    (acc, e) => acc + e.durationSec,
    0,
  );

  return (
    <div className="pb-28">
      {/* Hero */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <CinematicPoster
          procedure={series.procedure}
          accent={series.accent}
          caption={series.title}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-3/4"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(5,11,20,0.92) 70%, var(--bg) 100%)",
          }}
        />

        <Link
          href="/series"
          aria-label="Quay lại"
          className="press-fx tap-target glass-dark absolute left-3 top-3 flex items-center justify-center rounded-full"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </Link>

        <button
          type="button"
          aria-label="Chia sẻ"
          className="press-fx tap-target glass-dark absolute right-3 top-3 flex items-center justify-center rounded-full"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d="M18 16.08a3 3 0 0 0-2.4 1.2L8.91 13.6a3 3 0 0 0 0-3.2l6.69-3.68A3 3 0 1 0 14.5 5l-6.93 3.81a3 3 0 1 0 0 6.38L14.5 19a3 3 0 1 0 3.5-2.92Z" />
          </svg>
        </button>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <p
            className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] neon-text"
            style={{ color: series.accent }}
          >
            {series.subtitle}
          </p>
          <h1 className="text-[26px] font-extrabold leading-tight tracking-tight text-white">
            {series.title}
          </h1>
          <p className="mt-1.5 max-w-[90%] text-[13px] text-white/80">
            {series.description}
          </p>

          <div className="mt-3 flex items-center gap-3 text-xs text-white/80">
            <span className="flex items-center gap-1">
              <StarIcon /> <strong className="text-white">{series.rating}</strong>
            </span>
            <Dot />
            <span>
              <strong className="text-white">{fmtCount(series.studentCount)}</strong>{" "}
              học viên
            </span>
            <Dot />
            <span>
              {total} tập · {Math.round(totalDuration / 60)} phút
            </span>
          </div>
        </div>
      </div>

      {/* Doctor card */}
      <div className="px-4 pt-4">
        <div className="glass-card flex items-center gap-3 rounded-2xl p-3">
          <div
            className="h-12 w-12 flex-shrink-0 rounded-full p-[2px]"
            style={{
              background: `linear-gradient(135deg, ${series.accent}, white)`,
            }}
          >
            <img
              src={series.doctor.avatar}
              alt={series.doctor.name}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              {series.doctor.name}
            </p>
            <p className="truncate text-xs text-text-dim">
              {series.doctor.role}
            </p>
          </div>
          <button
            type="button"
            className="press-fx rounded-full px-3 py-1.5 text-xs font-bold"
            style={{
              background: series.accent,
              color: "#001815",
            }}
          >
            Theo dõi
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-dim">
            Tiến độ học · <strong className="text-text">{watched}/{total}</strong>{" "}
            tập
          </span>
          <span
            className="font-bold"
            style={{ color: series.accent }}
          >
            {Math.round(series.progress * 100)}%
          </span>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full"
          style={{ background: "var(--bg-elev)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.max(series.progress * 100, watched > 0 ? 3 : 0)}%`,
              background: `linear-gradient(90deg, ${series.accent}, ${series.accent}cc)`,
              boxShadow: `0 0 12px ${series.accent}80`,
            }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-text-faint">
          {free} tập miễn phí · {total - free} tập Premium
        </p>
      </div>

      {/* CTA */}
      <div className="px-4 pt-4">
        <button
          type="button"
          className="press-fx tap-target neon-teal w-full rounded-2xl text-[15px] font-bold"
          style={{
            background: series.accent,
            color: "#001815",
            padding: "14px",
          }}
        >
          {watched > 0 ? "▶  Xem tiếp tập " + (watched + 1) : "▶  Bắt đầu học"}
        </button>
      </div>

      {/* Episode list */}
      <div className="space-y-2.5 px-3 pt-6">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-bold">Danh sách bài học</h2>
          <span className="text-xs text-text-faint">{total} tập</span>
        </div>
        {series.episodes.map((episode) => (
          <EpisodeRow
            key={episode.id}
            episode={episode}
            seriesId={series.id}
            accent={series.accent}
          />
        ))}
      </div>
    </div>
  );
}

function EpisodeRow({
  episode,
  seriesId: _seriesId,
  accent,
}: {
  episode: SeriesEpisode;
  seriesId: string;
  accent: string;
}) {
  const [open, setOpen] = useState(false);
  const hasResources = (episode.resources?.length ?? 0) > 0;

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{
        background: "var(--bg-card)",
        borderColor: episode.watched ? `${accent}55` : "var(--border)",
      }}
    >
      <button
        type="button"
        onClick={() => hasResources && setOpen((v) => !v)}
        className="press-fx flex w-full items-center gap-3 p-3 text-left"
      >
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold"
          style={{
            background: episode.watched
              ? accent
              : episode.isFree
                ? "var(--bg-elev)"
                : "rgba(245,185,69,0.18)",
            color: episode.watched
              ? "#001815"
              : episode.isFree
                ? "var(--text-dim)"
                : "var(--premium)",
            boxShadow: episode.watched
              ? `0 0 14px ${accent}66`
              : "none",
          }}
        >
          {episode.watched ? <CheckIcon /> : episode.order}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold">{episode.title}</p>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-text-dim">
            <span>{fmtDuration(episode.durationSec)}</span>
            {episode.isFree ? (
              <span style={{ color: accent }}>· Miễn phí</span>
            ) : (
              <span style={{ color: "var(--premium)" }}>· Premium</span>
            )}
            {hasResources && (
              <>
                <span>·</span>
                <span className="flex items-center gap-0.5">
                  <PaperclipIcon />
                  {episode.resources?.length} tài liệu
                </span>
              </>
            )}
          </div>
        </div>
        {episode.isFree ? (
          <PlayIcon color={accent} />
        ) : (
          <Link
            href="/premium"
            aria-label="Mở khoá Premium"
            onClick={(e) => e.stopPropagation()}
            className="press-fx flex h-9 items-center gap-1 rounded-full px-3 text-[11px] font-bold"
            style={{
              background: "rgba(245,185,69,0.16)",
              color: "var(--premium)",
            }}
          >
            <PadlockIcon /> Mở khoá
          </Link>
        )}
      </button>

      {hasResources && open && (
        <div
          className="border-t px-3 py-3"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="mb-2 text-[11px] uppercase tracking-wider text-text-faint">
            Tài liệu đính kèm
          </p>
          <ul className="space-y-1.5">
            {episode.resources?.map((res, i) => (
              <li key={i}>
                <button
                  type="button"
                  disabled={!episode.isFree}
                  className="press-fx glass-card flex w-full items-center gap-3 rounded-xl p-2.5 text-left disabled:opacity-50"
                >
                  <FileIcon type={res.type} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold">
                      {res.label}
                    </p>
                    <p className="text-[10px] text-text-faint uppercase tracking-wide">
                      {res.type} · {res.size}
                    </p>
                  </div>
                  {episode.isFree ? (
                    <DownloadIcon />
                  ) : (
                    <PadlockIcon />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#f5b945" aria-hidden>
      <path d="m12 2 3 7 7 .8-5 5 1.5 7-6.5-4-6.5 4L7 14.8 2 9.8 9 9Z" />
    </svg>
  );
}
function Dot() {
  return <span className="text-white/40">·</span>;
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}
function PlayIcon({ color }: { color: string }) {
  return (
    <div
      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
      style={{
        background: `${color}1a`,
        color,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}
function PadlockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-.5V4.5A3.5 3.5 0 0 0 8 1Zm-2 6V4.5a2 2 0 1 1 4 0V7H6Z" />
    </svg>
  );
}
function PaperclipIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.5 6v11.5a4 4 0 1 1-8 0V5a2.5 2.5 0 1 1 5 0v10.5a1 1 0 1 1-2 0V6h-1.5v9.5a2.5 2.5 0 1 0 5 0V5a4 4 0 1 0-8 0v12.5a5.5 5.5 0 1 0 11 0V6Z" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-dim)" aria-hidden>
      <path d="M12 3v12.59l-4.3-4.3-1.4 1.42L12 19.41l5.7-5.7-1.4-1.42-4.3 4.3V3ZM5 20h14v2H5Z" />
    </svg>
  );
}
function FileIcon({ type }: { type: "pdf" | "zip" | "doc" }) {
  const colors = {
    pdf: "#ff6b6b",
    zip: "#fbbf24",
    doc: "#60a5fa",
  };
  return (
    <div
      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-[9px] font-extrabold uppercase"
      style={{
        background: `${colors[type]}1f`,
        color: colors[type],
      }}
    >
      {type}
    </div>
  );
}
