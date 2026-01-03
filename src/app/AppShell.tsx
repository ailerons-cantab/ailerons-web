"use client";

import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context/useAppContext.hook";
import GlobalLoader from "./GlobalLoader";

const MIN_MS = 1000;

export default function AppShell({ children }: { children: React.ReactNode }) {
    const { loading } = useAppContext();

    const startRef = useRef<number>(Date.now());
    const timerRef = useRef<number | null>(null);

    // Start with loader visible to prevent any pre-hydration flash
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        // clear pending hide timers
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        if (loading) {
            startRef.current = Date.now();
            setShowLoader(true);
            return;
        }

        // loading finished -> keep visible until MIN_MS elapsed
        const elapsed = Date.now() - startRef.current;
        const remaining = Math.max(0, MIN_MS - elapsed);

        timerRef.current = window.setTimeout(() => {
            setShowLoader(false);
            timerRef.current = null;
            document.documentElement.classList.remove("preload"); // remove gate only when we're actually done
        }, remaining);

        return () => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
        };
    }, [loading]);

    return (
        <>
            {/* hide app UI while loader is visible (prevents header/footer/body flashes) */}
            <div style={{ visibility: showLoader ? "hidden" : "visible" }}>{children}</div>
            {showLoader && <GlobalLoader />}
        </>
    );
}