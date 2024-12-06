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

const CACHE_KEY = "proxyRenewalsData";
const CACHE_EXPIRY_TIME = 1000 * 60; // 1 minute in milliseconds

export default function ProxyRenewals() {
  const [latestSubscription, setLatestSubscription] = useState<Proxy[]>([]);
  const [selectedProxies, setSelectedProxies] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCountry, setSelectedCountry] =
    useState<string>("All Countries");
  const [donglesPerPage, setDonglesPerPage] = useState<string>("5");
  const [loadingStates, setLoadingStates] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);

        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          const cacheTimestamp = parsedData.timestamp;

          // Use cached data if it's not expired
          if (Date.now() - cacheTimestamp < CACHE_EXPIRY_TIME) {
            setLatestSubscription(parsedData.proxyData);
            setLoading(false);
            return;
          }
        }

        // Fetch new data if no cache or cache expired
        const data = await fetchLatestSubscription("hello@devmindslab.com");
        setLatestSubscription(data);
        const cacheData = {
          proxyData: data,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      } catch (error) {
        console.error("Error fetching proxies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh every 1 minute
    const intervalId = setInterval(fetchData, CACHE_EXPIRY_TIME);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
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
      setSelectedProxies(filteredProxies.map((proxy) => proxy.imei));
    } else {
      setSelectedProxies([]);
    }
  };
  const filteredProxies = latestSubscription.filter(
    (proxy) =>
      proxy.imei.toString().includes(searchTerm) ||
      proxy.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProxies.length / Number(donglesPerPage));
  const paginatedProxies = filteredProxies.slice(
    (currentPage - 1) * Number(donglesPerPage),
    currentPage * Number(donglesPerPage)
  );

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
                    placeholder="Search by IMEI or country"
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
                    <SelectItem value="Netherlands">Netherlands</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      onCheckedChange={(checked) => handleSelectAll(!!checked)}
                      checked={
                        selectedProxies.length === filteredProxies.length
                      }
                    />
                  </TableHead>

                  <TableHead>Country</TableHead>
                  <TableHead className="min-w-[180px] text-center">
                    IMEI
                  </TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead className="min-w-[120px] text-center ">
                    Billed Time
                  </TableHead>
                  <TableHead>Next Bill</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="min-w-[120px] text-center ">
                    Time Left
                  </TableHead>
                  <TableHead className="text-center">
                    Subscription Details
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredProxies.length > 0 ? (
                  paginatedProxies.map((proxy) => (
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
                      <TableCell className=" text-center">
                        {proxy.imei}
                      </TableCell>
                      <TableCell className=" text-center">
                        {proxy.subscription}
                      </TableCell>
                      <TableCell className=" text-center">
                        {proxy.billedTime}
                      </TableCell>
                      <TableCell className=" text-center">
                        {proxy.nextBill}
                      </TableCell>
                      <TableCell className=" text-center">
                        {proxy.status}
                      </TableCell>
                      <TableCell className=" text-center">
                        {proxy.timeLeft}
                      </TableCell>
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
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange("prev")}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange("next")}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
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
