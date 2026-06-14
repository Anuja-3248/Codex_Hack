import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { MotionPage } from "@/components/motion-page";
import { AssessmentForm } from "@/components/assessment/assessment-form";

export default function AssessmentPage() {
  return (
    <DashboardShell>
      <MotionPage>
        <AssessmentForm />
      </MotionPage>
    </DashboardShell>
  );
}
