import React from "react";
import { motion } from "framer-motion";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <motion.img
        src="/loading.png"
        alt="Loading spinner"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24 object-contain"
      />
    </div>
  );
};

export default Loading;
