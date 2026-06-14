"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Flame,
  Gauge,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp
} from "lucide-react";
import { MotionPage } from "@/components/motion-page";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ASSESSMENT_STORAGE_KEY,
  type AssessmentCategory,
  type AssessmentResult,
  type CategoryScore
} from "@/lib/assessment";
import { generateSkillAnalysis } from "@/lib/mockAI";
import { cn } from "@/lib/utils";

type GapZone = "Ready" | "Needs Practice" | "Critical Gap";

type GapSkill = {
  skill: string;
  category: AssessmentCategory;
  evidence: string;
  score: number;
  zone: GapZone;
};

type PriorityFix = {
  title: string;
  category: AssessmentCategory;
  reason: string;
  action: string;
  impact: number;
};

const fallbackCategoryScores: CategoryScore[] = [
  {
    category: "Technical Skills",
    score: 72,
    description: "Core implementation confidence across modern web work."
  },
  {
    category: "Projects & Practice",
    score: 48,
    description: "Portfolio depth, Git habits, and proof of hands-on work."
  },
  {
    category: "Problem Solving",
    score: 64,
    description: "Debugging, decomposition, and decision-making under uncertainty."
  },
  {
    category: "Career Readiness",
    score: 54,
    description: "Application readiness, communication, and role alignment."
  }
];

const skillSignals: Record<
  AssessmentCategory,
  { ready: string; practice: string; critical: string; evidence: string }
> = {
  "Technical Skills": {
    ready: "React implementation",
    practice: "API data flow",
    critical: "Production code quality",
    evidence: "Based on component, API, and code-quality answers."
  },
  "Projects & Practice": {
    ready: "Portfolio foundation",
    practice: "Git workflow",
    critical: "Deployed project proof",
    evidence: "Based on project depth and GitHub workflow signals."
  },
  "Problem Solving": {
    ready: "Task breakdown",
    practice: "Debugging process",
    critical: "Deployment troubleshooting",
    evidence: "Based on debugging and decomposition choices."
  },
  "Career Readiness": {
    ready: "Role awareness",
    practice: "Resume positioning",
    critical: "Internship application proof",
    evidence: "Based on career assets and role-fit decisions."
  }
};

const priorityLibrary: Record<AssessmentCategory, Omit<PriorityFix, "category">> = {
  "Technical Skills": {
    title: "Build one API-backed feature",
    reason: "Your implementation score needs proof that you can handle real data, loading states, errors, and reusable UI.",
    action: "Create a small dashboard widget that fetches data, validates input, and handles empty/error states.",
    impact: 8
  },
  "Projects & Practice": {
    title: "Ship one polished project case study",
    reason: "Your portfolio proof is the fastest way to turn skill claims into evidence.",
    action: "Deploy one project, add screenshots, write a sharp README, and explain the problem you solved.",
    impact: 10
  },
  "Problem Solving": {
    title: "Practice a debugging drill",
    reason: "Internship interviews reward structured diagnosis more than lucky fixes.",
    action: "Take one broken feature, inspect logs/network/build output, and document the fix path.",
    impact: 6
  },
  "Career Readiness": {
    title: "Upgrade role proof",
    reason: "Your profile needs to match how recruiters scan internship candidates.",
    action: "Tune your resume, GitHub pins, and LinkedIn headline around one target role.",
    impact: 7
  }
};

const zoneStyles: Record<
  GapZone,
  { label: string; className: string; badge: "success" | "warning" | "danger" }
> = {
  Ready: {
    label: "Ready",
    className: "border-emerald-300/20 bg-emerald-300/[0.06]",
    badge: "success"
  },
  "Needs Practice": {
    label: "Needs Practice",
    className: "border-amber-300/20 bg-amber-300/[0.06]",
    badge: "warning"
  },
  "Critical Gap": {
    label: "Critical Gap",
    className: "border-rose-300/20 bg-rose-300/[0.06]",
    badge: "danger"
  }
};

function getZone(score: number): GapZone {
  if (score >= 75) {
    return "Ready";
  }

  if (score >= 55) {
    return "Needs Practice";
  }

  return "Critical Gap";
}

function getSkillName(category: AssessmentCategory, zone: GapZone) {
  const signal = skillSignals[category];

  if (zone === "Ready") {
    return signal.ready;
  }

  if (zone === "Needs Practice") {
    return signal.practice;
  }

  return signal.critical;
}

function buildGapSkills(categoryScores: CategoryScore[]): GapSkill[] {
  return categoryScores.map((categoryScore) => {
    const zone = getZone(categoryScore.score);

    return {
      skill: getSkillName(categoryScore.category, zone),
      category: categoryScore.category,
      evidence: skillSignals[categoryScore.category].evidence,
      score: categoryScore.score,
      zone
    };
  });
}

function buildPriorityFixes(categoryScores: CategoryScore[]): PriorityFix[] {
  return [...categoryScores]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((categoryScore) => ({
      ...priorityLibrary[categoryScore.category],
      category: categoryScore.category
    }));
}

