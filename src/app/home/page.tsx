"use client";

import { useAppContext } from "@/context/useAppContext.hook";
import { logout } from "@/lib/appwrite";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {

  const { loading, user, setUser } = useAppContext();
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.replace("/auth");
  };


  useEffect(() => {
    if (!user && !loading) {
      router.replace("/auth");
    }
    setAuthLoading(false);
  }, [user, loading, router]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Checking session...</p>
      </div>
    );
  } 

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 border-b">
        <div className="flex items-center gap-2">
          <Image
            src="/ailerons_logo_white.svg"
            alt="ailerons logo"
            width={120}
            height={40}
          />
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a href="#" className="hover:underline">
            Features
          </a>
          <a href="#" className="hover:underline">
            Pricing
          </a>
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
          <button onClick={async () => await handleLogout()} className="px-4 py-1 border rounded hover:bg-gray-100">
            Log out
          </button>
          <button className="px-4 py-1 bg-black text-white rounded hover:opacity-90">
            Sign up
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-16 items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">
            Connect with travellers and grow your travel agency
          </h1>
          <p className="text-gray-700 mb-6">
            Join a growing community of travel agents winning new clients
            through ailerons. Submit competitive offers commission-free and
            expand your business in the digital age.
          </p>
          <button className="px-6 py-2 bg-black text-white rounded hover:opacity-90">
            Get started
          </button>
        </div>
        <div className="flex justify-center">
          <Image
            src="/airplane-placeholder.svg"
            alt="airplane"
            width={400}
            height={300}
            className="border rounded"
          />
        </div>
      </main>
    </div>
  );
}