"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

// 라우트 세그먼트에서 에러 발생 시 표시되는 에러 경계 UI
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅 (필요 시 Sentry 등 외부 서비스로 전송)
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="text-3xl font-bold tracking-tight">문제가 발생했습니다</h1>
      <p className="text-muted-foreground">
        잠시 후 다시 시도해 주세요. 문제가 계속되면 문의해 주세요.
      </p>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
