import { siteConfig } from "@/config/site";

// 하단 푸터: 저작권 정보
export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
        <p>{siteConfig.description}</p>
      </div>
    </footer>
  );
}
