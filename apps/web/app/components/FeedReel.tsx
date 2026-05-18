"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { MOCK_FEED, formatCount, type MockEpisode } from "../lib/mockFeed";
import CinematicPoster from "./CinematicPoster";

export default function FeedReel() {
  const [episodes] = useState<MockEpisode[]>(MOCK_FEED);
  const [activeIdx, setActiveIdx] = useState(0);
  const [muted, setMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  // IntersectionObserver: play the centered video, pause others.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = Number(
            (entry.target as HTMLElement).dataset.idx ?? "-1",
          );
          if (idx < 0) continue;
          const video = videoRefs.current[idx];
          if (!video) continue;

          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setActiveIdx(idx);
            video.muted = muted;
            const playPromise = video.play();
            if (playPromise) playPromise.catch(() => undefined);
          } else {
            video.pause();
            video.currentTime = 0;
          }
        }
      },
      { root: container, threshold: [0, 0.6, 0.95] },
    );

    itemRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [episodes.length, muted]);

  // Toggle mute on all videos at once (TikTok-style global mute).
  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      videoRefs.current.forEach((v) => {
        if (v) v.muted = next;
      });
      return next;
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="snap-feed no-scrollbar relative h-full w-full overflow-y-auto bg-black"
    >
      {episodes.map((ep, idx) => (
        <ReelItem
          key={ep.id}
          ref={(node) => {
            itemRefs.current[idx] = node;
          }}
          videoRef={(node) => {
            videoRefs.current[idx] = node;
          }}
          idx={idx}
          episode={ep}
          active={idx === activeIdx}
          muted={muted}
          onToggleMute={toggleMute}
        />
      ))}
    </div>
  );
}

type ReelItemProps = {
  idx: number;
  episode: MockEpisode;
  active: boolean;
  muted: boolean;
  onToggleMute: () => void;
  ref: React.Ref<HTMLDivElement>;
  videoRef: React.Ref<HTMLVideoElement>;
};

