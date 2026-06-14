import { BrainCircuit, CheckCircle2, Gauge, Sparkles, XCircle } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { MotionPage } from "@/components/motion-page";
import { ProgressRing } from "@/components/progress-ring";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { generateSkillAnalysis } from "@/lib/mockAI";

export default function AnalysisPage() {
  const analysis = generateSkillAnalysis();

  return (
    <DashboardShell>
      <MotionPage className="space-y-6">
        <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden">
            <CardHeader className="relative">
              <div className="absolute inset-0 bg-mesh-subtle opacity-45" />
              <div className="relative">
                <Badge variant="blue" className="mb-4">
                  <BrainCircuit className="mr-2 h-3.5 w-3.5" />
                  AI Analysis
                </Badge>
                <CardTitle className="text-3xl">Your career readiness profile</CardTitle>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                  PathForge AI converted your assessment into a readiness score,
                  strengths, weaknesses, and next actions.
                </p>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm text-slate-400">Overall Score</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {analysis.overallScore}%
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm text-slate-400">Current Level</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {analysis.currentLevel}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm text-slate-400">Career Readiness</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {analysis.careerReadiness}%
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="flex items-center justify-center p-6">
            <ProgressRing value={analysis.careerReadiness} label="Career Readiness" />
          </Card>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.strengths.map((strength) => (
                <div
                  key={strength}
                  className="flex items-center justify-between rounded-lg border border-emerald-300/15 bg-emerald-300/[0.06] p-3"
                >
                  <span className="font-medium text-white">{strength}</span>
                  <Badge variant="success">Strong</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-rose-300" />
                Weaknesses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.weaknesses.map((weakness) => (
                <div
                  key={weakness}
                  className="flex items-center justify-between rounded-lg border border-rose-300/15 bg-rose-300/[0.06] p-3"
                >
                  <span className="font-medium text-white">{weakness}</span>
                  <Badge variant="danger">Improve</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-cyan-200" />
              Readiness Meter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-400">Career Readiness</span>
              <span className="font-medium text-cyan-100">
                {analysis.careerReadiness}%
              </span>
            </div>
            <Progress value={analysis.careerReadiness} />
            <p className="mt-5 flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-300">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
              {analysis.summary}
            </p>
          </CardContent>
        </Card>
      </MotionPage>
    </DashboardShell>
  );
}
