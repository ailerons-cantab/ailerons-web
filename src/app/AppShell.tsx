"use client";

import { useAppContext } from "@/context/useAppContext.hook";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const { loading } = useAppContext();

    return (
        <>
            {loading && <GlobalLoader />}
            {children}
        </>
    );
}

function GlobalLoader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
        </div>
    );
}