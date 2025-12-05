"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleNavigation = (id: string) => {
        setIsOpen(false); // Close mobile menu if open
        // If we're on the home page, just scroll
        if (pathname === "/") {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        } else {
            // Navigate to home page with hash
            router.push(`/#${id}`);
        }
    };

    const handleLogoClick = () => {
        setIsOpen(false);
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
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
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

                {/* Desktop Navigation */}
                {/* <div className="hidden md:flex items-center gap-8">
                    <NavLinks handleNavigation={handleNavigation} />
                </div> */}

                {/* Desktop CTA Button */}
                <div className="hidden md:block">
                    <Link href="/beta" className="group flex items-center justify-between w-full max-w-[200px] gap-2 px-3 py-2 bg-[#9653ED] text-white rounded-sm font-medium hover:opacity-90 transition-opacity text-base">
                        Join Waitlist
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <button className="text-white p-2">
                                <Menu className="h-6 w-6" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-[#0A0A0A] border-l border-[#ffffff1A] w-[300px]">
                            <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                            <div className="flex flex-col p-8 gap-8 mt-8">
                                <div className="flex flex-col gap-4">
                                    <NavLinks mobile handleNavigation={handleNavigation} />
                                </div>
                                <Link
                                    href="/beta"
                                    onClick={() => setIsOpen(false)}
                                    className="group flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#9653ED] text-white rounded-sm font-medium hover:opacity-90 transition-opacity text-base"
                                >
                                    Join Waitlist
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};

const NavLinks = ({
    mobile = false,
    handleNavigation
}: {
    mobile?: boolean;
    handleNavigation: (id: string) => void;
}) => (
    <>
        <button
            onClick={() => handleNavigation("discovery")}
            className={`text-gray-300 hover:text-[#9653ED] transition-colors font-medium ${mobile ? "text-lg py-2" : ""}`}
        >
            Discovery
        </button>
        <button
            onClick={() => handleNavigation("monetize")}
            className={`text-gray-300 hover:text-[#9653ED] transition-colors font-medium ${mobile ? "text-lg py-2" : ""}`}
        >
            Monetize
        </button>
        <button
            onClick={() => handleNavigation("protection")}
            className={`text-gray-300 hover:text-[#9653ED] transition-colors font-medium ${mobile ? "text-lg py-2" : ""}`}
        >
            Protection
        </button>
        <button
            onClick={() => handleNavigation("creator-tools")}
            className={`text-gray-300 hover:text-[#9653ED] transition-colors font-medium ${mobile ? "text-lg py-2" : ""}`}
        >
            Creator Tools
        </button>
        <button
            onClick={() => handleNavigation("faq")}
            className={`text-gray-300 hover:text-[#9653ED] transition-colors font-medium ${mobile ? "text-lg py-2" : ""}`}
        >
            FAQ
        </button>
    </>
);

export default Navbar;
