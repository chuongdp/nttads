"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

type PainPointsSectionProps = {
  title: string;
  subtitle: string;
  items: string[];
};

const listContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function PainPointsSection({ title, subtitle, items }: PainPointsSectionProps) {
  return (
    <motion.section
      className="rounded-[20px] border border-[var(--border)] bg-[var(--surface-card)] px-6 py-10 shadow-[0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.35)] md:px-10 md:py-12"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -48px 0px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.p
        className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {subtitle}
      </motion.p>
      <motion.h2
        className="mt-2 text-center text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.42, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>
      <motion.ul
        className="mx-auto mt-8 grid max-w-3xl gap-4"
        variants={listContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        role="list"
      >
        {items.map((item) => (
          <motion.li
            key={item}
            variants={listItem}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            className="flex gap-3 rounded-[20px] border border-[var(--border)] bg-[var(--surface-nested)] p-4 text-left text-sm leading-relaxed text-[var(--foreground)] md:text-base"
          >
            <motion.span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              aria-hidden
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </motion.span>
            <span>{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
