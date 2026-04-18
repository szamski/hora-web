import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { Geist } from "next/font/google";
import { Nav } from "@/components/organisms/Nav";
import { Footer } from "@/components/organisms/Footer";
import { AmbientGlow } from "@/components/organisms/AmbientGlow";
import { PageTransition } from "@/components/molecules/PageTransition";
import { ScrollProgressBar } from "@/components/molecules/ScrollProgressBar";
import { SectionViewTracker } from "@/components/molecules/SectionViewTracker";
import { SmoothAnchorScroll } from "@/components/molecules/SmoothAnchorScroll";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const bumbbled = localFont({
  src: "../public/fonts/Bumbbled.otf",
  variable: "--font-bumbbled",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://horacal.app"),
  title: {
    default: "hora Calendar — Native macOS Google Calendar Client",
    template: "%s — hora Calendar",
  },
  description:
    "hora Calendar is a native macOS client for Google Calendar. Built with SwiftUI. No Electron. No CalDAV. Just fast.",
  applicationName: "hora Calendar",
  authors: [{ name: "Maciej Szamowski", url: "https://szamowski.dev" }],
  creator: "Maciej Szamowski",
  icons: {
    icon: "/assets/hora-icon.png",
    apple: "/assets/hora-icon.png",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/blog/feed.xml", title: "hora Calendar Blog" },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "hora Calendar",
    url: "https://horacal.app/",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@moto_szama",
    creator: "@moto_szama",
  },
  other: {
    llms: "/llms.txt",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const GA_MEASUREMENT_ID = "G-WQZ32S81FX";
const GOOGLE_ADS_ID = "AW-18070613857";
const PLAUSIBLE_SRC = "https://plausible.io/js/pa-K3DR1kRxwm1G-J9Q8KBme.js";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${bumbbled.variable}`}>
      <body className="min-h-dvh flex flex-col text-text">
        <Script
          id="gads-consent"
          strategy="beforeInteractive"
          data-cookieconsent="ignore"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'denied',
              personalization_storage: 'denied',
              security_storage: 'granted',
              wait_for_update: 500
            });
            gtag('set', 'ads_data_redaction', true);
            gtag('set', 'url_passthrough', true);
          `}
        </Script>

        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="93e42c2d-57e2-448f-9699-a65ce0fffdbd"
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />

        <AmbientGlow />
        <ScrollProgressBar />
        <SmoothAnchorScroll />
        <SectionViewTracker />
        <Nav />
        <div className="flex-1">
          <PageTransition>{children}</PageTransition>
        </div>
        <Footer />

        <Script src={PLAUSIBLE_SRC} strategy="afterInteractive" />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
        </Script>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gads-init" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
