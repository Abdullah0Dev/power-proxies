"use client";

import { useEffect } from "react";

const ClientSideStorage = ({ email }: { email: string }) => {
  useEffect(() => {
    if (email) {
      localStorage.setItem("email", email);
    }
  }, [email]);

  return null; // This component doesn't render anything visible
};

export default ClientSideStorage;
