import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import BottomNav from "./components/BottomNav";
import RouteTransition from "./components/RouteTransition";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans-rhm",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display-rhm",
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RHM Play – Học Răng-Hàm-Mặt theo phong cách short video",
  description:
    "Nền tảng học liệu Răng-Hàm-Mặt: video ngắn, series chuyên sâu, học mọi lúc trên điện thoại.",
  applicationName: "RHM Play",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050b14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <div className="relative mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-bg">
          {/* Ambient cinematic backdrop — a soft teal+violet mesh that bleeds
              behind every page, giving the whole shell a luxurious depth. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0 ambient-mesh" />
          <main className="relative z-10 flex-1 overflow-hidden">
            <RouteTransition>{children}</RouteTransition>
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
