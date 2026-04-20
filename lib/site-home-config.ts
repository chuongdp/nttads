import { createClient } from "@supabase/supabase-js";
import type { Dictionary, Locale } from "@/lib/i18n";
import { createLogger } from "@/lib/logger";

const homeConfigLog = createLogger("site-home-config");

export type LandingContentCopy = Pick<Dictionary, "hero" | "problems" | "home">;
export type LandingContentConfig = Partial<Record<Locale, Partial<LandingContentCopy>>>;

type GeneralSettingsRow = {
  value_json?: {
    homeContent?: unknown;
  };
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value != null && !Array.isArray(value);
}

function isLocale(value: string): value is Locale {
  return value === "vi" || value === "en" || value === "zh";
}

export function parseHomeContentConfig(raw: unknown): LandingContentConfig {
  if (!isPlainObject(raw)) return {};
  const out: LandingContentConfig = {};
  for (const [localeKey, copy] of Object.entries(raw)) {
    if (!isLocale(localeKey) || !isPlainObject(copy)) continue;
    out[localeKey] = copy as Partial<LandingContentCopy>;
  }
  return out;
}

export function mergeLandingDictionary(
  base: Dictionary,
  override?: Partial<LandingContentCopy>,
): Dictionary {
  if (!override) return base;
  return {
    ...base,
    hero: {
      ...base.hero,
      ...(override.hero ?? {}),
      bullets: override.hero?.bullets ?? base.hero.bullets,
    },
    problems: {
      ...base.problems,
      ...(override.problems ?? {}),
      items: override.problems?.items ?? base.problems.items,
    },
    home: {
      ...base.home,
      ...(override.home ?? {}),
      counters: {
        ...base.home.counters,
        ...(override.home?.counters ?? {}),
      },
    },
  };
}

export async function fetchHomeContentConfig(): Promise<LandingContentConfig> {
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
    homeConfigLog.warn("fetchHomeContentConfig failed", {
      code: error.code,
      message: error.message,
    });
    return {};
  }

  return parseHomeContentConfig(data?.value_json?.homeContent);
}
