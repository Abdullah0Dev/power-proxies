import React, { useState } from "react";
import { Metadata } from "next";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

// Metadata
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

const Header = () => {
  // Initial server selection
  const [selectedServer, setSelectedServer] = useState("server1");

  // List of available servers
  const servers = [
    { id: "server1", name: "Server 1" },
    { id: "server2", name: "Server 2" },
    { id: "server3", name: "Server 3" },
  ];

  // Function to handle server change
  const handleServerChange = async (serverId: string) => {
    // Update selected server in frontend state
    setSelectedServer(serverId);

    try {
      // Sending POST request to switch server
      const response = await fetch("/api/switch-server", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serverId }),
      });

      const data = await response.json();

      if (data.success) {
        // If server switch is successful, log success message
        console.log("Server switched successfully to", serverId);
      } else {
        // If switch fails, log error
        console.error("Failed to switch server");
      }
    } catch (error) {
      // Handle any errors during the fetch process
      console.error("Error switching server:", error);
    }
  };

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex">
          <div className="flex-1 px-8 py-4">
            <div className="flex items-center justify-end space-y-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/profile.png" alt="Avatar" />
                    <AvatarFallback>Sander</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-px">
                    <p className="text-sm font-medium leading-none">
                      Sofia Davis - {selectedServer}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      sander@proxies.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Switch Server</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {servers.map((server) => (
            <DropdownMenuItem
              key={server.id}
              onClick={() => handleServerChange(server.id)}
            >
              {server.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
