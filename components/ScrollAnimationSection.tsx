"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimationSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const deviceRef = useRef<HTMLDivElement>(null);
    const sharedContainerRef = useRef<HTMLDivElement>(null);

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

            // Initial shrink and position animation (Duration: 1 -> 0-100vh)
            tl.fromTo(
                deviceRef.current,
                { scale: 0.8, opacity: 0, y: 100 },
                { scale: 1.2, opacity: 1, y: 0, duration: 1, ease: "power2.out" }
            );

            tl.fromTo(
                videoRef.current,
                { scale: 1, y: 0 },
                { scale: 0.4, y: -20, duration: 1, ease: "power2.out" },
                "<"
            );

            tl.fromTo(
                videoContainerRef.current,
                { clipPath: "inset(0% 0% 0% 0%)", x: "0%", y: "0%" },
                { clipPath: "inset(5% 39.5% 7% 40%)", x: "24.7%", y: "-9.1", duration: 1, ease: "power2.out" },
                "<"
            );

            tl.fromTo(
                sharedContainerRef.current,
                { y: "45%" },
                { y: "0%", duration: 1, ease: "power2.out" },
                "<"
            );

            // Horizontal movement after initial animation (Duration: 1 -> 100-200vh)
            tl.to(
                sharedContainerRef.current,
                { x: "-55%", duration: 1, ease: "none" },
                ">"
            );
            // Fade out as the section scrolls out of view
            gsap.to(sharedContainerRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "bottom bottom",
                    end: "bottom 50%",
                    scrub: true,
                },
                opacity: 0,
                ease: "none",
            });
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className="relative w-full h-[300vh] z-10">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Shared container for video and device - sized to device dimensions */}
                <div ref={sharedContainerRef} className="relative w-[90%] max-w-[1400px] aspect-video">
                    {/* Video container */}
                    <div ref={videoContainerRef} className="absolute overflow-hidden inset-0 z-20 flex items-center justify-center">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover shadow-2xl"
                            autoPlay
                            muted
                            loop
                            playsInline
                            src="/heroVideo.mp4"
                        />
                    </div>

                    {/* Device frame */}
                    <div
                        ref={deviceRef}
                        className="absolute inset-0 z-10 pointer-events-none"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src="/newpost-ipad.webp"
                                alt="Device Frame"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScrollAnimationSection;
