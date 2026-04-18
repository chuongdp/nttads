import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
    };
  };
};

const serviceLinks = [
  { slug: "google-ads", label: "Google Ads" },
  { slug: "facebook-ads", label: "Facebook Ads" },
  { slug: "tiktok-ads", label: "TikTok Ads" },
  { slug: "seo", label: "SEO Services" },
];

export function Navbar({ locale, dictionary }: NavbarProps) {
  const base = `/${locale}`;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-card)_92%,transparent)] backdrop-blur-md supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--surface-card)_86%,transparent)]">
      <nav className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between px-4 md:h-16 md:px-6">
        <Link href={base} className="text-base font-semibold tracking-tight text-[var(--foreground)]">
          {dictionary.brand}
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
            href={`${base}/admin`}
            className="text-base font-medium text-[var(--foreground)] decoration-2 underline-offset-4 hover:underline"
          >
            {dictionary.nav.admin}
          </Link>
        </div>

        <div className="flex items-center gap-2">
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
    </header>
  );
}
