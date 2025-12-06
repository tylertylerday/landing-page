import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./mesh.css";
import 'animate.css';
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const monsterFont = localFont({
  src: "../public/assets/fonts/monster-of-fantasy.otf",
  variable: "--font-monster",
});

// Get the base URL from environment variable or use a default
const metadataBase = process.env.NEXT_PUBLIC_SITE_URL 
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : process.env.VERCEL_URL
  ? new URL(`https://${process.env.VERCEL_URL}`)
  : new URL('https://co-splay.com'); // Fallback to production domain

export const metadata: Metadata = {
  metadataBase,
  title: "Co-Splay - The Premiere Cosplay Platform",
  description: "A social media and monetization platform for cosplayers and fans.",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/assets/favicons/light/favicon.ico',
        href: '/assets/favicons/light/favicon.ico',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/assets/favicons/dark/favicon.ico',
        href: '/assets/favicons/dark/favicon.ico',
      },
    ],
  },
  openGraph: {
    title: "Co-Splay: The Premiere Cosplay Platfrom",
    description: "A social media and monetization platform for cosplayers and fans.",
    type: "website",
    images: [
      {
        url: '/assets/opengraph/FacebookOpengraph.jpg',
        width: 1200,
        height: 630,
        alt: "Co-Splay - The Premiere Cosplay Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@co-splay",
    title: "Co-Splay: The Premiere Cosplay Platfrom",
    description: "A social media and monetization platform for cosplayers and fans.",
    images: ['/assets/opengraph/TwitterOpengraph.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${monsterFont.variable} antialiased mesh-background`}
      >
        <SmoothScroll />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-8H78YJSMXK" />
    </html>
  );
}