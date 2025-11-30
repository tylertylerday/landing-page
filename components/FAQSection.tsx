"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "How does the DMCA takedown process work?",
        answer: "Our automated system scans the web 24/7 for your content. When we find unauthorized copies, we automatically generate and submit DMCA takedown notices to the hosting providers and search engines to get the content removed."
    },
    {
        question: "What platforms do you monitor?",
        answer: "We monitor major social media platforms, tube sites, file hosting services, and search engines. Our coverage is constantly expanding to ensure comprehensive protection for your content."
    },
    {
        question: "Do I need to provide proof of ownership?",
        answer: "Yes, during the initial setup, you'll need to verify your identity and ownership of the content. This is a one-time process to ensure we can legally act on your behalf."
    },
    {
        question: "How long does it take to remove content?",
        answer: "Removal times vary by platform. Some major platforms remove content within hours, while others may take a few days. We track every submission and follow up until the content is gone."
    },
    {
        question: "Can I whitelist certain sites or partners?",
        answer: "Absolutely. You can easily add approved domains and partners to your whitelist so our system knows to ignore them during scans."
    }
];

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full bg-[#3C215F] py-20">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Left Column - Heading */}
                    <div className="flex flex-col justify-start">
                        <div className="w-fit px-4 py-1 mb-6 border border-[#9653ED] rounded-full text-[#9653ED] text-[20px] font-medium uppercase tracking-wide">
                            FAQ
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">
                            Frequently Asked Questions
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
                                className="border-b border-[#9653ED]/30 last:border-none"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex bg-[#4F376F] rounded-lg items-start justify-between gap-4 py-4 text-left group min-h-[56px] px-3 pt-2"
                                >
                                    <span className="text-xl font-medium text-white group-hover:text-[#ffffff] transition-colors">
                                        {faq.question}
                                    </span>
                                    <span className="flex-shrink-0 mt-1 text-[#9653ED]">
                                        {openIndex === index ? (
                                            <Minus className="w-6 h-6" />
                                        ) : (
                                            <Plus className="w-6 h-6" />
                                        )}
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-gray-300 leading-relaxed px-3">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
