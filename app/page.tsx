"use client";

import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ReelSection from "@/components/ReelSection";
import Navbar from "@/components/Navbar";
import ScrollAnimationSection from "@/components/ScrollAnimationSection";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  const handleHeroClick = () => {
    console.log("Hero button clicked");
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between">
      <Navbar />
      <ScrollAnimationSection />

      {/* Spacer to ensure scroll height for the absolute content */}
      <div className="h-[200vh] w-full pointer-events-none" />

      <div className="absolute top-0 w-full z-30">
        <div className="relative">
          <Hero
            headline="Cosplay is expensive."
            subtext="Co-Splay is the first platform built for cosplayers. Monetize your work, and connect with other cosplayers."
            buttonText="Join the waitlist"
            onButtonClick={handleHeroClick}
          />

          {/* Empty spacer for scroll animation */}
          <div className="h-[100vh] w-full" />

          <Section
            id="monetize"
            headline="Fund your next build"
            tag="Monetization"
            subtext="We give you the tools to earn from your fans through subscriptions, tips, and pay-per-view content. Turn this expensive hobby into a thriving career."
            hideImage={true}
            orientation="left"
          />

          {/* Empty spacer*/}
          <div className="h-[20vh] w-full" />

          <Section
            id="discovery"
            headline="Reach a new audience"
            tag="Discovery"
            subtext="Co-Splay is built for discovery. Our Explore feed helps your content get discovered by users natively on the platform."
            imageSrc="/ipad_intro.webp"
            mobileImageSrc="/intro-ipad-mobile.webp" // Replace with mobile-specific image
            imageAlt="Discovery"
            orientation="right"
          />
          <ReelSection id="protection" />

          <Section
            headline="Easily manage your own content"
            tag="Worldwide"
            subtext="Manage your page, sales, messages, and storefront without juggling five different apps. Co-Splay's tools are designed specifically for cosplay creators, with human support when you need it and a community that already shares your niche."
            imageSrc="/dashboard-ipad.webp"
            mobileImageSrc="/dashboard-ipad.webp" // Replace with mobile-specific image
            imageAlt="Global Reach"
            orientation="left"
          />

          <FAQSection />

        </div>
      </div>
    </main>
  );
}
