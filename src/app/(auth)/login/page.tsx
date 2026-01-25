/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { account, logout, normaliseUserFromAccount, signIn } from "@/lib/appwrite";
import { useAppContext } from "@/context/useAppContext.hook";

export default function AuthPage() {
    const { setUser } = useAppContext();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                await logout();
            } catch (e) {
                console.error("logout failed:", e);
            } finally {
                setUser(null);
            }
        })();
    }, [setUser]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            await signIn(email, password);
            const acc = await account.get()
            const user = normaliseUserFromAccount(acc);
            setUser(user)
            router.replace("/dashboard");
        } catch (err: any) {
            setError(err?.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-md w-80">
                <h1 className="text-xl font-bold mb-4">Log In</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded" required />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" disabled={submitting} className="bg-black text-white py-2 rounded hover:opacity-90">
                        {submitting ? "Loading..." : "Sign in"}
                    </button>
                </form>

                <button className="text-gray-500 text-sm mt-4 underline" onClick={() => router.push("/register")}>
                    Do not have an account yet? Sign up
                </button>
            </div>
        </div>
    );
}