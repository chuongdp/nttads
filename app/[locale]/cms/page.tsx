import { redirect } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type CmsIndexProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function CmsIndexPage({ params }: CmsIndexProps) {
  const { locale } = await params;
  redirect(`/${locale}/cms/dashboard`);
}
