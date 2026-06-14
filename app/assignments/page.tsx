import { Target } from "lucide-react";
import { AssignmentsBoard } from "@/components/assignments/assignments-board";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { MotionPage } from "@/components/motion-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function AssignmentsPage() {
  return (
    <DashboardShell>
      <MotionPage className="space-y-6">
        <Card>
          <CardHeader>
            <Badge variant="blue" className="mb-4 w-fit">
              <Target className="mr-2 h-3.5 w-3.5" />
              Personalized Assignments
            </Badge>
            <CardTitle className="text-3xl">Gap-generated improvement tasks</CardTitle>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">
              Assignments are generated from the weakest assessment categories,
              then tracked with concrete deliverables and checklist progress.
            </p>
          </CardHeader>
        </Card>
        <AssignmentsBoard />
      </MotionPage>
    </DashboardShell>
  );
}
