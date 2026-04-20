import { createClient } from "@supabase/supabase-js";
import type { Locale } from "@/lib/i18n";
import { createLogger } from "@/lib/logger";
import type { ServiceCmsConfig, ServicePageCopy, ServiceSlug } from "@/lib/service-content";
import { serviceSlugs } from "@/lib/service-content";

const serviceConfigLog = createLogger("site-service-config");

type GeneralSettingsRow = {
  value_json?: {
    serviceContent?: unknown;
  };
};

function isLocale(value: string): value is Locale {
  return value === "vi" || value === "en" || value === "zh";
}

function isServiceSlug(value: string): value is ServiceSlug {
  return serviceSlugs.includes(value as ServiceSlug);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value != null && !Array.isArray(value);
}

export function parseServiceContentConfig(raw: unknown): ServiceCmsConfig {
  if (!isPlainObject(raw)) return {};
  const out: ServiceCmsConfig = {};

  for (const [slugKey, byLocale] of Object.entries(raw)) {
    if (!isServiceSlug(slugKey) || !isPlainObject(byLocale)) continue;

    const localeMap: Partial<Record<Locale, Partial<ServicePageCopy>>> = {};
    for (const [localeKey, copy] of Object.entries(byLocale)) {
      if (!isLocale(localeKey) || !isPlainObject(copy)) continue;
      localeMap[localeKey] = copy as Partial<ServicePageCopy>;
    }

    out[slugKey] = localeMap;
  }

  return out;
}

export async function fetchServiceContentConfig(): Promise<ServiceCmsConfig> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {};

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("site_settings")
    .select("value_json")
    .eq("key", "general")
    .maybeSingle<GeneralSettingsRow>();

  if (error) {
    serviceConfigLog.warn("fetchServiceContentConfig failed", {
      code: error.code,
      message: error.message,
    });
    return {};
  }

  return parseServiceContentConfig(data?.value_json?.serviceContent);
}
