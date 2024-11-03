"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Bitcoin, Globe, Shield, Zap, Star } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { testimonials } from "../../../data";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function BillingPage() {
  const searchParams = useSearchParams();
  const durationParam = searchParams.get("duration");
  const [duration, setDuration] = useState(durationParam ? durationParam : "7");
  const [rotation, setRotation] = useState("5");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const durations = [
    { value: "1", label: "1 Day", price: 9.99 },
    { value: "7", label: "7 Days", price: 49.99 },
    { value: "30", label: "30 Days", price: 149.99 },
  ];

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

  const currentPrice = durations.find((d) => d.value === duration)?.price;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // such as sending the data to your backend or a payment processor
    console.log("Form submitted", { duration, rotation, paymentMethod });
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
            <Card className="bg-white shadow-xl rounded-lg overflow-hidden">
              <CardHeader className="bg-gray-50 border-b border-gray-200 p-6">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Billing Details
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Complete your purchase
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label
                      htmlFor="duration"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Duration
                    </Label>
                    <Select onValueChange={setDuration} value={duration}>
                      <SelectTrigger id="duration" className="w-full">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {durations.map((d) => (
                          <SelectItem key={d.value} value={d.value}>
                            {d.label} - ${d.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="rotation"
                      className="block text-sm font-medium text-gray-700 mb-2"
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
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
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
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bitcoin" id="bitcoin" />
                        <Label htmlFor="bitcoin" className="flex items-center">
                          <Bitcoin className="w-5 h-5 mr-2" />
                          Bitcoin
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {paymentMethod === "credit-card" && (
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="card-number"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Card Number
                        </Label>
                        <Input
                          id="card-number"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="expiry"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Expiry Date
                          </Label>
                          <Input
                            id="expiry"
                            type="text"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="cvc"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            CVC
                          </Label>
                          <Input
                            id="cvc"
                            type="text"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {paymentMethod === "bitcoin" && (
                    <div>
                      <Label
                        htmlFor="bitcoin-address"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Bitcoin Address
                      </Label>
                      <Input
                        id="bitcoin-address"
                        type="text"
                        placeholder="Enter Bitcoin address"
                        required
                      />
                    </div>
                  )}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Pay ${currentPrice}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="sticky top-16 bg-white shadow-xl rounded-lg overflow-hidden">
              <CardHeader className="bg-gray-50 border-b border-gray-200 p-6">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Why Choose Our Mobile Proxies?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 text-blue-500 mr-3">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4">{testimonial.content}</p>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Image
                        src="/client-0-vcjg0fIb.jpg"
                        alt={testimonial.author}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <p className="text-gray-600">{testimonial.position}</p>
                    </div>
                  </div>
                  <div className="flex mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
