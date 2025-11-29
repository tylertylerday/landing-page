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
                    y: "-100%",
                    rotation: -5,
                    ease: "none",
                },
                0
            );
        },
        { scope: containerRef }
    );

    return (
        <section id={id} ref={containerRef} className="relative w-full h-[200vh] z-20">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Left Reel */}
                <div
                    ref={leftReelRef}
                    className="absolute left-[5%] top-[10%] w-[342px] h-[608px] z-0 opacity-80"
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
                    className="absolute right-[5%] top-[30%] w-[342px] h-[608px] z-0 opacity-80"
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

                {/* Content Container */}
                <div className="relative z-10 text-center max-w-2xl px-4">
                    <div className="w-fit mx-auto px-4 py-1 mb-6 border border-[#9653ED] rounded-full text-[#9653ED] text-[20px] font-medium uppercase tracking-wide">
                        Community
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 font-heading text-white">
                        Your content, protected
                    </h2>
                    <p className="text-xl text-gray-300">
                        We know theft is a huge issue. Our automated DMCA takedown service scans the web 24/7. If someone steals your content, we submit and process the takedown on your behalf.                    </p>
                </div>
            </div>
        </section>
    );
};

export default ReelSection;
