"use client";

import { Header, SiteInfo, Statistics, Locations } from "@/components/admin";
import React, { useEffect, useState } from "react";
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
const AdminPage = () => {
  const [eventData, setEventData] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [salesTypeData, setSalesTypeData] = useState<SalesTypeDataItem[]>([]);
  const [chartSalesData, setChartSalesData] = useState<ChartSalesData[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [lastSale, setLastSale] = useState<string>("");
  const [numberOfSales, setNumberOfSales] = useState<number>(0);
  const [last5Purchased, setLast5Purchased] = useState([]);
  const socket = io("https://powerproxies-backups.onrender.com");

  useEffect(() => {
    const fetchSalesOverviewData = async () => {
      try {
        const fullSalesOverview = await fetchSalesOverview();
        const latest5Purchased = await fetchLatestPurchases();
        setLast5Purchased(latest5Purchased);
        setSalesTypeData(fullSalesOverview);

        const filteredChartData = processSalesData(fullSalesOverview);
        setChartSalesData(filteredChartData);
        console.log(filteredChartData);

        const salesNumber = fullSalesOverview.length;
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

        const lastSaleAgo = formatTimeAgo(timeDifference);

        setTotalIncome(totalProxyIncome);
        setLastSale(lastSaleAgo);
        setNumberOfSales(salesNumber);
      } catch (error) {
        console.log(`Couldn't fetch sales: ${error}`);
      }
    };

    fetchSalesOverviewData();

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

  useEffect(() => {
    if (eventData) {
      toast(eventData.message, { type: eventData.type });
    }
  }, [eventData]);

  const chartData = salesTypeData.reduce<ProcessedChartDataItem[]>(
    (acc, item) => {
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
      console.log(acc, "acc");

      return acc;
    },
    []
  );

  return (
    <div className="light:bg-[#F6F6F6] w-full h-full">
      <Header />
      <div className="px-5">
        <SiteInfo
          lastSale={lastSale}
          numberOfSales={numberOfSales}
          totalIncome={totalIncome}
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
  );
};

export default AdminPage;
