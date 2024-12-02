"use client";

import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import {
  Bell,
  Copy,
  Edit,
  Plus,
  Clipboard,
  Check,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DashboardHeader from "@/components/component/dashboard-header";
import { ToastContainer, toast } from "react-toastify";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdOutlineManageHistory } from "react-icons/md";
import Link from "next/link";
import { UserResource } from "@clerk/types";

interface AccountManagementProps {
  user: UserResource;
}

export default function AccountManagement({ user }: AccountManagementProps) {
  const [copied, setCopied] = useState(false);
  // const userEmail = user.primaryEmailAddress.emailAddress;
  const userImage = user?.imageUrl;
  const userName = user?.firstName + " " + user?.lastName;
  const userEmail = user?.emailAddresses[0].emailAddress;
  console.log(userImage, userName, userEmail);
  // Check if the user signed in with Google
  const externalAccounts = user.externalAccounts || [];
  const isGoogleAuth = user?.externalAccounts?.some(
    (identity) =>
      identity?.verification !== null &&
      identity?.verification?.strategy === "oauth_google"
  );
  const hasPassword = user.passwordEnabled;

  console.log("User data:", user);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [proxyUsage, setProxyUsage] = useState(
    "for Inow tostagram & TikTok, and maybe Amazon"
  );
  const [accessedWebsites, setAccessedWebsites] = useState(
    "instagram.com, tiktok.com, amazon.com"
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    // i will show a toast notification
    console.log("Copied to clipboard:", text);
    toast(`${text} copied`);

    // revert it to false
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen light:bg-gray-50">
      <DashboardHeader title="Account" />
      <div className="max-w-7xl mx-auto  p-8">
        {/* Top Bar */}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Login Details */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-blue-900">Login Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-gray-600">Account Name</Label>
                <div className="font-semibold">{userName}</div>
              </div>
              <Label className="text-sm text-gray-600">Address</Label>
              <div className="flex items-center">
                <div className="font-semibold mr-2">{userEmail}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(userEmail)}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600  " />
                  ) : (
                    <Copy className="h-4 w-4 text-blue-600" />
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-600">
                  Google Authenticator
                </Label>
                <Switch
                  checked={isGoogleAuth}
                  // className="cursor-default"
                  // onCheckedChange={setTwoFactorEnabled}
                />
              </div>

              <div>
                <Label className="text-sm text-gray-600">
                  Account Password
                </Label>
                <div className="flex items-center">
                  <Input
                    defaultValue="**********"
                    className="mr-2 focus:border-none cursor-not-allowed"
                    // readOnly
                    disabled
                  />
                  {/* TooltipTrigger does makes the error when you make button inside */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="hover:bg-gray-800 rounded-sm p-2">
                        <Link href={`/forgot-password`} passHref>
                          <RefreshCcw className="h-4 w-4 text-blue-600" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Reset Password</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-blue-900">Billing</CardTitle>
            </CardHeader>
            {/*  /dashboard/proxy-renewals */}
            <CardContent>
              <Link href={`/dashboard/proxy-renewals`} passHref>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <MdOutlineManageHistory className="mr-2 h-4 w-4" /> Manage
                  Billing
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Affiliate Program */}
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-blue-900">Affiliate Program</CardTitle>
            </CardHeader>
            <CardContent
              aria-disabled
              className="space-y-4 relative overflow-clip"
            >
              <img
                src="/comming-soon.png"
                className="absolute inset-0 m-auto scale-75  object-contain opacity-75"
                alt="Coming Soon"
              />
              <div className="blur-sm">
                <div>
                  <Label className="text-sm text-gray-600">
                    Affiliate Link
                  </Label>
                  <div className="flex items-center ">
                    <Input
                      defaultValue="https://example.com/ref/johndoe"
                      className="mr-2"
                      disabled
                      readOnly
                    />
                    <Button
                      disabled
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard("https://example.com/ref/johndoe")
                      }
                    >
                      <Clipboard className="h-4 w-4 text-blue-600" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">
                      Invited Users
                    </Label>
                    <div className="font-semibold">0</div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      Total Available Payout
                    </Label>
                    <div className="font-semibold">$0</div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">
                      Current Affiliate Bonus
                    </Label>
                    <div className="font-semibold">0%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          stacked
          theme="light"
        />
      </div>
    </div>
  );
}
