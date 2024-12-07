import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Activity, Zap, Download, RotateCw } from "lucide-react";
import {
  SpeedTestModal,
  ConnectionSpeedTestModal,
  RotateIPModal,
} from "../component/proxy-list-row";
import { getProxyVPNSetting } from "@/actions/getProxyList";
import { UserDataType } from "@/app/(root)/admin/proxy-info/page";

interface Proxy {
  port: {
    portID: string;
  };
}

interface ErrorState {
  message: string;
}

interface User {
  nickname: string;
  ID: string;
  proxyCredentials?: {
    username: string;
    password: string;
  };
  port: {
    http: string;
    socks: string;
    portID: string;
  };
  status: string;
  assignedUser?: {
    last_sale?: string;
    total_income?: number;
  };
  validUntil?: string;
}

interface AdminListRowProps {
  item: UserDataType;
  index: number;
  usersData: UserDataType[];
}

const AdminListRow: React.FC<AdminListRowProps> = ({
  item,
  index,
  usersData,
}) => {
  const [notification, setNotification] = useState<string>("");
  const [rotateModalOpen, setRotateModalOpen] = useState<boolean>(false);
  const [speedTestModalOpen, setSpeedTestModalOpen] = useState<boolean>(false);
  const [connectionTestModalOpen, setConnectionTestModalOpen] =
    useState<boolean>(false);
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

  const isButtonLoading = (proxyId: string): boolean =>
    !!loadingStates[proxyId];

  const msToTime = (duration: number): string => {
    const seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
      days = Math.floor(duration / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const remainingTimeForUser = (index: number): string | undefined => {
    if (index < 0 || index >= usersData.length) {
      console.log("Invalid index");
      return;
    }

    const validUntil = new Date(usersData[index]?.validUntil);
    const lastSale = new Date(
      usersData[index]?.assignedUser?.last_sale ?? Date.now()
    );

    if (isNaN(validUntil.getTime())) {
      console.log("Invalid validUntil date");
      return;
    }

    const remainingTime = validUntil.getTime() - Date.now();
    const remainingTimeFormatted = msToTime(remainingTime);
    return remainingTimeFormatted;
  };
  const lastSale = (index: number) => {
    if(usersData[index]?.assignedUser?.last_sale !== null) {
      const lastSaleTime = new Date(
        usersData[index]?.assignedUser?.last_sale ?? Date.now()
      );
      return lastSaleTime.toDateString();
    }else {
      return "No return sales"
    }
 
  };

  const lastSaleTime = new Date(
    usersData[4]?.assignedUser?.last_sale ?? Date.now()
  );
  return (
    <TableRow className="text-center">
      <TableCell className="font-medium">{item?.nickname}</TableCell>
      <TableCell>{item?.ID}</TableCell>
      <TableCell>
        {item?.proxyCredentials?.username} <br />
        {item?.proxyCredentials?.password}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-between">
          <h3>{item?.port?.http}</h3> <h3>{item?.port?.socks}</h3>
        </div>
      </TableCell>
      <TableCell>
        <Switch defaultChecked={item?.status === "available"} />
      </TableCell>
      <TableCell>
        {/* {typeof item?.assignedUser?.last_sale === "string" &&
        item?.assignedUser?.last_sale
          ? item?.assignedUser?.last_sale.split("T")[1]?.split(".")[0] ||
            "No time available"
          : "No recent sales"} */}
        {lastSale(index)}
      </TableCell>
      <TableCell>
        {item.status === "in-use" ? remainingTimeForUser(index) : "available"}
      </TableCell>
      <TableCell>$ {item?.assignedUser?.total_income}</TableCell>
      <TableCell className="text-blue-300">{item?.status}</TableCell>
      <TableCell className="py-4">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-green-100 text-green-600 hover:bg-green-200 shadow-sm"
                  onClick={() => setSpeedTestModalOpen(true)}
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
                  onClick={() => setConnectionTestModalOpen(true)}
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
                  onClick={() => handleDownloadVPNSettings(item)}
                  disabled={isButtonLoading(item?.port?.portID)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isButtonLoading(item.port.portID)
                    ? "Downloading..."
                    : "Download VPN Settings"}
                </p>
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
                  onClick={() => setRotateModalOpen(true)}
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
          isOpen={speedTestModalOpen}
          onClose={() => setSpeedTestModalOpen(false)}
          imei={item.ID}
        />
        <ConnectionSpeedTestModal
          isOpen={connectionTestModalOpen}
          onClose={() => setConnectionTestModalOpen(false)}
          imei={item.ID}
        />
        <RotateIPModal
          isOpen={rotateModalOpen}
          imei={item.ID}
          onClose={() => setRotateModalOpen(false)}
        />
      </TableCell>
    </TableRow>
  );
};

export default AdminListRow;
