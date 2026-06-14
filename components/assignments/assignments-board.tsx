"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  Clock3,
  Sparkles,
  Target,
  TrendingUp
} from "lucide-react";
import {
  ASSESSMENT_STORAGE_KEY,
  type AssessmentResult
} from "@/lib/assessment";
import {
  ASSIGNMENT_PROGRESS_STORAGE_KEY,
  generateAssignmentsFromAssessment,
  type GeneratedAssignment
} from "@/lib/assignments";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type AssignmentProgress = Record<string, string[]>;

const difficultyVariant: Record<
  GeneratedAssignment["difficulty"],
  "success" | "warning" | "danger"
> = {
  Easy: "success",
  Medium: "warning",
  Hard: "danger"
};

function readJsonFromStorage<T>(key: string): T | null {
  try {
    const value = window.localStorage.getItem(key);

    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

function getProgressValue(assignment: GeneratedAssignment, completedSteps: string[]) {
  return Math.round((completedSteps.length / assignment.checklist.length) * 100);
}

export function AssignmentsBoard() {
  const [assessmentResult, setAssessmentResult] =
    useState<AssessmentResult | null>(null);
  const [progressByAssignment, setProgressByAssignment] =
    useState<AssignmentProgress>({});

  useEffect(() => {
    setAssessmentResult(
      readJsonFromStorage<AssessmentResult>(ASSESSMENT_STORAGE_KEY)
    );
    setProgressByAssignment(
      readJsonFromStorage<AssignmentProgress>(ASSIGNMENT_PROGRESS_STORAGE_KEY) ??
        {}
    );
  }, []);

  const assignments = useMemo(
    () => generateAssignmentsFromAssessment(assessmentResult),
    [assessmentResult]
  );
  const completedAssignments = assignments.filter(
    (assignment) =>
      getProgressValue(assignment, progressByAssignment[assignment.id] ?? []) === 100
  ).length;
  const totalImpact = assignments.reduce(
    (sum, assignment) => sum + assignment.impact,
    0
  );
  const weakestCategory = assessmentResult
    ? [...assessmentResult.categoryScores].sort((a, b) => a.score - b.score)[0]
    : null;

  function updateProgress(nextProgress: AssignmentProgress) {
    setProgressByAssignment(nextProgress);
    window.localStorage.setItem(
      ASSIGNMENT_PROGRESS_STORAGE_KEY,
      JSON.stringify(nextProgress)
    );
  }

  function toggleStep(assignmentId: string, step: string) {
    const currentSteps = progressByAssignment[assignmentId] ?? [];
    const nextSteps = currentSteps.includes(step)
      ? currentSteps.filter((currentStep) => currentStep !== step)
      : [...currentSteps, step];

    updateProgress({
      ...progressByAssignment,
      [assignmentId]: nextSteps
    });
  }

  function markComplete(assignment: GeneratedAssignment) {
    updateProgress({
      ...progressByAssignment,
      [assignment.id]: assignment.checklist
    });
  }

  return (
    <div className="space-y-5">
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-cyan-200" />
              Assignment Source
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-white">
              {assessmentResult ? "Assessment gaps" : "Sample gaps"}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {assessmentResult
                ? `Weakest area: ${weakestCategory?.category}`
                : "Complete assessment to personalize this queue."}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <ClipboardCheck className="h-4 w-4 text-cyan-200" />
              Active Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-white">
              {completedAssignments}/{assignments.length}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Completed from your generated assignment queue.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-cyan-200" />
              Possible Lift
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-emerald-100">
              +{totalImpact}%
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Estimated readiness gain if all tasks are completed.
            </p>
          </CardContent>
        </Card>
      </section>

      {!assessmentResult ? (
        <Card className="border-amber-300/20 bg-amber-300/[0.05]">
          <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <Badge variant="warning" className="mb-3">
                Assessment not found
              </Badge>
              <h3 className="text-lg font-semibold text-white">
                These are demo assignments until assessment is completed.
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Once a student completes the assessment, this page regenerates
                tasks from their weakest skill categories.
              </p>
            </div>
            <Link href="/assessment" className={cn(buttonVariants())}>
              Complete Assessment
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      ) : null}

      <section className="grid gap-4 xl:grid-cols-2">
        {assignments.map((assignment) => {
          const completedSteps = progressByAssignment[assignment.id] ?? [];
          const progress = getProgressValue(assignment, completedSteps);
          const isComplete = progress === 100;

          return (
            <Card
              key={assignment.id}
              className="flex min-h-[440px] flex-col transition hover:-translate-y-1 hover:border-purple/35"
            >
              <CardHeader>
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/[0.07]">
                    <Target className="h-5 w-5 text-cyan-200" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{assignment.category}</Badge>
                    <Badge variant={difficultyVariant[assignment.difficulty]}>
                      {assignment.difficulty}
                    </Badge>
                    <Badge variant="success">+{assignment.impact}%</Badge>
                  </div>
                </div>
                <CardTitle>{assignment.title}</CardTitle>
                <p className="text-sm leading-6 text-slate-400">
                  {assignment.whyAssigned}
                </p>
              </CardHeader>

              <CardContent className="mt-auto space-y-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                    <p className="flex items-center gap-2 text-xs font-medium uppercase text-slate-500">
                      <Clock3 className="h-3.5 w-3.5" />
                      Time
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {assignment.estimatedTime}
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-xs font-medium uppercase text-slate-500">
                      Focus
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {assignment.focus}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
                  <p className="text-sm font-medium text-white">Objective</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {assignment.objective}
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-medium text-white">Deliverables</p>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-300">
                    {assignment.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-400">Checklist progress</span>
                    <span className="font-medium text-cyan-100">{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>

                <div className="space-y-2">
                  {assignment.checklist.map((step) => {
                    const checked = completedSteps.includes(step);

                    return (
                      <button
                        key={step}
                        type="button"
                        onClick={() => toggleStep(assignment.id, step)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-md border p-3 text-left text-sm leading-6 transition",
                          checked
                            ? "border-emerald-300/20 bg-emerald-300/[0.06] text-slate-200"
                            : "border-white/10 bg-white/[0.035] text-slate-400 hover:border-white/20 hover:bg-white/[0.06]"
                        )}
                      >
                        {checked ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" />
                        ) : (
                          <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                        )}
                        {step}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    type="button"
                    variant={isComplete ? "outline" : "default"}
                    onClick={() => markComplete(assignment)}
                    className="w-full"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {isComplete ? "Completed" : "Mark Complete"}
                  </Button>
                  <Button type="button" variant="secondary" className="w-full">
                    Start Assignment
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
