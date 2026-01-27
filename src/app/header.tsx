"use client";

import { useAppContext } from "@/context/useAppContext.hook";
import { logout } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { Logo } from "./logo";

export default function Header() {
    const { user, setUser } = useAppContext();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        setUser(null);
        router.push("/home");
    };

    const primaryAction = user ? { label: "Dashboard", onClick: () => router.push("/dashboard") } : { label: "Sign up", onClick: () => router.push("/auth/register") };
    const secondaryAction = user ? { label: "Log out", onClick: handleLogout } : { label: "Log in", onClick: () => router.push("/auth/login") };

    return (
        <header className="h-16 border-y border-gray-200 bg-white">
            <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
                <Logo size="md" />
                <nav className="flex items-center gap-6 text-sm font-normal text-gray-500">
                    <a href="/home/features" className="hover:text-black transition-colors">Overview</a>
                    <a href="/home/pricing" className="hover:text-black transition-colors">Pricing</a>
                    <a href="/home/about" className="hover:text-black transition-colors">About</a>
                    <a href="/home/contact" className="hover:text-black transition-colors">Contact</a>
                    <div className="flex items-center gap-3 ml-3">
                        <button
                            onClick={secondaryAction.onClick}
                            className="h-9 min-w-[96px] px-4 border border-gray-300 rounded-md text-sm text-gray-800 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                        >
                            {secondaryAction.label}
                        </button>
                        <button onClick={primaryAction.onClick} className="h-9 min-w-[96px] px-4 bg-slate-900 text-white rounded-md text-sm hover:opacity-90 transition-opacity">
                            {primaryAction.label}
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}