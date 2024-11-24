"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FaChartLine } from "react-icons/fa";
import axios from "axios";
import AnimatedCounter from "../component/AnimatedCounter";
import {
  fetchAdminSideUserData,
  fetchSalesOverview,
} from "@/actions/getProxyList";
type SiteInfoType = {
  totalIncome: number;
  numberOfSales: number;
  lastSale: string;
};
const SiteInfo: React.FC<SiteInfoType> = ({
  lastSale,
  numberOfSales,
  totalIncome,
}) => {
  const [monthlyVisitors, setMonthlyVisitors] = useState(0);
  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await axios.get(
          "https://proxy-test-iqka.onrender.com/web-statistics/last-30-days",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data?.data?.total);
        const visitorData = response.data?.data?.total;
        const total = visitorData.reduce(
          (acc: number, item: number[]) => acc + item[1],
          0
        );
        console.log(`total visitors`, total);

        setMonthlyVisitors(total ?? 3);
      } catch (error) {
        console.log(error);

        return error;
      }
    };
    fetchMonthlyData();
  }, [monthlyVisitors]);
  return (
    // Visitors, Total Revenue, Sales,
    <div className="">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card draggable className="bg-blue-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-white/80 font-medium">
                  Total Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-white"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end ">
                  <div className="">
                    <div className="text-2xl font-bold">
                      $<AnimatedCounter from={0} to={totalIncome} />
                    </div>
                    {/* <p className="text-xs text-slate-300">
                      +20.1% from last month
                    </p> */}
                  </div>
                  <div className="status-tracker">
                    <FaChartLine size={20} className="text-green-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Web Visitors
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  +<AnimatedCounter from={0} to={monthlyVisitors} />{" "}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  +<AnimatedCounter from={0} to={numberOfSales} />
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Sale</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lastSale}</div>
                {/* <p className="text-xs text-muted-foreground">
                √ great progress
                </p> */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteInfo;
