"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function GlobalLoader() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return createPortal(
        <>
            <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 999999, display: "flex", alignItems: "center", justifyContent: "center", background: "white" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: "4px solid #e5e7eb", borderTopColor: "#000", animation: "spin 0.8s linear infinite" }} />
            </div>
            <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </>,
        document.body
    );
}