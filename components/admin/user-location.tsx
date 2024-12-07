"use client";

import { TrendingUp } from "lucide-react";
import countries from "i18n-iso-countries";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import React, { useEffect, useState } from "react";
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
import { fetchUserCountry } from "@/actions/getProxyList";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

type CountryType = {
  userCountry: string;
  count: number;
  country: string;
  iso: string;
  latitude: number;
  longitude: number;
};

const UserLocation = () => {
  const [userCountry, setUserCountry] = useState<CountryType[]>([]);

  useEffect(() => {
    const fetchUserCountriesData = async () => {
      try {
        const countriesData = await fetchUserCountry();

        // Ensure valid ISO codes
        const validCountries = countriesData.map((item: CountryType) => ({
          ...item,
          iso: countries.getAlpha2Code(item.country, "en") || "unknown",
        }));

        setUserCountry(validCountries);
      } catch (error) {
        console.log("Error fetching user countries:", error);
      }
    };

    fetchUserCountriesData();
  }, []);

  // Filter out invalid data
  const chartData = userCountry
    .filter((item) => item.iso !== "unknown" && item.count > 0)
    .map((item, index) => ({
      country: item.iso,
      visitors: item.count,
      fill: `hsl(var(--chart-${index + 1}))`, // Use index-based color
    }));

  // Dynamic chartConfig
  const chartConfig = chartData.reduce(
    (acc, { country }) => ({
      ...acc,
      [country]: {
        label: countries.getName(country, "en") || country,
        color: `hsl(var(--chart-${country}))`,
      },
    }),
    {}
  ) satisfies ChartConfig;

  if (chartData.length === 0) {
    return (
      <p className="text-muted-foreground">No recent visitors country data.</p>
    );
  }

  return (
    <div>
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
            tickFormatter={(value) => value} // ISO codes directly
          />
          {/* 
          <ChartTooltipContent
                formatter={(value, name, props) =>
                  `${props.payload.countryName}: ${value} visitors`
                }
              />
          */}
          <XAxis dataKey="visitors" type="number" hide />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="visitors" layout="vertical" radius={5} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default UserLocation;
