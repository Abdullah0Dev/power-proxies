"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Sector } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
export const description = "A pie chart with a label";

const chartData = [
  { device: "mobile", visitors: 500, fill: "var(--color-mobile)" },
  { device: "desktop", visitors: 364, fill: "var(--color-desktop)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-1))",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const DeviceType = () => {
  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="visitors"
            innerRadius={60}
            nameKey="device"
            strokeWidth={5}
            activeIndex={0}
            label
            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
              <Sector {...props} outerRadius={outerRadius + 5} />
            )}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default DeviceType;
