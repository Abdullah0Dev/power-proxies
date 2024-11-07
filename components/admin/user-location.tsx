"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
export const description = "A mixed bar chart";
const chartData = [
  { browser: "egypt", visitors: 275, fill: "var(--color-egypt)" },
  { browser: "netherlands", visitors: 200, fill: "var(--color-netherlands)" },
  { browser: "france", visitors: 187, fill: "var(--color-france)" },
  { browser: "unitedState", visitors: 173, fill: "var(--color-unitedState)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  egypt: {
    label: "Egypt",
    color: "hsl(var(--chart-1))",
  },
  netherlands: {
    label: "NL",
    color: "hsl(var(--chart-2))",
  },
  france: {
    label: "France",
    color: "hsl(var(--chart-3))",
  },
  unitedState: {
    label: "US",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const UserLocation = () => {
  return (
    <div>
      {" "}
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: 0,
          }}
        >
          <YAxis
            dataKey="browser"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) =>
              chartConfig[value as keyof typeof chartConfig]?.label.slice(0, 6)
            }
          />
          <XAxis dataKey="visitors" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="visitors" layout="vertical" radius={5} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default UserLocation;
