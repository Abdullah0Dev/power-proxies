import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FaChartLine } from "react-icons/fa";
import UserLocation from "./user-location";
import DeviceType from "./device-type";
import LatestSales from "./latest-sales";
import { Latest5PurchasedType } from "@/app/(root)/admin/page";
// const chartData = [
//   { rentType: "monthly", sales: 275, fill: "var(--color-monthly)" },
//   { rentType: "weekly", sales: 200, fill: "var(--color-weekly)" },
//   { rentType: "daily", sales: 187, fill: "var(--color-daily)" },
// ];
// we'll use reducer function to clac the total sales
// const totalSales = chartData.reduce((acc, item) => acc + item.sales, 0);
const Locations: React.FC<Latest5PurchasedType> = ({ lastSales }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 pt-9 lg:grid-cols-7">
      <Card className="col-span-2 max-lg:col-span-4">
        <CardHeader>
          <CardTitle>User Demographic</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <UserLocation />
        </CardContent>
      </Card>
      <Card className="col-span-2 max-lg:col-span-4">
        <CardHeader>
          <CardTitle>Device Type</CardTitle>
        </CardHeader>
        <CardContent className=" ">
          <DeviceType />
        </CardContent>
      </Card>
      <Card className="col-span-3 max-lg:col-span-4">
        <CardHeader>
          <CardTitle>Latest Sales</CardTitle>
          <CardDescription>
            Latest 5 purchased from the website.
          </CardDescription>
        </CardHeader>
        <CardContent className=" h-52 overflow-y-scroll">
          <LatestSales lastSales={lastSales} />
        </CardContent>
      </Card>
    </div>
  );
};
/*
! what do we need to display?
Countries
Device Type
__
Proxy information with their data and options that the client requested..

*/
export default Locations;
