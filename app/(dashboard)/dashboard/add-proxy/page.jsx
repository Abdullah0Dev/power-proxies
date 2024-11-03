"use client";
import React, { useState } from "react";
import { Globe, CreditCard, Wallet, Lock, Info, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/component/dashboard-header";

const countries = [
  { name: "United Kingdom", proxies: 18, code: "GB" },
  { name: "United States", proxies: 4, code: "US" },
  { name: "France", proxies: 3, code: "FR" },
  { name: "Spain", proxies: 24, code: "ES" },
  { name: "Australia", proxies: 7, code: "AU" },
  { name: "Germany", proxies: 13, code: "DE" },
  { name: "Brazil", proxies: 1, code: "BR" },
  { name: "Ukraine", proxies: 18, code: "UA" },
];

const restockingCountries = ["EC", "NL", "AT", "IE"];

export default function ProxyConfiguration() {
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [carrier, setCarrier] = useState(null);
  const [portQuantity, setPortQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const router = useRouter();
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setStep(2);
    router.push("#details");
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
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
              <div className="flex items-center text-sm text-blue-600 mb-4">
                <span className="font-semibold mr-2">PREMIUM & PRIVATE</span>
                <Button variant="link" className="p-0">
                  <Info className="h-4 w-4 mr-1" />
                  Show information
                </Button>
              </div>

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
                    ),
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
                        ? "border-blue-600 bg-blue-50"
                        : ""
                    }`}
                    onClick={() => handleCountrySelect(country.name)}
                  >
                    <img
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
                  <img
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
                <h3
                  id="details"
                  className="text-lg font-semibold text-blue-900 mb-4"
                >
                  Carrier
                </h3>
                <RadioGroup
                  value={carrier || ""}
                  onValueChange={(value) => setCarrier(value)}
                >
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="SFR" id="SFR" />
                      <Label htmlFor="SFR">SFR</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Free" id="Free" />
                      <Label htmlFor="Free">Free</Label>
                    </div>
                  </div>
                </RadioGroup>

                <h3 className="text-lg font-semibold text-blue-900 mt-6 mb-4">
                  Choose Tariff Plan
                </h3>
                {carrier ? (
                  <p className="text-blue-600">
                    Tariff plans for {carrier} will be displayed here.
                  </p>
                ) : (
                  <p className="text-red-500">
                    Please select a Carrier to view Tariff Plans.
                  </p>
                )}
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
                <span className="text-gray-600">Plan:</span>
                <span className="font-semibold">
                  {selectedCountry || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold">
                  $ {selectedCountry ? "19.99" : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Port quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPortQuantity(Math.max(1, portQuantity - 1))
                    }
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{portQuantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPortQuantity(portQuantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 mb-6">
              <Input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button variant="outline">Apply</Button>
            </div>

            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total:</span>
              <span>
                $ {selectedCountry ? (19.99 * portQuantity).toFixed(2) : "0"}
              </span>
            </div>

            <div className="space-y-4">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!selectedCountry}
              >
                <CreditCard className="mr-2 h-4 w-4" /> Pay with Card
              </Button>
              <Button
                variant="outline"
                className="w-full"
                disabled={!selectedCountry}
              >
                <Wallet className="mr-2 h-4 w-4" /> Pay with Account Balance
              </Button>
            </div>

            <div className="flex justify-center items-center mt-4 text-sm text-blue-600">
              <Lock className="mr-1 h-4 w-4" /> Secure Checkout
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
