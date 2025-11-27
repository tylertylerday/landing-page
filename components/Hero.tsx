import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  headline: string;
  subtext: string;
  buttonText: string;
  onButtonClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ headline, subtext, buttonText, onButtonClick }) => {
  return (
    <section className="relative h-screen w-full bg-transparent text-black dark:text-white overflow-hidden">
      <div className="absolute top-[200px] left-1/2 transform -translate-x-1/2 w-full max-w-[500px] px-4 text-center flex flex-col items-center gap-6">
        <h1 className="text-5xl font-bold tracking-tight">{headline}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">{subtext}</p>
        <button
          onClick={onButtonClick}
          className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default Hero;
