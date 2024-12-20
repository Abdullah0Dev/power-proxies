"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardHeaderProps {
  title: string; // Define the expected type for the `title` prop
  handleExportProxies?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  handleExportProxies,
}) => {
  return (
    <div className="mb-4 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold flex items-center">
        <SidebarTrigger className="mx-2 text-2xl" />
        {title}
      </h1>
      {handleExportProxies && (
        <div className="flex space-x-2">
          <Button onClick={handleExportProxies}>Export Proxies</Button>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
