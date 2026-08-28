import type { Metadata } from "next";
import Link from "next/link";
import ClientTextMixer from "@/components/ClientTextMixer";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
  }>;
  searchParams: Promise<{
    dong?: string;
  }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { region, district } = resolvedParams;
  const dongName = resolvedSearchParams.dong ? decodeURIComponent(resolvedSearchParams.dong) : "";
  const districtName = decodeURIComponent(district);
  const regionName = region === "seoul" ? "서울" : region === "incheon" ? "인천" : "경기";

  const locationKeyword = `${regionName} ${districtName} ${dongName}`.trim();
  const simpleLocation = dongName ? `${districtName} ${dongName}` : districtName;

  const charSum = (locationKeyword + dongName + districtName + "healfit_unique_seed").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 50;

  const titleVariants = [
    /* 0 */ `${locationKeyword} 출장마사지 힐링 추천 · 24시 빠른 방문 - 힐핏`,
    /* 1 */ `[힐핏] ${locationKeyword} 출장마사지 프라이빗 케어 | 안심 후불제`,
    /* 2 */ `${simpleLocation} 출장마사지 24시간 실시간 예약 | ${regionName} 힐핏`,
    /* 3 */ `${locationKeyword} 출장마사지 엄선된 테라피 매장 정보 & 코스 가이드`,
    /* 4 */ `프리미엄 ${locationKeyword} 출장마사지 빠른 도착 | 스웨디시 전문 힐핏`,
    /* 5 */ `힐핏 공식 | ${simpleLocation} 출장마사지 선입금 없는 안심 테라피`,
    /* 6 */ `${locationKeyword} 출장마사지 신속 매칭 · 100% 후불 방문 바디케어`,
    /* 7 */ `${regionName} ${simpleLocation} 출장마사지 24시 프라이빗 릴렉스 가이드`,
    /* 8 */ `${locationKeyword} 출장마사지 만족도 1위 | 1:1 맞춤형 피로 해소`,
    /* 9 */ `[24시 출장] ${locationKeyword} 출장마사지 검증 매장 모음 · 힐핏`,
    /* 10 */ `${simpleLocation} 출장마사지 시그니처 홈케어 | 후불 안심 테라피`,
    /* 11 */ `${locationKeyword} 출장마사지 평균 25분 내 빠른 방문 힐링 - 힐핏`,
    /* 12 */ `단독 힐링 ${locationKeyword} 출장마사지 | 타이·아로마·감성 스웨디시`,
    /* 13 */ `${locationKeyword} 출장마사지 24시 제휴 프로그램 및 요금 상세 안내`,
    /* 14 */ `${simpleLocation} 출장마사지 베테랑 힐러 케어 | 100% 후불 보장`,
    /* 15 */ `${locationKeyword} 출장마사지 신속 예약 시스템 | 힐핏 테라피 안내`,
    /* 16 */ `[힐핏 케어] ${locationKeyword} 출장마사지 전문 테라피스트 방문`,
    /* 17 */ `${locationKeyword} 출장마사지 이용 안내 | 스웨디시·아로마 힐링 가이드`,
    /* 18 */ `${simpleLocation} 출장마사지 24시간 언제 어디서나 신속 도착`,
    /* 19 */ `${locationKeyword} 출장마사지 선입금 0원 | 100% 안전 후불 바디케어`,
    /* 20 */ `${regionName} ${simpleLocation} 출장마사지 품격 있는 힐링 제휴 가이드`,
    /* 21 */ `${locationKeyword} 출장마사지 고객 평점 5.0 신속 24시 방문 서비스`,
    /* 22 */ `[힐핏 추천] ${locationKeyword} 출장마사지 코스별 가격 & 혜택 안내`,
    /* 23 */ `${simpleLocation} 출장마사지 25분 신속 도착으로 누리는 휴식 타임`,
    /* 24 */ `${locationKeyword} 출장마사지 1:1 전담 케어 | 후불제 홈테라피 힐핏`,
    /* 25 */ `힐핏 파트너 ${locationKeyword} 출장마사지 24시 안심 방문 시스템`,
    /* 26 */ `${locationKeyword} 출장마사지 정통 타이 & 프리미엄 아로마 케어`,
    /* 27 */ `${simpleLocation} 출장마사지 실시간 예약 가이드 · 100% 후불 안심`,
    /* 28 */ `${locationKeyword} 출장마사지 친절 방문 케어 | 전신 릴렉스 피로회복`,
    /* 29 */ `[24시 신속] ${simpleLocation} 출장마사지 고품격 테라피 안내 - 힐핏`,
    /* 30 */ `${locationKeyword} 출장마사지 VIP 프리미엄 제휴점 안내 · 힐핏`,
    /* 31 */ `${locationKeyword} 출장마사지 내 위치 기반 빠른 방문 케어 플랫폼`,
    /* 32 */ `${simpleLocation} 출장마사지 24시간 후불 예약 및 간편 이용 팁`,
    /* 33 */ `${locationKeyword} 출장마사지 투명하고 정직한 1:1 방문 맞춤 케어`,
    /* 34 */ `[힐핏] ${simpleLocation} 출장마사지 검증된 추천 매장 모음집`,
    /* 35 */ `${locationKeyword} 출장마사지 릴렉싱 코스 및 투명한 가격 안내`,
    /* 36 */ `${locationKeyword} 출장마사지 선입금 요구 절대 없는 안심 방문 케어`,
    /* 37 */ `${simpleLocation} 출장마사지 전문 관리사 신속 배치 서비스`,
    /* 38 */ `${locationKeyword} 출장마사지 나만의 프라이빗한 휴식 공간 완성`,
    /* 39 */ `[24시 힐링] ${locationKeyword} 출장마사지 안심 후불 시스템 안내`,
    /* 40 */ `${locationKeyword} 출장마사지 최고급 오일 테라피 제휴 정보 가이드`,
    /* 41 */ `${simpleLocation} 출장마사지 건전 방문 힐링 케어 추천 - 힐핏`,
    /* 42 */ `${locationKeyword} 출장마사지 뭉친 피로가 풀리는 1:1 맞춤 테라피`,
    /* 43 */ `힐핏 추천 | ${locationKeyword} 출장마사지 25분 내 빠른 방문`,
    /* 44 */ `${simpleLocation} 출장마사지 엄선된 24시 프리미엄 제휴 샵 목록`,
    /* 45 */ `${locationKeyword} 출장마사지 후불제 24시 스웨디시 전문 힐핏 안내`,
    /* 46 */ `${locationKeyword} 출장마사지 집에서 편안하게 받는 힐링 바디케어`,
    /* 47 */ `[안심후불] ${simpleLocation} 출장마사지 24시간 프라이빗 테라피`,
    /* 48 */ `${locationKeyword} 출장마사지 유기농 아로마 오일 테라피 프로그램`,
    /* 49 */ `${locationKeyword} 출장마사지 간편 예약 및 솔직 후기 확인 - 힐핏`
  ];

  const descriptionVariants = [
    /* 0 */ `${locationKeyword} 출장마사지 25분 신속 도착! 예약금 없는 100% 안심 후불제. 타이, 아로마, 스웨디시 전문 제휴점 정보를 힐핏에서 확인하세요.`,
    /* 1 */ `프라이빗 힐링의 시작! ${locationKeyword} 24시 출장마사지 및 홈케어 가이드. 베테랑 관리사의 맞춤형 1:1 바디케어 서비스를 즉시 연결해 드립니다.`,
    /* 2 */ `${locationKeyword} 전지역 신속 출장마사지 예약. 선입금 사기 걱정 없는 후불제 시스템과 투명한 코스 안내를 제공하는 힐핏 공식 서비스입니다.`,
    /* 3 */ `${simpleLocation} 고객을 위한 24시 안심 출장마사지 안내. 스웨디시, 아로마 릴렉싱 프로그램과 실시간 전화 연결로 편안한 휴식을 누려보세요.`,
    /* 4 */ `${locationKeyword} 출장마사지 찾으시나요? 선입금 0원, 100% 후불제로 안심하고 이용하는 프라이빗 홈케어 전문 테라피 가이드입니다.`,
    /* 5 */ `지친 일상의 스트레스를 날려줄 ${locationKeyword} 24시 출장마사지. 빠른 방문과 숙련된 힐러진의 품격 있는 서비스를 지금 바로 경험하세요.`,
    /* 6 */ `${locationKeyword} 어디든 25분 내 방문! 선입금 없는 안심 후불제 출장마사지와 힐링 바디케어 코스를 엄선하여 정직하게 소개해 드립니다.`,
    /* 7 */ `${simpleLocation} 출장마사지 전문 제휴업체 안내. 24시간 언제든 익숙한 개인 공간에서 편안하게 누리는 최고급 스웨디시 힐링 케어입니다.`,
    /* 8 */ `${locationKeyword} 믿을 수 있는 후불제 출장마사지 정보. 타이, 아로마, 전신 오일 테라피까지 합리적인 가격과 코스를 한눈에 비교하세요.`,
    /* 9 */ `힐핏이 보장하는 ${locationKeyword} 출장마사지 안심 서비스! 선입금 요구 없이 관리사 도착 후 결제하는 100% 안전 시스템입니다.`,
    /* 10 */ `${locationKeyword} 24시 방문 홈케어 및 출장마사지 완벽 안내. 맞춤형 릴렉스 케어로 뭉친 근육과 묵은 피로를 상쾌하게 풀어드립니다.`,
    /* 11 */ `${simpleLocation} 출장마사지 코스별 이용 요금 안내. 24시간 친절 상담과 빠른 방문 배차로 고객 만족도를 극대화해 드립니다.`,
    /* 12 */ `${locationKeyword} 출장마사지 릴렉싱 프로그램. 프라이빗 맞춤 테라피로 지친 심신에 깊은 휴식과 새로운 활력을 선사해 드립니다.`,
    /* 13 */ `${locationKeyword} 24시 출장마사지 예약 가이드. 예약금 피해 걱정 없는 100% 후불제 제휴점 정보만을 선별하여 투명하게 전달합니다.`,
    /* 14 */ `${simpleLocation} 어디서나 신속 방문하는 24시 출장마사지. 타이, 아로마, 스웨디시 중 내 몸에 꼭 맞는 힐링 프로그램을 추천합니다.`,
    /* 15 */ `${locationKeyword} 출장마사지 안심 안내! 예약금 요구가 전혀 없는 정직한 100% 후불 시스템으로 부담 없이 힐링을 누려보세요.`,
    /* 16 */ `전문 힐러의 섬세한 손길로 만나는 ${locationKeyword} 출장마사지. 빠른 도착 시간과 투명한 코스별 가격 정보를 안내해 드립니다.`,
    /* 17 */ `${simpleLocation} 24시 방문 홈케어 & 출장마사지 서비스. 쌓인 스트레스와 굳은 어깨를 부드럽고 시원하게 이완시켜 드립니다.`,
    /* 18 */ `${locationKeyword} 출장마사지 엄선 제휴점 안내. 선입금 제로, 검증된 1:1 방문 맞춤 케어 프로그램으로 만족스러운 힐링을 약속합니다.`,
    /* 19 */ `${locationKeyword} 인근 25분 내 출동하는 출장마사지 케어! 친절한 상담과 신속한 매칭으로 언제나 편리하게 이용하실 수 있습니다.`,
    /* 20 */ `${simpleLocation} 고객 만족도 1위 후불제 출장마사지 가이드. 전신 아로마, 감성 스웨디시 코스로 깊은 피로를 부드럽게 녹여보세요.`,
    /* 21 */ `${locationKeyword} 출장마사지 24시 연중무휴 운영! 100% 후불 안심 예약 서비스로 늦은 밤에도 부담 없이 편안하게 이용하세요.`,
    /* 22 */ `힐핏 공식 ${locationKeyword} 출장마사지 정보 안내. 신속한 방문과 차별화된 프리미엄 홈케어 힐링 서비스를 직접 만나보세요.`,
    /* 23 */ `${simpleLocation} 전문 출장마사지 안내. 1:1 맞춤 피로회복 솔루션으로 가장 편안하고 쾌적한 힐링 시간을 선물해 드립니다.`,
    /* 24 */ `${locationKeyword} 전지역 출장마사지 빠른 예약! 선입금 없는 안심 후불제로 즐기는 럭셔리 스웨디시 & 아로마 바디케어.`,
    /* 25 */ `지친 몸에 활력을 불어넣는 ${locationKeyword} 24시 출장마사지. 검증된 전문 테라피스트의 다채로운 힐링 코스를 추천합니다.`,
    /* 26 */ `${simpleLocation} 출장마사지 코스 구성 및 가격 상세 안내. 24시간 원하는 시간대에 맞춰 방문하는 프라이빗 힐링 케어입니다.`,
    /* 27 */ `${locationKeyword} 출장마사지 안심 후불 추천! 출발 전 선입금을 절대 요구하지 않는 안전하고 투명한 제휴점만 모았습니다.`,
    /* 28 */ `${locationKeyword} 25분 신속 방문 홈케어 & 출장마사지. 뭉친 승모근과 하체 피로를 개운하고 시원하게 풀어드립니다.`,
    /* 29 */ `${simpleLocation} 고객님을 위한 최상의 24시 출장마사지 제휴 안내. 정직한 서비스와 명확한 요금 정보를 힐핏에서 확인하세요.`,
    /* 30 */ `${locationKeyword} 출장마사지 건식, 아로마, 스웨디시 맞춤 케어! 편안한 내 공간에서 이동 없이 누리는 프라이빗 스파.`,
    /* 31 */ `100% 후불제로 믿을 수 있는 ${locationKeyword} 24시 출장마사지. 빠른 방문과 친절한 서비스로 고객님을 정성껏 모십니다.`,
    /* 32 */ `${simpleLocation} 출장마사지 힐링 프로그램 모음. 24시간 언제든 빠르게 이용할 수 있는 수도권 안심 방문 가이드입니다.`,
    /* 33 */ `${locationKeyword} 출장마사지 전문 제휴 샵 안내. 신속한 방문 서비스와 꼼꼼한 전신 근육 이완 케어를 제공해 드립니다.`,
    /* 34 */ `${locationKeyword} 인근 24시 안심 출장마사지 이용 팁. 예약부터 도착까지 100% 후불제로 투명하고 안전하게 진행됩니다.`,
    /* 35 */ `${simpleLocation} 출장마사지 전문 테라피스트 빠른 배치. 최고급 아로마 및 스웨디시 코스로 완벽한 피로 회복을 돕습니다.`,
    /* 36 */ `${locationKeyword} 24시 출장마사지 신속 방문 보장. 사기 걱정 없는 100% 안심 후불제 시스템으로 언제든 편하게 이용하세요.`,
    /* 37 */ `${locationKeyword} 출장마사지 1:1 맞춤 테라피 안내. 지친 일상 속 온전한 휴식과 릴렉싱을 선사하는 프리미엄 제휴 정보.`,
    /* 38 */ `${simpleLocation} 25분 내 빠른 출동 출장마사지! 전신 근육 긴장 완화 및 심신 안정을 돕는 고품격 홈케어 서비스.`,
    /* 39 */ `힐핏에서 엄선한 ${locationKeyword} 24시 출장마사지 제휴점. 투명하고 정직한 서비스 정보와 코스별 가격을 안내합니다.`,
    /* 40 */ `${locationKeyword} 출장마사지 타이 & 스웨디시 정보. 선입금 요구가 일체 없는 안전한 100% 후불 매장만 선별했습니다.`,
    /* 41 */ `${simpleLocation} 출장마사지 24시간 실시간 예약 지원. 나만의 아늑한 공간에서 편안하게 묵은 피로를 풀어보세요.`,
    /* 42 */ `${locationKeyword} 출장마사지 릴렉스 전문 가이드. 정직한 가격표와 베테랑 힐러의 수준 높은 방문 바디케어 서비스.`,
    /* 43 */ `${locationKeyword} 전지역 24시 신속 방문 출장마사지. 최고급 오일 테라피로 지친 몸과 마음에 편안한 쉼을 선물합니다.`,
    /* 44 */ `${simpleLocation} 출장마사지 제휴업체 실시간 가이드. 100% 후불 안전 결제와 깔끔하고 위생적인 서비스 구성.`,
    /* 45 */ `${locationKeyword} 출장마사지 빠른 예약 안내. 24시간 편한 시간에 맞춰 방문하는 1:1 맞춤 피로해소 테라피.`,
    /* 46 */ `${locationKeyword} 출장마사지 추천 가이드! 선입금 없는 후불제로 마음 편히 누리는 프리미엄 프라이빗 바디케어.`,
    /* 47 */ `${simpleLocation} 출장마사지 신속 방문 시스템. 전문 테라피스트가 직접 방문하여 품격 있는 힐링을 선사합니다.`,
    /* 48 */ `${locationKeyword} 24시 방문 홈케어 및 출장마사지 정보. 코스별 요금 및 빠른 전화 예약 서비스를 제공합니다.`,
    /* 49 */ `${locationKeyword} 출장마사지 안심 이용 가이드. 100% 후불제 시스템과 정직한 제휴업체 정보로 만족도를 높여드립니다.`
  ];

  const finalTitle = titleVariants[variantIndex];
  const finalDescription = descriptionVariants[variantIndex];

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: [
      `${locationKeyword} 출장마사지`,
      `${locationKeyword}출장마사지`,
      `${simpleLocation} 출장마사지`,
      `${locationKeyword} 홈케어`,
      `${locationKeyword} 방문 마사지`,
      `${locationKeyword} 스웨디시`,
      "24시 출장마사지",
      "후불제 출장마사지",
      "힐핏"
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
          alt: `${locationKeyword} 출장마사지 - 힐핏`,
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
    "name": `${fullTitle} 출장마사지 & 홈케어 안내 - 힐핏`,
    "description": `${fullTitle} 지역 출장마사지, 방문 바디케어 및 힐링 테라피 제휴업체 정보 제공`,
    "url": `https://healfitmassage.netlify.app/${region}/${encodeURIComponent(districtName)}`,
    "telephone": "0507-1280-3344",
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
            alt={`${fullTitle} 출장마사지 및 바디케어 안내`} 
            className="w-full h-56 md:h-72 object-cover filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1">
              {regionName.toUpperCase()} · LOCAL HEALING GUIDE
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-md">
              {fullTitle} 출장마사지 & 홈케어 안내
            </h1>
            <p className="text-xs md:text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">
              {fullTitle} 고객님을 위한 24시 출장마사지 가이드입니다. 검증된 테라피 코스와 100% 후불 안심 시스템을 확인해 보세요.
            </p>
          </div>
        </section>

        {/* 클라이언트 사이드 키워드 믹서 영역 */}
        <ClientTextMixer locationText={fullTitle} />

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
                <span className="text-amber-400">Q.</span> {fullTitle} 출장마사지 방문 소요 시간은 얼마나 되나요?
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