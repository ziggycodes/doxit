import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProfileBootstrap } from "@/components/dashboard/profile-bootstrap";
import { TrialBanner } from "@/components/dashboard/trial-banner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <ProfileBootstrap />
      <DashboardHeader />
      <TrialBanner />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
