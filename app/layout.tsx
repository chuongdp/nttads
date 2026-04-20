import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { fetchSiteBranding } from "@/lib/site-branding";

/** DESIGN.md (Meta preset): Optimistic VF → Montserrat / Helvetica stack */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nntads.live";

export async function generateMetadata(): Promise<Metadata> {
  const branding = await fetchSiteBranding();
  const hasBrandIcon = Boolean(branding.brandFaviconUrl ?? branding.brandLogoUrl);
  return {
    metadataBase: new URL(siteUrl),
    title: `${branding.brandName} Digital Agency`,
    description: "High-conversion digital marketing agency website",
    icons: hasBrandIcon
      ? {
          icon: [{ url: "/favicon.ico" }],
          shortcut: ["/favicon.ico"],
          apple: ["/favicon.ico"],
        }
      : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
