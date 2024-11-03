"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function PurchasesPage() {
  const [invoicesPerPage, setInvoicesPerPage] = useState("10");

  // Example purchases data
  const purchases = [
    {
      number: "INV-004",
      modem: "LTE-X1",
      operation: "Add-on",
      tariff: "Data Boost",
      price: "$19.99",
      date: "2024-10-22",
    },
    {
      number: "INV-005",
      modem: "5G-Pro",
      operation: "Renewal",
      tariff: "Enterprise",
      price: "$129.99",
      date: "2024-10-24",
    },
  ];

  return (
    <div className="space-y-8">
      <DashboardHeader title="Purchase History" />

      <h1 className="text-3xl font-bold text-blue-900"></h1>

      <Card className="w-11/12 mx-auto">
        <CardHeader>
          <CardTitle className="text-blue-900">Your Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Number</TableHead>
                <TableHead>Modem</TableHead>
                <TableHead>Operation</TableHead>
                <TableHead>Tariff</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((purchase, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {purchase.number}
                  </TableCell>
                  <TableCell>{purchase.modem}</TableCell>
                  <TableCell>{purchase.operation}</TableCell>
                  <TableCell>{purchase.tariff}</TableCell>
                  <TableCell>{purchase.price}</TableCell>
                  <TableCell>{purchase.date}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
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
                onValueChange={setInvoicesPerPage}
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
