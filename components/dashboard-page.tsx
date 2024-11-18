"use client";
import React, { FC, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ProxyListRow from "@/components/component/proxy-list-row";
import DashboardHeader from "@/components/component/dashboard-header";
import { ProxyListTableProps } from "@/types";
import { fetchClientPurchasedProxies } from "@/actions/getProxyList";

const ProxyListTable: FC<ProxyListTableProps> = ({
  proxies,
  activeUserInfo,
}) => {
  const [clientProxies, setClientProxies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientProxies = await fetchClientPurchasedProxies(); // Wait for the promise to resolve
        console.log("Here we gooo", clientProxies);
        console.log("Proxy Data:", clientProxies[0]?.proxyData); // Access proxyData safely
        setClientProxies(clientProxies[0]?.proxyData);
      } catch (error) {
        console.error("Error fetching proxies:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <DashboardHeader title="Proxy List" />
      <div className="custom-scrollbar overflow-x-auto dark:bg-darkMode-1 bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-darkMode-2">
              <TableHead className="py-4 px-6">ID</TableHead>
              <TableHead className="py-4 px-6">Status</TableHead>
              <TableHead className="py-4 px-6">Operator</TableHead>
              <TableHead className="py-4 px-6">External IP</TableHead>
              <TableHead className="py-4  px-14">Ports</TableHead>
              <TableHead className="py-4 px-6">Username/Password</TableHead>
              <TableHead className="py-4 px-6">Network Type</TableHead> 
              <TableHead className="py-4 px-6 w-48">Added Time</TableHead>
              <TableHead className="py-4 px-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proxies.map((proxy, index) => (
              <ProxyListRow
                key={index}
                activeUserInfo={activeUserInfo ?? []}
                proxyData={proxy}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4 px-4">
        <div className="text-sm text-gray-600">
          Showing 1 to {proxies.length} of {proxies.length} entries
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            disabled
            className="text-gray-400 border-gray-300"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="text-blue-600 border-blue-300 hover:bg-blue-50"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProxyListTable;
