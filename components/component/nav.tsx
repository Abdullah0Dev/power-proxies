"use client";
import { SignOutButton, UserButton, useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { DotIcon, LayoutDashboard, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface NavbarProps {
  user: {
    firstName: string;
    lastName: string;
    imageUrl?: string;
    emailAddresses: { emailAddress: string }[];
  };
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState("light");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { isSignedIn } = useUser();
  const router = useRouter();
  useEffect(() => {
    const fetchTheme = async () => {
      const savedTheme = await localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };
    fetchTheme();
  }, [theme]);

  const userName = `${user?.firstName} ${user?.lastName}`;
  const userEmail = user?.emailAddresses?.[0]?.emailAddress || "";
  const userImage = user?.imageUrl || "";

  const data = {
    user: {
      name: userName,
      email: userEmail,
      avatar: userImage,
    },
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleProfileMenu = () => setIsProfileOpen((prev) => !prev);

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
        backgroundColor: isScrolled ? "#2563EB" : "rgba(255, 255, 255, 0)",
      }}
      transition={{ duration: 0.3 }}
    >
        {/* xl:px-20 */}
      <div className="container mx-auto "> 
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className={`flex gap-4 items-center xl:text-3xl text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? "text-white  dark:text-white " : "text-white"
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
          <div className="hidden md:flex text-xl xl:space-x-10 space-x-4">
            {["Home", "Features", "Pricing", "Reviews", "FAQ"].map(
              (text, idx) => (
                <Link
                  key={idx}
                  href={`#${text.toLowerCase()}`}
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? "text-white/90  dark:text-white  hover:text-blue-200 dark:hover:text-white/80"
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
              <div className="">
                <div className="relative">
                  {/* user info */}

                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center space-x-2"
                  >
                    <img
                      src={data.user.avatar}
                      alt="User Avatar"
                      className="h-11 w-11 rounded-full"
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute dark:bg-darkMode-1 right-0 mt-2 w-80 bg-white shadow-lg rounded-md">
                      <div className="flex items-center justify-start">
                        <DropdownMenu>
                          <div className="flex-1 px-8 py-4">
                            <div className="flex items-center space-y-2">
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage
                                      src={data.user.avatar}
                                      alt="Avatar"
                                    />
                                    <AvatarFallback>
                                      {data.user.name}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="ml-4 text-start space-y-px">
                                    <p className="text-sm text-black dark:text-darkMode-4 font-medium leading-none">
                                      {data.user.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {data.user.email}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DropdownMenu>
                        <hr className="h-px bg-black" />
                      </div>
                      <button
                        className=" px-4 py-4 flex items-center gap-x-5 text-gray-700 dark:text-darkMode-4/70 w-full hover:bg-gray-100 dark:hover:bg-darkMode-2 "
                        onClick={() => router.push("/dashboard")}
                      >
                        <LayoutDashboard className="size-4" />
                        <p className=" text-sm text-[##7A7A7A]">Dashboard</p>
                      </button>
                      <SignOutButton redirectUrl="/">
                        <button
                          className=" px-4 py-4 flex items-center dark:hover:bg-darkMode-2 dark:text-darkMode-4/70 gap-x-5 text-gray-700 w-full hover:bg-gray-100"
                          onClick={async () => {
                            try {
                              // Clear AsyncStorage email
                              await localStorage.removeItem("email");
                              // Add any other sign-out logic here if necessary

                              // Redirect to login page
                              // router.push("/sign-in");
                            } catch (error) {
                              console.error("Error during sign-out:", error);
                            }
                          }}
                        >
                          <LogOutIcon className="size-4" />
                          <p className=" text-sm text-[##7A7A7A]">Log out</p>
                        </button>
                      </SignOutButton>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? "text-blue-200 hover:text-teal-300"
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
};

export default Navbar;
