"use client";

import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ScrollAnimationSection from "@/components/ScrollAnimationSection";

export default function Home() {
  const handleHeroClick = () => {
    console.log("Hero button clicked");
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between">
      <ScrollAnimationSection />

      {/* Spacer to ensure scroll height for the absolute content */}
      <div className="h-[200vh] w-full pointer-events-none" />

      <div className="absolute top-0 w-full z-30">
        <div className="relative">
          <Hero
            headline="Experience the Future"
            subtext="A premium digital experience designed to elevate your brand to new heights. Minimalist, powerful, and elegant."
            buttonText="Get Started"
            onButtonClick={handleHeroClick}
          />

          {/* Empty spacer for scroll animation */}
          <div className="h-[100vh] w-full" />

          <Section
            headline="Elegant Design"
            subtext="Our design philosophy centers on simplicity and functionality. Every pixel is crafted with purpose to ensure a seamless user experience."
            imageSrc="https://placehold.co/600x600/1a1a1a/FFF?text=Design"
            imageAlt="Elegant Design"
            orientation="left"
          />

          <Section
            headline="Powerful Performance"
            subtext="Built on the latest technology stack, ensuring lightning-fast load times and smooth interactions across all devices."
            imageSrc="https://placehold.co/600x600/1a1a1a/FFF?text=Performance"
            imageAlt="Performance"
            orientation="right"
          />

          <Section
            headline="Global Reach"
            subtext="Connect with audiences worldwide. Our platform is optimized for global scale, ensuring your message is heard everywhere."
            imageSrc="https://placehold.co/600x600/1a1a1a/FFF?text=Global"
            imageAlt="Global Reach"
            orientation="left"
          />
        </div>
      </div>
    </main>
  );
}
