import type { Metadata } from "next";
import "./globals.css";
import NavigationHeader from "./NavigationHeader";

const SITE_URL = "https://healfitmassage.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "힐핏(HealFit) | 서울·경기·인천 프리미엄 힐링 & 바디케어 플랫폼",
    template: "%s | 힐핏(HealFit)",
  },
  description: "서울·경기·인천 힐링 테라피 & 바디케어 힐핏! 타이, 아로마, 스웨디시 검증된 샵 정보와 맞춤 힐링 서비스를 한눈에 확인하세요.",
  keywords: ["힐핏", "HealFit", "마사지플랫폼", "바디케어", "타이마사지", "아로마테라피", "스웨디시", "서울마사지", "경기마사지", "인천마사지"],
  authors: [{ name: "HealFit" }],
  creator: "HealFit",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "힐핏(HealFit) | 서울·경기·인천 프리미엄 바디케어 플랫폼",
    description: "내 주변 검증된 테라피 & 힐링 샵 정보 총집합! 타이, 아로마, 스웨디시 맞춤 케어를 힐핏에서 확인하세요.",
    url: SITE_URL,
    siteName: "힐핏",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png", // public/og-main.png 경로
        width: 1200,
        height: 630,
        alt: "힐핏 - 프리미엄 힐링 & 바디케어 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "힐핏(HealFit) | 프리미엄 힐링 & 바디케어",
    description: "서울·경기·인천 검증된 테라피 샵 정보 및 바디케어 가이드",
    images: ["/og-main.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 네이버 서치어드바이저 사이트 소유확인 */}
        <meta
          name="naver-site-verification"
          content="56d1368c0af42fa874d7c1072687e23ade1c12b7"
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <NavigationHeader />
        {children}
      </body>
    </html>
  );
}