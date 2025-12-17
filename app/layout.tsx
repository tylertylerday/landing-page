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
  title: "Co-Splay — Where Cosplay Creators Connect, Share, and Earn",
  description: "A social media and monetization platform for cosplayers and fans.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  other: {
    'google-site-verification': 'fMIdzb1X70sfBI2EMlOXs15tAJ6Y3h_v5rbCWoBkAAM',
    'msapplication-TileColor': '#ffffff',
    'msapplication-TileImage': '/ms-icon-144x144.png',
  },
  openGraph: {
    title: "Co-Splay — Where Cosplay Creators Connect, Share, and Earn",
    description: "A social media and monetization platform for cosplayers and fans.",
    type: "website",
    images: [
      {
        url: '/assets/opengraph/FacebookOpengraph.jpg',
        width: 1200,
        height: 630,
        alt: "Co-Splay — Where Cosplay Creators Connect, Share, and Earn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@co-splay",
    title: "Co-Splay — Where Cosplay Creators Connect, Share, and Earn",
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