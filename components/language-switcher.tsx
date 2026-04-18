"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { locales, type Locale } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const localeLabels: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
  zh: "中文",
};

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="toolbar" size="icon" aria-label="Switch language">
          <Languages className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((item) => (
          <DropdownMenuCheckboxItem
            key={item}
            checked={item === locale}
            onCheckedChange={() => setLocale(item)}
          >
            {localeLabels[item]}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
