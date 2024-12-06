"use client";
import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Sector } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import axios from "axios";
export const description = "A pie chart with a label";
// /web-statistics/device-type
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
// Define the type for device data
type DeviceData = {
  deviceType: string;
  count: number;
};
const DeviceType = () => {
  const [deviceType, setDeviceType] = useState<DeviceData[]>([]);
  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await axios.get(
          "https://proxy-test-iqka.onrender.com/web-statistics/device-type",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data?.data);
        setDeviceType(response.data?.data);
      } catch (error) {
        console.log(error);

        return error;
      }
    };
    fetchMonthlyData();
  }, []);
  const chartData = deviceType.map((item) => ({
    device: item.deviceType,
    visitors: item.count,
    fill: `var(--color-${item.deviceType})`,
  }));
  const totalVisitors = deviceType.reduce(
    (prev, device) => prev + device.count,
    0
  );

  if (deviceType.length === 0) {
    // Show fallback UI if no sales data is available
    return (
      <p className="text-muted-foreground">
        No recent visitors Device type data.
      </p>
    );
  }

  return (
    <div className="w">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px] "
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="device"
            strokeWidth={5}
            activeIndex={0}
            innerRadius={60}
            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
              <Sector {...props} outerRadius={outerRadius + 5} />
            )}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalVisitors}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Visitors
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default DeviceType;
