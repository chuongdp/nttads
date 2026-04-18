import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { dictionaries, isSupportedLocale } from "@/lib/i18n";
import { servicePageCopy, serviceSlugs } from "@/lib/service-content";
import { notFound } from "next/navigation";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale: loc } = await params;
  if (!isSupportedLocale(loc)) notFound();

  const locale = loc as Locale;
  const dict = dictionaries[locale];
  const copy = servicePageCopy[locale];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
        {dict.servicesIndex.title}
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--body-muted)] leading-relaxed">{dict.servicesIndex.intro}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {serviceSlugs.map((slug) => {
          const s = copy[slug];
          return (
            <Link
              key={slug}
              href={`/${locale}/services/${slug}`}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] p-6 shadow-[0_2px_4px_rgba(0,0,0,0.06)] transition hover:border-primary/30 hover:shadow-[0_8px_28px_-8px_color-mix(in_srgb,var(--primary)_22%,transparent)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
            >
              <h2 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-primary">
                {s.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--body-muted)]">{s.summary}</p>
              <span className="mt-4 inline-block text-sm font-medium text-primary">
                {dict.servicesIndex.viewDetail} →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
