"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, CirclePlay, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Assignment, generateAssignments } from "@/lib/mockAI";

const difficultyVariant: Record<Assignment["difficulty"], "success" | "warning" | "danger"> = {
  Easy: "success",
  Medium: "warning",
  Hard: "danger"
};

export function AssignmentsBoard() {
  const assignments = useMemo(() => generateAssignments(), []);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {assignments.map((assignment) => {
        const isComplete = completed[assignment.id];
        const progress = isComplete ? 100 : assignment.progress;

        return (
          <Card
            key={assignment.id}
            className="flex min-h-[320px] flex-col transition hover:-translate-y-1 hover:border-purple/35"
          >
            <CardHeader>
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/[0.07]">
                  <Target className="h-5 w-5 text-cyan-200" />
                </div>
                <Badge variant={difficultyVariant[assignment.difficulty]}>
                  {assignment.difficulty}
                </Badge>
              </div>
              <CardTitle>{assignment.title}</CardTitle>
              <p className="text-sm leading-6 text-slate-400">
                {assignment.description}
              </p>
            </CardHeader>
            <CardContent className="mt-auto space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-400">{assignment.focus}</span>
                  <span className="font-medium text-cyan-100">{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <Button variant="secondary">
                  <CirclePlay className="h-4 w-4" />
                  Start Assignment
                </Button>
                <Button
                  variant={isComplete ? "outline" : "default"}
                  onClick={() =>
                    setCompleted((current) => ({
                      ...current,
                      [assignment.id]: !current[assignment.id]
                    }))
                  }
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {isComplete ? "Completed" : "Mark Complete"}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
