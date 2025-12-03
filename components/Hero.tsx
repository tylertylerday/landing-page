import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  headline: string;
  subtext: string;
  buttonText: string;
}

const Hero: React.FC<HeroProps> = ({ headline, subtext, buttonText }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(contentRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "center top",
        scrub: true,
      },
      opacity: 0,
      ease: "none",
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative h-screen w-full bg-transparent text-white overflow-hidden">
      <div ref={contentRef} className="absolute top-[15vh] left-1/2 transform -translate-x-1/2 w-full max-w-[600px] px-4 text-center flex flex-col items-center gap-6">
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight font-heading pb-8 border-b border-[#ffffff1A]">{headline}</h1>
        <p className="text-lg text-gray-300">{subtext}</p>
        <Link
          href="/beta"
          className="group animate-border-button flex items-center text-xl justify-between w-full max-w-[250px] px-3 py-2 bg-[#9653ED] text-white rounded-sm font-medium hover:bg-[#5a2997] transition-colors"
        >
          {buttonText}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
