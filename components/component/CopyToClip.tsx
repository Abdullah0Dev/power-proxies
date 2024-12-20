import React, { ReactNode } from "react";
import { toast } from "react-toastify";

interface CopyToClipProps {
  children: ReactNode; // The content to display and copy
  className?: string;
}

const CopyToClip: React.FC<CopyToClipProps> = ({ children, className }) => {
  const copyToClipboard = () => {
    const text = String(children).trim(); // Convert children to string and trim spaces
    if (!text) {
      console.warn("No valid text to copy.");
      return;
    }

    navigator.clipboard.writeText(text);

    // Show a toast notification
    toast.success(`${text} copied!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
    console.log("Copied to clipboard:", text);
  };

  return (
    <p
      onClick={copyToClipboard}
      className={className}
      style={{ cursor: "pointer" }}
    >
      {children}
    </p>
  );
};

export default CopyToClip;
