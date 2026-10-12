import type { Metadata } from "next";
import "./globals.css";
import NavigationHeader from "./NavigationHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://healfitmassage.netlify.app"),
  title: {
    // 🌟 요청 규격 반영: 출장 이용정보 마사지 키워드 적용
    default: "서울 경기 인천 수도권 출장 이용정보 마사지 | 힐핏(HealFit)",
    template: "%s | 힐핏(HealFit)",
  },
  // 🌟 타이틀과 중복되지 않도록 시·도 출장마사지 키워드 기반 설명 작성
  description:
    "서울 경기 인천 출장마사지 종합 안내 플랫폼 힐핏. 자택·숙소 어디든 30분 내 신속 방문 홈타이, 건식 6만원부터 시작하는 100% 안심 후불제.",
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
    "HealFit",
  ],
  alternates: {
    canonical: "https://healfitmassage.netlify.app",
  },
  verification: {
    other: {
      "naver-site-verification": "199170efdbe214642e81615d6d9e58dce4545143",
    },
  },
  openGraph: {
    title: "서울 경기 인천 수도권 출장 이용정보 마사지 | 힐핏(HealFit)",
    description:
      "서울 경기 인천 출장마사지 종합 안내 플랫폼. 선입금 없는 100% 후불제 안심 예약 및 수도권 전지역 신속 방문 바디케어.",
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