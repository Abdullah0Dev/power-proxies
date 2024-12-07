"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import TestSidebar from "@/components/admin/sidebar-test";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ClientSideStorage from "@/components/component/ClientSideStorage";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  // Fetch email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setUserEmail(storedEmail);
  }, []);
  // Redirect if email is not authorized
  useEffect(() => {
    if (userEmail && userEmail !== "webminds.y1t@gmail.com") {
      router.push("/404");
    }
  }, [userEmail, router]);
  // Redirect if no email after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!userEmail) {
        console.log("Email:", userEmail);
        router.push("/sign-in");
      }
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [userEmail, router]);



  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    setToggleCollapse((prev) => !prev);
  };

  if (!userEmail) {
    return <div>Loading...</div>; // Show loading state while userEmail is being fetched
  }

  return (
    <SidebarProvider className="flex">
      <TestSidebar
        toggleCollapse={toggleCollapse}
        onToggleCollapse={handleSidebarToggle}
      />
      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          toggleCollapse ? "ml-20 max-xl:ml-0" : "ml-80 max-xl:ml-0"
        }`}
      >
        {children}
      </main>
    </SidebarProvider>
  );
}
