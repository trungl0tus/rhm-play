"use client";

import Link from "next/link";
import { useState } from "react";
import { SERIES, fmtDuration } from "../lib/seriesData";

type Tab = "history" | "saved" | "certs";

const TABS: Array<{ id: Tab; label: string; icon: React.ReactNode }> = [
  { id: "history", label: "Đã xem", icon: <HistoryIcon /> },
  { id: "saved", label: "Đã lưu", icon: <BookmarkIcon /> },
  { id: "certs", label: "Chứng chỉ", icon: <CertIcon /> },
];

// Mock history: first 5 watched episodes from across series.
const HISTORY = SERIES.flatMap((s) =>
  s.episodes
    .filter((e) => e.watched)
    .map((e) => ({
      seriesId: s.id,
      seriesTitle: s.title,
      accent: s.accent,
      doctor: s.doctor.name,
      episode: e,
      watchedAgo: "2 ngày trước",
    })),
).slice(0, 5);

// Mock saved
const SAVED = SERIES.slice(0, 3).map((s) => ({
  seriesId: s.id,
  title: s.episodes[Math.min(2, s.episodes.length - 1)].title,
  seriesTitle: s.title,
  accent: s.accent,
  duration: s.episodes[0].durationSec,
}));

// Mock certificates
const CERTS = [
  {
    id: "cert-001",
    series: "Implant Basics",
    issuedAt: "12/2024",
    instructor: "BS. Nguyễn Văn An",
    accent: "#1fb6a8",
    hours: 8,
  },
];

export default function ProfileView() {
  const [tab, setTab] = useState<Tab>("history");

  return (
    <div className="pb-28">
      {/* Hero gradient backdrop */}
      <div
        className="absolute inset-x-0 top-0 h-56"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(31,182,168,0.25) 0%, transparent 60%), linear-gradient(180deg, #0a1626 0%, var(--bg) 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative px-4 pt-6">
        {/* Top bar */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-text-dim">
            Hồ sơ
          </p>
          <button
            type="button"
            aria-label="Cài đặt"
            className="press-fx tap-target glass-card flex items-center justify-center rounded-full"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d="M19.43 12.98c.04-.32.07-.65.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1a7.03 7.03 0 0 0-1.69-.98l-.38-2.65A.5.5 0 0 0 14 2h-4a.5.5 0 0 0-.49.42L9.13 5.07c-.61.25-1.18.58-1.69.98l-2.49-1a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .12.64L4.57 11c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46c.14.24.43.34.69.22l2.49-1c.51.4 1.08.73 1.69.98l.38 2.65c.05.24.26.42.49.42h4c.23 0 .44-.18.49-.42l.38-2.65c.61-.25 1.18-.58 1.69-.98l2.49 1c.26.12.55.02.69-.22l2-3.46a.5.5 0 0 0-.12-.64ZM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
            </svg>
          </button>
        </div>

        {/* Profile card */}
        <div className="glass-card flex items-center gap-4 rounded-3xl p-4">
          <div
            className="neon-teal flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-xl font-extrabold"
            style={{
              background: "linear-gradient(135deg, #1fb6a8 0%, #14a094 100%)",
              color: "#001815",
            }}
          >
            BS
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-extrabold leading-tight">BS. Khách</p>
            <p className="mt-0.5 text-xs text-text-dim">
              member.id · rhmplay.local
            </p>
            <div className="mt-1.5 flex items-center gap-2 text-[11px]">
              <span
                className="rounded-full px-2 py-0.5 font-bold"
                style={{
                  background: "rgba(31,182,168,0.16)",
                  color: "var(--brand)",
                }}
              >
                Cấp độ 3
              </span>
              <span className="text-text-faint">·</span>
              <span className="text-text-dim">{HISTORY.length} bài đã xem</span>
            </div>
          </div>
        </div>

        {/* Subscription status */}
        <SubscriptionCard />

        {/* Quick stats */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <StatTile value="6h" label="Thời gian học" accent="#1fb6a8" />
          <StatTile value={String(HISTORY.length)} label="Bài đã xem" accent="#c084fc" />
          <StatTile value={String(CERTS.length)} label="Chứng chỉ" accent="#f5b945" />
        </div>

        {/* Tab switcher */}
        <div
          className="mt-6 flex gap-1 rounded-full p-1"
          style={{ background: "var(--bg-elev)" }}
        >
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className="press-fx flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[12px] font-bold transition-all"
                style={{
                  background: active ? "var(--brand)" : "transparent",
                  color: active ? "#001815" : "var(--text-dim)",
                  boxShadow: active
                    ? "0 0 16px rgba(31,182,168,0.4)"
                    : "none",
                }}
              >
                {t.icon}
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="mt-4">
          {tab === "history" && <HistoryList />}
          {tab === "saved" && <SavedList />}
          {tab === "certs" && <CertList />}
        </div>

        {/* Footer menu */}
        <div className="mt-8 space-y-2">
          <MenuRow
            icon={<HelpIcon />}
            title="Trợ giúp & Liên hệ"
            subtitle="FAQ · Hỗ trợ qua Telegram"
          />
          <MenuRow
            icon={<ShareIcon />}
            title="Mời bạn bè"
            subtitle="Nhận 1 tháng Premium cho mỗi lời mời"
          />
          <MenuRow
            icon={<DocIcon />}
            title="Điều khoản & Bảo mật"
          />
        </div>

        <p className="mt-6 text-center text-[10px] text-text-faint">
          RHM Play · v0.1.0 · Made for Vietnamese dentists 🦷
        </p>
      </div>
    </div>
  );
}

function SubscriptionCard() {
  return (
    <Link
      href="/premium"
      className="press-fx neon-amber relative mt-4 block overflow-hidden rounded-3xl p-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(245,185,69,0.18) 0%, rgba(245,185,69,0.04) 100%)",
        border: "1px solid rgba(245,185,69,0.4)",
      }}
    >
      {/* Decorative crown */}
      <div
        className="absolute -right-6 -top-6 h-32 w-32 opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(245,185,69,0.55) 0%, transparent 70%)",
        }}
      />
      <div className="relative flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--premium)" }}>
            Gói hiện tại
          </p>
          <p className="mt-1 text-base font-extrabold text-text">Miễn phí</p>
          <p className="mt-0.5 text-[12px] text-text-dim">
            Nâng cấp Premium để mở khoá toàn bộ
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className="rounded-full px-3 py-1.5 text-xs font-extrabold"
            style={{
              background: "linear-gradient(135deg, #fde68a, #f5b945)",
              color: "#2a1900",
            }}
          >
            Nâng cấp →
          </span>
          <span className="text-[10px] text-text-faint">từ 124.000₫/tháng</span>
        </div>
      </div>
    </Link>
  );
}

