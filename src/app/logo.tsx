"use client";

import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/navigation";

type LogoSize = "sm" | "md" | "lg";

const SIZE_MAP: Record<LogoSize, { iconWidth: number; iconHeight: number; textSize: string }> = { sm: { iconWidth: 40, iconHeight: 14, textSize: "text-sm" }, md: { iconWidth: 60, iconHeight: 20, textSize: "text-base" }, lg: { iconWidth: 90, iconHeight: 30, textSize: "text-xl" } };

type LogoProps = { size?: LogoSize };

export function Logo({ size = "md" }: LogoProps) {
    const router = useRouter();
    const { iconWidth, iconHeight, textSize } = SIZE_MAP[size];

    return (
        <button type="button" onClick={() => router.push("/home")} className={clsx("flex items-center p-2 cursor-pointer bg-transparent border-0")} aria-label="Go to home">
            <Image src="/ailerons_logo_black.svg" alt="ailerons logo" width={iconWidth} height={iconHeight} priority />
            <span className={clsx("font-semibold tracking-tight lowercase", textSize)} style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif", color: 'black' }}>ailerons</span>
        </button>
    );
}