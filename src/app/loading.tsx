import { Skeleton } from "@/components/ui/skeleton";

// 페이지 전환 시 표시되는 로딩 UI (Suspense 경계로 동작)
export default function Loading() {
  return (
    <div
      className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10"
      aria-busy="true"
    >
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-xl" />
    </div>
  );
}
