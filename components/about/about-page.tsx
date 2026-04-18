import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import type { AboutPageCopy } from "@/lib/about-content";

type AboutPageViewProps = {
  locale: Locale;
  copy: AboutPageCopy;
  navHome: string;
  navAbout: string;
};

export function AboutPageView({ locale, copy, navHome, navAbout }: AboutPageViewProps) {
  const base = `/${locale}`;
  const contactHref = `${base}#contact`;
  const servicesHref = `${base}/services`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav className="text-sm text-[var(--body-muted)]">
        <Link href={base} className="text-primary hover:underline">
          {navHome}
        </Link>
        <span className="mx-2 text-[var(--secondary-text)]">/</span>
        <span className="text-[var(--foreground)]">{navAbout}</span>
      </nav>

      <header className="relative mt-8 overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-primary/[0.11] via-[var(--surface-card)] to-[var(--surface-nested)] px-6 py-12 md:px-12 md:py-16">
        <div className="pointer-events-none absolute -left-24 top-0 size-72 rounded-full bg-primary/[0.06] blur-3xl" aria-hidden />
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">{copy.heroEyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl lg:text-[2.4rem] lg:leading-tight">
          {copy.heroTitle}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--body-muted)]">{copy.heroLead}</p>
      </header>

      <section className="mt-12" aria-label={copy.statsNote}>
        <p className="mx-auto max-w-3xl text-center text-sm text-[var(--secondary-text)]">{copy.statsNote}</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {copy.stats.map((s) => (
            <li
              key={s.label}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] px-5 py-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
            >
              <p className="text-lg font-semibold text-primary md:text-xl">{s.value}</p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--body-muted)] md:text-sm">{s.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20" aria-labelledby="about-who">
        <h2 id="about-who" className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          {copy.whoTitle}
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 leading-relaxed text-[var(--body-muted)]">
          {copy.whoParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-3xl border border-[var(--border)] bg-[var(--surface-nested)] px-5 py-10 md:px-10 md:py-14" aria-labelledby="about-pillars">
        <p className="text-sm font-medium text-primary">{copy.pillarsKicker}</p>
        <h2 id="about-pillars" className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          {copy.pillarsTitle}
        </h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {copy.pillars.map((pillar) => (
            <li key={pillar.title}>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--body-muted)]">{pillar.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20" aria-labelledby="about-mission">
        <h2 id="about-mission" className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          {copy.missionTitle}
        </h2>
        <p className="mt-4 max-w-3xl text-[var(--body-muted)] leading-relaxed">{copy.missionLead}</p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {copy.missionBlocks.map((b) => (
            <li
              key={b.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
            >
              <h3 className="font-semibold text-[var(--foreground)]">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--body-muted)]">{b.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 max-w-3xl rounded-2xl border border-primary/20 bg-primary/[0.04] px-6 py-8 dark:bg-primary/[0.07]" aria-labelledby="about-vision">
        <h2 id="about-vision" className="text-lg font-semibold text-[var(--foreground)]">
          {copy.visionTitle}
        </h2>
        <p className="mt-3 leading-relaxed text-[var(--body-muted)]">{copy.visionText}</p>
      </section>

      <section className="mt-20" aria-labelledby="about-timeline">
        <h2 id="about-timeline" className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          {copy.timelineTitle}
        </h2>
        <ol className="mt-10 max-w-3xl space-y-8">
          {copy.milestones.map((m) => (
            <li key={m.year + m.title} className="flex gap-4">
              <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-primary ring-4 ring-primary/15" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-primary">{m.year}</p>
                <h3 className="mt-1 font-semibold text-[var(--foreground)]">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--body-muted)]">{m.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20" aria-labelledby="about-platforms">
        <h2 id="about-platforms" className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          {copy.platformsTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--body-muted)] leading-relaxed">{copy.platformsLead}</p>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {copy.platforms.map((p) => (
            <li
              key={p.serviceSlug}
              className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] p-6 transition hover:border-primary/30"
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)]">{p.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--body-muted)]">{p.text}</p>
              <Link
                href={`${base}/services/${p.serviceSlug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {copy.platformCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href={servicesHref} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
            {copy.servicesLinkLabel} →
          </Link>
        </p>
      </section>

      <section
        className="mt-20 rounded-3xl border border-[var(--border)] bg-[var(--surface-nested)] px-6 py-12 text-center md:px-12"
        aria-labelledby="about-cta"
      >
        <h2 id="about-cta" className="text-2xl font-semibold text-[var(--foreground)]">
          {copy.ctaTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[var(--body-muted)] leading-relaxed">{copy.ctaLead}</p>
        <Button asChild className="mt-8">
          <Link href={contactHref}>{copy.ctaButton}</Link>
        </Button>
      </section>
    </div>
  );
}
