"use client";
import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import DashboardHeader from "@/components/component/dashboard-header";

// Mock data for demonstration
const mockProxies = [
  { id: 1, country: "United States", ports: 2, timeLeft: "15d 7h", flag: "US" },
  { id: 2, country: "Germany", ports: 1, timeLeft: "3d 12h", flag: "DE" },
  { id: 3, country: "Japan", ports: 3, timeLeft: "27d 5h", flag: "JP" },
  { id: 4, country: "United Kingdom", ports: 1, timeLeft: "1d 3h", flag: "GB" },
  { id: 5, country: "France", ports: 2, timeLeft: "8d 19h", flag: "FR" },
];

export default function ProxyRenewals() {
  const [selectedProxies, setSelectedProxies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [showExpiringOnly, setShowExpiringOnly] = useState(false);
  const [donglesPerPage, setDonglesPerPage] = useState("5");

  const handleProxySelect = (proxyId) => {
    setSelectedProxies((prev) =>
      prev.includes(proxyId)
        ? prev.filter((id) => id !== proxyId)
        : [...prev, proxyId],
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProxies(mockProxies.map((proxy) => proxy.id));
    } else {
      setSelectedProxies([]);
    }
  };

  return (
    <>
      <DashboardHeader title="Proxy Renewals" />

      <div className="space-y-6">
        <div>
          <p className="text-gray-600">
            Manage and renew your proxies to keep them active and ensure
            uninterrupted service.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by name or country"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
                <Select
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Countries">All Countries</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="United Kingdom">
                      United Kingdom
                    </SelectItem>
                    <SelectItem value="France">France</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="expiring-soon"
                    checked={showExpiringOnly}
                    onCheckedChange={(checked) => setShowExpiringOnly(checked)}
                  />
                  <label
                    htmlFor="expiring-soon"
                    className="text-sm text-gray-700"
                  >
                    Display Expiring Soon Only
                  </label>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 mb-6">
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => console.log("Add 30d to selected dongles")}
                disabled={selectedProxies.length === 0}
              >
                Add 30d to Selected Dongles
              </Button>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => console.log("Add 7d to selected dongles")}
                disabled={selectedProxies.length === 0}
              >
                Add 7d to Selected Dongles
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      onCheckedChange={handleSelectAll}
                      checked={selectedProxies.length === mockProxies.length}
                    />
                  </TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Ports</TableHead>
                  <TableHead>Time Left</TableHead>
                  <TableHead>Renew One Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProxies.length > 0 ? (
                  mockProxies.map((proxy) => (
                    <TableRow key={proxy.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProxies.includes(proxy.id)}
                          onCheckedChange={() => handleProxySelect(proxy.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <img
                            src={`https://flagcdn.com/w20/${proxy.flag.toLowerCase()}.png`}
                            alt={`${proxy.country} flag`}
                            className="mr-2 h-4 w-6"
                          />
                          {proxy.country}
                        </div>
                      </TableCell>
                      <TableCell>{proxy.ports}</TableCell>
                      <TableCell>{proxy.timeLeft}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Renew
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No proxies found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
                <span className="text-sm text-gray-600">Page 1 of 1</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Dongles per page:</span>
                <Select
                  value={donglesPerPage}
                  onValueChange={setDonglesPerPage}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="5" />
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
    </>
  );
}
