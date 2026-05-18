"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const ITEMS: NavItem[] = [
  { href: "/", label: "Khám phá", icon: <HomeIcon /> },
  { href: "/series", label: "Series", icon: <SeriesIcon /> },
  { href: "/continue", label: "Tiếp tục", icon: <ContinueIcon /> },
  { href: "/profile", label: "Tài khoản", icon: <ProfileIcon /> },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function BottomNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 mx-auto flex w-full max-w-md justify-around border-t px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1.5"
      style={{
        background: "rgba(5,11,20,0.85)",
        borderColor: "var(--border)",
        backdropFilter: "blur(20px)",
      }}
      aria-label="Điều hướng chính"
    >
      {ITEMS.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            prefetch
            className="press-fx tap-target flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 transition-colors"
            style={{
              color: active ? "var(--brand)" : "var(--text-dim)",
              background: active ? "var(--brand-soft)" : "transparent",
            }}
          >
            <span
              className="transition-transform"
              style={{
                transform: active ? "translateY(-1px) scale(1.08)" : "none",
              }}
            >
              {item.icon}
            </span>
            <span className="text-[11px] font-semibold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3 3 10v11h6v-7h6v7h6V10z" />
    </svg>
  );
}
function SeriesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 6h16v2H4Zm2-4h12v2H6Zm-4 8h20v12H2Z" />
    </svg>
  );
}
function ContinueIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm1-13h-1.5v6l5.25 3.15.75-1.23-4.5-2.67Z" />
    </svg>
  );
}
function ProfileIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v3h16v-3c0-2.76-3.58-5-8-5Z" />
    </svg>
  );
}
