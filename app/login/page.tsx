"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SiteLogo } from "@/components/ui/site-logo";
import { readDemoSession, saveDemoSession } from "@/lib/demo-auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (readDemoSession()) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-night p-4">
      <div className="fixed left-4 top-4 z-50 rounded-3xl bg-slate-950/80 p-3 shadow-xl shadow-slate-900/15 backdrop-blur-xl sm:left-6 sm:top-6">
        <SiteLogo size={44} />
      </div>
      <div className="absolute inset-0 subtle-grid opacity-50" />
      <div className="absolute inset-x-0 top-0 h-72 bg-forge-radial" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-md"
      >
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <SiteLogo className="mb-5" imageClassName="w-[172px]" />
            <CardTitle className="text-2xl">Continue to PathForge AI</CardTitle>
            <p className="text-sm leading-6 text-slate-400">
              Use any email and password to enter the demo dashboard.
            </p>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={async (event) => {
                event.preventDefault();
                setIsSubmitting(true);
                saveDemoSession(email);
                router.push("/dashboard");
              }}
            >
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">Email</span>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    type="email"
                    placeholder="alex@pathforge.ai"
                    className="pl-9"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">Password</span>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    type="password"
                    placeholder="Enter demo password"
                    className="pl-9"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </label>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting || !email.trim() || !password.trim()}
              >
                {isSubmitting ? "Entering dashboard..." : "Continue"}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
