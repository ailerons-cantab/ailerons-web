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
    };

    return (
        <header className="flex justify-between items-center px-8 border-b-2 border-t-2 border-black h-10">
            <Logo size="sm" />

            <nav className="flex items-center gap-3 text-xs font-normal text-gray-500 tracking-[0.01em] leading-none relative top-[-0.5px]">
                <a href="/home/features" className="hover:text-black transition-colors">
                    Features
                </a>
                <a href="/home/pricing" className="hover:text-black transition-colors">
                    Pricing
                </a>
                <a href="/home/about" className="hover:text-black transition-colors">
                    About
                </a>
                <a href="/home/contact" className="hover:text-black transition-colors">
                    Contact
                </a>

                <button
                    onClick={user ? handleLogout : () => router.push("/auth")}
                    className="ml-2 px-3 py-1 bg-gray-800 text-white rounded-sm text-xs leading-none hover:bg-gray-900 transition-colors"
                >
                    {user ? "Log out" : "Log in"}
                </button>
            </nav>
        </header>
    );
}