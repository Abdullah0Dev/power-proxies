"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
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
import { fetchAdminSideUserData } from "@/actions/getProxyList";
type UserDataType = {
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
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAdminSideUserData();
      socket.on("payment-success", (data) => {
        console.log("notification received", data);
        setNotification(data?.message);
        // cleanup on component unmount
        return () => {
          socket.off("payment-success");
        };
      });
      socket.on("proxy-expired", (data) => {
        console.log("notification received", data);
        setNotification(data?.message);
        // cleanup on component unmount
        return () => {
          socket.off("proxy-expired");
        };
      });
      console.log(`users data`, response);
      setUsersData(response);
    };
    fetchData();
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
            <TableRow key={index} className="text-center">
              <TableCell className="font-medium">{item?.nickname}</TableCell>
              <TableCell>{item?.ID}</TableCell>
              <TableCell>
                {item?.proxyCredentials?.username} <br />
                {item?.proxyCredentials?.password}
              </TableCell>
              <TableCell className=" ">
                <div className="flex items-center  justify-between">
                  <h3> {item?.port?.http}</h3> <h3> {item?.port?.socks}</h3>
                </div>
              </TableCell>
              <TableCell>
                {" "}
                <Switch defaultChecked={item?.status === "available"} />{" "}
              </TableCell>
              <TableCell>
                {item?.assignedUser?.last_sale &&
                typeof item?.assignedUser?.last_sale === "string"
                  ? // Ensure `split("T")[1]` exists before trying to split it further
                    item?.assignedUser?.last_sale
                      .split("T")[1]
                      ?.split(".")[0] || "No time available"
                  : "No recent sales"}
              </TableCell>
              {/* time_left_for_user */}
              <TableCell>
                {" "}
                {item.status === "in-use"
                  ? remainingTimeForUser(index)
                  : "available"}
              </TableCell>
              <TableCell>$ {item?.assignedUser?.total_income}</TableCell>
              <TableCell className="text-blue-300">{item?.status}</TableCell>
              {/* actions */}
              <TableCell className="py-4">
                <div className="flex items-center space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-green-100 text-green-600 hover:bg-green-200 shadow-sm"
                          onClick={() => console.log("log testing")}
                        >
                          <Activity className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Speed Test</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-sm"
                          onClick={() => console.log("log testing")}
                        >
                          <Zap className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Connection Speed Test</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-purple-100 text-purple-600 hover:bg-purple-200 shadow-sm"
                          onClick={() => console.log("log testing")}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Download VPN Settings</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-orange-100 text-orange-600 hover:bg-orange-200 shadow-sm"
                          onClick={() => console.log("log testing")}
                        >
                          <RotateCw className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Rotate IP</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <SpeedTestModal
                  isOpen={false}
                  onClose={() => console.log("on close")}
                  imei={"asdf"}
                />
                <ConnectionSpeedTestModal
                  isOpen={false}
                  onClose={() => console.log("on close")}
                  imei={"asdf"}
                />
                <RotateIPModal
                  isOpen={false}
                  imei={"asdf"}
                  onClose={() => console.log("on close")}
                />
              </TableCell>
            </TableRow>
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
