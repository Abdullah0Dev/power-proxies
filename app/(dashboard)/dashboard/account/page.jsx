"use client";
import React, { useState } from "react";
import { Bell, Copy, Edit, Plus, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DashboardHeader from "@/components/component/dashboard-header";

export default function AccountManagement() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [proxyUsage, setProxyUsage] = useState(
    "for Instagram & TikTok, and maybe Amazon",
  );
  const [accessedWebsites, setAccessedWebsites] = useState(
    "instagram.com, tiktok.com, amazon.com",
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // i will show a toast notification
    console.log("Copied to clipboard:", text);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                <div className="font-semibold">John Doe</div>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Email Address</Label>
                <div className="flex items-center">
                  <div className="font-semibold mr-2">johndoe@example.com</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard("johndoe@example.com")}
                  >
                    <Copy className="h-4 w-4 text-blue-600" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-600">
                  Google Authenticator
                </Label>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>
            </CardContent>
          </Card>

          {/* Billing */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-blue-900">Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" /> Add New Payment Method
              </Button>
            </CardContent>
          </Card>

          {/* Business Details */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-blue-900">Business Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-gray-600">Business Name</Label>
                <div className="flex items-center">
                  <Input defaultValue="Acme Corp" className="mr-2" />
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 text-blue-600" />
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-600">
                  Business Address
                </Label>
                <div className="flex items-center">
                  <Input
                    defaultValue="123 Main St, Anytown, USA"
                    className="mr-2"
                  />
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 text-blue-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proxy Usage */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-blue-900">Proxy Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-gray-600">
                  Purpose of using proxies
                </Label>
                <div className="flex items-center">
                  <Textarea
                    value={proxyUsage}
                    onChange={(e) => setProxyUsage(e.target.value)}
                    className="mr-2"
                  />
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 text-blue-600" />
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-600">
                  Accessed websites using proxies
                </Label>
                <div className="flex items-center">
                  <Input
                    value={accessedWebsites}
                    onChange={(e) => setAccessedWebsites(e.target.value)}
                    className="mr-2"
                  />
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 text-blue-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Crypto Deposit Address */}
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-blue-900">
                Crypto Deposit Address
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-600">Bitcoin</Label>
                <div className="flex items-center">
                  <Input
                    defaultValue="1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                    className="mr-2"
                    readOnly
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard("1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2")
                    }
                  >
                    <Clipboard className="h-4 w-4 text-blue-600" />
                  </Button>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Current Balance: $0
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-600">USDT (TRC20)</Label>
                <div className="flex items-center">
                  <Input
                    defaultValue="TKQKqHVMVVxWwgQbmKFjWNqVGZCxC3SuRL"
                    className="mr-2"
                    readOnly
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard("TKQKqHVMVVxWwgQbmKFjWNqVGZCxC3SuRL")
                    }
                  >
                    <Clipboard className="h-4 w-4 text-blue-600" />
                  </Button>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Current Balance: $0
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Affiliate Program */}
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-blue-900">Affiliate Program</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-gray-600">Affiliate Link</Label>
                <div className="flex items-center">
                  <Input
                    defaultValue="https://example.com/ref/johndoe"
                    className="mr-2"
                    readOnly
                  />
                  <Button
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
                  <Label className="text-sm text-gray-600">Invited Users</Label>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
