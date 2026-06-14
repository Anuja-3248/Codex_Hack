import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
  textClassName?: string;
  showText?: boolean;
  size?: number;
}

export function SiteLogo({
  className,
  textClassName,
  showText = true,
  size = 40
}: SiteLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-3 transition hover:opacity-90",
        className
      )}
    >
      <div
        className="relative overflow-hidden rounded-2xl bg-slate-900/90 shadow-glow"
        style={{ width: size, height: size }}
      >
        <Image
          src="/images/pathforge-logo.svg"
          alt="PathForge logo"
          fill
          className="object-contain"
          sizes={`${size}px`}
        />
      </div>
      {showText ? (
        <span className={cn("text-sm font-semibold text-white sm:text-base", textClassName)}>
          PathForge AI
        </span>
      ) : null}
    </Link>
  );
}
