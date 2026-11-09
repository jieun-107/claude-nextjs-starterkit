# Starter Kit

Next.js 15 App Router 기반의 웹 개발 스타터킷입니다. TypeScript, Tailwind CSS v4, shadcn/ui, lucide-react 를 기본으로 구성했습니다.

## 기술 스택

| 분류 | 사용 기술 |
| --- | --- |
| 프레임워크 | Next.js 15 (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 (`tailwind.config` 없이 CSS 기반 설정) |
| UI 컴포넌트 | shadcn/ui (base-nova 프리셋, `@base-ui/react` 기반) |
| 아이콘 | lucide-react |
| 다크 모드 | next-themes |
| 폼 / 검증 | react-hook-form, zod v4, @hookform/resolvers |
| 알림 | sonner |
| 코드 품질 | ESLint, Prettier (+ prettier-plugin-tailwindcss) |

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열면 확인할 수 있습니다.

## 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (Turbopack) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |
| `npm run lint:fix` | ESLint 자동 수정 |
| `npm run typecheck` | TypeScript 타입 검사 |
| `npm run format` | Prettier 로 전체 포맷 |
| `npm run format:check` | 포맷 위반 여부만 검사 |

## 폴더 구조

```
src/
├─ app/                  # App Router 라우트
│  ├─ layout.tsx         # 루트 레이아웃 (폰트, 테마, 헤더/푸터, 토스트)
│  ├─ page.tsx           # 홈
│  ├─ dashboard/page.tsx # 대시보드 샘플
│  ├─ contact/page.tsx   # 폼 샘플 (react-hook-form + zod)
│  ├─ loading.tsx        # 로딩 UI
│  ├─ error.tsx          # 에러 UI
│  ├─ not-found.tsx      # 404 UI
│  └─ globals.css        # Tailwind 진입점 및 테마 변수
├─ components/
│  ├─ ui/                # shadcn/ui 컴포넌트 (CLI 로 추가)
│  ├─ layout/            # 헤더, 푸터, 모바일 메뉴
│  ├─ theme-provider.tsx # 다크 모드 프로바이더
│  └─ theme-toggle.tsx   # 테마 전환 버튼
├─ config/
│  └─ site.ts            # 사이트 이름, 설명, 네비게이션 메뉴
└─ lib/
   └─ utils.ts           # cn() 유틸리티
```

## 자주 하는 작업

### 페이지 추가

`src/app` 아래에 폴더를 만들고 `page.tsx` 를 작성하면 라우트가 생성됩니다. 메뉴에 노출하려면 `src/config/site.ts` 의 `nav` 배열에 항목을 추가하세요.

### shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add <component-name>
```

이 프리셋은 `@base-ui/react` 기반이므로 Radix 의 `asChild` 대신 `render` prop 을 사용합니다.

```tsx
<Button render={<Link href="/contact" />}>문의하기</Button>
```

### 테마 색상 변경

Tailwind 설정 파일이 없으므로 색상과 반경 같은 디자인 토큰은 `src/app/globals.css` 의 `:root` / `.dark` 변수에서 수정합니다.

### 환경 변수

`.env.local` 파일에 값을 추가하세요. 클라이언트에서 쓸 값은 `NEXT_PUBLIC_` 접두사가 필요합니다.

## 참고 문서

- [Next.js 설치 가이드](https://nextjs.org/docs/app/getting-started/installation)
- [Tailwind CSS v4 Next.js 가이드](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [shadcn/ui 설치 가이드 (Next.js)](https://ui.shadcn.com/docs/installation/next)
- [shadcn/ui Tailwind v4 가이드](https://ui.shadcn.com/docs/tailwind-v4)
