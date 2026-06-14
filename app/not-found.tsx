import Link from "next/link";
import { AlertCircle, ArrowLeft, Compass, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-night p-4">
      <div className="absolute inset-0 subtle-grid opacity-50" />
      <div className="absolute inset-x-0 top-0 h-72 bg-forge-radial" />

      <Card className="relative w-full max-w-xl overflow-hidden">
        <CardHeader>
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple to-blue shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-md border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-100">
            <AlertCircle className="h-3.5 w-3.5" />
            404 route not found
          </div>
          <CardTitle className="text-3xl">This page is off the mapped path</CardTitle>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            The page you tried to open does not exist in the current PathForge AI
            demo. Use one of the safe routes below to continue.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={cn(buttonVariants({ variant: "secondary" }), "w-full")}>
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Link href="/dashboard" className={cn(buttonVariants(), "w-full")}>
            <Compass className="h-4 w-4" />
            Open dashboard
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
