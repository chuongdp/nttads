"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

type LocalizedText = {
  vi: string;
  en: string;
  zh: string;
};

type SiteSettingsPayload = {
  email: string;
  phone: string;
  address: LocalizedText;
  socialLinks: {
    facebook: string;
    tiktok: string;
    linkedin: string;
  };
};

type SiteSettingRow = {
  id: string;
  key: string;
  value_json: SiteSettingsPayload;
};

const SETTINGS_KEY = "general";

/** Không viền — nền card + focus ring (đồng bộ admin). */
const fieldClass =
  "mt-1 w-full rounded-lg bg-[var(--surface-card)] px-3 py-2 text-[var(--foreground)] outline-none transition placeholder:text-[var(--secondary-text)] focus-visible:ring-2 focus-visible:ring-primary/35";

const defaultPayload: SiteSettingsPayload = {
  email: "",
  phone: "",
  address: {
    vi: "",
    en: "",
    zh: "",
  },
  socialLinks: {
    facebook: "",
    tiktok: "",
    linkedin: "",
  },
};

export function SiteSettingsPanel() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<SiteSettingsPayload>(defaultPayload);

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      const { data: row, error } = await supabase
        .from("site_settings")
        .select("id,key,value_json")
        .eq("key", SETTINGS_KEY)
        .maybeSingle<SiteSettingRow>();

      if (error) {
        setMessage(`Load failed: ${error.message}`);
        setLoading(false);
        return;
      }

      if (row?.value_json) {
        setData({
          ...defaultPayload,
          ...row.value_json,
          address: {
            ...defaultPayload.address,
            ...(row.value_json.address ?? {}),
          },
          socialLinks: {
            ...defaultPayload.socialLinks,
            ...(row.value_json.socialLinks ?? {}),
          },
        });
      }

      setLoading(false);
    }

    void loadSettings();
  }, []);

  const disabled = useMemo(() => loading || saving, [loading, saving]);

  async function saveSettings() {
    setSaving(true);
    setMessage("");

    const { error } = await supabase.from("site_settings").upsert(
      {
        key: SETTINGS_KEY,
        value_json: data,
      },
      { onConflict: "key" },
    );

    if (error) {
      setMessage(`Save failed: ${error.message}`);
    } else {
      setMessage("Saved successfully.");
    }

    setSaving(false);
  }

  return (
    <section className="border-b border-[var(--border)]/50 pb-10">
      <h2 className="text-xl font-semibold">Site Settings</h2>
      <p className="mt-1 text-sm text-slate-500">
        Manage general contact info and multilingual address content.
      </p>

      {loading ? (
        <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading settings...
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm">
              Email
              <input
                className={fieldClass}
                value={data.email}
                onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </label>

            <label className="text-sm">
              Phone
              <input
                className={fieldClass}
                value={data.phone}
                onChange={(e) => setData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="text-sm">
              Address (VI)
              <textarea
                className={`${fieldClass} min-h-24`}
                value={data.address.vi}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, vi: e.target.value },
                  }))
                }
              />
            </label>
            <label className="text-sm">
              Address (EN)
              <textarea
                className={`${fieldClass} min-h-24`}
                value={data.address.en}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, en: e.target.value },
                  }))
                }
              />
            </label>
            <label className="text-sm">
              Address (ZH)
              <textarea
                className={`${fieldClass} min-h-24`}
                value={data.address.zh}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    address: { ...prev.address, zh: e.target.value },
                  }))
                }
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="text-sm">
              Facebook URL
              <input
                className={fieldClass}
                value={data.socialLinks.facebook}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, facebook: e.target.value },
                  }))
                }
              />
            </label>
            <label className="text-sm">
              TikTok URL
              <input
                className={fieldClass}
                value={data.socialLinks.tiktok}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, tiktok: e.target.value },
                  }))
                }
              />
            </label>
            <label className="text-sm">
              LinkedIn URL
              <input
                className={fieldClass}
                value={data.socialLinks.linkedin}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, linkedin: e.target.value },
                  }))
                }
              />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={saveSettings} disabled={disabled}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
            {message && <p className="text-sm text-slate-500">{message}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
