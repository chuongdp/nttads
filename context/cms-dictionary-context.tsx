"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { CmsDictionary } from "@/lib/cms-dictionary";
import { getCmsDictionary } from "@/lib/cms-dictionary";
import type { Locale } from "@/lib/i18n";

const CmsDictionaryContext = createContext<CmsDictionary | null>(null);

export function CmsDictionaryProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value = getCmsDictionary(locale);
  return <CmsDictionaryContext.Provider value={value}>{children}</CmsDictionaryContext.Provider>;
}

export function useCmsDictionary(): CmsDictionary {
  const ctx = useContext(CmsDictionaryContext);
  if (!ctx) {
    return getCmsDictionary("vi");
  }
  return ctx;
}
