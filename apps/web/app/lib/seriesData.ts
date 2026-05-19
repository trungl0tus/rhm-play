import type { Procedure } from "../components/CinematicPoster";

export type SeriesEpisode = {
  id: string;
  order: number;
  title: string;
  description: string;
  durationSec: number;
  isFree: boolean;
  watched: boolean;
  videoUrl?: string;
  resources?: Array<{ label: string; size: string; type: "pdf" | "zip" | "doc" }>;
};

export type SeriesEntry = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  accent: string;
  procedure: Procedure;
  doctor: { name: string; role: string; avatar: string };
  episodes: SeriesEpisode[];
  progress: number;
  rating: number;
  studentCount: number;
  featured?: boolean;
  newRelease?: boolean;
  /** Cinematic teaser played silently behind hero & featured cards. */
  previewVideoUrl?: string;
  /** Short Vietnamese tagline rendered on cinematic hero/card overlays. */
  tagline?: string;
  /** Story chapters used to group the episode list cinematic-style. */
  chapters?: Array<{ title: string; range: [number, number]; subtitle?: string }>;
};

function ep(
  order: number,
  title: string,
  durationSec: number,
  isFree: boolean,
  watched: boolean,
  resources?: SeriesEpisode["resources"],
  videoUrl?: string,
): SeriesEpisode {
  return {
    id: `ep-${order}`,
    order,
    title,
    description: "",
    durationSec,
    isFree,
    watched,
    videoUrl,
    resources,
  };
}

