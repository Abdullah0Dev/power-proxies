"use client";

import {
  HelpCircle,
  ShoppingBag,
  User,
  CreditCard,
  Bell,
  ChevronsUpDown,
  LogOut,
  Globe,
  Plus,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

// Types for menu items
interface MenuItem {
  title: string;
  icon: React.ElementType;
  link: string;
}

// Menu items for different sections
const proxyManagementItems: MenuItem[] = [
  { title: "Your Proxies", icon: Globe, link: "main" },
  { title: "Add New Proxies", icon: Plus, link: "/dashboard/add-proxy" },
  {
    title: "Billing & Renewals",
    icon: CreditCard,
    link: "/dashboard/proxy-renewals",
  },
];

const accountItems: MenuItem[] = [
  { title: "Your Account", icon: User, link: "/dashboard/account" },
  { title: "Purchases", icon: ShoppingBag, link: "/dashboard/purchases" },
];

const knowledgeDeskItems: MenuItem[] = [
  { title: "Contact Support", icon: HelpCircle, link: "/dashboard/support" },
];

interface AppSidebarProps {
  user: {
    firstName: string;
    lastName: string;
    imageUrl?: string;
    emailAddresses: { emailAddress: string }[];
  };
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ user }) => {
  const { open } = useSidebar();
  const pathname = usePathname();
  const pathnameList = pathname.split("/");

  const userName = `${user?.firstName} ${user?.lastName}`;
  const userEmail = user?.emailAddresses?.[0]?.emailAddress || "";
  const userImage = user?.imageUrl || "";

  const data = {
    user: {
      name: userName,
      email: userEmail,
      avatar: userImage,
    },
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-white dark:bg-darkMode-2">
        {/* Logo */}
        <div className="p-4 flex items-center gap-2">
          <Image
            priority
            src="/logo.png"
            alt="logo"
            width={45}
            height={50}
            className="max-w-full h-auto"
          />
          {open && (
            <span className="text-  font-bold text-xl">PowerProxy</span>
          )}
        </div>

        {/* Proxy Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="border-b pb-2 mb-1">
            Proxy Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {proxyManagementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.link === "main" ? "/dashboard" : item.link}
                      className={
                        item.link === "main" && pathnameList.length === 2
                          ? "text-blue-600 bg-blue-50"
                          : pathnameList.includes(item.link.split("/")[2])
                          ? "text-blue-600 bg-blue-50"
                          : "hover:text-blue-600 hover:bg-blue-50"
                      }
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="border-b pb-2 mb-1">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.link}
                      className={
                        pathnameList.includes(item.link.split("/")[2])
                          ? "text-blue-600 bg-blue-50"
                          : "hover:text-blue-600 hover:bg-blue-50"
                      }
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Knowledge Desk Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="border-b pb-2 mb-1">
            Knowledge Desk
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {knowledgeDeskItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.link}
                      className="hover:text-blue-600 hover:bg-blue-50"
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <SidebarFooter className="absolute bottom-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={data.user.avatar}
                        alt={data.user.name}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {data.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {data.user.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={data.user.avatar}
                          alt={data.user.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {data.user.name}
                        </span>
                        <span className="truncate text-xs">
                          {data.user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/dashboard/account">
                      <DropdownMenuItem>
                        <BadgeCheck />
                        Account
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/proxy-renewals">
                      <DropdownMenuItem>
                        <CreditCard />
                        Billing
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <Link href="/" onClick={() => alert("duh")}>
                    <DropdownMenuItem>
                      <LogOut />
                      Log out
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
};