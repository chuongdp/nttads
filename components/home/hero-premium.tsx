"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Rocket, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export type HeroPremiumCopy = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  cta: string;
  secondaryCta: string;
  bullets: [string, string, string];
  statsTitle: string;
  statsFootnote: string;
};

type HeroPremiumProps = {
  copy: HeroPremiumCopy;
};

const bulletContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
};

const bulletItem = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] as const } },
};

const statGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
};

const statBox = {
  hidden: { opacity: 0, y: 10, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as const } },
};

export function HeroPremium({ copy }: HeroPremiumProps) {
  const params = useParams();
  const locale = typeof params.locale === "string" ? params.locale : "vi";
  const contactHref = `/${locale}#contact`;
  const blogHref = `/${locale}/blog`;
  return (
    <section className="relative overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--baby-blue)] px-6 py-10 text-[var(--foreground)] md:px-10 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--surface-card)]/70 via-transparent to-[var(--surface-page)] dark:from-[var(--surface-card)]/25 dark:to-transparent" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-1/4 h-56 w-56 rounded-full bg-primary/30 blur-3xl dark:bg-primary/18"
        animate={{ y: [0, 14, 0], x: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-8 h-72 w-72 rounded-full bg-cyan-400/25 blur-3xl dark:bg-cyan-500/12"
        animate={{ y: [0, -18, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.22em] text-primary md:text-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {copy.eyebrow}
          </motion.p>

          <motion.h1
            className="mt-4 text-3xl font-semibold leading-[1.12] tracking-tight text-[var(--foreground)] md:text-5xl lg:text-[3.25rem]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <span className="block">{copy.titleLine1}</span>
            <span className="block text-primary">{copy.titleLine2}</span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-[var(--body-muted)] md:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            {copy.subtitle}
          </motion.p>

          <motion.ul
            className="mt-6 space-y-2.5 text-sm text-[var(--foreground)] md:text-base"
            variants={bulletContainer}
            initial="hidden"
            animate="show"
          >
            {copy.bullets.map((line) => (
              <motion.li key={line} variants={bulletItem} className="flex gap-2">
                <motion.span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.6 }}
                />
                <span>{line}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button asChild className="w-full sm:w-auto">
                <Link href={contactHref}>{copy.cta}</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href={blogHref}>{copy.secondaryCta}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface-card)] p-5 shadow-[0_12px_28px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
            <motion.div
              className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.35 }}
            >
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Rocket className="h-4 w-4 text-primary" aria-hidden />
              </motion.span>
              {copy.statsTitle}
            </motion.div>
            <motion.div
              className="mt-4 grid grid-cols-3 gap-3"
              variants={statGrid}
              initial="hidden"
              animate="show"
            >
              {(
                [
                  { k: "ROAS", v: "4.2x" },
                  { k: "CPA", v: "-32%" },
                  { k: "CVR", v: "+58%" },
                ] as const
              ).map((cell) => (
                <motion.div
                  key={cell.k}
                  variants={statBox}
                  whileHover={{ y: -2 }}
                  className="rounded-[12px] bg-[var(--surface-nested)] p-3"
                >
                  <p className="text-xs text-[var(--secondary-text)]">{cell.k}</p>
                  <p className="mt-1 text-xl font-semibold text-[var(--foreground)]">{cell.v}</p>
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-4 flex items-start gap-2 border-t border-[var(--border)] pt-4 text-xs leading-relaxed text-[var(--secondary-text)]">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              {copy.statsFootnote}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
