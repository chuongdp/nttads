import { dictionaries, type Locale } from "@/lib/i18n";
import { RoiCalculator } from "@/components/roi-calculator";
import { ContactForm } from "@/components/contact-form";
import { AnimatedReveal } from "@/components/animated-reveal";
import { HeroPremium } from "@/components/home/hero-premium";
import { HomeStats, type StatItem } from "@/components/home/home-stats";
import { PartnersMarquee } from "@/components/home/partners-marquee";
import { PainPointsSection } from "@/components/home/pain-points-section";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SiteImageBlock } from "@/components/media/site-image-block";
import { fetchSiteMediaUrls } from "@/lib/site-media";
import { fetchHomeContentConfig, mergeLandingDictionary } from "@/lib/site-home-config";

export const revalidate = 120;

type HomePageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const homeContentConfig = await fetchHomeContentConfig();
  const dictionary = mergeLandingDictionary(dictionaries[locale], homeContentConfig[locale]);
  const media = await fetchSiteMediaUrls();
  const counters: StatItem[] = [
    { iconKey: "users", value: "120+", label: dictionary.home.counters.clients },
    { iconKey: "briefcase", value: "350+", label: dictionary.home.counters.projects },
    { iconKey: "trending", value: "4.2x", label: dictionary.home.counters.roas },
  ];

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 py-10 md:gap-16 md:px-6 md:py-14">
      <AnimatedReveal>
        <HeroPremium
          copy={dictionary.hero}
          heroImageUrls={media.home_hero}
          heroImageAlt={dictionary.brand}
        />
      </AnimatedReveal>

      <PainPointsSection
        subtitle={dictionary.problems.kicker}
        title={dictionary.problems.title}
        items={[...dictionary.problems.items]}
      />

      <HomeStats items={counters} />

      <PartnersMarquee />

      <ScrollReveal>
        <RoiCalculator locale={locale} />
      </ScrollReveal>

      <section id="contact" className="scroll-mt-24 grid gap-6 md:grid-cols-2">
        <ScrollReveal className="min-w-0">
          <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface-card)] p-6 shadow-[0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">{dictionary.hero.cta}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--body-muted)]">
              {dictionary.home.contactBlurb}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-nested)] p-3">
                <p className="text-[var(--secondary-text)]">{dictionary.home.responseTimeLabel}</p>
                <p className="mt-1 text-lg font-semibold text-[var(--foreground)]">{dictionary.home.responseTimeValue}</p>
              </div>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-nested)] p-3">
                <p className="text-[var(--secondary-text)]">{dictionary.home.strategySessionLabel}</p>
                <p className="mt-1 text-lg font-semibold text-[var(--foreground)]">{dictionary.home.strategySessionValue}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {media.home_contact.length === 0 ? (
                <SiteImageBlock src={undefined} alt={dictionary.brand} ratioClassName="aspect-[5/3]" />
              ) : (
                media.home_contact.map((src, i) => (
                  <SiteImageBlock
                    key={`contact-img-${i}`}
                    src={src}
                    alt={`${dictionary.brand} ${i + 1}`}
                    ratioClassName="aspect-[5/3]"
                  />
                ))
              )}
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="min-w-0">
          <ContactForm />
        </ScrollReveal>
      </section>
    </div>
  );
}
