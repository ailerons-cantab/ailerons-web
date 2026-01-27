/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { sendPasswordRecovery } from "@/lib/appwrite";
import { Logo } from "@/app/logo";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sent, setSent] = useState(false);

    const canSubmit = useMemo(() => email.trim().length > 3, [email]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit || submitting) return;

        setSubmitting(true);
        setError(null);

        try {
            await sendPasswordRecovery(email.trim());
            setSent(true);
        } catch (err: any) {
            setError(err?.message || "Could not send recovery email");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <div className="flex justify-center mb-5">
                    <Link href="/home"><Logo size="lg" /></Link>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-7">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Forgot password</h1>
                        <p className="text-sm text-gray-700 mt-1">
                            Enter your email and we’ll send you a reset link.
                        </p>
                    </div>
                    {sent ? (
                        <div className="space-y-4">
                            <div className="border border-gray-200 bg-gray-50 text-gray-900 text-sm rounded-lg p-3">
                                If an account exists for <span className="font-semibold">{email.trim()}</span>, you’ll
                                receive a password reset email shortly.
                            </div>
                            <Link href="/auth/login" className="block w-full rounded-lg bg-slate-900 text-white py-3.5 font-medium text-center hover:opacity-90 transition">
                                Back to login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@company.com" autoComplete="email" />
                            {error && (
                                <div className="border border-red-200 bg-red-50 text-red-700 text-sm rounded-lg p-3">
                                    {error}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={!canSubmit || submitting}
                                className="w-full rounded-lg bg-slate-900 text-white py-3.5 font-medium hover:opacity-90 transition disabled:cursor-not-allowed"
                            >
                                {submitting ? "Sending…" : "Send reset link"}
                            </button>
                            <div className="text-sm text-center">
                                <Link href="/auth/login" className="font-semibold text-gray-900 hover:opacity-80">Back to login</Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}

function Field(props: { label: string, type: React.HTMLInputTypeAttribute, placeholder?: string, value: string, onChange: (v: string) => void, autoComplete?: string }) {
    return (
        <label className="block">
            <div className="text-xs font-semibold text-gray-900 mb-1">{props.label}</div>
            <input
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                autoComplete={props.autoComplete}
                onChange={(e) => props.onChange(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-500 outline-none focus:border-gray-500"
                required
            />
        </label>
    );
}