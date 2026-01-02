import type { ReactNode } from "react";
import DashboardShell from "../../components/dashboardShell";

export default function DashboardGroupLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <DashboardShell>{children}</DashboardShell>
        </div>
    );
}