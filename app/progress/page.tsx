import { BarChart3, CheckCircle2, CircleDot, Clock3 } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { MotionPage } from "@/components/motion-page";
import { ProgressRing } from "@/components/progress-ring";
import { SkillProgressChart } from "@/components/progress/skill-progress-chart";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { generateCareerReadiness } from "@/lib/mockAI";

export default function ProgressPage() {
  const readiness = generateCareerReadiness();

  return (
    <DashboardShell>
      <MotionPage className="space-y-6">
        <section className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <Badge variant="blue" className="mb-5">
              <BarChart3 className="mr-2 h-3.5 w-3.5" />
              Progress
            </Badge>
            <ProgressRing value={readiness.score} label="Career Readiness" />
            <p className="mt-5 text-sm leading-6 text-slate-400">
              Your current readiness score is {readiness.score}% and trending
              toward internship-ready.
            </p>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Skill Progress Chart</CardTitle>
              <p className="text-sm leading-6 text-slate-400">
                Track growth across key skills and close the weakest gaps first.
              </p>
            </CardHeader>
            <CardContent>
              <SkillProgressChart data={readiness.skillProgress} />
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Skill Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {readiness.skillProgress.map((skill) => (
                <div key={skill.skill}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-white">{skill.skill}</span>
                    <span className="text-cyan-100">{skill.value}%</span>
                  </div>
                  <Progress value={skill.value} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Growth Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {readiness.milestones.map((milestone, index) => {
                  const isComplete = milestone.status === "complete";
                  const isActive = milestone.status === "active";
                  const Icon = isComplete ? CheckCircle2 : isActive ? CircleDot : Clock3;

                  return (
                    <div key={milestone.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={
                            isComplete
                              ? "flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200"
                              : isActive
                                ? "flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-200"
                                : "flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.07] text-slate-400"
                          }
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        {index < readiness.milestones.length - 1 ? (
                          <div className="h-8 w-px bg-white/10" />
                        ) : null}
                      </div>
                      <div className="pt-1">
                        <p className="font-medium text-white">{milestone.title}</p>
                        <p className="mt-1 text-sm capitalize text-slate-400">
                          {milestone.status}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>
      </MotionPage>
    </DashboardShell>
  );
}
