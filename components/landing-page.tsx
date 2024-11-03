"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Check, Star } from "lucide-react";
import Features from "@/components/component/features-list";
import { clientLogos, pricingPlans, testimonials, faqs } from "@/data/index";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function LandingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) =>
    setOpenFAQ(openFAQ === index ? null : index);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUpVariants}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen ">
      <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-teal-500">
        <header className="container mx-auto  px-4 py-16 md:py-32">
          <div className="pt-6 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Unlock the Internet with Fast & Secure Mobile Proxies
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Scrape public data without interruptions from CAPTCHAs or
                blocks, manage multiple social media accounts, and verify ads
                with fast and reliable mobile proxies.
              </p>
              <ul className="text-white space-y-2 mb-8">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-teal-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  99.55% proxy success rate
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-teal-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  195+ countries included with city and carrier-level targeting
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-teal-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  3G, 4G, 5G and LTE coverage available
                </li>
              </ul>
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Get Started
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              {/* Display the SVG frame */}
              <div className="relative w-64 h-auto">
                <Image
                  src="/frame.svg"
                  alt="Mobile frame"
                  width={256}
                  height={512}
                  className="w-full h-auto"
                />

                {/* Overlay the video */}
                <div className="absolute top-[8px] left-[13px] w-[90%] h-[97%] overflow-hidden rounded-lg">
                  <video
                    ref={videoRef}
                    src="https://www.germanproxy.io/wp-content/uploads/2024/10/Proxy-Speedtest.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-[25px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      <SectionWrapper>
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Trusted by Industry Leaders
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {clientLogos.map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={"/yourlogo-IwLN6Qx9.png"}
                    alt={client.name}
                    width={120}
                    height={60}
                    className="max-w-full h-auto"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      <Features />

      <SectionWrapper>
        <section id="pricing" className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Pricing Plans
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Choose the perfect plan for your needs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-lg shadow-lg overflow-hidden ${
                    plan.color
                  } ${plan.name === "Premium" ? "transform scale-105" : ""}`}
                >
                  <div className="p-6">
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        plan.name === "Premium" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`mb-4 ${
                        plan.name === "Premium"
                          ? "text-gray-200"
                          : "text-gray-600"
                      }`}
                    >
                      {plan.description}
                    </p>
                    <div
                      className={`text-4xl font-bold mb-4 ${
                        plan.name === "Premium" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {plan.price}
                      <span
                        className={`text-xl ${
                          plan.name === "Premium"
                            ? "text-gray-200"
                            : "text-gray-600"
                        }`}
                      >
                        {plan.period}
                      </span>
                    </div>
                    <ul className="mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center mb-2"
                        >
                          <Check
                            className={`w-5 h-5 mr-2 ${
                              plan.name === "Premium"
                                ? "text-teal-300"
                                : "text-green-500"
                            }`}
                          />
                          <span
                            className={
                              plan.name === "Premium"
                                ? "text-white"
                                : "text-gray-700"
                            }
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={{
                        pathname: "/billing",
                        query: { duration: String(plan.duration) },
                      }}
                      className={`w-full font-bold py-2 px-4 rounded transition-colors ${
                        plan.name === "Premium"
                          ? "bg-white text-blue-600 hover:bg-gray-100"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      Get started
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper>
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Testimonials
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              What our clients say about us
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <p className="text-gray-700 mb-4">{testimonial.content}</p>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Image
                        src="/client-0-vcjg0fIb.jpg"
                        alt={testimonial.author}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <p className="text-gray-600">{testimonial.position}</p>
                    </div>
                  </div>
                  <div className="flex mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      <section id="faq" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Find answers to common questions about our mobile proxies
          </p>
          <div className="max-w-3xl mx-auto">
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl mx-auto"
            >
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
