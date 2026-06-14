"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { assessmentQuestions } from "@/lib/mockAI";
import { cn } from "@/lib/utils";

export function AssessmentForm() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const completion = Math.round((answeredCount / assessmentQuestions.length) * 100);

  const score = useMemo(() => {
    const correct = assessmentQuestions.filter(
      (question) => answers[question.id] === question.answer
    ).length;

    return Math.round((correct / assessmentQuestions.length) * 100);
  }, [answers]);

  if (submitted) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="relative">
          <div className="absolute inset-0 bg-mesh-subtle opacity-40" />
          <div className="relative">
            <Badge variant="success" className="mb-4">
              <CheckCircle2 className="mr-2 h-3.5 w-3.5" />
              Assessment submitted
            </Badge>
            <CardTitle className="text-3xl">Your readiness score is {score}%</CardTitle>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              PathForge AI mapped your current answers to a practical career
              profile. You are ready for intermediate frontend assignments with
              a focus on state management, testing, and performance.
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-slate-400">Overall Score</p>
            <p className="mt-2 text-3xl font-semibold text-white">{score}%</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-slate-400">Current Level</p>
            <p className="mt-2 text-3xl font-semibold text-white">Intermediate</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-slate-400">Questions Completed</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {answeredCount}/{assessmentQuestions.length}
            </p>
          </div>
          <div className="flex flex-col gap-3 md:col-span-3 sm:flex-row">
            <Link href="/analysis" className={cn(buttonVariants(), "w-full sm:w-auto")}>
              View AI Analysis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}
            >
              <RotateCcw className="h-4 w-4" />
              Retake Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Badge variant="blue" className="mb-3">
                <ClipboardCheck className="mr-2 h-3.5 w-3.5" />
                Interactive assessment
              </Badge>
              <CardTitle className="text-3xl">Skill readiness check</CardTitle>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Answer 10 MCQs across frontend, backend, data, and AI/ML.
              </p>
            </div>
            <div className="min-w-[220px]">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Completion</span>
                <span className="font-medium text-cyan-100">{completion}%</span>
              </div>
              <Progress value={completion} />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {assessmentQuestions.map((question) => (
          <Card key={question.id} className="transition hover:border-purple/30">
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Badge variant="outline" className="mb-3">
                    {question.category}
                  </Badge>
                  <CardTitle className="text-base leading-7">
                    {question.id}. {question.question}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {question.options.map((option) => {
                  const selected = answers[question.id] === option;

                  return (
                    <label
                      key={option}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition",
                        selected
                          ? "border-cyan-300/50 bg-cyan-300/10 text-white"
                          : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-white/20 hover:bg-white/[0.06]"
                      )}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={selected}
                        onChange={() =>
                          setAnswers((current) => ({
                            ...current,
                            [question.id]: option
                          }))
                        }
                        className="h-4 w-4 accent-purple"
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="sticky bottom-4 z-10 flex justify-end">
        <Button
          type="submit"
          size="lg"
          disabled={answeredCount < assessmentQuestions.length}
        >
          Submit Assessment
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
