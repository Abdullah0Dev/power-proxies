import { Header, SiteInfo, Statistics, Locations } from "@/components/admin";
import React from "react";

const AdminPage = () => {
  return (
    <div className="bg- [#F6F6F6] w-full h-full">
      <Header />
      <div className="px-5">
        <SiteInfo />
        <Statistics />
        <Locations />
      </div>
    </div>
  );
};

export default AdminPage;
