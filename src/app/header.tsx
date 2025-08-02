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

  return <header className="flex justify-between items-center px-8 py-4 border-b">
        <div className="flex items-center gap-2">
            <Image src="/ailerons_logo_white.svg" alt="ailerons logo" width={120} height={40}/>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium">
            <a href="#" className="hover:underline">Features</a>
            <a href="#" className="hover:underline">Pricing</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Contact</a>
            <button onClick={async () => await handleLogout()} className="px-4 py-1 border rounded hover:bg-gray-100"> Log out</button>
            <button className="px-4 py-1 bg-black text-white rounded hover:opacity-90"> Sign up</button>
        </nav>
    </header>
}