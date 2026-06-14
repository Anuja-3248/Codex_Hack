"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  Layers3,
  LogIn,
  SearchCheck,
  Sparkles,
  Target,
  Trophy
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "AI Assessment",
    description: "Evaluate current skills.",
    icon: ClipboardCheck
  },
  {
    title: "Skill Analysis",
    description: "Identify strengths and weaknesses.",
    icon: BrainCircuit
  },
  {
    title: "Personalized Assignments",
    description: "Generate improvement tasks.",
    icon: Target
  },
  {
    title: "Opportunity Matching",
    description: "Find relevant internships and jobs.",
    icon: Trophy
  }
];

const steps = [
  "Take Assessment",
  "Get AI Analysis",
  "Complete Assignments",
  "Unlock Opportunities"
];

export function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-night">
      <div className="absolute inset-0 subtle-grid opacity-60" />
      <div className="absolute inset-x-0 top-0 h-72 bg-forge-radial" />

      <header className="relative z-10 border-b border-white/10 bg-slate-950/35 backdrop-blur-xl">
        <div className="container flex min-h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple to-blue shadow-glow">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-white sm:text-base">
              PathForge AI
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white">
              How it works
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
            >
              Login
              <LogIn className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
            >
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative z-10">
        <div className="container grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <Badge variant="blue" className="mb-5">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              Assessment - Analysis - Action - Opportunities
            </Badge>
            <h1 className="text-balance text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
              Forge Your Future with AI
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Identify skill gaps, receive personalized assignments, track
              progress, and discover career opportunities using AI.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
                Login
                <LogIn className="h-5 w-5" />
              </Link>
              <Link
                href="/dashboard"
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
              >
                Open Dashboard
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-mesh-subtle opacity-80 blur-2xl" />
            <div className="glass-card relative overflow-hidden rounded-lg p-2">
              <Image
                src="/images/pathforge-dashboard-preview.png"
                alt="Futuristic PathForge AI dashboard preview"
                width={1280}
                height={900}
                priority
                className="aspect-[16/11] w-full rounded-md object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="relative z-10 border-t border-white/10 py-20">
        <div className="container">
          <div className="mb-10 max-w-2xl">
            <Badge variant="outline" className="mb-4">
              <Layers3 className="mr-2 h-3.5 w-3.5" />
              Core workflow
            </Badge>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              A career operating system for student growth
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <Card className="h-full transition hover:-translate-y-1 hover:border-purple/35 hover:bg-white/[0.075]">
                    <CardHeader>
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-white/[0.07]">
                        <Icon className="h-5 w-5 text-cyan-200" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-6 text-slate-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative z-10 py-20">
        <div className="container">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <Badge variant="success" className="mb-4">
                <Gauge className="mr-2 h-3.5 w-3.5" />
                How it works
              </Badge>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                From assessment to opportunity in four moves
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              PathForge turns learning into a decision loop: assess, understand,
              improve, and act.
            </p>
          </div>

          <div className="relative grid gap-4 md:grid-cols-4">
            <div className="absolute left-0 top-10 hidden h-px w-full bg-gradient-to-r from-purple via-blue to-transparent md:block" />
            {steps.map((step, index) => (
              <div key={step} className="relative">
                <div className="glass-card rounded-lg p-5 transition hover:-translate-y-1 hover:bg-white/[0.075]">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-purple to-blue text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-white">{step}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {index === 0 && "Answer focused skill questions across technical tracks."}
                    {index === 1 && "Review AI-generated strengths, gaps, and readiness."}
                    {index === 2 && "Work through targeted projects that close the gaps."}
                    {index === 3 && "Match your profile to internships and early roles."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 pb-20">
        <div className="container">
          <div className="glass-card overflow-hidden rounded-lg p-8 sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Badge className="mb-4">
                  <SearchCheck className="mr-2 h-3.5 w-3.5" />
                  Career map ready
                </Badge>
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                  Start Building Your Career Path Today
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                  Launch the dashboard to view assessment results, AI analysis,
                  assignments, progress, and matching opportunities.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
                >
                  Login
                  <LogIn className="h-5 w-5" />
                </Link>
                <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }))}>
                  Launch Dashboard
                  <CheckCircle2 className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
