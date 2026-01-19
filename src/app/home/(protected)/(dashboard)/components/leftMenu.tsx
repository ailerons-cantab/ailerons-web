"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/app/logo";

type NavItem = {
    label: string;
    href: string;
    icon: string;
};

const NAV_ITEMS: NavItem[] = [
    { label: "Dashboard", href: "/home", icon: "📊" },
    { label: "Travel Requests", href: "/home/travel-requests", icon: "🧾" },
    { label: "My Offers", href: "/home/my-offers", icon: "🏷️" },
    { label: "Messages", href: "/home/messages", icon: "💬" },
    { label: "Profile", href: "/home/profile", icon: "👤" },
    { label: "Settings", href: "/home/settings", icon: "🛠️" },
];

const isActive = (pathname: string, href: string) => {
    if (href === "/home") return pathname === "/home";
    return pathname === href || pathname.startsWith(`${href}/`);
};

export default function LeftMenu() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border border-gray-200 rounded-xl p-4 h-fit lg:sticky lg:top-6">
            {/* Logo */}
            <div className="mb-4">
                <Logo size="md" />
            </div>

            <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                    const active = isActive(pathname, item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={[
                                "flex items-center gap-3 px-3 py-2 text-sm transition-colors text-gray-700 hover:text-black",
                                active
                                    ? "border-t-1 border-b-1 border-gray-200"
                                    : "",
                            ].join(" ")}
                        >
                            <span className="w-5 text-center">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}