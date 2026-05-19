"use client";

import Link from "next/link";
import { CATEGORIES, SERIES, type CategoryId } from "../lib/seriesData";
import ContinueRow from "./ContinueRow";
import HeroBanner from "./HeroBanner";
import SeriesCard from "./SeriesCard";

/**
 * Premium home — Netflix × TikTok × Masterclass mashup. Order:
 *   1. Cinematic auto-rotating hero
 *   2. Quick category rail (links into /series)
 *   3. Tiếp tục xem (continue strip)
 *   4. Tuyển chọn cao cấp (featured carousel, autoplay videos)
 *   5. Hot · Đang trending (tall accent cards)
 *   6. Mới phát hành (poster strip)
 *   7. Học theo lĩnh vực (landscape cards)
 *   8. Mở Reel CTA banner
 */
export default function PremiumHome() {
  const featured = SERIES.filter((s) => s.featured);
  const newReleases = SERIES.filter((s) => s.newRelease);
  const continueCount = SERIES.filter((s) => s.progress > 0 && s.progress < 1).length;
  const trending = [...SERIES]
    .sort((a, b) => b.studentCount - a.studentCount)
    .slice(0, 5);

  return (
    <div className="route-cinematic h-full w-full overflow-y-auto pb-32">
      <HeroBanner picks={featured} />

      {/* Quick categories */}
      <section className="section-rise mt-2">
        <div className="row-snap no-scrollbar fade-edges flex gap-2 overflow-x-auto px-4 pb-1 pt-3">
          {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
            <CategoryPill key={c.id} id={c.id} label={c.label} />
          ))}
        </div>
      </section>

      {/* Continue watching */}
      {continueCount > 0 && (
        <section className="section-rise mt-6">
          <SectionHead
            eyebrow="Tiếp tục hành trình"
            title="Đang xem dở"
            href="/continue"
            count={continueCount}
          />
          <ContinueRow />
        </section>
      )}

      {/* Featured: tuyển chọn cao cấp */}
      <section className="section-rise mt-6">
        <SectionHead
          eyebrow="Tuyển chọn cao cấp"
          title="Series tinh hoa"
          subtitle="Được biên tập bởi RHM Play"
          href="/series"
        />
        <div className="row-snap no-scrollbar fade-edges flex gap-4 overflow-x-auto px-4 pb-2 pt-3">
          {featured.map((s, i) => (
            <SeriesCard
              key={s.id}
              series={s}
              variant="featured"
              eagerPreview={i === 0}
            />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="section-rise mt-7">
        <SectionHead
          eyebrow="Cộng đồng đang xem"
          title="Hot tuần này"
          href="/series"
        />
        <div className="row-snap no-scrollbar fade-edges flex gap-3 overflow-x-auto px-4 pb-2 pt-3">
          {trending.map((s, i) => (
            <div key={s.id} className="relative flex-shrink-0">
              {/* Big rank numeral behind the card (Netflix Top-10 style). */}
              <span
                aria-hidden
                className="font-display pointer-events-none absolute -bottom-3 -left-2 select-none text-[120px] font-black leading-none"
                style={{
                  color: "transparent",
                  WebkitTextStroke: `2px ${s.accent}55`,
                  textShadow: `0 0 24px ${s.accent}33`,
                  zIndex: 0,
                }}
              >
                {i + 1}
              </span>
              <div className="relative z-10 pl-7">
                <SeriesCard series={s} variant="tall" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New releases */}
      {newReleases.length > 0 && (
        <section className="section-rise mt-7">
          <SectionHead
            eyebrow="Cập nhật tuần này"
            title="Mới phát hành"
            href="/series"
          />
          <div className="row-snap no-scrollbar fade-edges flex gap-3 overflow-x-auto px-4 pb-2 pt-3">
            {newReleases.map((s) => (
              <SeriesCard key={s.id} series={s} variant="poster" badge="MỚI" />
            ))}
          </div>
        </section>
      )}

      {/* By category, landscape style */}
      <section className="section-rise mt-7">
        <SectionHead
          eyebrow="Học theo lĩnh vực"
          title="Toàn bộ thư viện"
          href="/series"
          count={SERIES.length}
        />
        <div className="mt-3 space-y-3 px-4">
          {SERIES.map((s) => (
            <SeriesCard key={s.id} series={s} variant="landscape" />
          ))}
        </div>
      </section>

      {/* Reel CTA */}
      <section className="section-rise mt-8 px-4">
        <Link
          href="/feed"
          className="lift-fx press-fx relative block overflow-hidden rounded-3xl p-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(31,182,168,0.18) 0%, rgba(31,182,168,0.02) 60%, rgba(192,132,252,0.18) 100%)",
            border: "1px solid rgba(31,182,168,0.3)",
            boxShadow: "0 24px 50px -22px rgba(31,182,168,0.4)",
          }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(31,182,168,0.45) 0%, transparent 65%)",
            }}
            aria-hidden
          />
          <div className="relative flex items-center gap-4">
            <div
              className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, #1fb6a8 0%, #14a094 100%)",
                color: "#001815",
                boxShadow: "0 0 26px rgba(31,182,168,0.55)",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--brand)" }}
              >
                Reel · TikTok style
              </p>
              <p className="font-display mt-0.5 text-[18px] font-black leading-tight text-white">
                Lướt 60s · học 1 ca lâm sàng
              </p>
              <p className="mt-0.5 text-[12px] text-text-dim">
                Vuốt dọc · âm thanh tuỳ chọn · cập nhật mỗi ngày
              </p>
            </div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </div>
        </Link>
      </section>

      <p className="mt-8 px-6 text-center text-[10px] text-text-faint">
        RHM Play · v0.1.0 · Cinematic edition
      </p>
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  subtitle,
  href,
  count,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  href?: string;
  count?: number;
}) {
  return (
    <div className="px-4">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          {eyebrow && (
            <p
              className="text-[10px] font-bold uppercase tracking-[0.24em]"
              style={{ color: "var(--brand)" }}
            >
              {eyebrow}
            </p>
          )}
          <h2 className="font-display mt-0.5 text-[22px] font-black tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-[11.5px] text-text-dim">{subtitle}</p>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className="press-fx flex items-center gap-0.5 rounded-full px-2.5 py-1 text-[11px] font-bold text-text-dim"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {count !== undefined ? `Xem ${count}` : "Xem tất cả"}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </Link>
        )}
      </div>
      <div className="title-rule mt-2 w-12" />
    </div>
  );
}

function CategoryPill({ id, label }: { id: CategoryId; label: string }) {
  return (
    <Link
      href={`/series?cat=${id}`}
      className="press-fx flex-shrink-0 rounded-full px-3.5 py-2 text-[12.5px] font-semibold transition-all"
      style={{
        background: "rgba(255,255,255,0.05)",
        color: "var(--text-dim)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {label}
    </Link>
  );
}
