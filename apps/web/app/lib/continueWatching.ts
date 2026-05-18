import type { FeedEpisode } from "./api";

const KEY = "rhmplay:continue-watching";
const MAX_ITEMS = 12;

export type ContinueItem = {
  episodeId: string;
  seriesId: string;
  seriesTitle: string;
  episodeTitle: string;
  thumbnail: string | null;
  isFree: boolean;
  progress: number;
  updatedAt: number;
};

function safeRead(): ContinueItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ContinueItem[]) : [];
  } catch {
    return [];
  }
}

function safeWrite(items: ContinueItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* quota or privacy mode — silently ignore */
  }
}

export function listContinueWatching(): ContinueItem[] {
  return safeRead().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function recordWatch(episode: FeedEpisode, progress = 0) {
  const existing = safeRead().filter((i) => i.episodeId !== episode.id);
  const next: ContinueItem = {
    episodeId: episode.id,
    seriesId: episode.series.id,
    seriesTitle: episode.series.title,
    episodeTitle: episode.title,
    thumbnail: episode.series.thumbnail,
    isFree: episode.isFree,
    progress,
    updatedAt: Date.now(),
  };
  const trimmed = [next, ...existing].slice(0, MAX_ITEMS);
  safeWrite(trimmed);
}

export function clearContinueWatching() {
  safeWrite([]);
}
