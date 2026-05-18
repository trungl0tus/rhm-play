export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type SeriesRef = {
  id: string;
  title: string;
  thumbnail: string | null;
};

export type FeedEpisode = {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string;
  order: number;
  isFree: boolean;
  createdAt: string;
  series: SeriesRef;
};

export type FeedPage = {
  data: FeedEpisode[];
  nextCursor: string | null;
  hasNextPage: boolean;
};

export type SeriesSummary = {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  createdAt: string;
  _count: { episodes: number };
};

export type SeriesDetail = SeriesSummary & {
  episodes: Array<{
    id: string;
    title: string;
    description: string | null;
    order: number;
    isFree: boolean;
    videoUrl: string;
  }>;
};

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

const DEFAULT_TIMEOUT_MS = 8000;

type RequestOpts = RequestInit & { timeoutMs?: number };

async function request<T>(path: string, init?: RequestOpts): Promise<T> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, ...rest } = init ?? {};
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  const url = `${API_BASE}${path}`;
  const t0 = performance.now();
  try {
    console.log(`[api] → ${url}`);
    const res = await fetch(url, {
      ...rest,
      headers: { Accept: "application/json", ...rest.headers },
      signal: ac.signal,
    });
    const elapsed = Math.round(performance.now() - t0);
    if (!res.ok) {
      console.error(`[api] ✗ ${res.status} ${url} (${elapsed}ms)`);
      throw new ApiError(
        res.status,
        `${res.status} ${res.statusText} on ${path}`,
      );
    }
    console.log(`[api] ✓ ${res.status} ${url} (${elapsed}ms)`);
    return (await res.json()) as T;
  } catch (e) {
    const elapsed = Math.round(performance.now() - t0);
    if (e instanceof DOMException && e.name === "AbortError") {
      console.error(`[api] ⏱ timeout ${url} (${elapsed}ms / cap ${timeoutMs}ms)`);
      throw new ApiError(0, `Yêu cầu quá thời gian (${timeoutMs}ms)`);
    }
    if (e instanceof ApiError) throw e;
    console.error(`[api] ✗ network ${url} (${elapsed}ms)`, e);
    throw new ApiError(
      0,
      e instanceof Error ? e.message : "Lỗi kết nối mạng",
    );
  } finally {
    clearTimeout(timer);
  }
}

export function getFeed(params: { limit?: number; cursor?: string } = {}) {
  const qs = new URLSearchParams();
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.cursor) qs.set("cursor", params.cursor);
  const suffix = qs.toString() ? `?${qs}` : "";
  return request<FeedPage>(`/api/feed${suffix}`);
}

export function getSeriesList(opts?: RequestOpts) {
  return request<SeriesSummary[]>("/api/series", opts);
}

export function getSeries(id: string, opts?: RequestOpts) {
  return request<SeriesDetail>(`/api/series/${id}`, opts);
}
