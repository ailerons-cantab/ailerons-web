"use client";
import Footer from "./footer";
import Header from "./header";
import HomePage from "./home/page";


export default function Page() {

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Header />
            <HomePage />
            <Footer />
        </div>
    );
}