"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/appwrite";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUser();
        console.log("Current user:", user);
        router.replace(user ? "/home" : "/auth");
      } catch {
        router.replace("/auth");
      }
    })();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500">Checking session...</p>
    </div>
  );
}