"use client";

import { useEffect, useState } from "react";
import {
  clearContinueWatching,
  listContinueWatching,
  type ContinueItem,
} from "../lib/continueWatching";
import EpisodeCard from "./EpisodeCard";

export default function ContinueView() {
  const [items, setItems] = useState<ContinueItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(listContinueWatching());
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
        <div className="text-4xl">📺</div>
        <h3 className="text-lg font-semibold">Chưa có tập đang xem</h3>
        <p className="text-sm text-text-dim">
          Bắt đầu xem một tập trong feed – nó sẽ tự động lưu vào đây.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 pb-28">
      <header className="mb-4 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tiếp tục xem</h1>
          <p className="text-sm text-text-dim">
            {items.length} tập đang theo dõi
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            clearContinueWatching();
            setItems([]);
          }}
          className="press-fx text-sm text-text-dim underline-offset-2 hover:underline"
        >
          Xoá tất cả
        </button>
      </header>

      <div className="space-y-2">
        {items.map((item) => (
          <EpisodeCard
            key={item.episodeId}
            title={item.episodeTitle}
            subtitle={item.seriesTitle}
            thumbnail={item.thumbnail}
            isFree={item.isFree}
            progress={item.progress}
          />
        ))}
      </div>
    </div>
  );
}
