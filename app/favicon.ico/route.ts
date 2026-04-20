import { NextResponse } from "next/server";
import { fetchSiteBranding } from "@/lib/site-branding";

export const revalidate = 0;

export async function GET() {
  const branding = await fetchSiteBranding();
  const iconUrl = branding.brandFaviconUrl ?? branding.brandLogoUrl;

  if (!iconUrl) {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  }

  return NextResponse.redirect(iconUrl, {
    status: 307,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  });
}
