"use client";

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SuccessPage: React.FC = () => {
  // State to hold the dimensions of the window for Confetti
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  // Update dimensions on component mount
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    // Optional: Add resize listener for responsiveness
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      {/* Confetti Effect */}
      <Confetti width={dimensions.width} height={dimensions.height} />

      {/* Success Message */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center bg-white dark:bg-gray-800 px-8 py-12 rounded-xl shadow-lg"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-6xl text-green-500 mb-4"
        >
          ✅
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Payment Successful!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Navigate to your dashboard and refresh to see the new purchased
          proxies. 🎉
        </p>
        <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95, rotate: 2 }}
            className="mt-5 px-6 py-3 w-[70%] bg-gradient-to-r from-green-600 to-blue-600 hover:from-blue-600 hover:to-green-600 text-white font-semibold text-lg rounded-lg shadow-lg transition-all"
          >
            Back To Dashboard
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
