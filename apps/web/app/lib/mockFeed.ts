import type { Procedure } from "../components/CinematicPoster";

export type Doctor = {
  name: string;
  role: string;
  avatar: string;
};

export type MockEpisode = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  order: number;
  isFree: boolean;
  series: { id: string; title: string; accent: string };
  doctor: Doctor;
  stats: { likes: number; comments: number; shares: number };
  durationSec: number;
  procedure: Procedure;
  /** Vietnamese subtitle captions cycled below the doctor card while playing. */
  subtitles: string[];
};

// Local dental clips served from /public/videos. No CORS, no network latency.
const VIDEO = {
  implant1: "/videos/implant-1.mp4",
  implant2: "/videos/implant-2.mp4",
  veneer1: "/videos/veneer-1.mp4",
  invisalign1: "/videos/invisalign-1.mp4",
} as const;

const DOCTORS: Doctor[] = [
  {
    name: "BS. Nguyễn Văn An",
    role: "Implant chuyên sâu · 12 năm",
    avatar: "https://i.pravatar.cc/200?u=an-nguyen",
  },
  {
    name: "ThS.BS. Lê Thị Hương",
    role: "Răng-Hàm-Mặt · ĐH Y Hà Nội",
    avatar: "https://i.pravatar.cc/200?u=huong-le",
  },
  {
    name: "TS.BS. Trần Quang Minh",
    role: "Chỉnh nha · ĐH Y Dược TP.HCM",
    avatar: "https://i.pravatar.cc/200?u=minh-tran",
  },
  {
    name: "BS. Phạm Hoài Nam",
    role: "Nội nha · BV RHM TW",
    avatar: "https://i.pravatar.cc/200?u=nam-pham",
  },
  {
    name: "ThS.BS. Vũ Thanh Mai",
    role: "Phẫu thuật hàm mặt",
    avatar: "https://i.pravatar.cc/200?u=mai-vu",
  },
];

const SERIES = {
  implant: {
    id: "s-implant",
    title: "Cấy ghép Implant A→Z",
    accent: "#1fb6a8",
  },
  veneer: {
    id: "s-veneer",
    title: "Veneer & Nha khoa thẩm mỹ",
    accent: "#c084fc",
  },
  invisalign: {
    id: "s-invisalign",
    title: "Invisalign · Niềng vô hình",
    accent: "#60a5fa",
  },
  esthetic: {
    id: "s-esthetic",
    title: "Nha khoa thẩm mỹ",
    accent: "#a78bfa",
  },
  ortho: {
    id: "s-ortho",
    title: "Chỉnh nha hiện đại",
    accent: "#38bdf8",
  },
  endo: { id: "s-endo", title: "Nội nha lâm sàng", accent: "#fb7185" },
  surgery: {
    id: "s-surgery",
    title: "Phẫu thuật chuyên sâu",
    accent: "#f5b945",
  },
};

