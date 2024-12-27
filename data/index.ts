import {
  ChartSpline,
  Globe,
  Instagram,
  KeyRound,
  LockKeyhole,
  UsersRound,
} from "lucide-react";

export const clientLogos = [
  { name: "Company 1", src: "yourlogo-IwLN6Qx9.png" },
  { name: "Company 2", src: "yourlogo-IwLN6Qx9.png" },
  { name: "Company 3", src: "yourlogo-IwLN6Qx9.png" },
  { name: "Company 4", src: "yourlogo-IwLN6Qx9.png" },
  { name: "Company 5", src: "yourlogo-IwLN6Qx9.png" },
  { name: "Company 6", src: "yourlogo-IwLN6Qx9.png" },
];

// Stripe Plans >> fill in your own priceId & link
export const plans = [
  {
    link: "https://buy.stripe.com/test_3cs9BX750bi6gqA146",
    priceId: "price_1QQm0dP5rD2RSXPgbknhV9wT",
    price: 5,
    duration: "day", // Test Payment
    value: "1",
    label: "1 Day Test",
  },
  {
    link: "https://buy.stripe.com/test_cN27tPblgeuib6gdQR",
    priceId: "price_1QM5u2P5rD2RSXPggu2dHM3J",
    price: 25,
    duration: "week", // Subscription
    value: "7",
    label: "7 Days Subscription",
  },
  {
    link: "https://buy.stripe.com/test_7sI01ncpk2LAb6g9AA",
    priceId: "price_1QM5u2P5rD2RSXPgF5S13xYC",
    price: 65,
    duration: "month", // Subscription
    value: "30",
    label: "30 Days Subscription",
  },
];
export const ProfileInfo = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];
export const pricingPlans = [
  {
    name: "Basic - Test",
    description:
      "Mobile proxy, unlimited browsing, AI suggestions - Test our proxy for 24 hours",
    price: "$5",
    period: "/Day (24 hours)",
    duration: "1",
    features: [
      "Access to mobile proxy with no cost",
      "Unlimited browsing for casual users",
      "AI-powered suggestions based on your network usage",
    ],
    color: "bg-gray-100",
  },
  {
    name: "Premium",
    description: "High-speed proxy, advanced analytics, priority support",
    price: "$25",
    period: "/week",
    duration: "7",
    features: [
      "High-speed mobile proxies for fast and secure browsing",
      "Advanced analytics dashboard to monitor proxy usage",
      "Priority support to handle any issues quickly",
    ],
    color: "bg-blue-600",
  },
  {
    name: "Enterprise",
    description: "Custom proxies, dedicated support, unlimited data",
    price: "$65",
    duration: "30",
    period: "/month",
    features: [
      "Custom mobile proxy setup tailored for your business",
      "Dedicated account manager for personalized support",
      "Unlimited data usage with advanced analytics and reporting",
    ],
    color: "bg-gray-100",
  },
];

export const testimonials = [
  {
    content:
      "Using this mobile proxy service was a game-changer for our business. Fast, reliable, and easy to use. It's allowed us to scale our operations without any speed drops or interruptions. Couldn't ask for better performance!",
    author: "Emily Johnson",
    position: "CEO, Streamline Ventures",
    rating: 5,
  },
  {
    content:
      "The mobile proxies provided excellent speeds for all our ad verification tasks. We never faced any downtime, and the customer support was quick and helpful. Definitely recommend for businesses needing a solid proxy solution!",
    author: "Michael Lee",
    position: "Marketing Manager, AdSavvy",
    rating: 5,
  },
  {
    content:
      "As a data analyst, I rely on consistent, secure proxies, and this service delivered beyond my expectations. The mobile proxies are fast, and the dashboard is super intuitive. It made my job so much easier!",
    author: "Sophia Davis",
    position: "Owner, DataPulse Analytics",
    rating: 5,
  },
  {
    content:
      "This mobile proxy service has been the backbone of our network testing. The reliability and speed are unmatched, and the custom proxy options have been perfect for our enterprise-level needs. Highly recommend for any tech-driven business!",
    author: "David Wilson",
    position: "CTO, NetSolutions Inc.",
    rating: 5,
  },
];

export const faqs = [
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

export const useCases = [
  {
    title: "Social Media Management",
    desc: "Mobile Internet help manage multiple social media accounts without getting banned.",
    icon: Instagram,
  },
  {
    title: "Market Research & SEO Analysis",
    desc: "Mobile Internet improve online shop marketing and SEO by enabling accurate location-based searches, testing ads, and avoiding IP blocks.",
    icon: ChartSpline,
  },
  {
    title: "Multi Account Creation",
    desc: "Mobile Internet allow the creation of multiple accounts without IP bans by providing different IP addresses for each account.",
    icon: UsersRound,
  },
  {
    title: "Privacy & Anonymity",
    desc: "Mobile Proxies hide your IP address and location, enhancing privacy and anonymity online by preventing tracking and profiling.",
    icon: LockKeyhole,
  },
  {
    title: "Bypass Censorship & Geoblocking",
    desc: "Mobile Proxies help bypass internet censorship and geoblocking by masking your real location.",
    icon: KeyRound,
  },
  {
    title: "Web Scraping & Data Collection",
    desc: "Mobile Proxy enable efficient web scraping and data collection by rotating IP addresses, preventing detection and blocking by websites.",
    icon: Globe,
  },
];
