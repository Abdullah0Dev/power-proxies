"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
export const description = "An area chart with gradient fill";

// const chartData = [
//   { month: "January", sales: 0 },
//   { month: "February", sales: 50 },
//   { month: "March", sales: 20 },
//   { month: "April", sales: 130 },
//   { month: "May", sales: 100 },
//   { month: "June", sales: 50 },
// ];
const chartConfig = {
  sales: {
    label: "Earned",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
interface ChartData {
  month: string;
  sales: number;
}
interface ChartSalesData {
  rentType: string;
  fill: string;
  sales: number;
}
// const chartData = [
//   { rentType: "monthly", sales: 275, fill: "var(--color-monthly)" },
//   { rentType: "weekly", sales: 200, fill: "var(--color-weekly)" },
//   { rentType: "daily", sales: 187, fill: "var(--color-daily)" },
// ];
// SalesOverview component with correct prop typing
export interface ChartDataType {
  chartData: ChartSalesData[]; 
}
const SalesOverview = ({ chartData }: ChartDataType) => {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
          top: 10,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          //   dataKey="salesNumber"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-sales)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-sales)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="sales"
          type="natural"
          fill="url(#fillSales)"
          fillOpacity={0.4}
          stroke="var(--color-sales)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default SalesOverview;
