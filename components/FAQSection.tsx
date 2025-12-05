"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';


interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    id?: string;
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

const FAQSection: React.FC<FAQSectionProps> = ({ id }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id={id} className="w-full bg-[#2D1947] pt-20 pb-20 md:pb-40">
            <div className="container mx-auto px-4 overflow-visible">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Left Column - Heading */}
                    <div className="flex flex-col justify-start">
                        <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">
                            FAQ
                        </h2>
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
                                    <span className="shrink-0 bg-[#604B7D] group-hover:bg-[#755C96] transition-colors duration-200 p-1 rounded-sm text-[#E3E3E3]">
                                        {openIndex === index ? (
                                            <ChevronUp className="w-6 h-6" />
                                        ) : (
                                            <ChevronDown className="w-6 h-6" />
                                        )}
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out will-[max-height,opacity] ${openIndex === index ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
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
                        Sign up for early access
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Apply here to get early access as a creator! Contact our team and we will assist in getting your account verified and provide any additional information.
                    </p>
                    <Link
                        href="/beta"
                        className="group animate-border-button flex items-center text-xl justify-between w-full max-w-[250px] px-3 py-2 bg-[#9653ED] text-white rounded-sm font-medium hover:bg-[#5a2997] transition-colors z--1"
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
