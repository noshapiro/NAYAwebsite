"use client";

import { motion, type MotionProps } from "framer-motion";
import type { PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<
  {
    className?: string;
    delay?: number;
    once?: boolean;
  } & MotionProps
>;

export function Reveal({ children, className, delay = 0, once = true, ...rest }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once, amount: 0.2 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

