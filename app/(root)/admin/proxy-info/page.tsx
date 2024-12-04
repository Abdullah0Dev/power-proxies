"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Activity, Download, RotateCw, Zap } from "lucide-react";
import {
  ConnectionSpeedTestModal,
  RotateIPModal,
  SpeedTestModal,
} from "@/components/component/proxy-list-row";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Header } from "@/components/admin";
import {
  fetchAdminSideUserData,
  getProxyVPNSetting,
} from "@/actions/getProxyList";
import AdminListRow from "@/components/admin/AdminListRow";
export type UserDataType = {
  ID: string;
  assignedUser: {
    email: string | null;
    expiryDate: Date | null;
    last_sale: Date | string;
    time_left_for_user: Date | string | null;
    total_income: number;
  };
  status: string;
  validUntil: Date;
  operator: string;
  port: {
    http: number;
    socks: number;
    portID: string;
  };
  proxyCredentials: {
    username: string;
    password: string;
  };
  nickname: string;
  external_IP: string;
  added_time: string;
  network_type: string;
  is_online: string;
};
const socket = io("https://powerproxies-backups.onrender.com");
const ProxyPage = () => {
  const [usersData, setUsersData] = useState<UserDataType[]>([]);
  const [notification, setNotification] = useState("");

  interface Proxy {
    port: {
      portID: string;
    };
  } 
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handleDownloadVPNSettings = async (proxy: Proxy): Promise<void> => {
    const proxyId = proxy.port.portID;

    try {
      setLoadingStates((prev) => ({ ...prev, [proxyId]: true }));
      const data = await getProxyVPNSetting(proxyId);

      if (data?.downloadUrl) {
        window.location.assign(data.downloadUrl);
      } else {
        throw new Error("Download URL not available");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.error(errorMessage);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [proxyId]: false }));
    }
  };
 
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAdminSideUserData();
      setUsersData(response);
    };

    socket.on("payment-success", (data) => setNotification(data?.message));
    socket.on("proxy-expired", (data) => setNotification(data?.message));

    fetchData();

    return () => {
      socket.off("payment-success");
      socket.off("proxy-expired");
    };
  }, []);

  // Define msToTime with a proper type
  const msToTime = (duration: number): string => {
    const seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
      days = Math.floor(duration / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Define remainingTimeForUser with a proper return type
  const remainingTimeForUser = (index: number): string | undefined => {
    if (index < 0 || index >= usersData.length) {
      console.log("Invalid index");
      return;
    }

    const validUntil = new Date(usersData[index]?.validUntil);
    const lastSale = new Date(
      usersData[index]?.assignedUser?.last_sale ?? Date.now()
    );

    // Ensure the validUntil date is valid before calculation
    if (isNaN(validUntil.getTime())) {
      console.log("Invalid validUntil date");
      return;
    }

    // const elapsedTime = Date.now() - lastSale; // Time elapsed since last sale in milliseconds
    const remainingTime = validUntil.getTime() - Date.now(); // Time remaining until validity expires in milliseconds

    // Convert the elapsed and remaining times to a human-readable format
    const remainingTimeFormatted = msToTime(remainingTime);
    return remainingTimeFormatted;
  };
  return (
    <div className=" w-auto  h-full ">
      <Header />
      <Table className="">
        <TableCaption>
          <PaginationDemo />{" "}
        </TableCaption>
        <TableHeader>
          <TableRow className=" ">
            <TableHead className="w-[120px] text-center">Nickname</TableHead>
            <TableHead className="w-[150px] text-center">IMEI</TableHead>
            <TableHead className="min-w-[160px] text-center">
              proxy login <br /> proxy password
            </TableHead>
            <TableHead className="min-w-[150px] text-center">
              Port <br />{" "}
              <div className="flex items-center font-semibold justify-between">
                <h3> http</h3> | <h3> socks</h3>
              </div>
            </TableHead>
            <TableHead className="min-w-[120px] text-center">
              list for sale
            </TableHead>
            <TableHead className="min-w-[200px] text-center ">
              last sale
            </TableHead>
            <TableHead className="min-w-[200px] text-center ">
              time left for user
            </TableHead>
            <TableHead className="min-w-[120px] text-center">
              Total Income
            </TableHead>
            <TableHead className="min-w-[120px] text-center">status</TableHead>
            <TableHead className="min-w-[140px] text-center">
              Actions{" "}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.map((item, index) => (
            <AdminListRow index={index} key={index} item={item} usersData={usersData} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProxyPage;

function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="# " isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
