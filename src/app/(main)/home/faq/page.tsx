"use client";

import { useState } from "react";
import clsx from "clsx";

type Category = "General Questions" | "Services and Products" | "Technical Support" | "Billing and Payments" | "Account Management";

type FaqItem = { question: string, answer: string; };

const FAQS: Record<Category, FaqItem[]> = {
    "General Questions": [
        {
            question: "What is Ailerons?",
            answer: "Ailerons is a platform that connects travellers with professional travel agents. Travellers post trip requests, and agents compete by submitting personalised offers, making it faster and easier to plan trips.",
        },
        {
            question: "Is Ailerons a travel agency?",
            answer: "No. Ailerons is a marketplace platform. We connect travellers with independent travel professionals but do not sell travel products directly.",
        },
        {
            question: "How do I get started as a travel agent on Ailerons?",
            answer: "Create an account, complete your profile, and verify your agency details. Once approved, you can start browsing travel requests and submitting offers.",
        },
        {
            question: "What happens after the Ailerons free trial ends?",
            answer: "You can upgrade to a paid plan to continue accessing travel requests and submitting offers. No card is required during the free trial.",
        },
    ],

    "Services and Products": [
        {
            question: "What services does Ailerons provide?",
            answer: "We provide lead generation, messaging tools, analytics, and profile management for travel agents.",
        },
        {
            question: "Can I customise my offers?",
            answer: "Yes. You can personalise each offer with pricing, itinerary details, and added value services.",
        },
    ],

    "Technical Support": [
        {
            question: "What browsers are supported?",
            answer: "Ailerons works on all modern browsers including Chrome, Safari, Firefox, and Edge.",
        },
        {
            question: "I forgot my password. What should I do?",
            answer: "Use the 'Forgot password' link on the login page to reset your password.",
        },
    ],

    "Billing and Payments": [
        {
            question: "What payment methods are accepted?",
            answer: "We accept major credit and debit cards. Additional payment methods may be added in the future.",
        },
        {
            question: "Can I cancel my subscription?",
            answer: "Yes. You can cancel at any time from your account settings.",
        },
    ],

    "Account Management": [
        {
            question: "How do I update my profile?",
            answer: "Go to your Profile page and click Edit to update your details.",
        },
        {
            question: "Can I change my email address?",
            answer: "Yes. You can change your email from account settings.",
        },
    ],
};

const categories = Object.keys(FAQS) as Category[];

export default function FaqPage() {
    const [activeCategory, setActiveCategory] = useState<Category>("General Questions");

    return (
        <div className="space-y-16 pb-24">
            <header className="text-center pt-24 pb-10">
                <h1 className="text-4xl sm:text-5xl font-bold">
                    Frequently asked questions
                </h1>
                <p className="mt-6 text-xl sm:text-2xl text-gray-600">
                    Find answers to common questions about Ailerons
                </p>
            </header>
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={clsx(
                            "px-5 py-2 rounded-md border text-sm font-medium transition",
                            activeCategory === cat
                                ? "bg-slate-800 text-white border-slate-800"
                                : "bg-white border-gray-300 hover:bg-gray-50"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <section className="max-w-3xl mx-auto space-y-4">
                {FAQS[activeCategory].map((item, i) => (<AccordionItem key={i} item={item} />))}
            </section>
            <section className="max-w-3xl mx-auto border border-gray-200 rounded-xl p-10 text-center">
                <h2 className="text-2xl font-bold">Still have questions?</h2>
                <p className="mt-3 text-gray-600"> Our support team is here to help. We typically respond within twenty-four hours.</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-6 py-3 rounded-md bg-slate-800 text-white hover:opacity-90">Contact support</button>
                    <button className="px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50">Live chat</button>
                </div>
            </section>
        </div>
    );
}

function AccordionItem({ item }: { item: FaqItem }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-medium">{item.question}</span>
                <span className={clsx("transition-transform", open ? "rotate-180" : "rotate-0")}>⌄</span>
            </button>
            {open && (<div className="px-5 pb-5 text-gray-600">{item.answer}</div>)}
        </div>
    );
}