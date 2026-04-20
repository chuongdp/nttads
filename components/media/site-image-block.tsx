"use client";

import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { normalizeMediaSrc } from "@/lib/site-media";

export type SiteImageBlockProps = {
  src?: string | null;
  alt: string;
  className?: string;
  ratioClassName?: string;
  imageClassName?: string;
};

export function SiteImageBlock({
  src,
  alt,
  className,
  ratioClassName = "aspect-[16/10]",
  imageClassName,
}: SiteImageBlockProps) {
  const href = normalizeMediaSrc(src);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-nested)] shadow-inner",
        ratioClassName,
        className,
      )}
    >
      {href ? (
        // eslint-disable-next-line @next/next/no-img-element -- URL từ admin, domain tùy ý
        <img
          src={href}
          alt={alt}
          className={cn("absolute inset-0 size-full object-cover", imageClassName)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[var(--secondary-text)]"
          aria-hidden
        >
          <ImageIcon className="size-12 opacity-40" strokeWidth={1.25} />
          <span className="text-xs font-medium uppercase tracking-wider opacity-60">
            Image placeholder
          </span>
        </div>
      )}
    </div>
  );
}
