"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { useCmsDictionary } from "@/context/cms-dictionary-context";

const locales: Locale[] = ["vi", "en", "zh"];

export function CmsHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const t = useCmsDictionary();

  function hrefFor(target: Locale): string {
    const m = pathname.match(/^\/(vi|en|zh)(\/.*)?$/);
    if (!m) return `/${target}/cms/dashboard`;
    const rest = m[2] ?? "/cms/dashboard";
    return `/${target}${rest}`;
  }

  const localeLabels: Record<Locale, string> = {
    vi: t.layout.localeVi,
    en: t.layout.localeEn,
    zh: t.layout.localeZh,
  };

  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface-card)] px-4 py-3">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <Link href={`/${locale}`} className="text-sm font-semibold text-primary hover:underline">
          {t.layout.backToSite}
        </Link>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-md bg-[var(--surface-nested)] px-2 py-1 text-[var(--secondary-text)]">
            {t.layout.cmsBadge}
          </span>
          {locales.map((l) => (
            <Link
              key={l}
              href={hrefFor(l)}
              className={`rounded-full px-2.5 py-1 font-medium ${
                l === locale ? "bg-primary text-white" : "text-[var(--body-muted)] hover:text-primary"
              }`}
              title={localeLabels[l]}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
