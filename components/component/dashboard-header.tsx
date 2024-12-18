"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardHeaderProps {
  title: string; // Define the expected type for the `title` prop
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  return (
    <div className="mb-4 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold flex items-center">
        <SidebarTrigger className="mx-2 text-2xl" />
        {title}
      </h1>
      <div className="flex space-x-2">
        <div className="flex items-center space-x-4">
          <div className="text-sm">
          
          </div>
          <Button
            asChild={true}
            variant="outline"
            size="sm"
            className="text-black dark:text-white dark:bg-darkMode-2/80 dark:border-none dark:hover:bg-darkMode-2/90 border-white hover:bg-blue-800 hover:text-white"
          >
            Add Funds
          </Button>
          <Button
            asChild={true}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-blue-800"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
