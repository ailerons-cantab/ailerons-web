"use client";

import { useAppContext } from "@/context/useAppContext.hook";
import { logout } from "@/lib/appwrite";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {

  const { setUser } = useAppContext();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.replace("/auth");
  };

  return <header className="flex justify-between items-center px-8 border-b-2 border-t-2 border-black h-10">
        <div className="flex items-center gap-2">
            <Image src="/ailerons_logo_black.svg" alt="ailerons logo" width={60} height={20}/>
            <p>ailerons</p>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="/features" className="hover:text-black transition-colors">Features</a>
            <a href="/pricing" className="hover:text-black transition-colors">Pricing</a>
            <a href="/about" className="hover:text-black transition-colors">About</a>
            <a href="/contact" className="hover:text-black transition-colors">Contact</a>
            <button onClick={handleLogout} className="px-4 py-1 bg-gray-600 text-white rounded hover:opacity-90 transition">Log out</button>
        </nav>
    </header>
}
