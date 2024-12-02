"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const CancelPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-all">
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
          className="text-6xl text-red-500 mb-4"
        >
          ❌
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Payment Canceled
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Your payment was not processed. Please try again or contact support if
          you have any questions.
        </p>
        <div className="mt-6 flex  items-center justify-center">
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-900 text-white font-semibold text-lg rounded-lg shadow-lg transition-all"
            >
              Back to dashboard
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default CancelPage;
