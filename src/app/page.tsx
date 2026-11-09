import Link from "next/link";
import { LayoutDashboard, Palette, Smartphone, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";

// 기능 소개 항목 데이터
const features = [
  {
    icon: Zap,
    title: "빠른 개발 환경",
    description:
      "Next.js 15 App Router 와 TypeScript 로 바로 개발을 시작할 수 있습니다.",
  },
  {
    icon: Palette,
    title: "디자인 시스템",
    description:
      "shadcn/ui 컴포넌트와 Tailwind CSS v4 로 일관된 UI 를 만듭니다.",
  },
  {
    icon: Smartphone,
    title: "반응형 레이아웃",
    description: "모바일 메뉴와 다크 모드가 기본으로 포함되어 있습니다.",
  },
  {
    icon: LayoutDashboard,
    title: "샘플 페이지",
    description: "대시보드와 폼 예제를 참고해 나만의 페이지를 확장해 보세요.",
  },
];

// 홈 페이지: 히어로 영역과 기능 소개 카드
export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16">
      <section className="flex flex-col items-center gap-6 text-center">
        <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
          Next.js 15 · Tailwind CSS v4 · shadcn/ui
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {siteConfig.name}으로 웹 개발을 빠르게 시작하세요
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          {siteConfig.description}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" nativeButton={false} render={<Link href="/dashboard" />}>
            대시보드 보기
          </Button>
          <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/contact" />}>
            문의하기
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <feature.icon className="mb-2 size-6 text-primary" aria-hidden />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
}
