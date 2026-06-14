"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Eye, LockKeyhole, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { saveDemoSession } from "@/lib/demo-auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <main className="min-h-screen bg-[#f7f8ee] font-['Manrope',ui-sans-serif,system-ui] text-[#020806]">
      <section className="relative isolate flex min-h-[84vh] flex-col items-center overflow-hidden px-5 pb-10 pt-10 sm:px-8 lg:pt-12">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_9%,rgba(221,231,209,0.78),transparent_24%),radial-gradient(circle_at_92%_83%,rgba(221,231,209,0.78),transparent_22%)]" />
        <div className="absolute left-[8%] top-[4%] -z-10 h-72 w-72 rounded-full border border-[#dfe7d8]/60 bg-[#edf3e7]/35 blur-2xl" />
        <div className="absolute bottom-[7%] right-[6%] -z-10 h-80 w-80 rounded-full border border-[#dfe7d8]/60 bg-[#edf3e7]/45 blur-2xl" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex w-full flex-1 flex-col items-center"
        >
          <Link
            href="/"
            className="text-center text-2xl font-black tracking-[-0.03em] text-[#020806] transition hover:opacity-80 sm:text-3xl lg:text-4xl"
          >
            PathForge AI
          </Link>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setIsSubmitting(true);
              saveDemoSession(email);
              router.push("/dashboard");
            }}
            className="mt-8 w-full max-w-[470px] rounded-[1.55rem] border border-[#bfc7bb] bg-[#f7f8ee]/82 px-6 py-7 shadow-[0_22px_80px_rgba(2,8,6,0.08)] backdrop-blur-xl sm:px-9 sm:py-9"
          >
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-black tracking-[-0.035em] text-[#020806] sm:text-4xl">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm font-medium tracking-wide text-[#2c3530] sm:text-base">
                Access your architectural learning pathway.
              </p>
            </div>

            <div className="mt-7 space-y-5">
              <label className="block">
                <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#020806]">
                  Email Address
                </span>
                <span className="flex h-12 items-center gap-3 rounded-full border border-[#bec7bd] bg-[#dee1d8] px-4 text-[#34403a] transition focus-within:border-[#020806] focus-within:bg-[#e6e9e0] sm:h-14 sm:px-5">
                  <Mail className="h-4 w-4 shrink-0" strokeWidth={2.2} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@company.com"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[#8b918b] sm:text-base"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 flex items-center justify-between gap-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#020806]">
                    Password
                  </span>
                  <Link
                    href="/login"
                    className="text-xs font-extrabold tracking-[0.06em] text-[#020806] transition hover:opacity-65"
                  >
                    Forgot password?
                  </Link>
                </span>
                <span className="flex h-12 items-center gap-3 rounded-full border border-[#bec7bd] bg-[#dee1d8] px-4 text-[#34403a] transition focus-within:border-[#020806] focus-within:bg-[#e6e9e0] sm:h-14 sm:px-5">
                  <LockKeyhole className="h-4 w-4 shrink-0" strokeWidth={2.2} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[#8b918b] sm:text-base"
                  />
                  <button
                    type="button"
                    aria-label="Show password"
                    className="rounded-full p-1 text-[#34403a] transition hover:bg-[#cfd5ca]"
                  >
                    <Eye className="h-4 w-4" strokeWidth={2.2} />
                  </button>
                </span>
              </label>

              <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm font-medium text-[#2c3530] sm:text-base">
                <input
                  type="checkbox"
                  className="h-4 w-4 appearance-none rounded-full border border-[#b7c1b8] bg-white transition checked:border-[#020806] checked:bg-[#020806]"
                />
                Remember me
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex h-12 w-full items-center justify-center gap-3 rounded-full bg-[#020806] text-xs font-extrabold uppercase tracking-[0.18em] text-[#f8f7ef] shadow-[0_18px_34px_rgba(2,8,6,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0d1f19] hover:shadow-[0_24px_48px_rgba(2,8,6,0.24)] disabled:cursor-wait sm:h-14"
              >
                {isSubmitting ? "Opening" : "Sign In"}
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
            </div>

            <div className="mt-7 border-t border-[#cad1c7] pt-6 text-center text-sm font-medium text-[#2c3530] sm:text-base">
              Don&apos;t have an account?{" "}
              <Link href="/" className="font-black text-[#020806] transition hover:opacity-70">
                Sign up
              </Link>
            </div>
          </form>

          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.08em] text-[#2c3530] transition hover:text-[#020806] sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Homepage
          </Link>
        </motion.div>
      </section>

      <footer className="bg-[#0d251d] px-5 py-9 text-[#dce7d8] sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/"
              className="text-2xl font-black tracking-[-0.035em] text-[#eaf4e8] sm:text-4xl"
            >
              PathForge AI
            </Link>
            <p className="mt-3 text-xs font-extrabold tracking-[0.07em] text-[#899a90] sm:text-sm">
              (c) 2024 PathForge AI. Architectural Intelligence for Learning.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-extrabold tracking-[0.06em] text-[#899a90] sm:text-sm">
            <Link href="/login" className="transition hover:text-[#eaf4e8]">
              Privacy Policy
            </Link>
            <Link href="/login" className="transition hover:text-[#eaf4e8]">
              Terms of Service
            </Link>
            <Link href="/login" className="transition hover:text-[#eaf4e8]">
              Contact
            </Link>
            <Link href="/login" className="transition hover:text-[#eaf4e8]">
              System Status
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
