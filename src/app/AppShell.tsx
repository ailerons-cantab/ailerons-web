"use client";

import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context/useAppContext.hook";
import GlobalLoader from "./GlobalLoader";

const MIN_MS = 1000;

export default function AppShell({ children }: { children: React.ReactNode }) {
    const { loading } = useAppContext();

    const startRef = useRef<number>(Date.now());
    const timerRef = useRef<number | null>(null);

    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        if (loading) {
            startRef.current = Date.now();
            setShowLoader(true);
            return;
        }

        const elapsed = Date.now() - startRef.current;
        const remaining = Math.max(0, MIN_MS - elapsed);

        timerRef.current = window.setTimeout(() => {
            setShowLoader(false);
            timerRef.current = null;
            document.documentElement.classList.remove("preload");
        }, remaining);

        return () => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
        };
    }, [loading]);

    return (
        <>
            <div style={{ visibility: showLoader ? "hidden" : "visible" }}>{children}</div>
            {showLoader && <GlobalLoader />}
        </>
    );
}