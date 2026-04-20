import Link from "next/link";
import { Clock, Mail, MapPin, Phone, User } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
  brandLogoUrl?: string;
};

function telHrefVn(display: string): string {
  const digits = display.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length >= 9) return `tel:+84${digits.slice(1)}`;
  if (digits) return `tel:+${digits}`;
  return `tel:${display}`;
}

export function SiteFooter({ locale, dictionary, brandLogoUrl }: SiteFooterProps) {
  const base = `/${locale}`;
  const f = dictionary.footer;

  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface-nested)] text-[var(--foreground)]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 md:grid-cols-2 md:px-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{f.title}</p>
          <div className="mt-2 flex items-center gap-2">
            {brandLogoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- URL cấu hình từ CMS
              <img
                src={brandLogoUrl}
                alt={dictionary.brand}
                className="h-7 w-7 rounded-md object-contain"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : null}
            <h2 className="text-xl font-semibold tracking-tight">{dictionary.brand}</h2>
          </div>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--body-muted)]">{f.subtitle}</p>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex gap-3">
              <User className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="text-xs font-medium text-[var(--secondary-text)]">{f.labelCeo}</p>
                <p className="font-medium text-[var(--foreground)]">{f.ceo}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="text-xs font-medium text-[var(--secondary-text)]">{f.labelAddress}</p>
                <p className="leading-relaxed text-[var(--body-muted)]">{f.address}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="text-xs font-medium text-[var(--secondary-text)]">{f.labelPhone}</p>
                <a
                  href={telHrefVn(f.phone)}
                  className="font-medium text-[var(--foreground)] underline-offset-2 hover:text-primary hover:underline"
                >
                  {f.phone}
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="text-xs font-medium text-[var(--secondary-text)]">{f.labelEmail}</p>
                <a
                  href={`mailto:${f.email}`}
                  className="font-medium break-all text-[var(--foreground)] underline-offset-2 hover:text-primary hover:underline"
                >
                  {f.email}
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="text-xs font-medium text-[var(--secondary-text)]">{f.labelHours}</p>
                <p className="text-[var(--body-muted)]">{f.hours}</p>
              </div>
            </li>
          </ul>
        </div>

        <nav
          className="flex flex-col gap-3 border-t border-[var(--border)] pt-8 md:border-t-0 md:pt-0 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-8"
          aria-label={f.quickLinksTitle}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary-text)]">
            {f.quickLinksTitle}
          </p>
          <Link href={base} className="text-sm font-medium hover:text-primary">
            {dictionary.nav.home}
          </Link>
          <Link href={`${base}/services`} className="text-sm font-medium hover:text-primary">
            {dictionary.nav.services}
          </Link>
          <Link href={`${base}/portfolio`} className="text-sm font-medium hover:text-primary">
            {dictionary.nav.portfolio}
          </Link>
          <Link href={`${base}/about`} className="text-sm font-medium hover:text-primary">
            {dictionary.nav.about}
          </Link>
          <Link href={`${base}/blog`} className="text-sm font-medium hover:text-primary">
            {dictionary.nav.blog}
          </Link>
          <Link href={`${base}#contact`} className="text-sm font-medium text-primary hover:underline">
            {f.contactCta}
          </Link>
        </nav>

        <div className="flex flex-col justify-end border-t border-[var(--border)] pt-8 md:col-span-2 md:border-t-0 md:pt-0 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8">
          <p className="text-xs leading-relaxed text-[var(--secondary-text)]">{f.legal}</p>
        </div>
      </div>
    </footer>
  );
}
