"use client";

import React, { useEffect, useState } from "react";
import { Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/component/dashboard-header";
import Link from "next/link";
import { plans } from "@/data";
import Image from "next/image";

interface Country {
  name: string;
  proxies: number;
  code: string;
}

const countries: Country[] = [{ name: "Netherlands", proxies: 10, code: "NL" }];

const restockingCountries: string[] = ["US", "GB", "AU", "FR"];

export default function ProxyConfiguration() {
  const [step, setStep] = useState<number>(1);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState(plans[1]); // Default to "7 Days" plan
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setUserEmail(storedEmail);
  }, []);

  const handlePlanChange = (value: string) => {
    const plan = plans.find((p) => p.value === value);
    if (plan) setSelectedPlan(plan);
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setStep(2);
    router.push("#details");
  };

  return (
    <div className="min-h-screen light:bg-gray-50">
      <DashboardHeader title="Add Proxy" />
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-900">
                <Globe className="mr-2" />
                Private 4G/LTE Mobile Proxy Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-8">
                <div className="flex justify-between mb-2">
                  {["Choose Location", "Configure Proxy", "Pay for Proxy"].map(
                    (label, index) => (
                      <div
                        key={label}
                        className={`flex flex-col items-center ${
                          index + 1 <= step ? "text-blue-600" : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`z-20 w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                            index + 1 <= step
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className="text-xs text-center">{label}</span>
                      </div>
                    )
                  )}
                </div>
                <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200">
                  <div
                    className={`h-full bg-blue-600 transition-all duration-300 ease-in-out`}
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                  ></div>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Choose Proxy Location
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                {countries.map((country) => (
                  <Button
                    key={country.code}
                    variant="outline"
                    className={`flex flex-col items-center justify-center h-24 ${
                      selectedCountry === country.name
                        ? "border-blue-600 dark:border-darkMode-2 bg-blue-50 dark:bg-darkMode-1"
                        : ""
                    }`}
                    onClick={() => handleCountrySelect(country.name)}
                  >
                    <Image
                      width={320}
                      height={320}
                      src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                      alt={`${country.name} flag`}
                      className="w-8 h-8 mb-2 rounded-sm"
                    />
                    <div className="text-center">
                      <div className="font-semibold text-blue-900">
                        {country.name}
                      </div>
                      <div className="text-xs text-blue-600">
                        {country.proxies} proxies
                      </div>
                    </div>
                  </Button>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Locations Re-stocking Soon
              </h3>
              <div className="flex space-x-4">
                {restockingCountries.map((code) => (
                  <Image
                  width={320}
                  height={320}
                    key={code}
                    src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
                    alt={`${code} flag`}
                    className="w-8 h-8 rounded-sm opacity-50"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {step >= 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">
                  Choose Proxy Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-2"
                  >
                    Duration
                  </Label>
                  <Select
                    onValueChange={handlePlanChange}
                    value={selectedPlan.value}
                  >
                    <SelectTrigger id="duration" className="w-full">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan.value} value={plan.value}>
                          {plan.label} - ${plan.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Checkout */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-900">Your checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold text-blue-900 mb-4">Order summary</h3>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Country:</span>
                <span className="font-semibold">
                  {selectedCountry || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-semibold">
                  {selectedPlan.label || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold">
                  ${selectedPlan.price || "0"}
                </span>
              </div>
            </div>

            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total:</span>
              <span>${selectedPlan.price || "0"}</span>
            </div>
            <div className="space-y-4">
              <div className="pt-4">
                <Link
                  href={`${selectedPlan.link}?prefilled_email=${userEmail}`}
                  passHref
                >
                  <Button
                    disabled={!selectedCountry || !selectedPlan}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center -bottom-9 relative text-sm text-blue-600">
              <Lock className="mr-1 h-4 w-4" /> Secure Checkout
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
