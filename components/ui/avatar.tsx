import { cn } from "@/lib/utils";

interface AvatarProps {
  initials: string;
  className?: string;
}

export function Avatar({ initials, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-purple to-blue text-sm font-semibold text-white shadow-glow",
        className
      )}
    >
      {initials}
    </div>
  );
}
