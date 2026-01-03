import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div>
                        <div className="font-semibold text-lg">ailerons</div>
                        <p className="text-gray-600 text-sm mt-3 leading-relaxed">Empowering travel agents to grow through commission-free bookings and qualified travel leads.</p>
                        <div className="flex gap-3 mt-4 text-sm text-gray-600">
                            <span>LinkedIn</span>
                            <span>Twitter</span>
                            <span>Instagram</span>
                        </div>
                    </div>

                    <FooterColumn title="Product" links={["Features", "Pricing", "Case studies", "FAQ"]} />
                    <FooterColumn title="Resources" links={["Blog", "Help centre", "Webinars", "Community"]} />
                    <FooterColumn title="Company" links={["About", "Careers", "Contact", "Press"]} />
                </div>
                <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col sm:flex-row gap-3 justify-between text-sm text-gray-600">
                    <span>© {new Date().getFullYear()} Ailerons. All rights reserved.</span>
                    <div className="flex gap-4">
                        <Link href="/privacy">Privacy</Link>
                        <Link href="/terms">Terms</Link>
                        <Link href="/cookies">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
    return (
        <div>
            <div className="font-semibold text-sm mb-3">{title}</div>
            <ul className="space-y-2">
                {links.map((link) => (
                    <li key={link}>
                        <Link
                            href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-gray-600 hover:text-gray-900 text-sm"
                        >
                            {link}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}