export const MOCK_FEED: MockEpisode[] = [
  {
    id: "ep-implant-1",
    title: "Cấy ghép Implant — Thay đổi cuộc đời",
    description:
      "1 trụ Titanium · 3 buổi hẹn · 1 nụ cười trọn vẹn. Xem ca lâm sàng thực tế.",
    videoUrl: VIDEO.implant1,
    order: 1,
    isFree: true,
    series: SERIES.implant,
    doctor: DOCTORS[0],
    stats: { likes: 47820, comments: 892, shares: 2140 },
    durationSec: 54,
    procedure: "implant",
    subtitles: [
      "Cấy ghép Implant: hành trình từ mất răng tới nụ cười trọn vẹn.",
      "Trụ Titanium tích hợp với xương trong 3-6 tháng.",
      "1 trụ · 1 mão sứ · 1 lần đầu tư cho cả đời.",
    ],
  },
  {
    id: "ep-veneer-1",
    title: "Veneer sứ — Nụ cười Hollywood trong 2 buổi",
    description:
      "Mài tối thiểu, dán sứ siêu mỏng — giữ tối đa men răng tự nhiên.",
    videoUrl: VIDEO.veneer1,
    order: 2,
    isFree: true,
    series: SERIES.veneer,
    doctor: DOCTORS[1],
    stats: { likes: 38940, comments: 723, shares: 1680 },
    durationSec: 48,
    procedure: "veneer",
    subtitles: [
      "Veneer sứ siêu mỏng — chỉ 0.3mm.",
      "Mài tối thiểu, giữ tối đa men răng tự nhiên.",
      "Nụ cười Hollywood chỉ trong 2 buổi hẹn.",
    ],
  },
  {
    id: "ep-invisalign-1",
    title: "Invisalign — Niềng răng vô hình thế hệ mới",
    description:
      "Khay nhựa trong suốt SmartTrack · Tháo lắp khi ăn · Không ai biết bạn đang niềng.",
    videoUrl: VIDEO.invisalign1,
    order: 3,
    isFree: true,
    series: SERIES.invisalign,
    doctor: DOCTORS[2],
    stats: { likes: 52310, comments: 1042, shares: 2680 },
    durationSec: 51,
    procedure: "invisalign",
    subtitles: [
      "Khay nhựa trong suốt SmartTrack thế hệ mới.",
      "Tháo lắp khi ăn — không kiêng món nào.",
      "Không ai biết bạn đang niềng răng.",
    ],
  },
  {
    id: "ep-implant-2",
    title: "Phẫu thuật nâng xoang hàm cho Implant",
    description:
      "Lateral approach — bước-bước, từ rạch vạt tới ghép xương Bio-Oss.",
    videoUrl: VIDEO.implant2,
    order: 4,
    isFree: false,
    series: SERIES.implant,
    doctor: DOCTORS[0],
    stats: { likes: 7150, comments: 94, shares: 218 },
    durationSec: 64,
    procedure: "implant",
    subtitles: [
      "Nâng xoang hở — bước-bước theo lateral approach.",
      "Rạch vạt · cửa sổ bên · ghép xương Bio-Oss.",
      "Tăng thể tích xương cho Implant vùng hàm trên.",
    ],
  },
];

export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

/**
 * Mock series list, shaped to match what /api/series returns so the Series
 * page can render cards on first paint before the fetch resolves.
 * Counts are derived from MOCK_FEED so they stay in sync if episodes change.
 */
export const MOCK_SERIES_LIST = (() => {
  const byId = new Map<
    string,
    { id: string; title: string; accent: string; count: number }
  >();
  for (const ep of MOCK_FEED) {
    const cur = byId.get(ep.series.id);
    if (cur) cur.count += 1;
    else
      byId.set(ep.series.id, {
        id: ep.series.id,
        title: ep.series.title,
        accent: ep.series.accent,
        count: 1,
      });
  }
  const descriptions: Record<string, string> = {
    "s-implant":
      "Khóa học toàn diện về cấy ghép Implant: giải phẫu, chỉ định, kỹ thuật phẫu thuật cơ bản tới nâng cao.",
    "s-veneer":
      "Veneer sứ, veneer composite — kỹ thuật mài tối thiểu và phục hình thẩm mỹ chuẩn lớp.",
    "s-invisalign":
      "Niềng răng trong suốt SmartTrack — kế hoạch điều trị từ chỉ định tới retention.",
    "s-esthetic":
      "Tẩy trắng, đánh bóng, lấy cao răng — quy trình chăm sóc thẩm mỹ răng miệng.",
    "s-ortho":
      "Chỉnh nha mắc cài, mini-screw và quản lý điều trị dài hạn.",
    "s-endo":
      "Nội nha lâm sàng — file Ni-Ti, định vị apex và phục hình sau điều trị tuỷ.",
    "s-surgery":
      "Phẫu thuật hàm mặt — nhổ răng khôn ngầm, nâng xoang, cắt phanh môi.",
  };
  return Array.from(byId.values()).map((s) => ({
    id: s.id,
    title: s.title,
    description: descriptions[s.id] ?? null,
    thumbnail: null as string | null,
    createdAt: new Date(0).toISOString(),
    accent: s.accent,
    _count: { episodes: s.count },
  }));
})();
