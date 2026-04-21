import { Lock } from "lucide-react";
import { AdminAuthGate } from "@/components/admin/admin-auth-gate";
import { RoiAnalyticsPanel } from "@/components/admin/roi-analytics-panel";
import { SiteSettingsPanel } from "@/components/admin/site-settings-panel";
import { getCmsDictionary } from "@/lib/cms-dictionary";
import type { Locale } from "@/lib/i18n";

type CmsDashboardProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function CmsDashboardPage({ params }: CmsDashboardProps) {
  const { locale } = await params;
  const t = getCmsDictionary(locale);

  return (
    <div className="mx-auto min-h-full max-w-6xl space-y-6 px-4 py-10">
      <div className="rounded-xl bg-[var(--surface-nested)] p-6">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" aria-hidden />
          <h1 className="text-2xl font-bold">{t.dashboard.title}</h1>
        </div>
        <p className="mt-3 text-sm text-slate-500">{t.dashboard.subtitle}</p>
      </div>

      <AdminAuthGate>
        <SiteSettingsPanel />
        <RoiAnalyticsPanel />
      </AdminAuthGate>
    </div>
  );
}
