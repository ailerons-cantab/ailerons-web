// app/(main)/layout.tsx

import { ReactNode } from "react";
import Header from "../header";

export default function MainLayout({ children }: { children: ReactNode }) {

    return <div className="min-h-screen bg-white text-gray-900">
        <Header />
        {children}
    </div>
}
