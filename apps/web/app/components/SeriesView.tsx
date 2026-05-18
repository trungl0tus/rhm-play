"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CATEGORIES,
  SERIES,
  fmtCount,
  fmtDuration,
  type CategoryId,
  type SeriesEntry,
} from "../lib/seriesData";
import CinematicPoster from "./CinematicPoster";

export default function SeriesView() {
  const [category, setCategory] = useState<CategoryId>("all");

  const filtered = useMemo(
    () => (category === "all" ? SERIES : SERIES.filter((s) => s.category === category)),
    [category],
  );

  const featured = SERIES.filter((s) => s.featured);
  const newReleases = SERIES.filter((s) => s.newRelease);
  const continueList = SERIES.filter((s) => s.progress > 0 && s.progress < 1);

  return (
    <div className="pb-28">
      {/* Hero header */}
      <header className="px-4 pt-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-text-dim">
              Học liệu chuyên sâu
            </p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
              Khám phá <span style={{ color: "var(--brand)" }}>Series</span>
            </h1>
          </div>
          <button
            type="button"
            aria-label="Tìm kiếm"
            className="press-fx tap-target glass-card flex items-center justify-center rounded-full"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d="M21 20l-5.6-5.6A8 8 0 1 0 14 16.4L20 21Zm-11-2a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Category pills */}
      <div className="row-snap no-scrollbar mt-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {CATEGORIES.map((cat) => {
          const active = cat.id === category;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className="press-fx flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all"
              style={{
                background: active
                  ? "var(--brand)"
                  : "rgba(255,255,255,0.05)",
                color: active ? "#001815" : "var(--text-dim)",
                border: active
                  ? `1px solid var(--brand)`
                  : `1px solid var(--border)`,
                boxShadow: active
                  ? "0 0 16px rgba(31,182,168,0.5)"
                  : "none",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Featured carousel (only on "all" view) */}
      {category === "all" && featured.length > 0 && (
        <section className="mt-6">
          <SectionTitle title="Nổi bật" subtitle="Series được nhiều BS theo dõi" />
          <div className="row-snap no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2 pt-3">
            {featured.map((s) => (
              <FeaturedCard key={s.id} series={s} />
            ))}
          </div>
        </section>
      )}

      {/* Continue watching (only on "all" view) */}
      {category === "all" && continueList.length > 0 && (
        <section className="mt-6">
          <SectionTitle title="Tiếp tục xem" />
          <div className="row-snap no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2 pt-3">
            {continueList.map((s) => (
              <ContinueCard key={s.id} series={s} />
            ))}
          </div>
        </section>
      )}

      {/* New releases (only on "all" view) */}
      {category === "all" && newReleases.length > 0 && (
        <section className="mt-6">
          <SectionTitle title="Mới phát hành" subtitle="Cập nhật tuần này" />
          <div className="row-snap no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2 pt-3">
            {newReleases.map((s) => (
              <CompactCard key={s.id} series={s} badge="MỚI" />
            ))}
          </div>
        </section>
      )}

      {/* Main grid */}
      <section className="mt-6">
        <SectionTitle
          title={category === "all" ? "Toàn bộ series" : "Kết quả lọc"}
          subtitle={`${filtered.length} series`}
        />
        <div className="mt-3 space-y-3 px-4">
          {filtered.map((s) => (
            <FullCard key={s.id} series={s} />
          ))}
          {filtered.length === 0 && (
            <div className="rounded-2xl border p-8 text-center"
              style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
            >
              <p className="text-sm text-text-dim">
                Chưa có series cho danh mục này.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="px-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[18px] font-bold tracking-tight">{title}</h2>
        {subtitle && (
          <span className="text-[11px] text-text-faint">{subtitle}</span>
        )}
      </div>
      <div className="accent-rule mt-1.5" />
    </div>
  );
}

function FeaturedCard({ series }: { series: SeriesEntry }) {
  const free = series.episodes.filter((e) => e.isFree).length;
  return (
    <Link
      href={`/series/${series.id}`}
      className="press-fx relative block w-[280px] flex-shrink-0 overflow-hidden rounded-3xl"
      style={{
        boxShadow: `0 20px 50px -16px ${series.accent}55, 0 0 0 1px ${series.accent}26 inset`,
      }}
    >
      <div className="aspect-[4/5] w-full">
        <CinematicPoster
          procedure={series.procedure}
          accent={series.accent}
          caption={series.title}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-3/4"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(5,11,20,0.95) 80%)",
          }}
        />
        <div
          className="absolute inset-y-0 left-0 w-1"
          style={{
            background: `linear-gradient(180deg, ${series.accent}, transparent)`,
            boxShadow: `0 0 16px ${series.accent}`,
          }}
        />

        {series.newRelease && (
          <span
            className="neon-amber absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-extrabold tracking-wider"
            style={{
              background: "linear-gradient(135deg, #fde68a, #f5b945)",
              color: "#2a1900",
            }}
          >
            MỚI
          </span>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p
          className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] neon-text"
          style={{ color: series.accent }}
        >
          {series.subtitle}
        </p>
        <h3 className="text-lg font-extrabold leading-tight text-white">
          {series.title}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-[11px] text-white/80">
          <span className="flex items-center gap-1">
            ★ {series.rating}
          </span>
          <span>·</span>
          <span>{fmtCount(series.studentCount)} hv</span>
          <span>·</span>
          <span>{series.episodes.length} tập</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold"
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "white",
            }}
          >
            {free} miễn phí
          </span>
          <span
            className="text-[12px] font-bold"
            style={{ color: series.accent }}
          >
            Xem ngay →
          </span>
        </div>
      </div>
    </Link>
  );
}

