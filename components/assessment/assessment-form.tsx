"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  RotateCcw,
  Sparkles,
  Target
} from "lucide-react";
import {
  ASSESSMENT_STORAGE_KEY,
  assessmentSections,
  calculateAssessmentResult,
  careerGoalOptions,
  currentLevelOptions,
  learningPaceOptions,
  type AssessmentAnswerMap,
  type AssessmentProfile,
  type AssessmentQuestion,
  type AssessmentResult
} from "@/lib/assessment";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const emptyProfile: AssessmentProfile = {
  careerGoal: "frontend",
  currentLevel: "beginner",
  learningPace: "steady"
};

const ratingValues = [1, 2, 3, 4, 5];

type ProfileOption = {
  value: string;
  label: string;
};

function ProfileOptions({
  label,
  value,
  options,
  onSelect
}: {
  label: string;
  value: string;
  options: ProfileOption[];
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-slate-300">{label}</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              aria-pressed={selected}
              className={cn(
                "min-h-11 rounded-md border px-3 py-2 text-sm font-medium transition",
                selected
                  ? "border-cyan-300/50 bg-cyan-300/10 text-white shadow-glow"
                  : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-white/20 hover:bg-white/[0.06]"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  value,
  onAnswer
}: {
  question: AssessmentQuestion;
  value: string | number | undefined;
  onAnswer: (value: string | number) => void;
}) {
  return (
    <Card className="transition hover:border-purple/30">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge variant="outline" className="mb-3">
              {question.category}
            </Badge>
            <CardTitle className="text-base leading-7">{question.prompt}</CardTitle>
            <CardDescription className="mt-2">{question.detail}</CardDescription>
          </div>
          {value !== undefined ? (
            <Badge variant="success">
              <CheckCircle2 className="mr-2 h-3.5 w-3.5" />
              Answered
            </Badge>
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        {question.type === "choice" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {question.options.map((option) => {
              const selected = value === option.label;

              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => onAnswer(option.label)}
                  className={cn(
                    "min-h-16 rounded-lg border p-3 text-left text-sm leading-6 transition",
                    selected
                      ? "border-cyan-300/50 bg-cyan-300/10 text-white shadow-glow"
                      : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-white/20 hover:bg-white/[0.06]"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-5 gap-2">
              {ratingValues.map((rating) => {
                const selected = value === rating;

                return (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => onAnswer(rating)}
                    className={cn(
                      "flex aspect-square min-h-12 items-center justify-center rounded-md border text-sm font-semibold transition",
                      selected
                        ? "border-cyan-300/50 bg-cyan-300/10 text-white shadow-glow"
                        : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-white/20 hover:bg-white/[0.06]"
                    )}
                    aria-label={`${rating} out of 5`}
                  >
                    {rating}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 flex justify-between text-xs text-slate-500">
              <span>{question.lowLabel}</span>
              <span>{question.highLabel}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function AssessmentForm() {
  const [profile, setProfile] = useState<AssessmentProfile>(emptyProfile);
  const [answers, setAnswers] = useState<AssessmentAnswerMap>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [lastResult, setLastResult] = useState<AssessmentResult | null>(null);

  const allQuestions = useMemo(
    () => assessmentSections.flatMap((section) => section.questions),
    []
  );
  const profileComplete = Object.values(profile).every(Boolean);
  const answeredCount = allQuestions.filter(
    (question) => answers[question.id] !== undefined
  ).length;
  const completion = Math.round(
    (((profileComplete ? 1 : 0) + answeredCount) / (allQuestions.length + 1)) * 100
  );
  const currentSection = stepIndex === 0 ? null : assessmentSections[stepIndex - 1];
  const currentStepComplete = currentSection
    ? currentSection.questions.every((question) => answers[question.id] !== undefined)
    : profileComplete;
  const isFinalStep = stepIndex === assessmentSections.length;
  const isStepComplete = (index: number) =>
    index === 0
      ? profileComplete
      : assessmentSections[index - 1].questions.every(
          (question) => answers[question.id] !== undefined
        );
  const isStepUnlocked = (index: number) => {
    if (index === 0) {
      return true;
    }

    return Array.from({ length: index }).every((_, previousIndex) =>
      isStepComplete(previousIndex)
    );
  };

  useEffect(() => {
    try {
      const storedResult = window.localStorage.getItem(ASSESSMENT_STORAGE_KEY);

      if (storedResult) {
        setLastResult(JSON.parse(storedResult) as AssessmentResult);
      }
    } catch {
      setLastResult(null);
    }
  }, []);

  function updateProfile(field: keyof AssessmentProfile, value: string) {
    setProfile((current) => ({
      ...current,
      [field]: value
    }));
  }

  function updateAnswer(questionId: string, value: string | number) {
    setAnswers((current) => ({
      ...current,
      [questionId]: value
    }));
  }

  function submitAssessment() {
    const nextResult = calculateAssessmentResult(profile, answers);

    setResult(nextResult);
    setLastResult(nextResult);
    window.localStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(nextResult));
  }

  function resetAssessment() {
    setProfile(emptyProfile);
    setAnswers({});
    setStepIndex(0);
    setResult(null);
  }

  if (result) {
    return (
      <div className="space-y-5">
        <Card className="overflow-hidden">
          <CardHeader className="relative">
            <div className="absolute inset-0 bg-mesh-subtle opacity-40" />
            <div className="relative">
              <Badge variant="success" className="mb-4">
                <CheckCircle2 className="mr-2 h-3.5 w-3.5" />
                Assessment saved
              </Badge>
              <CardTitle className="text-3xl">
                Your readiness score is {result.overallScore}%
              </CardTitle>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                {result.summary}
              </p>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-slate-400">Overall Score</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {result.overallScore}%
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-slate-400">Current Level</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {result.level}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-slate-400">Questions Completed</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {answeredCount}/{allQuestions.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-cyan-200" />
                Category Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.categoryScores.map((category) => (
                <div key={category.category}>
                  <div className="mb-2 flex justify-between gap-3 text-sm">
                    <span className="font-medium text-white">{category.category}</span>
                    <span className="text-cyan-100">{category.score}%</span>
                  </div>
                  <Progress value={category.score} />
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {category.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-cyan-200" />
                Next Focus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="mb-3 text-xs font-medium uppercase text-slate-500">
                  Strengths
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.strengths.map((strength) => (
                    <Badge key={strength} variant="success">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-medium uppercase text-slate-500">
                  Weak Areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.weaknesses.map((weakness) => (
                    <Badge key={weakness} variant="warning">
                      {weakness}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
                <p className="text-sm font-medium text-white">Recommended action</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {result.recommendedFocus}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/analysis"
                  className={cn(buttonVariants(), "w-full sm:w-auto")}
                >
                  View AI Analysis
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Button type="button" variant="secondary" onClick={resetAssessment}>
                  <RotateCcw className="h-4 w-4" />
                  Retake
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();

        if (isFinalStep && currentStepComplete) {
          submitAssessment();
        }
      }}
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <Badge variant="blue" className="mb-3">
                <ClipboardCheck className="mr-2 h-3.5 w-3.5" />
                Career assessment
              </Badge>
              <CardTitle className="text-3xl">Skill readiness check</CardTitle>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Build a current profile across technical skills, project proof,
                problem solving, and career readiness.
              </p>
            </div>
            <div className="min-w-full xl:min-w-[280px]">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Completion</span>
                <span className="font-medium text-cyan-100">{completion}%</span>
              </div>
              <Progress value={completion} />
            </div>
          </div>
        </CardHeader>
        {lastResult ? (
          <CardContent>
            <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-white">
                  Last score: {lastResult.overallScore}% - {lastResult.level}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Completed {new Date(lastResult.completedAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setResult(lastResult)}
              >
                View Saved Result
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        ) : null}
      </Card>

      <div className="grid gap-4 xl:grid-cols-[240px_1fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base">Assessment Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {["Profile", ...assessmentSections.map((section) => section.title)].map(
              (step, index) => {
                const active = stepIndex === index;
                const complete = isStepComplete(index);
                const unlocked = isStepUnlocked(index);

                return (
                  <button
                    key={step}
                    type="button"
                    disabled={!unlocked}
                    onClick={() => setStepIndex(index)}
                    className={cn(
                      "flex min-h-11 w-full items-center gap-3 rounded-md border px-3 py-2 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-60",
                      active
                        ? "border-cyan-300/40 bg-cyan-300/10 text-white"
                        : complete
                          ? "border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-100"
                          : unlocked
                            ? "border-white/10 bg-white/[0.035] text-slate-400 hover:border-white/20 hover:bg-white/[0.06]"
                            : "border-white/10 bg-white/[0.035] text-slate-500"
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-xs">
                      {complete ? <CheckCircle2 className="h-3.5 w-3.5" /> : index + 1}
                    </span>
                    {step}
                  </button>
                );
              }
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          {stepIndex === 0 ? (
            <Card>
              <CardHeader>
                <Badge variant="outline" className="mb-3 w-fit">
                  <Sparkles className="mr-2 h-3.5 w-3.5" />
                  Setup
                </Badge>
                <CardTitle className="text-2xl">Career profile</CardTitle>
                <CardDescription>
                  These choices tune the final readiness summary.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ProfileOptions
                  label="Target role"
                  value={profile.careerGoal}
                  options={careerGoalOptions}
                  onSelect={(value) => updateProfile("careerGoal", value)}
                />
                <ProfileOptions
                  label="Current level"
                  value={profile.currentLevel}
                  options={currentLevelOptions}
                  onSelect={(value) => updateProfile("currentLevel", value)}
                />
                <ProfileOptions
                  label="Learning pace"
                  value={profile.learningPace}
                  options={learningPaceOptions}
                  onSelect={(value) => updateProfile("learningPace", value)}
                />
                <div className="flex justify-end">
                  <Button type="button" onClick={() => setStepIndex(1)}>
                    Start Questions
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : currentSection ? (
            <>
              <Card>
                <CardHeader>
                  <Badge variant="outline" className="mb-3 w-fit">
                    Section {stepIndex} of {assessmentSections.length}
                  </Badge>
                  <CardTitle className="text-2xl">{currentSection.title}</CardTitle>
                  <CardDescription>{currentSection.description}</CardDescription>
                </CardHeader>
              </Card>
              {currentSection.questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  value={answers[question.id]}
                  onAnswer={(value) => updateAnswer(question.id, value)}
                />
              ))}
            </>
          ) : null}
        </div>
      </div>

      <div className="sticky bottom-4 z-10 flex flex-col gap-3 rounded-lg border border-white/10 bg-slate-950/80 p-3 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          {answeredCount}/{allQuestions.length} questions answered
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={stepIndex === 0}
            onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          {isFinalStep ? (
            <Button type="submit" disabled={!currentStepComplete}>
              Submit Assessment
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              disabled={!currentStepComplete}
              onClick={() =>
                setStepIndex((current) =>
                  Math.min(assessmentSections.length, current + 1)
                )
              }
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
