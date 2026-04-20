import Link from "next/link";

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-background">
      <header className="border-b border-[var(--border)] bg-[var(--surface-card)] px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/vi" className="text-sm font-semibold text-primary hover:underline">
            ← Về website
          </Link>
          <span className="text-xs text-[var(--secondary-text)]">CMS</span>
        </div>
      </header>
      {children}
    </div>
  );
}
