// app/(main)/layout.tsx

import { ReactNode } from "react";
import Header from "../header";
import Footer from "../footer";

export default function MainLayout({ children }: { children: ReactNode }) {

    // layout on /home

    console.log("MainLayout rendered");

    return <div className="min-h-screen bg-white text-gray-900">
        <Header />
        {children}
        <Footer />
    </div>
}
