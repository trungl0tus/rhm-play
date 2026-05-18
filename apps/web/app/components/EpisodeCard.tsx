"use client";

import LockBadge from "./LockBadge";
import Thumbnail from "./Thumbnail";

type Props = {
  title: string;
  subtitle?: string;
  thumbnail: string | null;
  isFree: boolean;
  order?: number;
  progress?: number;
  onClick?: () => void;
};

export default function EpisodeCard({
  title,
  subtitle,
  thumbnail,
  isFree,
  order,
  progress,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="press-fx group flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="relative h-20 w-28 flex-shrink-0">
        <Thumbnail src={thumbnail} alt={title} className="h-full w-full" />
        {!isFree && (
          <div className="absolute inset-0 flex items-end justify-end rounded-2xl bg-black/50 p-1.5">
            <span
              className="rounded-full p-1.5"
              style={{ background: "var(--premium-soft)" }}
            >
              <LockIcon />
            </span>
          </div>
        )}
        {typeof progress === "number" && progress > 0 && progress < 1 && (
          <div
            aria-hidden
            className="absolute inset-x-1.5 bottom-1.5 h-1 overflow-hidden rounded-full bg-black/40"
          >
            <div
              className="h-full"
              style={{
                width: `${Math.round(progress * 100)}%`,
                background: "var(--brand)",
              }}
            />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 py-1">
        <div className="flex items-center gap-2">
          {typeof order === "number" && (
            <span className="text-xs text-text-faint">Tập {order}</span>
          )}
          {!isFree && <LockBadge />}
        </div>
        <p className="mt-0.5 truncate text-[15px] font-semibold text-text">
          {title}
        </p>
        {subtitle && (
          <p className="mt-0.5 line-clamp-2 text-xs text-text-dim">{subtitle}</p>
        )}
      </div>
    </button>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden style={{ color: "var(--premium)" }}>
      <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-.5V4.5A3.5 3.5 0 0 0 8 1Zm-2 6V4.5a2 2 0 1 1 4 0V7H6Z" />
    </svg>
  );
}
