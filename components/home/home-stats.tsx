"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, TrendingUp, Users, type LucideIcon } from "lucide-react";

const ICON_MAP = {
  users: Users,
  briefcase: BriefcaseBusiness,
  trending: TrendingUp,
} as const satisfies Record<string, LucideIcon>;

export type StatIconKey = keyof typeof ICON_MAP;

export type StatItem = {
  iconKey: StatIconKey;
  value: string;
  label: string;
};

const list = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cell = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
};

type HomeStatsProps = {
  items: StatItem[];
};

export function HomeStats({ items }: HomeStatsProps) {
  return (
    <motion.section
      className="grid grid-cols-1 gap-6 md:grid-cols-3"
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -40px 0px" }}
    >
      {items.map(({ iconKey, value, label }) => {
        const Icon = ICON_MAP[iconKey];
        return (
          <motion.article
            key={label}
            variants={cell}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-[20px] border border-[var(--border)] bg-[var(--surface-card)] p-6 shadow-[0_2px_4px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
          >
            <motion.span
              className="inline-flex rounded-lg bg-primary/12 p-2 text-primary"
              whileHover={{ rotate: [0, -6, 6, 0], transition: { duration: 0.45 } }}
            >
              <Icon className="h-5 w-5" aria-hidden />
            </motion.span>
            <p className="mt-4 text-3xl font-medium tracking-tight text-[var(--foreground)]">{value}</p>
            <p className="text-sm text-[var(--body-muted)]">{label}</p>
          </motion.article>
        );
      })}
    </motion.section>
  );
}
