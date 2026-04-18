import { Lock } from "lucide-react";
import { AdminAuthGate } from "@/components/admin/admin-auth-gate";
import { RoiAnalyticsPanel } from "@/components/admin/roi-analytics-panel";
import { SiteSettingsPanel } from "@/components/admin/site-settings-panel";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-12">
      <div className="rounded-xl bg-[var(--surface-nested)] p-6">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold">Admin CMS Dashboard</h1>
        </div>
        <p className="mt-3 text-slate-500">
          CMS section is now connected to Supabase for `site_settings` fetch/update.
          Next phase is enabling strict auth guard and role-based policies.
        </p>
      </div>

      <AdminAuthGate>
        <SiteSettingsPanel />
        <RoiAnalyticsPanel />
      </AdminAuthGate>
    </div>
  );
}
