import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHome />
    </DashboardShell>
  );
}
