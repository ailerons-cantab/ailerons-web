"use client";

import Image from "next/image";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <section className="border-b-2 border-gray-200">
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-8 py-14 md:grid-cols-2">
                    <div>
                        <h1 className="text-4xl font-bold leading-tight">Let’s connect – Your<br />journey with Ailerons<br />starts here</h1>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-700">
                            Are you ready to transform your travel agency business? Join the Ailerons platform to access travel
                            requests, submit offers and win more business. It’s easy to use and built to keep travel agencies
                            competitive in a digital-first world.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <button className="rounded-sm bg-black px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90">Send message</button>
                            <button className="rounded-sm border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-900 transition-colors hover:border-gray-400">Schedule a call</button>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <div className="w-full max-w-xl border border-gray-300 bg-white p-6">
                            <Image src="/telephone-pylon.png" alt="telephone pylon" width={720} height={480} className="h-auto w-full object-contain" priority />
                        </div>
                    </div>
                </div>
            </section>
            <section className="border-b-2 border-gray-200">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-8 py-14 md:grid-cols-2">
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900">Contact information</h2>
                        <div className="mt-6 space-y-5 text-sm text-gray-700">
                            <div className="flex gap-3">
                                <span className="w-5 text-center">📍</span>
                                <div>
                                    <div className="font-medium text-gray-900">Our office</div>
                                    <div>Port View</div>
                                    <div>One Port Way</div>
                                    <div>Port Solent</div>
                                    <div>PO6 4TY</div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <span className="w-5 text-center">📞</span>
                                <div>
                                    <div className="font-medium text-gray-900">Telephone</div>
                                    <div>+44 7 156 455 888</div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <span className="w-5 text-center">✉️</span>
                                <div>
                                    <div className="font-medium text-gray-900">Email</div>
                                    <div>hello@ailerons.co.uk</div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <span className="w-5 text-center">📅</span>
                                <div>
                                    <div className="font-medium text-gray-900">Meeting</div>
                                    <div>Book a video call</div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <span className="w-5 text-center">💬</span>
                                <div>
                                    <div className="font-medium text-gray-900">Whatsapp</div>
                                    <div>Start a Whatsapp chat</div>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="text-xs font-semibold text-gray-900">Connect with us</div>
                                <div className="mt-3 flex items-center gap-3">
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200">in</span>
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200">x</span>
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200">⌁</span>
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200">f</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-300 bg-white p-6">
                        <h3 className="text-sm font-semibold text-gray-900">Send us a message</h3>
                        <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); console.log("contact_submit"); }}>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-xs text-gray-600">First name</label>
                                    <input className="mt-1 h-9 w-full rounded border border-gray-300 px-3 text-sm outline-none focus:border-gray-900" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-600">Last name</label>
                                    <input className="mt-1 h-9 w-full rounded border border-gray-300 px-3 text-sm outline-none focus:border-gray-900" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-600">Email address</label>
                                <input type="email" className="mt-1 h-9 w-full rounded border border-gray-300 px-3 text-sm outline-none focus:border-gray-900" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-600">Phone number (optional)</label>
                                <input className="mt-1 h-9 w-full rounded border border-gray-300 px-3 text-sm outline-none focus:border-gray-900" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-600">Subject</label>
                                <select className="mt-1 h-9 w-full rounded border border-gray-300 px-3 text-sm text-gray-700 outline-none focus:border-gray-900">
                                    <option value="">Please select</option>
                                    <option>Product</option>
                                    <option>Support</option>
                                    <option>Partnership</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-gray-600">Message</label>
                                <textarea className="mt-1 min-h-[110px] w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900" />
                            </div>
                            <div className="flex justify-end">
                                <button className="rounded-sm bg-gray-700 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-gray-800">Send message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <section>
                <div className="mx-auto max-w-6xl px-8 py-14">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-900">Frequently asked questions</h2>
                        <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600">
                            Find answers to common questions about Ailerons for travel agents. If you can’t find what you need, call
                            our team who want to help.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {[
                            {
                                q: "How much does it cost to use Ailerons?",
                                a: "Early access is free for a limited time. After the introductory period, travel agents will be offered flexible licensing plans. We don’t charge any commission on your bookings.",
                            },
                            {
                                q: "How do I respond to travel requests?",
                                a: "Once you register and log in, you can view the live database of traveller requests. Simply click on a request, review the details and submit your proposal directly through the platform.",
                            },
                            {
                                q: "What types of trips can I offer?",
                                a: "You can offer a wide range of trips – from family holidays and luxury escapes to adventure tours and city breaks. Ailerons is designed to support many travel specialisations and itineraries.",
                            },
                            {
                                q: "How will travellers choose their offers?",
                                a: "Travellers review all proposals. They’ll see the full itinerary, pricing, and any extras you include. Competitive pricing, creativity, and clear communication will help you win more bookings.",
                            },
                        ].map((item) => (
                            <div key={item.q} className="rounded-lg border border-gray-300 bg-white p-6">
                                <div className="text-sm font-semibold text-gray-900">{item.q}</div>
                                <div className="mt-2 text-sm leading-relaxed text-gray-600">{item.a}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 flex justify-center">
                        <a href="/home/faq" className="text-sm text-gray-700 transition-colors hover:text-gray-900">View all FAQs →</a>
                    </div>
                </div>
            </section>
        </div>
    );
}