import { Metadata } from "next";
import MainClientUI from "./MainClientUI";

export const metadata: Metadata = {
  title: "힐핏 (HealFit) | 서울·경기·인천 프리미엄 힐링 & 바디케어 플랫폼",
  // 네이버 모바일/PC 최적 노출 글자 수 (공백 포함 75~80자 내외) 및 CTR 극대화 문구
  description: "서울·경기·인천 100% 검증 힐링 테라피 힐핏! 타이, 아로마, 스웨디시 전문 제휴점 가격비교와 실시간 맞춤 바디케어 정보를 확인하세요.",
  keywords: [
    "힐핏",
    "HealFit",
    "마사지플랫폼",
    "바디케어",
    "타이테라피",
    "아로마마사지",
    "스웨디시",
    "서울마사지",
    "경기마사지",
    "인천마사지",
    "힐링테라피",
    "프리미엄스파"
  ],
  alternates: {
    canonical: "https://healfitmassage.netlify.app",
  },
  openGraph: {
    title: "힐핏(HealFit) | 서울·경기·인천 프리미엄 바디케어 플랫폼",
    description: "내 주변 검증된 테라피 샵 정보 총집합! 타이, 아로마, 스웨디시 맞춤 힐링 케어를 힐핏에서 바로 만나보세요.",
    url: "https://healfitmassage.netlify.app",
    siteName: "힐핏(HealFit)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "힐핏 - 프리미엄 힐링 & 바디케어 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "힐핏 (HealFit) | 서울·경기·인천 프리미엄 바디케어",
    description: "서울·경기·인천 검증된 테라피 제휴 정보 및 프리미엄 힐링 가이드",
    images: ["/og-main.png"],
  },
};

export default function Page() {
  return <MainClientUI />;
}