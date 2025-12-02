"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleNavigation = (id: string) => {
        // If we're on the home page, just scroll
        if (pathname === "/") {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            // Navigate to home page with hash
            router.push(`/#${id}`);
        }
    };

    const handleLogoClick = () => {
        if (pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            router.push("/");
        }
    };

    // Handle scrolling to hash on page load
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const id = hash.replace("#", "");
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        }
    }, [pathname]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[#ffffff1A]">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <button
                    onClick={handleLogoClick}
                    className="flex items-center hover:opacity-80 transition-opacity"
                >
                    <Image
                        src="/Logo.svg"
                        alt="Co-Splay Logo"
                        width={120}
                        height={40}
                        className="h-8 w-auto"
                    />
                </button>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <button
                        onClick={() => handleNavigation("monetize")}
                        className="text-gray-300 hover:text-[#9653ED] transition-colors font-medium"
                    >
                        Monetize
                    </button>
                    <button
                        onClick={() => handleNavigation("discovery")}
                        className="text-gray-300 hover:text-[#9653ED] transition-colors font-medium"
                    >
                        Discovery
                    </button>
                    <button
                        onClick={() => handleNavigation("protection")}
                        className="text-gray-300 hover:text-[#9653ED] transition-colors font-medium"
                    >
                        Protection
                    </button>
                </div>

                {/* CTA Button */}
                <Link href="/beta" className="group flex items-center justify-between w-full max-w-[200px] px-3 py-2 bg-[#9653ED] text-white rounded-sm font-medium hover:opacity-90 transition-opacity text-base">
                    Join Waitlist
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
