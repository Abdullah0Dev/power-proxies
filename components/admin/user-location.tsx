"use client";
import { TrendingUp } from "lucide-react";
import countries from "i18n-iso-countries";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

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
import axios from "axios";
export const description = "A mixed bar chart";
// user-country
type CountryType = {
  userCountry: String;
  count: Number;
  country: String;
  iso: String;
  latitude: Number;
  longitude: Number;
};
const UserLocation = () => {
  const [userCountry, setUserCountry] = useState<CountryType[]>([]);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await axios.get(
          "https://proxy-test-iqka.onrender.com/web-statistics/user-country",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data?.data);
        setUserCountry(response.data?.data);
      } catch (error) {
        console.log(error);

        return error;
      }
    };
    fetchMonthlyData();
  }, []);
  const chartData = userCountry.map((item) => ({
    country: item.iso,
    visitors: item.count,
    fill: `var(--color-${item.iso})`,
  }));
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    EG: {
      label: "Egypt",
      color: "hsl(var(--chart-1))",
    },
    NL: {
      label: "NL",
      color: "hsl(var(--chart-2))",
    },
    fr: {
      label: "France",
      color: "hsl(var(--chart-3))",
    },
    US: {
      label: "US",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

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
            dataKey="country"
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
