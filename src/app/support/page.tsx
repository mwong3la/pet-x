"use client";

import { useState } from "react";
import Image from "next/image";

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How long does the battery last?",
      answer:
        "The PetX collar battery lasts up to 30 days on a single charge with normal use. Battery life may vary depending on GPS tracking frequency and usage patterns.",
    },
    {
      question: "Is the collar waterproof?",
      answer:
        "Yes! The PetX collar has an IP68 rating, making it fully waterproof and dustproof. Your pet can swim, play in the rain, and get dirty without any issues.",
    },
    {
      question: "What sizes are available?",
      answer:
        "We offer three sizes: Small (for pets 5-15 lbs), Medium (15-40 lbs), and Large (40+ lbs). Each collar has an adjustable strap to ensure a perfect fit.",
    },
    {
      question: "Does it work internationally?",
      answer:
        "Yes, the PetX collar works in over 175 countries worldwide using global cellular networks. A subscription is required for GPS tracking services.",
    },
    {
      question: "What's included in the subscription?",
      answer:
        "The subscription includes unlimited GPS tracking, location history, safe zone alerts, health monitoring, and 24/7 customer support. The first year is included with your purchase.",
    },
    {
      question: "How accurate is the GPS tracking?",
      answer:
        "The PetX collar uses multi-constellation GPS (GPS, GLONASS, Galileo) for accuracy within 5-10 meters in most conditions. Updates are provided every 30 seconds during active tracking.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-20 pb-16">
        <div className="relative h-[50vh] mb-16 overflow-hidden">
          <Image
            src="/smart-pet-collar-gps-tracker-close-up-detail-shot-.jpg"
            alt="Support hero"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div>
              <h1 className="text-6xl md:text-7xl font-light mb-4">Support</h1>
              <p className="text-xl md:text-2xl text-gray-300">
                We're here to help
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-[980px] mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-light mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-800 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-900 transition-colors"
                  >
                    <span className="font-semibold text-lg">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 py-5 border-t border-gray-800 bg-gray-900">
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[60vh] rounded-2xl overflow-hidden mb-12">
            <Image
              src="/waterproof-smart-pet-collar-in-water-splash-photog.jpg"
              alt="Product showcase"
              fill
              className="object-cover"
            />
          </div>

          <div className="rounded-2xl">
            <h2 className="text-3xl font-light mb-4 border-b pb-4 border-dashed">Still need help?</h2>
            <div className="flex items-center justify-between">
              <p className="text-lg text-gray-400 mb-8">
                Our support team is ready to assist you
              </p>
              <a
                href="mailto:support@petx.com"
                className="inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
