import { ReactNode } from "react";
import Footer from "../footer";

export default function MainLayout({ children }: { children: ReactNode }) {

    return <div className="min-h-screen bg-white text-gray-900">
        {children}
        <Footer />
    </div>
}
