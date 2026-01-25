"use client";

import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Hero */}
            <section className="border-b border-gray-200">
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-8 py-16 md:grid-cols-2">
                    <div>
                        <h1 className="text-4xl font-bold leading-tight">
                            Connect with travel
                            <br />
                            seekers using Ailerons.
                        </h1>

                        <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-700">
                            Browse a wide range of real travel requests and connect directly
                            with travellers eager to plan their perfect trip. Create tailored
                            itineraries, highlight your expertise, and turn interest into
                            confirmed bookings.
                        </p>

                        <div className="mt-6">
                            <button className="rounded-sm bg-black px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90">
                                Get started
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <div className="w-full max-w-xl border border-gray-300 bg-white p-6">
                            <Image
                                src="/handshake.png"
                                alt="handshake"
                                width={720}
                                height={480}
                                className="h-auto w-full object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Journey */}
            <section>
                <div className="mx-auto max-w-6xl px-8 py-16">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Your journey starts</h2>
                        <h2 className="text-3xl font-bold">here</h2>
                    </div>

                    <div className="mt-16 flex flex-col items-center gap-14">
                        <JourneyStep
                            icon="📝"
                            title="Travel request creation"
                            description="Travellers submit their ideal holiday requirements through our intuitive platform."
                        />

                        <Arrow />

                        <JourneyStep
                            icon="🔍"
                            title="Browse travel requests"
                            description="Travel agents access our database of travel requests from registered users looking for tailored offers."
                        />

                        <Arrow />

                        <JourneyStep
                            icon="📋"
                            title="Create custom travel offers"
                            description="Travel agents design personalised travel itineraries that match travellers’ requirements."
                        />

                        <Arrow />

                        <JourneyStep
                            icon="✈️"
                            title="Submit direct proposals"
                            description="Send personalised proposals directly to travellers through the platform."
                        />

                        <Arrow />

                        <JourneyStep
                            icon="🌍"
                            title="Direct booking"
                            description="Customers start their trip after finalising bookings via telephone or through online links."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

/* ---------- helpers ---------- */

function JourneyStep({
    icon,
    title,
    description,
}: {
    icon: string;
    title: string;
    description: string;
}) {
    return (
        <div className="flex max-w-sm flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300 text-xl">
                {icon}
            </div>
            <div className="mt-4 text-sm font-semibold text-gray-900">
                {title}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {description}
            </p>
        </div>
    );
}

function Arrow() {
    return (
        <div className="text-gray-400 text-lg leading-none">↓</div>
    );
}