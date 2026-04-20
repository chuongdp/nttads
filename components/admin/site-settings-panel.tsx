"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { createLogger } from "@/lib/logger";
import { dictionaries, type Dictionary, type Locale } from "@/lib/i18n";
import {
  getServicePageCopy,
  mergeServicePageCopy,
  serviceSlugs,
  type ServiceCmsConfig,
  type ServicePageCopy,
  type ServiceProcessStep,
  type ServiceShowcaseCard,
  type ServiceSlug,
} from "@/lib/service-content";
import {
  coerceMediaUrlsToFormArrays,
  MEDIA_SLOT_LABELS,
  sanitizeMediaUrls,
  serviceMediaSlot,
  type MediaSlotId,
} from "@/lib/site-media";
import {
  mergeLandingDictionary,
  parseHomeContentConfig,
  type LandingContentConfig,
  type LandingContentCopy,
} from "@/lib/site-home-config";
import { parseServiceContentConfig } from "@/lib/site-service-config";

type LocalizedText = {
  vi: string;
  en: string;
  zh: string;
};

type NodeId =
  | "base"
  | "sectionTitles"
  | "formats"
  | "benefits"
  | "process"
  | "deliverables"
  | "images";

type SiteSettingsPayload = {
  brandName: string;
  brandLogoUrl: string;
  brandFaviconUrl: string;
  email: string;
  phone: string;
  address: LocalizedText;
  socialLinks: {
    facebook: string;
    tiktok: string;
    linkedin: string;
  };
  mediaUrls: Record<MediaSlotId, string[]>;
  serviceContent?: ServiceCmsConfig;
  homeContent?: LandingContentConfig;
};

type SiteSettingRow = {
  id: string;
  key: string;
  value_json: SiteSettingsPayload;
};

type ServiceContentState = Record<ServiceSlug, Record<Locale, ServicePageCopy>>;
type LandingNodeId = "hero" | "problems" | "contact" | "images";
type LandingContentState = Record<Locale, LandingContentCopy>;

const SETTINGS_KEY = "general";
const panelLog = createLogger("admin:site-settings");

const fieldClass =
  "mt-1 w-full rounded-lg bg-[var(--surface-card)] px-3 py-2 text-[var(--foreground)] outline-none transition placeholder:text-[var(--secondary-text)] focus-visible:ring-2 focus-visible:ring-primary/35";

const localeList: Locale[] = ["vi", "en", "zh"];
const nodeList: { id: NodeId; label: string }[] = [
  { id: "base", label: "Thông tin chính" },
  { id: "sectionTitles", label: "Tiêu đề section" },
  { id: "formats", label: "Formats" },
  { id: "benefits", label: "Benefits" },
  { id: "process", label: "Process steps" },
  { id: "deliverables", label: "Deliverables" },
  { id: "images", label: "Ảnh hiển thị" },
];
const landingNodeList: { id: LandingNodeId; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "problems", label: "Pain points" },
  { id: "contact", label: "Contact + stats" },
  { id: "images", label: "Images" },
];

const defaultPayload: SiteSettingsPayload = {
  brandName: "NTT Ads",
  brandLogoUrl: "",
  brandFaviconUrl: "",
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
  mediaUrls: coerceMediaUrlsToFormArrays(undefined),
  serviceContent: {},
};

function buildDefaultServiceContentState(): ServiceContentState {
  const state = {} as ServiceContentState;
  for (const slug of serviceSlugs) {
    state[slug] = {
      vi: getServicePageCopy("vi", slug) as ServicePageCopy,
      en: getServicePageCopy("en", slug) as ServicePageCopy,
      zh: getServicePageCopy("zh", slug) as ServicePageCopy,
    };
  }
  return state;
}

function extractLandingCopy(dictionary: Dictionary): LandingContentCopy {
  return {
    hero: dictionary.hero,
    problems: dictionary.problems,
    home: dictionary.home,
  };
}

function buildDefaultLandingContentState(): LandingContentState {
  return {
    vi: extractLandingCopy(dictionaries.vi),
    en: extractLandingCopy(dictionaries.en),
    zh: extractLandingCopy(dictionaries.zh),
  };
}

