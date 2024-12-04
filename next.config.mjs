import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",  
        pathname: "**",
      },
      {
        protocol: "https",
        hostname:  "flagcdn.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
