"use server";
import { parse } from "node-html-parser";
import { HTMLElement } from "node-html-parser";
import { currentUser } from "@clerk/nextjs/server";

import {
  AndroidInfo,
  ModemDetails,
  NetworkDetails,
  ProxyCredential,
  RotateProxyResponse,
  SpeedTestParams,
  SpeedTestResult,
  ConnectionResult,
} from "@/types";
import axios from "axios";

interface UserStatus {
  GENTIME: string;
  IS_LOCKED: string;
  IS_REBOOTING: string;
  IS_ROTATED: string;
  MSG: string;
  N: number;
  STATE: "added" | "removed" | "pending"; // Add other possible states
  android: AndroidInfo;
  modem_details: ModemDetails;
  net_details: NetworkDetails;
  proxy_creds: ProxyCredential;
}

interface ConnectionTestResponse {
  imei: string | null;
  nick: string | null;
  results: ConnectionResult[];
}

export async function fetchAdminSideUserData() {
  const response = await axios.get(
    `http://localhost:4000/test-actions/show-user-info`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.data;
  return data;
}
export async function fetchLatestSubscriptionAndPayment(email: string) {
  try {
    const response = await axios.get(
      `https://powerproxies-backups.onrender.com/payment/purchases`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          email, // Use the provided email parameter
        },
      }
    );

    // Retrieve the unified list of purchases
    const purchases = response.data.purchases;

    if (purchases && purchases.length > 0) {
      // Map over the purchases to format the data
      const formattedPurchases = purchases.map((purchase: any) => {
        // Format billing cycle dates if present
        const billingCycle =
          purchase.billingCycle &&
          `${new Date(
            purchase.billingCycle.start * 1000
          ).toLocaleDateString()} to ${new Date(
            purchase.billingCycle.end * 1000
          ).toLocaleDateString()}`;

        return {
          receiptID: purchase.id,
          purpose: purchase.type, // 'subscription' or 'one-time'
          imei: purchase.imei || "N/A", // Show "N/A" if IMEI is not available
          status: purchase.status,
          price: purchase.amount, // Unified `amount` field for both
          currency: purchase.currency.toUpperCase(),
          date:
            billingCycle ||
            new Date(purchase.created * 1000).toLocaleDateString(), // Billing cycle or created date
          description: purchase.description || "No description provided",
        };
      });

      console.log("Formatted Purchases", formattedPurchases);

      return formattedPurchases;
    } else {
      throw new Error("No purchases found for this email.");
    }
  } catch (error) {
    console.error("Error fetching purchases:", error);
    throw error;
  }
}

export async function fetchLatestSubscription(email: string) {
  try {
    const response = await axios.get(
      `http://localhost:4000/payment/manage-subscription`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          email, // Use the provided email parameter
        },
      }
    );

    // Retrieve the unified list of purchases
    const subscriptions = response.data.subscriptions;

    if (subscriptions && subscriptions.length > 0) {
      // Map over the subscriptions to format the data
      const formattedSubscriptions = subscriptions.map((subscription: any) => {
        const billedTime = `${new Date(
          subscription.billedTime * 1000
        ).toLocaleDateString()} `;
        const nextBill = `${new Date(
          subscription.nextBill * 1000
        ).toLocaleDateString()} `;
        return {
          id: subscription.id,
          status: subscription.status,
          billedTime: billedTime,
          nextBill: nextBill,
          imei: subscription.imei, // Access IMEI from metadata
          country: subscription.country,
          nick: subscription.nick, // needs changes
          timeLeft: subscription.timeLeft, /// needs changes
          flag: subscription.flag,
          subscription: subscription.subscription,
        };
      });
      console.log("Formatted Subscriptions", formattedSubscriptions);

      return formattedSubscriptions;
    }
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw error;
  }
}

