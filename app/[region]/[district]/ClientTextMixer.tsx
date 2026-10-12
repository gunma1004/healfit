"use client";

import { useMemo } from "react";

interface Props {
  locationText: string;
}

// 🌟 네이버 SEO용 키워드 변형 풀 (타이틀/본문 다양화)
const HEADLINE_VARIANTS = [
  "출장 이용정보 마사지 & 프리미엄 홈케어",
  "출장 케어 마사지 & 안심 방문 바디 테라피",
  "출장 힐링 마사지 & 프라이빗 1:1 홈타이",
  "출장 균형케어 마사지 & 전신 릴렉싱 케어",
  "출장 리듬케어 마사지 & 림프 순환 스웨디시",
  "출장 율동케어 마사지 & 맞춤 방문 테라피"
];

const SUB_TEXT_VARIANTS = [
  "수도권 평균 25분 내 빠른 방문 · 선입금 없는 100% 안심 후불제",
  "자택·숙소 어디든 30분 내 신속 방문 · 전액 후불 정찰 가격 운영",
  "전문 힐러진 1:1 맞춤 방문 · 투명한 정찰제 및 철저한 위생 관리",
  "야간·심야 24시간 실시간 예약 · 예약금 없는 안심 방문 케어"
];

export default function ClientTextMixer({ locationText }: Props) {
  // 🌟 locationText 문자열을 기반으로 고유 인덱스를 계산 (SSR과 CSR 간 불일치 방지 및 검색 로봇 즉시 인식)
  const { headline, subText } = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < locationText.length; i++) {
      hash = (hash << 5) - hash + locationText.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);
    const selectedHeadline = HEADLINE_VARIANTS[absHash % HEADLINE_VARIANTS.length];
    const selectedSub = SUB_TEXT_VARIANTS[absHash % SUB_TEXT_VARIANTS.length];

    return {
      headline: `${locationText} ${selectedHeadline}`,
      subText: selectedSub
    };
  }, [locationText]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/30 p-4 md:p-5 rounded-2xl text-center shadow-[0_0_20px_rgba(245,158,11,0.08)]">
      {/* 상단 실시간 안내 뱃지 */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-amber-500/30 text-[11px] font-bold text-amber-400 mb-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        실시간 {locationText} 테라피스트 대기중
      </div>

      {/* 🌟 검색 로봇이 첫 요청부터 즉시 읽을 수 있는 핵심 키워드 헤드라인 */}
      <h2 className="text-sm md:text-base font-extrabold text-amber-300 tracking-tight">
        ✨ {headline}
      </h2>

      {/* 신뢰도 제공 서브 카피 */}
      <p className="text-[11px] md:text-xs text-gray-400 mt-1 font-medium">
        {subText}
      </p>
    </div>
  );
}