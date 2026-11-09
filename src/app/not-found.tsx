import Link from "next/link";

import { Button } from "@/components/ui/button";

// 존재하지 않는 경로 접근 시 표시되는 404 페이지
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="text-3xl font-bold tracking-tight">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="text-muted-foreground">
        요청하신 페이지가 없거나 주소가 변경되었을 수 있습니다.
      </p>
      <Button nativeButton={false} render={<Link href="/" />}>홈으로 돌아가기</Button>
    </div>
  );
}
