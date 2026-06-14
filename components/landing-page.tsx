"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Cloud,
  Code2,
  LogIn,
  MessageCircle,
  Palette,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  XCircle
} from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";
import { Badge } from "@/components/ui/badge";
import { SiteLogo } from "@/components/ui/site-logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const dashboardStats = [
  {
    label: "Career Readiness",
    value: "78%",
    icon: BarChart3
  },
  {
    label: "Skill Growth This Month",
    value: "+15%",
    icon: TrendingUp
  },
  {
    label: "Recommended Career",
    value: "AI Engineer",
    icon: Target
  },
  {
    label: "Next Assignment",
    value: "Machine Learning Basics",
    icon: BookOpen
  }
];

const roadmapSteps = [
  "Current Level",
  "Skill Assessment",
  "AI Learning Plan",
  "Project Building",
  "Internship Ready",
  "Job Ready"
];

const careerPaths = [
  { title: "AI Engineer", icon: Bot },
  { title: "Data Scientist", icon: BarChart3 },
  { title: "Cybersecurity Analyst", icon: ShieldCheck },
  { title: "Cloud Engineer", icon: Cloud },
  { title: "Product Manager", icon: BriefcaseBusiness },
  { title: "UI/UX Designer", icon: Palette }
];

const achievements = [
  { value: 5000, suffix: "+", label: "Assessments Completed" },
  { value: 1200, suffix: "+", label: "Career Roadmaps Generated" },
  { value: 300, suffix: "+", label: "Internships Matched" },
  { value: 95, suffix: "%", label: "User Satisfaction" }
];

const testimonials = [
  {
    quote:
      "PathForge showed me which skills mattered first and turned my confusion into a weekly plan.",
    name: "Aarav",
    role: "Second-Year Student"
  },
  {
    quote:
      "The dashboard made career readiness feel measurable. I knew exactly what to build next.",
    name: "Meera",
    role: "Frontend Intern"
  },
  {
    quote:
      "The AI match demo helped our team explain the product in seconds during the hackathon.",
    name: "Rohan",
    role: "Hackathon Mentor"
  }
];

