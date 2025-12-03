"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimationSectionReel = () => {
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
                { scale: 1.7, opacity: 1, y: 0, duration: 1, ease: "power2.out" }
            );

            // tl.fromTo(
            //     videoRef.current,
            //     { scale: 1, y: 0 },
            //     { scale: 0.4, y: 0, duration: 1, ease: "power2.out" },
            //     "<"
            // );

            tl.fromTo(
                videoContainerRef.current,
                { scale: 1, x: "0%", y: "0%" },
                { scale: 0.609, x: "11.55%", y: "0.999%", duration: 1, ease: "power2.out" },
                "<"
            );

            tl.fromTo(
                sharedContainerRef.current,
                { y: "55%" },
                { y: "0%", duration: 1, ease: "power2.out" },
                "<"
            );

            // Horizontal movement after initial animation (Duration: 1 -> 100-200vh)
            // Only apply on desktop (md and up)
            const mm = gsap.matchMedia();
            mm.add("(min-width: 768px)", () => {
                tl.to(
                    sharedContainerRef.current,
                    { x: "-95%", duration: 1, ease: "none" },
                    ">"
                );
            });

            // On mobile, fade out after initial animation
            mm.add("(max-width: 767px)", () => {
                tl.to(
                    sharedContainerRef.current,
                    { opacity: 0, duration: 1, ease: "power2.out" },
                    ">"
                );
            });

            // Fade out as the section scrolls out of view (desktop only)
            mm.add("(min-width: 768px)", () => {
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
            });
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className="relative w-full h-[270vh] z-10">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Shared container for video and device - sized to device dimensions */}
                <div ref={sharedContainerRef} className="relative h-[min(60vh,85vw*1.78)] md:h-[min(80vh,90vw*1.78)] aspect-vert">
                    {/* Video container */}
                    <div ref={videoContainerRef} className="absolute overflow-hidden rounded-4xl inset-0 z-20 flex items-center justify-center">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover shadow-2xl"
                            autoPlay
                            muted
                            loop
                            playsInline
                            src="/girls.mp4"
                        />

                        {/* UI Overlay Elements */}
                        <div className="absolute inset-0 pointer-events-none">
                            {/* Lower Left: Avatar + Name + Follow Button */}
                            <div className="absolute bottom-6 md:bottom-12 left-2 md:left-6 flex flex-col gap-1 md:gap-3 pointer-events-auto">
                                <div className="flex items-center gap-2 md:gap-3">
                                    {/* Avatar */}
                                    <div className="w-6 h-6 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-pink-400 shadow-lg relative">
                                        <Image
                                            src="/ella_frost_avatar.webp"
                                            alt="Ella Frost"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Name */}
                                    <span className="text-white font-semibold text-sm md:text-2xl drop-shadow-lg">
                                        Ella Frost
                                    </span>

                                    {/* Follow Button */}
                                    <button className="px-1 py-.5 md:px-4 md:py-1.5 text-white border-2 font-semibold text-xs md:text-sm rounded-full hover:bg-gray-100 transition-colors shadow-md">
                                        Follow
                                    </button>
                                </div>

                                {/* Caption */}
                                <p className="text-white text-xs md:text-xl drop-shadow-lg max-w-[280px] line-clamp-1">
                                    Feeling magical with my girls 🪄
                                </p>
                            </div>

                            {/* Lower Right: Vertical Action Buttons */}
                            <div className="absolute bottom-6 md:bottom-16 right-2 md:right-6 flex flex-col gap-3 md:gap-6 pointer-events-auto">
                                {/* Heart/Like Button */}
                                <div className="flex flex-col items-center gap-1">
                                    <button className="w-6 h-6 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                                        <svg className="w-4 h-4 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    </button>
                                    <span className="text-white text-xs md:text-xs font-semibold drop-shadow-lg">12.5K</span>
                                </div>

                                {/* Comment Button */}
                                <div className="flex flex-col items-center gap-1">
                                    <button className="w-6 h-6 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                                        <svg className="w-4 h-4 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </button>
                                    <span className="text-white text-xs md:text-xs font-semibold drop-shadow-lg">342</span>
                                </div>

                                {/* Dollar Sign/Tip Button */}
                                <div className="flex flex-col items-center gap-1">
                                    <button className="w-6 h-6 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:from-yellow-300 hover:to-orange-400 transition-all shadow-lg">
                                        <svg className="w-4 h-4 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                    <span className="text-white text-xs md:text-xs font-semibold drop-shadow-lg">Send Tip</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Device frame */}
                    <div
                        ref={deviceRef}
                        className="absolute inset-0 z-10 pointer-events-none"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src="/ipad_reels-new.webp"
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

export default ScrollAnimationSectionReel;
