# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

패키지 매니저는 npm 이며 `package-lock.json` 이 있습니다.

```bash
npm install
npm run dev          # 개발 서버 (Turbopack), http://localhost:3000
npm run build        # 프로덕션 빌드 (Turbopack)
npm run start        # 빌드 결과 실행
npm run lint         # ESLint (next/core-web-vitals + next/typescript)
npm run lint:fix
npm run typecheck    # tsc --noEmit
npm run format       # Prettier 전체 포맷
npm run format:check
```

- 테스트 러너(Jest, Vitest 등)가 설정되어 있지 않습니다. 테스트 스크립트와 테스트 파일도 없으므로 "단일 테스트 실행" 명령도 없습니다. 검증은 `typecheck`, `lint`, `build` 로 합니다.
- shadcn/ui 컴포넌트 추가: `npx shadcn@latest add <component-name>`
- 환경 변수는 `.env.local` 에 둡니다. 클라이언트에서 읽을 값만 `NEXT_PUBLIC_` 접두사를 붙입니다.

## 아키텍처

Next.js 15 App Router + React 19 + TypeScript 기반의 스타터킷입니다. 현재 API 라우트, DB, 인증 코드는 없습니다.

### 라우팅과 레이아웃

- `src/app/layout.tsx` 가 루트 레이아웃입니다. Geist 폰트(`next/font/google`)를 CSS 변수로 노출하고, `ThemeProvider`(next-themes, 기본값 `system`) 로 감싼 뒤 `Header` / `<main>` / `Footer` / `Toaster`(sonner) 를 배치합니다. 모든 페이지는 이 레이아웃 안에서 렌더링됩니다.
- 페이지 메타데이터는 루트 layout 의 `title.template` (`%s | Starter Kit`) 을 따릅니다. 페이지별로 `export const metadata` 로 덮어씁니다.
- `loading.tsx`, `error.tsx`, `not-found.tsx` 는 App Router 의 특수 파일입니다.
- 클라이언트 컴포넌트가 필요한 페이지(예: `contact/page.tsx`)는 파일 상단에 `"use client"` 를 선언합니다.

### 메뉴 구성의 단일 출처

- 사이트 이름, 설명, 네비게이션은 `src/config/site.ts` 의 `siteConfig` 한 곳에서 관리합니다. 헤더(`components/layout/header.tsx`)와 모바일 메뉴가 `siteConfig.nav` 를 읽습니다. 메뉴 항목을 추가하려면 `nav` 배열과 `src/app` 아래 라우트를 함께 만들어야 합니다.

### 컴포넌트 구조

- `src/components/ui/` : shadcn/ui 컴포넌트입니다. CLI 로 생성되는 코드이므로 가능하면 직접 수정하지 않습니다.
- `src/components/layout/` : 헤더, 푸터, 모바일 메뉴 등 앱 셸입니다.
- `src/components/theme-provider.tsx`, `theme-toggle.tsx` : 다크 모드 관련입니다.

### shadcn 프리셋의 주의점 (base-nova)

- `components.json` 의 스타일은 `base-nova` 이고, 기반 라이브러리는 Radix 가 아니라 `@base-ui/react` 입니다. 따라서 Radix 의 `asChild` 대신 `render` prop 을 씁니다.

  ```tsx
  <Button render={<Link href="/contact" />}>문의하기</Button>
  ```

- 링크 역할을 하는 `Button` 에는 `nativeButton={false}` 를 같이 지정해야 합니다 (최근 커밋 `0f5d53b` 참고).
- `components/ui/button.tsx` 는 `cn` 을 `"cn"` npm 패키지에서 import 합니다. 반면 `src/lib/utils.ts` 에도 `cn()` 이 있으니, 새 파일을 만들 때는 `@/lib/utils` 를 쓰는 쪽으로 맞추는 것이 일관적입니다. (현재 두 곳이 섞여 있습니다.)

### 스타일링

- Tailwind CSS v4 를 쓰며 `tailwind.config` 파일이 없습니다. 모든 설정은 `src/app/globals.css` 에 있습니다.
- 색상, 반경 등 디자인 토큰은 `globals.css` 의 `:root` / `.dark` 변수에서 수정합니다. `@theme inline` 블록이 이 변수를 Tailwind 색상 토큰으로 연결합니다.
- 다크 모드는 `.dark` 클래스 기반입니다 (`@custom-variant dark`).
- Prettier 는 `prettier-plugin-tailwindcss` 로 클래스 순서를 정렬하고, `cn` / `cva` 호출 안의 클래스도 정렬합니다.

### 폼과 검증

- 폼은 `react-hook-form` + `zod` v4 + `@hookform/resolvers` 조합입니다. 예시는 `src/app/contact/page.tsx` 에 있습니다.
- 샘플 폼은 실제로 전송하지 않습니다. 주석대로 Server Action 이나 API 로 교체해야 합니다.
- 알림은 `sonner` 토스트를 씁니다 (`components/ui/sonner.tsx`, 루트 layout 에 마운트됨).

### 경로 별칭

- `@/*` 는 `src/*` 로 매핑됩니다 (`tsconfig.json`).

## 컨벤션

- 사용자 전역 규칙에 따라 코드 주석과 문서는 한국어로 작성합니다. 기존 파일의 주석 스타일을 따릅니다.
- Prettier 설정: 들여쓰기 2칸, 세미콜론 사용, 큰따옴표, `trailingComma: es5`, `printWidth: 80`.
- 커밋 메시지는 `fix:`, `chore:` 같은 Conventional Commits 접두사를 씁니다 (git 로그 기준).
