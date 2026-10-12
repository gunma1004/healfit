import type { Metadata } from "next";
import Link from "next/link";
import { ClientTextMixerInline } from "./ClientTextMixerInline";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
  }>;
  searchParams: Promise<{
    dong?: string;
  }>;
}

// 🌟 1. 타이틀 전용 변형 키워드 풀 (요청 규격 반영)
const TITLE_VARIANTS = [
  "출장 이용정보 마사지",
  "출장 케어 마사지",
  "출장 힐링 마사지",
  "출장 균형케어 마사지",
  "출장 리듬케어 마사지",
  "출장 율동케어 마사지"
];

// 🌟 2. 메타 디스크립션 전용 안내 풀 (시·구·동 출장마사지 뒤에 조합되어 타이틀과 겹치지 않음)
const DESC_INTRO_POOL = [
  "프리미엄 힐링 홈타이 및 바디케어 안내 플랫폼.",
  "자택·숙소 어디든 25분 내 신속 방문 홈케어 서비스.",
  "전문 테라피스트의 프라이빗 1:1 방문 맞춤 케어.",
  "심야 시간에도 투명한 정찰제로 편안하게 이용하는 홈타이."
];

const DESC_PRICE_POOL = [
  "건식 6만원부터 시작하는 100% 안심 후불제.",
  "선입금 없는 안전한 전액 후불제 정찰 가격 운영.",
  "예약금 없는 투명한 가격 정책과 철저한 위생 관리.",
  "부담 없는 합리적인 코스 구성 및 신속 배정."
];

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { region, district } = resolvedParams;
  const dongName = resolvedSearchParams.dong ? decodeURIComponent(resolvedSearchParams.dong) : "";
  const districtName = decodeURIComponent(district);
  const regionName = region === "seoul" ? "서울" : region === "incheon" ? "인천" : "경기";

  const locationKeyword = `${regionName} ${districtName} ${dongName}`.trim();
  const simpleLocation = dongName ? `${districtName} ${dongName}` : districtName;

  // -------------------------------------------------------------
  // 🎯 고유 해시 연산 (지역명 기반 결정론적 인덱스 분기)
  // -------------------------------------------------------------
  let hash = 0;
  const seed = locationKeyword + "healfit_seo_unique";
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  // 🌟 [타이틀 규격]: 예) "서울 강남구 역삼동 출장 힐링 마사지 | 힐핏(HealFit)"
  const titleVariant = TITLE_VARIANTS[absHash % TITLE_VARIANTS.length];
  const finalTitle = `${locationKeyword} ${titleVariant} | 힐핏(HealFit)`;

  // 🌟 [디스크립션 규격]: 예) "서울 강남구 역삼동 출장마사지 종합 안내. 프리미엄 힐링 홈타이... 건식 6만원부터..." (타이틀과 문구 중복 분리)
  const introPart = DESC_INTRO_POOL[absHash % DESC_INTRO_POOL.length];
  const pricePart = DESC_PRICE_POOL[(absHash + 1) % DESC_PRICE_POOL.length];
  const finalDescription = `${locationKeyword} 출장마사지 안내. ${introPart} ${pricePart}`;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: [
      `${locationKeyword} 출장마사지`,
      `${simpleLocation} 출장마사지`,
      `${locationKeyword} 홈타이`,
      `${locationKeyword} 스웨디시`,
      `${locationKeyword} 아로마`,
      "24시 출장마사지",
      "후불제 출장마사지",
      "힐핏",
      "HealFit"
    ],
    alternates: {
      canonical: `https://healfitmassage.netlify.app/${region}/${encodeURIComponent(districtName)}${dongName ? `?dong=${encodeURIComponent(dongName)}` : ""}`,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `https://healfitmassage.netlify.app/${region}/${encodeURIComponent(districtName)}${dongName ? `?dong=${encodeURIComponent(dongName)}` : ""}`,
      siteName: "힐핏(HealFit)",
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: "/og-main.png",
          width: 1200,
          height: 630,
          alt: `${locationKeyword} 출장 마사지 - 힐핏`,
        },
      ],
    },
  };
}

