/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { account, logout, normaliseUserFromAccount, signIn } from "@/lib/appwrite";
import { useAppContext } from "@/context/useAppContext.hook";
import { Logo } from "@/app/logo";

export default function LoginPage() {
    const { setUser } = useAppContext();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const canSubmit = useMemo(
        () => email.trim().length > 3 && password.length >= 1,
        [email, password]
    );

    useEffect(
        () => {
            (async () => {
                try {
                    await logout();
                } catch {
                    // ignore
                } finally {
                    setUser(null);
                }
            })();
        },
        [setUser]
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit || submitting) return;

        setSubmitting(true);
        setError(null);

        try {
            await signIn(email.trim(), password);
            const acc = await account.get();
            const user = normaliseUserFromAccount(acc);
            setUser(user);
            router.replace("/dashboard");
        } catch (err: any) {
            setError(err?.message || "Invalid email or password");
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
                        <h1 className="text-2xl font-bold text-gray-900">Log in</h1>
                        <p className="text-sm text-gray-700 mt-1">Welcome back — sign in to your dashboard.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@company.com" autoComplete="email" />
                        <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" autoComplete="current-password" />
                        {error && (
                            <div className="border border-red-200 bg-red-50 text-red-700 text-sm rounded-lg p-3">
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={!canSubmit || submitting}
                            className=" w-full rounded-lg bg-black text-white py-2.5 text-sm font-medium hover:opacity-90 disabled:cursor-not-allowed transition">
                            {submitting ? "Signing in…" : "Sign in"}
                        </button>
                        <div className="text-sm text-gray-700 text-center">
                            Do not have an account yet?{" "}
                            <Link href="/register" className="font-semibold text-gray-900 hover:opacity-80">Sign up</Link>
                        </div>
                        <div className="text-sm text-center">
                            <Link href="/auth/forgot" className="font-semibold text-gray-900 hover:opacity-80">Forgot password?</Link>
                        </div>
                    </form>
                </div>
                {/* <p className="text-center text-xs text-gray-500 mt-6">By continuing, you agree to our Terms and Privacy Policy.</p> */}
            </div>
        </main>
    );
}

function Field(props: { label: string, type: React.HTMLInputTypeAttribute, placeholder?: string, value: string, onChange: (v: string) => void, autoComplete?: string }) {
    return (
        <label className="block">
            <div className="text-xs font-semibold text-gray-900 mb-1">
                {props.label}
            </div>
            <input
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                autoComplete={props.autoComplete}
                onChange={(e) => props.onChange(e.target.value)}
                className=" w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-500 outline-none focus:border-gray-500"
                required
            />
        </label>
    );
}