"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavbarProps = {
  locale: Locale;
  brandLogoUrl?: string;
  dictionary: {
    brand: string;
    nav: {
      home: string;
      services: string;
      portfolio: string;
      about: string;
      blog: string;
      admin: string;
      contact: string;
      menuOpen: string;
      menuClose: string;
    };
  };
};

const serviceLinks = [
  { slug: "google-ads", label: "Google Ads" },
  { slug: "facebook-ads", label: "Facebook Ads" },
  { slug: "tiktok-ads", label: "TikTok Ads" },
  { slug: "seo", label: "SEO Services" },
];

export function Navbar({ locale, dictionary, brandLogoUrl }: NavbarProps) {
  const base = `/${locale}`;
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    void Promise.resolve().then(() => {
      setMobileOpen(false);
    });
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-card)_92%,transparent)] backdrop-blur-md supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--surface-card)_86%,transparent)]">
      <nav className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between px-4 md:h-16 md:px-6">
        <Link href={base} className="flex items-center gap-2 text-base font-semibold tracking-tight text-[var(--foreground)]">
          {brandLogoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- URL cấu hình từ CMS
            <img
              src={brandLogoUrl}
              alt={dictionary.brand}
              className="h-8 w-8 rounded-md object-contain"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : null}
          <span>{dictionary.brand}</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <Link
            href={base}
            className="text-base font-medium text-[var(--foreground)] decoration-2 underline-offset-4 hover:underline"
          >
            {dictionary.nav.home}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "group inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-base font-medium text-[var(--foreground)] outline-none",
                "transition-[background,color,box-shadow] duration-200",
                "hover:bg-[color-mix(in_srgb,var(--surface-nested)_92%,transparent)]",
                "focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "data-[state=open]:bg-[var(--surface-nested)] data-[state=open]:text-primary",
              )}
            >
              {dictionary.nav.services}
              <ChevronDown
                className="h-4 w-4 shrink-0 text-[var(--body-muted)] transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                aria-hidden
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[13.5rem]">
              {serviceLinks.map((service) => (
                <DropdownMenuItem key={service.slug} asChild>
                  <Link href={`${base}/services/${service.slug}`}>{service.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href={`${base}/portfolio`}
            className="text-base font-medium text-[var(--foreground)] decoration-2 underline-offset-4 hover:underline"
          >
            {dictionary.nav.portfolio}
          </Link>
          <Link
            href={`${base}/about`}
            className="text-base font-medium text-[var(--foreground)] decoration-2 underline-offset-4 hover:underline"
          >
            {dictionary.nav.about}
          </Link>
          <Link
            href={`${base}/blog`}
            className="text-base font-medium text-[var(--foreground)] decoration-2 underline-offset-4 hover:underline"
          >
            {dictionary.nav.blog}
          </Link>
          <Link
            href={`${base}/cms/dashboard`}
            className="text-base font-medium text-[var(--foreground)] decoration-2 underline-offset-4 hover:underline"
          >
            {dictionary.nav.admin}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-card)] text-[var(--foreground)] outline-none transition hover:bg-[var(--surface-nested)] focus-visible:ring-2 focus-visible:ring-primary/35 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-primary-nav"
            aria-label={mobileOpen ? dictionary.nav.menuClose : dictionary.nav.menuOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
          <LanguageSwitcher />
          <ThemeToggle />
          <Button asChild size="sm" variant="outline" className="md:hidden">
            <Link href={`${base}#contact`}>{dictionary.nav.contact}</Link>
          </Button>
          <Button asChild className="hidden md:inline-flex">
            <Link href={`${base}#contact`}>{dictionary.nav.contact}</Link>
          </Button>
        </div>
      </nav>

      {mobileOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/45 md:hidden"
            aria-hidden
            tabIndex={-1}
            onClick={() => setMobileOpen(false)}
          />
          <div
            id="mobile-primary-nav"
            className="fixed left-0 right-0 top-14 z-50 max-h-[min(28rem,calc(100dvh-3.5rem))] overflow-y-auto border-b border-[var(--border)] bg-[var(--surface-card)] px-4 py-4 shadow-lg md:hidden"
          >
            <div className="mx-auto flex max-w-[1440px] flex-col gap-1">
              <Link
                href={base}
                className="rounded-lg px-3 py-3 text-base font-medium text-[var(--foreground)] hover:bg-[var(--surface-nested)]"
                onClick={() => setMobileOpen(false)}
              >
                {dictionary.nav.home}
              </Link>
              <details className="group rounded-lg border border-[var(--border)]/60 bg-[var(--surface-nested)]/40 open:bg-[var(--surface-nested)]">
                <summary className="cursor-pointer list-none px-3 py-3 text-base font-medium text-[var(--foreground)] [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2">
                    {dictionary.nav.services}
                    <ChevronDown className="h-4 w-4 shrink-0 text-[var(--body-muted)] transition-transform group-open:rotate-180" aria-hidden />
                  </span>
                </summary>
                <div className="border-t border-[var(--border)]/50 px-2 py-2">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.slug}
                      href={`${base}/services/${service.slug}`}
                      className="block rounded-md px-3 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--surface-card)]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </details>
              <Link
                href={`${base}/portfolio`}
                className="rounded-lg px-3 py-3 text-base font-medium text-[var(--foreground)] hover:bg-[var(--surface-nested)]"
                onClick={() => setMobileOpen(false)}
              >
                {dictionary.nav.portfolio}
              </Link>
              <Link
                href={`${base}/about`}
                className="rounded-lg px-3 py-3 text-base font-medium text-[var(--foreground)] hover:bg-[var(--surface-nested)]"
                onClick={() => setMobileOpen(false)}
              >
                {dictionary.nav.about}
              </Link>
              <Link
                href={`${base}/blog`}
                className="rounded-lg px-3 py-3 text-base font-medium text-[var(--foreground)] hover:bg-[var(--surface-nested)]"
                onClick={() => setMobileOpen(false)}
              >
                {dictionary.nav.blog}
              </Link>
              <Link
                href={`${base}/cms/dashboard`}
                className="rounded-lg px-3 py-3 text-base font-medium text-[var(--foreground)] hover:bg-[var(--surface-nested)]"
                onClick={() => setMobileOpen(false)}
              >
                {dictionary.nav.admin}
              </Link>
              <Link
                href={`${base}#contact`}
                className="mt-1 rounded-lg border border-primary/35 bg-primary/10 px-3 py-3 text-center text-base font-medium text-primary hover:bg-primary/15"
                onClick={() => setMobileOpen(false)}
              >
                {dictionary.nav.contact}
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
