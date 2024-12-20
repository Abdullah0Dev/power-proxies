"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import TestSidebar from "@/components/admin/sidebar-test";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import AdminPage from "@/components/admin/adminPage";
import Loading from "@/components/component/Loading";

const AdminMainPage = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Fetch email from localStorage
  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await localStorage.getItem("email");
      setUserEmail(storedEmail);
    };
    fetchEmail();
  }, []);

  // If the email is still being fetched, show a loading state
  if (!userEmail) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loading />
      </div>
    );
  }
  if (userEmail !== "Sanderdeking@gmail.com") {
    redirect("/404");
  }
  const handleSidebarToggle = () => {
    setToggleCollapse((prev) => !prev);
  };

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
        <AdminPage />
      </main>
    </SidebarProvider>
  );
};
export default AdminMainPage;
