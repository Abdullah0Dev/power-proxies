"use client";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Header } from "@/components/admin";
import { fetchAdminSideUserData } from "@/actions/getProxyList";
import AdminListRow from "@/components/admin/AdminListRow";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SidebarProvider } from "@/components/ui/sidebar";
import TestSidebar from "@/components/admin/sidebar-test";

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
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [itemsPerPage] = useState(10); // Set items per page
  const router = useRouter();
  const [toggleCollapse, setToggleCollapse] = useState(false);
  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    setToggleCollapse((prev) => !prev);
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

  // Calculate paginated data
  const paginatedData = usersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Optionally fetch new data here if server-side pagination is needed
  };

  return (
    <SidebarProvider className="flex">
      <TestSidebar
        toggleCollapse={toggleCollapse}
        onToggleCollapse={handleSidebarToggle}
      />
      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          toggleCollapse ? "ml-20 max-xl:ml-0" : "ml-80 max-xl:ml-0"
        }`}
      >
        <div className="w-auto h-full">
          <Header />
          <Table>
            <TableCaption className="xl:pb-24">
              <PaginationDemo
                currentPage={currentPage}
                totalItems={usersData.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px] text-center">
                  Nickname
                </TableHead>
                <TableHead className="w-[150px] text-center">IMEI</TableHead>
                <TableHead className="min-w-[160px] text-center">
                  Proxy Login / Proxy Password
                </TableHead>
                <TableHead className="min-w-[150px] text-center">
                  Port (HTTP/Socks)
                </TableHead>
                <TableHead className="min-w-[120px] text-center">
                  List for Sale
                </TableHead>
                <TableHead className="min-w-[200px] text-center">
                  Last Sale
                </TableHead>
                <TableHead className="min-w-[200px] text-center">
                  Time Left for User
                </TableHead>
                <TableHead className="min-w-[120px] text-center">
                  Total Income
                </TableHead>
                <TableHead className="min-w-[120px] text-center">
                  Status
                </TableHead>
                <TableHead className="min-w-[140px] text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, index) => (
                <AdminListRow
                  index={index}
                  key={item.ID} // Use unique key for better performance
                  item={item}
                  usersData={usersData}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default ProxyPage;

function PaginationDemo({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePrevious} />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              isActive={currentPage === index + 1}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
