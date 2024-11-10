"use client";
import React from "react";
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
const ProxyPage = () => {
  return (
    <div className=" w-auto  h-full ">
        <Header />
      <Table className="">
        <TableCaption>
          <PaginationDemo />{" "}
        </TableCaption>
        <TableHeader>
          {/* Nickname, Country, IMEI, proxy login/password, port { http, socks}, list for sale(true/false), last sale, time left for user, Total Income, status, Actions{quite, rotate ip} */}
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((_, index) => (
            <TableRow key={index} className="text-center">
              <TableCell className="font-medium">innocent_officer</TableCell>
              <TableCell>860191063638015</TableCell>
              <TableCell>
                abdullah <br />
                server
              </TableCell>
              <TableCell className=" ">
                <div className="flex items-center  justify-between">
                  <h3> 8003</h3> <h3> 5003</h3>
                </div>
              </TableCell>
              <TableCell>
                {" "}
                <Switch defaultChecked />{" "}
              </TableCell>
              <TableCell>5-10-2024, 10:30</TableCell>
              <TableCell>29 days, 12 hours</TableCell>
              <TableCell>$1200</TableCell>
              <TableCell className="text-blue-300">In Use</TableCell>
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
                  username={"asdf"}
                  password={"asdf"}
                  ipAddress={"asdf"}
                  port={"asdf"}
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