function ContinueCard({ series }: { series: SeriesEntry }) {
  const watched = series.episodes.filter((e) => e.watched).length;
  return (
    <Link
      href={`/series/${series.id}`}
      className="press-fx relative block w-[200px] flex-shrink-0 overflow-hidden rounded-2xl border"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="relative aspect-video w-full">
        <CinematicPoster
          procedure={series.procedure}
          accent={series.accent}
          caption={series.title}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Progress bar at bottom of thumbnail (Netflix-style) */}
        <div
          className="absolute inset-x-0 bottom-0 h-1"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <div
            className="h-full"
            style={{
              width: `${series.progress * 100}%`,
              background: series.accent,
              boxShadow: `0 0 8px ${series.accent}`,
            }}
          />
        </div>
      </div>
      <div className="p-3">
        <p className="line-clamp-1 text-[13px] font-bold">{series.title}</p>
        <p className="mt-0.5 text-[11px] text-text-dim">
          Tập {watched + 1} / {series.episodes.length}
        </p>
      </div>
    </Link>
  );
}

function CompactCard({
  series,
  badge,
}: {
  series: SeriesEntry;
  badge?: string;
}) {
  return (
    <Link
      href={`/series/${series.id}`}
      className="press-fx relative block w-[160px] flex-shrink-0 overflow-hidden rounded-2xl"
      style={{
        boxShadow: `0 12px 30px -12px ${series.accent}44`,
      }}
    >
      <div className="relative aspect-[2/3] w-full">
        <CinematicPoster
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
        />
        {badge && (
          <span
            className="absolute left-2 top-2 rounded px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider"
            style={{
              background: series.accent,
              color: "#001815",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="line-clamp-2 text-[13px] font-bold leading-tight text-white">
          {series.title}
        </h3>
        <p className="mt-0.5 text-[10px] text-white/70">
          {series.episodes.length} tập · ★ {series.rating}
        </p>
      </div>
    </Link>
  );
}

function FullCard({ series }: { series: SeriesEntry }) {
  const totalEp = series.episodes.length;
  const watchedEp = series.episodes.filter((e) => e.watched).length;
  const freeEp = series.episodes.filter((e) => e.isFree).length;
  const totalDuration = series.episodes.reduce(
    (acc, e) => acc + e.durationSec,
    0,
  );

  return (
    <Link
      href={`/series/${series.id}`}
      className="press-fx group glass-card relative block overflow-hidden rounded-3xl"
      style={{
        boxShadow: `0 20px 40px -20px ${series.accent}33, 0 0 0 1px ${series.accent}1a inset`,
      }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <CinematicPoster
          procedure={series.procedure}
          accent={series.accent}
          caption={series.title}
        />
        <div
          className="absolute inset-y-0 left-0 w-1"
          style={{ background: series.accent }}
        />
        <div className="absolute right-3 top-3 flex items-center gap-2">
          {freeEp < totalEp && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-bold backdrop-blur-md"
              style={{
                background: "rgba(245,185,69,0.18)",
                color: "var(--premium)",
                border: "1px solid rgba(245,185,69,0.4)",
              }}
            >
              PREMIUM
            </span>
          )}
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-bold backdrop-blur-md"
            style={{
              background: "rgba(0,0,0,0.55)",
              color: "white",
              border: `1px solid ${series.accent}66`,
            }}
          >
            {totalEp} tập
          </span>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div
            className="h-9 w-9 rounded-full p-[2px]"
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
          <div className="flex flex-col text-white drop-shadow-md">
            <span className="text-[11px] font-semibold leading-tight">
              {series.doctor.name}
            </span>
            <span className="text-[10px] leading-tight text-white/70">
              ★ {series.rating} · {fmtCount(series.studentCount)} hv
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-[17px] font-bold leading-tight">
            {series.title}
          </h3>
          <p
            className="mt-0.5 text-[12px] font-medium"
            style={{ color: series.accent }}
          >
            {series.subtitle}
          </p>
          <p className="mt-1.5 line-clamp-2 text-[13px] text-text-dim">
            {series.description}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-text-dim">
              {watchedEp > 0 ? (
                <>
                  Đã xem{" "}
                  <span className="font-semibold text-text">
                    {watchedEp}/{totalEp}
                  </span>{" "}
                  · {Math.round(totalDuration / 60)} phút
                </>
              ) : (
                <span>{Math.round(totalDuration / 60)} phút · {fmtDuration(totalDuration / totalEp)} TB/tập</span>
              )}
            </span>
            <span className="font-semibold" style={{ color: series.accent }}>
              {Math.round(series.progress * 100)}%
            </span>
          </div>
          <div
            className="mt-1.5 h-1.5 overflow-hidden rounded-full"
            style={{ background: "var(--bg-elev)" }}
          >
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{
                width: `${Math.max(series.progress * 100, watchedEp > 0 ? 3 : 0)}%`,
                background: `linear-gradient(90deg, ${series.accent}, ${series.accent}cc)`,
                boxShadow: `0 0 12px ${series.accent}80`,
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-text-faint">
            {freeEp} miễn phí · {totalEp - freeEp} premium
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-bold"
            style={{
              background: series.accent,
              color: "#001815",
            }}
          >
            {watchedEp > 0 ? "Xem tiếp" : "Bắt đầu"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
