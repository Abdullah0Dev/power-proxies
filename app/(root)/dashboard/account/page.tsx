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
import Image from "next/image";
import Loading from "@/components/component/Loading";

export default function AccountManagement() {
  const [copied, setCopied] = useState(false);
  const [userData, setUserData] = useState<{
    fullName: string;
    userImage: string;
    userEmail: string;
    isGoogleAuth: boolean;
  } | null>(null); // Set initial value as null

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData)); // Parse the data into an object
    }
    // console.log(storedUserData);
    
  }, []);

  if (!userData)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loading />
      </div>
    ); // Show loading state if userData is null

  // Destructure the user data
  const { fullName, userEmail, isGoogleAuth } = userData;

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
                <div className="font-semibold">{fullName}</div>
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
              <Image
                width={500}
                height={500}
                src="/comming-soon.png"
                className="absolute w-auto h-auto inset-0 m-auto object-contain opacity-75"
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