export const CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "implant", label: "Implant" },
  { id: "veneer", label: "Veneer" },
  { id: "invisalign", label: "Invisalign" },
  { id: "endo", label: "Nội nha" },
  { id: "surgery", label: "Phẫu thuật" },
  { id: "esthetic", label: "Thẩm mỹ" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const SERIES: SeriesEntry[] = [
  {
    id: "implant-mastery",
    title: "Implant Mastery",
    subtitle: "Cấy ghép Implant từ cơ bản tới nâng cao",
    description:
      "Lộ trình hoàn chỉnh: giải phẫu, chỉ định, đặt Implant, ghép xương, nâng xoang, phục hình.",
    category: "implant",
    accent: "#1fb6a8",
    procedure: "implant",
    doctor: {
      name: "BS. Nguyễn Văn An",
      role: "Implant chuyên sâu · 12 năm",
      avatar: "https://i.pravatar.cc/200?u=an-nguyen",
    },
    progress: 0.42,
    rating: 4.9,
    studentCount: 12480,
    featured: true,
    previewVideoUrl: "/videos/implant-1.mp4",
    tagline: "Hành trình từ trụ Titanium đến nụ cười trọn vẹn",
    chapters: [
      { title: "Hành trình bắt đầu", range: [1, 3], subtitle: "Nền tảng giải phẫu & hệ thống" },
      { title: "Lâm sàng cốt lõi", range: [4, 7], subtitle: "Lập kế hoạch · dụng cụ · vạt" },
      { title: "Cao cấp", range: [8, 12], subtitle: "Sequence khoan · ghép xương · all-on-4" },
    ],
    episodes: [
      ep(1, "Tổng quan Implant Nha khoa", 252, true, true, [
        { label: "Slide bài giảng", size: "2.4 MB", type: "pdf" },
      ], "/videos/implant-1.mp4"),
      ep(2, "Giải phẫu xương hàm cho Implant", 390, true, true, [
        { label: "Atlas giải phẫu PDF", size: "8.1 MB", type: "pdf" },
        { label: "CBCT case study", size: "12 MB", type: "zip" },
      ]),
      ep(3, "Phân loại hệ thống Implant", 304, true, true),
      ep(4, "Chỉ định và chống chỉ định", 348, true, true),
      ep(5, "Lập kế hoạch điều trị với CBCT", 435, true, true, [
        { label: "Template lập kế hoạch", size: "180 KB", type: "doc" },
      ]),
      ep(6, "Dụng cụ phẫu thuật Implant", 262, true, false),
      ep(7, "Đường rạch và bóc tách vạt", 370, true, false),
      ep(8, "Sequence khoan định hướng", 485, false, false, [
        { label: "Drill protocol card", size: "320 KB", type: "pdf" },
      ], "/videos/implant-2.mp4"),
      ep(9, "Đặt Implant tức thì sau nhổ răng", 572, false, false),
      ep(10, "Ghép xương dạng khối (block)", 677, false, false),
      ep(11, "Nâng xoang hở (lateral approach)", 760, false, false),
      ep(12, "Phục hình All-on-4 / All-on-6", 625, false, false, [
        { label: "Treatment guide", size: "5.2 MB", type: "pdf" },
      ]),
    ],
  },
  {
    id: "veneer-smile-design",
    title: "Veneer Smile Design",
    subtitle: "Nha khoa thẩm mỹ cao cấp",
    description:
      "Veneer sứ, veneer composite, layering technique — thiết kế nụ cười Hollywood chuẩn lớp.",
    category: "veneer",
    accent: "#c084fc",
    procedure: "veneer",
    doctor: {
      name: "ThS.BS. Lê Thị Hương",
      role: "Răng-Hàm-Mặt · ĐH Y Hà Nội",
      avatar: "https://i.pravatar.cc/200?u=huong-le",
    },
    progress: 0.12,
    rating: 4.8,
    studentCount: 8720,
    featured: true,
    newRelease: true,
    previewVideoUrl: "/videos/veneer-1.mp4",
    tagline: "Thiết kế nụ cười từng lớp · từng nhịp ánh sáng",
    chapters: [
      { title: "Nguyên tắc thiết kế", range: [1, 4], subtitle: "Tỉ lệ vàng · mockup · wax-up" },
      { title: "Kỹ thuật lâm sàng", range: [5, 8], subtitle: "Mài tối thiểu · gắn · layering" },
    ],
    episodes: [
      ep(1, "Smile design — Nguyên tắc thẩm mỹ", 330, true, true, [
        { label: "Smile design ebook", size: "6.4 MB", type: "pdf" },
      ], "/videos/veneer-1.mp4"),
      ep(2, "Tỉ lệ vàng và Golden Proportion", 290, true, false),
      ep(3, "Chỉ định Veneer sứ vs composite", 365, true, false),
      ep(4, "Mockup và Wax-up kỹ thuật số", 432, true, false),
      ep(5, "Kỹ thuật mài tối thiểu", 510, false, false, [
        { label: "Preparation protocol", size: "1.1 MB", type: "pdf" },
      ]),
      ep(6, "Lấy dấu chính xác — silicone", 382, false, false),
      ep(7, "Gắn Veneer sứ với keo dán", 558, false, false),
      ep(8, "Layering Veneer composite", 665, false, false),
    ],
  },
  {
    id: "invisalign-workflow",
    title: "Invisalign Clinical Workflow",
    subtitle: "Niềng răng vô hình thế hệ mới",
    description:
      "SmartTrack, ClinCheck, attachment placement — quy trình lâm sàng đầy đủ.",
    category: "invisalign",
    accent: "#60a5fa",
    procedure: "invisalign",
    doctor: {
      name: "TS.BS. Trần Quang Minh",
      role: "Chỉnh nha · ĐH Y Dược TP.HCM",
      avatar: "https://i.pravatar.cc/200?u=minh-tran",
    },
    progress: 0,
    rating: 4.7,
    studentCount: 6240,
    featured: true,
    newRelease: true,
    previewVideoUrl: "/videos/invisalign-1.mp4",
    tagline: "Niềng vô hình · không ai biết bạn đang đổi đời",
    episodes: [
      ep(1, "Giới thiệu Invisalign SmartTrack", 240, true, false, [
        { label: "Brochure tổng quan", size: "4.2 MB", type: "pdf" },
      ], "/videos/invisalign-1.mp4"),
      ep(2, "Khám lâm sàng và chỉ định", 345, true, false),
      ep(3, "Scan iTero — Lấy dấu kỹ thuật số", 390, true, false),
      ep(4, "ClinCheck — Lập kế hoạch điều trị", 492, true, false),
      ep(5, "Attachment placement", 444, false, false),
      ep(6, "IPR — Mài kẽ chiến lược", 410, false, false),
      ep(7, "Hướng dẫn bệnh nhân sử dụng khay", 305, false, false),
      ep(8, "Theo dõi và đổi khay định kỳ", 330, false, false),
      ep(9, "Refinement — Tinh chỉnh cuối", 432, false, false),
      ep(10, "Retention — Giai đoạn cố định", 360, false, false),
    ],
  },
  {
    id: "endo-modern",
    title: "Nội nha hiện đại",
    subtitle: "Điều trị tuỷ máy ProTaper · file Ni-Ti",
    description:
      "Kỹ thuật điều trị tuỷ răng không đau bằng file quay máy, định vị apex chính xác.",
    category: "endo",
    accent: "#fb7185",
    procedure: "endo",
    doctor: {
      name: "BS. Phạm Hoài Nam",
      role: "Nội nha · BV RHM TW",
      avatar: "https://i.pravatar.cc/200?u=nam-pham",
    },
    progress: 0,
    rating: 4.6,
    studentCount: 3940,
    tagline: "Cứu sống tủy bằng những đường file Ni-Ti chính xác",
    episodes: [
      ep(1, "Giải phẫu hệ thống ống tuỷ", 285, true, false),
      ep(2, "File Ni-Ti — Tổng quan", 312, true, false),
      ep(3, "Định vị apex bằng máy", 358, false, false),
      ep(4, "Tạo hình ống tuỷ ProTaper", 480, false, false),
      ep(5, "Hàn ống tuỷ Gutta-Percha", 425, false, false),
      ep(6, "Phục hình sau điều trị tuỷ", 392, false, false),
    ],
  },
  {
    id: "wisdom-tooth",
    title: "Phẫu thuật răng khôn ngầm",
    subtitle: "Chuyên sâu cho BS răng-hàm-mặt",
    description:
      "Phân loại Pell-Gregory, kỹ thuật rạch, lấy xương, khâu vạt và quản lý hậu phẫu.",
    category: "surgery",
    accent: "#f5b945",
    procedure: "surgery",
    doctor: {
      name: "ThS.BS. Vũ Thanh Mai",
      role: "Phẫu thuật hàm mặt",
      avatar: "https://i.pravatar.cc/200?u=mai-vu",
    },
    progress: 0,
    rating: 4.8,
    studentCount: 5120,
    previewVideoUrl: "/videos/implant-2.mp4",
    tagline: "Phân loại · rạch · chia răng — chuẩn từng đường dao",
    episodes: [
      ep(1, "Phân loại Pell-Gregory", 290, true, false),
      ep(2, "Đường rạch và bóc tách vạt", 410, true, false),
      ep(3, "Kỹ thuật khoan và chia răng", 525, false, false),
      ep(4, "Khâu vạt và quản lý hậu phẫu", 380, false, false),
    ],
  },
];

export function getSeriesById(id: string): SeriesEntry | undefined {
  return SERIES.find((s) => s.id === id);
}

export function fmtDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function fmtCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}
