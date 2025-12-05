import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-[#2D1947] py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8 mb-16">
                    {/* Left Column */}
                    <div className="flex flex-col items-start gap-6 max-w-sm">
                        <Link href="/" className="hover:opacity-80 transition-opacity">
                            <Image
                                src="/Logo.svg"
                                alt="Co-Splay Logo"
                                width={120}
                                height={40}
                                className="h-10 w-auto"
                            />
                        </Link>
                        <p className="text-[#E3E3E3] text-xl font-medium">
                            Turn your hobby into a career
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="p-2 bg-[#4F376F] rounded-full text-white hover:bg-[#9653ED] transition-colors">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-[#4F376F] rounded-full text-white hover:bg-[#9653ED] transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-[#4F376F] rounded-full text-white hover:bg-[#9653ED] transition-colors">
                                <Facebook className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col items-start gap-6">
                        <h4 className="text-white font-bold text-lg uppercase tracking-wider">
                            Get in touch
                        </h4>
                        <div className="flex flex-col gap-4 text-[#E3E3E3]">
                            <Link href="mailto:contact@co-splay.com" className="hover:text-[#9653ED] transition-colors">
                                contact@co-splay.com
                            </Link>
                            <span className="text-gray-100">
                                Phone: <Link href="tel:+4078080938" className="hover:text-[#9653ED] transition-colors">(407) 808-0938</Link>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Divider and Copyright */}
                <div className="border-t border-[#ffffff1A] pt-8 text-start text-sm text-gray-200">
                    &copy; {new Date().getFullYear()} Co-Splay. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
