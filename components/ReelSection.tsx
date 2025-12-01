"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ReelSectionProps {
    id?: string;
}

const ReelSection: React.FC<ReelSectionProps> = ({ id }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftReelRef = useRef<HTMLDivElement>(null);
    const rightReelRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                    },
                });

                // Parallax animation for left reel (slower)
                tl.fromTo(
                    leftReelRef.current,
                    { y: "150%", rotation: -6 },
                    {
                        y: "-60%",
                        rotation: 5,
                        ease: "none",
                    },
                    0
                );

                // Parallax animation for right reel (faster)
                tl.fromTo(
                    rightReelRef.current,
                    { y: "40%", rotation: 6 },
                    {
                        y: "-10%",
                        rotation: -5,
                        ease: "none",
                    },
                    0
                );
            });
        },
        { scope: containerRef }
    );

    return (
        <section id={id} ref={containerRef} className="relative w-full h-auto md:h-[150vh] z-20">
            <div className="relative md:sticky md:top-0 min-h-screen md:h-screen w-full overflow-hidden flex flex-col md:block items-center justify-center py-20 md:py-0">

                {/* Content Container */}
                <div className="relative z-10 text-center max-w-md px-4 mb-12 md:mb-0 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                    <div className="w-fit mx-auto px-4 py-1 mb-6 border border-[#9653ED] rounded-full bg-[#9653ED26] text-[#ffffff] text-[20px] font-medium uppercase tracking-wide">
                        DMCA Safety
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-white">
                        Your content, protected
                    </h2>
                    <p className="text-xl text-gray-300">
                        Our automated DMCA takedown service scans the web 24/7. If your content is leaked, we submit and process the takedown on your behalf.
                    </p>
                </div>

                {/* Reels Wrapper - Flex row on mobile, contents on desktop to preserve absolute positioning context */}
                <div className="w-full flex flex-row justify-center gap-4 px-4 md:contents">
                    {/* Left Reel */}
                    <div
                        ref={leftReelRef}
                        className="relative md:absolute -left-[0%] md:left-[5%] lg:left-[15%] xl:left-[20%] top-auto md:top-[10%] w-1/2 md:w-[342px] h-auto aspect-[9/16] md:h-[608px] z-0 opacity-100 md:opacity-80"
                    >
                        <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
                            <video
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                src="/heroVideo.mp4"
                            />
                        </div>
                    </div>

                    {/* Right Reel */}
                    <div
                        ref={rightReelRef}
                        className="relative md:absolute -right-[0%] md:right-[5%] lg:right-[15%] xl:right-[20%] top-auto md:top-[30%] w-1/2 md:w-[342px] h-auto aspect-[9/16] md:h-[608px] z-0 opacity-100 md:opacity-80"
                    >
                        <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
                            <video
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                src="/heroVideo.mp4"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReelSection;
