"use client";

import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Bitcoin, Globe, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { plans } from "../../../data";
import {
  handlePaymentTestLink,
  handleSubscriptionLink,
} from "@/actions/getProxyList";

const BillingPage = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setUserEmail(storedEmail);
  }, []);
  // const userEmail = "abdulah@pro.com";
  const searchParams = useSearchParams();
  const durationParam = searchParams.get("duration");
  const [duration, setDuration] = useState(
    durationParam ? durationParam : plans[1].duration
  );
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [rotation, setRotation] = useState("5");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [loadingPaymentLink, setLoadingPaymentLink] = useState(false);
  useEffect(() => {
    const plan = plans.find((p) => p.value === duration);
    if (plan) {
      setSelectedPlan(plan); // Update selected plan
    }
  }, []);

  const handlePlanChange = (value: string) => {
    const plan = plans.find((p) => p.value === value);
    if (plan) {
      setSelectedPlan(plan); // Update selected plan
    }
  };

  const rotations = [
    { value: "1", label: "1 minute" },
    { value: "3", label: "3 minutes" },
    { value: "5", label: "5 minutes" },
    { value: "10", label: "10 minutes" },
    { value: "15", label: "15 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "45", label: "45 minutes" },
    { value: "60", label: "60 minutes" },
  ];

  const benefits = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Coverage",
      description: "Access proxies from 195+ countries",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Anonymous",
      description: "Stay protected with our encrypted connections",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Experience high-speed connections for seamless browsing",
    },
  ];
  // handle payment

  const handlePayment = async () => {
    try {
      setLoadingPaymentLink(true);
      let subscriptionData;
      // Call the function to handle the subscription and get the URL
      if (selectedPlan.duration === "day") {
        subscriptionData = await handlePaymentTestLink(userEmail as string);
        console.log("Bruh, what's happing");
      } else {
        subscriptionData = await handleSubscriptionLink(
          userEmail as string,
          selectedPlan.priceId
        );
      }

      // Redirect to the Stripe Checkout URL
      if (subscriptionData.url) {
        window.location.href = subscriptionData.url; // Redirect to Stripe Checkout
      } else {
        console.error("Subscription URL not found in response.");
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
    } finally {
      setLoadingPaymentLink(false); // Stop loading state
    }
  };
  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-teal-500">
      <main className="container mx-auto px-4 py-12 pt-28">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Purchase Your Mobile Proxy Plan
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="light:bg-white shadow-xl rounded-lg overflow-hidden">
              <CardHeader className="light:bg-gray-50 border-b border-gray-200 p-6">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Billing Details
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-500">
                  Complete your purchase
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <Label
                      htmlFor="duration"
                      className="block text-sm font-medium text-gray-700  dark:text-gray-500 mb-2"
                    >
                      Duration
                    </Label>
                    <Select
                      onValueChange={handlePlanChange}
                      value={selectedPlan.value} // Use selectedPlan value
                    >
                      <SelectTrigger id="duration" className="w-full">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {plans.map((plan) => (
                          <SelectItem key={plan.value} value={plan.value}>
                            {plan.label} - €{plan.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="rotation"
                      className="block text-sm font-medium text-gray-700  dark:text-gray-500 mb-2"
                    >
                      IP Rotation Interval
                    </Label>
                    <Select onValueChange={setRotation} value={rotation}>
                      <SelectTrigger id="rotation" className="w-full">
                        <SelectValue placeholder="Select rotation interval" />
                      </SelectTrigger>
                      <SelectContent>
                        {rotations.map((r) => (
                          <SelectItem key={r.value} value={r.value}>
                            {r.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-gray-700  dark:text-gray-500 mb-2">
                      Payment Method
                    </Label>
                    <RadioGroup
                      onValueChange={setPaymentMethod}
                      value={paymentMethod}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label
                          htmlFor="credit-card"
                          className="flex items-center"
                        >
                          <CreditCard className="w-5 h-5 mr-2" />
                          Credit Card
                        </Label>
                      </div>
                      {/* <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bitcoin" id="bitcoin" />
                        <Label htmlFor="bitcoin" className="flex items-center">
                          <Bitcoin className="w-5 h-5 mr-2" />
                          Bitcoin
                        </Label>
                      </div> */}
                      {/* <p className="text-xs text-gray-400">more payment methods coming soon...</p> */}
                    </RadioGroup>
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={handlePayment}
                      disabled={loadingPaymentLink} // Disable button while loading
                      className={`w-full ${
                        loadingPaymentLink
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white flex justify-center items-center`}
                    >
                      {!loadingPaymentLink ? (
                        <p>Pay €{selectedPlan.price}</p>
                      ) : (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                          </svg>
                          <p>Loading...</p>
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="sticky top-16 light:bg-white shadow-xl rounded-lg overflow-hidden">
              <CardHeader className="light:bg-gray-50 border-b border-gray-200 p-6">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Why Choose Our Mobile Proxies?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0   text-blue-500 mr-3">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold dark:text-white/90 text-gray-900">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-500">
                          {benefit.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

// P
export default BillingPage;
