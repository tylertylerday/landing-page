"use client";

import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

interface ScheduleCallSectionProps {
    id?: string;
    calendlyUrl?: string;
}

const ScheduleCallSection: React.FC<ScheduleCallSectionProps> = ({ 
    id, 
    calendlyUrl = "https://calendly.com/blake-croft-co-splay/30min" 
}) => {
    const handleScheduleClick = () => {
        if (calendlyUrl) {
            window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <section id={id} className="w-full relative z-40 pb-0 -mb-20 md:-mb-32">
            <div className="container mx-auto px-4 md:px-8">
                {/* Floating Card */}
                <div 
                    className="relative rounded-3xl overflow-hidden shadow-2xl mesh-card-bg border border-white/10"
                    style={{
                        background: `
                            radial-gradient(circle at 20% 30%, rgba(150, 83, 237, 0.4) 0%, transparent 50%),
                            radial-gradient(circle at 80% 70%, rgba(94, 14, 91, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 40% 50%, rgba(61, 13, 47, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 60% 20%, rgba(53, 22, 68, 0.25) 0%, transparent 50%),
                            linear-gradient(135deg, #3D1F5E 0%, #2D1947 50%, #4F2A6E 100%)
                        `,
                        backgroundSize: '200% 200%, 150% 150%, 180% 180%, 160% 160%, 100% 100%',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    }}
                >
                    {/* Texture overlay */}
                    <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `
                                repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px),
                                repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)
                            `,
                        }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-6 md:gap-8 px-6 md:px-12 py-12 md:py-20">
                        {/* Main Headline */}
                        <h3 className="text-4xl md:text-4xl font-bold text-white font-heading">
                            Being a creator is hard, we can help.
                        </h3>

                        {/* Body Text */}
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                            Co-Splay would love to help you get brand deals and sponsorships, organize creator collabs, increase your social reach, help with posting, and more!
                        </p>

                        {/* Call to Action */}
                        <p className="text-xl md:text-2xl text-white font-medium">
                            Schedule a call with one of our Talent Success Managers today!
                        </p>

                        {/* Schedule Button */}
                        <button
                            onClick={handleScheduleClick}
                            className="group flex items-center justify-center gap-3 text-xl px-8 py-4 bg-[#9653ED] text-white rounded-lg font-medium hover:bg-[#7a3fc4] transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <Calendar className="w-6 h-6" />
                            Schedule a Call
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScheduleCallSection;

