import Link from "next/link";
import {
  Film,
  Hash,
  Image as ImageIcon,
  Images,
  Layers,
  LayoutGrid,
  PlayCircle,
  Rocket,
  Scan,
  Search,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Video,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ServicePageCopy, ServiceSlug } from "@/lib/service-content";
import { SiteImageBlock } from "@/components/media/site-image-block";

const FORMAT_ICONS: Record<Extract<ServiceSlug, "google-ads" | "facebook-ads" | "tiktok-ads">, LucideIcon[]> = {
  "google-ads": [Search, LayoutGrid, ShoppingBag, PlayCircle, Smartphone],
  "facebook-ads": [ImageIcon, Video, Layers, Images, Scan, Film],
  "tiktok-ads": [Film, Sparkles, Rocket, Hash, Wand2],
};

type ServiceFacebookDistributedProps = {
  copy: ServicePageCopy;
  locale: Locale;
  deliverablesTitle: string;
  images: string[];
  serviceImageAlt: string;
  slug: Extract<ServiceSlug, "google-ads" | "facebook-ads" | "tiktok-ads">;
};

function at(images: string[], i: number): string | undefined {
  return images[i];
}

export function ServiceFacebookDistributed({
  copy,
  locale,
  deliverablesTitle,
  images,
  serviceImageAlt,
  slug,
}: ServiceFacebookDistributedProps) {
  const headline = copy.solutionHeadline ?? copy.title;
  const contactHref = `/${locale}#contact`;
  const cta = copy.ctaLabel ?? "Contact";
  const benefits = copy.benefits ?? [];
  const formatIcons = FORMAT_ICONS[slug];

  return (
    <div className="space-y-16 md:space-y-20">
      <header className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-primary/[0.12] via-[var(--surface-card)] to-[var(--surface-nested)] px-6 py-10 shadow-[0_8px_40px_-20px_color-mix(in_srgb,var(--primary)_35%,transparent)] md:px-10 md:py-14">
        <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/[0.07] blur-3xl" aria-hidden />
        <p className="text-sm font-medium uppercase tracking-wider text-primary">{copy.title}</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl lg:text-[2.35rem] lg:leading-tight">
          {headline}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--body-muted)]">{copy.summary}</p>
        <p className="mt-5 max-w-2xl leading-relaxed text-[var(--body-muted)]">{copy.lead}</p>
        <div className="mt-8">
          <Link
            href={contactHref}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            {cta}
          </Link>
        </div>
      </header>

      <section
        aria-labelledby={`${slug}-intro-heading`}
        className="grid gap-10 rounded-3xl border border-[var(--border)] bg-[var(--surface-card)] px-6 py-10 md:grid-cols-2 md:items-center md:gap-12 md:px-10 md:py-12"
      >
        <div className="min-w-0">
          <h2 id={`${slug}-intro-heading`} className="text-xl font-semibold text-[var(--foreground)] md:text-2xl">
            {copy.summary}
          </h2>
        </div>
        <SiteImageBlock
          src={at(images, 0)}
          alt={`${serviceImageAlt} — intro`}
          ratioClassName="aspect-[4/3]"
          className="shadow-[0_12px_40px_-16px_rgba(0,0,0,0.12)]"
        />
      </section>

      <section aria-labelledby={`${slug}-gallery-heading`} className="space-y-6">
        <h2 id={`${slug}-gallery-heading`} className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          {copy.gallerySectionTitle ?? copy.formatsSectionTitle ?? ""}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <SiteImageBlock
            src={at(images, 1)}
            alt={`${serviceImageAlt} — gallery 1`}
            ratioClassName="aspect-[9/16]"
            className="rounded-2xl"
          />
          <SiteImageBlock
            src={at(images, 2)}
            alt={`${serviceImageAlt} — gallery 2`}
            ratioClassName="aspect-[9/16]"
            className="rounded-2xl"
          />
        </div>
      </section>

      {benefits.length > 0 && (
        <section aria-labelledby={`${slug}-benefits-heading`} className="space-y-4">
          <h2 id={`${slug}-benefits-heading`} className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            {copy.benefitsSectionTitle ?? ""}
          </h2>
          <div className="space-y-10 md:space-y-14">
            {benefits.map((b, i) => {
              const imgIndex = 3 + i;
              const reverse = i % 2 === 1;
              return (
                <div
                  key={b.title}
                  className={`grid gap-8 rounded-3xl border border-[var(--border)] px-5 py-8 md:grid-cols-2 md:items-center md:gap-12 md:px-10 md:py-10 ${
                    i % 2 === 0 ? "bg-[var(--baby-blue)]/35 dark:bg-primary/[0.06]" : "bg-[var(--surface-nested)]"
                  }`}
                >
                  <div className={`min-w-0 space-y-3 ${reverse ? "md:order-2" : ""}`}>
                    <p className="text-4xl font-black tabular-nums leading-none text-primary/25 md:text-5xl">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-lg font-semibold text-[var(--foreground)] md:text-xl">{b.title}</h3>
                    <p className="text-sm leading-relaxed text-[var(--body-muted)] md:text-base">{b.description}</p>
                  </div>
                  <div className={reverse ? "md:order-1" : ""}>
                    <SiteImageBlock
                      src={at(images, imgIndex)}
                      alt={`${serviceImageAlt} — ${b.title}`}
                      ratioClassName="aspect-[16/11]"
                      className="rounded-2xl"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {copy.formats && copy.formats.length > 0 && (
        <section aria-labelledby="formats-heading">
          <h2 id="formats-heading" className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            {copy.formatsSectionTitle ?? ""}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.formats.map((card, i) => {
              const Icon = formatIcons[i] ?? LayoutGrid;
              return (
                <div
                  key={card.title}
                  className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition hover:border-primary/25 dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-[var(--foreground)]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--body-muted)]">{card.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {copy.processSteps && copy.processSteps.length > 0 && (
        <section aria-labelledby="process-heading">
          <h2 id="process-heading" className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            {copy.processSectionTitle ?? ""}
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-5 md:gap-3">
            {copy.processSteps.map((step, index) => (
              <li
                key={step.title}
                className="relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] p-4 md:min-h-[180px]"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-[var(--foreground)]">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--body-muted)] md:text-[13px]">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface-nested)] p-6 md:p-8">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">{deliverablesTitle}</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-[var(--body-muted)]">
          {copy.deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href={contactHref} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
            {cta}
          </Link>
        </p>
      </section>
    </div>
  );
}
