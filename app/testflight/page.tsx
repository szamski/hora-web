import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";

const title = "I’ve joined the TestFlight for a new calendar app on macOS";
const description =
  "hora Calendar — a native macOS Google Calendar client, built with SwiftUI. No Electron, no bloat. Currently in open beta.";

export const metadata: Metadata = {
  title: "Join the TestFlight — hora Calendar",
  description,
  alternates: { canonical: "/testflight/" },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: "https://horacal.app/testflight/",
    siteName: "hora Calendar",
    title,
    description,
    images: [
      {
        url: "/assets/social/testflight-share.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@moto_szama",
    creator: "@moto_szama",
    title,
    description,
    images: ["/assets/social/testflight-share.png"],
  },
};

export default function TestFlightPage() {
  return (
    <main className="relative mx-auto flex min-h-[calc(100svh-80px)] w-full max-w-page flex-col items-center justify-center gap-10 px-6 py-20 text-center md:gap-12 md:py-28">
      <div className="flex flex-col items-center gap-5 md:gap-7">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent-glow">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(255,56,60,0.7)]" />
          Someone invited you
        </span>
        <h1 className="max-w-3xl font-brand text-4xl font-normal leading-[1.08] tracking-tight text-text md:text-6xl">
          You’ve just been put on{" "}
          <span className="bg-linear-to-br from-accent to-accent-glow bg-clip-text text-transparent">
            hora Calendar
          </span>
          ’s radar.
        </h1>
        <p className="max-w-2xl text-balance text-lg leading-snug text-muted md:text-2xl">
          The Mac calendar Google never built. Fast, native, private — designed for people who find
          Apple Calendar too limited and everything else too much.
        </p>
      </div>

      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_40px_80px_-24px_rgba(255,56,60,0.28)]">
        <Image
          src="/assets/hero_image.webp"
          alt="hora Calendar week view"
          width={1600}
          height={900}
          priority
          sizes="(max-width: 768px) 100vw, 900px"
          className="h-auto w-full"
        />
      </div>

      <div className="flex flex-col items-center gap-3">
        <Button href="/#newsletter" size="lg">
          Join the waitlist →
        </Button>
        <Link
          href="/"
          className="text-sm text-muted underline-offset-4 hover:text-text hover:underline"
        >
          Or see what hora is about first
        </Link>
      </div>
    </main>
  );
}
