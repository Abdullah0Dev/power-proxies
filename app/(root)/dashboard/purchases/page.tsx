"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeader from "@/components/component/dashboard-header";
import { fetchLatestSubscriptionAndPayment } from "@/actions/getProxyList";

// Define the structure of a purchase
interface Purchase {
  receiptID: string;
  purpose: "test" | "subscription";
  imei: string;
  status: "pending" | "completed" | "failed";
  price: string;
  date: string;
}

export default function PurchasesPage() {
  const [invoicesPerPage, setInvoicesPerPage] = useState<string>("5");
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem("purchases");
      const cacheTime = localStorage.getItem("cacheTime");
      const currentTime = new Date().getTime();
      const cacheValidity = 60 * 1000; // Cache valid for 1 minute

      if (cachedData && cacheTime && currentTime - parseInt(cacheTime) < cacheValidity) {
        setPurchases(JSON.parse(cachedData));
      } else {
        const data = await fetchLatestSubscriptionAndPayment("hello@devmindslab.com");

        const formattedPurchases = data.map((subscription: any) => ({
          receiptID: subscription.receiptID,
          purpose: subscription.purpose,
          imei: subscription.imei,
          status: subscription.status,
          price: subscription.price,
          date: subscription.date,
        }));

        setPurchases(formattedPurchases);
        localStorage.setItem("purchases", JSON.stringify(formattedPurchases));
        localStorage.setItem("cacheTime", currentTime.toString());
      }
    };

    fetchData();
  }, []);

  const downloadAsExcel = (purchase: Purchase) => {
    const worksheetData = [
      {
        "Receipt ID": purchase.receiptID,
        Purpose: purchase.purpose,
        IMEI: purchase.imei,
        Status: purchase.status,
        Price: purchase.price,
        Date: purchase.date,
      },
    ];
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase");
    XLSX.writeFile(workbook, `Purchase_${purchase.receiptID}.xlsx`);
  };

  const filteredPurchases = purchases.filter((purchase) =>
    purchase.receiptID.toLowerCase().includes(searchTerm.toLowerCase()) ||
    purchase.imei.toLowerCase().includes(searchTerm.toLowerCase()) ||
    purchase.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
    purchase.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPurchases.length / Number(invoicesPerPage));
  const paginatedPurchases = filteredPurchases.slice(
    (currentPage - 1) * Number(invoicesPerPage),
    currentPage * Number(invoicesPerPage)
  );

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="space-y-8">
      <DashboardHeader title="Purchase History" />
 

      <Card className="w-12/12 mx-auto">
        <CardHeader>
          <CardTitle className="text-blue-900">Your Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Receipt ID</TableHead>
                <TableHead>IMEI</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPurchases.map((purchase, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{purchase.receiptID}</TableCell>
                  <TableCell>{purchase.imei}</TableCell>
                  <TableCell>{purchase.purpose}</TableCell>
                  <TableCell>{purchase.status}</TableCell>
                  <TableCell>{purchase.price}</TableCell>
                  <TableCell>{purchase.date}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="border-blue-600/50 border text-blue-600 dark:hover:text-blue-500 dark:hover:bg-transparent hover:bg-blue-50"
                      onClick={() => downloadAsExcel(purchase)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Invoice
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-600 dark:hover:text-blue-500 dark:hover:bg-transparent hover:bg-blue-50"
                disabled={currentPage === 1}
                onClick={() => handlePageChange("prev")}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-600 dark:hover:text-blue-500 dark:hover:bg-transparent hover:bg-blue-50"
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
              <p className="text-sm text-gray-600">Invoices per page</p>
              <Select
                value={invoicesPerPage}
                onValueChange={(value) => setInvoicesPerPage(value)}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder={invoicesPerPage} />
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
  );
}
