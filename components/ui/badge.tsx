import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-purple/30 bg-purple/15 text-violet-100",
        blue: "border-blue/30 bg-blue/15 text-sky-100",
        success: "border-emerald-400/30 bg-emerald-400/15 text-emerald-100",
        warning: "border-amber-400/30 bg-amber-400/15 text-amber-100",
        danger: "border-rose-400/30 bg-rose-400/15 text-rose-100",
        outline: "border-white/15 bg-white/[0.04] text-slate-200"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
