"use client";

import { useState } from "react";
import Image from "next/image";
import { getAllImages, getImagesByFolder } from "@/lib/imageUtils";

export default function SupportPage() {
  const allImages = getAllImages()
  const militaryImages = getImagesByFolder("military")
  const pearlImages = getImagesByFolder("pearl")
  const aiImages = getImagesByFolder("ai")
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How long does the battery last?",
      answer:
        "The Finstinct collar battery lasts up to 30 days on a single charge with normal use. Battery life may vary depending on GPS tracking frequency and usage patterns.",
    },
    {
      question: "Is the collar waterproof?",
      answer:
        "Yes! The Finstinct collar has an IP68 rating, making it fully waterproof and dustproof. Your pet can swim, play in the rain, and get dirty without any issues.",
    },
    {
      question: "What sizes are available?",
      answer:
        "We offer three sizes: Small (for pets 5-15 lbs), Medium (15-40 lbs), and Large (40+ lbs). Each collar has an adjustable strap to ensure a perfect fit.",
    },
    {
      question: "Does it work internationally?",
      answer:
        "Yes, the Finstinct collar works in over 175 countries worldwide using global cellular networks. A subscription is required for GPS tracking services.",
    },
    {
      question: "What's included in the subscription?",
      answer:
        "The subscription includes unlimited GPS tracking, location history, safe zone alerts, health monitoring, and 24/7 customer support. The first year is included with your purchase.",
    },
    {
      question: "How accurate is the GPS tracking?",
      answer:
        "The Finstinct collar uses multi-constellation GPS (GPS, GLONASS, Galileo) for accuracy within 5-10 meters in most conditions. Updates are provided every 30 seconds during active tracking.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-20 pb-16">
        {/* Modern Hero Section */}
        <div className="relative h-[65vh] min-h-[550px] mb-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={aiImages[0]?.src || militaryImages[0]?.src || allImages[0]?.src || "/placeholder.svg"}
              alt="Support hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
          </div>
          
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
              <div className="max-w-3xl">
                <div className="mb-6">
                  <span className="text-xs tracking-[0.3em] uppercase text-gray-400">Support</span>
                </div>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6 leading-[0.95] text-balance">
                  We&apos;re here
                  <br />
                  <span className="text-gray-300">to help.</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                  Find answers to common questions or get in touch with our support team.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* FAQ Section - Modern Design */}
          <div className="mb-24">
            <div className="mb-12">
              <div className="mb-4">
                <span className="text-xs tracking-[0.3em] uppercase text-gray-400">FAQ</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4 leading-tight">
                Frequently Asked
                <br />
                <span className="text-gray-300">Questions</span>
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-900 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm transition-all hover:border-gray-800"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left group"
                  >
                    <span className="text-lg md:text-xl font-light text-white group-hover:text-gray-200 transition-colors pr-8">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-6 h-6 text-gray-400 transition-all duration-300 flex-shrink-0 ${
                        openFaq === index ? "rotate-180 text-white" : "group-hover:text-gray-300"
                      }`}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-8 pb-6 border-t border-gray-900">
                      <p className="text-gray-300 text-lg leading-relaxed pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Image Showcase Section */}
          <div className="relative h-[65vh] min-h-[500px] rounded-2xl overflow-hidden mb-16 border border-gray-900">
            <Image
              src={pearlImages[3]?.src || pearlImages[2]?.src || allImages[0]?.src || "/placeholder.svg"}
              alt="Product showcase"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          </div>

          {/* Contact CTA Section - Modern Design */}
          <div className="border border-gray-900 rounded-2xl p-12 md:p-16 bg-black/40 backdrop-blur-sm">
            <div className="max-w-2xl">
              <div className="mb-4">
                <span className="text-xs tracking-[0.3em] uppercase text-gray-400">Contact</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6 leading-tight">
                Still need help?
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Our support team is ready to assist you with any questions or concerns.
              </p>
              <a
                href="mailto:support@Finstinct.com"
                className="inline-block bg-white text-black px-10 py-5 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105"
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
