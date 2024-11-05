import { Header, SiteInfo, Statistics } from "@/components/admin";
import React from "react";

const AdminPage = () => {
  return (
    <div className="bg-[#F6F6F6] w-full h-full ">
      <Header />
      <SiteInfo />
      <Statistics />
    </div>
  );
};

export default AdminPage;
