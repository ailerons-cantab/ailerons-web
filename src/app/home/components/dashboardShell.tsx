"use client";

import type { ReactNode } from "react";
import LeftMenu from "../(protected)/(dashboard)/components/leftMenu";
import { useAppContext } from "@/context/useAppContext.hook";

export default function DashboardShell({ children }: { children: ReactNode }) {

    const { user } = useAppContext();

    console.log("Dashboard shell:", user);


    return (
        <div className="max-w-[1400px] mx-auto px-6 py-6">
            <div className="flex gap-6">
                <div className="w-[260px] shrink-0">
                    <LeftMenu />
                </div>

                <div className="flex-1 min-w-0">
                    <section className="border border-gray-200 rounded-lg p-6 min-h-[70vh] bg-white">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}