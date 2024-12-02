"use client";
import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
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
import React from "react";
export const description = "A pie chart with a label list";

const chartConfig = {
  sales: {
    label: "Sales",
  },
  month: {
    label: "Monthly",
    color: "#C6E3DF",
  },
  week: {
    label: "Weekly",
    color: "#3B82F6",
  },
  day: {
    label: "Daily",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;
type SalesTypeProps = {
  chartData: { rentType: string; sales: number; fill: string }[];
};
const SalesType: React.FC<SalesTypeProps> = ({ chartData }) => {
  return (
    <div className="w-full h-full">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[500px] max-lg:max-h-[320px] [&_.recharts-text]:fill-background"
      >
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="sales" hideLabel />}
          />
          <Pie data={chartData} dataKey="sales">
            <LabelList
              dataKey="rentType"
              className="fill-background"
              stroke="none"
              fontSize={12}
              formatter={(value: keyof typeof chartConfig) =>
                chartConfig[value]?.label
              }
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default SalesType;
