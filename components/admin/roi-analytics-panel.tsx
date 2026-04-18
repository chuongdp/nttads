"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BarChart3, Loader2, RefreshCcw } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

type RoiRow = {
  id: string;
  locale: string;
  budget: number;
  expected_cpc: number;
  conversion_rate: number;
  estimated_clicks: number;
  estimated_leads: number;
  estimated_cpl: number;
  created_at: string;
};

type LocaleFilter = "all" | "vi" | "en" | "zh";
type PeriodFilter = "7d" | "30d";

const selectClass =
  "h-10 rounded-lg bg-[var(--surface-card)] px-3 text-sm text-[var(--foreground)] outline-none focus-visible:ring-2 focus-visible:ring-primary/35";

export function RoiAnalyticsPanel() {
  const [rows, setRows] = useState<RoiRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [localeFilter, setLocaleFilter] = useState<LocaleFilter>("all");
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>("7d");

  const fetchLatestRoiRows = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }
    setMessage("");

    const days = periodFilter === "7d" ? 7 : 30;
    const sinceDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    let query = supabase
      .from("roi_calculations")
      .select(
        "id,locale,budget,expected_cpc,conversion_rate,estimated_clicks,estimated_leads,estimated_cpl,created_at",
      )
      .gte("created_at", sinceDate)
      .order("created_at", { ascending: false })
      .limit(10);

    if (localeFilter !== "all") {
      query = query.eq("locale", localeFilter);
    }

    const { data, error } = await query.returns<RoiRow[]>();

    if (error) {
      setMessage(`Load failed: ${error.message}`);
      setRows([]);
      setLoading(false);
      return;
    }

    setRows(data ?? []);
    setLoading(false);
  }, [localeFilter, periodFilter]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchLatestRoiRows(false);
  }, [fetchLatestRoiRows]);

  const summary = useMemo(() => {
    const total = rows.length;
    const avgBudget =
      total > 0 ? rows.reduce((acc, row) => acc + Number(row.budget), 0) / total : 0;
    const avgLeads =
      total > 0 ? rows.reduce((acc, row) => acc + Number(row.estimated_leads), 0) / total : 0;
    return { total, avgBudget, avgLeads };
  }, [rows]);

  return (
    <section className="pt-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <BarChart3 className="h-5 w-5 text-primary" />
            ROI Analytics (Latest 10)
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Quick snapshot from public ROI calculator submissions.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            className={selectClass}
            value={localeFilter}
            onChange={(e) => setLocaleFilter(e.target.value as LocaleFilter)}
          >
            <option value="all">All locales</option>
            <option value="vi">VI</option>
            <option value="en">EN</option>
            <option value="zh">ZH</option>
          </select>
          <select
            className={selectClass}
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value as PeriodFilter)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
          <Button variant="outline" onClick={() => void fetchLatestRoiRows(true)} disabled={loading}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="mt-5 grid gap-6 sm:grid-cols-3 sm:gap-8">
        <div>
          <p className="text-sm text-slate-500">Records</p>
          <p className="text-2xl font-bold tabular-nums">{summary.total}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Average Budget</p>
          <p className="text-2xl font-bold tabular-nums">${summary.avgBudget.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Average Leads</p>
          <p className="text-2xl font-bold tabular-nums">{summary.avgLeads.toFixed(1)}</p>
        </div>
      </div>

      {loading ? (
        <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading latest ROI records...
        </div>
      ) : rows.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">
          {message || "No ROI records found yet."}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-[var(--border)]/60 bg-[var(--surface-card)]/40">
              <tr>
                <th className="px-3 py-2 font-medium">Created At</th>
                <th className="px-3 py-2 font-medium">Locale</th>
                <th className="px-3 py-2 font-medium">Budget</th>
                <th className="px-3 py-2 font-medium">CPC</th>
                <th className="px-3 py-2 font-medium">CR (%)</th>
                <th className="px-3 py-2 font-medium">Clicks</th>
                <th className="px-3 py-2 font-medium">Leads</th>
                <th className="px-3 py-2 font-medium">CPL</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-[var(--border)]/40 last:border-0">
                  <td className="px-3 py-2">{new Date(row.created_at).toLocaleString()}</td>
                  <td className="px-3 py-2 uppercase">{row.locale}</td>
                  <td className="px-3 py-2">${Number(row.budget).toFixed(2)}</td>
                  <td className="px-3 py-2">${Number(row.expected_cpc).toFixed(2)}</td>
                  <td className="px-3 py-2">{Number(row.conversion_rate).toFixed(2)}</td>
                  <td className="px-3 py-2">{Number(row.estimated_clicks).toFixed(0)}</td>
                  <td className="px-3 py-2">{Number(row.estimated_leads).toFixed(0)}</td>
                  <td className="px-3 py-2">${Number(row.estimated_cpl).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
