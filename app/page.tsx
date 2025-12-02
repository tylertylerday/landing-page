"use client";

import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ReelSectionMore from "@/components/ReelSection-more";
import Navbar from "@/components/Navbar";
import ScrollAnimationSectionReel from "@/components/ScrollAnimationSection-Reel";
import FAQSection from "@/components/FAQSection";

export default function Test() {


    return (
        <main className="grid grid-cols-1 min-h-screen">
            <Navbar />
            <div className="col-start-1 row-start-1">
                <ScrollAnimationSectionReel />
            </div>

            <div className="col-start-1 row-start-1 w-full z-30">
                <div className="relative">
                    <Hero
                        headline="A home built for cosplay"
                        subtext="Co-Splay is the first platform designed for cosplayers. Showcase your content and connect with a new, dedicated fanbase."
                        buttonText="Join the waitlist"
                    />

                    {/* Empty spacer for scroll animation */}
                    <div className="h-[70vh] w-full" />

                    <Section
                        id="discovery"
                        headline="Reach a new audience"
                        tag="Discovery"
                        subtext="Co-Splay is built for discovery. Our Explore feed helps your content get discovered by users natively on the platform."
                        hideImage={true}
                        orientation="left"
                    />

                    {/* Empty spacer*/}
                    <div className="h-[20vh] w-full" />

                    <Section
                        id="monetize"
                        headline="Fund your new lifestyle"
                        tag="Monetization"
                        subtext="We give you the tools to earn from your fans through subscriptions, tips, and pay-per-view content. Turn this expensive hobby into a thriving career."
                        imageSrc="/ipad_newpost.webp"
                        mobileImageSrc="/ipad_newpost.webp" // Replace with mobile-specific image
                        imageAlt="Discovery"
                        orientation="right"
                    />
                    <ReelSectionMore id="protection" />

                    <Section
                        headline="Easily manage your own content"
                        tag="Creator Tools"
                        subtext="Manage your page, sales, messages, and storefront from a single dashboard. Co-Splay’s tools are designed specifically for cosplay creators, with human support when you need it and a community that already shares your niche."
                        imageSrc="/ipad_dashboard.webp"
                        mobileImageSrc="/ipad_dashboard.webp" // Replace with mobile-specific image
                        imageAlt="Global Reach"
                        orientation="left"
                    />

                    <div className="h-[10vh] w-full" />

                    <FAQSection />

                </div>
            </div>
        </main>
    );
}
