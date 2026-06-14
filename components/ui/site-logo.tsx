import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
  href?: string;
  imageClassName?: string;
  priority?: boolean;
  textClassName?: string;
  showText?: boolean;
  size?: number;
}

export function SiteLogo({
  className,
  href = "/",
  imageClassName,
  priority = false,
  textClassName,
  showText = false,
  size = 40
}: SiteLogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-3 transition hover:opacity-90",
        className
      )}
    >
      <Image
        src="/images/pathforge-logo.jpeg"
        alt="PathForge logo"
        width={604}
        height={604}
        priority={priority}
        style={showText ? undefined : { width: size, height: "auto" }}
        className={cn(
          "h-auto object-contain",
          showText ? "w-[168px]" : undefined,
          imageClassName
        )}
      />
      {showText ? (
        <span className={cn("text-sm font-semibold text-white sm:text-base", textClassName)}>
          PathForge AI
        </span>
      ) : null}
    </Link>
  );
}
