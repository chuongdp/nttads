import { createClient } from "@supabase/supabase-js";
import { normalizeMediaSrc } from "@/lib/site-media";
import { createLogger } from "@/lib/logger";

const brandingLog = createLogger("site-branding");

export type SiteBranding = {
  brandName: string;
  brandLogoUrl?: string;
  brandFaviconUrl?: string;
};

const defaultBranding: SiteBranding = {
  brandName: "NTT Ads",
};

type GeneralSettingsRow = {
  value_json?: {
    brandName?: unknown;
    brandLogoUrl?: unknown;
    brandFaviconUrl?: unknown;
  };
};

function toBranding(row?: GeneralSettingsRow | null): SiteBranding {
  const v = row?.value_json;
  if (!v) return defaultBranding;
  const brandName =
    typeof v.brandName === "string" && v.brandName.trim()
      ? v.brandName.trim()
      : defaultBranding.brandName;
  const brandLogoUrl = normalizeMediaSrc(typeof v.brandLogoUrl === "string" ? v.brandLogoUrl : undefined);
  const brandFaviconUrl = normalizeMediaSrc(typeof v.brandFaviconUrl === "string" ? v.brandFaviconUrl : undefined);
  return {
    brandName,
    brandLogoUrl,
    brandFaviconUrl,
  };
}

export async function fetchSiteBranding(): Promise<SiteBranding> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return defaultBranding;

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("site_settings")
    .select("value_json")
    .eq("key", "general")
    .maybeSingle<GeneralSettingsRow>();

  if (error) {
    brandingLog.warn("fetchSiteBranding failed", {
      code: error.code,
      message: error.message,
    });
    return defaultBranding;
  }
  return toBranding(data);
}
