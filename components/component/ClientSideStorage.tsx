"use client";

import { useEffect } from "react";

// Type for the props
interface ClientSideStorageProps {
  fullName?: string;
  userImage?: string;
  userName?: string;
  userEmail?: string;
  isGoogleAuth?: boolean;
  email?: string;
}

const ClientSideStorage = ({
  fullName = "Bruh",
  userImage = "Bruh",
  userName = "Bruh",
  userEmail = "Bruh",
  isGoogleAuth = false,
  email,
}: ClientSideStorageProps) => {
  useEffect(() => {
    if (email) {
      localStorage.setItem("email", email);
    }
    if (fullName && userImage && userName && userEmail !== undefined) {
      // Storing data in localStorage as a serialized JSON string
      const userData = {
        fullName,
        userImage,
        userName,
        userEmail,
        isGoogleAuth,
      };

      localStorage.setItem("userData", JSON.stringify(userData)); // Storing all user data as a string
    }
  }, [fullName, userImage, userName, userEmail, isGoogleAuth, email]);

  return null; // This component doesn't render anything visible
};

export default ClientSideStorage;
