/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createUser, logout, normaliseUserFromAccount, signIn } from "@/lib/appwrite";
import { useAppContext } from "@/context/useAppContext.hook";

export default function AuthPage() {
  const { setUser } = useAppContext();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      const acc = isLogin ? await signIn(email, password) : await createUser(email, password, firstName, lastName);
      const user = normaliseUserFromAccount(acc);
      setUser(user)
      router.replace("/home");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h1 className="text-xl font-bold mb-4">{isLogin ? "Sign In" : "Sign Up"}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {!isLogin && (
            <>
              <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border p-2 rounded" required />
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="border p-2 rounded" required />
            </>
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded" required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={submitting} className="bg-black text-white py-2 rounded hover:opacity-90">
            {submitting ? "Loading..." : isLogin ? "Sign in" : "Sign up"}
          </button>
        </form>

        <button className="text-gray-500 text-sm mt-4 underline" onClick={() => setIsLogin((prev) => !prev)}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}