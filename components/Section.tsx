import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
    headline: string;
    subtext: string;
    imageSrc?: string;
    imageAlt?: string;
    orientation?: 'left' | 'right';
    hideImage?: boolean;
}

const Section: React.FC<SectionProps> = ({ headline, subtext, imageSrc, imageAlt, orientation = 'left', hideImage = false }) => {
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!imageRef.current) return;

        const xOffset = orientation === 'left' ? -200 : 200;

        gsap.from(imageRef.current, {
            scrollTrigger: {
                trigger: imageRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            opacity: 0,
            x: xOffset,
            duration: 1,
            ease: "power1.out",
        });
    }, { scope: imageRef });

    return (
        <section className="relative min-h-screen w-full flex flex-col md:block overflow-hidden z-20 ">
            {/* Image Container - Absolute on Desktop, Stacked on Mobile */}
            {!hideImage && (
                <div
                    ref={imageRef}
                    className={`
                        w-full h-[50vh] flex items-center justify-center md:absolute md:top-0 md:bottom-0 md:h-full md:w-[50vw] md:max-w-[1100px]
                        ${orientation === 'left' ? 'md:right-1/2' : 'md:left-1/2'}
                        z-0
                    `}
                >
                    <div className="relative w-full h-full md:h-[62vh]">
                        {imageSrc ? (
                            <Image
                                src={imageSrc}
                                alt={imageAlt || "Section Image"}
                                fill
                                className={`object-cover ${orientation === 'left' ? 'object-right' : 'object-left'}`}
                                unoptimized
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700 text-gray-500">
                                <span>Image Placeholder</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Content Container - Centered and Aligned */}
            <div className={`
                relative z-10 container mx-auto px-4 h-full flex flex-col justify-center min-h-[50vh] md:min-h-screen
                ${orientation === 'left' ? 'md:items-end' : 'md:items-start'}
            `}>
                <div className="w-full md:w-1/2 flex flex-col gap-6 text-center md:text-left p-8 md:p-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white font-heading">{headline}</h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">{subtext}</p>
                </div>
            </div>
        </section>
    );
};

export default Section;
