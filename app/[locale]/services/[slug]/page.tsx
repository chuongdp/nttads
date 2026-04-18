import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceDetailShowcase } from "@/components/services/service-detail-showcase";
import type { Locale } from "@/lib/i18n";
import { dictionaries, isSupportedLocale } from "@/lib/i18n";
import { getServicePageCopy, serviceHasShowcaseLayout, serviceSlugs, type ServiceSlug } from "@/lib/service-content";

type ServiceDetailProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const paths: { locale: Locale; slug: ServiceSlug }[] = [];
  for (const locale of ["vi", "en", "zh"] as const) {
    for (const slug of serviceSlugs) {
      paths.push({ locale, slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: ServiceDetailProps) {
  const { locale: loc, slug } = await params;
  if (!isSupportedLocale(loc)) return { title: "Service" };
  const copy = getServicePageCopy(loc, slug);
  if (!copy) return { title: "Service" };
  const brand = dictionaries[loc].brand;
  return { title: `${copy.title} | ${brand}` };
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { locale: loc, slug } = await params;
  if (!isSupportedLocale(loc)) notFound();

  const copy = getServicePageCopy(loc, slug);
  if (!copy) notFound();

  const dict = dictionaries[loc];
  const servicesHref = `/${loc}/services`;
  const deliverablesTitle =
    loc === "vi" ? "Phạm vi triển khai" : loc === "zh" ? "交付范围" : "What we deliver";
  const useShowcase = serviceHasShowcaseLayout(copy);
  const slugTyped = slug as ServiceSlug;

  return (
    <article className="mx-auto max-w-6xl px-4 py-12">
      <nav className="text-sm text-[var(--body-muted)]">
        <Link href={`/${loc}`} className="text-primary hover:underline">
          {dict.nav.home}
        </Link>
        <span className="mx-2 text-[var(--secondary-text)]">/</span>
        <Link href={servicesHref} className="text-primary hover:underline">
          {dict.nav.services}
        </Link>
        <span className="mx-2 text-[var(--secondary-text)]">/</span>
        <span className="text-[var(--foreground)]">{copy.title}</span>
      </nav>

      {useShowcase ? (
        <div className="mt-8">
          <ServiceDetailShowcase
            copy={copy}
            locale={loc}
            slug={slugTyped}
            deliverablesTitle={deliverablesTitle}
          />
        </div>
      ) : (
        <>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--body-muted)]">{copy.lead}</p>

          <div className="mt-10 space-y-10">
            {copy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold text-[var(--foreground)]">{section.heading}</h2>
                <div className="mt-3 space-y-3 text-[var(--body-muted)] leading-relaxed">
                  {section.paragraphs.map((p, i) => (
                    <p key={`${section.heading}-${i}`}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface-nested)] p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">{deliverablesTitle}</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-[var(--body-muted)]">
              {copy.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      <p className="mt-10">
        <Link
          href={servicesHref}
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          ← {dict.nav.services}
        </Link>
      </p>
    </article>
  );
}
