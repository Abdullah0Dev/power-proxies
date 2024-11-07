"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
export const description = "An area chart with gradient fill";

const chartData = [
  { month: "January", sales: 0 },
  { month: "February", sales: 50 },
  { month: "March", sales: 20 },
  { month: "April", sales: 130 },
  { month: "May", sales: 100 },
  { month: "June", sales: 50 },
];
const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const SalesOverview = () => {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
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
