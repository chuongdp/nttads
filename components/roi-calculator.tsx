"use client";

import { useMemo, useState } from "react";
import { Calculator, MousePointerClick, UserRoundCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Locale } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

type RoiCalculatorProps = {
  locale: Locale;
};

const localeMap: Record<Locale, string> = {
  vi: "vi-VN",
  en: "en-US",
  zh: "zh-CN",
};

const roiText: Record<
  Locale,
  {
    title: string;
    description: string;
    budget: string;
    cpc: string;
    cr: string;
    updated: string;
    save: string;
    saving: string;
    saveSuccess: string;
    saveError: string;
    clicks: string;
    leads: string;
    cpl: string;
    validation: string;
  }
> = {
  vi: {
    title: "Công cụ tính ROI quảng cáo",
    description: "Ước tính hiệu quả chiến dịch theo ngân sách, CPC và tỷ lệ chuyển đổi.",
    budget: "Ngân sách (USD)",
    cpc: "CPC dự kiến (USD)",
    cr: "Tỷ lệ chuyển đổi (%)",
    updated: "Cập nhật dự toán",
    save: "Lưu kết quả",
    saving: "Đang lưu...",
    saveSuccess: "Đã lưu kết quả ROI thành công.",
    saveError: "Lưu thất bại. Vui lòng thử lại.",
    clicks: "Lượt click ước tính",
    leads: "Lead ước tính",
    cpl: "Chi phí/Lead ước tính (CPL)",
    validation: "Giá trị phải hợp lệ: ngân sách >= 0, CPC > 0, CR từ 0 đến 100.",
  },
  en: {
    title: "Ads ROI Calculator",
    description: "Estimate campaign outcome from budget, CPC, and conversion rate.",
    budget: "Budget (USD)",
    cpc: "Expected CPC (USD)",
    cr: "Conversion Rate (%)",
    updated: "Update estimate",
    save: "Save result",
    saving: "Saving...",
    saveSuccess: "ROI result saved successfully.",
    saveError: "Save failed. Please try again.",
    clicks: "Estimated Clicks",
    leads: "Estimated Leads",
    cpl: "Estimated Cost per Lead (CPL)",
    validation: "Use valid values: budget >= 0, CPC > 0, conversion rate between 0 and 100.",
  },
  zh: {
    title: "广告 ROI 计算器",
    description: "根据预算、CPC 与转化率快速估算投放结果。",
    budget: "预算 (USD)",
    cpc: "预期 CPC (USD)",
    cr: "转化率 (%)",
    updated: "更新估算",
    save: "保存结果",
    saving: "保存中...",
    saveSuccess: "ROI 结果已成功保存。",
    saveError: "保存失败，请重试。",
    clicks: "预计点击",
    leads: "预计线索",
    cpl: "预计每条线索成本 (CPL)",
    validation: "请输入有效数值：预算>=0，CPC>0，转化率在0到100之间。",
  },
};

export function RoiCalculator({ locale }: RoiCalculatorProps) {
  const [budget, setBudget] = useState(1000);
  const [cpc, setCpc] = useState(0.5);
  const [conversionRate, setConversionRate] = useState(2);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [estimateKey, setEstimateKey] = useState(0);
  const t = roiText[locale];
  const numberFormatter = new Intl.NumberFormat(localeMap[locale], {
    maximumFractionDigits: 0,
  });
  const currencyFormatter = new Intl.NumberFormat(localeMap[locale], {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  const isValid = budget >= 0 && cpc > 0 && conversionRate >= 0 && conversionRate <= 100;

  const estimated = useMemo(() => {
    const clicks = cpc > 0 && budget >= 0 ? budget / cpc : 0;
    const leads = clicks * (conversionRate / 100);
    const cpl = leads > 0 ? budget / leads : 0;
    return { clicks, leads, cpl };
  }, [budget, cpc, conversionRate]);

  function handleUpdateEstimate() {
    if (!isValid) return;
    setSaveMessage("");
    setEstimateKey((k) => k + 1);
    document.getElementById("roi-estimate-results")?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  async function saveResult() {
    if (!isValid) return;
    setSaving(true);
    setSaveMessage("");

    const { error } = await supabase.from("roi_calculations").insert({
      locale,
      budget,
      expected_cpc: cpc,
      conversion_rate: conversionRate,
      estimated_clicks: estimated.clicks,
      estimated_leads: estimated.leads,
      estimated_cpl: estimated.cpl,
    });

    setSaveMessage(error ? t.saveError : t.saveSuccess);
    setSaving(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calculator className="h-5 w-5 text-primary" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="budget">{t.budget}</Label>
            <Input
              id="budget"
              type="number"
              min={0}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpc">{t.cpc}</Label>
            <Input
              id="cpc"
              type="number"
              min={0.01}
              step="0.01"
              value={cpc}
              onChange={(e) => setCpc(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="conversion-rate">{t.cr}</Label>
            <Input
              id="conversion-rate"
              type="number"
              min={0}
              max={100}
              step="0.1"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full md:w-auto"
              disabled={!isValid}
              onClick={handleUpdateEstimate}
            >
              {t.updated}
            </Button>
            <Button
              onClick={saveResult}
              className="w-full md:w-auto"
              disabled={!isValid || saving}
            >
              {saving ? t.saving : t.save}
            </Button>
          </div>
          {!isValid && <p className="text-sm text-[#E41E3F] dark:text-[#ff7b91]">{t.validation}</p>}
          {saveMessage && <p className="text-sm text-[var(--body-muted)]">{saveMessage}</p>}
        </div>

        <div id="roi-estimate-results" key={estimateKey} className="grid gap-3">
          <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface-nested)] p-4">
            <p className="flex items-center gap-2 text-sm text-[var(--secondary-text)]">
              <MousePointerClick className="h-4 w-4" />
              {t.clicks}
            </p>
            <p className="mt-1 text-2xl font-semibold text-[var(--foreground)]">
              {numberFormatter.format(isValid ? estimated.clicks : 0)}
            </p>
          </div>
          <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface-nested)] p-4">
            <p className="flex items-center gap-2 text-sm text-[var(--secondary-text)]">
              <UserRoundCheck className="h-4 w-4" />
              {t.leads}
            </p>
            <p className="mt-1 text-2xl font-semibold text-[var(--foreground)]">
              {numberFormatter.format(isValid ? estimated.leads : 0)}
            </p>
          </div>
          <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface-info)] p-4">
            <p className="text-sm text-[var(--secondary-text)]">{t.cpl}</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--foreground)]">
              {currencyFormatter.format(
                isValid && Number.isFinite(estimated.cpl) ? estimated.cpl : 0,
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
