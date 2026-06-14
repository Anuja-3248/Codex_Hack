import { Trophy } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { MotionPage } from "@/components/motion-page";
import { OpportunitiesGrid } from "@/components/opportunities/opportunities-grid";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function OpportunitiesPage() {
  return (
    <DashboardShell>
      <MotionPage className="space-y-6">
        <Card>
          <CardHeader>
            <Badge variant="blue" className="mb-4 w-fit">
              <Trophy className="mr-2 h-3.5 w-3.5" />
              Opportunity Matching
            </Badge>
            <CardTitle className="text-3xl">Internship recommendations</CardTitle>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">
              Six sample matches ranked by your current skill profile, readiness
              level, and assignment focus areas.
            </p>
          </CardHeader>
        </Card>
        <OpportunitiesGrid />
      </MotionPage>
    </DashboardShell>
  );
}
