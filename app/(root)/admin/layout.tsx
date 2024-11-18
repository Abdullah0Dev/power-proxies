"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import TestSidebar from "@/components/admin/sidebar-test";

import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const handleSidebarToggle = () => {
    setToggleCollapse((prev) => !prev);
  };
  return (
    <>
      <SidebarProvider className="flex ">
        <TestSidebar
          toggleCollapse={toggleCollapse}
          onToggleCollapse={handleSidebarToggle}
        />
        <main
          className={`flex-1 overflow-y-auto  transition-all duration-300 ${
            toggleCollapse ? "ml-20 max-xl:ml-0" : "ml-80  max-xl:ml-0"
          }`}
        >
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
