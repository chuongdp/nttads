"use client";

import { createContext, useContext, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  defaultLocale,
  dictionaries,
  type Locale,
  locales,
} from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  dictionary: (typeof dictionaries)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type LanguageProviderProps = {
  locale: Locale;
  children: React.ReactNode;
};

export function LanguageProvider({ locale, children }: LanguageProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dictionary: dictionaries[locale] ?? dictionaries[defaultLocale],
      setLocale(nextLocale) {
        if (!locales.includes(nextLocale)) return;
        const segments = pathname.split("/").filter(Boolean);
        if (segments.length === 0) {
          router.push(`/${nextLocale}`);
          return;
        }
        segments[0] = nextLocale;
        router.push(`/${segments.join("/")}`);
      },
    }),
    [locale, pathname, router],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
