"use client";
import React from "react";
import { MessageCircle, Send, Mail, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ContactSupport() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-900">Contact Support</h1>
          <p className="text-xl text-blue-600">We're here to help you 24/7</p>
        </div>

        <Card className="shadow-xl border-blue-100 overflow-hidden">
          <div className="bg-blue-600 p-6 text-white">
            <CardTitle className="text-3xl font-bold">Get in Touch</CardTitle>
            <CardDescription className="text-blue-100 mt-2">
              Reach out to us via WhatsApp for quick and efficient support
            </CardDescription>
          </div>
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-6">
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white w-full h-14 text-lg"
                asChild
              >
                <a
                  href="https://api.whatsapp.com/send?phone=31646743991"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-6 w-6" /> Contact via
                  WhatsApp
                </a>
              </Button>
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white w-full h-14 text-lg"
                asChild
              >
                <a
                  href="https://t.me/Your_plug"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send className="mr-2 h-6 w-6" /> Contact via Telegram
                </a>
              </Button>
              <form className="w-full" action="mailto:Info@powergram.nl">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gray-700 hover:bg-gray-800 text-white w-full h-14 text-lg"
                >
                  <Mail className="mr-2 h-6 w-6" /> Contact via Email
                </Button>
              </form>
              <div className="text-center text-gray-600 space-y-4 max-w-md">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="text-blue-600 h-5 w-5" />
                  <span className="font-semibold">Available 24/7</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="text-green-500 h-5 w-5" />
                  <span>Typically reply within minutes</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
