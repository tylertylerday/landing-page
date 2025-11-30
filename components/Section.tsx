import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
    headline: string;
    subtext: string;
    id?: string;
    tag?: string;
    imageSrc?: string;
    mobileImageSrc?: string;
    imageAlt?: string;
    orientation?: 'left' | 'right';
    hideImage?: boolean;
}

const Section: React.FC<SectionProps> = ({ headline, subtext, id, tag, imageSrc, mobileImageSrc, imageAlt, orientation = 'left', hideImage = false }) => {
    const imageRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Image Animation - different for mobile vs desktop
        if (imageRef.current) {
            const isMobile = window.matchMedia('(max-width: 768px)').matches;

            if (isMobile) {
                // Mobile: simple fade-in
                gsap.from(imageRef.current, {
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                    opacity: 0,
                    duration: 1,
                    ease: "power1.out",
                });
            } else {
                // Desktop: fade-in with slide
                const xOffset = orientation === 'left' ? -200 : 200;

                gsap.from(imageRef.current, {
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                    opacity: 1,
                    x: xOffset,
                    duration: 2,
                    ease: "power1.out",
                });
            }
        }

        // Text Content Animation
        if (textRef.current) {
            gsap.from(textRef.current.children, {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0,
                ease: "power3.out",
            });
        }

        // Fade out content as section scrolls out
        if (contentRef.current) {
            gsap.to(contentRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "bottom bottom",
                    end: "bottom 30%",
                    scrub: true,
                },
                opacity: 0,
                ease: "none",
            });
        }
    }, { scope: sectionRef });

    return (
        <section id={id} ref={sectionRef} className="relative overflow-visible h-[70vh] w-full flex flex-col md:block z-20 ">
            {/* Image Container - Absolute on Desktop, Stacked on Mobile */}
            {!hideImage && (
                <div
                    ref={imageRef}
                    className={`
                        flex items-center justify-center h-[50vh] md:h-auto md:absolute md:top-0 md:bottom-0 md:h-full md:w-[50vw]
                        ${orientation === 'left' ? 'md:right-1/2' : 'md:left-1/2'}
                        z-0
                    `}
                >
                    <div className="relative w-full h-full rounded-xl md:h-[62vh]">
                        {imageSrc ? (
                            <>
                                {/* Mobile Image */}
                                <div className="block md:hidden w-full h-full relative">
                                    <Image
                                        src={mobileImageSrc || imageSrc}
                                        alt={imageAlt || "Section Image"}
                                        fill
                                        className="object-cover rounded-xl"
                                        unoptimized
                                    />
                                </div>
                                {/* Desktop Image */}
                                <div className="hidden md:block w-full h-full relative">
                                    <Image
                                        src={imageSrc}
                                        alt={imageAlt || "Section Image"}
                                        fill
                                        className={`object-cover rounded-xl min-[2000px]:object-contain ${orientation === 'left' ? 'object-right' : 'object-left'}`}
                                        unoptimized
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-500">
                                <span>Image Placeholder</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Content Container - Centered and Aligned */}
            <div ref={contentRef} className={`
                relative z-10 container mx-auto px-4 h-full flex flex-col justify-center min-h-[50vh]
                ${orientation === 'left' ? 'md:items-end' : 'md:items-start'}
            `}>
                <div ref={textRef} className="w-full md:w-1/2 flex flex-col gap-6 text-center md:text-left p-8 md:p-16">
                    {tag && (
                        <div className={`
                            w-fit px-4 py-1 mb-2
                            border border-[#9653ED] rounded-full
                            text-[#9653ED] text-gray-300 text-[20px] font-medium uppercase tracking-wide
                            ${orientation === 'left' ? 'mx-auto md:mx-0' : 'mx-auto md:mx-0'}
                        `}>
                            {tag}
                        </div>
                    )}
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-heading">{headline}</h2>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">{subtext}</p>
                </div>
            </div>
        </section>
    );
};

export default Section;
