"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[#ffffff1A]">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="flex items-center hover:opacity-80 transition-opacity"
                >
                    <Image
                        src="/logo.svg"
                        alt="Co-Splay Logo"
                        width={120}
                        height={40}
                        className="h-8 w-auto"
                    />
                </button>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <button
                        onClick={() => scrollToSection("monetize")}
                        className="text-gray-300 hover:text-[#9653ED] transition-colors font-medium"
                    >
                        Monetize
                    </button>
                    <button
                        onClick={() => scrollToSection("discovery")}
                        className="text-gray-300 hover:text-[#9653ED] transition-colors font-medium"
                    >
                        Discovery
                    </button>
                    <button
                        onClick={() => scrollToSection("protection")}
                        className="text-gray-300 hover:text-[#9653ED] transition-colors font-medium"
                    >
                        Protection
                    </button>
                </div>

                {/* CTA Button */}
                <button className="group flex items-center justify-between w-full max-w-[200px] px-3 py-2 bg-[#9653ED] text-white rounded-sm font-medium hover:opacity-90 transition-opacity text-base">
                    Join Waitlist
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
