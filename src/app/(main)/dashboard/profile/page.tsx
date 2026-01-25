"use client";

import { useMemo, useState } from "react";
import { useAppContext } from "@/context/useAppContext.hook";

type Chip = { label: string };
type MetricKey = "offersSubmitted" | "acceptanceRate" | "avgResponseMins" | "satisfaction";

type ProfileData = {
    subscription: {
        status: "Active" | "Inactive";
        licenceNumber: string;
        billingCycle: "Monthly" | "Yearly";
        renewal: "Automatic" | "Manual";
        nextPayment: string; // ISO-ish / display string
        cardLast4: string;
    };
    personal: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
    };
    professional: {
        agentRef: string;
        agencyName: string;
        experience: string;
        specialisations: Chip[];
        languages: Chip[];
        certifications: string[];
    };
    metrics: Record<MetricKey, number>;
    chart: { label: string; submitted: number; accepted: number }[];
};

export default function ProfilePage() {
    const { user } = useAppContext();
    const [editing, setEditing] = useState<null | "subscription" | "personal" | "professional">(null);

    // TODO: replace with real data source
    const data: ProfileData = useMemo(
        () => ({
            subscription: {
                status: "Active",
                licenceNumber: "A7B3-9X2C-D5E1-G8H4-J6K9-L2M5",
                billingCycle: "Monthly",
                renewal: "Automatic",
                nextPayment: "01/05/2025",
                cardLast4: "1234",
            },
            personal: {
                fullName: user?.name || "Full Name",
                email: user?.email || "email@example.com",
                phone: "+44 (0)845 071 3411",
                location: "Peterborough, Cambridgeshire",
            },
            professional: {
                agentRef: "AGT-83507",
                agencyName: "Lunn Poly",
                experience: "5 years 4 months",
                specialisations: [{ label: "Europe" }, { label: "Beach" }, { label: "City break" }],
                languages: [{ label: "English" }, { label: "Dutch" }],
                certifications: [
                    "Travel and Tourism Certificate - International Air Transport Association (IATA)",
                    "Travel Apprenticeship – Association of British Travel Agents (ABTA)",
                ],
            },
            metrics: {
                offersSubmitted: 126,
                acceptanceRate: 41,
                avgResponseMins: 135,
                satisfaction: 4,
            },
            chart: [
                { label: "Jan", submitted: 62, accepted: 12 },
                { label: "Feb", submitted: 68, accepted: 18 },
                { label: "Mar", submitted: 74, accepted: 22 },
                { label: "Apr", submitted: 82, accepted: 28 },
                { label: "May", submitted: 80, accepted: 23 },
                { label: "Jun", submitted: 78, accepted: 20 },
            ],
        }),
        [user?.email, user?.name]
    );

    const avgResponseText = formatDuration(data.metrics.avgResponseMins);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">Profile</h1>
                    <p className="text-gray-600 mt-1">Manage your subscription and agency details.</p>
                </div>
            </div>

            {/* 2x2 grid of cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Subscription */}
                <Card
                    title="Subscription details"
                    action={<StatusPill status={data.subscription.status} />}
                    footerAction={
                        <EditButton onClick={() => setEditing("subscription")} label="Edit" />
                    }
                >
                    <DefinitionList
                        items={[
                            { label: "Licence number", value: data.subscription.licenceNumber },
                            { label: "Billing cycle", value: data.subscription.billingCycle },
                            { label: "Renewal", value: data.subscription.renewal },
                            { label: "Next payment", value: data.subscription.nextPayment },
                            { label: "Card", value: `•••• •••• •••• ${data.subscription.cardLast4}` },
                        ]}
                    />
                </Card>

                {/* Personal */}
                <Card
                    title="Personal information"
                    footerAction={<EditButton onClick={() => setEditing("personal")} label="Edit" />}
                >
                    <div className="flex gap-4">
                        <Avatar />
                        <DefinitionList
                            className="flex-1"
                            items={[
                                { label: "Full name", value: data.personal.fullName },
                                { label: "Email address", value: data.personal.email },
                                { label: "Telephone number", value: data.personal.phone },
                                { label: "Location", value: data.personal.location },
                            ]}
                        />
                    </div>
                </Card>

                {/* Professional */}
                <Card
                    title="Professional details"
                    footerAction={
                        <EditButton onClick={() => setEditing("professional")} label="Edit" />
                    }
                >
                    <DefinitionList
                        items={[
                            { label: "Agent reference number", value: data.professional.agentRef },
                            { label: "Travel agency name", value: data.professional.agencyName },
                            { label: "Experience", value: data.professional.experience },
                        ]}
                    />

                    <div className="mt-4 space-y-3">
                        <div>
                            <div className="text-sm font-medium">Specialisations</div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {data.professional.specialisations.map((c) => (
                                    <Chip key={c.label} label={c.label} />
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm font-medium">Languages spoken</div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {data.professional.languages.map((c) => (
                                    <Chip key={c.label} label={c.label} />
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm font-medium">Certifications</div>
                            <ul className="mt-2 space-y-1 text-sm text-gray-700 list-disc pl-5">
                                {data.professional.certifications.map((t) => (
                                    <li key={t}>{t}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Card>

                {/* Metrics */}
                <Card title="Performance metrics">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <MetricTile title="Travel offers submitted" value={String(data.metrics.offersSubmitted)} />
                        <MetricTile title="Client acceptance rate" value={`${data.metrics.acceptanceRate}%`} />
                        <MetricTile title="Average client response time" value={avgResponseText} />
                        <MetricTile title="Client satisfaction" value={`${data.metrics.satisfaction}/5`} />
                    </div>

                    <div className="mt-4 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-center gap-4 text-xs text-gray-600 mb-3">
                            <LegendDot label="Offers submitted" />
                            <LegendDot label="Offers accepted" />
                        </div>

                        <MiniLineChart data={data.chart} />
                    </div>
                </Card>
            </div>

            {/* Simple “edit” modal placeholder */}
            {editing && (
                <Modal
                    title={`Edit ${editing}`}
                    onClose={() => setEditing(null)}
                    description="Wire this up to your Appwrite user profile collection when ready."
                />
            )}
        </div>
    );
}

/* ----------------------------- UI primitives ----------------------------- */

function Card({
    title,
    action,
    children,
    footerAction,
}: {
    title: string;
    action?: React.ReactNode;
    children: React.ReactNode;
    footerAction?: React.ReactNode;
}) {
    return (
        <section className="border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-200">
                <h2 className="font-semibold">{title}</h2>
                {action}
            </div>

            <div className="p-5">{children}</div>

            {footerAction && (
                <div className="px-5 py-3 border-t border-gray-200 flex justify-end">
                    {footerAction}
                </div>
            )}
        </section>
    );
}

function DefinitionList({
    items,
    className,
}: {
    items: { label: string; value: string }[];
    className?: string;
}) {
    return (
        <dl className={className ?? ""}>
            {items.map((it) => (
                <div key={it.label} className="mb-3 last:mb-0">
                    <dt className="text-xs text-gray-500">{it.label}</dt>
                    <dd className="text-sm text-gray-900 mt-1">{it.value}</dd>
                </div>
            ))}
        </dl>
    );
}

function EditButton({ onClick, label }: { onClick: () => void; label: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-2 text-sm border border-gray-200 rounded px-3 py-1.5 hover:bg-gray-50"
        >
            <span aria-hidden>✎</span>
            {label}
        </button>
    );
}

function StatusPill({ status }: { status: "Active" | "Inactive" }) {
    const isActive = status === "Active";
    return (
        <span
            className={[
                "text-xs px-2 py-1 rounded-full border",
                isActive ? "border-green-200 text-green-700 bg-green-50" : "border-gray-200 text-gray-600 bg-gray-50",
            ].join(" ")}
        >
            {status}
        </span>
    );
}

function Chip({ label }: { label: string }) {
    return (
        <span className="text-xs border border-gray-200 rounded px-2 py-1 bg-white">
            {label}
        </span>
    );
}

function MetricTile({ title, value }: { title: string; value: string }) {
    return (
        <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-xs text-gray-600">{title}</div>
            <div className="text-xl font-bold mt-1">{value}</div>
        </div>
    );
}

function Avatar() {
    return (
        <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 shrink-0">
            <span className="text-2xl" aria-hidden>
                👤
            </span>
            <span className="sr-only">Profile picture</span>
        </div>
    );
}

function LegendDot({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full border border-gray-400" aria-hidden />
            <span>{label}</span>
        </div>
    );
}

/* --------------------------- tiny SVG line chart -------------------------- */

function MiniLineChart({
    data,
}: {
    data: { label: string; submitted: number; accepted: number }[];
}) {
    const w = 640;
    const h = 220;
    const padX = 28;
    const padY = 18;

    const maxY = Math.max(...data.flatMap((d) => [d.submitted, d.accepted]), 1);

    const x = (i: number) =>
        padX + (i * (w - padX * 2)) / Math.max(data.length - 1, 1);

    const y = (v: number) =>
        h - padY - (v * (h - padY * 2)) / maxY;

    const linePath = (key: "submitted" | "accepted") =>
        data
            .map((d, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(2)} ${y(d[key]).toFixed(2)}`)
            .join(" ");

    return (
        <div className="w-full overflow-x-auto">
            <svg
                viewBox={`0 0 ${w} ${h}`}
                className="min-w-[520px] w-full h-[220px]"
                role="img"
                aria-label="Offers submitted and accepted over time"
            >
                {/* grid */}
                {[0.25, 0.5, 0.75].map((t) => {
                    const yy = padY + (h - padY * 2) * t;
                    return <line key={t} x1={padX} x2={w - padX} y1={yy} y2={yy} stroke="currentColor" opacity="0.12" />;
                })}

                {/* axes */}
                <line x1={padX} x2={w - padX} y1={h - padY} y2={h - padY} stroke="currentColor" opacity="0.18" />
                <line x1={padX} x2={padX} y1={padY} y2={h - padY} stroke="currentColor" opacity="0.18" />

                {/* lines (no explicit colors; use currentColor + opacity differences) */}
                <path d={linePath("submitted")} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.9" />
                <path d={linePath("accepted")} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.45" />

                {/* points */}
                {data.map((d, i) => (
                    <g key={d.label}>
                        <circle cx={x(i)} cy={y(d.submitted)} r="3" fill="currentColor" opacity="0.9" />
                        <circle cx={x(i)} cy={y(d.accepted)} r="3" fill="currentColor" opacity="0.45" />
                    </g>
                ))}

                {/* x labels */}
                {data.map((d, i) => (
                    <text
                        key={d.label}
                        x={x(i)}
                        y={h - 4}
                        textAnchor="middle"
                        fontSize="12"
                        fill="currentColor"
                        opacity="0.6"
                    >
                        {d.label}
                    </text>
                ))}
            </svg>
        </div>
    );
}

/* --------------------------------- modal -------------------------------- */

function Modal({
    title,
    description,
    onClose,
}: {
    title: string;
    description?: string;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button
                type="button"
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
                aria-label="Close modal"
            />
            <div className="relative w-full max-w-lg bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-semibold">{title}</h3>
                        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-sm border border-gray-200 rounded px-2 py-1 hover:bg-gray-50"
                    >
                        ✕
                    </button>
                </div>

                <div className="mt-4 rounded border border-dashed border-gray-300 p-4 text-sm text-gray-600">
                    Form placeholder
                </div>

                <div className="mt-4 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-2 text-sm bg-black text-white rounded hover:opacity-90"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

/* -------------------------------- helpers ------------------------------- */

function formatDuration(totalMins: number): string {
    const mins = Math.max(0, Math.floor(totalMins));
    const h = Math.floor(mins / 60);
    const m = mins % 60;

    if (h <= 0) return `${m} minutes`;
    if (m === 0) return `${h} hours`;
    return `${h} hours ${m} minutes`;
}