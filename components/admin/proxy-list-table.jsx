import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Check,
  Wifi,
  Trash,
  MoreVertical,
  Edit,
  Download,
  Power,
  RotateCw,
  Plus,
  X,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
const ProxyListTable = ({ proxies }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead className="w-[200px]">IMEI / Actions</TableHead>
          <TableHead>Nick</TableHead>
          <TableHead>Ext IP</TableHead>
          <TableHead>Ports</TableHead>
          <TableHead>Model, Device</TableHead>
          <TableHead>SIM, Carrier</TableHead>
          <TableHead>Net Mode</TableHead>
          <TableHead>Signal, Data</TableHead>
          <TableHead>Modem IP</TableHead>
          <TableHead>Country</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {proxies.map((proxy, index) => (
          <TableRow
            key={index}
            className="hover:bg-blue-50 transition-colors duration-200"
          >
            <TableCell>
              <div className="flex flex-col space-y-1">
                <div className="font-medium text-center">
                  {proxy.modem_details.IMEI}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit Modem
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-600 hover:text-green-700 hover:bg-green-100"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Port
                  </Button>
                </div>
              </div>
            </TableCell>
            <TableCell>{proxy.modem_details.NICK}</TableCell>
            <TableCell className="font-mono">
              {proxy.net_details.EXT_IP}
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  HTTP {proxy.proxy_creds.HTTP_PORT}
                </Badge>
                {proxy.proxy_creds.SOCKS_PORT && (
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800"
                  >
                    SOCKS {proxy.proxy_creds.SOCKS_PORT}
                  </Badge>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-100"
                >
                  Port Bandwidth
                </Button>
              </div>
            </TableCell>
            <TableCell>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="underline decoration-dotted">
                    {proxy.modem_details.MODEL}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{proxy.modem_details.MODEL_SHOWN}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Check className="text-green-500" />
                <span>{proxy.net_details.CELLOP}</span>
              </div>
            </TableCell>
            <TableCell>{proxy.net_details.CurrentNetworkType}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Wifi
                    key={i}
                    className={`h-4 w-4 ${
                      i < parseInt(proxy.net_details.SIGNAL_STRENGTH)
                        ? "text-blue-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-1 font-medium">
                  {proxy.net_details.SIGNAL_STRENGTH}
                </span>
              </div>
            </TableCell>
            <TableCell className="font-mono">
              {proxy.net_details.LOCAL_IP}
            </TableCell>
            <TableCell>{proxy.net_details.COUNTRY}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={
                          proxy.IS_LOCKED === "true"
                            ? "text-red-500 hover:text-red-600 hover:bg-red-100"
                            : "text-green-500 hover:text-green-600 hover:bg-green-100"
                        }
                      >
                        {proxy.IS_LOCKED === "true" ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {proxy.IS_LOCKED === "true" ? "Locked" : "Unlocked"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={
                          proxy.IS_REBOOTING === "true"
                            ? "text-yellow-500 hover:text-yellow-600 hover:bg-yellow-100"
                            : "text-green-500 hover:text-green-600 hover:bg-green-100"
                        }
                      >
                        <Power className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {proxy.IS_REBOOTING === "true" ? "Rebooting" : "Stable"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={
                          proxy.IS_ROTATED === "true"
                            ? "text-blue-500 hover:text-blue-600 hover:bg-blue-100"
                            : "text-green-500 hover:text-green-600 hover:bg-green-100"
                        }
                      >
                        <RotateCw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {proxy.IS_ROTATED === "true"
                          ? "Rotated"
                          : "Not Rotated"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-100"
                >
                  <Trash className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-500 hover:text-blue-600 hover:bg-blue-100"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-green-500 hover:text-green-600 hover:bg-green-100"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProxyListTable;
