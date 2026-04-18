"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiGoogleads,
  SiMeta,
  SiTiktok,
  SiSemrush,
  SiShopify,
} from "react-icons/si";
import { cn } from "@/lib/utils";

type PartnerEntry =
  | { kind: "icon"; id: string; label: string; Icon: IconType; colorClass: string }
  | { kind: "img"; id: string; label: string; src: string };

/** Màu gốc (tham chiếu Simple Icons / brand guideline). TikTok: đen trên nền sáng, accent trên dark. */
const partners = [
  {
    kind: "icon",
    id: "google",
    label: "Google Partner",
    Icon: SiGoogleads,
    colorClass: "text-[#4285F4]",
  },
  {
    kind: "icon",
    id: "meta",
    label: "Meta Business",
    Icon: SiMeta,
    colorClass: "text-[#0866FF]",
  },
  {
    kind: "icon",
    id: "tiktok",
    label: "TikTok for Business",
    Icon: SiTiktok,
    colorClass: "text-[#000000] dark:text-[#FE2C55]",
  },
  {
    kind: "img",
    id: "ahrefs",
    label: "Ahrefs",
    src: "https://www.google.com/s2/favicons?sz=64&domain=ahrefs.com",
  },
  {
    kind: "icon",
    id: "semrush",
    label: "SEMrush",
    Icon: SiSemrush,
    colorClass: "text-[#FF642D]",
  },
  {
    kind: "icon",
    id: "shopify",
    label: "Shopify Plus",
    Icon: SiShopify,
    colorClass: "text-[#7AB55C]",
  },
] as const satisfies readonly PartnerEntry[];

const tileClass =
  "flex h-[4.25rem] items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] px-4 shadow-sm transition duration-200 hover:border-primary/25 hover:shadow-[0_6px_20px_-6px_color-mix(in_srgb,var(--primary)_35%,transparent)] dark:hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)]";

const iconMotionClass =
  "h-9 w-9 transition-[opacity,transform] duration-200 hover:scale-110 hover:opacity-100 opacity-95";

const rowVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function PartnersMarquee() {
  return (
    <motion.section
      className="rounded-[20px] border border-[var(--border)] bg-[var(--surface-nested)] p-5 shadow-[0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
    >
      <motion.p
        className="mb-4 text-sm font-medium text-[var(--body-muted)]"
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
      >
        Trusted Platforms & Partners
      </motion.p>
      <motion.ul
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        role="list"
        variants={rowVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {partners.map((p) => (
          <motion.li key={p.id} variants={tileVariants}>
            <motion.div
              className={tileClass}
              aria-label={p.label}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              {p.kind === "icon" ? (
                <p.Icon className={cn(iconMotionClass, p.colorClass)} aria-hidden />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- favicon CDN, không cần optimizer
                <img
                  src={p.src}
                  alt=""
                  width={36}
                  height={36}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className={`${iconMotionClass} object-contain`}
                />
              )}
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
