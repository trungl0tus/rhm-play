"use client";

import { useState } from "react";

type Tier = {
  id: string;
  name: string;
  badge?: string;
  price: string;
  pricePer: string;
  saveLabel?: string;
  perks: string[];
  highlight?: boolean;
};

const TIERS: Tier[] = [
  {
    id: "monthly",
    name: "Hàng tháng",
    price: "199.000₫",
    pricePer: "/tháng · huỷ bất cứ lúc nào",
    perks: ["Mở khoá toàn bộ series", "Không quảng cáo", "Tải tài liệu PDF"],
  },
  {
    id: "annual",
    name: "Hàng năm",
    badge: "Phổ biến",
    price: "1.490.000₫",
    pricePer: "/năm · 124.000₫/tháng",
    saveLabel: "Tiết kiệm 38%",
    highlight: true,
    perks: [
      "Mở khoá toàn bộ series",
      "Không quảng cáo",
      "Tải tài liệu + CBCT case",
      "Chứng chỉ hoàn thành",
      "Hỗ trợ ưu tiên",
    ],
  },
  {
    id: "lifetime",
    name: "Trọn đời",
    badge: "Giá tốt nhất",
    price: "4.990.000₫",
    pricePer: "Thanh toán 1 lần",
    perks: [
      "Tất cả quyền lợi gói năm",
      "Truy cập trọn đời mọi series mới",
      "Mời 1 bác sĩ đồng nghiệp",
    ],
  },
];

type Props = {
  /** Optional context: episode title that triggered the paywall. */
  episodeTitle?: string;
  /** Called when the user dismisses the paywall (back button, ESC). */
  onClose?: () => void;
};

