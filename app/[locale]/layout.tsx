import { notFound } from "next/navigation";
import { LanguageProvider } from "@/context/language-context";
import { dictionaries, isSupportedLocale, type Locale } from "@/lib/i18n";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { TopPromoBar } from "@/components/home/top-promo-bar";
import { fetchSiteBranding } from "@/lib/site-branding";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const branding = await fetchSiteBranding();
  const dictionary = {
    ...dictionaries[typedLocale],
    brand: branding.brandName || dictionaries[typedLocale].brand,
  };

  return (
    <LanguageProvider locale={typedLocale}>
      <div className="flex min-h-screen flex-col">
        <TopPromoBar tagline={dictionary.topBar.tagline} />
        <Navbar locale={typedLocale} dictionary={dictionary} brandLogoUrl={branding.brandLogoUrl} />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={typedLocale} dictionary={dictionary} brandLogoUrl={branding.brandLogoUrl} />
      </div>
    </LanguageProvider>
  );
}
