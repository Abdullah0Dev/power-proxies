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
  status: "pending" | "completed" | "failed"; // Optional: Use specific statuses
  price: string; // Consider using a `number` type if it's a numeric value
  date: string; // If this is a date object, consider using `Date` instead of `string`
}

// receipt id, purpose(test, subscription), imei, status, created at
export default function PurchasesPage() {
  const [invoicesPerPage, setInvoicesPerPage] = useState<string>("10");
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLatestSubscriptionAndPayment(
        "hello@devmindslab.com"
      );

      // Map the fetched data to the Purchase interface
      const formattedPurchases = data.map((subscription: any) => ({
        receiptID: subscription.receiptID,
        purpose: subscription.purpose, // Set default to 'subscription'
        imei: subscription.imei,
        status: subscription.status,
        price: subscription.price, // You may fetch dynamic pricing based on the subscription if available
        date: subscription.date, // Convert timestamp to readable date
      }));

      setPurchases(formattedPurchases);
    };

    fetchData();
  }, []);

  // download invoice
  const downloadAsExcel = (purchase: Purchase) => {
    // define the worksheet data:
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
    // create teh worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase");
    // Genereate the file and trigger download btn
    XLSX.writeFile(workbook, `Purchase_${purchase.receiptID}.xlsx`);
  };
  return (
    <div className="space-y-8">
      <DashboardHeader title="Purchase History" />

      <h1 className="text-3xl font-bold text-blue-900"></h1>

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
              {purchases.map((purchase, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {purchase.receiptID}
                  </TableCell>
                  <TableCell>{purchase.imei}</TableCell>
                  <TableCell>{purchase.purpose}</TableCell>
                  <TableCell>{purchase.status}</TableCell>
                  <TableCell>{purchase.price}</TableCell>
                  <TableCell>{purchase.date}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
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
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
              <span className="text-sm text-gray-600">Page 1 of 1</span>
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
