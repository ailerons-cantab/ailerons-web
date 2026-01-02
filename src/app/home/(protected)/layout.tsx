"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/useAppContext.hook";

export default function ProtectedHomeLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, loading } = useAppContext();

    useEffect(() => {
        if (loading) return;
        if (!user?.email) router.replace("/auth");
    }, [loading, user?.email, router]);

    if (loading) return null;
    if (!user?.email) return null;

    return <>{children}</>;
}