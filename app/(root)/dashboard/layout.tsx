import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../../components/component/dashboard-sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
interface LayoutProps {
  children: React.ReactNode;
}
export default async function Layout({ children }: LayoutProps) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const data = JSON.parse(JSON.stringify(user));  
  return (
    <SidebarProvider>
      <AppSidebar user={data} />
      <main className="w-full overflow-x-hidden container mx-auto px-4 py-2 space-y-4">
        {children}
      </main>
    </SidebarProvider>
  );
}
