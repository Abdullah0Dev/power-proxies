"use client";

import { Header, SiteInfo, Statistics, Locations } from "@/components/admin";
import React, { useEffect, useState, useMemo } from "react";
import { FaSpinner } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoWarningOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { io } from "socket.io-client";
import {
  fetchLatestPurchases,
  fetchSalesOverview,
} from "@/actions/getProxyList";
import Loading from "@/components/component/Loading";

interface CustomIconProps {
  isLoading?: boolean;
  type?: "info" | "success" | "error" | "warning";
}

const CustomIcon = ({ isLoading, type }: CustomIconProps) => {
  if (isLoading) return <FaSpinner className="animate-spin" />;
  switch (type) {
    case "info":
      return <IoWarningOutline />;
    case "success":
      return <IoMdCheckmarkCircleOutline color={"green"} />;
    case "error":
      return <MdErrorOutline color={"red"} />;
    case "warning":
      return <IoWarningOutline />;
    default:
      return <IoMdCheckmarkCircleOutline color={"green"} />;
  }
};

type Sale = {
  sale_date: string;
  sale_amount: number;
};

type ChartDataItem = {
  month: string;
  sales: number;
};
interface Stats {
  totalIncome: number;
  lastSale: string;
  numberOfSales: number;
}
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const CACHE_KEY = "clientProxies";
const CACHE_EXPIRY_TIME = 1000 * 60; // 1 hour in milliseconds

// Process sales data to accumulate sales by month
const processSalesData = (fullSalesOverview: Sale[]): ChartSalesData[] => {
  const salesByMonth = Array(12).fill(0);

  fullSalesOverview.forEach((item) => {
    const saleMonth = new Date(item.sale_date).getMonth();
    salesByMonth[saleMonth] += item.sale_amount;
  });
  console.log(
    "Bruh",
    salesByMonth.map((sales, index) => ({
      month: months[index],
      sales,
    }))
  );

  return salesByMonth.map((sales, index) => ({
    month: months[index],
    sales,
    rentType: "",
    fill: "",
  }));
};

interface SalesTypeDataItem {
  sale_period: string;
  sale_amount: number;
}

interface ProcessedChartDataItem {
  rentType: string;
  sales: number;
  fill: string;
}

type LatestPurchasedProxies = {
  sale_amount: number;
  sale_period: string;
  user_email: string;
  username: string;
  user_image: string;
};

export interface Latest5PurchasedType {
  lastSales: LatestPurchasedProxies[];
}
interface ChartSalesData {
  rentType: string;
  fill: string;
  sales: number;
}

// Function to format time differences as "x ago"
const formatTimeAgo = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
};
const AdminPage = () => {
  const [eventData, setEventData] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [salesTypeData, setSalesTypeData] = useState<SalesTypeDataItem[]>([]);
  const [chartSalesData, setChartSalesData] = useState<ChartSalesData[]>([]);
  const [last5Purchased, setLast5Purchased] = useState<
    LatestPurchasedProxies[]
  >([]);
  const [stats, setStats] = useState<Stats>({
    totalIncome: 0,
    lastSale: "",
    numberOfSales: 0,
  });

  const socket = useMemo(
    () => io("https://powerproxies-backups.onrender.com"),
    []
  );

  const fetchData = async () => {
    try {
      const [fullSalesOverview, latest5Purchased] = await Promise.all([
        fetchSalesOverview(),
        fetchLatestPurchases(),
      ]);

      setLast5Purchased(latest5Purchased);
      setSalesTypeData(fullSalesOverview);

      const filteredChartData = processSalesData(fullSalesOverview);
      setChartSalesData(filteredChartData);

      const totalProxyIncome = fullSalesOverview.reduce(
        (acc: number, item: Sale) => acc + item.sale_amount,
        0
      );

      const lastSaleTime = fullSalesOverview.reduce(
        (latest: Sale, current: Sale) =>
          new Date(current.sale_date) > new Date(latest.sale_date)
            ? current
            : latest
      );
      const timeDifference =
        Date.now() - new Date(lastSaleTime.sale_date).getTime();

      const formatTimeAgo = (ms: number) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return `${seconds}s ago`;
      };

      setStats({
        totalIncome: totalProxyIncome,
        lastSale: formatTimeAgo(timeDifference),
        numberOfSales: fullSalesOverview.length,
      });

      // Cache data
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: {
            totalIncome: totalProxyIncome,
            lastSale: formatTimeAgo(timeDifference),
            numberOfSales: fullSalesOverview.length,
          },
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      console.error(`Couldn't fetch sales: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, CACHE_EXPIRY_TIME);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.on("payment-success", (data) => {
      if (data?.message) {
        setEventData({ message: data.message, type: "success" });
      }
    });

    socket.on("proxy-expired", (data) => {
      if (data?.message) {
        setEventData({ message: data.message, type: "error" });
      }
    });

    return () => {
      socket.off("payment-success");
      socket.off("proxy-expired");
    };
  }, [socket]);

  useEffect(() => {
    if (eventData) {
      toast(eventData.message, { type: eventData.type });
    }
  }, [eventData]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server, ID:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    socket.on("payment-success", (data) => {
      if (data?.message) {
        setEventData({ message: data.message, type: "success" });
      } else {
        console.error("Unexpected data format:", data);
      }
    });

    socket.on("proxy-expired", (data) => {
      if (data?.message) {
        setEventData({ message: data.message, type: "error" });
      } else {
        console.error("Unexpected data format:", data);
      }
    });

    return () => {
      socket.off("payment-success");
      socket.off("proxy-expired");
    };
  }, []);

  const chartData = useMemo(
    () =>
      salesTypeData.reduce<ChartSalesData[]>((acc, item) => {
        const period = item.sale_period;
        const entry = acc.find((data) => data.rentType === `${period}`);

        if (entry) {
          entry.sales += 1;
        } else {
          acc.push({
            rentType: period,
            sales: 1,
            fill: `var(--color-${period})`,
          });
        }
        return acc;
      }, []),
    [salesTypeData]
  );

  return (
    <div className="light:bg-[#F6F6F6] w-full h-full">
      <Header />
      {stats.numberOfSales !== 0 ? (
        <div className="">
          <div className="px-5">
            <SiteInfo
              lastSale={stats.lastSale}
              numberOfSales={stats.numberOfSales}
              totalIncome={stats.totalIncome}
            />
            <Statistics
              chartData={chartData}
              salesOverviewChartData={chartSalesData}
            />
            <Locations lastSales={last5Purchased} />
          </div>
          <div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              stacked
              theme="light"
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AdminPage;