export function LandingPage() {
  return (
    <main className="homepage-palette relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 subtle-grid opacity-60" />
      <div className="absolute inset-x-0 top-0 h-72 bg-forge-radial" />

      <header className="relative z-10 border-b border-white/10 bg-slate-950/35 backdrop-blur-xl">
        <div className="container flex min-h-16 items-center justify-between gap-4">
          <SiteLogo priority imageClassName="w-[148px] sm:w-[168px]" />
          <nav className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
            <a href="#dashboard-preview" className="hover:text-white">
              Dashboard
            </a>
            <a href="#roadmap" className="hover:text-white">
              Roadmap
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
            <h1 className="text-balance text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
              Find Your Next Career Move
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Personalized assessments, assignments, and opportunities powered
              by AI.
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
                src="/images/hero-students.jpg"
                alt="Student preparing online with PathForge AI"
                width={1280}
                height={900}
                priority
                className="aspect-[16/11] w-full rounded-md object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="dashboard-preview" className="relative z-10 py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="glass-card overflow-hidden rounded-lg p-5 sm:p-7"
          >
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-slate-400">PathForge AI Dashboard</p>
                <h3 className="mt-1 text-2xl font-semibold text-white">
                  Alex&apos;s Career Command Center
                </h3>
              </div>
              <Badge variant="success">
                <Star className="mr-2 h-3.5 w-3.5" />
                Live Preview
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {dashboardStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.07]">
                      <Icon className="h-5 w-5 text-cyan-200" />
                    </div>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {stat.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="roadmap" className="relative z-10 border-t border-white/10 py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <Badge variant="success" className="mb-4">
              <SearchCheck className="mr-2 h-3.5 w-3.5" />
              Personalized Career Roadmap
            </Badge>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              From current level to job-ready without random learning
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
              The roadmap turns assessment data into a visible progression path:
              learn, build, prove, and match.
            </p>
          </div>

          <div className="relative pl-6">
            <motion.div
              className="absolute left-[35px] top-8 w-px bg-gradient-to-b from-purple via-blue to-transparent"
              initial={{ height: 0 }}
              whileInView={{ height: "86%" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
            <div className="space-y-4">
              {roadmapSteps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className="relative flex items-center gap-4"
                >
                  <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple to-blue text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <div className="glass-card w-full rounded-lg p-4">
                    <p className="font-semibold text-white">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="container grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-lg p-5 sm:p-6"
          >
            <Badge variant="outline" className="mb-5">
              <MessageCircle className="mr-2 h-3.5 w-3.5" />
              AI Chat Demo
            </Badge>
            <div className="space-y-4">
              <div className="max-w-[82%] rounded-lg border border-white/10 bg-white/[0.06] p-4">
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Student
                </p>
                <p className="mt-2 text-lg font-medium text-white">
                  What career suits me?
                </p>
              </div>
              <div className="ml-auto max-w-[88%] rounded-lg border border-white/10 bg-white/[0.06] p-4">
                <p className="text-xs font-semibold uppercase text-slate-400">
                  PathForge AI
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Based on your strengths in problem solving and coding, I
                  recommend AI Engineer.
                </p>
                <Link
                  href="/dashboard"
                  className={cn(buttonVariants({ size: "sm" }), "mt-4")}
                >
                  Generate Roadmap
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="glass-card rounded-lg p-5">
              <h3 className="mb-5 text-xl font-semibold text-white">
                Before PathForge
              </h3>
              {["Confused about career", "No roadmap", "Random learning"].map(
                (item) => (
                  <p key={item} className="mb-4 flex items-center gap-3 text-sm">
                    <XCircle className="h-5 w-5 shrink-0 text-rose-400" />
                    <span className="text-slate-400">{item}</span>
                  </p>
                )
              )}
            </div>
            <div className="glass-card rounded-lg p-5">
              <h3 className="mb-5 text-xl font-semibold text-white">
                After PathForge
              </h3>
              {[
                "Clear career goal",
                "Personalized roadmap",
                "Industry-ready skills"
              ].map((item) => (
                <p key={item} className="mb-4 flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                  <span className="text-slate-400">{item}</span>
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden border-y border-white/10 py-16">
        <div className="container mb-8">
          <Badge variant="outline" className="mb-4">
            <Code2 className="mr-2 h-3.5 w-3.5" />
            Career Paths Carousel
          </Badge>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Explore the careers PathForge can match
          </h2>
        </div>
        <div className="homepage-carousel">
          <div className="homepage-carousel-track">
            {[...careerPaths, ...careerPaths].map((path, index) => {
              const Icon = path.icon;

              return (
                <div key={`${path.title}-${index}`} className="homepage-path-card">
                  <Icon className="h-6 w-6" />
                  <span>{path.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="container">
          <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <Badge variant="success" className="mb-4">
                <Trophy className="mr-2 h-3.5 w-3.5" />
                Achievement Wall
              </Badge>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Built for measurable student outcomes
              </h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35 }}
                className="glass-card rounded-lg p-5"
              >
                <AnimatedCounter
                  value={achievement.value}
                  suffix={achievement.suffix}
                  className="text-4xl font-semibold text-white"
                />
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {achievement.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 pb-20">
        <div className="container">
          <div className="mb-8">
            <Badge variant="outline" className="mb-4">
              <Users className="mr-2 h-3.5 w-3.5" />
              Testimonials
            </Badge>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Students understand their next step faster
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="glass-card rounded-lg p-5">
                <p className="text-sm leading-7 text-slate-400">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="homepage-final-cta relative z-10">
        <div className="glass-card rounded-none border-x-0 border-b-0 px-4 py-12">
          <div className="container flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-4xl font-semibold text-white sm:text-5xl">
                Ready to build?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
                Start with a demo login, review the dashboard, and explore a
                smarter way to plan a career.
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
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="container mt-12 border-t border-white/10 pt-6 text-sm text-slate-400">
            PathForge AI - AI-powered career readiness for students.
          </div>
        </div>
      </footer>
    </main>
  );
}
