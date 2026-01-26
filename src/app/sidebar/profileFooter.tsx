"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/useAppContext.hook";
import { account, logout } from "@/lib/appwrite"; // adjust to your actual Appwrite export

function DotsIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
        </svg>
    );
}

function LogoutIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
            <path
                d="M10 7V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M14 12H4m0 0 3-3m-3 3 3 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function ProfileFooter() {
    const { user, setUser } = useAppContext();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const menuId = useId();

    useEffect(() => {
        const onPointerDown = (e: PointerEvent) => {
            if (!open) return;
            const el = wrapRef.current;
            if (!el) return;
            if (!el.contains(e.target as Node)) setOpen(false);
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (!open) return;
            if (e.key === "Escape") {
                setOpen(false);
                btnRef.current?.focus();
            }
        };
        window.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch {
        } finally {
            setUser(null);
            setOpen(false);
            router.push("/home");
        }
    };

    return (
        <div className="border-t border-gray-200 p-4">
            <div ref={wrapRef} className="relative flex items-center gap-3">
                <div className="h-9 w-9 shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                    {(user?.name?.trim()?.[0] ?? "—").toUpperCase()}
                </div>
                <div className="min-w-0 leading-tight">
                    <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.name || "--"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                        {user?.email || '--'}
                    </p>
                </div>
                <button
                    ref={btnRef}
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={open}
                    aria-controls={menuId}
                    onClick={() => setOpen((v) => !v)}
                    className={[
                        "ml-auto h-9 w-9 shrink-0 rounded-full flex items-center justify-center",
                        "text-gray-600 hover:text-black transition-colors",
                        open ? "bg-gray-100" : "hover:bg-gray-50",
                        "focus:outline-none focus:ring-2 focus:ring-gray-200",
                    ].join(" ")}
                >
                    <span className="sr-only">Open menu</span>
                    <DotsIcon className="h-5 w-5" />
                </button>
                {open ? (
                    <div
                        id={menuId}
                        role="menu"
                        aria-label="Profile menu"
                        className={[
                            "absolute right-0 bottom-12 z-50",
                            "min-w-44 rounded-xl border border-gray-200 bg-white",
                            "shadow-lg",
                            "p-1",
                        ].join(" ")}
                    >
                        <button
                            type="button"
                            role="menuitem"
                            onClick={handleLogout}
                            className={[
                                "w-full rounded-lg px-3 py-2",
                                "flex items-center justify-between gap-3",
                                "text-sm text-gray-900 hover:bg-gray-50 transition-colors",
                            ].join(" ")}
                        >
                            <span>Logout</span>
                            <LogoutIcon className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}