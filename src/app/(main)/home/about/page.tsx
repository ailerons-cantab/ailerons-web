"use client";

import Image from "next/image";

export default function AboutUsPage() {

  return <div className="min-h-screen bg-white text-gray-900">
        <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-16 items-center">
            <div>
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p className="text-gray-700 mb-6">Info about About Us will be available soon. Stay tuned!</p>
                <button className="px-6 py-2 bg-black text-white rounded hover:opacity-90">Get started</button>
            </div>
            <div className="flex justify-center">
                <Image src="/airplane-placeholder.svg" alt="airplane" width={400} height={300} className="border rounded"/>
            </div>
        </main>
    </div>
}