export async function fetchSalesOverview() {
  const response = await axios.get(
    `https://powerproxies-backups.onrender.com/test-actions/sales-overview`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.data;
  return data;
}
export async function fetchClientPurchasedProxies() {
  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress;
  const response = await axios.post(
    `https://powerproxies-backups.onrender.com/test-actions/client-proxy-info/`,
    {
      email,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.data;
  return data;
}

export async function addEmailToDatabase(email: string) {
  // Fetch the current user and extract the email
  // const user = await currentUser();
  // const email = user?.emailAddresses[0]?.emailAddress;

  // Ensure email exists before making the request
  if (!email) {
    throw new Error("Email is required.");
  }

  // Make the POST request
  try {
    const response = await axios.post(
      "https://powerproxies-backups.onrender.com/test-actions/new-client-email/",
      { email }, // Email in the request body
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error adding email to database:", error);
    throw error;
  }
}

export async function handleSubscriptionLink(email: string, priceId: string) {
  // Validate input
  if (!email || !priceId) {
    throw new Error("Email and Price ID are required.");
  }

  try {
    // Send the POST request
    const response = await axios.post(
      "https://powerproxies-backups.onrender.com/payment/create-subscription",
      {
        email,
        priceId,
        imei: "bruh", // Replace "bruh" with the actual IMEI logic if needed
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Subscription created successfully:", response.data.url);

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
}
export async function handlePaymentTestLink(email: string) {
  // Validate input
  if (!email) {
    throw new Error("Email are required.");
  }

  try {
    // Send the POST request
    const response = await axios.post(
      "https://powerproxies-backups.onrender.com/payment/create-payment-session",
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Subscription created successfully:", response.data.url);

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

export async function fetchLatestPurchases() {
  const response = await axios.get(
    `https://powerproxies-backups.onrender.com/test-actions/sales-overview/`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.data;
  return data;
}
export const getProxyVPNSetting = async (
  portID: string
): Promise<{ downloadUrl?: string }> => {
  const response = await axios.get(
    `https://powerproxies-backups.onrender.com/test-actions/ovpn/${portID}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.data;
  return data;
};

export async function fetchUserInfo() {
  const response = await fetch(`${process.env.BASE_URL}/show-user-info`);
  const data = await response.json();
  // console.log(data.userStatus);

  return data;
}

export const fetchMonthlyData = async () => {
  try {
    const response = await axios.get(
      "https://powerproxies-backups.onrender.com/web-statistics/last-30-days",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return "test";
  } catch (error) {
    console.log(error);

    return error;
  }
};
export async function rotateProxy(imei: string): Promise<RotateProxyResponse> {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/rotate-ip/860191063669325`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const data: RotateProxyResponse = await response.json();

    if (!data || (!data.result && !data.EXT_IP1)) {
      throw new Error("Invalid response from server");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(
          "Request timed out. Please check your network connection."
        );
      }

      if (error instanceof TypeError) {
        throw new Error(
          "Network error. Please check your internet connection."
        );
      }

      throw new Error(
        error.message || "Failed to rotate IP. Please try again later."
      );
    }

    // Handle non-Error objects
    throw new Error("An unexpected error occurred");
  }
}
const BASE_DEV_URL = `https://proxy-test-iqka.onrender.com`;
export async function fetchSpeedTestData({
  imei,
}: SpeedTestParams): Promise<SpeedTestResult> {
  try {
    const response = await axios.post(
      `http://localhost:4000/test-actions/speed-test/`,
      {
        imei,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`IMEI: ${imei}`);

    if (response.status !== 200) {
      const errorText = await response?.data;
      throw new Error(`HTTP error: ${errorText}`);
    }

    const html = response.data;
    const root = parse(html);

    // IMEI extraction
    const h3Text = root.querySelector("h3")?.text || "";
    const imeiMatch = h3Text.match(/IMEI:\s*(\d+)/i);
    const imeiValue = imeiMatch ? imeiMatch[1] : null;

    // Nick extraction
    const nickMatch = h3Text.match(/NICK:\s*(\w+)/i);
    const nick = nickMatch ? nickMatch[1] : null;

    // Speed extraction
    const speedRows = root.querySelectorAll("table.modems tr");
    const downloadSpeed = speedRows[1]?.querySelectorAll("td")[0]?.text.trim();
    const uploadSpeed = speedRows[1]?.querySelectorAll("td")[1]?.text.trim();

    // Result image extraction with simple cleanup
    let resultImage = root.querySelector("img")?.getAttribute("src") || "";

    // Extract the actual URL from the string
    const urlMatch = resultImage.match(/http:\/\/.*\.png/);
    resultImage = urlMatch
      ? urlMatch[0].replace("http:", "https:")
      : "https://via.placeholder.com/400x300.png?text=Speed+Test+Result";

    return {
      imei: imeiValue,
      nick: nick || "Unknown",
      downloadSpeed: downloadSpeed || "N/A",
      uploadSpeed: uploadSpeed || "N/A",
      resultImage,
    };
  } catch (error) {
    console.error("Comprehensive Speed Test Error:", error);
    throw error;
  }
}

export async function fetchConnectionResults(
  imei: string
): Promise<ConnectionTestResponse> {
  const response = await fetch(
    `${process.env.BASE_URL}/connection-results/860191063669325`
  );

  const html = await response.text();
  const root = parse(html);

  // Extract IMEI and Nick
  const imeiValue =
    root.querySelector("h3")?.text.match(/IMEI: (\d+)/)?.[1] || null;
  const nick = root.querySelector("h3")?.text.match(/NICK: (\w+)/)?.[1] || null;

  // Get all table rows except the header row
  const rows = root.querySelectorAll("table.modems tr:not(:first-child)");

  // Parse connection test results
  const results: ConnectionResult[] = rows.map((row: HTMLElement) => {
    const cells = row.querySelectorAll("td");
    return {
      connections: parseInt(cells[0].textContent.trim()),
      successRate: cells[1].textContent.trim() + "%",
      requestsPerSecond: parseFloat(cells[2].textContent.trim()),
      timePerRequestMs: parseFloat(cells[3].textContent.trim()),
    };
  });

  const connectionTestResponse: ConnectionTestResponse = {
    imei: imeiValue,
    nick,
    results,
  };

  return connectionTestResponse;
}
