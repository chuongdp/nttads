type TopPromoBarProps = {
  tagline: string;
};

export function TopPromoBar({ tagline }: TopPromoBarProps) {
  return (
    <div className="border-b border-[var(--border)] bg-[var(--surface-card)] text-[var(--foreground)]">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center px-4 py-2 text-xs font-medium md:px-6 md:text-sm">
        <span className="text-[var(--body-muted)]">{tagline}</span>
      </div>
    </div>
  );
}
