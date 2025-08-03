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

  return <header className="flex justify-between items-center px-8 py-2 border-b border-t border-black h-14">
        <div className="flex items-center gap-2">
            <Image src="/ailerons_logo_white.svg" alt="ailerons logo" width={120} height={40}/>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-black transition-colors">Features</a>
            <a href="#" className="hover:text-black transition-colors">Pricing</a>
            <a href="#" className="hover:text-black transition-colors">About</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
            <button onClick={handleLogout} className="px-4 py-1 bg-black text-white rounded hover:opacity-90 transition">Log out</button>
        </nav>
    </header>
}
