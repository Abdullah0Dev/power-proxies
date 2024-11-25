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
    `https://powerproxies-backups.onrender.com/test-actions/show-user-info`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.data;
  return data;
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
  ipAddress,
  port,
  imei,
  username,
  password,
}: SpeedTestParams): Promise<SpeedTestResult> {
  try {
    const response = await axios.post(
      `https://proxy-test-iqka.onrender.com/speed-test/`,
      {
        imei: "860191063669325",
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
