"use client";

import { useEffect, useState } from "react";
import {
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  LineChart,
  Sparkles,
  Target,
  Trophy
} from "lucide-react";
import Link from "next/link";
import { AnimatedCounter } from "@/components/animated-counter";
import { MotionPage } from "@/components/motion-page";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ASSESSMENT_STORAGE_KEY,
  type AssessmentResult
} from "@/lib/assessment";
import { generateSkillAnalysis } from "@/lib/mockAI";
import { cn } from "@/lib/utils";

export function DashboardHome() {
  const analysis = generateSkillAnalysis();
  const [assessmentResult, setAssessmentResult] =
    useState<AssessmentResult | null>(null);

  useEffect(() => {
    try {
      const storedResult = window.localStorage.getItem(ASSESSMENT_STORAGE_KEY);

      if (storedResult) {
        setAssessmentResult(JSON.parse(storedResult) as AssessmentResult);
      }
    } catch {
      setAssessmentResult(null);
    }
  }, []);

  const currentLevel = assessmentResult?.level ?? analysis.currentLevel;
  const careerReadiness =
    assessmentResult?.readiness ?? analysis.careerReadiness;
  const summary = assessmentResult?.summary ?? analysis.summary;
  const stats = [
    {
      label: "Assessment Score",
      value: assessmentResult?.overallScore ?? analysis.overallScore,
      suffix: "%",
      icon: ClipboardCheck
    },
    { label: "Assignments Completed", value: 8, suffix: "", icon: CheckCircle2 },
    { label: "Skills Improved", value: 5, suffix: "", icon: Target },
    { label: "Opportunities Matched", value: 12, suffix: "", icon: Trophy }
  ];

  return (
    <MotionPage className="space-y-6">
      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <Card className="overflow-hidden">
          <CardHeader className="relative">
            <div className="absolute inset-0 bg-mesh-subtle opacity-45" />
            <div className="relative">
              <Badge variant="blue" className="mb-4">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                AI career dashboard
              </Badge>
              <CardTitle className="text-3xl">Welcome back, Alex</CardTitle>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                {assessmentResult
                  ? "Your latest assessment is saved and ready to guide your next assignments."
                  : "Start with the assessment to generate a clearer skill profile for the dashboard."}
              </p>
            </div>
          </CardHeader>
          <CardContent className="relative grid gap-4 pt-0 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-slate-400">Current Level</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {currentLevel}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">Career Readiness</p>
                <span className="text-sm font-medium text-cyan-100">
                  {careerReadiness}%
                </span>
              </div>
              <Progress value={careerReadiness} className="mt-4" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-cyan-200" />
              Quick Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs font-medium uppercase text-slate-500">
              AI Summary
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              &quot;{summary}&quot;
            </p>
            <Link
              href={assessmentResult ? "/analysis" : "/assessment"}
              className={cn(buttonVariants({ variant: "secondary" }), "mt-5")}
            >
              {assessmentResult ? "View full analysis" : "Start assessment"}
              <LineChart className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.label}
              className="transition hover:-translate-y-1 hover:border-blue/30"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-slate-300">
                    {stat.label}
                  </CardTitle>
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/[0.07]">
                    <Icon className="h-4 w-4 text-cyan-200" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-3xl font-semibold text-white"
                />
              </CardContent>
            </Card>
          );
        })}
      </section>
    </MotionPage>
  );
}
