"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProxyListRow from "@/components/component/proxy-list-row";
import DashboardHeader from "@/components/component/dashboard-header";
import { ProxyData } from "@/types";
import { fetchClientPurchasedProxies } from "@/actions/getProxyList";
import Loading from "./component/Loading";

const CACHE_KEY = "clientProxies";
const CACHE_EXPIRY_TIME = 1000 * 60; // 1 hour in milliseconds

const ProxyListTable: FC = () => {
  const [clientProxies, setClientProxies] = useState<ProxyData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);

        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          const cacheTimestamp = parsedData.timestamp;

          // Check if cache has expired
          if (Date.now() - cacheTimestamp < CACHE_EXPIRY_TIME) {
            // Use cached data if it's not expired
            setClientProxies(parsedData.proxyData);
            setIsLoading(false);
            return;
          }
        }

        // Fetch new data if no cache or cache has expired
        const fetchedProxies = await fetchClientPurchasedProxies();
        const proxyData = fetchedProxies[0]?.proxyData || [];

        // Store fetched data in localStorage with timestamp
        const cacheData = {
          proxyData: proxyData,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

        setClientProxies(proxyData);
      } catch (error) {
        console.error("Error fetching proxies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <DashboardHeader title="Proxy List" />
      <div className="custom-scrollbar overflow-x-auto dark:bg-darkMode-1 bg-white rounded-lg shadow">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loading />
          </div>
        ) : clientProxies.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-darkMode-2">
                <TableHead className="py-4 px-6">ID</TableHead>
                <TableHead className="py-4 px-6">Status</TableHead>
                <TableHead className="py-4 px-6">Operator</TableHead>
                <TableHead className="py-4 px-6">External IP</TableHead>
                <TableHead className="py-4 px-14">Ports</TableHead>
                <TableHead className="py-4 px-6">Username/Password</TableHead>
                <TableHead className="py-4 px-6">Network Type</TableHead>
                <TableHead className="py-4 px-6 w-48">Added Time</TableHead>
                <TableHead className="py-4 px-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientProxies.map((proxy, index) => (
                <ProxyListRow key={index} proxy={proxy} />
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex justify-center items-center min-h-[60vh]">
            <p className="text-gray-500 dark:text-gray-400">
              No proxies found.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProxyListTable;
