"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function MotionPage({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn("min-h-full", className)}
    >
      {children}
    </motion.div>
  );
}
