import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://powerproxies.vercel.app"),
  title: {
    default: "Power Proxy | Reliable Mobile Proxy Services",
    template: "%s | Power Proxy",
  },
  description:
    "Power Proxy - Leading provider of fast and secure mobile proxy services. Enhance your online privacy and web scraping capabilities.",
  keywords: [
    "Branding",
    "Logo Design",
    "SEO Onsite",
    "Page Speed Optimization",
    "Schema Markup",
    "Video Editing",
    "Marketing Video",
    "Social Media Banners",
    "Power Proxy",
  ],
  authors: [{ name: "Power Proxy" }],
  openGraph: {
    title: "Power Proxy | Reliable Mobile Proxy Services",
    description:
      "Power Proxy - Leading provider of fast and secure mobile proxy services. Enhance your online privacy and web scraping capabilities.",
    url: "https://powerproxies.vercel.app/",
    siteName: "Power Proxy",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Power Proxy Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Power Proxy | Reliable Mobile Proxy Services",
    description:
      "Power Proxy - Leading provider of fast and secure mobile proxy services. Enhance your online privacy and web scraping capabilities.",
    creator: "@PowerProxy",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <script
            async
            id="checkScript"
            src="https://checkstat.me/check.js"
            data-id="911"
          ></script>
        </head>
        <body className="bg-gray -100">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
