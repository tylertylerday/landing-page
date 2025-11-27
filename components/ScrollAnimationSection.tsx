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

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "center top",
                    scrub: 1,
                },
            });

            tl.fromTo(
                deviceRef.current,
                { scale: 0.8, opacity: 0, y: 100 },
                { scale: 1.2, opacity: 1, y: 0, duration: 1, ease: "power2.out" }
            );

            tl.fromTo(
                videoRef.current,
                { scale: 1.2, y: 0, borderRadius: "0px" },
                { scale: 0.4, y: -20, borderRadius: "20px", duration: 1, ease: "power2.out" },
                "<"
            );

            // Animate the vertical mask/crop and position
            tl.fromTo(
                videoContainerRef.current,
                { clipPath: "inset(0% 0% 0% 0%)", x: "0%", y: "0%" },
                { clipPath: "inset(5% 39.5% 5% 40%)", x: "25%", y: "0", duration: 1, ease: "power2.out" },
                "<"
            );
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className="relative w-full h-[200vh] z-10">
            <div className="sticky top-0 h-screen w-full flex items-end pb-[20vh] justify-center overflow-hidden">
                {/* Shared container for video and device - sized to device dimensions */}
                <div className="relative w-[90%] max-w-[1000px] aspect-video">
                    {/* Video container */}
                    <div ref={videoContainerRef} className="absolute inset-0 z-20 flex items-center justify-center">
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
                                src="/deviceScreen-1.png"
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
