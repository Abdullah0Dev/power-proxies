// "use client"
// import { useEffect, useState } from "react";
import DashboardPage from "../../../components/dashboard-page";
import {
  fetchClientPurchasedProxies,
  fetchUserInfo,
} from "@/actions/getProxyList";

export default async function Dashboard() {
  const data = await fetchUserInfo();
  const activeUserInfo = data.activeUserInfo;
 
  return ( 
      <DashboardPage
        proxies={data.userStatus}
        activeUserInfo={activeUserInfo}
      />  
  );
}
