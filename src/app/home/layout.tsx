import Header from "../header";
import Footer from "../footer";

export default function HomeLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}