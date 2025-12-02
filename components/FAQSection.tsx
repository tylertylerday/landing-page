"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "Does it cost anything to join?",
        answer: "No. Creating a Co-Splay account is completely free!"
    },
    {
        question: "What percentage of earnings does Co-Splay keep?",
        answer: "Co-Splay takes 20% of creator profits to cover payment processing and other platform costs."
    },
    {
        question: "What kind of content is allowed on the platform?",
        answer: "Co-Splay has a strict Safe-For-Work content policy. If you have more questions about our content policy, please contact us directly."
    },
    {
        question: "Can I sell both digital and physical merch on my page?",
        answer: "Yes! You can sell photosets and other digital media, as well as physical merchandise in your shop."
    },
    {
        question: "Do I keep ownership of all the content I upload?",
        answer: "Absolutely, you keep 100% ownership and rights to everything you create. Co-Splay will never claim ownership of your work."
    }
];

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full bg-[#2D1947] pt-20 pb-40">
            <div className="container mx-auto px-4 overflow-visible">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Left Column - Heading */}
                    <div className="flex flex-col justify-start">
                        <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">
                            FAQ
                        </h2>
                        <p className="text-lg text-gray-300 max-w-md">
                            Got questions? We've got answers. Here's everything you need to know about our protection services.
                        </p>
                    </div>

                    {/* Right Column - Accordion Items */}
                    <div className="flex flex-col gap-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-[#4F376F] rounded-lg  last:border-none"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-start justify-between gap-4 py-6 text-left group min-h-[56px] px-4 pt-4"
                                >
                                    <span className="text-l font-medium text-[#E3E3E3] group-hover:text-[#ffffff] transition-colors">
                                        {faq.question}
                                    </span>
                                    <span className="flex-shrink-0 bg-[#604B7D] group-hover:bg-[#755C96] transition-colors duration-200 p-1 rounded-sm text-[#E3E3E3]">
                                        {openIndex === index ? (
                                            <ChevronUp className="w-6 h-6" />
                                        ) : (
                                            <ChevronDown className="w-6 h-6" />
                                        )}
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-[#E3E3E3] text-xl leading-7 px-4">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider Line */}
                <div className="w-full h-px bg-[#ffffff1A] my-16"></div>

                {/* Beta Signup Section */}
                <div className="flex flex-col items-start text-left max-w-2xl gap-6 overflow-visible relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-heading">
                        Sign up for beta access
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Join our exclusive beta program and be among the first to experience the future of cosplay content creation.
                    </p>
                    <Link
                        href="/beta"
                        className="group animate-border-button flex items-center text-xl justify-between w-full max-w-[250px] px-3 py-2 bg-[#9653ED] text-white rounded-sm font-medium hover:bg-[#7d3ec9] transition-colors z--1"
                    >
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
