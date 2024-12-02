"use client";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else if (window.scrollY === 0) {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-4 py-2"
      initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
      animate={{
        backgroundColor: isScrolled
          ? "rgba(255, 255, 255, 1)"
          : "rgba(255, 255, 255, 0)",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className={`flex gap-4 items-center text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? "text-blue-900" : "text-white"
            }`}
          >
            <Image
              priority
              src="/logo.png"
              alt="logo"
              width={50}
              height={50}
              className="max-w-full h-auto"
            />
            <span>PowerProxy</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            {["Home", "Features", "Pricing", "Reviews", "FAQ"].map(
              (text, idx) => (
                <Link
                  key={idx}
                  href={`#${text.toLowerCase()}`}
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? "text-blue-900 hover:text-blue-700"
                      : "text-white hover:text-teal-300"
                  }`}
                >
                  {text}
                </Link>
              )
            )}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Dashboard"
                    labelIcon={<LayoutDashboard className="size-4" />}
                    onClick={() => router.push("/dashboard")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? "text-blue-900 hover:text-blue-700"
                      : "text-white hover:text-teal-300"
                  }`}
                >
                  New Account
                </Link>
                <Link
                  href="/sign-in"
                  className={`bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition-colors ${
                    isScrolled ? "bg-blue-600 hover:bg-blue-700" : ""
                  }`}
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
          <button
            className={`md:hidden transition-colors duration-300 ${
              isScrolled ? "text-blue-900" : "text-white"
            }`}
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed top-0 right-0 h-full w-64 bg-blue-800 z-50 p-4"
          >
            <button className="text-white mb-4" onClick={toggleMenu}>
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="flex flex-col space-y-4">
              {["Home", "Features", "Pricing", "Reviews", "FAQ"].map(
                (text, idx) => (
                  <Link
                    key={idx}
                    href={`#${text.toLowerCase()}`}
                    onClick={toggleMenu}
                    className="text-white hover:text-teal-300 transition-colors"
                  >
                    {text}
                  </Link>
                )
              )}
              <div className="absolute bottom-5 w-[90%]">
                {isSignedIn ? (
                  <div className="w-full rounded-2xl bg-teal-500 py-3 text-center">
                    <Link
                      href="/dashboard"
                      onClick={toggleMenu}
                      className="text-white"
                    >
                      Dashboard
                    </Link>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <Link
                      href="/sign-up"
                      onClick={toggleMenu}
                      className="border-b border-white text-teal-300 font-bold py-2 px-2 rounded transition-colors"
                    >
                      New Account
                    </Link>
                    <Link
                      href="/sign-in"
                      onClick={toggleMenu}
                      className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-5 rounded transition-colors"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}