"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What exactly are mobile proxies?",
    answer:
      "Mobile proxies are specialized proxies that utilize IP addresses assigned by mobile ISPs (Internet Service Providers). They route your internet traffic through mobile networks, such as 3G, 4G, or 5G. These proxies enhance anonymity, as mobile IPs are shared among numerous users and change frequently, making them less susceptible to being flagged or blocked by websites compared to traditional static IP proxies.",
  },
  {
    question: "What advantages do mobile proxies offer?",
    answer:
      "Mobile proxies provide a host of benefits, including heightened anonymity, enhanced online security, and privacy protection. With PowerProxies mobile proxies, you can easily bypass geo-restrictions, accessing content from various locations without hassle.",
  },
  {
    question: "Why is there a surge in proxy usage?",
    answer:
      "Mobile proxies are gaining popularity because they use real IPv6/IPv4 addresses from actual mobile devices (smartphones and tablets) to route traffic. This makes them highly effective at evading sophisticated bot-blocking methods. You can scrape public data seamlessly without interruptions from CAPTCHAs or other verification processes. Plus, you can test all PowerProxies features for just $1.99 before committing to a paid plan.",
  },
  {
    question: "What can I accomplish with mobile proxy servers?",
    answer:
      "Mobile proxies are versatile tools, commonly used for social media management, ad verification, web scraping, and bypassing geo-restrictions. They also allow you to conduct market research by gathering high-quality data from different regions, comparing prices across various e-commerce sites, and ensuring your ads appear correctly.",
  },
  {
    question: "How do 3G, 4G, 5G, and LTE proxies differ?",
    answer:
      "3G proxies operate on the third generation of mobile telecommunications, providing moderate speeds but less commonly used today. 4G proxies deliver faster speeds and improved reliability, while 5G proxies, the latest technology, offer significantly higher speeds and lower latency for high-bandwidth applications. LTE proxies, often associated with 4G, deliver better performance than 3G but may not always meet the full 4G standards. Each proxy type varies in speed and connectivity, with newer generations typically outperforming the previous ones.",
  },
  {
    question: "How extensive is PowerProxies' global proxy network?",
    answer:
      "PowerProxies boasts a comprehensive global proxy network with access to over 195 countries. Our top locations include the USA, UK, Germany, Brazil, Canada, Indonesia, Russia, India, Ukraine, and Australia. When using PowerProxies mobile proxies, you can select specific locations down to the country or city level. Please note, however, that due to regulatory complexities, we currently do not offer proxy servers within the State of Texas.",
  },
  {
    question: "Can you explain your IP rotation system?",
    answer:
      "Our IP rotation system offers three modes to suit your needs: \n\n1. **Same IP up to Rotation**: Use the same IP for a set duration, provided it stays online. If it goes offline, a new IP is automatically assigned. \n2. **Hold IP if Connection Lost (Sticky IP)**: This feature allows you to maintain your IP for a designated time, even if you briefly lose connection, ensuring continuity. \n3. **Rotating - New IP on Each Request**: Get a new IP for every request you make, ensuring high anonymity and security with each new website or page accessed.",
  },
];

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => setOpenFAQ(openFAQ === index ? null : index);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Find answers to common questions about our mobile proxies
        </p>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                className="flex justify-between items-center w-full text-left font-bold text-lg p-4 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-white"
                  >
                    <p className="text-gray-700">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
