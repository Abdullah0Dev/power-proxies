"use client";
import React, { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import DashboardHeader from "@/components/component/dashboard-header";
import Image from "next/image";
import {
  cancelProxySubscription,
  downgradeProxySubscription,
  fetchLatestSubscription,
  managePaymentInfo,
  upgradeProxySubscription,
} from "@/actions/getProxyList";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data for demonstration
interface Proxy {
  imei: number; // imei
  country: string;
  nick: string;
  subscription: string;
  billedTime: string;
  nextBill: string;
  timeLeft: string;
  flag: string;
  manageSubscription: string;
  status: string;
  customerID: string;
  sub: string;
  subscriptionItem: string;
}

const mockProxies = [
  {
    IMEI: 1,
    country: "United States",
    ports: 2,
    timeLeft: "15d 7h",
    flag: "US",
  },
  { IMEI: 2, country: "Germany", ports: 1, timeLeft: "3d 12h", flag: "DE" },
  { IMEI: 3, country: "Japan", ports: 3, timeLeft: "27d 5h", flag: "JP" },
  {
    IMEI: 4,
    country: "United Kingdom",
    ports: 1,

    timeLeft: "1d 3h",
    flag: "GB",
  },
  { IMEI: 5, country: "France", ports: 2, timeLeft: "8d 19h", flag: "FR" },
];

export default function ProxyRenewals() {
  const [latestSubscription, setLatestSubscription] = useState<Proxy[]>([]);
  const [selectedProxies, setSelectedProxies] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCountry, setSelectedCountry] =
    useState<string>("All Countries");
  const [showExpiringOnly, setShowExpiringOnly] = useState<boolean>(false);
  const [donglesPerPage, setDonglesPerPage] = useState<string>("5");
  const [loadingStates, setLoadingStates] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLatestSubscription("hello@devmindslab.com");
      setLatestSubscription(data);
      console.log(data);
    };

    fetchData();
  }, []);

  const handleMangeSubscription = async (customerId: string): Promise<void> => {
    try {
      setLoadingStates(true);
      const data = await managePaymentInfo(customerId);

      if (data?.url) {
        window.location.assign(data.url);
      } else {
        throw new Error("Download URL not available");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.error(errorMessage);
    } finally {
      setLoadingStates(false);
    }
  };
  const handleCancelProxySubscription = async (
    subscriptionId: string
  ): Promise<void> => {
    try {
      setLoadingStates(true);
      const data = await cancelProxySubscription(subscriptionId);
      console.log(data, "canceled");

      // return data;
    } catch (err: unknown) {
      console.log("ERROR", err);
    } finally {
      setLoadingStates(false);
    }
  };
  const handleUpgradeProxySubscription = async (
    subscriptionId: string,
    subscriptionItem: string
  ): Promise<void> => {
    try {
      setLoadingStates(true);
      const data = await upgradeProxySubscription(
        subscriptionId,
        subscriptionItem
      );
      console.log(data, "upgraded");
      // return data;
    } catch (err: unknown) {
      console.log("ERROR", err);
    } finally {
      setLoadingStates(false);
    }
  };
  const handleDowngradeProxySubscription = async (
    subscriptionId: string,
    subscriptionItem: string
  ): Promise<void> => {
    try {
      setLoadingStates(true);
      const data = await downgradeProxySubscription(
        subscriptionId,
        subscriptionItem
      );
      console.log(data, "downgraded");
      // return data;
    } catch (err: unknown) {
      console.log("ERROR", err);
    } finally {
      setLoadingStates(false);
    }
  };

  const handleProxySelect = (proxyId: number): void => {
    setSelectedProxies((prev) =>
      prev.includes(proxyId)
        ? prev.filter((id) => id !== proxyId)
        : [...prev, proxyId]
    );
  };

  const handleSelectAll = (checked: boolean): void => {
    if (checked) {
      setSelectedProxies(mockProxies.map((proxy) => proxy.IMEI));
    } else {
      setSelectedProxies([]);
    }
  };

  return (
    <>
      <DashboardHeader title="Proxy Renewals" />

      <div className="space-y-6">
        <div>
          <p className="text-gray-600">
            Manage and renew your proxies to keep them active and ensure
            uninterrupted service.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by name or country"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
                <Select
                  value={selectedCountry}
                  onValueChange={(value) => setSelectedCountry(value)}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Countries">All Countries</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="United Kingdom">
                      United Kingdom
                    </SelectItem>
                    <SelectItem value="France">France</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="expiring-soon"
                    checked={showExpiringOnly}
                    onCheckedChange={(checked) =>
                      setShowExpiringOnly(!!checked)
                    }
                  />
                  <label
                    htmlFor="expiring-soon"
                    className="text-sm text-gray-700"
                  >
                    Display Expiring Soon Only
                  </label>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 mb-6">
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => console.log("Add 30d to selected dongles")}
                disabled={selectedProxies.length === 0}
              >
                Add 30d to Selected Dongles
              </Button>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => console.log("Add 7d to selected dongles")}
                disabled={selectedProxies.length === 0}
              >
                Add 7d to Selected Dongles
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      onCheckedChange={(checked) => handleSelectAll(!!checked)}
                      checked={selectedProxies.length === mockProxies.length}
                    />
                  </TableHead>

                  <TableHead>Country</TableHead>
                  <TableHead className="min-w-[180px] text-center">
                    IMEI
                  </TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead className="min-w-[120px] ">Billed Time</TableHead>
                  <TableHead>Next Bill</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="min-w-[120px] ">Time Left</TableHead>
                  <TableHead className="text-center">
                    Subscription Details
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestSubscription.length > 0 ? (
                  latestSubscription.map((proxy) => (
                    <TableRow key={proxy.imei}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProxies.includes(proxy.imei)}
                          onCheckedChange={() => handleProxySelect(proxy.imei)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Image
                            width={320}
                            height={320}
                            src={`https://flagcdn.com/w20/${proxy.flag.toLowerCase()}.png`}
                            alt={`${proxy.country} flag`}
                            className="mr-2 h-4 w-6"
                          />
                          {proxy.country}
                        </div>
                      </TableCell>
                      <TableCell className=" text-center">{proxy.imei}</TableCell>
                      <TableCell className=" text-center">{proxy.subscription}</TableCell>
                      <TableCell className=" text-center">{proxy.billedTime}</TableCell>
                      <TableCell className=" text-center">{proxy.nextBill}</TableCell>
                      <TableCell className=" text-center">{proxy.status}</TableCell>
                      <TableCell className=" text-center">{proxy.timeLeft}</TableCell>
                      <TableCell className="flex gap-x-3">
                        <TooltipProvider>
                          {proxy.subscription === "monthly" ? (
                            <Tooltip>
                              <TooltipTrigger>
                                <Button
                                  variant="outline"
                                  className="py-px px-5"
                                  size="sm"
                                  onClick={() =>
                                    handleDowngradeProxySubscription(
                                      proxy.sub,
                                      proxy.subscriptionItem
                                    )
                                  }
                                  disabled={loadingStates}
                                >
                                  Downgrade
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Downgrade proxy plan to weekly</p>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <Tooltip>
                              <TooltipTrigger>
                                <Button
                                  onClick={() =>
                                    handleUpgradeProxySubscription(
                                      proxy.sub,
                                      proxy.subscriptionItem
                                    )
                                  }
                                  disabled={loadingStates}
                                  variant="outline"
                                  className="py-px px-8"
                                  size="sm"
                                >
                                  Upgrade
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Upgrade proxy plan to monthly</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                variant="outline"
                                className="py-px px-6"
                                size="sm"
                                disabled={loadingStates}
                                onClick={() =>
                                  handleCancelProxySubscription(proxy.sub)
                                }
                              >
                                Cancel
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Cancel Proxy Subscription</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <Button
                          onClick={() =>
                            handleMangeSubscription(proxy.customerID)
                          }
                          variant="outline"
                          className="w-[60%]"
                          size="sm"
                          disabled={loadingStates}
                        >
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No proxies found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
                <span className="text-sm text-gray-600">Page 1 of 1</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Dongles per page:</span>
                <Select
                  value={donglesPerPage}
                  onValueChange={(value) => setDonglesPerPage(value)}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="5" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
