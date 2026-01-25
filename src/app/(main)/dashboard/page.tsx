"use client";

import Link from "next/link";
import { useAppContext } from "@/context/useAppContext.hook";

type QuickLink = {
    label: string;
    href: string;
    description?: string;
};

const quickLinks: QuickLink[] = [
    { label: "Travel Requests", href: "/home/travel-requests", description: "Browse new requests" },
    { label: "My Offers", href: "/home/my-offers", description: "Review submitted offers" },
    { label: "Messages", href: "/home/messages", description: "Chat with travellers" },
    { label: "Profile", href: "/home/profile", description: "Update your agency details" },
];

export default function Dashboard() {
    const { user } = useAppContext();

    return (
        <div className="space-y-6">
            {/* Top header row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-gray-600 mt-1">
                        Welcome{user?.name ? `, ${user.name}` : ""}.
                    </p>
                </div>

                <div className="flex gap-2">
                    <Link
                        href="/home/travel-requests"
                        className="px-4 py-2 bg-black text-white rounded hover:opacity-90 text-sm"
                    >
                        View requests
                    </Link>
                    <Link
                        href="/home/profile"
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                    >
                        Edit profile
                    </Link>
                </div>
            </div>

            {/* KPI tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="New requests" value="12" subtitle="Last 7 days" />
                <StatCard title="Offers sent" value="5" subtitle="Last 7 days" />
                <StatCard title="Active chats" value="2" subtitle="Right now" />
                <StatCard title="Conversion" value="18%" subtitle="Last 30 days" />
            </div>

            {/* Quick navigation */}
            <div className="border border-gray-200 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold">Quick actions</h2>
                    <span className="text-xs text-gray-500">Shortcuts</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {quickLinks.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="font-medium">{l.label}</div>
                                    {l.description && (
                                        <div className="text-sm text-gray-600 mt-1">{l.description}</div>
                                    )}
                                </div>
                                <span className="text-gray-400">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Placeholder for main dashboard content */}
            <div className="border border-gray-200 rounded-lg p-5">
                <h2 className="font-semibold mb-2">Activity</h2>
                <p className="text-sm text-gray-600">
                    This is where your recent requests, offer activity, and messages summary will go.
                </p>

                <div className="mt-4 rounded border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
                    Activity feed placeholder
                </div>
            </div>
        </div>
    );
}

function StatCard({
    title,
    value,
    subtitle,
}: {
    title: string;
    value: string;
    subtitle?: string;
}) {
    return (
        <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-600">{title}</div>
            <div className="text-2xl font-bold mt-1">{value}</div>
            {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
        </div>
    );
}