function getFallbackResult(): AssessmentResult {
  const analysis = generateSkillAnalysis();

  return {
    profile: {
      careerGoal: "frontend",
      currentLevel: "intermediate",
      learningPace: "focused"
    },
    overallScore: analysis.overallScore,
    readiness: analysis.careerReadiness,
    level: analysis.currentLevel,
    strengths: analysis.strengths,
    weaknesses: analysis.weaknesses,
    recommendedFocus:
      "Complete an assessment to replace this sample diagnosis with a personalized growth path.",
    summary: analysis.summary,
    categoryScores: fallbackCategoryScores,
    completedAt: new Date().toISOString()
  };
}

export function AnalysisDiagnosis() {
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

  const result = assessmentResult ?? getFallbackResult();
  const gapSkills = useMemo(
    () => buildGapSkills(result.categoryScores),
    [result.categoryScores]
  );
  const priorityFixes = useMemo(
    () => buildPriorityFixes(result.categoryScores),
    [result.categoryScores]
  );
  const projectedScore = Math.min(
    100,
    result.readiness + priorityFixes.reduce((sum, fix) => sum + fix.impact, 0)
  );
  const weakestCategory = [...result.categoryScores].sort(
    (a, b) => a.score - b.score
  )[0];
  const strongestCategory = [...result.categoryScores].sort(
    (a, b) => b.score - a.score
  )[0];

  return (
    <MotionPage className="space-y-6">
      <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="overflow-hidden">
          <CardHeader className="relative">
            <div className="absolute inset-0 bg-mesh-subtle opacity-45" />
            <div className="relative">
              <Badge variant="blue" className="mb-4">
                <BrainCircuit className="mr-2 h-3.5 w-3.5" />
                AI diagnosis
              </Badge>
              <CardTitle className="max-w-3xl text-3xl">
                Skill Gap Map for internship readiness
              </CardTitle>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                This page explains what is blocking your score and the smallest
                set of moves that can raise readiness fastest.
              </p>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 pt-0 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-slate-400">Current Readiness</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {result.readiness}%
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-slate-400">After Top Fixes</p>
              <p className="mt-2 text-3xl font-semibold text-emerald-100">
                {projectedScore}%
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-slate-400">Biggest Blocker</p>
              <p className="mt-2 text-xl font-semibold text-white">
                {weakestCategory.category}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-cyan-200" />
              AI Mentor Verdict
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-7 text-slate-300">
              Your strongest signal is{" "}
              <span className="font-medium text-white">
                {strongestCategory.category.toLowerCase()}
              </span>
              , but{" "}
              <span className="font-medium text-white">
                {weakestCategory.category.toLowerCase()}
              </span>{" "}
              is holding back your internship readiness. Focus on proof, not
              just knowledge.
            </p>
            {!assessmentResult ? (
              <Link
                href="/assessment"
                className={cn(buttonVariants({ variant: "secondary" }), "mt-5")}
              >
                Complete assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-cyan-200" />
              Visual Skill Gap Map
            </CardTitle>
            <p className="text-sm leading-6 text-slate-400">
              Skills are grouped by how ready they look from your assessment
              signals.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {(["Ready", "Needs Practice", "Critical Gap"] as GapZone[]).map(
              (zone) => {
                const zoneSkills = gapSkills.filter((skill) => skill.zone === zone);
                const styles = zoneStyles[zone];

                return (
                  <div
                    key={zone}
                    className={cn("rounded-lg border p-4", styles.className)}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <Badge variant={styles.badge}>{styles.label}</Badge>
                      <span className="text-xs text-slate-500">
                        {zoneSkills.length} signal{zoneSkills.length === 1 ? "" : "s"}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {zoneSkills.length > 0 ? (
                        zoneSkills.map((skill) => (
                          <div key={skill.category}>
                            <div className="mb-2 flex justify-between gap-3 text-sm">
                              <span className="font-medium text-white">
                                {skill.skill}
                              </span>
                              <span className="text-cyan-100">{skill.score}%</span>
                            </div>
                            <Progress value={skill.score} />
                            <p className="mt-2 text-xs leading-5 text-slate-500">
                              {skill.evidence}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-slate-500">
                          No skills landed here yet.
                        </p>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-amber-200" />
              Priority Growth Path
            </CardTitle>
            <p className="text-sm leading-6 text-slate-400">
              These are ranked by fastest expected readiness gain.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {priorityFixes.map((fix, index) => (
              <div
                key={fix.category}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                        {index + 1}
                      </span>
                      <Badge variant="outline">{fix.category}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {fix.title}
                    </h3>
                  </div>
                  <Badge variant="success">
                    <TrendingUp className="mr-2 h-3.5 w-3.5" />+{fix.impact}%
                  </Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {fix.reason}
                </p>
                <div className="mt-4 rounded-md border border-cyan-300/15 bg-cyan-300/[0.06] p-3">
                  <p className="flex items-start gap-2 text-sm leading-6 text-slate-300">
                    <Lightbulb className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                    {fix.action}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge variant="success" className="mb-3">
              <CheckCircle2 className="mr-2 h-3.5 w-3.5" />
              Diagnosis ready
            </Badge>
            <h3 className="text-xl font-semibold text-white">
              Turn the diagnosis into action
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Use the priority path to generate practice tasks, track progress,
              and find roles where your current proof fits.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link href="/assignments" className={cn(buttonVariants())}>
              Generate Assignments
              <Target className="h-4 w-4" />
            </Link>
            <Link
              href="/progress"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              View Progress Plan
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </MotionPage>
  );
}
