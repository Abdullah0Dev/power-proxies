import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const featureItemData = [
  {
    title: "Global Mobile Proxy Network",
    desc: "Unlock access to a vast network of over 33 million mobile proxies across 190+ countries, providing unmatched global reach and versatility for all your scraping and automation needs. Whether you're targeting localized content or scaling your operations worldwide, our proxies deliver reliable, fast connections from diverse geolocations, ensuring you stay ahead of the competition and overcome geographic restrictions effortlessly.",
    image: "/mobile_proxies-CiJ1qdzh.svg",
  },
  {
    multiImg: true,
    title: "100% Ethically Sourced IPs",
    desc: "We prioritize ethical sourcing, ensuring that every mobile IP address within our network is obtained through legal and transparent means. This not only guarantees compliance with local regulations but also ensures high-quality, authentic user-like connections, giving you the peace of mind to focus on your operations while maintaining the highest standards of privacy and security across the globe.",
    btnColor: "#FF5733",
  },
  {
    title: "Effortlessly Evade CAPTCHAs and Detection",
    desc: "Our proxy network is specifically engineered to bypass even the most sophisticated CAPTCHA challenges and bot detection systems. By mimicking natural user behavior, our proxies enable you to scrape and automate without interruptions, ensuring consistent access to data without getting flagged or blocked. With advanced anti-bot measures, you can execute high-volume tasks while staying under the radar.",
    image: "/captcha-BCDgYULp.png",
  },
  {
    title: "99.5% Success Rate for Maximum Reliability",
    desc: "Experience the industry-leading performance of our proxies, boasting a remarkable 99.5% success rate. With near-instant response times and unparalleled uptime, our network ensures your scraping, crawling, and automation projects operate smoothly and efficiently. Whether you're conducting real-time data collection or large-scale web scraping, rely on our proxies to maintain high-performance standards.",
    btnColor: "#900C3F",
    image: "/high-speed-JzVQwaEI.png",
    width: 200,
  },
  {
    title: "Seamless IP Rotation for Enhanced Anonymity",
    desc: "Our dynamic IP rotation feature allows you to change IP addresses automatically, preventing IP bans and boosting your anonymity online. This provides you with the flexibility to scrape large amounts of data over an extended period while maintaining a low profile. Say goodbye to manual rotations and embrace smooth, uninterrupted access to your target sites, regardless of their anti-scraping measures.",
    image: "/roation_ip-D7RoKjow.png",
  },
];

const FeatureItem = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`flex flex-col ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } items-center gap-8 bg-white rounded-xl shadow-lg overflow-hidden mb-16`}
    >
      <div className="md:w-1/2 p-8">
        <h3
          className="text-2xl font-bold mb-4"
          style={{ color: feature.btnColor || "#2363B9" }}
        >
          {feature.title}
        </h3>
        <p className="text-gray-600 mb-6">{feature.desc}</p>
        <button
          className="px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 ease-in-out"
          style={{
            backgroundColor: feature.btnColor || "#2363B9",
            boxShadow: `0 4px 14px 0 ${feature.btnColor || "#2363B9"}66`,
          }}
        >
          Learn More
        </button>
      </div>
      <div
        style={{
          backgroundImage: "url('/grid-HpNlL527.png')", // Background image for the container
          backgroundSize: "cover", // Ensures the image covers the entire background
          backgroundRepeat: "no-repeat", // Prevents the background from repeating
        }}
        className="flex justify-center items-center bg-image h-full md:w-1/2 relative md:h-auto"
      >
        {feature.multiImg ? (
          // Container for overlaying multiple images
          <div className="flex justify-center items-center h-full">
            <Image
              src="/ccpa-1-BM4PN9l7.svg"
              alt="CCPA Compliance"
              width={100}
              height={100}
              className="mx-2"
            />
            <Image
              src="/iso-DuIEJ2_g.svg"
              alt="ISO Certification"
              width={100}
              height={100}
              className="mx-2"
            />
            <Image
              src="/gdpr-3.svg"
              alt="GDPR Compliance"
              width={100}
              height={100}
              className="mx-2"
            />
          </div>
        ) : (
          // Single image overlay on top of the background
          <Image
            src={feature.image}
            alt={feature.title}
            width={feature.width ? feature.width : 400}
            height={feature.width ? feature.width : 400}
            objectFit="cover"
            className="rounded-xl"
          />
        )}
        {/* Gradient overlay for visual effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-50"></div>
      </div>
    </motion.div>
  );
};

export default function Features() {
  return (
    <section
      id="features"
      className="bg-gradient-to-b from-gray-100 to-white py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Key Features</h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          What sets our mobile proxies apart
        </p>
        <div>
          {featureItemData.map((feature, index) => (
            <FeatureItem key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
