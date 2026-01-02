"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { label: string, href: string };

const NAV_ITEMS: NavItem[] = [
    { label: "Dashboard", href: "/home" },
    { label: "Travel Requests", href: "/home/travel-requests" },
    { label: "My Offers", href: "/home/my-offers" },
    { label: "Messages", href: "/home/messages" },
    { label: "Profile", href: "/home/profile" },
    { label: "Settings", href: "/home/settings" },
];

const isActive = (pathname: string, href: string) => {
    if (href === "/home") {
        return pathname === "/home";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
};

export default function LeftMenu() {
    const pathname = usePathname();

    return (
        <aside className="border border-gray-200 rounded-lg p-4 h-fit lg:sticky lg:top-6">
            <div className="text-sm font-semibold mb-3">Menu</div>

            <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                    const active = isActive(pathname, item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={[
                                "px-3 py-2 rounded text-sm border transition",
                                active
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-gray-700 border-transparent hover:border-gray-200 hover:bg-gray-50",
                            ].join(" ")}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}