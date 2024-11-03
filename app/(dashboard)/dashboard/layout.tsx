import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../../components/component/dashboard-sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full overflow-x-hidden container mx-auto px-4 py-2 space-y-4">
        {children}
      </main>
    </SidebarProvider>
  );
}
