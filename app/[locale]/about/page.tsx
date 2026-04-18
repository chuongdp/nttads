import { notFound } from "next/navigation";
import { AboutPageView } from "@/components/about/about-page";
import { aboutPageCopy } from "@/lib/about-content";
import { dictionaries, isSupportedLocale, type Locale } from "@/lib/i18n";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale: loc } = await params;
  if (!isSupportedLocale(loc)) return { title: "About" };
  const locale = loc as Locale;
  const copy = aboutPageCopy[locale];
  const brand = dictionaries[locale].brand;
  return { title: `${copy.metaTitle} | ${brand}` };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: loc } = await params;
  if (!isSupportedLocale(loc)) notFound();

  const locale = loc as Locale;
  const dict = dictionaries[locale];
  const copy = aboutPageCopy[locale];

  return (
    <AboutPageView
      locale={locale}
      copy={copy}
      navHome={dict.nav.home}
      navAbout={dict.nav.about}
    />
  );
}
