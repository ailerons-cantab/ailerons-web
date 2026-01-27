"use client";

import { useState } from "react";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");

    return (
        <form className="flex w-full max-w-md" onSubmit={(e) => { e.preventDefault(); console.log("newsletter_email_submit:", email) }}>
            <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                    const v = e.target.value;
                    setEmail(v);
                    console.log("newsletter_email_change:", v);
                }}
                placeholder="Your email address"
                className="h-9 w-full rounded-l border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900"
            />
            <button type="submit" className="h-9 whitespace-nowrap rounded-r bg-slate-900 text-white rounded-md px-4 text-sm font-medium text-white transition-opacity hover:opacity-90">Subscribe</button>
        </form>
    );
}