function ReelItem({
  idx,
  episode,
  active,
  muted,
  onToggleMute,
  ref,
  videoRef,
}: ReelItemProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [heartPop, setHeartPop] = useState(0);
  const [showMuteIndicator, setShowMuteIndicator] = useState(false);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const lastTapRef = useRef(0);

  // Cycle subtitle captions while this reel is the active one.
  useEffect(() => {
    if (!active || paused || loading) return;
    const id = setInterval(
      () => setSubtitleIdx((i) => (i + 1) % episode.subtitles.length),
      3500,
    );
    return () => clearInterval(id);
  }, [active, paused, loading, episode.subtitles.length]);

  const handleVideoTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 280) {
      // double tap → like + heart pop
      setLiked(true);
      setHeartPop((n) => n + 1);
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;
    // single tap → pause/play toggle
    setTimeout(() => {
      if (Date.now() - lastTapRef.current >= 280 && lastTapRef.current !== 0) {
        const v = localVideoRef.current;
        if (!v) return;
        if (v.paused) {
          v.play().catch(() => undefined);
          setPaused(false);
        } else {
          v.pause();
          setPaused(true);
        }
      }
    }, 290);
  };

  const handleMuteTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleMute();
    setShowMuteIndicator(true);
    setTimeout(() => setShowMuteIndicator(false), 900);
  };

  return (
    <div
      ref={ref}
      data-idx={idx}
      className="relative h-full w-full"
      style={{ height: "100%" }}
    >
      {/* Cinematic poster — paints instantly, hides the "black flash" before
          the video has buffered enough data. The <video> below sits on top
          with object-cover, so once it starts playing the poster is covered. */}
      <CinematicPoster
        procedure={episode.procedure}
        accent={episode.series.accent}
        caption={episode.title}
      />

      {/* Background video */}
      <video
        ref={(node) => {
          localVideoRef.current = node;
          if (typeof videoRef === "function") videoRef(node);
          else if (videoRef && "current" in videoRef)
            (videoRef as React.RefObject<HTMLVideoElement | null>).current = node;
        }}
        src={episode.videoUrl}
        muted={muted}
        playsInline
        loop
        preload={Math.abs(idx) <= 2 ? "auto" : "metadata"}
        onLoadedData={() => setLoading(false)}
        onWaiting={() => setLoading(true)}
        onPlaying={() => setLoading(false)}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ opacity: loading ? 0 : 1 }}
      />

      {/* Tap surface (everything except buttons) */}
      <button
        type="button"
        aria-label="Pause / phát"
        onClick={handleVideoTap}
        className="absolute inset-0 h-full w-full focus:outline-none"
      />

      {/* Subtle bottom gradient for legibility */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      {/* Loading state — shimmer-sweep over the cinematic poster + soft dot
          indicator at the bottom-center. We deliberately don't show a hard
          spinner since the poster itself acts as the meaningful loading state. */}
      {loading && (
        <>
          <div
            aria-hidden
            className="shimmer-sweep pointer-events-none absolute inset-0 overflow-hidden"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-[38%] flex justify-center">
            <div className="flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 backdrop-blur-md">
              <Dot delay={0} />
              <Dot delay={150} />
              <Dot delay={300} />
              <span className="ml-1 text-[11px] font-semibold text-white/85">
                Đang tải
              </span>
            </div>
          </div>
        </>
      )}

      {/* Pause overlay */}
      {paused && !loading && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-black/40 p-5 backdrop-blur-md">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Double-tap heart pop */}
      {heartPop > 0 && (
        <HeartBurst key={heartPop} />
      )}

      {/* Top chips: series + premium + mute */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4">
        <div className="pointer-events-auto flex items-center gap-2">
          <span
            className="rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md"
            style={{
              background: "rgba(0,0,0,0.5)",
              color: episode.series.accent,
              border: `1px solid ${episode.series.accent}66`,
            }}
          >
            #{episode.series.title}
          </span>
          {!episode.isFree && (
            <span
              className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide backdrop-blur-md"
              style={{
                background: "rgba(245,185,69,0.18)",
                color: "#f5b945",
                border: "1px solid rgba(245,185,69,0.4)",
              }}
            >
              <LockIcon size={11} /> Premium
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleMuteTap}
          aria-label={muted ? "Bật âm thanh" : "Tắt âm thanh"}
          className="pointer-events-auto tap-target press-fx flex items-center justify-center rounded-full backdrop-blur-md"
          style={{ background: "rgba(0,0,0,0.5)", color: "white" }}
        >
          {muted ? <MutedIcon /> : <UnmutedIcon />}
        </button>
      </div>

      {/* Big mute indicator */}
      {showMuteIndicator && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="rounded-2xl bg-black/55 px-6 py-4 backdrop-blur-md">
            <div className="flex items-center gap-2 text-white">
              {muted ? <MutedIcon /> : <UnmutedIcon />}
              <span className="text-sm font-semibold">
                {muted ? "Đã tắt tiếng" : "Đã bật tiếng"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Right rail: actions */}
      <div className="pointer-events-none absolute bottom-32 right-3 z-20 flex flex-col items-center gap-4">
        <ActionButton
          icon={
            <HeartIcon
              filled={liked}
              color={liked ? "#ff3b6b" : "white"}
            />
          }
          label={formatCount(episode.stats.likes + (liked ? 1 : 0))}
          onClick={() => setLiked((v) => !v)}
        />
        <ActionButton
          icon={<CommentIcon />}
          label={formatCount(episode.stats.comments)}
          onClick={() => undefined}
        />
        <ActionButton
          icon={<ShareIcon />}
          label={formatCount(episode.stats.shares)}
          onClick={() => undefined}
        />
        <ActionButton
          icon={<BookmarkIcon filled={saved} />}
          label="Lưu"
          onClick={() => setSaved((v) => !v)}
        />
      </div>

      {/* Bottom: subtitle + doctor + title + CTA */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-28">
        {/* Subtitle caption — cycles every 3.5s while playing */}
        <div className="pointer-events-none mb-3 flex justify-start">
          <span
            key={subtitleIdx}
            className="sheet-in inline-block max-w-[85%] rounded-xl px-3 py-1.5 text-[12px] font-medium leading-snug text-white"
            style={{
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              borderLeft: `2px solid ${episode.series.accent}`,
              textShadow: "0 1px 2px rgba(0,0,0,0.6)",
            }}
          >
            {episode.subtitles[subtitleIdx]}
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-3 pb-3">
          <DoctorAvatar src={episode.doctor.avatar} alt={episode.doctor.name} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold text-white">
              {episode.doctor.name}
            </p>
            <p className="truncate text-xs text-white/70">
              {episode.doctor.role}
            </p>
          </div>
          <button
            type="button"
            className="press-fx rounded-full px-4 py-1.5 text-xs font-bold"
            style={{
              background: "white",
              color: "#0a1626",
            }}
          >
            Theo dõi
          </button>
        </div>

        <div className="pointer-events-auto max-w-[80%]">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-white/70">
            Tập {episode.order} · {episode.durationSec}s
          </p>
          <h2 className="text-[19px] font-bold leading-snug text-white">
            {episode.title}
          </h2>
          <p className="mt-1.5 line-clamp-2 text-[13px] text-white/80">
            {episode.description}
          </p>
        </div>

        {!episode.isFree && (
          <div className="pointer-events-auto mt-3 max-w-[80%]">
            <Link
              href="/premium"
              className="press-fx tap-target flex w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold"
              style={{
                background:
                  "linear-gradient(135deg, #f5b945 0%, #f08a3e 100%)",
                color: "#3a2a00",
                boxShadow: "0 10px 30px -10px rgba(245,185,69,0.5)",
                padding: "12px 16px",
              }}
            >
              <LockIcon size={14} /> Mở khoá Premium để xem trọn tập
            </Link>
          </div>
        )}
      </div>

      {/* Active-state hint at top */}
      {active && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-2 z-30 h-0.5 rounded-full"
          style={{ background: episode.series.accent, opacity: 0.7 }}
        />
      )}
    </div>
  );
}

function DoctorAvatar({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className="relative h-12 w-12 flex-shrink-0 rounded-full p-[2px]"
      style={{ background: "linear-gradient(135deg, #1fb6a8, #60a5fa)" }}
    >
      <div className="h-full w-full overflow-hidden rounded-full bg-bg-card">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
            {alt.split(" ").slice(-1)[0]?.[0] ?? "?"}
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <span
        aria-hidden
        className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 text-[10px] font-bold"
        style={{
          background: "#1fb6a8",
          borderColor: "#050b14",
          color: "white",
        }}
      >
        +
      </span>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="pointer-events-auto press-fx flex flex-col items-center gap-1 text-white"
    >
      <span
        className="tap-target flex h-12 w-12 items-center justify-center rounded-full"
        style={{ background: "rgba(0,0,0,0.32)", backdropFilter: "blur(8px)" }}
      >
        {icon}
      </span>
      <span className="text-[11px] font-semibold drop-shadow-md">{label}</span>
    </button>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="block h-1.5 w-1.5 rounded-full bg-white"
      style={{
        animation: "loadingPulse 1.1s ease-in-out infinite",
        animationDelay: `${delay}ms`,
      }}
    />
  );
}

function HeartBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
      <svg
        width="140"
        height="140"
        viewBox="0 0 24 24"
        fill="#ff3b6b"
        aria-hidden
        style={{
          filter: "drop-shadow(0 0 24px rgba(255,59,107,0.65))",
          animation: "heartPop 700ms ease-out forwards",
        }}
      >
        <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9Z" />
      </svg>
      <style>{`@keyframes heartPop {
        0% { transform: scale(0.4); opacity: 0; }
        25% { transform: scale(1.25); opacity: 1; }
        70% { transform: scale(1); opacity: 1; }
        100% { transform: scale(1.2); opacity: 0; }
      }`}</style>
    </div>
  );
}

function HeartIcon({ filled, color }: { filled: boolean; color: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill={filled ? color : "none"}
      stroke={color}
      strokeWidth="2"
      aria-hidden
      style={{
        transition: "transform 180ms cubic-bezier(.34,1.56,.64,1)",
        transform: filled ? "scale(1.15)" : "scale(1)",
      }}
    >
      <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9Z" />
    </svg>
  );
}
function CommentIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1Zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1Z" />
    </svg>
  );
}
function ShareIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M18 16.08a3 3 0 0 0-2.4 1.2L8.91 13.6a3 3 0 0 0 0-3.2l6.69-3.68A3 3 0 1 0 14.5 5l-6.93 3.81a3 3 0 1 0 0 6.38L14.5 19a3 3 0 1 0 3.5-2.92Z" />
    </svg>
  );
}
function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill={filled ? "#1fb6a8" : "none"}
      stroke={filled ? "#1fb6a8" : "white"}
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" />
    </svg>
  );
}
function LockIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-.5V4.5A3.5 3.5 0 0 0 8 1Zm-2 6V4.5a2 2 0 1 1 4 0V7H6Z" />
    </svg>
  );
}
function MutedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.63 3.63a1 1 0 0 0 0 1.41L7.29 8.7 7 9H3v6h4l5 5V13.41l4.18 4.18a7 7 0 0 1-1.71 1A1 1 0 1 0 15.18 20a9 9 0 0 0 2.4-1.4l2.83 2.83a1 1 0 0 0 1.42-1.42l-17-17a1 1 0 0 0-1.4 0ZM19 12a7 7 0 0 1-.11 1.21l1.61 1.61A9 9 0 0 0 21 12a8.94 8.94 0 0 0-5-8 1 1 0 1 0-1 1.78A6.93 6.93 0 0 1 19 12ZM12 4a1 1 0 0 0-.6.2l-1.2.9 1.8 1.8V4Z" />
    </svg>
  );
}
function UnmutedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 9v6h4l5 5V4L7 9H3Zm13 3a4 4 0 0 0-2-3.46v6.93A4 4 0 0 0 16 12Zm-2-7v2a5 5 0 0 1 0 10v2a7 7 0 0 0 0-14Z" />
    </svg>
  );
}
