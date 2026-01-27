import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/useAppContext.hook";
import AppShell from "./AppShell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "Ailerons",
        template: "%s | Ailerons",
    },
    description:
        "Ailerons connects travellers with professional travel agents. Receive trip requests, submit personalised offers, and grow your travel business.",
    applicationName: "Ailerons",
    openGraph: {
        title: "Ailerons",
        description:
            "Ailerons connects travellers with professional travel agents. Receive trip requests, submit personalised offers, and grow your travel business.",
        siteName: "Ailerons",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ailerons",
        description:
            "Ailerons connects travellers with professional travel agents. Receive trip requests, submit personalised offers, and grow your travel business.",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                {/* Runs BEFORE first paint */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `document.documentElement.classList.add('preload');`,
                    }}
                />
                <style>{`
          /* Hide app until we remove .preload */
          html.preload #app-root { visibility: hidden; }

          /* Show boot loader until we remove .preload */
          #boot-loader { display: none; }
          html.preload #boot-loader {
            display: flex;
            position: fixed;
            inset: 0;
            z-index: 999999;
            align-items: center;
            justify-content: center;
            background: white;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
            </head>

            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {/* Server-rendered loader (prevents header/footer flash) */}
                <div id="boot-loader">
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            border: "4px solid #e5e7eb",
                            borderTopColor: "#000",
                            animation: "spin 0.8s linear infinite",
                        }}
                    />
                </div>

                {/* Real app */}
                <div id="app-root">
                    <AppContextProvider>
                        <AppShell>{children}</AppShell>
                    </AppContextProvider>
                </div>
            </body>
        </html>
    );
}