import Link from "next/link";
import { Logo } from "./logo";
import NewsletterForm from "./newsletter-form";

type FooterColumnLink = { label: string; href: string };

function FooterColumn({ title, links }: { title: string; links: FooterColumnLink[] }) {
    return (
        <div>
            <div className="text-sm font-semibold text-gray-900">{title}</div>
            <ul className="mt-4 space-y-3">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="text-sm text-gray-600 transition-colors hover:text-gray-900">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SocialIconLink({ href, label, children, }: { href: string; label: string; children: React.ReactNode }) {
    return <Link href={href} aria-label={label} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-gray-300 hover:text-gray-900">{children}</Link>
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8H4.5V23H.5V8ZM8.5 8H12.3V10.1h.05C12.9 9 14.3 7.8 16.6 7.8c4 0 4.7 2.6 4.7 6V23h-4V14.3c0-2.1 0-4.8-3-4.8s-3.4 2.3-3.4 4.7V23h-4V8Z" /></svg>
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}><path d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.2-6.7L5.2 22H2l7.4-8.5L1 2h6.9l4.7 6.1L18.9 2Zm-1.2 18h1.7L6.9 3.9H5.1L17.7 20Z" /></svg>
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 4.5A5.5 5.5 0 1 1 6.5 14 5.5 5.5 0 0 1 12 8.5Zm0 2A3.5 3.5 0 1 0 15.5 14 3.5 3.5 0 0 0 12 10.5ZM18 6.8a1.1 1.1 0 1 1-1.1 1.1A1.1 1.1 0 0 1 18 6.8Z" /></svg>
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}><path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6h1.5V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H7.9v3h2.6v8h3Z" /></svg>
}

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-6xl px-8 py-14">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    <div>
                        <Logo size="md" />
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-600">
                            Empowering travel agents to thrive in the digital age by connecting them with qualified travellers and
                            providing commission-free booking opportunities.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <SocialIconLink href="/linkedin" label="LinkedIn">
                                <LinkedInIcon />
                            </SocialIconLink>
                            <SocialIconLink href="/twitter" label="X (Twitter)">
                                <XIcon />
                            </SocialIconLink>
                            <SocialIconLink href="/instagram" label="Instagram">
                                <InstagramIcon />
                            </SocialIconLink>
                            <SocialIconLink href="/facebook" label="Facebook">
                                <FacebookIcon />
                            </SocialIconLink>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                        <FooterColumn
                            title="Product"
                            links={[{ label: "Features", href: "/home/features" }, { label: "Pricing", href: "/home/pricing" }, { label: "Case studies", href: "/home/case-studies" }, { label: "FAQ", href: "/home/faq" }]}
                        />

                        <FooterColumn
                            title="Resources"
                            links={[{ label: "Blog", href: "/home/blog" }, { label: "Help centre", href: "/home/help-centre" }, { label: "Webinars", href: "/home/webinars" }, { label: "Community", href: "/home/community" }]}
                        />

                        <FooterColumn
                            title="Company"
                            links={[{ label: "About us", href: "/home/about" }, { label: "Careers", href: "/home/careers" }, { label: "Contact", href: "/home/contact" }, { label: "Press", href: "/home/press" }]}
                        />
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200" />
                <div className="py-10">
                    <div className="text-sm font-semibold text-gray-900">Subscribe to our newsletter</div>
                    <div className="mt-2 text-sm text-gray-600">Get the latest updates and news delivered to your inbox</div>
                    <div className="mt-4"><NewsletterForm /></div>
                </div>
                <div className="border-t border-gray-200" />
                <div className="flex flex-col gap-3 py-6 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
                    <span>© {new Date().getFullYear()} Ailerons. All rights reserved</span>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy policy</Link>
                        <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms of service</Link>
                        <Link href="/cookies" className="hover:text-gray-900 transition-colors">Cookie policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}