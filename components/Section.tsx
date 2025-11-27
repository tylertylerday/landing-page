import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
    headline: string;
    subtext: string;
    imageSrc: string;
    imageAlt: string;
    orientation?: 'left' | 'right';
}

const Section: React.FC<SectionProps> = ({ headline, subtext, imageSrc, imageAlt, orientation = 'left' }) => {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden z-20">
            <div className={`container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 ${orientation === 'right' ? 'md:flex-row-reverse' : ''}`}>

                {/* Image Container */}
                <div className="flex-1 w-full flex justify-center">
                    <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl">
                        <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                            {imageSrc ? (
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            ) : (
                                <span>Image Placeholder</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="flex-1 w-full flex flex-col gap-6 text-center md:text-left">
                    <h2 className="text-4xl font-bold text-black dark:text-white font-heading">{headline}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{subtext}</p>
                </div>

            </div>
        </section>
    );
};

export default Section;
