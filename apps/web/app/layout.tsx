import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import BottomNav from "./components/BottomNav";
import RouteTransition from "./components/RouteTransition";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans-rhm",
  subsets: ["latin", "vietnamese"],
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
    <html lang="vi" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <div className="relative mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-bg">
          <main className="relative flex-1 overflow-hidden">
            <RouteTransition>{children}</RouteTransition>
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