export default async function RegionalDetailPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { region, district } = resolvedParams;
  const dongName = resolvedSearchParams.dong ? decodeURIComponent(resolvedSearchParams.dong) : "";
  const districtName = decodeURIComponent(district);
  const regionName = region === "seoul" ? "서울특별시" : region === "incheon" ? "인천광역시" : "경기도";
  
  const fullTitle = dongName 
    ? `${regionName} ${districtName} (${dongName})` 
    : `${regionName} ${districtName}`;

  const localShops = [
    {
      id: 1,
      name: `✨ ${fullTitle} 한국골든테라피`,
      desc: "VIP 골든 릴렉싱 & 딥티슈 피로회복! 베테랑 테라피스트의 품격 있는 1:1 맞춤 케어",
      phone: "0507-1280-3361",
      price: "80,000원부터~",
      image: "/shop1.jpg"
    },
    {
      id: 2,
      name: `🌸 ${fullTitle} 한국미인테라피`,
      desc: "최고급 천연 오일을 활용한 감성 스웨디시 & 아로마 전신 림프 순환 프로그램",
      phone: "0507-1280-3303",
      price: "70,000원부터~",
      image: "/shop2.jpg"
    },
    {
      id: 3,
      name: `💎 ${fullTitle} 주주테라피`,
      desc: "재방문율 1위 만족도! 철저한 위생 관리와 프라이빗 힐링 바디케어 서비스 제공",
      phone: "0507-1280-3193",
      price: "60,000원부터~",
      image: "/shop3.jpg"
    },
    {
      id: 4,
      name: `👑 ${fullTitle} 퀸즈홈테라피`,
      desc: "여왕처럼 누리는 VIP 홈케어! 전문 힐러들의 체형 맞춤형 피로회복 특화 프로그램",
      phone: "0507-1280-3334",
      price: "60,000원부터~",
      image: "/shop4.jpg"
    },
    {
      id: 5,
      name: `🌙 ${fullTitle} 오늘밤테라피`,
      desc: "선입금 전혀 없는 100% 안심 후불제! 수도권 전지역 25분 내 빠른 방문 힐링",
      phone: "0507-1280-3223",
      price: "60,000원부터~",
      image: "/shop5.jpg"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${fullTitle} 출장마사지 & 홈타이 안내 - 힐핏`,
    "description": `${fullTitle} 지역 출장마사지 및 힐링 바디케어 제휴업체 정보 제공`,
    "url": `https://healfitmassage.netlify.app/${region}/${encodeURIComponent(districtName)}${dongName ? `?dong=${encodeURIComponent(dongName)}` : ""}`,
    "telephone": "0507-1280-3344",
    "priceRange": "60,000원~",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": districtName,
      "addressRegion": regionName,
      "addressCountry": "KR"
    }
  };

  return (
    <div className="bg-[#08080a] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        
        {/* 상단 지역 대표 배너 */}
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)] bg-gradient-to-b from-neutral-900 to-[#08080a]">
          <img 
            src="/banner.jpg" 
            alt={`${fullTitle} 출장 마사지 및 바디케어 안내`} 
            className="w-full h-56 md:h-72 object-cover filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1">
              {regionName.toUpperCase()} · LOCAL HEALING GUIDE
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-md">
              {fullTitle} 출장마사지 & 홈타이 안내
            </h1>
            <p className="text-xs md:text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">
              {fullTitle} 고객님을 위한 24시 출장 타이·스웨디시 마사지 가이드입니다. 검증된 코스와 100% 후불 안심 시스템을 확인해 보세요.
            </p>
          </div>
        </section>

        {/* 클라이언트 사이드 키워드 믹서 영역 */}
        <ClientTextMixerInline locationText={fullTitle} />

        {/* 제휴업체 5개 카드리스트 */}
        <section className="space-y-6">
          <div className="text-center">
            <p className="text-xs text-amber-400 font-bold tracking-widest uppercase">RECOMMENDED PARTNERS</p>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              {fullTitle} 추천 제휴업체 (총 5곳)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localShops.map((lShop) => (
              <div key={lShop.id} className="bg-[#121216] border border-amber-500/20 hover:border-amber-500/60 rounded-2xl p-4 flex gap-4 items-center shadow-lg transition-all group relative">
                <Link href={`/shop/${lShop.id}`} className="absolute inset-0 z-10" aria-label={`${lShop.name} 상세페이지 보기`} />
                <img 
                  src={lShop.image} 
                  alt={lShop.name} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform" 
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-sm md:text-base text-white truncate group-hover:text-amber-400 transition-colors">
                    {lShop.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                    {lShop.desc}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400">{lShop.price}</span>
                    <a 
                      href={`tel:${lShop.phone}`} 
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow transition-all transform active:scale-95 relative z-20"
                    >
                      전화예약
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 건강 칼럼 섹션 */}
        <section className="bg-[#0f0f13] p-6 md:p-8 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base md:text-lg font-bold text-amber-400 flex items-center gap-2">
            <span>🌿</span> {fullTitle} 힐링 바디케어 & 스트레칭 건강 가이드
          </h3>
          <div className="text-xs text-gray-300 space-y-3 leading-relaxed">
            <p>
              현대 직장인들이 오랫동안 앉아서 일하거나 스마트폰을 지속적으로 사용할 경우, 승모근과 목 주변의 근육이 경직되어 만성 두통이나 피로감을 유발하기 쉽습니다. 주기적인 스트레칭과 맞춤형 전신 바디케어는 체내 순환을 돕고 일상의 활력을 되찾는 데 큰 도움이 됩니다.
            </p>
            <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-2">
              <h4 className="font-bold text-white text-xs">💡 나에게 맞는 테라피 프로그램 선택 기준</h4>
              <ul className="list-disc list-inside space-y-1.5 text-gray-400">
                <li><strong className="text-gray-200">건식 릴렉싱 케어:</strong> 하체 근육과 견갑골 주위의 굳은 부위를 풀어주어 근육 긴장을 해소합니다.</li>
                <li><strong className="text-gray-200">아로마 & 스웨디시:</strong> 최고급 천연 오일로 부드러운 림프 순환과 심신 안정, 부종 완화에 탁월합니다.</li>
                <li><strong className="text-gray-200">프라이빗 홈케어:</strong> 이동 시간 없이 익숙하고 편안한 개인 공간에서 온전한 휴식을 누립니다.</li>
              </ul>
            </div>
            <p className="text-gray-400 text-[11px]">
              * 본 가이드는 {fullTitle} 주민 여러분의 건강한 피로 회복과 올바른 힐링 정보 제공을 목적으로 작성되었습니다.
            </p>
          </div>
        </section>

        {/* 이용 방법 4단계 */}
        <section className="bg-[#0f0f13] p-6 md:p-8 rounded-3xl border border-amber-500/30 space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">SERVICE PROCESS</span>
            <h3 className="text-xl font-black text-white mt-1">{fullTitle} 서비스 이용 순서</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 1</span>
              <h4 className="font-bold text-white mt-1">위치 전달</h4>
              <p className="text-xs text-gray-400 mt-1">{fullTitle} 희망 장소를 알려줍니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 2</span>
              <h4 className="font-bold text-white mt-1">시간 조율</h4>
              <p className="text-xs text-gray-400 mt-1">원하시는 방문 시간을 확인합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 3</span>
              <h4 className="font-bold text-white mt-1">코스 선택</h4>
              <p className="text-xs text-gray-400 mt-1">컨디션에 맞는 프로그램을 선택합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 4</span>
              <h4 className="font-bold text-white mt-1">케어 진행</h4>
              <p className="text-xs text-gray-400 mt-1">도착 후 100% 후불제로 이용합니다.</p>
            </div>
          </div>
        </section>

        {/* 자주 묻는 질문 (FAQ) */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">FAQ & GUIDE</span>
            <h3 className="text-xl font-black text-white mt-1">{fullTitle} 자주 묻는 질문</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-[#121216] p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> {fullTitle} 테라피스트 방문 소요 시간은 얼마나 되나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-emerald-400 font-bold">A.</span> 주요 거점 기준 평균 20분~30분 내외로 신속하게 방문이 가능합니다.
              </p>
            </div>
            <div className="bg-[#121216] p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> 예약금이나 선입금 요청이 있나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-emerald-400 font-bold">A.</span> 힐핏 제휴업체는 100% 후불제로 운영되므로 출발 전 선입금을 절대 요구하지 않습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 내부 크롤링 순환 링크 */}
        <div className="flex justify-center items-center gap-4 text-xs font-semibold text-gray-400 pt-2">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            🏠 메인 홈
          </Link>
          <span>•</span>
          <Link href="/services" className="hover:text-amber-400 transition-colors">
            📋 이용안내
          </Link>
          <span>•</span>
          <Link href="/prices" className="hover:text-amber-400 transition-colors">
            💳 코스&가격
          </Link>
          <span>•</span>
          <Link href="/reviews" className="hover:text-amber-400 transition-colors">
            ⭐ 이용후기
          </Link>
        </div>

      </main>

      {/* 푸터 영역 */}
      <footer className="bg-[#040405] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div>
            <a 
              href="tel:0507-1280-3344" 
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold px-4 py-2 rounded-xl border border-amber-500/30 hover:border-amber-400 transition-all text-xs shadow-md"
            >
              <span>🤝</span> 힐핏 입점 및 제휴문의 (0507-1280-3344)
            </a>
          </div>
          <p className="text-gray-400 font-bold">힐핏(HealFit)은 건전하고 안전한 힐링 테라피 & 바디케어 정보 안내 플랫폼입니다.</p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; HealFit ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}