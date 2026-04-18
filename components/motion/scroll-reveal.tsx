"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Trễ trước khi bắt đầu (giây) */
  delay?: number;
  /** 0–1: phần phần tử vào viewport để kích hoạt */
  amount?: number;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "whileInView" | "viewport">;

export function ScrollReveal({
  children,
  className,
  delay = 0,
  amount = 0.2,
  ...motionProps
}: ScrollRevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.52, delay, ease: [0.16, 1, 0.3, 1] }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
