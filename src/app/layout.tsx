import type { Metadata } from "next";
import type React from "react";

import { CookieConsent } from "@/components/CookieConsent";
import { brandName, siteUrl, storeDescription } from "@/lib/store-info";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brandName} | คอมพิวเตอร์มือสอง อุปกรณ์ไอที จัดสเปคคอม`,
    template: `%s | ${brandName}`,
  },
  description: storeDescription,
  keywords: [
    brandName,
    "ป๊อบ สโตร์ จำกัด",
    "คอมพิวเตอร์มือสอง",
    "คอมพิวเตอร์สภาพดี",
    "Notebook Business",
    "All in One",
    "อุปกรณ์ไอที",
    "จัดสเปคคอม",
    "รับประกัน 3 เดือน",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo/pop-store-final.jpg",
    shortcut: "/logo/pop-store-final.jpg",
    apple: "/logo/pop-store-final.jpg",
  },
  openGraph: {
    title: `${brandName} | คอมพิวเตอร์มือสองและอุปกรณ์ไอที`,
    description: storeDescription,
    url: siteUrl,
    siteName: brandName,
    images: [{ url: "/logo/pop-store-final.jpg", width: 800, height: 800 }],
    type: "website",
    locale: "th_TH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
