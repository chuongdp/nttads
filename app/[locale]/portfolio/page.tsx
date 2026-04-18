import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionaries, isSupportedLocale, type Locale } from "@/lib/i18n";
import { portfolioPageBundles } from "@/lib/portfolio-data";

type PortfolioPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PortfolioPageProps) {
  const { locale: loc } = await params;
  if (!isSupportedLocale(loc)) return { title: "Portfolio" };
  const locale = loc as Locale;
  const bundle = portfolioPageBundles[locale];
  const brand = dictionaries[locale].brand;
  return { title: `${bundle.title} | ${brand}` };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { locale: loc } = await params;
  if (!isSupportedLocale(loc)) notFound();

  const locale = loc as Locale;
  const dict = dictionaries[locale];
  const bundle = portfolioPageBundles[locale];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav className="text-sm text-[var(--body-muted)]">
        <Link href={`/${locale}`} className="text-primary hover:underline">
          {dict.nav.home}
        </Link>
        <span className="mx-2 text-[var(--secondary-text)]">/</span>
        <span className="text-[var(--foreground)]">{dict.nav.portfolio}</span>
      </nav>

      <header className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
          {bundle.title}
        </h1>
        <p className="mt-3 leading-relaxed text-[var(--body-muted)]">{bundle.intro}</p>
        <p className="mt-4 rounded-xl border border-amber-500/25 bg-amber-500/[0.06] px-4 py-3 text-sm leading-relaxed text-[var(--foreground)] dark:border-amber-400/20 dark:bg-amber-400/[0.08]">
          {bundle.disclaimer}
        </p>
      </header>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {bundle.projects.map((p) => (
          <li
            key={p.title}
            className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition hover:border-primary/25 dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
          >
            <h2 className="text-lg font-semibold leading-snug text-[var(--foreground)]">{p.title}</h2>
            <p className="mt-1 text-sm font-medium text-primary">{p.client}</p>
            <p className="mt-3 text-xs text-[var(--secondary-text)]">
              <span className="font-medium text-[var(--foreground)]">{bundle.labels.industry}:</span> {p.industry}
            </p>
            <div className="mt-3">
              <p className="text-xs font-medium text-[var(--foreground)]">{bundle.labels.channels}</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {p.channels.map((c) => (
                  <span
                    key={c}
                    className="rounded-md bg-[var(--surface-nested)] px-2 py-0.5 text-[11px] font-medium text-[var(--body-muted)] ring-1 ring-[var(--border)]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--body-muted)]">{p.summary}</p>
            <p className="mt-4 border-t border-[var(--border)] pt-4 text-sm">
              <span className="font-semibold text-[var(--foreground)]">{bundle.labels.highlight}: </span>
              <span className="text-[var(--body-muted)]">{p.highlight}</span>
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-center">
        <Link
          href={`/${locale}/services`}
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          ← {dict.nav.services}
        </Link>
      </p>
    </div>
  );
}
