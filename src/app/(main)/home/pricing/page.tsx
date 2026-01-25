"use client";

import Link from "next/link";

type Plan = {
    name: string;
    tagline: string;
    price: string;
    period: string;
    cta: { label: string; href: string };
    bullets: string[];
    footnote: string;
};

const plans: Plan[] = [
    {
        name: "Free trial",
        tagline: "For travel professionals who try before they fly",
        price: "£0",
        period: "/3 months",
        cta: { label: "Get started", href: "/auth/signup" },
        bullets: [
            "Unlimited access to travel requests",
            "Submit as many travel offers as you like",
            "Full support and onboarding",
            "Keep any reviews you earn",
        ],
        footnote: "No credit card required",
    },
    {
        name: "Standard plan",
        tagline: "For the high flyers in the travel game",
        price: "£50",
        period: "/seat/month",
        cta: { label: "Ready to go", href: "/home/profile" },
        bullets: [
            "Everything from the free trial, plus:",
            "Advanced request alerts",
            "Performance analytics",
            "Travel agent verification badge",
        ],
        footnote: "Simple and powerful",
    },
];

export default function PricingPage() {
    return (
        <div className="space-y-16 pb-24">
            <header className="text-center mx-auto pt-24 pb-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto">Simple, transparent pricing</h1>
                <p className="mt-6 text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto">Start for free and grow in confidence. No hidden fees, so no surprises.</p>
            </header>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                {plans.map((p) => (
                    <PlanCard key={p.name} plan={p} />
                ))}
            </section>
        </div>
    );
}

function PlanCard({ plan }: { plan: Plan }) {
    return (
        <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
            <div className="p-10">
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <p className="text-gray-600 mt-3">{plan.tagline}</p>
                <div className="mt-8 flex items-end gap-2">
                    <span className="text-5xl font-bold leading-none">
                        {plan.price}
                    </span>
                    <span className="text-gray-600 pb-1">{plan.period}</span>
                </div>
                <Link href={plan.cta.href} className="mt-10 block w-full rounded-lg bg-slate-900 text-white py-3.5 text-center font-medium hover:opacity-90 transition">{plan.cta.label}</Link>
            </div>
            <div className="border-t border-gray-200" />
            <div className="p-10">
                <ul className="space-y-5">
                    {plan.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-4">
                            <CheckIcon />
                            <span className="text-gray-700">{b}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-10 text-center font-semibold">{plan.footnote}</div>
            </div>
        </div>
    );
}

function CheckIcon() {
    return <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-600 text-white text-sm shrink-0" aria-hidden>✓</span>
}