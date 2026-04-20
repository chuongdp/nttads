import { createClient } from "@supabase/supabase-js";
import { createLogger } from "@/lib/logger";
import { serviceSlugs, type ServiceSlug } from "@/lib/service-content";

const mediaLog = createLogger("site-media");

export type HomeMediaSlot = "home_hero" | "home_contact";
export type ServiceMediaSlot = `service_${ServiceSlug}`;
export type MediaSlotId = HomeMediaSlot | ServiceMediaSlot;

export const MEDIA_SLOT_IDS: readonly MediaSlotId[] = [
  "home_hero",
  "home_contact",
  ...serviceSlugs.map((s) => `service_${s}` as ServiceMediaSlot),
];

/** Giá trị lưu trong JSON: chuỗi (legacy) hoặc mảng URL. */
export type SiteMediaUrlsRaw = Partial<Record<MediaSlotId, string | string[]>>;

export function serviceMediaSlot(slug: ServiceSlug): MediaSlotId {
  return `service_${slug}`;
}

export function normalizeMediaSrc(
  raw: string | undefined | null,
): string | undefined {
  if (raw == null) return undefined;
  const t = raw.trim();
  if (!t) return undefined;
  try {
    const u = new URL(t);
    if (u.protocol !== "http:" && u.protocol !== "https:") return undefined;
    return u.href;
  } catch {
    return undefined;
  }
}

/** Chuẩn hoá từ DB → chỉ URL hợp lệ (hiển thị public). */
export function parseMediaSlotToList(value: unknown): string[] {
  if (value == null) return [];
  if (Array.isArray(value)) {
    return value
      .filter((x): x is string => typeof x === "string")
      .map((s) => normalizeMediaSrc(s))
      .filter((u): u is string => u != null);
  }
  if (typeof value === "string") {
    const u = normalizeMediaSrc(value);
    return u ? [u] : [];
  }
  return [];
}

/** Form admin: luôn ít nhất một dòng trống; giữ text đang gõ (kể cả chưa hợp lệ). */
export function coerceMediaUrlsToFormArrays(
  input: Partial<Record<string, unknown>> | undefined,
): Record<MediaSlotId, string[]> {
  const out = {} as Record<MediaSlotId, string[]>;
  for (const id of MEDIA_SLOT_IDS) {
    const v = input?.[id];
    if (v == null) {
      out[id] = [""];
      continue;
    }
    if (typeof v === "string") {
      out[id] = [v];
      continue;
    }
    if (Array.isArray(v)) {
      const arr = v.filter((x): x is string => typeof x === "string");
      out[id] = arr.length > 0 ? [...arr] : [""];
      continue;
    }
    out[id] = [""];
  }
  return out;
}

/** Trước khi lưu DB: chỉ giữ URL đã chuẩn hoá. */
export function sanitizeMediaUrls(
  input: Partial<Record<MediaSlotId, string[]>> | undefined,
): Record<MediaSlotId, string[]> {
  const out = {} as Record<MediaSlotId, string[]>;
  for (const id of MEDIA_SLOT_IDS) {
    const list = input?.[id] ?? [""];
    const cleaned = list
      .map((s) => s.trim())
      .map((s) => normalizeMediaSrc(s))
      .filter((u): u is string => u != null);
    out[id] = cleaned;
  }
  return out;
}

function emptyMediaRecord(): Record<MediaSlotId, string[]> {
  const o = {} as Record<MediaSlotId, string[]>;
  for (const id of MEDIA_SLOT_IDS) {
    o[id] = [];
  }
  return o;
}

export const MEDIA_SLOT_LABELS: Record<MediaSlotId, string> = {
  home_hero: "Trang chủ — ảnh khu hero (cột phải, nhiều ảnh)",
  home_contact: "Trang chủ — ảnh khu liên hệ (nhiều ảnh)",
  "service_google-ads":
    "Google Ads — ảnh theo thứ tự: [0] intro cạnh text, [1][2] gallery 2 cột, [3]–[6] lần lượt 4 ô lợi thế (zig-zag).",
  "service_facebook-ads":
    "Facebook Ads — ảnh theo thứ tự: [0] intro cạnh text, [1][2] gallery 2 cột, [3]–[6] lần lượt 4 ô lợi thế (zig-zag).",
  "service_tiktok-ads":
    "TikTok Ads — ảnh theo thứ tự: [0] intro cạnh text, [1][2] gallery 2 cột, [3]–[6] lần lượt 4 ô lợi thế (zig-zag).",
  "service_seo": "Dịch vụ — SEO (minh hoạ, nhiều ảnh)",
};

export async function fetchSiteMediaUrls(): Promise<Record<MediaSlotId, string[]>> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return emptyMediaRecord();
  }
  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("site_settings")
    .select("value_json")
    .eq("key", "general")
    .maybeSingle();
  if (error) {
    mediaLog.warn("fetchSiteMediaUrls failed", {
      code: error.code,
      message: error.message,
    });
    return emptyMediaRecord();
  }
  if (!data?.value_json) {
    mediaLog.debug("fetchSiteMediaUrls: no row or empty value_json");
    return emptyMediaRecord();
  }
  const raw = (data.value_json as { mediaUrls?: Partial<Record<string, unknown>> }).mediaUrls;
  return MEDIA_SLOT_IDS.reduce(
    (acc, id) => {
      acc[id] = parseMediaSlotToList(raw?.[id]);
      return acc;
    },
    {} as Record<MediaSlotId, string[]>,
  );
}
