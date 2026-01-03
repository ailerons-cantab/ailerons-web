"use client";

import Dashboard from "@/app/home/components/dashboard";
import DashboardShell from "@/app/home/components/dashboardShell";
import Information from "@/app/home/information";
import { useAppContext } from "@/context/useAppContext.hook";


export default function HomePage() {
    const { user, loading } = useAppContext();

    if (loading) return null;

    if (!user) return <Information />;

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <DashboardShell>
                <Dashboard />
            </DashboardShell>
        </div>
    );
}