export default function PaywallSheet({ episodeTitle, onClose }: Props) {
  const [selectedTier, setSelectedTier] = useState<string>("annual");

  return (
    <div className="relative h-full w-full overflow-y-auto pb-32">
      {/* Hero gradient */}
      <div
        className="absolute inset-x-0 top-0 h-72"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,185,69,0.35) 0%, rgba(245,185,69,0.05) 45%, transparent 75%), linear-gradient(180deg, #0c1a2a 0%, var(--bg) 100%)",
        }}
      />

      <div className="sheet-in relative">
        {/* Close button */}
        {onClose && (
          <div className="sticky top-3 z-10 flex justify-end px-4">
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng"
              className="press-fx tap-target glass-dark flex items-center justify-center rounded-full"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
                <path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3L17 4.3z" />
              </svg>
            </button>
          </div>
        )}

        {/* Crown */}
        <div className="flex justify-center pt-8">
          <div
            className="neon-amber flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #fde68a 0%, #f5b945 60%, #d97706 100%)",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#3a2400" aria-hidden>
              <path d="M5 16 3 5l5 4 4-7 4 7 5-4-2 11Zm0 2h14v3H5z" />
            </svg>
          </div>
        </div>

        <div className="px-6 pt-5 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            RHM Play <span style={{ color: "var(--premium)" }}>Premium</span>
          </h1>
          {episodeTitle ? (
            <p className="mt-2 text-sm text-text-dim">
              Mở khoá «<span className="text-text">{episodeTitle}</span>» và 200+ tập chuyên sâu
            </p>
          ) : (
            <p className="mt-2 text-sm text-text-dim">
              Truy cập toàn bộ thư viện chuyên sâu cho bác sĩ Răng-Hàm-Mặt
            </p>
          )}

          {/* Social proof */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-text-dim">
            <Stat value="12K+" label="học viên" />
            <Divider />
            <Stat value="4.9★" label="đánh giá" />
            <Divider />
            <Stat value="200+" label="bài học" />
          </div>
        </div>

        {/* Tier cards */}
        <div className="mt-6 space-y-3 px-4">
          {TIERS.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              selected={selectedTier === tier.id}
              onSelect={() => setSelectedTier(tier.id)}
            />
          ))}
        </div>

        {/* Primary CTA */}
        <div className="mt-5 px-4">
          <button
            type="button"
            className="press-fx tap-target neon-amber relative w-full overflow-hidden rounded-2xl text-base font-bold"
            style={{
              background:
                "linear-gradient(135deg, #fde68a 0%, #f5b945 50%, #d97706 100%)",
              color: "#2a1900",
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 py-4">
              Đăng ký · {TIERS.find((t) => t.id === selectedTier)?.price}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M5 12h14m-6-7 7 7-7 7" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          <p className="mt-2 text-center text-[11px] text-text-faint">
            Bảo mật bởi Stripe · Huỷ bất cứ lúc nào trong cài đặt
          </p>
        </div>

        {/* OR divider */}
        <div className="mt-6 flex items-center gap-3 px-4">
          <div className="h-px flex-1 bg-border" style={{ background: "var(--border)" }} />
          <span className="text-[11px] uppercase tracking-widest text-text-faint">
            hoặc thử miễn phí
          </span>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        </div>

        {/* Alt actions: watch ad + Telegram VIP */}
        <div className="mt-4 space-y-2.5 px-4">
          <AlternativeAction
            icon={<AdIcon />}
            title="Xem 1 quảng cáo"
            subtitle="Mở khoá tập này trong 24 giờ"
            cta="Xem"
            accent="#60a5fa"
          />
          <AlternativeAction
            icon={<TelegramIcon />}
            title="Tham gia Telegram VIP"
            subtitle="Nhận voucher giảm 50% cho gói năm"
            cta="Mở Telegram"
            accent="#229ED9"
          />
        </div>

        {/* Fine print */}
        <div className="mt-8 space-y-2 px-6 pb-8 text-center text-[11px] text-text-faint">
          <p>
            Bạn có thể huỷ gói thuê bao bất cứ lúc nào. Gói trọn đời là thanh toán 1 lần.
          </p>
          <p>
            Bằng việc đăng ký, bạn đồng ý với{" "}
            <span className="underline">Điều khoản</span> và{" "}
            <span className="underline">Chính sách bảo mật</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

function TierCard({
  tier,
  selected,
  onSelect,
}: {
  tier: Tier;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="press-fx relative block w-full overflow-hidden rounded-2xl border-2 p-4 text-left transition-all"
      style={{
        background: selected ? "rgba(245,185,69,0.08)" : "var(--bg-card)",
        borderColor: selected ? "var(--premium)" : "var(--border)",
        boxShadow: selected
          ? "0 0 24px rgba(245,185,69,0.18), inset 0 0 0 1px rgba(245,185,69,0.2)"
          : "none",
      }}
    >
      {tier.badge && (
        <span
          className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
          style={{
            background: tier.highlight
              ? "var(--premium)"
              : "rgba(255,255,255,0.08)",
            color: tier.highlight ? "#2a1900" : "var(--text-dim)",
          }}
        >
          {tier.badge}
        </span>
      )}

      <div className="flex items-baseline gap-2">
        <span className="text-base font-bold">{tier.name}</span>
        {tier.saveLabel && (
          <span
            className="text-[11px] font-semibold"
            style={{ color: "var(--brand)" }}
          >
            {tier.saveLabel}
          </span>
        )}
      </div>

      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl font-extrabold tracking-tight">
          {tier.price}
        </span>
        <span className="text-xs text-text-dim">{tier.pricePer}</span>
      </div>

      <ul className="mt-3 space-y-1">
        {tier.perks.map((perk) => (
          <li
            key={perk}
            className="flex items-start gap-2 text-[13px] text-text"
          >
            <CheckSm color={selected ? "var(--premium)" : "var(--brand)"} />
            <span>{perk}</span>
          </li>
        ))}
      </ul>

      {/* Radio dot */}
      <div
        className="absolute bottom-4 right-4 flex h-5 w-5 items-center justify-center rounded-full border-2"
        style={{
          borderColor: selected ? "var(--premium)" : "var(--border)",
        }}
      >
        {selected && (
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--premium)" }}
          />
        )}
      </div>
    </button>
  );
}

function AlternativeAction({
  icon,
  title,
  subtitle,
  cta,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  cta: string;
  accent: string;
}) {
  return (
    <button
      type="button"
      className="press-fx glass-card flex w-full items-center gap-3 rounded-2xl p-3 text-left"
    >
      <div
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
        style={{ background: `${accent}1f`, color: accent }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-text-dim">{subtitle}</p>
      </div>
      <span
        className="rounded-full px-3 py-1.5 text-xs font-bold"
        style={{ background: `${accent}26`, color: accent }}
      >
        {cta}
      </span>
    </button>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-sm font-bold text-text">{value}</div>
      <div className="text-[10px] uppercase tracking-wider">{label}</div>
    </div>
  );
}

function Divider() {
  return <span className="h-6 w-px" style={{ background: "var(--border)" }} />;
}

function CheckSm({ color }: { color: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="mt-0.5 flex-shrink-0"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function AdIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 5h18v14H3Zm2 2v10h14V7Zm5 2 6 3-6 3z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9.78 17.94 9.61 14.5 16.5 8.5l-9 5.5-3.78-1.2c-1.07-.33-1.08-1.04.24-1.54l14.74-5.68c.88-.34 1.71.21 1.37 1.54l-2.5 11.8c-.21 1-.85 1.24-1.66.77l-4.7-3.47Z" />
    </svg>
  );
}
