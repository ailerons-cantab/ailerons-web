"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/useAppContext.hook";
import LeftMenu from "../../sidebar/leftMenu";

export default function ProtectedHomeLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, loading } = useAppContext();

    useEffect(
        () => {
            if (loading) return;
            if (!user?.email) router.replace("/home");
        },
        [loading, user?.email, router]
    );

    if (loading) return null;
    if (!user?.email) return null;

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