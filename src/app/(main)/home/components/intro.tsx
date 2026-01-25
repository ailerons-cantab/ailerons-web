"use client";

import Image from "next/image";

export default function Intro() {

    return (
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-16 items-center">
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
                <Image src="/airplane-placeholder.png" alt="airplane" width={400} height={300} className="border rounded" />
            </div>
        </section>
    );
}