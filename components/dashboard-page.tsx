"use client";
import * as XLSX from "xlsx";
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

const ProxyListTable: FC = () => {
  const [clientProxies, setClientProxies] = useState<ProxyData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch new data if no cache or cache has expired
        const fetchedProxies = await fetchClientPurchasedProxies();
        const proxyData = fetchedProxies[0]?.proxyData || [];

        setClientProxies(proxyData);
      } catch (error) {
        console.error("Error fetching proxies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadAsExcel = (purchasedProxy: ProxyData[]) => {
    const worksheetData = purchasedProxy.map((proxy) => ({
      "Receipt ID": proxy.ID,
      status: proxy.status,
      Operator: proxy.operator,
      "Network Type	": proxy.network_type,
      "External IP": proxy.external_IP,
      "Ports HTTP": proxy.port.http,
      "Ports SOCKS": proxy.port.socks,
      "Proxy Username": proxy.proxyCredentials.username,
      "Proxy Password": proxy.proxyCredentials.password,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "purchasedProxy");
    XLSX.writeFile(workbook, `purchasedProxies_${new Date().toISOString()}.xlsx`);
  };
  console.log("client data:", clientProxies);

  return (
    <>
      <DashboardHeader
        title="Proxy List"
        handleExportProxies={() => downloadAsExcel(clientProxies)}
      />
      <div className="custom-scrollbar overflow-x-auto dark:bg-darkMode-1 bg-white rounded-lg shadow">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loading />
          </div>
        ) : clientProxies?.length > 0 ? (
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
