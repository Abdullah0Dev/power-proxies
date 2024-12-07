"use client";

import React, { useEffect, useState } from "react";

const NotFound = () => {
  const [videoUrl, setVideoUrl] = useState("/videos/404-dark.mp4");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setVideoUrl("/videos/404-dark.mp4");
      } else {
        setVideoUrl("/videos/404-light.mp4");
      }
    };

    // Set initial state
    if (mediaQuery.matches) {
      setVideoUrl("/videos/404-dark.mp4");
    }

    // Add listener
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup listener
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div className="flex bg-white dark:bg-black justify-center items-center h-screen w-screen">
      <video src={videoUrl} loop autoPlay className="w-full h-full" muted />
    </div>
  );
};

export default NotFound;
