"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Bell,
  BrainCircuit,
  ClipboardCheck,
  Gauge,
  Search,
  Target,
  Trophy
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteLogo } from "@/components/ui/site-logo";
import { clearDemoSession, readDemoSession } from "@/lib/demo-auth";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/assessment", label: "Assessment", icon: ClipboardCheck },
  { href: "/analysis", label: "Analysis", icon: BrainCircuit },
  { href: "/assignments", label: "Assignments", icon: Target },
  { href: "/opportunities", label: "Opportunities", icon: Trophy },
  { href: "/progress", label: "Progress", icon: BarChart3 }
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const session = readDemoSession();

    if (!session) {
      router.replace("/login");
      return;
    }

    setIsAuthorized(true);
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="dashboard-palette flex min-h-screen items-center justify-center px-4 text-slate-600">
        Checking demo access...
      </div>
    );
  }

  return (
    <div className="dashboard-palette min-h-screen text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/10 bg-slate-950/55 p-4 backdrop-blur-2xl lg:block">
        <div className="px-2 py-3">
          <SiteLogo imageClassName="w-[168px]" />
          <p className="mt-2 text-xs text-slate-400">Career intelligence</p>
        </div>

        <nav className="mt-8 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-white/[0.1] text-white shadow-glow"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    active ? "text-cyan-200" : "text-slate-500 group-hover:text-slate-200"
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-cyan-300/15">
            <Gauge className="h-4 w-4 text-cyan-100" />
          </div>
          <p className="text-sm font-medium text-white">Readiness scan active</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            AI is mapping assignments to your current career gaps.
          </p>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/50 backdrop-blur-2xl">
          <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <SiteLogo className="lg:hidden" imageClassName="w-[132px]" />

            <div className="hidden flex-1 items-center md:flex">
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  className="h-10 border-white/10 bg-white/[0.04] pl-9"
                  placeholder="Search assignments, skills, opportunities..."
                />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  clearDemoSession();
                  router.push("/login");
                }}
              >
                Sign out
              </Button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-slate-300 transition hover:bg-white/[0.09] hover:text-white"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
              </button>
              <Avatar initials="AX" />
            </div>
          </div>

          <nav className="flex gap-1 overflow-x-auto border-t border-white/10 px-4 py-2 lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-xs font-medium",
                    active
                      ? "bg-white/[0.1] text-white"
                      : "text-slate-400 hover:bg-white/[0.06]"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="dashboard-scrollbar min-h-[calc(100vh-4rem)] px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
