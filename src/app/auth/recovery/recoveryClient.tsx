/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordWithRecovery } from "@/lib/appwrite";
import { Logo } from "@/app/logo";

export default function RecoveryClient() {
    const sp = useSearchParams();
    const router = useRouter();
    const userId = sp.get("userId") ?? "";
    const secret = sp.get("secret") ?? "";
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [done, setDone] = useState(false);

    const missingParams = !userId || !secret;

    const canSubmit = useMemo(
        () => {
            if (missingParams) return false;
            if (password.length < 8) return false;
            if (password !== confirm) return false;
            return true;
        },
        [missingParams, password, confirm]
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit || submitting) return;
        setSubmitting(true);
        setError(null);
        try {
            await resetPasswordWithRecovery(userId, secret, password);
            setDone(true);
            setTimeout(() => router.replace("/login"), 800);
        } catch (err: any) {
            setError(err?.message || "Could not reset password");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <div className="flex justify-center mb-5"><Link href="/home"><Logo size="lg" /></Link></div>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-7">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Reset password</h1>
                        <p className="text-sm text-gray-700 mt-1">Choose a new password for your account.</p>
                    </div>
                    {missingParams ? (
                        <div className="space-y-4">
                            <div className="border border-red-200 bg-red-50 text-red-700 text-sm rounded-lg p-3">This reset link is invalid or expired. Please request a new one.</div>
                            <Link
                                href="/auth/forgot"
                                className="block w-full rounded-lg bg-slate-900 text-white py-3.5 font-medium text-center hover:opacity-90 transition"
                            >
                                Request new reset link
                            </Link>
                        </div>
                    ) : done ? (
                        <div className="space-y-4">
                            <div className="border border-gray-200 bg-gray-50 text-gray-900 text-sm rounded-lg p-3">Password updated. Redirecting to login…</div>
                            <Link href="/login" className="text-sm font-semibold text-gray-900 hover:opacity-80 text-center block">Go to login</Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Field label="New password" type="password" value={password} onChange={setPassword} placeholder="At least 8 characters" autoComplete="new-password" />
                            <Field label="Confirm password" type="password" value={confirm} onChange={setConfirm} placeholder="Repeat your password" autoComplete="new-password" />
                            {error && <div className="border border-red-200 bg-red-50 text-red-700 text-sm rounded-lg p-3">{error}ß</div>}
                            <button
                                type="submit"
                                disabled={!canSubmit || submitting}
                                className="w-full rounded-lg bg-slate-900 text-white py-3.5 font-medium hover:opacity-90 transition disabled:cursor-not-allowed"
                            >
                                {submitting ? "Updating…" : "Update password"}
                            </button>
                            <div className="text-sm text-center">
                                <Link href="/login" className="font-semibold text-gray-900 hover:opacity-80">Back to login</Link>
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