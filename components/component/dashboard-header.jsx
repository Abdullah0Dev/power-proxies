"use client";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

const DashboardHeader = ({ title }) => {
  return (
    <div className="mb-4 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold flex items-center">
        <SidebarTrigger className="mx-2 text-2xl" />
        {title}
      </h1>
      <div className="flex space-x-2">
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            Balance: <span className="font-semibold">$0</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-black border-white hover:bg-blue-800"
          >
            Add Funds
          </Button>
          <Button
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
