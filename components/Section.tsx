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
    className?: string;
}

const Section: React.FC<SectionProps> = ({ headline, subtext, id, tag, imageSrc, mobileImageSrc, imageAlt, orientation = 'left', hideImage = false, className = '' }) => {
    const imageRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);


    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Mobile animations (simple fade-in, no reverse)
        mm.add("(max-width: 768px)", () => {
            // Image fade-in
            if (imageRef.current) {
                gsap.from(imageRef.current, {
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                });
            }

            // Text fade-in
            if (textRef.current) {
                gsap.from(textRef.current.children, {
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                });
            }
        });

        // Desktop animations (complex with slide and reverse)
        mm.add("(min-width: 769px)", () => {
            // Image Animation with slide
            if (imageRef.current) {
                const xOffset = orientation === 'left' ? -200 : 200;

                gsap.from(imageRef.current, {
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                    opacity: 0,
                    delay: .25,
                    x: xOffset,
                    duration: 1.5,
                    ease: "power2.inOut",
                });
            }

            // Text Content Animation
            if (textRef.current) {
                gsap.from(textRef.current.children, {
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "center 85%",
                        toggleActions: "play none none reverse",
                    },
                    y: 60,
                    opacity: 0,
                    duration: .75,
                    stagger: 0,
                    ease: "power2.inOut",
                });
            }

            // Fade out content as section scrolls out
            if (contentRef.current) {
                gsap.to(contentRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "5% 5%",
                        toggleActions: "play none none reverse",
                        scrub: true,
                    },
                    y: 0,
                    opacity: 0,
                    ease: "power3.out",
                });
            }
        });
    }, { scope: sectionRef });

    return (
        <section id={id} ref={sectionRef} className={`relative overflow-visible h-auto md:h-[70vh] w-full flex flex-col md:block z-20 ${className}`}>
            {/* Image Container - Absolute on Desktop, Stacked on Mobile */}
            {!hideImage && (
                <div
                    ref={imageRef}
                    className={`
                        flex items-center justify-center h-[50vh] px-4 md:px-0 md:absolute md:top-0 md:bottom-0 md:h-full md:w-[50vw]
                        ${orientation === 'left' ? 'md:right-1/2' : 'md:left-1/2'}
                        z-0 will-change-transform will-[opacity]
                    `}
                >
                    <div className="relative w-full max-w-full h-full rounded-xl md:h-[62vh]">
                        {imageSrc ? (
                            <>
                                {/* Mobile Image */}
                                <div className="block md:hidden w-full h-full relative">
                                    <Image
                                        src={mobileImageSrc || imageSrc}
                                        alt={imageAlt || "Section Image"}
                                        fill
                                        className="object-contain rounded-xl"
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
                ${orientation === 'left' ? 'md:items-end' : 'md:items-start'} will-[opacity]
            `}>
                <div ref={textRef} className="w-full md:w-1/2 flex flex-col gap-6 text-center md:text-left p-8 md:p-16">
                    {tag && (
                        <div className={`
                            w-fit px-4 py-1 mb-2
                            border border-[#9653ED] rounded-full bg-[#9653ED26]
                            text-[#ffffff] text-[20px] font-medium uppercase tracking-wide
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
