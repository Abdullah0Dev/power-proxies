import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};
const Header = () => {
  return (
    <div className="bg-white">
      <div className="hidden flex-col md:flex">
        <div className="flex-1 px-8  py-4">
          <div className="flex items-center justify-between space-y-2">
            <div className="flex items-center space-x-1">
              <Image src="/logo.png" width={30} height={30} alt="Dashboard" />
              <h2 className="text-3xl font-bold tracking-tight">
                PowerProxies
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/profile.png" alt="Avatar" />
                  <AvatarFallback>Sander</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-px">
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>
                  <p className="text-sm text-muted-foreground">
                    sander@proxies.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
