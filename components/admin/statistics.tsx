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
import SalesOverview from "./sales-overview";
import SalesType from "./sales-type";
// const chartData = [
//   { rentType: "monthly", sales: 275, fill: "var(--color-monthly)" },
//   { rentType: "weekly", sales: 200, fill: "var(--color-weekly)" },
//   { rentType: "daily", sales: 187, fill: "var(--color-daily)" },
// ];
// we'll use reducer function to clac the total sales
// const totalSales = chartData.reduce((acc, item) => acc + item.sales, 0);
const Statistics = ({chartData, salesOverviewChartData}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 pt-9 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2 pb-9">
          <SalesOverview chartData={salesOverviewChartData} />
        </CardContent>
      </Card>
      <Card className="col-span-3 max-lg:col-span-4">
        <CardHeader>
          <CardTitle>Sales Type</CardTitle>
          <CardDescription>
            {/* You made {totalSales} sales this month. */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SalesType chartData={chartData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
