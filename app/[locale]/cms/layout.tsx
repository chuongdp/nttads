import { notFound } from "next/navigation";
import { CmsDictionaryProvider } from "@/context/cms-dictionary-context";
import { CmsHeader } from "@/components/admin/cms-header";
import { isSupportedLocale, type Locale } from "@/lib/i18n";

type CmsLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function CmsLocaleLayout({ children, params }: CmsLayoutProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  const typed = locale as Locale;

  return (
    <div className="min-h-full bg-background">
      <CmsDictionaryProvider locale={typed}>
        <CmsHeader locale={typed} />
        {children}
      </CmsDictionaryProvider>
    </div>
  );
}