function serviceLabel(slug: ServiceSlug): string {
  if (slug === "google-ads") return "Google Ads";
  if (slug === "facebook-ads") return "Facebook Ads";
  if (slug === "tiktok-ads") return "TikTok Ads";
  return "SEO";
}

export function SiteSettingsPanel() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<SiteSettingsPayload>(defaultPayload);
  const [selectedService, setSelectedService] = useState<ServiceSlug>("facebook-ads");
  const [selectedNode, setSelectedNode] = useState<NodeId>("base");
  const [selectedLocale, setSelectedLocale] = useState<Locale>("vi");
  const [serviceContent, setServiceContent] = useState<ServiceContentState>(buildDefaultServiceContentState());
  const [landingNode, setLandingNode] = useState<LandingNodeId>("hero");
  const [landingLocale, setLandingLocale] = useState<Locale>("vi");
  const [landingContent, setLandingContent] = useState<LandingContentState>(buildDefaultLandingContentState());

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      const { data: row, error } = await supabase
        .from("site_settings")
        .select("id,key,value_json")
        .eq("key", SETTINGS_KEY)
        .maybeSingle<SiteSettingRow>();

      if (error) {
        panelLog.error("loadSettings failed", { message: error.message });
        setMessage(`Load failed: ${error.message}`);
        setLoading(false);
        return;
      }

      if (row?.value_json) {
        const v = row.value_json;
        setData({
          ...defaultPayload,
          ...v,
          address: {
            ...defaultPayload.address,
            ...(v.address ?? {}),
          },
          socialLinks: {
            ...defaultPayload.socialLinks,
            ...(v.socialLinks ?? {}),
          },
          mediaUrls: coerceMediaUrlsToFormArrays(
            (v as { mediaUrls?: Partial<Record<string, unknown>> }).mediaUrls,
          ),
        });

        const parsed = parseServiceContentConfig(v.serviceContent);
        const merged = buildDefaultServiceContentState();
        for (const slug of serviceSlugs) {
          for (const locale of localeList) {
            merged[slug][locale] = mergeServicePageCopy(merged[slug][locale], parsed[slug]?.[locale]);
          }
        }
        setServiceContent(merged);

        const parsedLanding = parseHomeContentConfig(v.homeContent);
        setLandingContent({
          vi: mergeLandingDictionary(dictionaries.vi, parsedLanding.vi),
          en: mergeLandingDictionary(dictionaries.en, parsedLanding.en),
          zh: mergeLandingDictionary(dictionaries.zh, parsedLanding.zh),
        });
      }

      setLoading(false);
    }

    void loadSettings();
  }, []);

  const disabled = useMemo(() => loading || saving, [loading, saving]);
  const selectedCopy = serviceContent[selectedService][selectedLocale];
  const selectedLanding = landingContent[landingLocale];
  const serviceMediaSlotId = serviceMediaSlot(selectedService);
  const homeSlots: MediaSlotId[] = ["home_hero", "home_contact"];

  function updateSelectedCopy(mutator: (prev: ServicePageCopy) => ServicePageCopy) {
    setServiceContent((prev) => ({
      ...prev,
      [selectedService]: {
        ...prev[selectedService],
        [selectedLocale]: mutator(prev[selectedService][selectedLocale]),
      },
    }));
  }

  function updateArrayCard(
    key: "formats" | "benefits",
    index: number,
    field: keyof ServiceShowcaseCard,
    value: string,
  ) {
    updateSelectedCopy((prev) => {
      const list = [...(prev[key] ?? [])];
      const target = list[index] ?? { title: "", description: "" };
      list[index] = { ...target, [field]: value };
      return { ...prev, [key]: list };
    });
  }

  function removeArrayCard(key: "formats" | "benefits", index: number) {
    updateSelectedCopy((prev) => {
      const list = (prev[key] ?? []).filter((_, i) => i !== index);
      return { ...prev, [key]: list };
    });
  }

  function updateProcess(index: number, field: keyof ServiceProcessStep, value: string) {
    updateSelectedCopy((prev) => {
      const list = [...(prev.processSteps ?? [])];
      const target = list[index] ?? { title: "", description: "" };
      list[index] = { ...target, [field]: value };
      return { ...prev, processSteps: list };
    });
  }

  function updateLanding(mutator: (prev: LandingContentCopy) => LandingContentCopy) {
    setLandingContent((prev) => ({
      ...prev,
      [landingLocale]: mutator(prev[landingLocale]),
    }));
  }

  async function saveSettings() {
    setSaving(true);
    setMessage("");

    const serviceContentToSave: ServiceCmsConfig = {};
    for (const slug of serviceSlugs) {
      serviceContentToSave[slug] = {
        vi: serviceContent[slug].vi,
        en: serviceContent[slug].en,
        zh: serviceContent[slug].zh,
      };
    }

    const homeContentToSave: LandingContentConfig = {
      vi: landingContent.vi,
      en: landingContent.en,
      zh: landingContent.zh,
    };

    const { error } = await supabase.from("site_settings").upsert(
      {
        key: SETTINGS_KEY,
        value_json: {
          ...data,
          mediaUrls: sanitizeMediaUrls(data.mediaUrls),
          serviceContent: serviceContentToSave,
          homeContent: homeContentToSave,
        },
      },
      { onConflict: "key" },
    );

    if (error) {
      panelLog.error("saveSettings failed", { message: error.message });
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
        Quản trị global settings + nội dung riêng từng trang dịch vụ theo node.
      </p>

      {loading ? (
        <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading settings...
        </div>
      ) : (
        <div className="mt-6 grid gap-8">
          <div className="rounded-xl border border-[var(--border)]/60 bg-[var(--surface-card)]/40 p-4 md:p-6">
            <h3 className="text-base font-semibold">Global settings</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="text-sm">
                Brand name
                <input
                  className={fieldClass}
                  value={data.brandName}
                  onChange={(e) => setData((prev) => ({ ...prev, brandName: e.target.value }))}
                />
              </label>
              <label className="text-sm">
                Brand logo URL
                <input
                  className={fieldClass}
                  type="url"
                  placeholder="https://..."
                  value={data.brandLogoUrl}
                  onChange={(e) => setData((prev) => ({ ...prev, brandLogoUrl: e.target.value }))}
                />
              </label>
              <label className="text-sm md:col-span-2">
                Favicon URL
                <input
                  className={fieldClass}
                  type="url"
                  placeholder="https://..."
                  value={data.brandFaviconUrl}
                  onChange={(e) => setData((prev) => ({ ...prev, brandFaviconUrl: e.target.value }))}
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
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

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <label className="text-sm">
                Address (VI)
                <textarea
                  className={`${fieldClass} min-h-24`}
                  value={data.address.vi}
                  onChange={(e) => setData((prev) => ({ ...prev, address: { ...prev.address, vi: e.target.value } }))}
                />
              </label>
              <label className="text-sm">
                Address (EN)
                <textarea
                  className={`${fieldClass} min-h-24`}
                  value={data.address.en}
                  onChange={(e) => setData((prev) => ({ ...prev, address: { ...prev.address, en: e.target.value } }))}
                />
              </label>
              <label className="text-sm">
                Address (ZH)
                <textarea
                  className={`${fieldClass} min-h-24`}
                  value={data.address.zh}
                  onChange={(e) => setData((prev) => ({ ...prev, address: { ...prev.address, zh: e.target.value } }))}
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <label className="text-sm">
                Facebook URL
                <input
                  className={fieldClass}
                  value={data.socialLinks.facebook}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, facebook: e.target.value } }))
                  }
                />
              </label>
              <label className="text-sm">
                TikTok URL
                <input
                  className={fieldClass}
                  value={data.socialLinks.tiktok}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, tiktok: e.target.value } }))
                  }
                />
              </label>
              <label className="text-sm">
                LinkedIn URL
                <input
                  className={fieldClass}
                  value={data.socialLinks.linkedin}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, linkedin: e.target.value } }))
                  }
                />
              </label>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {homeSlots.map((slot) => (
                <div key={slot} className="rounded-lg border border-[var(--border)]/60 bg-[var(--surface-card)]/60 p-4">
                  <p className="text-sm font-medium">{MEDIA_SLOT_LABELS[slot]}</p>
                  <div className="mt-2 space-y-2">
                    {data.mediaUrls[slot].map((url, idx) => (
                      <div key={`${slot}-${idx}`} className="flex gap-2">
                        <input
                          className={fieldClass}
                          type="url"
                          placeholder="https://..."
                          value={url}
                          onChange={(e) => {
                            const next = [...data.mediaUrls[slot]];
                            next[idx] = e.target.value;
                            setData((prev) => ({ ...prev, mediaUrls: { ...prev.mediaUrls, [slot]: next } }));
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={data.mediaUrls[slot].length <= 1}
                          onClick={() => {
                            const next = data.mediaUrls[slot].filter((_, i) => i !== idx);
                            setData((prev) => ({
                              ...prev,
                              mediaUrls: { ...prev.mediaUrls, [slot]: next.length ? next : [""] },
                            }));
                          }}
                        >
                          Xóa
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        mediaUrls: { ...prev.mediaUrls, [slot]: [...prev.mediaUrls[slot], ""] },
                      }))
                    }
                  >
                    Thêm ảnh
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)]/60 bg-[var(--surface-card)]/40 p-4 md:p-6">
            <h3 className="text-base font-semibold">Landing page manager</h3>
            <p className="mt-1 text-xs text-slate-500">
              Cấu hình nội dung trang chủ riêng theo ngôn ngữ, không đổi color scheme hiện tại.
            </p>

            <div className="mt-4 grid gap-4 lg:grid-cols-[240px_1fr]">
              <aside className="space-y-2 rounded-lg border border-[var(--border)]/60 bg-[var(--surface-card)]/60 p-3">
                {landingNodeList.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                      landingNode === node.id
                        ? "bg-primary/15 font-medium text-primary"
                        : "text-[var(--body-muted)] hover:bg-[var(--surface-nested)]"
                    }`}
                    onClick={() => setLandingNode(node.id)}
                  >
                    {node.label}
                  </button>
                ))}
              </aside>

              <div className="rounded-lg border border-[var(--border)]/60 bg-[var(--surface-card)]/60 p-4">
                <div className="flex flex-wrap gap-2">
                  {localeList.map((locale) => (
                    <button
                      key={locale}
                      type="button"
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                        landingLocale === locale ? "bg-primary text-white" : "bg-[var(--surface-nested)]"
                      }`}
                      onClick={() => setLandingLocale(locale)}
                    >
                      {locale}
                    </button>
                  ))}
                </div>

                {landingNode === "hero" && (
                  <div className="mt-4 grid gap-4">
                    <label className="text-sm">
                      Eyebrow
                      <input
                        className={fieldClass}
                        value={selectedLanding.hero.eyebrow}
                        onChange={(e) =>
                          updateLanding((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, eyebrow: e.target.value },
                          }))
                        }
                      />
                    </label>
                    <label className="text-sm">
                      Title line 1
                      <input
                        className={fieldClass}
                        value={selectedLanding.hero.titleLine1}
                        onChange={(e) =>
                          updateLanding((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, titleLine1: e.target.value },
                          }))
                        }
                      />
                    </label>
                    <label className="text-sm">
                      Title line 2
                      <input
                        className={fieldClass}
                        value={selectedLanding.hero.titleLine2}
                        onChange={(e) =>
                          updateLanding((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, titleLine2: e.target.value },
                          }))
                        }
                      />
                    </label>
                    <label className="text-sm">
                      Subtitle
                      <textarea
                        className={`${fieldClass} min-h-24`}
                        value={selectedLanding.hero.subtitle}
                        onChange={(e) =>
                          updateLanding((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, subtitle: e.target.value },
                          }))
                        }
                      />
                    </label>
                    <div className="grid gap-3 md:grid-cols-3">
                      {selectedLanding.hero.bullets.map((bullet, idx) => (
                        <label key={`hero-bullet-${idx}`} className="text-sm">
                          Bullet {idx + 1}
                          <textarea
                            className={`${fieldClass} min-h-20`}
                            value={bullet}
                            onChange={(e) =>
                              updateLanding((prev) => {
                                const bullets = [...prev.hero.bullets] as [string, string, string];
                                bullets[idx] = e.target.value;
                                return {
                                  ...prev,
                                  hero: { ...prev.hero, bullets },
                                };
                              })
                            }
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {landingNode === "problems" && (
                  <div className="mt-4 grid gap-4">
                    <label className="text-sm">
                      Kicker
                      <input
                        className={fieldClass}
                        value={selectedLanding.problems.kicker}
                        onChange={(e) =>
                          updateLanding((prev) => ({
                            ...prev,
                            problems: { ...prev.problems, kicker: e.target.value },
                          }))
                        }
                      />
                    </label>
                    <label className="text-sm">
                      Title
                      <input
                        className={fieldClass}
                        value={selectedLanding.problems.title}
                        onChange={(e) =>
                          updateLanding((prev) => ({
                            ...prev,
                            problems: { ...prev.problems, title: e.target.value },
                          }))
                        }
                      />
                    </label>
                    <div className="grid gap-3 md:grid-cols-2">
                      {selectedLanding.problems.items.map((item, idx) => (
                        <label key={`problem-${idx}`} className="text-sm">
                          Item {idx + 1}
                          <textarea
                            className={`${fieldClass} min-h-20`}
                            value={item}
                            onChange={(e) =>
                              updateLanding((prev) => {
                                const items = [...prev.problems.items] as [string, string, string, string];
                                items[idx] = e.target.value;
                                return {
                                  ...prev,
                                  problems: { ...prev.problems, items },
                                };
                              })
                            }
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {landingNode === "contact" && (
                  <div className="mt-4 grid gap-4">
                    <label className="text-sm">
                      Contact blurb
                      <textarea
                        className={`${fieldClass} min-h-24`}
                        value={selectedLanding.home.contactBlurb}
                        onChange={(e) =>
                          updateLanding((prev) => ({
                            ...prev,
                            home: { ...prev.home, contactBlurb: e.target.value },
                          }))
                        }
                      />
                    </label>
                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="text-sm">
                        Response time label
                        <input
                          className={fieldClass}
                          value={selectedLanding.home.responseTimeLabel}
                          onChange={(e) =>
                            updateLanding((prev) => ({
                              ...prev,
                              home: { ...prev.home, responseTimeLabel: e.target.value },
                            }))
                          }
                        />
                      </label>
                      <label className="text-sm">
                        Response time value
                        <input
                          className={fieldClass}
                          value={selectedLanding.home.responseTimeValue}
                          onChange={(e) =>
                            updateLanding((prev) => ({
                              ...prev,
                              home: { ...prev.home, responseTimeValue: e.target.value },
                            }))
                          }
                        />
                      </label>
                      <label className="text-sm">
                        Strategy session label
                        <input
                          className={fieldClass}
                          value={selectedLanding.home.strategySessionLabel}
                          onChange={(e) =>
                            updateLanding((prev) => ({
                              ...prev,
                              home: { ...prev.home, strategySessionLabel: e.target.value },
                            }))
                          }
                        />
                      </label>
                      <label className="text-sm">
                        Strategy session value
                        <input
                          className={fieldClass}
                          value={selectedLanding.home.strategySessionValue}
                          onChange={(e) =>
                            updateLanding((prev) => ({
                              ...prev,
                              home: { ...prev.home, strategySessionValue: e.target.value },
                            }))
                          }
                        />
                      </label>
                    </div>
                    <div className="grid gap-3 md:grid-cols-3">
                      <label className="text-sm">
                        Counter 1
                        <input
                          className={fieldClass}
                          value={selectedLanding.home.counters.clients}
                          onChange={(e) =>
                            updateLanding((prev) => ({
                              ...prev,
                              home: {
                                ...prev.home,
                                counters: { ...prev.home.counters, clients: e.target.value },
                              },
                            }))
                          }
                        />
                      </label>
                      <label className="text-sm">
                        Counter 2
                        <input
                          className={fieldClass}
                          value={selectedLanding.home.counters.projects}
                          onChange={(e) =>
                            updateLanding((prev) => ({
                              ...prev,
                              home: {
                                ...prev.home,
                                counters: { ...prev.home.counters, projects: e.target.value },
                              },
                            }))
                          }
                        />
                      </label>
                      <label className="text-sm">
                        Counter 3
                        <input
                          className={fieldClass}
                          value={selectedLanding.home.counters.roas}
                          onChange={(e) =>
                            updateLanding((prev) => ({
                              ...prev,
                              home: {
                                ...prev.home,
                                counters: { ...prev.home.counters, roas: e.target.value },
                              },
                            }))
                          }
                        />
                      </label>
                    </div>
                  </div>
                )}

                {landingNode === "images" && (
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {homeSlots.map((slot) => (
                      <div key={slot} className="rounded-md border border-[var(--border)]/60 p-3">
                        <p className="text-xs text-slate-500">{MEDIA_SLOT_LABELS[slot]}</p>
                        <div className="mt-2 space-y-2">
                          {data.mediaUrls[slot].map((url, idx) => (
                            <div key={`${slot}-${idx}`} className="flex gap-2">
                              <input
                                className={fieldClass}
                                type="url"
                                placeholder="https://..."
                                value={url}
                                onChange={(e) => {
                                  const next = [...data.mediaUrls[slot]];
                                  next[idx] = e.target.value;
                                  setData((prev) => ({
                                    ...prev,
                                    mediaUrls: { ...prev.mediaUrls, [slot]: next },
                                  }));
                                }}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={data.mediaUrls[slot].length <= 1}
                                onClick={() => {
                                  const next = data.mediaUrls[slot].filter((_, i) => i !== idx);
                                  setData((prev) => ({
                                    ...prev,
                                    mediaUrls: {
                                      ...prev.mediaUrls,
                                      [slot]: next.length ? next : [""],
                                    },
                                  }));
                                }}
                              >
                                Xóa
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() =>
                            setData((prev) => ({
                              ...prev,
                              mediaUrls: {
                                ...prev.mediaUrls,
                                [slot]: [...prev.mediaUrls[slot], ""],
                              },
                            }))
                          }
                        >
                          Thêm ảnh
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)]/60 bg-[var(--surface-card)]/40 p-4 md:p-6">
            <h3 className="text-base font-semibold">Service content manager</h3>
            <p className="mt-1 text-xs text-slate-500">
              Chọn service và node để chỉnh text/ảnh riêng. Mỗi locale có bộ nội dung độc lập.
            </p>

            <div className="mt-4 grid gap-4 lg:grid-cols-[280px_1fr]">
              <aside className="space-y-3 rounded-lg border border-[var(--border)]/60 bg-[var(--surface-card)]/60 p-3">
                {serviceSlugs.map((slug) => (
                  <div key={slug} className="rounded-md border border-[var(--border)]/40 p-2">
                    <button
                      type="button"
                      className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium ${
                        selectedService === slug ? "bg-primary text-white" : "bg-[var(--surface-card)]"
                      }`}
                      onClick={() => setSelectedService(slug)}
                    >
                      {serviceLabel(slug)}
                    </button>
                    {selectedService === slug && (
                      <div className="mt-2 space-y-1">
                        {nodeList.map((node) => (
                          <button
                            key={node.id}
                            type="button"
                            className={`w-full rounded-md px-3 py-1.5 text-left text-xs ${
                              selectedNode === node.id
                                ? "bg-primary/15 text-primary"
                                : "text-[var(--body-muted)] hover:bg-[var(--surface-nested)]"
                            }`}
                            onClick={() => setSelectedNode(node.id)}
                          >
                            {node.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </aside>

              <div className="rounded-lg border border-[var(--border)]/60 bg-[var(--surface-card)]/60 p-4">
                <div className="flex flex-wrap gap-2">
                  {localeList.map((locale) => (
                    <button
                      key={locale}
                      type="button"
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                        selectedLocale === locale ? "bg-primary text-white" : "bg-[var(--surface-nested)]"
                      }`}
                      onClick={() => setSelectedLocale(locale)}
                    >
                      {locale}
                    </button>
                  ))}
                </div>

                {selectedNode === "base" && (
                  <div className="mt-4 grid gap-4">
                    <label className="text-sm">
                      Title
                      <input
                        className={fieldClass}
                        value={selectedCopy.title}
                        onChange={(e) => updateSelectedCopy((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </label>
                    <label className="text-sm">
                      Summary
                      <textarea
                        className={`${fieldClass} min-h-20`}
                        value={selectedCopy.summary}
                        onChange={(e) => updateSelectedCopy((prev) => ({ ...prev, summary: e.target.value }))}
                      />
                    </label>
                    <label className="text-sm">
                      Solution headline
                      <input
                        className={fieldClass}
                        value={selectedCopy.solutionHeadline ?? ""}
                        onChange={(e) =>
                          updateSelectedCopy((prev) => ({ ...prev, solutionHeadline: e.target.value }))
                        }
                      />
                    </label>
                    <label className="text-sm">
                      Lead
                      <textarea
                        className={`${fieldClass} min-h-24`}
                        value={selectedCopy.lead}
                        onChange={(e) => updateSelectedCopy((prev) => ({ ...prev, lead: e.target.value }))}
                      />
                    </label>
                    <label className="text-sm">
                      CTA label
                      <input
                        className={fieldClass}
                        value={selectedCopy.ctaLabel ?? ""}
                        onChange={(e) => updateSelectedCopy((prev) => ({ ...prev, ctaLabel: e.target.value }))}
                      />
                    </label>
                  </div>
                )}

                {selectedNode === "sectionTitles" && (
                  <div className="mt-4 grid gap-4">
                    <label className="text-sm">
                      Formats section title
                      <input
                        className={fieldClass}
                        value={selectedCopy.formatsSectionTitle ?? ""}
                        onChange={(e) =>
                          updateSelectedCopy((prev) => ({ ...prev, formatsSectionTitle: e.target.value }))
                        }
                      />
                    </label>
                    <label className="text-sm">
                      Gallery section title
                      <input
                        className={fieldClass}
                        value={selectedCopy.gallerySectionTitle ?? ""}
                        onChange={(e) =>
                          updateSelectedCopy((prev) => ({ ...prev, gallerySectionTitle: e.target.value }))
                        }
                      />
                    </label>
                    <label className="text-sm">
                      Benefits section title
                      <input
                        className={fieldClass}
                        value={selectedCopy.benefitsSectionTitle ?? ""}
                        onChange={(e) =>
                          updateSelectedCopy((prev) => ({ ...prev, benefitsSectionTitle: e.target.value }))
                        }
                      />
                    </label>
                    <label className="text-sm">
                      Process section title
                      <input
                        className={fieldClass}
                        value={selectedCopy.processSectionTitle ?? ""}
                        onChange={(e) =>
                          updateSelectedCopy((prev) => ({ ...prev, processSectionTitle: e.target.value }))
                        }
                      />
                    </label>
                  </div>
                )}

                {selectedNode === "formats" && (
                  <div className="mt-4 space-y-3">
                    {(selectedCopy.formats ?? []).map((item, idx) => (
                      <div key={`fmt-${idx}`} className="rounded-md border border-[var(--border)]/60 p-3">
                        <label className="text-sm">
                          Title
                          <input
                            className={fieldClass}
                            value={item.title}
                            onChange={(e) => updateArrayCard("formats", idx, "title", e.target.value)}
                          />
                        </label>
                        <label className="mt-2 block text-sm">
                          Description
                          <textarea
                            className={`${fieldClass} min-h-20`}
                            value={item.description}
                            onChange={(e) => updateArrayCard("formats", idx, "description", e.target.value)}
                          />
                        </label>
                        <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => removeArrayCard("formats", idx)}>
                          Xóa mục
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateSelectedCopy((prev) => ({
                          ...prev,
                          formats: [...(prev.formats ?? []), { title: "", description: "" }],
                        }))
                      }
                    >
                      Thêm format
                    </Button>
                  </div>
                )}

                {selectedNode === "benefits" && (
                  <div className="mt-4 space-y-3">
                    {(selectedCopy.benefits ?? []).map((item, idx) => (
                      <div key={`benefit-${idx}`} className="rounded-md border border-[var(--border)]/60 p-3">
                        <label className="text-sm">
                          Title
                          <input
                            className={fieldClass}
                            value={item.title}
                            onChange={(e) => updateArrayCard("benefits", idx, "title", e.target.value)}
                          />
                        </label>
                        <label className="mt-2 block text-sm">
                          Description
                          <textarea
                            className={`${fieldClass} min-h-20`}
                            value={item.description}
                            onChange={(e) => updateArrayCard("benefits", idx, "description", e.target.value)}
                          />
                        </label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => removeArrayCard("benefits", idx)}
                        >
                          Xóa mục
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateSelectedCopy((prev) => ({
                          ...prev,
                          benefits: [...(prev.benefits ?? []), { title: "", description: "" }],
                        }))
                      }
                    >
                      Thêm benefit
                    </Button>
                  </div>
                )}

                {selectedNode === "process" && (
                  <div className="mt-4 space-y-3">
                    {(selectedCopy.processSteps ?? []).map((item, idx) => (
                      <div key={`process-${idx}`} className="rounded-md border border-[var(--border)]/60 p-3">
                        <label className="text-sm">
                          Title
                          <input
                            className={fieldClass}
                            value={item.title}
                            onChange={(e) => updateProcess(idx, "title", e.target.value)}
                          />
                        </label>
                        <label className="mt-2 block text-sm">
                          Description
                          <textarea
                            className={`${fieldClass} min-h-20`}
                            value={item.description}
                            onChange={(e) => updateProcess(idx, "description", e.target.value)}
                          />
                        </label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() =>
                            updateSelectedCopy((prev) => ({
                              ...prev,
                              processSteps: (prev.processSteps ?? []).filter((_, i) => i !== idx),
                            }))
                          }
                        >
                          Xóa bước
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateSelectedCopy((prev) => ({
                          ...prev,
                          processSteps: [...(prev.processSteps ?? []), { title: "", description: "" }],
                        }))
                      }
                    >
                      Thêm bước
                    </Button>
                  </div>
                )}

                {selectedNode === "deliverables" && (
                  <div className="mt-4 space-y-3">
                    {(selectedCopy.deliverables ?? []).map((item, idx) => (
                      <div key={`deliver-${idx}`} className="flex gap-2">
                        <input
                          className={fieldClass}
                          value={item}
                          onChange={(e) =>
                            updateSelectedCopy((prev) => {
                              const list = [...(prev.deliverables ?? [])];
                              list[idx] = e.target.value;
                              return { ...prev, deliverables: list };
                            })
                          }
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateSelectedCopy((prev) => ({
                              ...prev,
                              deliverables: (prev.deliverables ?? []).filter((_, i) => i !== idx),
                            }))
                          }
                        >
                          Xóa
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateSelectedCopy((prev) => ({
                          ...prev,
                          deliverables: [...(prev.deliverables ?? []), ""],
                        }))
                      }
                    >
                      Thêm dòng deliverable
                    </Button>
                  </div>
                )}

                {selectedNode === "images" && (
                  <div className="mt-4 rounded-md border border-[var(--border)]/60 p-3">
                    <p className="text-xs text-slate-500">{MEDIA_SLOT_LABELS[serviceMediaSlotId]}</p>
                    <div className="mt-3 space-y-2">
                      {data.mediaUrls[serviceMediaSlotId].map((url, idx) => (
                        <div key={`${serviceMediaSlotId}-${idx}`} className="flex gap-2">
                          <input
                            className={fieldClass}
                            type="url"
                            placeholder="https://..."
                            value={url}
                            onChange={(e) => {
                              const next = [...data.mediaUrls[serviceMediaSlotId]];
                              next[idx] = e.target.value;
                              setData((prev) => ({
                                ...prev,
                                mediaUrls: { ...prev.mediaUrls, [serviceMediaSlotId]: next },
                              }));
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={data.mediaUrls[serviceMediaSlotId].length <= 1}
                            onClick={() => {
                              const next = data.mediaUrls[serviceMediaSlotId].filter((_, i) => i !== idx);
                              setData((prev) => ({
                                ...prev,
                                mediaUrls: {
                                  ...prev.mediaUrls,
                                  [serviceMediaSlotId]: next.length ? next : [""],
                                },
                              }));
                            }}
                          >
                            Xóa
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() =>
                        setData((prev) => ({
                          ...prev,
                          mediaUrls: {
                            ...prev.mediaUrls,
                            [serviceMediaSlotId]: [...prev.mediaUrls[serviceMediaSlotId], ""],
                          },
                        }))
                      }
                    >
                      Thêm ảnh
                    </Button>
                  </div>
                )}
              </div>
            </div>
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
