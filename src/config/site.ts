// 사이트 전역 설정: 이름, 설명, 네비게이션 메뉴를 한 곳에서 관리합니다.
export const siteConfig = {
  name: "Starter Kit",
  description:
    "Next.js 15 · TypeScript · Tailwind CSS v4 · shadcn/ui 기반의 웹 개발 스타터킷",
  nav: [
    { title: "홈", href: "/" },
    { title: "대시보드", href: "/dashboard" },
    { title: "문의하기", href: "/contact" },
  ],
} as const;