function StatTile({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: string;
}) {
  return (
    <div
      className="glass-card rounded-2xl p-3 text-center"
    >
      <div
        className="text-2xl font-extrabold"
        style={{ color: accent, textShadow: `0 0 12px ${accent}66` }}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-text-dim">
        {label}
      </div>
    </div>
  );
}

function HistoryList() {
  if (HISTORY.length === 0) return <EmptyTab text="Chưa có lịch sử xem" />;
  return (
    <ul className="space-y-2">
      {HISTORY.map((h, i) => (
        <li key={i}>
          <Link
            href={`/series/${h.seriesId}`}
            className="press-fx flex items-center gap-3 rounded-2xl border p-3"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl font-bold"
              style={{
                background: `${h.accent}22`,
                color: h.accent,
              }}
            >
              {h.episode.order}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold">
                {h.episode.title}
              </p>
              <p className="truncate text-[11px] text-text-dim">
                {h.seriesTitle} · {h.doctor}
              </p>
              <p className="mt-0.5 text-[10px] text-text-faint">
                {fmtDuration(h.episode.durationSec)} · {h.watchedAgo}
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-faint)" aria-hidden>
              <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SavedList() {
  if (SAVED.length === 0) return <EmptyTab text="Chưa lưu bài học nào" />;
  return (
    <ul className="space-y-2">
      {SAVED.map((s, i) => (
        <li key={i}>
          <Link
            href={`/series/${s.seriesId}`}
            className="press-fx flex items-center gap-3 rounded-2xl border p-3"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
              style={{
                background: `${s.accent}22`,
                color: s.accent,
              }}
            >
              <BookmarkIcon />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold">{s.title}</p>
              <p className="truncate text-[11px] text-text-dim">
                {s.seriesTitle}
              </p>
              <p className="mt-0.5 text-[10px] text-text-faint">
                {fmtDuration(s.duration)}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function CertList() {
  if (CERTS.length === 0) {
    return (
      <div
        className="rounded-2xl border p-6 text-center"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        <div className="text-3xl">🏅</div>
        <p className="mt-2 text-sm font-semibold">Chưa có chứng chỉ</p>
        <p className="mt-1 text-[11px] text-text-dim">
          Hoàn thành 1 series Premium để nhận chứng chỉ điện tử có chữ ký giảng viên.
        </p>
      </div>
    );
  }
  return (
    <ul className="space-y-3">
      {CERTS.map((c) => (
        <li
          key={c.id}
          className="neon-amber relative overflow-hidden rounded-2xl p-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,185,69,0.14) 0%, rgba(245,185,69,0.02) 100%)",
            border: "1px solid rgba(245,185,69,0.3)",
          }}
        >
          {/* Decorative seal */}
          <div
            className="absolute -right-4 -top-4 h-24 w-24 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(245,185,69,0.3) 0%, transparent 70%)",
            }}
          />
          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "var(--premium)" }}
              >
                Chứng chỉ hoàn thành
              </p>
              <p className="mt-1 text-base font-extrabold">{c.series}</p>
              <p className="mt-1 text-xs text-text-dim">Giảng viên: {c.instructor}</p>
              <p className="mt-0.5 text-xs text-text-dim">
                Cấp ngày {c.issuedAt} · {c.hours}h CME
              </p>
            </div>
            <div
              className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
              style={{
                background: "linear-gradient(135deg, #fde68a, #f5b945)",
                color: "#3a2400",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="m12 15.4 3.7 2.3-1-4.2 3.3-2.8-4.3-.4L12 6l-1.7 4.3-4.3.4 3.3 2.8-1 4.2z" />
              </svg>
            </div>
          </div>
          <div className="relative mt-3 flex items-center gap-2">
            <button
              type="button"
              className="press-fx flex-1 rounded-xl py-2 text-xs font-bold"
              style={{
                background: "rgba(245,185,69,0.18)",
                color: "var(--premium)",
              }}
            >
              Tải PDF
            </button>
            <button
              type="button"
              className="press-fx flex-1 rounded-xl py-2 text-xs font-bold"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "var(--text)",
              }}
            >
              Chia sẻ
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function EmptyTab({ text }: { text: string }) {
  return (
    <div
      className="rounded-2xl border p-8 text-center"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <p className="text-sm text-text-dim">{text}</p>
    </div>
  );
}

function MenuRow({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <button
      type="button"
      className="press-fx flex w-full items-center gap-3 rounded-2xl border p-3 text-left"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
        style={{
          background: "rgba(255,255,255,0.06)",
          color: "var(--text-dim)",
        }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold">{title}</p>
        {subtitle && (
          <p className="text-[11px] text-text-dim">{subtitle}</p>
        )}
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-faint)" aria-hidden>
        <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
      </svg>
    </button>
  );
}

function HistoryIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7Zm-1 4v6l5 3 1-1.5-4.5-2.7V7Z" />
    </svg>
  );
}
function BookmarkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" />
    </svg>
  );
}
function CertIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="m12 15.4 3.7 2.3-1-4.2 3.3-2.8-4.3-.4L12 6l-1.7 4.3-4.3.4 3.3 2.8-1 4.2z" />
    </svg>
  );
}
function HelpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 17h-2v-2h2Zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41a2 2 0 1 0-4 0H8a4 4 0 1 1 7.07 2.25Z" />
    </svg>
  );
}
function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 16.08a3 3 0 0 0-2.4 1.2L8.91 13.6a3 3 0 0 0 0-3.2l6.69-3.68A3 3 0 1 0 14.5 5l-6.93 3.81a3 3 0 1 0 0 6.38L14.5 19a3 3 0 1 0 3.5-2.92Z" />
    </svg>
  );
}
function DocIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm2 18H6V4h7v5h5Z" />
    </svg>
  );
}
