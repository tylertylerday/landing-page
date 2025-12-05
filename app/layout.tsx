import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./mesh.css";
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

export const metadata: Metadata = {
  title: "Co-Splay",
  description: "A social media platform by cosplayers for cosplayers",
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
