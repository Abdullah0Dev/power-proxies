import { redirect } from "next/navigation";
import React from "react";

const MainPage = () => {
  return redirect("/payment/success");
};

export default MainPage;
