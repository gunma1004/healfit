import type { Metadata } from "next";
import "./globals.css";
import NavigationHeader from "./NavigationHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://healfitmassage.netlify.app"),
  title: {
    default: "힐핏(HealFit) | 서울·경기·인천 24시 프리미엄 출장 마사지 & 홈케어 테라피",
    template: "%s | 힐핏(HealFit)"
  },
  // 네이버 검색 최적 노출 길이 (공백 포함 75~80자 내외)
  description: "서울·경기·인천 24시 출장마사지 & 방문 홈케어 전문 힐핏! 선입금 없는 100% 안심 후불제, 타이·아로마·스웨디시 제휴업체 정보 및 실시간 빠른 예약을 확인하세요.",
  keywords: [
    "출장마사지",
    "출장 마사지",
    "서울 출장마사지",
    "경기 출장마사지",
    "인천 출장마사지",
    "홈타이",
    "방문 마사지",
    "스웨디시",
    "아로마 테라피",
    "후불제 출장마사지",
    "힐핏",
    "HealFit"
  ],
  alternates: {
    canonical: "https://healfitmassage.netlify.app",
  },
  // 🌟 네이버 서치어드바이저 및 구글 서치콘솔 소유확인 메타태그
  verification: {
    other: {
      "naver-site-verification": "199170efdbe214642e81615d6d9e58dce4545143",
    },
  },
  openGraph: {
    title: "힐핏(HealFit) | 서울·경기·인천 24시 안심 출장마사지 & 홈케어",
    description: "선입금 없는 100% 후불제 안심 예약! 수도권 전지역 평균 25분 내 빠른 방문 바디케어.",
    url: "https://healfitmassage.netlify.app",
    siteName: "힐핏(HealFit)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "힐핏 프리미엄 테라피 안내",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-[#08080a] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
        <NavigationHeader />
        {children}
      </body>
    </html>
  );
}